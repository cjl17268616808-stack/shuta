/* ==========================================================================
   数塔之家 · shutaHome.js —— 数据库操作实战模块
   --------------------------------------------------------------------------
   一句话：把"数塔"里学过的小节，接到一台**真的 SQLite 数据库**上。
     · 左边：自由勾选任意小节（6 章 32 个知识点，每节都配了真实数据库操作任务）
     · 中间：SQL 控制台，跑的是真 SQLite（sql.js / WASM），真的建表、真的报错
     · 右边：实战任务卡，点"检查"会自动校验数据状态 / 你执行过的语句 / 查询结果
   数据库会存在浏览器里（localStorage），下次打开还在；也能导出成 .db 文件，
   用 DBeaver、SQLiteStudio 打开就是一个货真价实的 SQLite 数据库。
   ========================================================================== */
const shutaHome = {
    SQL: null,
    db: null,
    history: [],          // [{sql, error, ts}] 控制台执行过的语句，任务校验要用
    lastResult: null,     // 最后一次成功查询的结果
    done: {},             // 已完成任务 id
    selected: null,       // 选中的知识点 id 数组
    ready: false,
    busy: false,

    DB_KEY: 'shuta_home_db',
    SEL_KEY: 'shuta_home_selected',
    DONE_KEY: 'shuta_home_done',
    LEARN_KEY: 'shuta_progress',

    /* ====================== 打开 / 关闭 ====================== */
    async open() {
        const panel = document.getElementById('home-panel');
        if (!panel) return;
        panel.style.display = 'flex';
        document.body.classList.add('home-open');
        this.loadLocal();
        if (!this.ready) {
            this.setStatus('正在启动数据库引擎（SQLite / WASM）…');
            try {
                await this.ensureEngine();
            } catch (e) {
                this.setStatus('⚠️ 数据库引擎没启动起来：' + (e && e.message) +
                    '。两条路都试过了（正常加载 .wasm / 内联 base64 兜底）。实在不行就起个本地服务器：' +
                    'python -m http.server 8765，然后访问 http://127.0.0.1:8765/');
                return;
            }
            this.ready = true;
        }
        this.renderLessons();
        this.renderTasks();
        this.refreshTablePicker();
        this.updateProgress();
        this._snap = this.dbSnapshot();
        this.diff = null;
        this.diffNote = '数据库现在长这样；跑一条 SQL，有变化这里会当场标出来';
        try {
            if (localStorage.getItem('shuta_home_dbopen') === '0') {
                const p = document.getElementById('home-dbstate');
                if (p) p.classList.add('collapsed');
                const b = document.getElementById('home-db-toggle');
                if (b) b.innerText = '展开';
            }
        } catch (e) { /* 忽略 */ }
        this.renderDbState();
        const counts = this.rowCounts();
        const totalRows = counts.reduce(function (n, t) { return n + (Number(t.rows) || 0); }, 0);
        this.setStatus('数据库已就绪：' + counts.length + ' 张表 / ' + totalRows + ' 行数据 · 它存在你的浏览器里，下次打开还在，也能导出成 .db 文件' +
            (this.usedInlineWasm ? '（本地文件模式：用的是内联 WASM）' : ''));
        if (window.takuEngine) {
            takuEngine.speak('欢迎回到数塔之家！这里连着一台真的 SQLite 数据库，左边挑小节，中间敲 SQL，右边交作业。', 6000);
        }
    },

    close() {
        const panel = document.getElementById('home-panel');
        if (panel) panel.style.display = 'none';
        document.body.classList.remove('home-open');
        this.saveDbSoon();
    },

    switchTab(name) {
        document.querySelectorAll('.home-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
        document.getElementById('tab-lessons').style.display = name === 'lessons' ? 'flex' : 'none';
        document.getElementById('tab-tasks').style.display = name === 'tasks' ? 'flex' : 'none';
    },

    setStatus(msg) {
        const el = document.getElementById('home-status');
        if (el) el.innerText = msg || '';
    },

    /* ====================== 引擎：sql.js + 建库 / 恢复库 ====================== */
    loadScript(src) {
        return new Promise(function (resolve, reject) {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = function () { reject(new Error('加载失败：' + src)); };
            document.head.appendChild(s);
        });
    },

    /** 把内联版 wasm（base64）读成 initSqlJs 需要的 Uint8Array */
    async loadInlineWasm() {
        if (!window.__SQLJS_WASM_B64) await this.loadScript('vendor/sqljs/sql-wasm-b64.js');
        const b64 = window.__SQLJS_WASM_B64;
        if (!b64) throw new Error('找不到内联 wasm：vendor/sqljs/sql-wasm-b64.js');
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    },

    /**
     * 启动 SQLite 引擎。两条路：
     *   ① 常规：让 sql.js 自己去取 vendor/sqljs/sql-wasm.wasm（http/https 下最快）
     *   ② 内联：把 base64 的 wasm 直接喂给 sql.js（wasmBinary）
     * file:// 双击打开时浏览器不让 fetch 本地 .wasm（报 both async and sync fetching
     * of the wasm failed），所以那种情况下先走 ②；反过来，②失败也会退回 ①。
     */
    async bootSql(fromFile) {
        const self = this;
        const viaFetch = function () {
            return window.initSqlJs({ locateFile: function (f) { return 'vendor/sqljs/' + f; } });
        };
        const viaInline = async function () {
            const bytes = await self.loadInlineWasm();
            const SQL = await window.initSqlJs({ wasmBinary: bytes });
            self.usedInlineWasm = true;
            return SQL;
        };
        if (fromFile) {
            try { return await viaInline(); } catch (e) { console.warn('[数塔之家] 内联 wasm 启动失败，改试常规加载：', e); }
            return await viaFetch();
        }
        try { return await viaFetch(); } catch (e) { console.warn('[数塔之家] 常规加载 .wasm 失败，改用内联 wasm：', e); }
        return await viaInline();
    },

    async ensureEngine() {
        if (this.db) return true;
        if (typeof window.initSqlJs !== 'function') await this.loadScript('vendor/sqljs/sql-wasm.js');
        this.SQL = await this.bootSql(location.protocol === 'file:');
        this.db = this.restoreDb();
        if (!this.db) {
            this.db = dbRunner.createDb(this.SQL, dbTasks);
        } else {
            this.registerFunctions();
        }
        try { this.db.run('PRAGMA foreign_keys = ON'); } catch (e) { /* 忽略 */ }
        return true;
    },

    registerFunctions() {
        const fns = dbTasks.sqlFunctions || {};
        for (const name in fns) {
            try { this.db.create_function(name, fns[name]); } catch (e) { /* 忽略 */ }
        }
    },

    /**
     * sql.js 的 db.export() 内部会把数据库连接关掉再重新打开
     * （为了把内存库落成文件），于是**连接级的设置会被清空**：
     * PRAGMA foreign_keys 回到默认的 OFF、create_function 注册的函数也没了。
     * 所以每次导出之后都要把它们重新装回去，否则外键校验和向量函数会悄悄失效。
     */
    syncConnection() {
        if (!this.db) return;
        try { this.db.run('PRAGMA foreign_keys = ON'); } catch (e) { /* 忽略 */ }
        this.registerFunctions();
    },

    restoreDb() {
        try {
            const b64 = localStorage.getItem(this.DB_KEY);
            if (!b64) return null;
            const bin = atob(b64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return new this.SQL.Database(bytes);
        } catch (e) {
            console.warn('[数塔之家] 恢复上次的数据库失败，改用初始数据：', e);
            return null;
        }
    },

    saveDbSoon() {
        if (this._saveTimer) clearTimeout(this._saveTimer);
        const self = this;
        this._saveTimer = setTimeout(function () { self.saveDb(); }, 600);
    },

    saveDb() {
        if (!this.db) return;
        try {
            const bytes = this.db.export();
            if (bytes.length > 1500000) return;      // 太大了就不存，避免撑爆 localStorage
            let s = '';
            const chunk = 0x8000;
            for (let i = 0; i < bytes.length; i += chunk) {
                s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
            }
            localStorage.setItem(this.DB_KEY, btoa(s));
        } catch (e) { /* 存不下就算了，不影响使用 */ }
        this.syncConnection();
    },

    exportDb() {
        if (!this.db) return;
        try {
            const bytes = this.db.export();
            this.syncConnection();                 // 导出后把外键 / 自定义函数装回去
            const blob = new Blob([bytes], { type: 'application/x-sqlite3' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '数塔之家.db';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
            if (window.takuEngine) takuEngine.speak('数据库导出成功！用 DBeaver 或 SQLiteStudio 就能打开这个 .db 文件。', 4000);
        } catch (e) {
            this.syncConnection();
            this.setStatus('导出失败：' + (e && e.message));
        }
    },

    resetDb() {
        if (!this.db) return;
        if (!confirm('把数据库恢复到初始状态？（你自己建的表和数据会消失，任务完成记录保留）')) return;
        try {
            const objs = dbRunner.rows(this.db, "SELECT type, name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%'");
            this.db.run('PRAGMA foreign_keys = OFF');
            objs.forEach((row) => {
                const kind = String(row[0]).toUpperCase() === 'VIEW' ? 'VIEW' : 'TABLE';
                const n = String(row[1]).replace(/"/g, '""');
                this.db.run('DROP ' + kind + ' IF EXISTS "' + n + '"');
            });
            dbRunner.seed(this.db, dbTasks);
            this.registerFunctions();
            this.db.run('PRAGMA foreign_keys = ON');
            this.history = [];
            this.lastResult = null;
            this.renderResult({ results: [], error: null, ms: 0, note: '数据库已恢复到初始状态。' });
            this.refreshTablePicker();
            this._snap = this.dbSnapshot();
            this.diff = null;
            this.diffNote = '数据库已重置为刚开学的样子';
            this.renderDbState();
            this.saveDb();
            if (window.takuEngine) takuEngine.speak('数据库已经恢复成刚开学时的样子了！', 3000);
        } catch (e) {
            this.setStatus('重置失败：' + (e && e.message));
        }
    },

    /* ====================== 本地记忆 ====================== */
    loadLocal() {
        try { this.done = JSON.parse(localStorage.getItem(this.DONE_KEY) || '{}') || {}; } catch (e) { this.done = {}; }
        if (this.selected === null) {
            try {
                const s = JSON.parse(localStorage.getItem(this.SEL_KEY) || 'null');
                this.selected = Array.isArray(s) ? s : null;
            } catch (e) { this.selected = null; }
        }
        if (this.selected === null) this.selected = this.defaultSelection();
    },

    saveLocal() {
        try {
            localStorage.setItem(this.SEL_KEY, JSON.stringify(this.selected));
            localStorage.setItem(this.DONE_KEY, JSON.stringify(this.done));
        } catch (e) { /* 忽略 */ }
    },

    /** 默认选中：前两章（SQL 操作最密集）+ 已经学过的知识点 */
    defaultSelection() {
        const learned = this.learnedKps();
        const out = [];
        this.allKps().forEach(function (kp) {
            if (String(kp.chapterId) === '1' || String(kp.chapterId) === '2' || learned.indexOf(kp.id) >= 0) out.push(kp.id);
        });
        return out;
    },

    learnedKps() {
        try {
            const v = JSON.parse(localStorage.getItem(this.LEARN_KEY) || '[]');
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    },

    allKps() {
        const out = [];
        const data = (typeof textbookData !== 'undefined') ? textbookData : { chapters: [] };
        (data.chapters || []).forEach((ch) => {
            (ch.knowledgePoints || []).forEach((kp) => {
                out.push({ id: kp.id, title: kp.title, icon: kp.icon || '📘', chapterId: ch.id, chapterTitle: ch.title });
            });
        });
        return out;
    },

    taskListOf(kpId) { return (dbTasks.kps && dbTasks.kps[kpId]) || []; },

    allTasks() {
        const out = [];
        this.allKps().forEach((kp) => {
            this.taskListOf(kp.id).forEach(function (t) { out.push(Object.assign({}, t, { kpId: kp.id, kpTitle: kp.title })); });
        });
        return out;
    },

    visibleTasks() {
        const sel = this.selected || [];
        return this.allTasks().filter(function (t) { return sel.indexOf(t.kpId) >= 0; });
    },

    /* ====================== 渲染：小节选择 ====================== */
    renderLessons() {
        const box = document.getElementById('home-lesson-list');
        if (!box) return;
        const data = (typeof textbookData !== 'undefined') ? textbookData : { chapters: [] };
        const self = this;
        let html = '';
        (data.chapters || []).forEach((ch) => {
            const kps = ch.knowledgePoints || [];
            const total = kps.reduce(function (n, kp) { return n + self.taskListOf(kp.id).length; }, 0);
            html += '<div class="home-chapter">' +
                '<div class="home-chapter-head"><span>' + esc(ch.title) + '</span>' +
                '<button class="mini-btn ghost" onclick="shutaHome.toggleChapter(' + ch.id + ')">全选本章</button>' +
                '<span class="home-chapter-count">' + kps.length + ' 节 / ' + total + ' 个任务</span></div>';
            kps.forEach((kp) => {
                const n = self.taskListOf(kp.id).length;
                const on = (self.selected || []).indexOf(kp.id) >= 0;
                const doneN = self.taskListOf(kp.id).filter(function (t) { return self.done[t.id]; }).length;
                html += '<label class="home-kp' + (on ? ' on' : '') + (n ? '' : ' empty') + '">' +
                    '<input type="checkbox" ' + (on ? 'checked' : '') + (n ? '' : 'disabled') +
                    ' onchange="shutaHome.toggleKp(\'' + kp.id + '\')">' +
                    '<span class="home-kp-title">' + esc(kp.icon || '📘') + ' ' + esc(kp.title) + '</span>' +
                    '<span class="home-kp-count">' + (n ? (doneN + '/' + n) : '暂无') + '</span>' +
                    '</label>';
            });
            html += '</div>';
        });
        box.innerHTML = html;
        const badge = document.getElementById('home-sel-count');
        if (badge) badge.innerText = '已选 ' + (this.selected || []).length + ' 节 · ' + this.visibleTasks().length + ' 个任务';
    },

    toggleKp(id) {
        const i = this.selected.indexOf(id);
        if (i >= 0) this.selected.splice(i, 1); else this.selected.push(id);
        this.saveLocal();
        this.renderLessons();
        this.renderTasks();
        this.updateProgress();
    },

    toggleChapter(chId) {
        const ids = this.allKps().filter(function (k) { return String(k.chapterId) === String(chId); }).map(function (k) { return k.id; });
        const allOn = ids.every((id) => this.selected.indexOf(id) >= 0);
        const self = this;
        ids.forEach(function (id) {
            const i = self.selected.indexOf(id);
            if (allOn && i >= 0) self.selected.splice(i, 1);
            else if (!allOn && i < 0) self.selected.push(id);
        });
        this.saveLocal();
        this.renderLessons();
        this.renderTasks();
        this.updateProgress();
    },

    selectPreset(kind) {
        const learned = this.learnedKps();
        if (kind === 'all') this.selected = this.allKps().map(function (k) { return k.id; });
        else if (kind === 'none') this.selected = [];
        else if (kind === 'learned') this.selected = this.allKps().filter(function (k) { return learned.indexOf(k.id) >= 0; }).map(function (k) { return k.id; });
        else if (kind === 'sql') this.selected = this.allKps().filter(function (k) { return String(k.chapterId) === '1' || String(k.chapterId) === '2'; }).map(function (k) { return k.id; });
        else if (kind === 'ai') this.selected = this.allKps().filter(function (k) { return String(k.chapterId) === '6'; }).map(function (k) { return k.id; });
        this.saveLocal();
        this.renderLessons();
        this.renderTasks();
        this.updateProgress();
    },

    /* ====================== 渲染：任务卡 ====================== */
    renderTasks() {
        const box = document.getElementById('home-task-list');
        if (!box) return;
        let list = this.visibleTasks();
        const self = this;
        const filterEl = document.getElementById('home-task-filter');
        const searchEl = document.getElementById('home-task-search');
        const filter = filterEl ? filterEl.value : 'all';
        const kw = searchEl ? searchEl.value.trim().toLowerCase() : '';
        if (filter === 'todo') list = list.filter(function (t) { return !self.done[t.id]; });
        if (filter === 'done') list = list.filter(function (t) { return !!self.done[t.id]; });
        if (kw) {
            list = list.filter(function (t) {
                return (t.title + ' ' + t.goal + ' ' + (t.hint || '') + ' ' + t.kpId).toLowerCase().indexOf(kw) >= 0;
            });
        }
        if (!list.length) {
            box.innerHTML = '<div class="home-empty">' +
                (this.visibleTasks().length
                    ? '当前筛选下没有任务，换个筛选条件试试。'
                    : '左边勾几个小节，这里就会出现对应的真实数据库操作任务 👈') +
                '</div>';
            return;
        }
        let html = '';
        let lastChapter = '';
        list.forEach(function (t) {
            const kp = self.allKps().filter(function (k) { return k.id === t.kpId; })[0] || {};
            if (kp.chapterTitle !== lastChapter) {
                lastChapter = kp.chapterTitle;
                html += '<div class="home-task-chapter">' + esc(lastChapter) + '</div>';
            }
            const doneTask = !!self.done[t.id];
            html += '<div class="home-task' + (doneTask ? ' done' : '') + '" id="task-' + t.id + '">' +
                '<div class="home-task-head">' +
                '<span class="home-task-kp">' + esc(t.kpId) + '</span>' +
                '<span class="home-task-title">' + esc(t.title) + '</span>' +
                '<span class="home-task-state">' + (doneTask ? '✅' : '⬜') + '</span>' +
                '</div>' +
                '<div class="home-task-goal">' + esc(t.goal) + '</div>' +
                '<div class="home-task-foot">' +
                '<button class="mini-btn run" onclick="shutaHome.checkTask(\'' + t.id + '\')">🔍 检查</button>' +
                '<button class="mini-btn ghost" onclick="shutaHome.showGuide(\'' + t.id + '\')">📖 怎么写</button>' +
                '<button class="mini-btn ghost" onclick="shutaHome.resetTask(\'' + t.id + '\')" title="清掉打勾，并撤掉这张卡建的表/视图/索引，方便重做">↺ 重置</button>' +
                '</div>' +
                '<div class="home-task-guide" id="guide-' + t.id + '" style="display:none"></div>' +
                '<div class="home-task-feedback" id="fb-' + t.id + '"></div>' +
                '</div>';
        });
        box.innerHTML = html;
        const countEl = document.getElementById('home-task-count');
        if (countEl) countEl.innerText = '(' + list.length + ')';
    },

    findTask(id) {
        return this.allTasks().filter(function (t) { return t.id === id; })[0] || null;
    },

    /**
     * 「📖 怎么写」：只讲**要做什么、关键句式、你上次差在哪、正确的写法长什么样**。
     * 刻意不把语句写进控制台 —— 手要自己动，SQL 才是自己的。
     */
    showGuide(id) {
        const t = this.findTask(id);
        const box = document.getElementById('guide-' + id);
        if (!t || !box) return;
        const parts = [];
        parts.push('<b>🎯 要做什么：</b>' + esc(t.goal));
        if (t.hint) parts.push('<b>✍️ 关键写法：</b><code>' + esc(t.hint) + '</code>');
        const last = this._lastFail && this._lastFail[id];
        if (last) {
            parts.push('<b>🔎 你上次差在哪：</b>' + esc(last.msg) +
                (last.fix ? '<br><b>✍️ 正确的写法：</b><code>' + esc(last.fix) + '</code>' : ''));
        }
        parts.push('<i>把语句自己敲进左边的控制台，Ctrl+Enter 跑一遍，再点「🔍 检查」—— 这一步我不替你写。</i>');
        box.innerHTML = parts.join('<br>');
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    },

    /* ====================== 重置：单卡 / 全部打勾 ======================
       "重置这张卡"要解决两件事：
         ① 把它的打勾清掉，好重新做一遍
         ② 它建过的表 / 视图 / 索引（还有 ALTER TABLE 加的列）撤掉，
            否则重做时会撞 table xxx already exists
       对象的清单直接从标准答案里解析，不猜、不硬编码，其他卡的数据一律不动。
       ============================================================== */
    objectsOfTask(task) {
        const sql = String((task && task.solution) || '');
        const out = [];
        const reCreate = /create\s+(?:temp\s+|temporary\s+)?(table|view|index|unique\s+index)\s+(?:if\s+not\s+exists\s+)?["'\x60\[]?([A-Za-z_]\w*)["'\x60\]]?/gi;
        let m;
        while ((m = reCreate.exec(sql))) {
            const kind = /index/i.test(m[1]) ? 'INDEX' : (/view/i.test(m[1]) ? 'VIEW' : 'TABLE');
            out.push({ kind: kind, name: m[2] });
        }
        const reAlter = /alter\s+table\s+["'\x60\[]?([A-Za-z_]\w*)["'\x60\]]?\s+add\s+(?:column\s+)?["'\x60\[]?([A-Za-z_]\w*)["'\x60\]]?/gi;
        while ((m = reAlter.exec(sql))) {
            out.push({ kind: 'COLUMN', table: m[1], name: m[2] });
        }
        return out;
    },

    resetTask(id) {
        const t = this.findTask(id);
        if (!t || !this.db) return;
        const objs = this.objectsOfTask(t);
        const created = objs.filter(function (o) { return o.kind !== 'COLUMN'; });
        const addedCols = objs.filter(function (o) { return o.kind === 'COLUMN'; });
        const lines = ['重置《' + t.title + '》？', '', '· 清掉它的打勾，可以重新做一遍'];
        if (created.length) lines.push('· 撤掉它建的对象：' + created.map(function (o) { return o.name; }).join('、'));
        if (addedCols.length) lines.push('· 撤掉它加的列：' + addedCols.map(function (o) { return o.table + '.' + o.name; }).join('、'));
        lines.push('· 其他卡的数据和打勾都不动');
        if (!confirm(lines.join('\n'))) return;

        const undone = [];
        objs.forEach((o) => {
            try {
                if (o.kind === 'COLUMN') {
                    this.db.run('ALTER TABLE "' + o.table.replace(/"/g, '""') + '" DROP COLUMN "' + o.name.replace(/"/g, '""') + '"');
                    undone.push(o.table + '.' + o.name);
                } else {
                    const q = o.name.replace(/'/g, "''");
                    const exists = dbRunner.rows(this.db, "SELECT name FROM sqlite_master WHERE name='" + q + "'").length;
                    if (exists) {
                        this.db.run('DROP ' + o.kind + ' IF EXISTS "' + o.name.replace(/"/g, '""') + '"');
                        undone.push(o.name);
                    }
                }
            } catch (e) { /* 撤不掉的（比如列上还有索引）就跳过，不影响清打勾 */ }
        });

        delete this.done[id];
        this.saveLocal();
        const card = document.getElementById('task-' + id);
        if (card) {
            card.classList.remove('done');
            const st = card.querySelector('.home-task-state');
            if (st) st.innerText = '⬜';
        }
        this.setFeedback(id, 'wait', '↺ 已重置' + (undone.length ? '：撤掉了 ' + undone.join('、') : '（这张卡没有建过对象，数据保持原样）') + '，可以重新做一遍了。');
        this.renderLessons();
        this.updateProgress();
        this.refreshDbState(true);          // 状态面板会立刻显示"🗑 删掉 xxx"
        this.saveDbSoon();
        if (window.takuEngine) takuEngine.speak('这张卡已经重置，重新来一遍吧。', 3000);
    },

    /** 只清打勾，不动数据库 */
    clearAllDone() {
        const n = Object.keys(this.done).length;
        if (!n) { this.setStatus('还没有打勾的任务，不用清。'); return; }
        if (!confirm('清掉全部 ' + n + ' 个任务的打勾？\n\n（只清打勾，数据库里的表和数据都不动）')) return;
        this.done = {};
        this.saveLocal();
        this.renderTasks();
        this.renderLessons();
        this.updateProgress();
        this.setStatus('已清空 ' + n + ' 个打勾，可以再刷一遍了。');
        if (window.takuEngine) takuEngine.speak('打勾都清掉了，放手再练一轮吧！', 3000);
    },

    setFeedback(id, kind, msg) {
        const el = document.getElementById('fb-' + id);
        if (!el) return;
        el.className = 'home-task-feedback ' + kind;
        el.innerText = msg || '';
        el.style.display = msg ? 'block' : 'none';
    },

    /* ====================== 执行 SQL ====================== */
    run() {
        const ta = document.getElementById('home-sql');
        if (!ta || !this.db) return;
        const sql = ta.value.trim();
        if (!sql) return;
        // 逐条执行：每条语句单独进历史，任务校验才能要求"真有语句跑成功过"
        const r = dbRunner.execAll(this.db, sql);
        const stmts = (r.statements && r.statements.length) ? r.statements : [{ sql: sql, error: r.error }];
        stmts.forEach((st) => this.history.push({ sql: st.sql, error: st.error, ts: Date.now() }));
        if (this.history.length > 400) this.history = this.history.slice(-400);
        if (!r.error && r.results.length) {
            const last = r.results[r.results.length - 1];
            this.lastResult = { columns: last.columns, values: last.values, sql: sql };
        }
        this.renderResult(r);
        this.refreshTablePicker();
        this.refreshDbState(true);       // 状态面板实时跟上
        this.saveDbSoon();
        // 报错的时候让塔库提醒一句（成功就不吵了）
        if (r.error && window.takuEngine && !this._lastErrSpoke) {
            this._lastErrSpoke = true;
            takuEngine.playVoice('数据库拒绝了这条命令，看看红色报错说了什么？');
            setTimeout(() => { this._lastErrSpoke = false; }, 6000);
        }
    },

    clearConsole() {
        const ta = document.getElementById('home-sql');
        if (ta) ta.value = '';
        const box = document.getElementById('home-result');
        if (box) box.innerHTML = '';
        this.lastResult = null;
    },

    renderResult(r) {
        const box = document.getElementById('home-result');
        if (!box) return;
        let html = '';
        if (r.note) html += '<div class="home-note">' + esc(r.note) + '</div>';
        if (r.error) {
            html += '<div class="home-error"><b>⚠️ SQLite 报错：</b><br>' + esc(r.error) +
                (r.failedSql ? '<div class="home-error-sql">出错的语句：<code>' + esc(r.failedSql) + '</code></div>' : '') +
                '<div class="home-error-tip">' + esc(this.explainError(r.error)) + '</div></div>';
        } else if (!r.results.length) {
            html += '<div class="home-ok">✅ 执行成功（这条语句没有返回结果集，比如建表 / 插入 / 更新）。</div>';
        } else {
            r.results.forEach((res) => {
                html += this.tableHtml(res.columns, res.values);
            });
        }
        html += '<div class="home-meta">耗时 ' + (r.ms || 0) + ' ms</div>';
        box.innerHTML = html;
    },

    explainError(msg) {
        const m = String(msg || '');
        if (/no such table/i.test(m)) return '表名拼错了，或者还没建这张表。左边的表下拉框里是现在真实存在的表。';
        if (/no such column/i.test(m)) return '列名不对，可以先用 PRAGMA table_info(表名); 看看有哪些列。';
        if (/UNIQUE constraint/i.test(m)) return '主键 / UNIQUE 约束：这个值已经存在了。这正是 1-3、2-1 讲的东西。';
        if (/FOREIGN KEY constraint/i.test(m)) return '外键约束：你引用了一个不存在的父记录，或者父记录还被子记录引用着（先删子表）。';
        if (/NOT NULL constraint/i.test(m)) return 'NOT NULL 约束：这一列不允许为空。';
        if (/CHECK constraint/i.test(m)) return 'CHECK 约束：数据没通过你写的检查条件。';
        if (/syntax error/i.test(m)) return '语法错误，检查一下逗号、引号、关键字顺序。';
        if (/cannot start a transaction/i.test(m)) return '事务已经开着或者已经结束了，注意 BEGIN / COMMIT / ROLLBACK 要配对。';
        return '把报错原样读一遍，数据库的报错其实非常直白。';
    },

    tableHtml(columns, values) {
        const max = 200;
        const rows = values.slice(0, max);
        let html = '<div class="home-table-wrap"><table class="home-table"><thead><tr>';
        columns.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
        html += '</tr></thead><tbody>';
        rows.forEach(function (row) {
            html += '<tr>';
            row.forEach(function (v) {
                html += '<td>' + (v === null ? '<i class="null">NULL</i>' : esc(v)) + '</td>';
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        html += '<div class="home-meta">共 ' + values.length + ' 行' +
            (values.length > max ? '（只显示前 ' + max + ' 行）' : '') + '</div>';
        return html;
    },

    refreshTablePicker() {
        const sel = document.getElementById('home-table-picker');
        if (!sel || !this.db) return;
        const names = dbRunner.rows(this.db, "SELECT name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name")
            .map(function (r) { return r[0]; });
        const cur = sel.value;
        sel.innerHTML = '<option value="">📋 看看表 / 视图…</option>' +
            names.map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + '</option>'; }).join('');
        if (names.indexOf(cur) >= 0) sel.value = cur;
    },

    pickTable(name) {
        if (!name) return;
        const ta = document.getElementById('home-sql');
        if (!ta) return;
        ta.value = 'SELECT * FROM "' + name + '" LIMIT 20;';
        this.run();
        this.setStatus('已把 "' + name + '" 的前 20 行捞出来了。');
    },

    rowCounts() {
        if (!this.db) return [];
        const names = dbRunner.rows(this.db, "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").map(function (r) { return r[0]; });
        return names.map((n) => {
            const c = dbRunner.scalar(this.db, 'SELECT COUNT(*) FROM "' + n + '"');
            return { name: n, rows: c };
        });
    },

    /* ====================== 数据库状态（实时） ======================
       每执行一次 SQL 就重新读一遍 sqlite_master + 各表行数，和上一次的快照比一比：
       新建的表、行数增减、新增的列、新建的索引都当场标出来。
       ============================================================== */
    dbSnapshot() {
        const snap = { tables: [], views: [], indexes: [], rows: 0 };
        if (!this.db) return snap;
        let objs = [];
        try {
            objs = dbRunner.rows(this.db, "SELECT type, name, tbl_name FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name");
        } catch (e) { return snap; }
        objs.forEach((r) => {
            const type = String(r[0]), name = String(r[1]);
            try {
                if (type === 'table') {
                    const colInfo = dbRunner.rows(this.db, 'PRAGMA table_info("' + name + '")');
                    const n = Number(dbRunner.scalar(this.db, 'SELECT COUNT(*) FROM "' + name + '"')) || 0;
                    snap.tables.push({ name: name, rows: n, cols: colInfo.map(function (c) { return String(c[1]); }), colInfo: colInfo });
                    snap.rows += n;
                } else if (type === 'view') {
                    snap.views.push({ name: name });
                } else if (type === 'index') {
                    snap.indexes.push({ name: name, table: String(r[2]) });
                }
            } catch (e) { /* 单个对象读失败不影响整体 */ }
        });
        return snap;
    },

    diffSnapshots(a, b) {
        const d = { created: [], dropped: [], rows: [], cols: {}, viewsAdded: [], indexesAdded: [] };
        if (!a || !b) return d;
        const am = {}, bm = {};
        a.tables.forEach(function (t) { am[t.name] = t; });
        b.tables.forEach(function (t) { bm[t.name] = t; });
        b.tables.forEach(function (t) {
            const old = am[t.name];
            if (!old) { d.created.push(t.name); return; }
            const delta = t.rows - old.rows;
            if (delta) d.rows.push({ name: t.name, delta: delta });
            const added = t.cols.filter(function (c) { return old.cols.indexOf(c) < 0; });
            if (added.length) d.cols[t.name] = added;
        });
        a.tables.forEach(function (t) { if (!bm[t.name]) d.dropped.push(t.name); });
        const av = a.views.map(function (v) { return v.name; });
        const ai = a.indexes.map(function (i) { return i.name; });
        b.views.forEach(function (v) { if (av.indexOf(v.name) < 0) d.viewsAdded.push(v.name); });
        b.indexes.forEach(function (i) { if (ai.indexOf(i.name) < 0) d.indexesAdded.push(i.name); });
        return d;
    },

    refreshDbState(withDiff) {
        if (!this.db) return;
        const before = this._snap;
        const after = this.dbSnapshot();
        this._snap = after;
        this.diff = withDiff ? this.diffSnapshots(before, after) : null;
        this.renderDbState();
    },

    renderDbState() {
        const chips = document.getElementById('home-db-chips');
        const sum = document.getElementById('home-db-summary');
        const diffEl = document.getElementById('home-db-diff');
        if (!chips) return;
        const snap = this._snap || (this._snap = this.dbSnapshot());
        const self = this;
        if (sum) {
            sum.innerText = snap.tables.length + ' 张表 / ' + snap.rows + ' 行' +
                (snap.views.length ? ' · ' + snap.views.length + ' 个视图' : '') +
                (snap.indexes.length ? ' · ' + snap.indexes.length + ' 个索引' : '');
        }
        if (diffEl) {
            const d = this.diff;
            const parts = [];
            if (d) {
                if (d.created.length) parts.push('🆕 新建 ' + d.created.join('、'));
                if (d.dropped.length) parts.push('🗑 删掉 ' + d.dropped.join('、'));
                (d.rows || []).forEach(function (r) { parts.push(r.name + ' ' + (r.delta > 0 ? '+' + r.delta : r.delta) + ' 行'); });
                Object.keys(d.cols || {}).forEach(function (n) { parts.push(n + ' 新增列 ' + d.cols[n].join('/')); });
                if (d.viewsAdded.length) parts.push('👁 视图 ' + d.viewsAdded.join('、'));
                if (d.indexesAdded.length) parts.push('⚡ 索引 ' + d.indexesAdded.join('、'));
            }
            diffEl.innerText = parts.length ? '刚刚 → ' + parts.join(' · ') : (this.diffNote || '');
            diffEl.className = 'home-dbstate-diff' + (parts.length ? ' hot' : '');
            this.diffNote = '';
        }
        let html = '';
        snap.tables.forEach(function (t) {
            const isNew = !!self.diff && self.diff.created.indexOf(t.name) >= 0;
            const rowDelta = self.diff ? (self.diff.rows || []).filter(function (r) { return r.name === t.name; })[0] : null;
            const colAdd = self.diff && self.diff.cols ? self.diff.cols[t.name] : null;
            const badge = [];
            if (isNew) badge.push('<em class="db-badge new">新建</em>');
            if (rowDelta) badge.push('<em class="db-badge ' + (rowDelta.delta > 0 ? 'up' : 'down') + '">' + (rowDelta.delta > 0 ? '+' : '') + rowDelta.delta + ' 行</em>');
            if (colAdd) badge.push('<em class="db-badge col">+' + colAdd.length + ' 列</em>');
            html += '<div class="home-db-chip' + (self.selectedTable === t.name ? ' on' : '') + (isNew ? ' flash' : '') +
                '" onclick="shutaHome.selectTable(\'' + esc(t.name) + '\')">' +
                '<span class="db-chip-name">🗂 ' + esc(t.name) + '</span>' +
                '<span class="db-chip-meta">' + t.rows + ' 行 · ' + t.cols.length + ' 列</span>' +
                badge.join('') + '</div>';
        });
        snap.views.forEach(function (v) {
            const isNew = !!self.diff && self.diff.viewsAdded.indexOf(v.name) >= 0;
            html += '<div class="home-db-chip view' + (self.selectedTable === v.name ? ' on' : '') + (isNew ? ' flash' : '') +
                '" onclick="shutaHome.selectTable(\'' + esc(v.name) + '\')">' +
                '<span class="db-chip-name">👁 ' + esc(v.name) + '</span><span class="db-chip-meta">视图</span>' +
                (isNew ? '<em class="db-badge new">新建</em>' : '') + '</div>';
        });
        chips.innerHTML = html || '<div class="home-empty">数据库现在是空的，先建一张表试试：CREATE TABLE ...</div>';
        if (this.selectedTable) this.renderDbDetail();
    },

    selectTable(name) {
        this.selectedTable = name;
        this.renderDbState();
        this.renderDbDetail();
    },

    renderDbDetail() {
        const box = document.getElementById('home-db-detail');
        if (!box || !this.db) return;
        const self = this;
        const name = this.selectedTable;
        if (!name) return;
        const q = name.replace(/'/g, "''");
        const quoted = '"' + name.replace(/"/g, '""') + '"';
        const obj = dbRunner.rows(this.db, "SELECT type, sql FROM sqlite_master WHERE name='" + q + "'")[0];
        const type = obj ? String(obj[0]) : 'table';
        const createSql = obj && obj[1] ? String(obj[1]) : '';
        const colInfo = dbRunner.rows(this.db, 'PRAGMA table_info(' + quoted + ')');
        const idxList = dbRunner.rows(this.db, 'PRAGMA index_list(' + quoted + ')');
        const fks = dbRunner.rows(this.db, 'PRAGMA foreign_key_list(' + quoted + ')');
        const rows = dbRunner.scalar(this.db, 'SELECT COUNT(*) FROM ' + quoted);
        let html = '<div class="home-db-detail-head"><b>' + (type === 'view' ? '👁 ' : '🗂 ') + esc(name) + '</b>' +
            '<span class="home-sel">' + (rows === undefined ? '' : rows + ' 行') + ' · ' + colInfo.length + ' 列</span>' +
            '<span class="db-detail-actions">' +
            '<button class="mini-btn ghost" onclick="shutaHome.viewTableRows(\'' + esc(name) + '\')">👀 看前 20 行</button>' +
            '<button class="mini-btn ghost" onclick="shutaHome.fillCreateSql(\'' + esc(name) + '\')">📝 建表语句进控制台</button>' +
            '</span></div>';
        html += '<table class="home-table db-cols"><thead><tr><th>列</th><th>类型</th><th>约束</th></tr></thead><tbody>';
        colInfo.forEach(function (c) {
            const cons = [];
            if (c[5]) cons.push('主键');
            if (c[3]) cons.push('NOT NULL');
            if (c[4] !== null && c[4] !== undefined) cons.push('默认 ' + c[4]);
            html += '<tr><td>' + esc(c[1]) + '</td><td>' + esc(c[2] || '—') + '</td><td>' + (cons.length ? esc(cons.join(' · ')) : '—') + '</td></tr>';
        });
        html += '</tbody></table>';
        if (idxList.length) {
            html += '<div class="db-sub">索引</div><ul class="db-idx">';
            idxList.forEach(function (ix) {
                const cols = dbRunner.rows(self.db, 'PRAGMA index_info("' + String(ix[1]).replace(/"/g, '""') + '")')
                    .map(function (c) { return c[2]; }).join(', ');
                html += '<li>' + esc(ix[1]) + (ix[2] ? ' <em>UNIQUE</em>' : '') + ' <span>(' + esc(cols) + ')</span></li>';
            });
            html += '</ul>';
        }
        if (fks.length) {
            html += '<div class="db-sub">外键</div><ul class="db-idx">';
            fks.forEach(function (fk) {
                html += '<li>' + esc(fk[3]) + ' → ' + esc(fk[2]) + '.' + esc(fk[4]) + '</li>';
            });
            html += '</ul>';
        }
        if (createSql) {
            html += '<details class="db-sql"><summary>建表语句</summary><pre>' + esc(createSql) + '</pre></details>';
        }
        box.innerHTML = html;
    },

    viewTableRows(name) {
        const ta = document.getElementById('home-sql');
        if (!ta) return;
        ta.value = 'SELECT * FROM "' + name.replace(/"/g, '""') + '" LIMIT 20;';
        this.run();
    },

    fillCreateSql(name) {
        const ta = document.getElementById('home-sql');
        if (!ta || !this.db) return;
        const q = name.replace(/'/g, "''");
        const sql = dbRunner.scalar(this.db, "SELECT sql FROM sqlite_master WHERE name='" + q + "'");
        if (!sql) return;
        ta.value = String(sql) + ';';
        ta.focus();
    },

    toggleDbState() {
        const panel = document.getElementById('home-dbstate');
        const btn = document.getElementById('home-db-toggle');
        if (!panel) return;
        const collapsed = panel.classList.toggle('collapsed');
        if (btn) btn.innerText = collapsed ? '展开' : '收起';
        try { localStorage.setItem('shuta_home_dbopen', collapsed ? '0' : '1'); } catch (e) { /* 忽略 */ }
    },

    /* ====================== 任务校验 ====================== */
    ctx(task) {
        return {
            db: this.db,
            history: this.history,
            lastResult: this.lastResult,
            task: task || null,          // 让校验器能引用任务自己的"关键写法"提示
            api: { checks: (dbTasks.checks || {}) }
        };
    },

    checkTask(id, quiet) {
        const t = this.findTask(id);
        if (!t || !this.db) return false;
        const r = dbRunner.runCheck(this.ctx(t), t.check);
        if (!quiet) this.refreshDbState(true);
        if (r.ok) {
            const first = !this.done[id];
            this.done[id] = true;
            this.saveLocal();
            this.setFeedback(id, 'ok', '✅ 通过！' + (first ? ' 这条实战记录进你的数塔之家了。' : ''));
            const card = document.getElementById('task-' + id);
            if (card) {
                card.classList.add('done');
                const st = card.querySelector('.home-task-state');
                if (st) st.innerText = '✅';
            }
            this.renderLessons();
            this.updateProgress();
            if (window.takuEngine && !quiet) takuEngine.speak('漂亮！' + t.title + ' 通过了，数据库里的变化是真的。', 4000);
        } else {
            const err = r.err || '';
            let tip = '';
            if (/already exists/i.test(err)) {
                tip = '\n（这个对象之前就建好了，数据库拒绝重复创建。想从头跑一遍就点右上角「🧹 重置数据库」；只是想确认数据，看下面的数据库状态面板即可）';
            } else if (/期望|对不上|还没有这个|没有这一列|没有查到|没有结果/.test(r.msg)) {
                tip = '\n（如果数据被前面的操作改过了，点右上角「🧹 重置数据库」就能回到初始数据再试）';
            }
            const already = !!this.done[id];
            this._lastFail = this._lastFail || {};
            this._lastFail[id] = { msg: r.msg, fix: r.fix || '' };
            const detail = r.msg + (r.fix ? '\n\n✍️ 正确的写法：\n' + r.fix : '') + tip;
            this.setFeedback(id, 'bad', '❌ ' + (r.rejected ? '' : '还差一点：') + detail +
                (already ? '\n（这张卡之前已经打过勾，勾不会因为这次失败而丢掉）' : ''));
            const card = document.getElementById('task-' + id);
            if (card) {
                const st = card.querySelector('.home-task-state');
                if (st && !this.done[id]) st.innerText = '🟡';
            }
        }
        return r.ok;
    },

    checkAll() {
        const list = this.visibleTasks();
        let ok = 0, bad = 0;
        const self = this;
        list.forEach(function (t) {
            const r = self.checkTask(t.id, true);
            if (r) ok++; else if (!self.done[t.id]) bad++;
        });
        this.refreshDbState(true);
        this.setStatus('全部检查完毕：' + ok + ' 个任务通过' + (bad ? '，还有 ' + bad + ' 个差一点' : '，全清了！'));
        if (window.takuEngine) {
            takuEngine.speak(ok >= list.length ? '这一轮全过了！你的数据库操作越来越熟练了。' : '已经有 ' + ok + ' 个任务通过，剩下的看看提示再试。', 4000);
        }
    },

    updateProgress() {
        const list = this.visibleTasks();
        const done = list.filter((t) => this.done[t.id]).length;
        const el = document.getElementById('home-progress');
        if (el) el.innerText = '已完成 ' + done + ' / ' + list.length;
    }
};

/* 快捷键：数塔之家开着的时候，Esc 关面板、Ctrl+Enter 跑 SQL */
document.addEventListener('keydown', function (e) {
    const panel = document.getElementById('home-panel');
    if (!panel || panel.style.display === 'none') return;
    if (e.key === 'Escape') shutaHome.close();
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        shutaHome.run();
    }
});

function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
}
