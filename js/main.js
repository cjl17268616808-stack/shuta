document.addEventListener('DOMContentLoaded', async () => {
    // ========================================================================
    // 🛡️ 启动容错（重要）
    // ------------------------------------------------------------------------
    // 竞赛平台的预览是【沙盒 iframe】。在这种环境里 localStorage、音频、
    // 语音合成等 API 都可能被拒绝并抛异常。而本回调是 async —— 任何一步抛出，
    // 都会变成"被静默吞掉的 Promise rejection"（window.onerror 抓不到），
    // 结果是整个首页空白、塔库永远停在"系统启动中..."。
    //
    // 所以这里逐个 try 住：任何一步挂掉，都不能影响"把教材内容渲染出来"。
    // ========================================================================
    const bootErrors = [];
    window.__shutaBootErrors = bootErrors;
    const safe = (label, fn) => {
        try { return fn(); }
        catch (e) {
            bootErrors.push(label + ': ' + (e && e.message));
            console.warn('[数塔] 启动步骤失败（已跳过）：' + label, e);
            return null;
        }
    };

    // 把被吞掉的 Promise rejection 暴露到控制台，便于以后排障
    window.addEventListener('unhandledrejection', (ev) => {
        const msg = (ev.reason && ev.reason.message) || String(ev.reason);
        bootErrors.push('unhandledRejection: ' + msg);
        console.error('[数塔] 未处理的 Promise 异常：', ev.reason);
    });

    safe('背景音乐初始化', () => bgmEngine.init());
    safe('塔库初始化',     () => takuEngine.init());

    // ---------- 数据 ----------
    let data = null;
    try {
        data = await getTextbookData();
    } catch (e) {
        bootErrors.push('读教材数据: ' + (e && e.message));
    }

    // ---------- 渲染 ----------
    const renderFallback = (msg) => {
        const stage = document.getElementById('stage');
        if (stage) {
            stage.innerHTML = '<div style="text-align:center; width:100%; color:#ff6b6b; font-size:1.4rem; padding:50px; line-height:1.8;">'
                + '⚠️ ' + msg + '<br><span style="font-size:1rem;color:#888;">请刷新页面重试</span></div>';
        }
    };

    if (!data || !data.chapters || data.chapters.length === 0) {
        console.error("❌ 教材数据为空！", bootErrors);
        renderFallback('教材数据为空，请检查 data.js 或 Python 编译结果。');
        safe('数据为空时提示', () => { takuEngine.speak("数据流中断了！", 3000); takuEngine.setEmotion("confused"); });
        return;
    }

    console.log("✅ 数据加载成功，章节数:", data.chapters.length);
    try {
        comicEngine.renderChapters(data);
    } catch (e) {
        bootErrors.push('渲染章节: ' + (e && e.message));
        console.error('[数塔] 渲染章节失败：', e);
        renderFallback('章节渲染出错。');
        return;
    }

    // ---------- 欢迎语与引导（失败也不影响内容） ----------
    safe('欢迎语', () => {
        setTimeout(() => { takuEngine.speak(data.takuWelcome || "欢迎来到数塔！", 5000); }, 800);
    });
    safe('新手引导', () => {
        setTimeout(() => { comicEngine.showGuide(false); }, 1200);
    });

    // 塔库的点击行为已统一收口在 takuEngine.initPeek()（点脑袋 → 台词彩蛋），
    // 这里不再重复绑定，避免两个监听互相覆盖。

    // 绑定右上角返回大厅按钮
    safe('返回大厅按钮', () => {
        const homeBtn = document.getElementById('global-home-btn');
        if (homeBtn) homeBtn.onclick = () => comicEngine.goHome();
    });

    // 🎨 主视觉插画互动：鼠标视差 + 点击爆花
    safe('主视觉互动', () => {
        const heroBanner = document.getElementById('hero-banner');
        const heroImg = document.getElementById('hero-img');
        if (heroBanner && heroImg) {
            heroBanner.addEventListener('mousemove', (e) => {
                const rect = heroBanner.getBoundingClientRect();
                const dx = (e.clientX - rect.left) / rect.width - 0.5;
                const dy = (e.clientY - rect.top) / rect.height - 0.5;
                heroImg.style.transform = 'translate(' + (dx * -14) + 'px, ' + (dy * -10) + 'px) scale(1.05)';
            });
            heroBanner.addEventListener('mouseleave', () => { heroImg.style.transform = ''; });
            heroBanner.addEventListener('click', (e) => {
                comicEngine.spawnSpark(e.clientX, e.clientY);
                takuEngine.speak("那就是我们要攀登的数据高塔！", 2500);
            });
        }
    });

    if (bootErrors.length) console.warn('[数塔] 本次启动有 ' + bootErrors.length + ' 个非致命问题：', bootErrors);
});
