const takuEngine = {
    dialogElement: document.getElementById('taku-text'),
    dialogBox: document.getElementById('taku-dialog'),
    muteBtn: document.getElementById('mute-btn'),
    settingsPanel: document.getElementById('settings-panel'),
    bgmAudio: document.getElementById('bgm-audio'),
    timer: null,
    isMuted: false,
    isAudioUnlocked: false,
    ttsSupported: true, // 标记设备是否支持TTS

    voiceRate: 1.0,
    voicePitch: 1.1,
    selectedVoice: null,
    voiceList: [],

    isDragging: false,
    hasDragged: false,
    startX: 0, startY: 0, startLeft: 0, startTop: 0,

    // ---- 贴边探头状态 ----
    takuArea: null,
    side: 'right',       // 默认贴右边（像兔子从右边探头）
    peeked: true,        // 默认就探头，不整个出来
    isHovering: false,   // 鼠标悬停时不自动收回
    retractTimer: null,

    init() {
        if (!('speechSynthesis' in window)) {
            console.warn("⚠️ 当前浏览器不支持语音合成，塔库将使用纯文字模式。");
            this.ttsSupported = false;
            if (this.muteBtn) this.muteBtn.style.display = 'none';
            this.isMuted = true;
        } else {
            this.loadVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
            }
        }

        this.initDrag();
        this.initPeek();

        // 第一次交互：解锁音频。浏览器规定"必须先有用户操作才能出声"，
        // 背景音乐（bgmEngine）就等这一下，然后自动开始放默认曲目。
        document.addEventListener('click', () => {
            if (!this.isAudioUnlocked) {
                this.isAudioUnlocked = true;
                if (this.ttsSupported) window.speechSynthesis.resume();
                if (window.bgmEngine) bgmEngine.unlock();
            }
        }, { once: true });

        const rateSlider = document.getElementById('voice-rate');
        const pitchSlider = document.getElementById('voice-pitch');

        if(rateSlider) rateSlider.oninput = () => { document.getElementById('rate-value').innerText = rateSlider.value; this.applyVoiceSettings(); };
        if(pitchSlider) pitchSlider.oninput = () => { document.getElementById('pitch-value').innerText = pitchSlider.value; this.applyVoiceSettings(); };
        // 音乐音量条由 bgmEngine 自己接管（见 index.html 的 oninput），这里不再重复绑定

        // fallback：3秒后如果还卡在"系统启动中"，显示默认欢迎语
        setTimeout(() => {
            const t = document.getElementById('taku-text');
            if (t && (t.innerText === '系统启动中...' || t.innerText.trim() === '')) {
                t.innerText = '哔哔——数据流连接成功！我是塔库，点下面的塔开始攀登吧！';
            }
        }, 3000);
    },

    // 拖拽核心逻辑（保持不变）
    initDrag() {
        const takuArea = document.getElementById('taku-area');
        if (!takuArea) return;
        // ⚠️ 沙盒 iframe（竞赛平台预览就是这种）里访问 localStorage 会抛 SecurityError。
        //    这里必须保护：一旦抛出会冒泡出 init()，进而中断 main.js 的整个启动流程，
        //    表现为"首页空白 + 永远停在「系统启动中...」"。
        let savedLeft = null, savedTop = null;
        try {
            savedLeft = localStorage.getItem('takuLeft');
            savedTop = localStorage.getItem('takuTop');
        } catch (e) { /* 存储不可用 → 用默认位置 */ }
        if (savedLeft && savedTop) {
            // 横向只还原"贴哪一边"，纵向还原具体高度
            const lx = parseFloat(savedLeft);
            if (!isNaN(lx)) {
                const w = takuArea.offsetWidth || 120;
                this.side = (lx + w / 2) < window.innerWidth / 2 ? 'left' : 'right';
            }
            takuArea.style.bottom = 'auto';
            takuArea.style.top = savedTop;
        }
        const onStart = (e) => {
            // 只有抓塔库本体（.taku-robot）或右上角圆头像（.taku-avatar）才算拖动：
            // 气泡和容器都不吃鼠标事件
            if (!e.target.closest('.taku-robot, .taku-avatar')) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            // ⚠️ 量位置前先把探头位移关掉（.measuring）：探头带了 translate/rotate，
            //    直接量会把这段位移算进去，写回 left/top 后又叠加一遍 ——
            //    表现为"每拖一次塔库就往屏幕外多跑一点"。
            //    注意不是摘掉 .peeked：那样一按下去塔库就突然站直，很跳。
            takuArea.classList.add('dragging', 'measuring');
            const rect = takuArea.getBoundingClientRect();
            takuArea.classList.remove('measuring');
            takuArea.style.bottom = 'auto'; takuArea.style.right = 'auto';
            takuArea.style.left = rect.left + 'px'; takuArea.style.top = rect.top + 'px';
            this.startX = clientX; this.startY = clientY; this.startLeft = rect.left; this.startTop = rect.top;
            // 记下"戳的是谁、戳在哪儿"：松手时如果在别的地方，也能算对后退方向
            this._pressTarget = e.target;
            this._pressX = clientX; this._pressY = clientY;
            this.isDragging = true; this.hasDragged = false;
            document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onEnd);
            document.addEventListener('touchmove', onMove, { passive: false }); document.addEventListener('touchend', onEnd);
            e.preventDefault();
        };
        const onMove = (e) => {
            if (!this.isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = clientX - this.startX; const dy = clientY - this.startY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) this.hasDragged = true;
            let newLeft = this.startLeft + dx; let newTop = this.startTop + dy;
            // 脑袋是浮在气泡上沿外面的，纵向要多留一个脑袋的高度，
            // 否则往上拖时脑袋会被屏幕顶边切掉。
            const headUp = 60;
            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - takuArea.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - takuArea.offsetHeight - headUp));
            takuArea.style.left = newLeft + 'px'; takuArea.style.top = newTop + 'px';
            // 靠近左右边缘才做"探头"：拖到屏幕中间就站直，别一直歪着
            const nearEdge = newLeft <= 80 ||
                (newLeft + takuArea.offsetWidth) >= window.innerWidth - 80;
            takuArea.classList.toggle('peeked', nearEdge);
            if (e.cancelable) e.preventDefault();
        };
        const onEnd = (e) => {
            if (!this.isDragging) return;
            this.isDragging = false; takuArea.classList.remove('dragging');
            document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd);
            if (this.hasDragged) {
                // 📌 拖完了：水平吸附到最近的一边（和悬浮客服组件一致），高度保留
                const r = takuArea.getBoundingClientRect();
                const centerX = r.left + r.width / 2;
                this.setSide(centerX < window.innerWidth / 2 ? 'left' : 'right');
                this.slideIn(700);
                this.savePos();
            } else {
                // 纯点击（戳一下）：⚠️ 不要回屏幕底部！只朝远离鼠标的方向"后退一格"
                this.stepBack(e);
            }
        };
        takuArea.addEventListener('mousedown', onStart);
        takuArea.addEventListener('touchstart', onStart, { passive: false });
        takuArea.addEventListener('click', (e) => { if (this.hasDragged) { e.stopPropagation(); e.preventDefault(); this.hasDragged = false; } }, true);
    },

    // ================= 智能兼容语音核心 =================
    loadVoices() {
        if (!this.ttsSupported) return;
        this.voiceList = window.speechSynthesis.getVoices();

        // 如果没有获取到任何语音，说明设备存在兼容性问题
        if (this.voiceList.length === 0) {
            console.warn("⚠️ 未检测到任何语音包，等待加载或设备不支持。");
            return;
        }

        const select = document.getElementById('voice-select');
        if (!select) return;

        select.innerHTML = '<option value="">默认智能匹配</option>';
        let hasZh = false;

        this.voiceList.forEach((voice, index) => {
            // 列出所有声线，中文排前面
            const isZh = voice.lang.includes('zh');
            const isEn = voice.lang.includes('en');
            if (isZh || isEn) {
                const option = document.createElement('option');
                option.value = index;
                option.innerText = `${voice.name} (${voice.lang})`;
                if (isZh) option.style.color = '#d63031';
                select.appendChild(option);
                if (isZh) hasZh = true;
            }
        });

        // 如果系统里连一个中文语音都没有，自动选用默认声音（防止用户选了英文导致中文乱读）
        if (!hasZh) {
            console.warn("⚠️ 系统未安装中文语音包，将使用默认引擎合成。");
            const voiceSelectParent = select.parentElement;
            if (voiceSelectParent) voiceSelectParent.style.display = 'none';
        }

        // ===== 恢复上次选择的声线 =====
        if (!this._userPicked) {                         // 用户这次没手动改过，才还原
            let saved = '';
            try { saved = localStorage.getItem('takuVoice') || ''; } catch (e) {}
            if (saved) {
                const idx = this.voiceList.findIndex(v => v.name === saved || v.voiceURI === saved);
                if (idx >= 0) {
                    select.value = String(idx);          // 下拉框跟着选中
                    this.selectedVoice = this.voiceList[idx];
                }
            }
        }
    },

    applyVoiceSettings() {
        if (!this.ttsSupported) return;
        const rateSlider = document.getElementById('voice-rate');
        const pitchSlider = document.getElementById('voice-pitch');
        const select = document.getElementById('voice-select');
        if(rateSlider) this.voiceRate = parseFloat(rateSlider.value);
        if(pitchSlider) this.voicePitch = parseFloat(pitchSlider.value);
        if (select && select.value !== "") {
            this.selectedVoice = this.voiceList[select.value];
            this._userPicked = true;                     // 记一笔：用户手动选过了
            try {
                // setItem 只有两个参数；键名必须和上面读取时的 'takuVoice' 完全一致（大小写敏感）
                localStorage.setItem('takuVoice', this.selectedVoice.name || this.selectedVoice.voiceURI);
            } catch (e) {}
        } else {
            this.selectedVoice = null;                   // 选"默认智能匹配"= 清掉记忆，回到内置默认声线
            this._userPicked = true;
            try { localStorage.removeItem('takuVoice'); } catch (e) {}
        }
    },

    testVoice() {
        this.playVoice("你好，我是数据流机器人塔库！Hello!");
    },

    playVoice(text) {
        if (this.isMuted || !this.ttsSupported) return;
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        setTimeout(() => {
            if (this.isMuted) return;
            const utterance = new SpeechSynthesisUtterance(text);

            // 塔库开口时把背景音乐压低一点，说完立刻恢复（免得人声和音乐打架）
            const unduck = () => { if (window.bgmEngine) bgmEngine.duck(false); };
            const unduckTimer = setTimeout(unduck, Math.min(20000, 2000 + String(text).length * 320));
            utterance.onend = () => { clearTimeout(unduckTimer); unduck(); };

            // ==== 智能匹配逻辑 ====
            // 保险丝：selectedVoice 必须是真正的音色对象（typeof === 'object'）。
            // 万一被写成了 true / 字符串之类，这里退回自动匹配，而不是让 utterance.voice 赋值抛异常
            // —— 那种异常发生在 setTimeout 里，会被浏览器吞掉，表现就是"塔库突然不说话了"。
            const picked = (this.selectedVoice && typeof this.selectedVoice === 'object') ? this.selectedVoice : null;
            if (this.selectedVoice && !picked) {
                console.warn('[塔库] selectedVoice 不是有效的音色对象，已回退到默认声线：', this.selectedVoice);
            }
            if (picked) {
                // 用户手动选择了，尊重用户
                utterance.voice = picked;
                utterance.lang = picked.lang;
            } else {
                // 用户没选，引擎自动寻找最合适的中文语音
                utterance.lang = 'zh-TW';
                // 优先找本地中文，其次找云端中文
                const TAKU_VOICE = 'HsiaoChen';
                const bestZh = this.voiceList.find(v => v.name.includes(TAKU_VOICE)) ||
                               this.voiceList.find(v => v.lang.includes('zh-TW')) ||
                               this.voiceList.find(v => v.lang.includes('zh'));
                if (bestZh) {
                    utterance.voice = bestZh;
                    utterance.lang = bestZh.lang;   // ← 注意大小写：bestZh（写成 bestZH 会抛 ReferenceError，塔库直接哑掉）
                } else {
                    utterance.lang = 'zh-TW';       // 一个中文音色都没有时的兜底
                }
            }

            utterance.rate = this.voiceRate;
            utterance.pitch = this.voicePitch;

            utterance.onerror = (e) => {
                clearTimeout(unduckTimer); unduck();
                if (e.error === 'not-allowed') this.isAudioUnlocked = false;
                // 如果因为找不到语音报错，静默降级为纯文字
                if (e.error === 'language-unavailable' || e.error === 'voice-unavailable') {
                    console.warn("⚠️ 当前设备不支持该语言，降级为纯文字模式。");
                    this.ttsSupported = false;
                    if (this.muteBtn) this.muteBtn.style.display = 'none';
                }
            };
            if (window.bgmEngine) bgmEngine.duck(true);
            window.speechSynthesis.speak(utterance);
        }, 100);
    },
    // ================= 智能兼容语音核心结束 =================

    toggleSettings() {
        const panel = this.settingsPanel;
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },

    handleBGMUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (window.bgmEngine && bgmEngine.useCustomFile(file)) {
            this.playVoice("背景音乐已更换！");
            return;
        }
        // 兜底：浏览器不支持 Web Audio 时，还是老办法直接塞给 <audio>
        const url = URL.createObjectURL(file);
        this.bgmAudio.src = url;
        this.bgmAudio.volume = parseFloat(document.getElementById('bgm-volume').value);
        this.bgmAudio.play().catch(e => {});
    },

    // 音量统一交给 bgmEngine：内置合成曲目和上传的 MP3 共用同一根音量条
    changeBGMVolume() {
        const slider = document.getElementById('bgm-volume');
        if (slider && window.bgmEngine) bgmEngine.setVolume(slider.value);
    },

    // 这个按钮只管塔库的语音；背景音乐归右上角的「🎵 音乐」按钮管
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            if (this.muteBtn) this.muteBtn.innerText = '🔇';
            if (this.ttsSupported) window.speechSynthesis.cancel();
        } else {
            if (this.muteBtn) this.muteBtn.innerText = '🔊';
            this.playVoice("语音已开启，塔库随时待命！");
        }
        if (window.bgmEngine) bgmEngine.duck(false);
    },

    /* ==================== 📌 拖动 / 被戳 ==================== */

    // 记下当前位置（下次打开还在那儿）
    savePos() {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        try {
            localStorage.setItem('takuLeft', area.style.left || '');
            localStorage.setItem('takuTop', area.style.top || '');
        } catch (e) { /* 存储不可用 → 只保留本次会话内的位置 */ }
    },

    /* 被戳一下：朝远离鼠标（手指）的方向退一小步 —— "后退一格"就完事，
       ⚠️ 千万不要再像以前那样把 top/bottom 清掉、让它直接掉回屏幕底部。 */
    stepBack(e) {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        // 量之前先把探头位移关掉，否则 rect 里带着 translateX，写回 left 会多加一段
        area.classList.add('measuring');
        const rect = area.getBoundingClientRect();
        area.classList.remove('measuring');

        // ⚠️ 方向要拿"被戳的那只"（机器人本体）的中心来算：
        //    气泡在机器人左边，用整个容器的中心会把方向判反
        //    （从左边戳机器人，它反而往左退）。
        // 被戳的对象优先用"按下去时"记的那个（松手时鼠标可能已经滑到别的元素上了）
        const pokedSrc = this._pressTarget || (e && e.target);
        const poked = (pokedSrc && pokedSrc.closest) ? pokedSrc.closest('.taku-robot') : null;
        const ref = poked ? poked.getBoundingClientRect() : rect;
        const cx = ref.left + ref.width / 2;
        const cy = ref.top + ref.height / 2;
        let px = cx, py = cy - 1;
        const ex = (typeof this._pressX === 'number') ? this._pressX : (e ? e.clientX : NaN);
        const ey = (typeof this._pressY === 'number') ? this._pressY : (e ? e.clientY : NaN);
        if (typeof ex === 'number' && !isNaN(ex)) { px = ex; py = ey; }
        else if (e && e.changedTouches && e.changedTouches[0]) {
            px = e.changedTouches[0].clientX; py = e.changedTouches[0].clientY;
        }
        // 只沿"戳过来的方向"退：横着戳横着退、竖着戳竖着退（斜着退看着太飘）
        let dx = cx - px, dy = cy - py;
        if (Math.abs(dx) >= Math.abs(dy)) { dx = dx >= 0 ? 1 : -1; dy = 0; }
        else { dy = dy >= 0 ? 1 : -1; dx = 0; }

        const STEP = 46;   // "一格" = 46px，想退得更多/更少就改这个数
        // ⚠️ 边界要用 offsetWidth/Height（布局尺寸），不能拿 rect.width：
        //    机器人探头时带了 translate/rotate，会把 rect 撑大，
        //    于是"往右退"永远被判定为越界，方向就反了。
        const w = area.offsetWidth, h = area.offsetHeight;
        const maxLeft = Math.max(0, window.innerWidth - w);
        const maxTop = Math.max(0, window.innerHeight - h);
        const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
        // 先朝"远离鼠标"的方向退；如果那个方向被屏幕边挡住（贴边时很常见），
        // 就改成朝屏幕里退一小步 —— 总之不能原地不动，也绝不回屏幕底部。
        const dirs = [[dx, dy], [-dx, -dy]];
        let nl = rect.left, nt = rect.top;
        for (let i = 0; i < dirs.length; i++) {
            const tx = clamp(rect.left + dirs[i][0] * STEP, 0, maxLeft);
            const ty = clamp(rect.top + dirs[i][1] * STEP, 0, maxTop);
            if (Math.abs(tx - rect.left) > 8 || Math.abs(ty - rect.top) > 8) { nl = tx; nt = ty; break; }
        }

        area.style.bottom = 'auto'; area.style.right = 'auto';
        area.style.left = nl + 'px'; area.style.top = nt + 'px';
        // 退完还是贴着边就继续探头（用 offsetWidth 算，别用被 transform 撑大的 rect）
        const nearEdge = nl <= 80 || (nl + w) >= window.innerWidth - 80;
        area.classList.toggle('peeked', nearEdge);
        this.side = (nl + w / 2) < window.innerWidth / 2 ? 'left' : 'right';
        this.savePos();
    },

    /* ==================== 📌 贴边探头 ====================
       塔库永远保持"探头"的样子：脑袋从气泡上沿探出来，下半截藏在气泡后面。
       说话 / 悬停 / 点击都【不会】把整只机器人滑出来（用户要求：塔库不出来），
       只换台词 + "啵"一下；贴左 / 贴右只决定整体靠哪一边。 */

    setSide(side) {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        this.side = (side === 'right') ? 'right' : 'left';
        area.classList.remove('side-left', 'side-right');
        area.classList.add('side-' + this.side);
        // 横向一律吸附到边缘，避免和"探头位移"打架
        const gap = window.innerWidth <= 768 ? '10px' : '20px';
        if (this.side === 'left') {
            area.style.left = gap; area.style.right = 'auto';
        } else {
            area.style.right = gap; area.style.left = 'auto';
        }
        // ⚠️ 不要动 bottom！CSS 里默认是 bottom:20px（贴屏幕底部）。
        //    设为 auto 会让 fixed 元素失去垂直锚点、跑回文档顶部。
        //    用户拖拽过的情况下，拖拽代码自己会把 top 设好、bottom 设成 auto。
        if (!area.style.top) area.style.bottom = gap;
    },

    /* 下面四个是"滑出 / 自动收回"时代的旧接口。现在塔库只会探头，
       所以它们只是把状态摆正（拖拽结束等地方还在调用，留着空实现是为了不报错，
       也方便以后想加"点一下才滑出来"时改回来）。 */
    slideOut() { this.keepPeeked(); },
    slideIn() { this.keepPeeked(); },
    togglePeek() { this.keepPeeked(); },
    scheduleRetract() { this.keepPeeked(); },

    // 探头状态：一直保持（.peeked 只是给 CSS / 调试看的标记）
    keepPeeked() {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        this.peeked = true;
        area.classList.add('peeked');
    },

    initPeek() {
        const area = document.getElementById('taku-area');
        if (!area) return;
        this.takuArea = area;

        // 初始化：贴右边 + 直接探头（不先整个出来）
        this.setSide('right');
        this.keepPeeked();

        // 点脑袋 → 台词互动（不再把整只机器人滑出来）
        const head = document.getElementById('taku');
        if (head) {
            head.addEventListener('click', (e) => {
                if (this.hasDragged) { this.hasDragged = false; return; }  // 拖拽结束的那一下不算点击
                e.stopImmediatePropagation();
                this.speak("别搓我啦！我的数据流都被你搓乱了！", 2000);
                this.setEmotion("confused");
                setTimeout(() => this.setEmotion("normal"), 2000);
            });
        }

        // 📌 用户在用正文 → 气泡缩成小条让开内容（滚动 / 点正文 / 划选文字都算）；
        //    停手 4 秒、或者鼠标回到塔库身上，就重新摊开。
        window.addEventListener('scroll', () => this.collapseBubble(), { passive: true });
        document.addEventListener('pointerdown', (e) => {
            if (e.target && e.target.closest && e.target.closest('#taku-area')) return;  // 点塔库自己不算
            this.collapseBubble();
        }, true);
        document.addEventListener('selectionchange', () => this.collapseBubble());
        area.addEventListener('mouseenter', () => this.showBubble());
    },

    /* 气泡摊开：塔库开口说话、或者鼠标回到塔库身上 */
    showBubble() {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        clearTimeout(this._compactTimer);
        area.classList.remove('compact');
    },

    /* 气泡缩成小条：用户正在用正文；停手 4 秒后自己再摊开 */
    collapseBubble() {
        const area = this.takuArea || document.getElementById('taku-area');
        if (!area) return;
        area.classList.add('compact');
        clearTimeout(this._compactTimer);
        this._compactTimer = setTimeout(() => area.classList.remove('compact'), 4000);
    },

    speak(text, duration = 0) {
        // 说话时保持探头：只换台词 + "啵"一下，
        // 脑袋不缩回去、整只机器人也不会滑出来。
        // 但要先把气泡摊开：字越多气泡越长，保证这句话看得全。
        this.showBubble();
        this.dialogElement.innerText = text;
        // 说话弹跳走 .talking 动画（气泡和脑袋一起弹），
        // ⚠️ 千万不要写内联 transform，否则会盖掉动画里的位移、导致回跳。
        const box = this.dialogBox;
        if (box) {
            box.classList.remove('talking');
            void box.offsetWidth;   // 触发 reflow，让连续说话也能重新播放弹跳
            box.classList.add('talking');
            clearTimeout(this._popTimer);
            this._popTimer = setTimeout(() => box.classList.remove('talking'), 360);
        }
        this.playVoice(text);

        if (duration > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.dialogElement.innerText = textbookData.takuIdle;
            }, duration);
        }
    },

    setEmotion(emotion) {
        // 情绪挂在塔库本体上（.taku-robot.happy / .confused → 眼睛变色、眯眼）。
        // ⚠️ 用 classList 增删，别写 className = ...：那样会把 .taku-robot 这个
        //    定位 / 探头用的类一起冲掉，塔库会瞬间跳到屏幕中间。
        const taku = document.getElementById('taku');
        if (!taku) return;
        taku.classList.remove('happy', 'confused');
        if (emotion && emotion !== 'normal') taku.classList.add(emotion);
        this.emotion = emotion || 'normal';
    }
};