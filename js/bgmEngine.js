/* ==========================================================================
   数塔 · bgmEngine.js —— 默认背景音乐（Web Audio 现场合成，零音频文件）
   --------------------------------------------------------------------------
   为什么用"合成"而不是塞一个 mp3 进来：
     · 教程要能离线打开，外链音频断网就静音，本地文件又要占体积
     · 现场合成：0 文件、0 体积、0 版权问题，想加几首就加几首

   使用说明：
     · 默认曲目《数据高塔》。浏览器规定"必须先有用户操作才能出声"，
       所以曲子会在用户第一次点击/按键后自动响起（不需要用户做任何设置）
     · 右上角「🎵 音乐」按钮随时开关；设置面板里可换曲、调音量、上传自己的 MP3
     · 塔库说话时自动把音乐压低（duck），说完恢复，避免人声和音乐打架
   ========================================================================== */
const bgmEngine = (function () {
    'use strict';

    /* ====================== 设置（localStorage 记忆） ====================== */
    const SET_KEY = 'shuta_bgm';
    const defaults = { track: 'tower', vol: 0.3, on: true };

    function loadSettings() {
        const o = Object.assign({}, defaults);
        try {
            const raw = JSON.parse(localStorage.getItem(SET_KEY) || '{}');
            if (raw && typeof raw === 'object') {
                if (typeof raw.track === 'string' && (TRACKS[raw.track] || raw.track === 'custom')) o.track = raw.track;
                if (typeof raw.vol === 'number' && raw.vol >= 0 && raw.vol <= 1) o.vol = raw.vol;
                if (typeof raw.on === 'boolean') o.on = raw.on;
            }
        } catch (e) { /* 隐身模式 / file:// 下读不到就用默认值 */ }
        // 上传的 mp3 是临时 blob，刷新后就没了 —— 自动退回默认曲目
        if (o.track === 'custom') o.track = defaults.track;
        return o;
    }
    function saveSettings() {
        try { localStorage.setItem(SET_KEY, JSON.stringify(S)); } catch (e) { /* 忽略 */ }
    }

    /* ====================== 曲库（简谱：八分音符为一格，每小节 16 格） ======================
       '-' = 不换音（延续上一个音或休止），小节里每格用空格隔开。
       改曲子只要改这里的字符串，改完刷新页面就能听。
       ==================================================================================== */
    const TRACKS = {
        tower: {
            name: '数据高塔',
            desc: '明亮、有干劲（默认）',
            bpm: 112,
            lead: { wave: 'square', gain: 0.155, cutoff: 2700, detune: 8 },
            pad: { wave: 'triangle', gain: 0.05, attack: 0.4 },
            bass: { wave: 'sawtooth', gain: 0.30, cutoff: 640 },
            drums: { kick: [0, 8], snare: [4, 12], hat: [2, 6, 10, 14], hatGain: 0.45 },
            bassSteps: [0, 8], bassPat: ['root', 'fifth'],
            chords: ['C', 'G', 'Am', 'F'],
            mel: [
                'G4 - C5 - E5 - D5 - C5 - - - A4 - - -',
                'B4 - D5 - G5 - F5 - E5 - - - D5 - - -',
                'A4 - C5 - E5 - A5 - G5 - - - E5 - - -',
                'F5 - E5 - D5 - C5 - A4 - - - G4 - - -',
                'C5 - E5 - G5 - C6 - B5 - - - G5 - - -',
                'A5 - G5 - F5 - D5 - B4 - - - D5 - - -',
                'C5 - E5 - A5 - G5 - E5 - - - C5 - - -',
                'D5 - E5 - F5 - G5 - C5 - - - - - - -'
            ]
        },
        pop: {
            name: '波普冲锋',
            desc: '快一点、吵一点，适合提神醒脑',
            bpm: 132,
            lead: { wave: 'square', gain: 0.13, cutoff: 3400, detune: 10 },
            pad: { wave: 'triangle', gain: 0.035, attack: 0.25 },
            bass: { wave: 'sawtooth', gain: 0.30, cutoff: 760 },
            drums: { kick: [0, 6, 8, 14], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14], hatGain: 0.5 },
            bassSteps: [0, 4, 8, 12], bassPat: ['root', 'root', 'fifth', 'root'],
            chords: ['C', 'Am', 'F', 'G'],
            mel: [
                'C5 E5 G5 E5 C5 E5 G5 A5 G5 - E5 - C5 - - -',
                'A4 C5 E5 C5 A4 C5 E5 F5 E5 - C5 - A4 - - -',
                'F5 - A5 - C6 - A5 - G5 - F5 - E5 - D5 -',
                'B4 D5 G5 B5 A5 G5 D5 B4 G4 - - - - - - -',
                'E5 G5 C6 G5 E5 G5 C6 D6 C6 - G5 - E5 - - -',
                'C5 E5 A5 E5 C5 E5 A5 B5 A5 - E5 - C5 - - -',
                'F5 A5 C6 A5 G5 F5 E5 D5 C5 - A4 - G4 - - -',
                'G4 B4 D5 G5 B5 D6 B5 G5 D5 B4 G4 - - - - -'
            ]
        },
        chill: {
            name: '深夜调试',
            desc: '慢、安静，写代码的时候当背景',
            bpm: 76,
            lead: { wave: 'sine', gain: 0.20, cutoff: 1800, detune: 4 },
            pad: { wave: 'sine', gain: 0.06, attack: 0.6 },
            bass: { wave: 'triangle', gain: 0.26, cutoff: 420 },
            drums: { hat: [2, 6, 10, 14], hatGain: 0.18 },
            bassSteps: [0, 8], bassPat: ['root', 'root'],
            chords: ['Am', 'F', 'C', 'G'],
            mel: [
                'A4 - - - E5 - - - C5 - - - - - - -',
                'F4 - - - C5 - - - A4 - - - - - - -',
                'E4 - - - G4 - - - C5 - - - - - - -',
                'D5 - - - B4 - - - G4 - - - - - - -',
                'A4 - C5 - E5 - - - D5 - - - - - - -',
                'F5 - E5 - D5 - - - C5 - - - - - - -',
                'G4 - C5 - E5 - - - G5 - - - - - - -',
                'F5 - E5 - D5 - B4 - G4 - - - - - - -'
            ]
        },
        none: { name: '安静（不放音乐）', desc: '只想安静地学习', bpm: 100, chords: ['C'], mel: [] }
    };

    /* 设置读出来（TRACKS 定义好之后才能校验曲目名） */
    let S = loadSettings();

    /* ====================== 音高工具 ====================== */
    const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const CHORDS = {
        C: [60, 64, 67], Am: [57, 60, 64], F: [53, 57, 60], G: [55, 59, 62],
        Dm: [50, 53, 57], Em: [52, 55, 59], E: [52, 56, 59], D: [50, 54, 57], Bb: [58, 62, 65]
    };
    function midi(name) {
        const m = /^([A-G])(#?)(-?\d)$/.exec(String(name).trim());
        if (!m) return null;
        return 12 * (Number(m[3]) + 1) + SEMI[m[1]] + (m[2] ? 1 : 0);
    }
    function freq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
    function parseBar(str) {
        return String(str).trim().split(/\s+/).map(function (tok) { return (tok === '-' || tok === '') ? null : midi(tok); });
    }

    /* ====================== 音频节点 ====================== */
    let ctx = null, musicGain = null, started = false, playing = false;
    let currentId = null, ducked = false, noiseBuf = null;
    let timer = null, step = 0, nextTime = 0, plan = null, stepDur = 0;
    const stats = { notes: 0, steps: 0 };

    function ensureCtx() {
        if (ctx) return ctx;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try {
            ctx = new AC();
            const comp = ctx.createDynamicsCompressor();
            comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3;
            comp.attack.value = 0.004; comp.release.value = 0.25;
            musicGain = ctx.createGain();
            musicGain.gain.value = 0;
            musicGain.connect(comp); comp.connect(ctx.destination);
            applyGain(true);
            // 白噪声（军鼓/踩镲用），只做一次
            noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.4), ctx.sampleRate);
            const data = noiseBuf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        } catch (e) {
            console.warn('[bgm] 无法创建音频上下文：', e);
            return null;
        }
        return ctx;
    }

    /** 音量（ducked = 塔库正在说话，音乐临时压低） */
    function applyGain(immediate) {
        const base = S.on ? S.vol : 0;
        const target = (ducked ? base * 0.38 : base) * 0.55;
        if (ctx && musicGain) {
            if (immediate) musicGain.gain.setValueAtTime(target, ctx.currentTime);
            else musicGain.gain.setTargetAtTime(target, ctx.currentTime, ducked ? 0.06 : 0.35);
        }
        const el = document.getElementById('bgm-audio');
        if (el) el.volume = Math.max(0, Math.min(1, (ducked ? base * 0.38 : base) * 0.9));
    }

    /* ====================== 发声单元 ====================== */
    function env(gainNode, when, peak, attack, duration) {
        gainNode.gain.setValueAtTime(0.0001, when);
        gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), when + attack);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    }
    function playLead(v, m, when, dur) {
        if (!v || !v.gain) return;
        const det = v.detune || 0;
        const detunes = det ? [-det / 2, det / 2] : [0];
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = v.cutoff || 2600;
        const g = ctx.createGain();
        env(g, when, v.gain / detunes.length * 1.6, 0.012, Math.max(dur, 0.12));
        filter.connect(g); g.connect(musicGain);
        detunes.forEach(function (cents) {
            const o = ctx.createOscillator();
            o.type = v.wave || 'square';
            o.frequency.value = freq(m);
            o.detune.value = cents;
            o.connect(filter); o.start(when); o.stop(when + Math.max(dur, 0.12) + 0.05);
        });
        stats.notes++;
    }
    function playPad(v, notes, when, dur) {
        if (!v || !v.gain) return;
        notes.forEach(function (m) {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = v.wave || 'triangle';
            o.frequency.value = freq(m);
            const atk = v.attack || 0.35;
            g.gain.setValueAtTime(0.0001, when);
            g.gain.exponentialRampToValueAtTime(v.gain, when + atk);
            g.gain.exponentialRampToValueAtTime(Math.max(0.0002, v.gain * 0.7), when + dur * 0.7);
            g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
            o.connect(g); g.connect(musicGain);
            o.start(when); o.stop(when + dur + 0.05);
        });
    }
    function playBass(v, m, when, dur) {
        if (!v || !v.gain) return;
        const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
        o.type = v.wave || 'sawtooth';
        o.frequency.value = freq(m);
        f.type = 'lowpass'; f.frequency.value = v.cutoff || 600;
        env(g, when, v.gain, 0.02, Math.max(dur, 0.16));
        o.connect(f); f.connect(g); g.connect(musicGain);
        o.start(when); o.stop(when + Math.max(dur, 0.16) + 0.05);
        stats.notes++;
    }
    function playNoise(when, dur, filterType, filterFreq, gain, q) {
        const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
        src.buffer = noiseBuf;
        f.type = filterType; f.frequency.value = filterFreq; if (q) f.Q.value = q;
        env(g, when, gain, 0.005, dur);
        src.connect(f); f.connect(g); g.connect(musicGain);
        src.start(when); src.stop(when + dur + 0.02);
    }
    function playKick(when) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(130, when);
        o.frequency.exponentialRampToValueAtTime(45, when + 0.13);
        env(g, when, 0.55, 0.006, 0.24);
        o.connect(g); g.connect(musicGain);
        o.start(when); o.stop(when + 0.28);
    }
    function playSnare(when) {
        playNoise(when, 0.16, 'bandpass', 1800, 0.34, 0.9);
    }
    function playHat(when, scale) {
        playNoise(when, 0.05, 'highpass', 8200, 0.16 * (scale == null ? 1 : scale), 0.7);
    }

    /* ====================== 排谱与调度 ====================== */
    function compile(t) {
        const bars = (t.mel || []).map(parseBar);
        bars.forEach(function (b, i) {
            if (b.length !== 16) console.warn('[bgm] 《' + t.name + '》第 ' + (i + 1) + ' 小节写了 ' + b.length + ' 格，应该是 16 格');
        });
        return {
            bars: bars,
            chords: (t.chords || ['C']).map(function (c) { return CHORDS[c] || CHORDS.C; }),
            lead: t.lead, pad: t.pad, bass: t.bass, drums: t.drums || {},
            bassSteps: t.bassSteps || [0, 8],
            bassPat: t.bassPat || ['root', 'root']
        };
    }

    function scheduleStep(p, s, when) {
        const barIndex = Math.floor(s / 16) % p.bars.length;
        const at = s % 16;
        const bar = p.bars[barIndex];
        const chord = p.chords[barIndex % p.chords.length];

        // 主旋律：音符时值 = 后面连续的 '-' 格数
        const n = bar[at];
        if (n != null) {
            let len = 1;
            while (at + len < 16 && bar[at + len] == null && len < 8) len++;
            playLead(p.lead, n, when, stepDur * len * (len > 1 ? 0.96 : 1.5));
        }

        // 贝斯：按和弦根音 / 五度走
        const bi = p.bassSteps.indexOf(at);
        if (bi >= 0) {
            const kind = p.bassPat[bi % p.bassPat.length];
            const root = chord[0] - 12;
            playBass(p.bass, kind === 'fifth' ? root + 7 : (kind === 'octave' ? root + 12 : root),
                when, stepDur * (16 / p.bassSteps.length) * 0.92);
        }

        // 和声垫：每小节头起一次，铺满整小节
        if (at === 0 && p.pad && p.pad.gain) playPad(p.pad, chord, when, stepDur * 16 * 0.98);

        // 鼓
        const d = p.drums;
        if (d.kick && d.kick.indexOf(at) >= 0) playKick(when);
        if (d.snare && d.snare.indexOf(at) >= 0) playSnare(when);
        if (d.hat && d.hat.indexOf(at) >= 0) playHat(when, d.hatGain);
    }

    function tick() {
        if (!ctx || ctx.state !== 'running' || !playing) return;
        while (nextTime < ctx.currentTime + 0.4) {
            scheduleStep(plan, step, nextTime);
            nextTime += stepDur;
            step += 1;
            stats.steps++;
        }
    }

    function stopSynth() {
        if (timer) clearInterval(timer);
        timer = null; playing = false; currentId = null; plan = null;
    }

    /* ====================== 播放控制 ====================== */
    const audioEl = function () { return document.getElementById('bgm-audio'); };

    function playCustom() {
        const el = audioEl();
        if (!el || !el.src) return false;
        currentId = 'custom';
        playing = true;
        applyGain(true);
        el.play().catch(function (e) { console.log('[bgm] 自定义音乐播放被拦截：', e && e.message); });
        return true;
    }

    /** 播放指定曲目（'custom' 走 <audio> 元素，其余现场合成） */
    function play(id) {
        const c = ensureCtx();
        if (!c) return false;
        if (!started) return false;                  // 还没拿到用户手势，等 unlock()
        stopSynth();
        const el = audioEl();
        if (el) el.pause();
        if (id === 'custom') return playCustom();
        if (!id || id === 'none' || !TRACKS[id]) return true;

        const t = TRACKS[id];
        plan = compile(t);
        if (!plan.bars.length) return true;
        stepDur = 60 / t.bpm / 2;                    // 八分音符
        step = 0; nextTime = c.currentTime + 0.12; playing = true; currentId = id;
        tick();
        timer = setInterval(tick, 100);              // 提前 0.4 秒排音，不受定时器抖动影响
        return true;
    }

    function pause() {
        stopSynth();
        const el = audioEl();
        if (el && !el.paused) el.pause();
    }

    /** 浏览器要求"先有用户操作"，这里把第一次点击/按键变成开音乐的开关 */
    function unlock() {
        const c = ensureCtx();
        if (!c) return false;
        if (c.state === 'suspended') c.resume();
        if (!started) {
            started = true;
            if (S.on && S.track !== 'none') play(S.track);
        }
        return true;
    }
    function armUnlock() {
        function once() {
            unlock();
            document.removeEventListener('pointerdown', once, true);
            document.removeEventListener('keydown', once, true);
        }
        document.addEventListener('pointerdown', once, true);
        document.addEventListener('keydown', once, true);
    }

    /* ====================== 对外操作 ====================== */
    function setTrack(id) {
        if (id === 'custom') { S.track = 'custom'; S.on = true; }
        else if (TRACKS[id]) { S.track = id; S.on = id !== 'none'; }
        saveSettings();
        if (S.on) { started || unlock(); play(S.track); }
        else pause();
        syncUI();
        return S.track;
    }

    function setVolume(v) {
        const n = Math.max(0, Math.min(1, parseFloat(v)));
        if (!isNaN(n)) S.vol = n;
        saveSettings();
        applyGain();
        syncUI();
        return S.vol;
    }

    function toggle() {
        S.on = !S.on;
        if (S.on && S.track === 'none') S.track = defaults.track;   // 之前选了"安静"，开音乐就回到默认曲目
        saveSettings();
        if (S.on) { unlock(); play(S.track); }
        else pause();
        syncUI();
        return S.on;
    }

    function useCustomFile(file) {
        if (!file) return false;
        const el = audioEl();
        if (!el) return false;
        try {
            if (el.dataset && el.dataset.blobUrl) URL.revokeObjectURL(el.dataset.blobUrl);
            const url = URL.createObjectURL(file);
            if (el.dataset) el.dataset.blobUrl = url;
            el.src = url;
            el.loop = true;
        } catch (e) { return false; }
        S.track = 'custom'; S.on = true;
        saveSettings();
        unlock();
        playCustom();
        syncUI();
        return true;
    }

    /** 塔库说话时压低音乐 */
    function duck(on) {
        const next = !!on;
        if (next === ducked) return;
        ducked = next;
        applyGain();
    }

    function isPlaying() { return playing; }
    function currentTrack() { return S.track; }
    function trackList() {
        const out = [];
        Object.keys(TRACKS).forEach(function (k) { out.push({ id: k, name: TRACKS[k].name, desc: TRACKS[k].desc }); });
        return out;
    }

    /* ====================== 界面同步 ====================== */
    function syncUI() {
        const btn = document.getElementById('music-btn');
        if (btn) {
            const on = S.on && S.track !== 'none';
            btn.classList.toggle('is-off', !on);
            btn.innerText = on ? '🎵' : '🔇';
            btn.title = on ? ('正在播放：' + (TRACKS[S.track] ? TRACKS[S.track].name : '自定义音乐') + '（点一下关掉）') : '点一下放音乐';
        }
        const sel = document.getElementById('bgm-track');
        if (sel && sel.value !== S.track) {
            const has = Array.prototype.some.call(sel.options, function (o) { return o.value === S.track; });
            if (has) sel.value = S.track;
        }
        const slider = document.getElementById('bgm-volume');
        if (slider && Math.abs(parseFloat(slider.value) - S.vol) > 0.001) slider.value = S.vol;
        const volLabel = document.getElementById('bgm-vol-value');
        if (volLabel) volLabel.innerText = Number(S.vol).toFixed(2);
        const hint = document.getElementById('bgm-hint');
        if (hint) {
            const t = TRACKS[S.track];
            hint.innerText = S.track === 'custom'
                ? '正在放你上传的 MP3（刷新页面后会回到内置曲目）'
                : (S.on ? '正在播放：' + (t ? t.name + ' · ' + t.desc : '') : '音乐已关闭，点右上角「🎵 音乐」可以重新打开');
        }
    }

    function renderTrackOptions() {
        const sel = document.getElementById('bgm-track');
        if (!sel) return;
        sel.innerHTML = '';
        trackList().forEach(function (t) {
            const o = document.createElement('option');
            o.value = t.id; o.innerText = t.name + ' · ' + t.desc;
            sel.appendChild(o);
        });
        const o2 = document.createElement('option');
        o2.value = 'custom'; o2.innerText = '我上传的 MP3';
        sel.appendChild(o2);
        sel.value = S.track;
    }

    /* ====================== 初始化 ====================== */
    function init() {
        renderTrackOptions();
        armUnlock();
        // 故意不在这里创建 AudioContext：用户还没操作过，浏览器会在控制台警告
        // "The AudioContext was not allowed to start"。等第一次点击/按键时再建。
        applyGain(true);
        syncUI();
        // 快捷键：M 开关音乐（在输入框里打字时不触发）
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'm' && e.key !== 'M') return;
            const t = e.target;
            if (t && t.closest && t.closest('input, select, textarea')) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            toggle();
        });
    }

    return {
        init: init,
        play: play, pause: pause, toggle: toggle, setTrack: setTrack, setVolume: setVolume,
        useCustomFile: useCustomFile, duck: duck, unlock: unlock,
        isPlaying: isPlaying, currentTrack: currentTrack, trackList: trackList,
        settings: function () { return Object.assign({}, S); },
        stats: function () {
            return {
                notes: stats.notes, steps: stats.steps, track: S.track, on: S.on,
                playing: playing, ducked: ducked,
                ctxState: ctx ? ctx.state : 'none'
            };
        }
    };
})();

// 同时挂到 window 上：内联 onclick 和 takuEngine 里的 window.bgmEngine 判空都能用
window.bgmEngine = bgmEngine;
