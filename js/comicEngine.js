const comicEngine = {
    stage: document.getElementById('stage'),
    globalHomeBtn: document.getElementById('global-home-btn'),
    currentChapter: null,
    currentKpIndex: 0,
    currentPanelIndex: 0,
    currentQuizIndex: 0,
    typeWriterTimer: null,
    completedKps: [],

    // ==================== 章节封面插画映射 ====================
    chapterCovers: {
        1: { src: 'assets/img/cover-ch1.png', sfx: '整齐!' },
        2: { src: 'assets/img/cover-ch2.png', sfx: '咒语!' },
        3: { src: 'assets/img/cover-ch3.png', sfx: '轰隆!' },
        4: { src: 'assets/img/cover-ch4.png', sfx: '嗖!' },
        5: { src: 'assets/img/cover-ch5.png', sfx: '联网!' },
        6: { src: 'assets/img/cover-ch6.png', sfx: '发现!' },
    },

    // ==================== 互动题型库（每节不同玩法） ====================
    NEW_MODES: ['sequence', 'match', 'fill', 'toggle', 'flip', 'find', 'branch', 'sort', 'judge', 'challenge', 'input', 'describe'],
    modeMeta: {
        sequence: { icon: '🔢', name: '排序练习', help: '按正确顺序依次点击下面的卡片，点对了会自动归位。' },
        match:    { icon: '🔗', name: '连线配对', help: '先点左边一个，再点右边一个，把对应的两项配成一对。' },
        fill:     { icon: '🧩', name: '填空练习', help: '点下面的词块，把它填进句子里的空格。' },
        toggle:   { icon: '🎚️', name: '对比实验', help: '拨动开关切换两种状态，对比看差别。' },
        flip:     { icon: '🃏', name: '翻卡揭秘', help: '把每张卡片都点开，看看背面藏着什么。' },
        find:     { icon: '🔍', name: '火眼金睛', help: '把「有问题」的那几行揪出来点掉，没问题的别点。' },
        branch:   { icon: '🛤️', name: '关键抉择', help: '选一个做法看看后果，选错了可以重试。' },
        sort:     { icon: '🗂️', name: '分类整理', help: '把每个条目拖点进对应的分类筐里。' },
        judge:     { icon: '⚖️', name: '判断练习', help: '逐句读下面的说法，判断它对不对。判完马上看解释，判错可以改判。' },
        challenge: { icon: '🤨', name: '质疑练习', help: '塔库下面这段话里藏了一处错误。哪句最可疑？点它，大胆质疑！' },
        input:     { icon: '⌨️', name: '动手写答案', help: '在输入框里亲手写下答案，按回车或点「确认」提交。' },
        describe:  { icon: '✍️', name: '用自己的话说说', help: '用自己的话写下理解，不用背书。写完对照「参考理解」，看看要点齐不齐。' },
    },

    // ==================== 漫画 SVG 插画库 ====================
    comicScenes: {
        scatter: `<svg viewBox="0 0 300 350">
            <text x="30" y="70" font-size="32" class="clickable">📄</text>
            <text x="210" y="100" font-size="32" class="clickable">📄</text>
            <text x="70" y="190" font-size="32" class="clickable">📄</text>
            <text x="220" y="230" font-size="32" class="clickable">📄</text>
            <text x="140" y="290" font-size="32" class="clickable">📄</text>
        </svg>`,
        table: `<svg viewBox="0 0 300 350">
            <rect x="40" y="80" width="220" height="160" fill="#fff" stroke="#1a1a1a" stroke-width="4" rx="6"/>
            <rect x="40" y="80" width="220" height="40" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="113" y1="80" x2="113" y2="240" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="186" y1="80" x2="186" y2="240" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="40" y1="160" x2="260" y2="160" stroke="#1a1a1a" stroke-width="3"/>
            <text x="60" y="107" font-size="14" fill="#fff" font-weight="bold">学号</text>
            <text x="130" y="107" font-size="14" fill="#fff" font-weight="bold">姓名</text>
            <text x="200" y="107" font-size="14" fill="#fff" font-weight="bold">成绩</text>
        </svg>`,
        twins: `<svg viewBox="0 0 300 350">
            <circle cx="100" cy="140" r="45" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <circle cx="200" cy="140" r="45" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <circle cx="85" cy="135" r="6" fill="#1a1a1a"/>
            <circle cx="115" cy="135" r="6" fill="#1a1a1a"/>
            <circle cx="185" cy="135" r="6" fill="#1a1a1a"/>
            <circle cx="215" cy="135" r="6" fill="#1a1a1a"/>
            <text x="78" y="215" font-size="16" font-weight="bold">小明A</text>
            <text x="178" y="215" font-size="16" font-weight="bold">小明B</text>
        </svg>`,
        idcard: `<svg viewBox="0 0 300 350">
            <rect x="60" y="80" width="180" height="130" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <rect x="80" y="100" width="55" height="65" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="107" cy="120" r="13" fill="#ffd6d6"/>
            <rect x="150" y="105" width="75" height="9" fill="#1a1a1a" opacity="0.3"/>
            <rect x="150" y="125" width="55" height="9" fill="#1a1a1a" opacity="0.3"/>
            <rect x="150" y="145" width="65" height="9" fill="#ff4757"/>
            <text x="85" y="240" font-size="16" font-weight="bold">🆔 身份证</text>
        </svg>`,
        bridge: `<svg viewBox="0 0 300 350">
            <rect x="20" y="210" width="80" height="80" fill="#a8e6cf" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="200" y="210" width="80" height="80" fill="#a8e6cf" stroke="#1a1a1a" stroke-width="3"/>
            <path d="M 100 230 Q 150 160 200 230" fill="none" stroke="#1a1a1a" stroke-width="6" class="clickable"/>
            <text x="35" y="255" font-size="14" font-weight="bold">学生表</text>
            <text x="210" y="255" font-size="14" font-weight="bold">班级表</text>
        </svg>`,
        telescope: `<svg viewBox="0 0 300 350">
            <rect x="80" y="140" width="120" height="28" rx="5" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" transform="rotate(-20 140 154)"/>
            <circle cx="205" cy="105" r="28" fill="#fff" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <line x1="140" y1="168" x2="140" y2="260" stroke="#1a1a1a" stroke-width="5"/>
        </svg>`,
        crud: `<svg viewBox="0 0 300 350">
            <text x="55" y="110" font-size="40" class="clickable">➕</text>
            <text x="190" y="110" font-size="40" class="clickable">🔍</text>
            <text x="55" y="240" font-size="40" class="clickable">✏️</text>
            <text x="190" y="240" font-size="40" class="clickable">🗑️</text>
        </svg>`,
        // ==================== 第2章场景 ====================
        constraint: `<svg viewBox="0 0 300 350">
            <path d="M150 55 L225 85 L225 175 Q225 250 150 295 Q75 250 75 175 L75 85 Z" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="5"/>
            <path d="M112 172 L140 205 L192 130" fill="none" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="22" y="78" font-size="26">🔑</text>
            <text x="246" y="78" font-size="26">🎯</text>
            <text x="22" y="268" font-size="26">✅</text>
            <text x="246" y="268" font-size="26">📦</text>
            <text x="150" y="330" text-anchor="middle" font-size="16" font-weight="bold">约束 = 数据的门卫</text>
        </svg>`,
        index: `<svg viewBox="0 0 300 350">
            <rect x="60" y="60" width="180" height="230" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="5"/>
            <line x1="90" y1="60" x2="90" y2="290" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="110" y1="115" x2="220" y2="115" stroke="#1a1a1a" stroke-width="3" opacity="0.35"/>
            <line x1="110" y1="145" x2="220" y2="145" stroke="#1a1a1a" stroke-width="3" opacity="0.35"/>
            <line x1="110" y1="175" x2="200" y2="175" stroke="#1a1a1a" stroke-width="3" opacity="0.35"/>
            <path d="M165 58 L200 42 L200 128 L182 114 L165 128 Z" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <circle cx="150" cy="228" r="40" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="5"/>
            <line x1="180" y1="258" x2="225" y2="303" stroke="#1a1a1a" stroke-width="10" stroke-linecap="round"/>
            <text x="136" y="240" font-size="22">🔍</text>
            <text x="150" y="332" text-anchor="middle" font-size="16" font-weight="bold">索引 = 数据的目录</text>
        </svg>`,
        transaction: `<svg viewBox="0 0 300 350">
            <rect x="28" y="70" width="108" height="92" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="105" text-anchor="middle" font-size="16" font-weight="bold">A 账户</text>
            <text x="82" y="140" text-anchor="middle" font-size="20" font-weight="bold" fill="#ff4757">-100</text>
            <rect x="164" y="70" width="108" height="92" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="105" text-anchor="middle" font-size="16" font-weight="bold">B 账户</text>
            <text x="218" y="140" text-anchor="middle" font-size="20" font-weight="bold" fill="#999">+100 ?</text>
            <text x="150" y="128" text-anchor="middle" font-size="30">⚡</text>
            <text x="60" y="230" font-size="28">💸</text>
            <text x="150" y="238" text-anchor="middle" font-size="28">💥</text>
            <text x="215" y="230" font-size="28">❌</text>
            <text x="150" y="300" text-anchor="middle" font-size="16" font-weight="bold">转账只做了一半！</text>
            <text x="150" y="330" text-anchor="middle" font-size="14" font-weight="bold">钱不能凭空消失</text>
        </svg>`,
        acid: `<svg viewBox="0 0 300 350">
            <rect x="35" y="55" width="105" height="105" rx="12" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="87" y="112" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">A</text>
            <text x="87" y="142" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">原子性</text>
            <rect x="160" y="55" width="105" height="105" rx="12" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="212" y="112" text-anchor="middle" font-size="36" font-weight="bold">C</text>
            <text x="212" y="142" text-anchor="middle" font-size="13" font-weight="bold">一致性</text>
            <rect x="35" y="175" width="105" height="105" rx="12" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="87" y="232" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">I</text>
            <text x="87" y="262" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">隔离性</text>
            <rect x="160" y="175" width="105" height="105" rx="12" fill="#a29bfe" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="212" y="232" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">D</text>
            <text x="212" y="262" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">持久性</text>
            <text x="150" y="318" text-anchor="middle" font-size="16" font-weight="bold">ACID 四大护法</text>
        </svg>`,
        viewproc: `<svg viewBox="0 0 300 350">
            <rect x="40" y="55" width="130" height="115" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <rect x="55" y="75" width="100" height="18" rx="4" fill="#ff9f43" stroke="#1a1a1a" stroke-width="2.5"/>
            <rect x="55" y="102" width="80" height="18" rx="4" fill="#ff9f43" stroke="#1a1a1a" stroke-width="2.5"/>
            <rect x="55" y="129" width="90" height="18" rx="4" fill="#ff9f43" stroke="#1a1a1a" stroke-width="2.5"/>
            <text x="105" y="200" text-anchor="middle" font-size="15" font-weight="bold">🪟 视图：定制橱窗</text>
            <rect x="145" y="230" width="125" height="52" rx="8" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <circle cx="172" cy="256" r="14" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <circle cx="202" cy="256" r="14" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <circle cx="232" cy="256" r="14" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="208" y="310" text-anchor="middle" font-size="15" font-weight="bold">🏭 存储过程：流水线</text>
            <text x="30" y="88" font-size="24">👀</text>
            <text x="150" y="332" text-anchor="middle" font-size="13" font-weight="bold">各司其职，各显神通</text>
        </svg>`,
        sqlinject: `<svg viewBox="0 0 300 350">
            <rect x="55" y="55" width="190" height="155" rx="12" fill="#fff" stroke="#1a1a1a" stroke-width="5"/>
            <rect x="75" y="80" width="150" height="36" rx="6" fill="#f1f2f6" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="104" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff4757">' OR '1'='1</text>
            <rect x="75" y="128" width="150" height="30" rx="6" fill="#f1f2f6" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="95" y="170" width="110" height="26" rx="6" fill="#1a1a1a"/>
            <text x="150" y="188" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">直接放行！</text>
            <text x="242" y="95" font-size="28">👹</text>
            <text x="45" y="265" font-size="26">💣</text>
            <text x="135" y="270" text-anchor="middle" font-size="26">🚪</text>
            <text x="225" y="265" font-size="26">🔓</text>
            <text x="150" y="315" text-anchor="middle" font-size="15" font-weight="bold">输入被当成命令执行！</text>
        </svg>`,
        // ==================== 第3章场景 ====================
        sqlflow: `<svg viewBox="0 0 300 350">
            <rect x="30" y="45" width="240" height="42" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="72" text-anchor="middle" font-size="14" font-weight="bold">🚪 连接器：验身份</text>
            <rect x="30" y="99" width="240" height="42" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="126" text-anchor="middle" font-size="14" font-weight="bold">📝 解析器：读语法</text>
            <rect x="30" y="153" width="240" height="42" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="180" text-anchor="middle" font-size="14" font-weight="bold">🧠 优化器：选路线</text>
            <rect x="30" y="207" width="240" height="42" rx="10" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="234" text-anchor="middle" font-size="14" font-weight="bold">🏃 执行器：按计划干</text>
            <rect x="30" y="261" width="240" height="42" rx="10" fill="#d6f5e3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="288" text-anchor="middle" font-size="14" font-weight="bold">💾 存储引擎：碰数据</text>
            <line x1="150" y1="87" x2="150" y2="99" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="141" x2="150" y2="153" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="195" x2="150" y2="207" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="249" x2="150" y2="261" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="332" text-anchor="middle" font-size="14" font-weight="bold">五关流水线 ⚡</text>
        </svg>`,
        bufferpool: `<svg viewBox="0 0 300 350">
            <rect x="35" y="50" width="230" height="145" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="5"/>
            <text x="62" y="82" font-size="15" font-weight="bold">⚡ Buffer Pool</text>
            <rect x="55" y="98" width="55" height="36" rx="5" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="120" y="98" width="55" height="36" rx="5" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="185" y="98" width="55" height="36" rx="5" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="55" y="144" width="55" height="36" rx="5" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="120" y="144" width="55" height="36" rx="5" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="185" y="144" width="55" height="36" rx="5" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <text x="247" y="122" font-size="13" font-weight="bold">热</text>
            <text x="247" y="168" font-size="13" font-weight="bold">脏</text>
            <rect x="55" y="230" width="190" height="55" rx="10" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="264" text-anchor="middle" font-size="14" font-weight="bold">🗄️ 磁盘（大而慢）</text>
            <text x="250" y="285" font-size="24">🐌</text>
            <text x="150" y="325" text-anchor="middle" font-size="14" font-weight="bold">内存池 = 数据页仓库</text>
        </svg>`,
        bptree: `<svg viewBox="0 0 300 350">
            <rect x="95" y="45" width="110" height="38" rx="8" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="69" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">50 | 120</text>
            <rect x="45" y="122" width="90" height="36" rx="8" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="90" y="146" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">30 | 40</text>
            <rect x="165" y="122" width="90" height="36" rx="8" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="210" y="146" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">80 | 100</text>
            <line x1="130" y1="83" x2="90" y2="122" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="170" y1="83" x2="210" y2="122" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="18" y="205" width="82" height="42" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="59" y="232" text-anchor="middle" font-size="12" font-weight="bold">10,20,30</text>
            <rect x="109" y="205" width="82" height="42" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="232" text-anchor="middle" font-size="12" font-weight="bold">40,50,60</text>
            <rect x="200" y="205" width="82" height="42" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="241" y="232" text-anchor="middle" font-size="12" font-weight="bold">70,80,90</text>
            <line x1="90" y1="158" x2="59" y2="205" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="90" y1="158" x2="150" y2="205" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="210" y1="158" x2="241" y2="205" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="100" y1="247" x2="109" y2="247" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="191" y1="247" x2="200" y2="247" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="288" text-anchor="middle" font-size="13" font-weight="bold">叶子层：有序 + 双向链表</text>
            <text x="150" y="320" text-anchor="middle" font-size="15" font-weight="bold">树矮 → IO 少 → 快 ⚡</text>
        </svg>`,
        clustered: `<svg viewBox="0 0 300 350">
            <text x="80" y="50" text-anchor="middle" font-size="14" font-weight="bold">聚簇索引</text>
            <rect x="35" y="62" width="90" height="32" rx="7" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="80" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">主键 1,5,9</text>
            <rect x="22" y="130" width="116" height="62" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="80" y="154" text-anchor="middle" font-size="11" font-weight="bold">1 | 小明 | 95</text>
            <text x="80" y="174" text-anchor="middle" font-size="11" font-weight="bold">5 | 小红 | 88</text>
            <line x1="80" y1="94" x2="80" y2="130" stroke="#1a1a1a" stroke-width="3"/>
            <text x="80" y="220" text-anchor="middle" font-size="12" font-weight="bold">叶子 = 整行数据</text>
            <text x="220" y="50" text-anchor="middle" font-size="14" font-weight="bold">二级索引</text>
            <rect x="175" y="62" width="90" height="32" rx="7" fill="#a29bfe" stroke="#1a1a1a" stroke-width="4"/>
            <text x="220" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">姓名 表</text>
            <rect x="162" y="130" width="116" height="62" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="220" y="154" text-anchor="middle" font-size="11" font-weight="bold">小明 → 主键 1</text>
            <text x="220" y="174" text-anchor="middle" font-size="11" font-weight="bold">小红 → 主键 5</text>
            <line x1="220" y1="94" x2="220" y2="130" stroke="#1a1a1a" stroke-width="3"/>
            <text x="220" y="220" text-anchor="middle" font-size="12" font-weight="bold">叶子 = 键 + 主键值</text>
            <path d="M162 160 C 130 160 128 196 110 196" fill="none" stroke="#ff4757" stroke-width="3" stroke-dasharray="6 4"/>
            <text x="98" y="262" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff4757">回表 🔁</text>
            <text x="150" y="305" text-anchor="middle" font-size="14" font-weight="bold">数据即索引（一张表一个）</text>
            <text x="150" y="332" text-anchor="middle" font-size="13" font-weight="bold">覆盖索引免回表 ⚡</text>
        </svg>`,
        redoundo: `<svg viewBox="0 0 300 350">
            <rect x="35" y="62" width="105" height="128" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="87" y="96" text-anchor="middle" font-size="15" font-weight="bold">📕 Redo</text>
            <text x="87" y="124" text-anchor="middle" font-size="12" font-weight="bold">怎么做（重做）</text>
            <text x="87" y="162" text-anchor="middle" font-size="22" font-weight="bold">✓</text>
            <rect x="160" y="62" width="105" height="128" rx="10" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="212" y="96" text-anchor="middle" font-size="15" font-weight="bold">📗 Undo</text>
            <text x="212" y="124" text-anchor="middle" font-size="12" font-weight="bold">改之前（撤销）</text>
            <text x="212" y="162" text-anchor="middle" font-size="22" font-weight="bold">↩</text>
            <text x="150" y="235" text-anchor="middle" font-size="28">🛟</text>
            <text x="150" y="282" text-anchor="middle" font-size="13" font-weight="bold">崩溃 → 重放 Redo</text>
            <text x="150" y="310" text-anchor="middle" font-size="13" font-weight="bold">回滚 → 顺着 Undo 退</text>
            <text x="150" y="338" text-anchor="middle" font-size="13" font-weight="bold">WAL：日志先行 🧾</text>
        </svg>`,
        mvcc: `<svg viewBox="0 0 300 350">
            <text x="48" y="80" font-size="30">📸</text>
            <text x="100" y="68" font-size="14" font-weight="bold">快照读</text>
            <text x="100" y="90" font-size="12" font-weight="bold">读旧版本，不加锁</text>
            <rect x="42" y="126" width="72" height="52" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="78" y="158" text-anchor="middle" font-size="12" font-weight="bold">v1 旧</text>
            <rect x="124" y="126" width="72" height="52" rx="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="160" y="158" text-anchor="middle" font-size="12" font-weight="bold">v2 当前</text>
            <rect x="206" y="126" width="72" height="52" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="242" y="158" text-anchor="middle" font-size="12" font-weight="bold">v3 新</text>
            <line x1="114" y1="152" x2="124" y2="152" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="196" y1="152" x2="206" y2="152" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="212" text-anchor="middle" font-size="13" font-weight="bold">版本链：v1 → v2 → v3</text>
            <text x="45" y="262" font-size="24">👀</text>
            <text x="105" y="260" font-size="13" font-weight="bold">你看到 v2</text>
            <text x="205" y="262" font-size="24">✍️</text>
            <text x="150" y="308" text-anchor="middle" font-size="14" font-weight="bold">各读各的版本</text>
            <text x="150" y="334" text-anchor="middle" font-size="14" font-weight="bold">互不打架 🤝</text>
        </svg>`,
        // ==================== 第4章场景 ====================
        nosql: `<svg viewBox="0 0 300 350">
            <rect x="40" y="55" width="100" height="95" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="90" y="102" text-anchor="middle" font-size="30">🔑</text>
            <text x="90" y="134" text-anchor="middle" font-size="14" font-weight="bold">键值 KV</text>
            <rect x="160" y="55" width="100" height="95" rx="12" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="210" y="102" text-anchor="middle" font-size="30">📄</text>
            <text x="210" y="134" text-anchor="middle" font-size="14" font-weight="bold">文档</text>
            <rect x="40" y="170" width="100" height="95" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="90" y="217" text-anchor="middle" font-size="30">🏛️</text>
            <text x="90" y="249" text-anchor="middle" font-size="14" font-weight="bold">列族</text>
            <rect x="160" y="170" width="100" height="95" rx="12" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="210" y="217" text-anchor="middle" font-size="30">🕸️</text>
            <text x="210" y="249" text-anchor="middle" font-size="14" font-weight="bold">图</text>
            <text x="150" y="308" text-anchor="middle" font-size="15" font-weight="bold">NoSQL 四大家族</text>
            <text x="150" y="335" text-anchor="middle" font-size="13" font-weight="bold">结构灵活 · 水平扩展</text>
        </svg>`,
        redis: `<svg viewBox="0 0 300 350">
            <text x="150" y="88" text-anchor="middle" font-size="44">⚡</text>
            <rect x="55" y="108" width="190" height="82" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="5"/>
            <text x="150" y="142" text-anchor="middle" font-size="16" font-weight="bold">内存中的数据</text>
            <text x="150" y="170" text-anchor="middle" font-size="12" font-weight="bold">微秒级操作 · 十万级 QPS</text>
            <rect x="60" y="238" width="34" height="60" rx="4" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="105" y="218" width="34" height="80" rx="4" fill="#00d2d3" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="150" y="248" width="34" height="50" rx="4" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="195" y="202" width="34" height="96" rx="4" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="244" y="232" font-size="22">🏆</text>
            <text x="150" y="328" text-anchor="middle" font-size="14" font-weight="bold">ZSet：排行榜的当家花旦</text>
        </svg>`,
        cache3: `<svg viewBox="0 0 300 350">
            <rect x="30" y="50" width="240" height="80" rx="12" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="58" y="98" font-size="26">👻</text>
            <text x="96" y="84" font-size="15" font-weight="bold">穿透：查不存在的数据</text>
            <text x="96" y="110" font-size="12" font-weight="bold">缓存和库里都没有 → 次次打库</text>
            <rect x="30" y="145" width="240" height="80" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="58" y="193" font-size="26">🔥</text>
            <text x="96" y="179" font-size="15" font-weight="bold">击穿：热点 key 过期</text>
            <text x="96" y="205" font-size="12" font-weight="bold">一个热点失效 → 万箭齐发</text>
            <rect x="30" y="240" width="240" height="80" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="58" y="288" font-size="26">🏔️</text>
            <text x="96" y="274" font-size="15" font-weight="bold">雪崩：大批 key 同时过期</text>
            <text x="96" y="300" font-size="12" font-weight="bold">或 Redis 整体宕机</text>
        </svg>`,
        mongodb: `<svg viewBox="0 0 300 350">
            <path d="M42 88 L120 88 L136 110 L258 110 L258 285 L42 285 Z" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="5"/>
            <rect x="68" y="140" width="164" height="118" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="175" text-anchor="middle" font-size="20" font-weight="bold">{ }</text>
            <text x="150" y="205" text-anchor="middle" font-size="12" font-weight="bold">name: '手机'</text>
            <text x="150" y="230" text-anchor="middle" font-size="12" font-weight="bold">tags: [ … ]</text>
            <text x="240" y="70" font-size="26">📄</text>
            <text x="150" y="322" text-anchor="middle" font-size="14" font-weight="bold">文档：想加字段就加</text>
        </svg>`,
        rdb: `<svg viewBox="0 0 300 350">
            <rect x="45" y="62" width="120" height="95" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <circle cx="105" cy="112" r="26" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <rect x="76" y="50" width="34" height="16" rx="4" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="3"/>
            <text x="105" y="192" text-anchor="middle" font-size="15" font-weight="bold">📸 RDB 快照</text>
            <rect x="168" y="170" width="92" height="115" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <line x1="183" y1="196" x2="245" y2="196" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="183" y1="218" x2="245" y2="218" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="183" y1="240" x2="230" y2="240" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="183" y1="262" x2="245" y2="262" stroke="#1a1a1a" stroke-width="3"/>
            <text x="214" y="312" text-anchor="middle" font-size="15" font-weight="bold">🧾 AOF 流水账</text>
            <text x="150" y="338" text-anchor="middle" font-size="12" font-weight="bold">4.0+ 混合持久化</text>
        </svg>`,
        // ==================== 第5章场景 ====================
        sharding: `<svg viewBox="0 0 300 350">
            <rect x="90" y="42" width="120" height="92" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <line x1="90" y1="72" x2="210" y2="72" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="150" y1="42" x2="150" y2="134" stroke="#1a1a1a" stroke-width="2.5"/>
            <line x1="90" y1="103" x2="210" y2="103" stroke="#1a1a1a" stroke-width="2.5"/>
            <text x="150" y="63" text-anchor="middle" font-size="11" font-weight="bold">一张 5000 万行的表</text>
            <text x="150" y="162" text-anchor="middle" font-size="17" font-weight="bold">✂️ 切！</text>
            <rect x="30" y="188" width="105" height="55" rx="8" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="82" y="221" text-anchor="middle" font-size="13" font-weight="bold">分片 1</text>
            <rect x="165" y="188" width="105" height="55" rx="8" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="217" y="221" text-anchor="middle" font-size="13" font-weight="bold">分片 2</text>
            <rect x="30" y="258" width="105" height="55" rx="8" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="82" y="291" text-anchor="middle" font-size="13" font-weight="bold">分片 3</text>
            <rect x="165" y="258" width="105" height="55" rx="8" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="217" y="291" text-anchor="middle" font-size="13" font-weight="bold">分片 4</text>
            <line x1="120" y1="148" x2="80" y2="188" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="180" y1="148" x2="217" y2="188" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="338" text-anchor="middle" font-size="13" font-weight="bold">分片键决定去哪个片 🧭</text>
        </svg>`,
        replication: `<svg viewBox="0 0 300 350">
            <rect x="90" y="45" width="120" height="70" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="74" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">主库 Master</text>
            <text x="150" y="98" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">写 binlog 📝</text>
            <rect x="30" y="195" width="75" height="62" rx="9" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="67" y="222" text-anchor="middle" font-size="12" font-weight="bold">从库 1</text>
            <text x="67" y="244" text-anchor="middle" font-size="11" font-weight="bold">relay 📗</text>
            <rect x="112" y="195" width="75" height="62" rx="9" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="222" text-anchor="middle" font-size="12" font-weight="bold">从库 2</text>
            <text x="150" y="244" text-anchor="middle" font-size="11" font-weight="bold">relay 📗</text>
            <rect x="194" y="195" width="75" height="62" rx="9" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="231" y="222" text-anchor="middle" font-size="12" font-weight="bold">从库 3</text>
            <text x="231" y="244" text-anchor="middle" font-size="11" font-weight="bold">relay 📗</text>
            <line x1="150" y1="115" x2="67" y2="195" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="7 5"/>
            <line x1="150" y1="115" x2="150" y2="195" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="7 5"/>
            <line x1="150" y1="115" x2="231" y2="195" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="7 5"/>
            <text x="150" y="298" text-anchor="middle" font-size="13" font-weight="bold">binlog → relay log → 重放</text>
            <text x="150" y="328" text-anchor="middle" font-size="13" font-weight="bold">主库挂 → 从库顶上 🔁</text>
        </svg>`,
        readwrite: `<svg viewBox="0 0 300 350">
            <rect x="32" y="55" width="112" height="118" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="5"/>
            <text x="88" y="112" text-anchor="middle" font-size="30">✍️</text>
            <text x="88" y="150" text-anchor="middle" font-size="13" font-weight="bold">写 INSERT/UPDATE</text>
            <rect x="156" y="55" width="112" height="118" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="5"/>
            <text x="212" y="112" text-anchor="middle" font-size="30">👀</text>
            <text x="212" y="150" text-anchor="middle" font-size="13" font-weight="bold">读 SELECT</text>
            <rect x="32" y="228" width="112" height="60" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="88" y="264" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">主库</text>
            <rect x="156" y="228" width="50" height="60" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="181" y="264" text-anchor="middle" font-size="12" font-weight="bold">从1</text>
            <rect x="218" y="228" width="50" height="60" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="243" y="264" text-anchor="middle" font-size="12" font-weight="bold">从2</text>
            <line x1="88" y1="173" x2="88" y2="228" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="212" y1="173" x2="181" y2="228" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="212" y1="173" x2="243" y2="228" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="322" text-anchor="middle" font-size="14" font-weight="bold">读多写少 → 各走各路</text>
        </svg>`,
        cap: `<svg viewBox="0 0 300 350">
            <path d="M150 72 L72 248 L228 248 Z" fill="#fff" stroke="#1a1a1a" stroke-width="5" stroke-linejoin="round"/>
            <text x="150" y="52" text-anchor="middle" font-size="28" font-weight="bold" fill="#ff6b6b">C</text>
            <text x="50" y="285" text-anchor="middle" font-size="28" font-weight="bold" fill="#00d2d3">A</text>
            <text x="250" y="285" text-anchor="middle" font-size="28" font-weight="bold" fill="#ff9f43">P</text>
            <circle cx="150" cy="175" r="46" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="170" text-anchor="middle" font-size="14" font-weight="bold">选二</text>
            <text x="150" y="192" text-anchor="middle" font-size="14" font-weight="bold">弃一 ⚖️</text>
            <text x="150" y="312" text-anchor="middle" font-size="14" font-weight="bold">网络必分区 → P 必选</text>
            <text x="150" y="338" text-anchor="middle" font-size="13" font-weight="bold">CP 还是 AP？看取舍</text>
        </svg>`,
        disttx: `<svg viewBox="0 0 300 350">
            <rect x="32" y="52" width="92" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="78" y="85" text-anchor="middle" font-size="13" font-weight="bold">库存库 📦</text>
            <text x="78" y="108" text-anchor="middle" font-size="12" font-weight="bold">-1</text>
            <rect x="176" y="52" width="92" height="72" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="222" y="85" text-anchor="middle" font-size="13" font-weight="bold">账户库 💰</text>
            <text x="222" y="108" text-anchor="middle" font-size="12" font-weight="bold">-100</text>
            <rect x="104" y="165" width="92" height="72" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="198" text-anchor="middle" font-size="13" font-weight="bold">订单库 🧾</text>
            <text x="150" y="221" text-anchor="middle" font-size="12" font-weight="bold">+1</text>
            <line x1="78" y1="124" x2="128" y2="165" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="222" y1="124" x2="172" y2="165" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="288" text-anchor="middle" font-size="30">✅</text>
            <text x="150" y="328" text-anchor="middle" font-size="14" font-weight="bold">跨库也要同生共死</text>
        </svg>`,
        // ==================== 第6章场景 ====================
        vector: `<svg viewBox="0 0 300 350">
            <text x="48" y="92" font-size="32">🐱</text>
            <text x="92" y="80" font-size="13" font-weight="bold">'猫'</text>
            <text x="128" y="88" font-size="18" font-weight="bold">→</text>
            <rect x="158" y="60" width="118" height="40" rx="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="217" y="85" text-anchor="middle" font-size="12" font-weight="bold">[0.2, -1.3, 0.8…]</text>
            <text x="48" y="162" font-size="32">🐈</text>
            <text x="92" y="150" font-size="13" font-weight="bold">'小猫'</text>
            <text x="128" y="158" font-size="18" font-weight="bold">→</text>
            <rect x="158" y="130" width="118" height="40" rx="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="217" y="155" text-anchor="middle" font-size="12" font-weight="bold">[0.3, -1.1, 0.9…]</text>
            <text x="48" y="232" font-size="32">🚗</text>
            <text x="92" y="220" font-size="13" font-weight="bold">'汽车'</text>
            <text x="128" y="228" font-size="18" font-weight="bold">→</text>
            <rect x="158" y="200" width="118" height="40" rx="8" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="217" y="225" text-anchor="middle" font-size="12" font-weight="bold">[-2.1, 0.7, -0.4…]</text>
            <text x="30" y="130" font-size="20">⇣</text>
            <text x="150" y="290" text-anchor="middle" font-size="14" font-weight="bold">语义近 → 数字也近</text>
            <text x="150" y="322" text-anchor="middle" font-size="13" font-weight="bold">高维空间里的'点'</text>
        </svg>`,
        distance: `<svg viewBox="0 0 300 350">
            <text x="150" y="58" text-anchor="middle" font-size="15" font-weight="bold">余弦：看夹角 θ</text>
            <circle cx="80" cy="190" r="5.5" fill="#1a1a1a"/>
            <line x1="80" y1="190" x2="222" y2="125" stroke="#ff6b6b" stroke-width="6" stroke-linecap="round"/>
            <line x1="80" y1="190" x2="240" y2="185" stroke="#00d2d3" stroke-width="6" stroke-linecap="round"/>
            <path d="M128 158 A 60 60 0 0 1 138 172" fill="none" stroke="#1a1a1a" stroke-width="3"/>
            <text x="140" y="150" font-size="14" font-weight="bold">θ</text>
            <text x="150" y="252" text-anchor="middle" font-size="15" font-weight="bold">欧氏：看两点距离 d</text>
            <circle cx="175" cy="290" r="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="240" cy="305" r="8" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="183" y1="292" x2="232" y2="303" stroke="#1a1a1a" stroke-width="3.5" stroke-dasharray="5 4"/>
            <text x="128" y="312" font-size="13" font-weight="bold">d</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">归一化后：cos = 内积 ⚡</text>
        </svg>`,
        hnsw: `<svg viewBox="0 0 300 350">
            <text x="42" y="62" font-size="13" font-weight="bold">顶层（稀疏）</text>
            <line x1="92" y1="72" x2="204" y2="72" stroke="#00d2d3" stroke-width="4"/>
            <circle cx="92" cy="72" r="9" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="204" cy="72" r="9" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <text x="42" y="152" font-size="13" font-weight="bold">中层（较密）</text>
            <line x1="72" y1="168" x2="150" y2="168" stroke="#00d2d3" stroke-width="4"/>
            <line x1="150" y1="168" x2="230" y2="168" stroke="#00d2d3" stroke-width="4"/>
            <line x1="72" y1="168" x2="230" y2="168" stroke="#00d2d3" stroke-width="2.5" stroke-dasharray="6 5"/>
            <circle cx="72" cy="168" r="9" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="150" cy="168" r="9" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="230" cy="168" r="9" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <text x="42" y="248" font-size="13" font-weight="bold">底层（全量）</text>
            <line x1="45" y1="282" x2="105" y2="264" stroke="#a29bfe" stroke-width="3.5"/>
            <line x1="105" y1="264" x2="150" y2="282" stroke="#a29bfe" stroke-width="3.5"/>
            <line x1="150" y1="282" x2="200" y2="262" stroke="#a29bfe" stroke-width="3.5"/>
            <line x1="200" y1="262" x2="255" y2="280" stroke="#a29bfe" stroke-width="3.5"/>
            <line x1="105" y1="264" x2="200" y2="262" stroke="#a29bfe" stroke-width="2.5" stroke-dasharray="6 5"/>
            <circle cx="45" cy="282" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="105" cy="264" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="150" cy="282" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="200" cy="262" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="255" cy="280" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="325" text-anchor="middle" font-size="14" font-weight="bold">先跳后找，越走越细 🎯</text>
        </svg>`,
        milvus: `<svg viewBox="0 0 300 350">
            <rect x="75" y="50" width="150" height="255" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="5"/>
            <rect x="95" y="75" width="110" height="42" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="101" text-anchor="middle" font-size="13" font-weight="bold">🏢 Collection</text>
            <rect x="95" y="130" width="110" height="42" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="156" text-anchor="middle" font-size="13" font-weight="bold">🔢 向量字段</text>
            <rect x="95" y="185" width="110" height="42" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="211" text-anchor="middle" font-size="13" font-weight="bold">🏷️ 标量字段</text>
            <rect x="95" y="240" width="110" height="42" rx="6" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="266" text-anchor="middle" font-size="13" font-weight="bold">⚡ 索引 HNSW…</text>
            <text x="242" y="72" font-size="22">🔍</text>
            <text x="150" y="332" text-anchor="middle" font-size="13" font-weight="bold">亿级向量的公寓楼</text>
        </svg>`,
        rag: `<svg viewBox="0 0 300 350">
            <rect x="42" y="65" width="132" height="175" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="5"/>
            <text x="108" y="98" text-anchor="middle" font-size="15" font-weight="bold">私有知识库</text>
            <line x1="62" y1="125" x2="154" y2="125" stroke="#1a1a1a" stroke-width="3" opacity="0.4"/>
            <line x1="62" y1="150" x2="154" y2="150" stroke="#1a1a1a" stroke-width="3" opacity="0.4"/>
            <line x1="62" y1="175" x2="140" y2="175" stroke="#1a1a1a" stroke-width="3" opacity="0.4"/>
            <rect x="62" y="196" width="76" height="26" rx="5" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <text x="100" y="214" text-anchor="middle" font-size="11" font-weight="bold">最相关片段</text>
            <text x="196" y="140" text-anchor="middle" font-size="38">🤖</text>
            <text x="182" y="106" font-size="24">🔍</text>
            <path d="M178 180 C 208 172 216 194 192 212" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="6 5"/>
            <rect x="122" y="258" width="150" height="44" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="197" y="285" text-anchor="middle" font-size="12" font-weight="bold">检索 → 拼提示词 → 生成</text>
            <text x="150" y="330" text-anchor="middle" font-size="14" font-weight="bold">开卷考试：先查再答</text>
        </svg>`,
        agentmem: `<svg viewBox="0 0 300 350">
            <text x="52" y="118" font-size="52">🤖</text>
            <text x="80" y="152" text-anchor="middle" font-size="13" font-weight="bold">塔库</text>
            <line x1="125" y1="100" x2="172" y2="100" stroke="#1a1a1a" stroke-width="3.5" stroke-dasharray="6 5"/>
            <rect x="178" y="55" width="92" height="92" rx="12" fill="#e0d7ff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="224" y="98" text-anchor="middle" font-size="26">🧠</text>
            <text x="224" y="128" text-anchor="middle" font-size="12" font-weight="bold">长期记忆库</text>
            <rect x="58" y="200" width="184" height="58" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="225" text-anchor="middle" font-size="12" font-weight="bold">短期：对话上下文</text>
            <text x="150" y="246" text-anchor="middle" font-size="11" font-weight="bold">（会装满、会遗忘）</text>
            <text x="150" y="296" text-anchor="middle" font-size="14" font-weight="bold">写：摘要 + 向量化 ✍️</text>
            <text x="150" y="326" text-anchor="middle" font-size="14" font-weight="bold">读：语义召回 Top-K 🔍</text>
        </svg>`,
        'table-anatomy': `<svg viewBox="0 0 300 350">
            <rect x="28" y="70" width="244" height="150" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="5"/>
            <rect x="28" y="70" width="244" height="42" fill="#ff9f43" stroke="#1a1a1a" stroke-width="5"/>
            <line x1="110" y1="70" x2="110" y2="220" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="190" y1="70" x2="190" y2="220" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="28" y1="145" x2="272" y2="145" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="28" y1="182" x2="272" y2="182" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="29" y="113" width="242" height="31" fill="#ffd32a" opacity="0.45"/>
            <text x="46" y="98" font-size="14" font-weight="bold" fill="#fff">学号</text>
            <text x="126" y="98" font-size="14" font-weight="bold" fill="#fff">姓名</text>
            <text x="206" y="98" font-size="14" font-weight="bold" fill="#fff">成绩</text>
            <text x="44" y="134" font-size="13" class="clickable">007</text>
            <text x="124" y="134" font-size="13" class="clickable">小明</text>
            <text x="204" y="134" font-size="13" class="clickable">95</text>
            <text x="44" y="170" font-size="13">008</text>
            <text x="124" y="170" font-size="13">小红</text>
            <text x="204" y="170" font-size="13">88</text>
            <text x="44" y="207" font-size="13">009</text>
            <text x="124" y="207" font-size="13">小刚</text>
            <text x="204" y="207" font-size="13">76</text>
            <text x="150" y="252" text-anchor="middle" font-size="14" font-weight="bold">⬆️ 纵向：列 = 字段 = 属性</text>
            <text x="150" y="278" text-anchor="middle" font-size="14" font-weight="bold">➡️ 横向：行 = 记录 = 元组</text>
            <text x="40" y="322" font-size="20">📊</text>
            <text x="242" y="322" font-size="20">🧱</text>
            <text x="150" y="325" text-anchor="middle" font-size="13" font-weight="bold">列定形状，行装内容</text>
            </svg>`,
        'crud-pipeline': `<svg viewBox="0 0 300 350">
            <text x="150" y="40" text-anchor="middle" font-size="14" font-weight="bold">🎛️ 一条记录的一生</text>
            <rect x="30" y="60" width="240" height="46" rx="10" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="90" text-anchor="middle" font-size="15" font-weight="bold" class="clickable">➕ Create 新增</text>
            <rect x="30" y="126" width="240" height="46" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="156" text-anchor="middle" font-size="15" font-weight="bold" class="clickable">🔍 Read 查询</text>
            <rect x="30" y="192" width="240" height="46" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="222" text-anchor="middle" font-size="15" font-weight="bold" class="clickable">✏️ Update 修改</text>
            <rect x="30" y="258" width="240" height="46" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="288" text-anchor="middle" font-size="15" font-weight="bold" class="clickable">🗑️ Delete 删除</text>
            <line x1="150" y1="106" x2="150" y2="126" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="172" x2="150" y2="192" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="238" x2="150" y2="258" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="330" text-anchor="middle" font-size="13" font-weight="bold">增 → 查 → 改 → 删</text>
            </svg>`,
        'sql-anatomy': `<svg viewBox="0 0 300 350">
            <text x="150" y="40" text-anchor="middle" font-size="14" font-weight="bold">📝 你写的顺序</text>
            <rect x="30" y="52" width="240" height="34" rx="8" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="75" text-anchor="middle" font-size="13" font-weight="bold">SELECT → FROM → WHERE</text>
            <text x="150" y="118" text-anchor="middle" font-size="20">⬇️</text>
            <text x="150" y="152" text-anchor="middle" font-size="14" font-weight="bold">⚙️ 数据库真正执行的顺序</text>
            <rect x="30" y="164" width="240" height="34" rx="8" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="187" text-anchor="middle" font-size="13" font-weight="bold" class="clickable">① FROM 找表 / 连接</text>
            <rect x="30" y="204" width="240" height="34" rx="8" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="227" text-anchor="middle" font-size="13" font-weight="bold" class="clickable">② WHERE 过滤行</text>
            <rect x="30" y="244" width="240" height="34" rx="8" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="267" text-anchor="middle" font-size="13" font-weight="bold" class="clickable">③ SELECT 挑列 / 算表达式</text>
            <rect x="30" y="284" width="240" height="34" rx="8" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="307" text-anchor="middle" font-size="13" font-weight="bold" class="clickable">④ ORDER BY 排序</text>
            <text x="150" y="338" text-anchor="middle" font-size="13" font-weight="bold">写的顺序 ≠ 跑的顺序 🌀</text>
            </svg>`,
        'index-miss': `<svg viewBox="0 0 300 350">
            <text x="150" y="42" text-anchor="middle" font-size="14" font-weight="bold">🔖 索引罢工现场</text>
            <rect x="28" y="58" width="244" height="122" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="44" y="90" font-size="12.5" font-weight="bold">WHERE name LIKE '%明'</text>
            <text x="240" y="94" text-anchor="middle" font-size="20">🚫</text>
            <text x="44" y="124" font-size="12.5" font-weight="bold">WHERE YEAR(dt) = 2024</text>
            <text x="240" y="128" text-anchor="middle" font-size="20">🚫</text>
            <text x="44" y="158" font-size="12.5" font-weight="bold">WHERE age + 1 = 18</text>
            <text x="240" y="162" text-anchor="middle" font-size="20">🚫</text>
            <text x="150" y="205" text-anchor="middle" font-size="13" font-weight="bold">索引：这个条件我定位不了！</text>
            <circle cx="128" cy="258" r="38" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="5" class="clickable"/>
            <line x1="156" y1="286" x2="200" y2="330" stroke="#1a1a1a" stroke-width="10" stroke-linecap="round"/>
            <text x="110" y="270" font-size="26">🔍</text>
            <text x="212" y="238" font-size="24">🐌</text>
            <text x="150" y="342" text-anchor="middle" font-size="13" font-weight="bold">只能退化成全表扫描 ⚠️</text>
            </svg>`,
        'tx-states': `<svg viewBox="0 0 300 350">
            <rect x="88" y="52" width="124" height="46" rx="23" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="81" text-anchor="middle" font-size="15" font-weight="bold">BEGIN 开始</text>
            <line x1="150" y1="98" x2="150" y2="138" stroke="#1a1a1a" stroke-width="4"/>
            <path d="M 62 188 L 150 138 L 238 188" fill="none" stroke="#1a1a1a" stroke-width="4"/>
            <rect x="18" y="188" width="116" height="62" rx="10" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="76" y="214" text-anchor="middle" font-size="14" font-weight="bold">✅ COMMIT</text>
            <text x="76" y="236" text-anchor="middle" font-size="12" font-weight="bold">落定，不可反悔</text>
            <rect x="166" y="188" width="116" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="224" y="214" text-anchor="middle" font-size="14" font-weight="bold">↩️ ROLLBACK</text>
            <text x="224" y="236" text-anchor="middle" font-size="12" font-weight="bold">撤销，回到起点</text>
            <text x="150" y="292" text-anchor="middle" font-size="24">⚖️</text>
            <text x="150" y="330" text-anchor="middle" font-size="14" font-weight="bold">要么全成功，要么全失败</text>
            </svg>`,
        'sqlflow-cost': `<svg viewBox="0 0 300 350">
            <text x="150" y="38" text-anchor="middle" font-size="15" font-weight="bold">🧠 优化器：算一笔账</text>
            <rect x="30" y="56" width="240" height="58" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="82" text-anchor="middle" font-size="13" font-weight="bold">方案A：走索引，估 12 行</text>
            <text x="150" y="104" text-anchor="middle" font-size="12" font-weight="bold">代价 12 × 随机 IO 😰</text>
            <rect x="30" y="126" width="240" height="58" rx="10" fill="#d6f5e3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="152" text-anchor="middle" font-size="13" font-weight="bold">方案B：全表扫描，估 10000 行</text>
            <text x="150" y="174" text-anchor="middle" font-size="12" font-weight="bold">代价 10000 × 顺序 IO 🤔</text>
            <text x="150" y="212" text-anchor="middle" font-size="15" font-weight="bold">比一比 → 选便宜的那条 ✅</text>
            <rect x="45" y="236" width="66" height="52" rx="8" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="78" y="268" text-anchor="middle" font-size="12" font-weight="bold">解析</text>
            <rect x="117" y="236" width="66" height="52" rx="8" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="268" text-anchor="middle" font-size="12" font-weight="bold">优化</text>
            <rect x="189" y="236" width="66" height="52" rx="8" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="222" y="268" text-anchor="middle" font-size="12" font-weight="bold">执行</text>
            <text x="150" y="322" text-anchor="middle" font-size="13" font-weight="bold">统计信息说了算 📊</text>
            </svg>`,
        'bufferpool-scan': `<svg viewBox="0 0 300 350">
            <text x="150" y="36" text-anchor="middle" font-size="15" font-weight="bold">一次全表扫描冲进来 😱</text>
            <rect x="40" y="52" width="220" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="76" text-anchor="middle" font-size="13" font-weight="bold">young 区（热数据，约 5/8）</text>
            <text x="150" y="102" text-anchor="middle" font-size="12" font-weight="bold">热点页：稳稳不动 🛡️</text>
            <rect x="40" y="134" width="220" height="72" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="158" text-anchor="middle" font-size="13" font-weight="bold">old 区（新页先进这里）</text>
            <text x="150" y="184" text-anchor="middle" font-size="12" font-weight="bold">扫描页：来得快，去得也快 🍃</text>
            <text x="150" y="232" text-anchor="middle" font-size="13" font-weight="bold">再被访问一次 → 才升进 young</text>
            <text x="58" y="272" font-size="26">📄</text>
            <text x="118" y="272" font-size="26">📄</text>
            <text x="178" y="272" font-size="26">📄</text>
            <text x="238" y="272" font-size="26">🌊</text>
            <text x="150" y="316" text-anchor="middle" font-size="14" font-weight="bold">缓冲池不是垃圾桶！</text>
            <text x="150" y="338" text-anchor="middle" font-size="12" font-weight="bold">大扫描会挤占内存、堆出脏页</text>
            </svg>`,
        'mvcc-lock': `<svg viewBox="0 0 300 350">
            <text x="150" y="36" text-anchor="middle" font-size="15" font-weight="bold">两个事务抢同一行 🔥</text>
            <rect x="70" y="118" width="160" height="66" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="146" text-anchor="middle" font-size="13" font-weight="bold">id=1 库存 = 1</text>
            <text x="150" y="170" text-anchor="middle" font-size="12" font-weight="bold">🔒 已被 T1 锁住</text>
            <text x="34" y="74" font-size="26">🅰️</text>
            <text x="72" y="74" font-size="12" font-weight="bold">T1：SELECT … FOR UPDATE</text>
            <text x="34" y="242" font-size="26">🅱️</text>
            <text x="72" y="242" font-size="12" font-weight="bold">T2：也想改这一行</text>
            <path d="M56 92 C 56 118 86 120 96 126" fill="none" stroke="#1a1a1a" stroke-width="3"/>
            <path d="M56 232 C 56 208 86 200 96 186" fill="none" stroke="#ff4757" stroke-width="3" stroke-dasharray="6 4"/>
            <text x="150" y="268" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff4757">⏳ 只能排队等锁释放</text>
            <text x="150" y="302" text-anchor="middle" font-size="13" font-weight="bold">读-改-写必须串行化</text>
            <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">否则丢失更新 → 超卖</text>
            </svg>`,
        'cache3-toolkit': `<svg viewBox="0 0 300 350">
            <text x="150" y="36" text-anchor="middle" font-size="15" font-weight="bold">🧰 缓存三灾急救箱</text>
            <rect x="30" y="52" width="240" height="72" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="52" y="98" font-size="24">🛡️</text>
            <text x="88" y="82" font-size="13" font-weight="bold">防穿透：布隆过滤器 + 空值缓存</text>
            <text x="88" y="106" font-size="12" font-weight="bold">不存在 → 提前拦下</text>
            <rect x="30" y="136" width="240" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="52" y="182" font-size="24">🔒</text>
            <text x="88" y="166" font-size="13" font-weight="bold">防击穿：互斥锁 / 逻辑过期</text>
            <text x="88" y="190" font-size="12" font-weight="bold">只放一个请求去重建</text>
            <rect x="30" y="220" width="240" height="72" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="52" y="266" font-size="24">🎲</text>
            <text x="88" y="250" font-size="13" font-weight="bold">防雪崩：TTL 加随机 + 多级缓存</text>
            <text x="88" y="274" font-size="12" font-weight="bold">别让 key 一起过期</text>
            <text x="150" y="322" text-anchor="middle" font-size="13" font-weight="bold">对症下药，别乱吃药 💊</text>
            </svg>`,
        'sharding-split': `<svg viewBox="0 0 300 350"> <rect x="30" y="40" width="240" height="76" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="4"/> <line x1="110" y1="40" x2="110" y2="116" stroke="#1a1a1a" stroke-width="3"/> <line x1="190" y1="40" x2="190" y2="116" stroke="#1a1a1a" stroke-width="3"/> <line x1="30" y1="76" x2="270" y2="76" stroke="#1a1a1a" stroke-width="2.5"/> <text x="70" y="64" text-anchor="middle" font-size="10" font-weight="bold">id</text> <text x="150" y="64" text-anchor="middle" font-size="10" font-weight="bold">name</text> <text x="230" y="64" text-anchor="middle" font-size="10" font-weight="bold">简介 TEXT</text> <text x="70" y="100" text-anchor="middle" font-size="10" fill="#666">1</text> <text x="150" y="100" text-anchor="middle" font-size="10" fill="#666">小明</text> <text x="230" y="100" text-anchor="middle" font-size="10" fill="#666">很长…</text> <line x1="150" y1="24" x2="150" y2="132" stroke="#ff6b6b" stroke-width="4" stroke-dasharray="9 6" class="clickable"/> <text x="196" y="32" font-size="20">✂️</text> <text x="150" y="152" text-anchor="middle" font-size="12.5" font-weight="bold">垂直拆：切列（业务 / 字段）⬆️</text> <rect x="30" y="172" width="240" height="34" rx="5" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="3.5"/> <text x="150" y="194" text-anchor="middle" font-size="11" font-weight="bold">行1 · 行2 · 行3 · … 5000 万行</text> <line x1="14" y1="202" x2="286" y2="202" stroke="#00d2d3" stroke-width="4" stroke-dasharray="9 6" class="clickable"/> <text x="150" y="228" text-anchor="middle" font-size="12.5" font-weight="bold">水平拆：切行（同结构，% 4）➡️</text> <rect x="30" y="242" width="54" height="36" rx="5" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3.5"/> <text x="57" y="265" text-anchor="middle" font-size="11" font-weight="bold">表0</text> <rect x="88" y="242" width="54" height="36" rx="5" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3.5"/> <text x="115" y="265" text-anchor="middle" font-size="11" font-weight="bold">表1</text> <rect x="146" y="242" width="54" height="36" rx="5" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3.5"/> <text x="173" y="265" text-anchor="middle" font-size="11" font-weight="bold">表2</text> <rect x="204" y="242" width="54" height="36" rx="5" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="3.5"/> <text x="231" y="265" text-anchor="middle" font-size="11" font-weight="bold">表3</text> <text x="150" y="306" text-anchor="middle" font-size="12" font-weight="bold">垂直拆的是'列'，水平拆的是'行'</text> <text x="150" y="332" text-anchor="middle" font-size="12" font-weight="bold">顺序：先垂直，再水平 🍰</text> </svg>`,
        'sharding-route': `<svg viewBox="0 0 300 350"> <rect x="66" y="30" width="168" height="46" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" class="clickable"/> <text x="150" y="59" text-anchor="middle" font-size="14" font-weight="bold">🔑 user_id = 888</text> <line x1="150" y1="76" x2="150" y2="96" stroke="#1a1a1a" stroke-width="4"/> <path d="M150 108 L142 94 L158 94 Z" fill="#1a1a1a"/> <circle cx="150" cy="142" r="32" fill="#fff" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="150" y="148" text-anchor="middle" font-size="14" font-weight="bold">% 4</text> <text x="150" y="200" text-anchor="middle" font-size="13" font-weight="bold">888 % 4 = 0 → 第 0 片</text> <line x1="150" y1="212" x2="54" y2="238" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="6 4"/> <line x1="150" y1="212" x2="115" y2="238" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="6 4"/> <line x1="150" y1="212" x2="173" y2="238" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="6 4"/> <line x1="150" y1="212" x2="231" y2="238" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="6 4"/> <rect x="24" y="242" width="60" height="52" rx="6" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4" class="clickable"/> <text x="54" y="264" text-anchor="middle" font-size="11" font-weight="bold">user_0</text> <text x="54" y="284" text-anchor="middle" font-size="13">✅</text> <rect x="88" y="242" width="54" height="52" rx="6" fill="#f2f2f2" stroke="#1a1a1a" stroke-width="3"/> <text x="115" y="264" text-anchor="middle" font-size="11" font-weight="bold">user_1</text> <text x="115" y="284" text-anchor="middle" font-size="12">🚫</text> <rect x="146" y="242" width="54" height="52" rx="6" fill="#f2f2f2" stroke="#1a1a1a" stroke-width="3"/> <text x="173" y="264" text-anchor="middle" font-size="11" font-weight="bold">user_2</text> <text x="173" y="284" text-anchor="middle" font-size="12">🚫</text> <rect x="204" y="242" width="54" height="52" rx="6" fill="#f2f2f2" stroke="#1a1a1a" stroke-width="3"/> <text x="231" y="264" text-anchor="middle" font-size="11" font-weight="bold">user_3</text> <text x="231" y="284" text-anchor="middle" font-size="12">🚫</text> <text x="150" y="318" text-anchor="middle" font-size="12" font-weight="bold">带分片键：只发往命中的那一片 ⚡</text> <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">不带分片键：全片广播 + 归并 🚨</text> </svg>`,
        'replication-binlog': `<svg viewBox="0 0 300 350"> <rect x="22" y="12" width="80" height="20" rx="6" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="2.5"/> <text x="62" y="26" text-anchor="middle" font-size="9" font-weight="bold">STATEMENT 小</text> <rect x="108" y="12" width="80" height="20" rx="6" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="2.5"/> <text x="148" y="26" text-anchor="middle" font-size="9" font-weight="bold">ROW 最安全</text> <rect x="194" y="12" width="84" height="20" rx="6" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="2.5"/> <text x="236" y="26" text-anchor="middle" font-size="9" font-weight="bold">MIXED 自动挑</text> <rect x="60" y="42" width="180" height="70" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="150" y="70" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">主库 Master</text> <text x="150" y="94" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">📝 binlog（黑板）</text> <line x1="112" y1="112" x2="112" y2="158" stroke="#1a1a1a" stroke-width="4"/> <path d="M112 172 L104 156 L120 156 Z" fill="#1a1a1a"/> <text x="124" y="144" font-size="11" font-weight="bold">dump 推送 →</text> <rect x="60" y="174" width="180" height="88" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/> <text x="150" y="200" text-anchor="middle" font-size="13" font-weight="bold">从库 Slave</text> <text x="150" y="224" text-anchor="middle" font-size="11.5" font-weight="bold">📗 relay log（IO 线程落地）</text> <text x="150" y="248" text-anchor="middle" font-size="11.5" font-weight="bold">▶ SQL 线程重放</text> <path d="M240 205 C272 182 272 118 244 92" fill="none" stroke="#00d2d3" stroke-width="4" stroke-dasharray="8 5" class="clickable"/> <path d="M244 88 L236 102 L252 100 Z" fill="#00d2d3"/> <text x="284" y="150" text-anchor="middle" font-size="10" font-weight="bold" fill="#00d2d3" transform="rotate(90 284 150)">✅ ACK 半同步等它</text> <text x="150" y="288" text-anchor="middle" font-size="12" font-weight="bold">binlog → relay log → 重放 🔁</text> <text x="150" y="314" text-anchor="middle" font-size="12" font-weight="bold">收到 ≠ 重放完，读从库仍可能旧</text> <text x="150" y="340" text-anchor="middle" font-size="11.5" font-weight="bold">异步：不等确认，可能丢最后几笔 ⚡</text> </svg>`,
        'readwrite-delay': `<svg viewBox="0 0 300 350"> <text x="22" y="48" font-size="30">🙋</text> <text x="62" y="36" font-size="12.5" font-weight="bold">改昵称 → 成功 ✅</text> <text x="62" y="58" font-size="12.5" font-weight="bold">立刻刷新 → 旧昵称 😵</text> <rect x="20" y="84" width="112" height="68" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="76" y="112" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">主库</text> <text x="76" y="136" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fff">✍️ 新昵称已写入</text> <rect x="168" y="84" width="112" height="68" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/> <text x="224" y="112" text-anchor="middle" font-size="13" font-weight="bold">从库</text> <text x="224" y="136" text-anchor="middle" font-size="10.5" font-weight="bold">👀 还是旧昵称</text> <line x1="132" y1="118" x2="168" y2="118" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="6 4"/> <text x="150" y="126" text-anchor="middle" font-size="20">⏳</text> <text x="150" y="182" text-anchor="middle" font-size="12" font-weight="bold">复制延迟：毫秒级起步，大事务可到秒级</text> <rect x="24" y="200" width="252" height="62" rx="10" fill="#a8f0d0" stroke="#1a1a1a" stroke-width="4"/> <text x="150" y="224" text-anchor="middle" font-size="12" font-weight="bold">🛡️ 关键读强制走主库</text> <text x="150" y="246" text-anchor="middle" font-size="11" font-weight="bold">或等位点 WAIT_FOR_EXECUTED_GTID_SET</text> <text x="150" y="296" text-anchor="middle" font-size="12" font-weight="bold">写主读从 = 用一致性换吞吐</text> <text x="150" y="326" text-anchor="middle" font-size="12" font-weight="bold">它是最终一致，不是强一致 ⚠️</text> </svg>`,
        'cap-partition': `<svg viewBox="0 0 300 350"> <text x="150" y="30" text-anchor="middle" font-size="20">✂️</text> <rect x="18" y="46" width="108" height="88" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="72" y="76" text-anchor="middle" font-size="13" font-weight="bold">机房 A</text> <text x="72" y="104" text-anchor="middle" font-size="20">🖥️</text> <text x="72" y="126" text-anchor="middle" font-size="10.5" font-weight="bold">一半用户</text> <rect x="174" y="46" width="108" height="88" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="228" y="76" text-anchor="middle" font-size="13" font-weight="bold">机房 B</text> <text x="228" y="104" text-anchor="middle" font-size="20">🖥️</text> <text x="228" y="126" text-anchor="middle" font-size="10.5" font-weight="bold">另一半用户</text> <line x1="126" y1="98" x2="174" y2="98" stroke="#1a1a1a" stroke-width="4" stroke-dasharray="8 6"/> <text x="150" y="86" text-anchor="middle" font-size="20">⚡</text> <text x="150" y="168" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#ff6b6b">网络分区：两边消息断了！</text> <rect x="24" y="188" width="122" height="88" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/> <text x="85" y="214" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff6b6b">CP</text> <text x="85" y="238" text-anchor="middle" font-size="11" font-weight="bold">宁可拒绝服务</text> <text x="85" y="258" text-anchor="middle" font-size="11" font-weight="bold">也不给错数据 🛡️</text> <rect x="154" y="188" width="122" height="88" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/> <text x="215" y="214" text-anchor="middle" font-size="14" font-weight="bold" fill="#00d2d3">AP</text> <text x="215" y="238" text-anchor="middle" font-size="11" font-weight="bold">先把请求接住</text> <text x="215" y="258" text-anchor="middle" font-size="11" font-weight="bold">事后收敛 🔄</text> <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold">P 是前提，不是可选项</text> <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">现实：CP 或 AP 二选一 🔺</text> </svg>`,
        'disttx-2pc': `<svg viewBox="0 0 300 350"> <rect x="86" y="28" width="128" height="58" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/> <text x="150" y="52" text-anchor="middle" font-size="13" font-weight="bold">🎩 协调者</text> <text x="150" y="72" text-anchor="middle" font-size="10.5" font-weight="bold">先写日志，再发指令</text> <path d="M150 86 L150 120 L60 120 L60 146" fill="none" stroke="#1a1a1a" stroke-width="3"/> <path d="M150 120 L150 146" fill="none" stroke="#1a1a1a" stroke-width="3"/> <path d="M150 120 L240 120 L240 146" fill="none" stroke="#1a1a1a" stroke-width="3"/> <text x="105" y="112" text-anchor="middle" font-size="10.5" font-weight="bold">① 准备？</text> <text x="198" y="112" text-anchor="middle" font-size="10.5" font-weight="bold">② commit/回滚</text> <rect x="18" y="150" width="84" height="66" rx="9" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/> <text x="60" y="178" text-anchor="middle" font-size="11.5" font-weight="bold">库存 📦</text> <text x="60" y="200" text-anchor="middle" font-size="10.5" font-weight="bold">锁资源</text> <rect x="108" y="150" width="84" height="66" rx="9" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/> <text x="150" y="178" text-anchor="middle" font-size="11.5" font-weight="bold">账户 💰</text> <text x="150" y="200" text-anchor="middle" font-size="10.5" font-weight="bold">回 yes / no</text> <rect x="198" y="150" width="84" height="66" rx="9" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/> <text x="240" y="178" text-anchor="middle" font-size="11.5" font-weight="bold">订单 🧾</text> <text x="240" y="200" text-anchor="middle" font-size="10.5" font-weight="bold">不提交</text> <text x="150" y="246" text-anchor="middle" font-size="12" font-weight="bold">① 准备：执行但不提交，锁住资源</text> <text x="150" y="272" text-anchor="middle" font-size="12" font-weight="bold">② 提交：全 yes 提交，否则全员回滚</text> <text x="150" y="306" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ff6b6b">同步阻塞 · 协调者单点 · 不一致窗口</text> <text x="150" y="332" text-anchor="middle" font-size="11" font-weight="bold">决定一落日志，只能重试到底 ⏳</text> </svg>`,
        'vectorDims': `<svg viewBox="0 0 300 350">
            <text x="150" y="36" text-anchor="middle" font-size="15" font-weight="bold">768 维 = 768 个小数</text>
            <rect x="18" y="56" width="264" height="62" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <rect x="30" y="70" width="42" height="34" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <text x="51" y="92" text-anchor="middle" font-size="11" font-weight="bold">0.21</text>
            <rect x="80" y="70" width="42" height="34" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <text x="101" y="92" text-anchor="middle" font-size="11" font-weight="bold">-1.32</text>
            <rect x="130" y="70" width="42" height="34" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <text x="151" y="92" text-anchor="middle" font-size="11" font-weight="bold">0.87</text>
            <rect x="180" y="70" width="42" height="34" rx="6" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3"/>
            <text x="201" y="95" text-anchor="middle" font-size="14" font-weight="bold">…</text>
            <rect x="230" y="70" width="42" height="34" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <text x="251" y="92" text-anchor="middle" font-size="11" font-weight="bold">0.05</text>
            <text x="51" y="132" text-anchor="middle" font-size="10" font-weight="bold">第1维</text>
            <text x="101" y="132" text-anchor="middle" font-size="10" font-weight="bold">第2维</text>
            <text x="151" y="132" text-anchor="middle" font-size="10" font-weight="bold">第3维</text>
            <text x="251" y="132" text-anchor="middle" font-size="10" font-weight="bold">第768维</text>
            <rect x="30" y="152" width="240" height="48" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="182" text-anchor="middle" font-size="13" font-weight="bold">❓ 第 3 维 = 可爱度？</text>
            <rect x="30" y="212" width="240" height="52" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="236" text-anchor="middle" font-size="13" font-weight="bold">❌ 不是！每一维没有</text>
            <text x="150" y="256" text-anchor="middle" font-size="13" font-weight="bold">可读的物理含义</text>
            <text x="150" y="298" text-anchor="middle" font-size="14" font-weight="bold">语义藏在整体方向里 🧭</text>
            <text x="150" y="328" text-anchor="middle" font-size="12" font-weight="bold">384 / 768 / 1536 都常见</text>
            </svg>`,
        'metricCos': `<svg viewBox="0 0 300 350">
            <text x="150" y="36" text-anchor="middle" font-size="15" font-weight="bold">余弦：只看夹角 θ</text>
            <circle cx="70" cy="196" r="6" fill="#1a1a1a"/>
            <line x1="70" y1="196" x2="238" y2="118" stroke="#ff6b6b" stroke-width="7" stroke-linecap="round" class="clickable"/>
            <line x1="70" y1="196" x2="248" y2="202" stroke="#00d2d3" stroke-width="7" stroke-linecap="round" class="clickable"/>
            <text x="244" y="112" font-size="14" font-weight="bold" fill="#ff6b6b">A</text>
            <text x="256" y="200" font-size="14" font-weight="bold" fill="#00d2d3">B</text>
            <path d="M124 199 A 55 55 0 0 0 120 173" fill="none" stroke="#1a1a1a" stroke-width="3"/>
            <text x="138" y="176" font-size="14" font-weight="bold">θ</text>
            <rect x="30" y="234" width="240" height="54" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="258" text-anchor="middle" font-size="12" font-weight="bold">cos = (A·B) / (|A| × |B|)</text>
            <text x="150" y="279" text-anchor="middle" font-size="11" font-weight="bold">取值 -1 ~ 1，越接近 1 越像</text>
            <text x="150" y="316" text-anchor="middle" font-size="13" font-weight="bold">与向量长度无关 📐</text>
            <text x="150" y="340" text-anchor="middle" font-size="12" font-weight="bold">归一化后：cos = 内积 ⚡</text>
            </svg>`,
        'hnswLayers': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">HNSW：多层导航图</text>
            <text x="150" y="54" text-anchor="middle" font-size="11" font-weight="bold">① 上层稀疏 · 大步长跳</text>
            <line x1="95" y1="80" x2="205" y2="80" stroke="#00d2d3" stroke-width="5"/>
            <circle cx="95" cy="80" r="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="205" cy="80" r="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <line x1="150" y1="94" x2="150" y2="118" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="5 4"/>
            <path d="M143 114 L150 128 L157 114" fill="none" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="150" text-anchor="middle" font-size="11" font-weight="bold">② 逐层下沉 · 图越来越密</text>
            <line x1="65" y1="176" x2="150" y2="176" stroke="#00d2d3" stroke-width="4.5"/>
            <line x1="150" y1="176" x2="235" y2="176" stroke="#00d2d3" stroke-width="4.5"/>
            <circle cx="65" cy="176" r="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="150" cy="176" r="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="235" cy="176" r="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <text x="150" y="216" text-anchor="middle" font-size="11" font-weight="bold">③ 底层全量 · 精细搜索</text>
            <line x1="40" y1="248" x2="100" y2="248" stroke="#a29bfe" stroke-width="4"/>
            <line x1="100" y1="248" x2="155" y2="248" stroke="#a29bfe" stroke-width="4"/>
            <line x1="155" y1="248" x2="212" y2="248" stroke="#a29bfe" stroke-width="4"/>
            <line x1="212" y1="248" x2="262" y2="248" stroke="#a29bfe" stroke-width="4"/>
            <circle cx="40" cy="248" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="100" cy="248" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="155" cy="248" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="212" cy="248" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <circle cx="262" cy="248" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="3" class="clickable"/>
            <rect x="18" y="272" width="264" height="62" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="294" text-anchor="middle" font-size="11" font-weight="bold">🎛️ M：每节点连边数</text>
            <text x="150" y="312" text-anchor="middle" font-size="11" font-weight="bold">🎛️ efConstruction：建索引广度</text>
            <text x="150" y="330" text-anchor="middle" font-size="11" font-weight="bold">🎛️ efSearch：查询候选（召回↔延迟）</text>
            </svg>`,
        'milvusHybrid': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">混合查询：先缩范围</text>
            <rect x="30" y="44" width="240" height="44" rx="10" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="72" text-anchor="middle" font-size="12" font-weight="bold">🏢 全库：1 亿条向量</text>
            <text x="150" y="104" text-anchor="middle" font-size="16">⬇</text>
            <rect x="30" y="112" width="240" height="48" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="134" text-anchor="middle" font-size="12" font-weight="bold">🏷️ 标量过滤：tenant = A</text>
            <text x="150" y="152" text-anchor="middle" font-size="11" font-weight="bold">+ price &lt; 100 → 剩 50 万条</text>
            <text x="150" y="180" text-anchor="middle" font-size="16">⬇</text>
            <rect x="30" y="188" width="240" height="48" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="210" text-anchor="middle" font-size="12" font-weight="bold">🔍 候选集里做向量 ANN</text>
            <text x="150" y="228" text-anchor="middle" font-size="11" font-weight="bold">取最相似的 top-k</text>
            <text x="150" y="254" text-anchor="middle" font-size="16">⬇</text>
            <rect x="45" y="262" width="210" height="40" rx="10" fill="#a8e6cf" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="287" text-anchor="middle" font-size="12" font-weight="bold">🎯 相似 + 满足条件</text>
            <text x="150" y="324" text-anchor="middle" font-size="11" font-weight="bold" fill="#ff6b6b">⚠️ 后过滤：top-k 可能被筛空</text>
            </svg>`,
        'ragChunk': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">切块 Chunk：RAG 的地基</text>
            <rect x="30" y="44" width="240" height="70" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <line x1="46" y1="66" x2="254" y2="66" stroke="#1a1a1a" stroke-width="3" opacity="0.3"/>
            <line x1="46" y1="84" x2="230" y2="84" stroke="#1a1a1a" stroke-width="3" opacity="0.3"/>
            <line x1="46" y1="102" x2="246" y2="102" stroke="#1a1a1a" stroke-width="3" opacity="0.3"/>
            <text x="238" y="142" font-size="18">✂️</text>
            <rect x="24" y="152" width="160" height="38" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="116" y="152" width="160" height="38" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="116" y="152" width="68" height="38" fill="#ff6b6b" opacity="0.55"/>
            <text x="70" y="176" text-anchor="middle" font-size="12" font-weight="bold">块 1</text>
            <text x="230" y="176" text-anchor="middle" font-size="12" font-weight="bold">块 2</text>
            <text x="150" y="212" text-anchor="middle" font-size="11" font-weight="bold">↔ 重叠 overlap 10%~20%</text>
            <rect x="24" y="228" width="252" height="42" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="254" text-anchor="middle" font-size="12" font-weight="bold">太大 → 语义被稀释 🫠</text>
            <rect x="24" y="280" width="252" height="42" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="306" text-anchor="middle" font-size="12" font-weight="bold">太小 → 上下文断裂 🧩</text>
            <text x="150" y="342" text-anchor="middle" font-size="11" font-weight="bold">🏷️ 带元数据：文档名 / 章节 / 时间</text>
            </svg>`,
        'memoryWeight': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">记忆检索：三项加权</text>
            <rect x="24" y="44" width="252" height="44" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="72" text-anchor="middle" font-size="12" font-weight="bold">⏰ recency：越新越重要</text>
            <text x="150" y="106" text-anchor="middle" font-size="16" font-weight="bold">＋</text>
            <rect x="24" y="114" width="252" height="44" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="142" text-anchor="middle" font-size="12" font-weight="bold">⭐ importance：身份 / 偏好 &gt; 寒暄</text>
            <text x="150" y="176" text-anchor="middle" font-size="16" font-weight="bold">＋</text>
            <rect x="24" y="184" width="252" height="44" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="212" text-anchor="middle" font-size="12" font-weight="bold">🧭 relevance：与问题的向量相似度</text>
            <text x="150" y="246" text-anchor="middle" font-size="16">⬇</text>
            <rect x="40" y="254" width="220" height="42" rx="10" fill="#a8e6cf" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="281" text-anchor="middle" font-size="12" font-weight="bold">加权分 → 取 top-k 注入上下文</text>
            <text x="150" y="320" text-anchor="middle" font-size="12" font-weight="bold">✍️ 写入：打分 + 去重</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">🧹 治理：TTL / 冲突 / 隐私</text>
            </svg>`,
        'db-powers': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">数据库的四大本领</text>
            <rect x="22" y="52" width="120" height="112" rx="12" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="98" text-anchor="middle" font-size="26">💾</text>
            <text x="82" y="128" text-anchor="middle" font-size="14" font-weight="bold">存得住</text>
            <text x="82" y="150" text-anchor="middle" font-size="11" font-weight="bold">断电不丢</text>
            <rect x="158" y="52" width="120" height="112" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="98" text-anchor="middle" font-size="26">🔍</text>
            <text x="218" y="128" text-anchor="middle" font-size="14" font-weight="bold">找得快</text>
            <text x="218" y="150" text-anchor="middle" font-size="11" font-weight="bold">索引直达</text>
            <rect x="22" y="176" width="120" height="112" rx="12" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="222" text-anchor="middle" font-size="26">👥</text>
            <text x="82" y="252" text-anchor="middle" font-size="14" font-weight="bold">一起用</text>
            <text x="82" y="274" text-anchor="middle" font-size="11" font-weight="bold">并发不打架</text>
            <rect x="158" y="176" width="120" height="112" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="222" text-anchor="middle" font-size="26">🛡️</text>
            <text x="218" y="252" text-anchor="middle" font-size="14" font-weight="bold">管得严</text>
            <text x="218" y="274" text-anchor="middle" font-size="11" font-weight="bold">权限 + 约束</text>
            <text x="150" y="325" text-anchor="middle" font-size="13" font-weight="bold">存 · 查 · 共 · 管</text>
            </svg>`,
        'db-vs-dbms': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">数据库 ≠ DBMS</text>
            <rect x="20" y="48" width="120" height="130" rx="12" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="80" y="84" text-anchor="middle" font-size="24">🗄️</text>
            <text x="80" y="114" text-anchor="middle" font-size="14" font-weight="bold">数据库</text>
            <text x="80" y="136" text-anchor="middle" font-size="11" font-weight="bold">＝ 数据的集合</text>
            <text x="80" y="160" text-anchor="middle" font-size="11" font-weight="bold">「被管的东西」</text>
            <rect x="160" y="48" width="120" height="130" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="220" y="84" text-anchor="middle" font-size="24">⚙️</text>
            <text x="220" y="114" text-anchor="middle" font-size="14" font-weight="bold">DBMS</text>
            <text x="220" y="136" text-anchor="middle" font-size="11" font-weight="bold">＝ 管理软件</text>
            <text x="220" y="160" text-anchor="middle" font-size="11" font-weight="bold">MySQL / Oracle</text>
            <line x1="96" y1="180" x2="122" y2="200" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="204" y1="180" x2="178" y2="200" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="70" y="200" width="160" height="44" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="228" text-anchor="middle" font-size="12.5" font-weight="bold">🗣️ SQL：说话的语言</text>
            <text x="150" y="284" text-anchor="middle" font-size="13" font-weight="bold">一个是「东西」</text>
            <text x="150" y="310" text-anchor="middle" font-size="13" font-weight="bold">一个是「管家」</text>
            <text x="150" y="338" text-anchor="middle" font-size="12" font-weight="bold">别再说「我装了个数据库」😅</text>
            </svg>`,
        'table-build': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">🎬 学生表：从无到有</text>
            <rect x="26" y="50" width="248" height="48" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="80" text-anchor="middle" font-size="13" font-weight="bold">① CREATE TABLE 先立列</text>
            <rect x="26" y="112" width="248" height="48" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="142" text-anchor="middle" font-size="13" font-weight="bold">② INSERT 放进一行</text>
            <rect x="26" y="174" width="248" height="48" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="204" text-anchor="middle" font-size="13" font-weight="bold">③ SELECT 按行取回</text>
            <rect x="26" y="236" width="248" height="48" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="266" text-anchor="middle" font-size="13" font-weight="bold">④ UPDATE 改动这一行</text>
            <line x1="150" y1="98" x2="150" y2="112" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="160" x2="150" y2="174" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="222" x2="150" y2="236" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="320" text-anchor="middle" font-size="13" font-weight="bold">列先定形，行后落座 ✨</text>
            </svg>`,
        'null-trap': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">🕳️ NULL 不是 0</text>
            <rect x="20" y="52" width="80" height="72" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="60" y="88" text-anchor="middle" font-size="18" font-weight="bold">0</text>
            <text x="60" y="112" text-anchor="middle" font-size="11" font-weight="bold">有值：零</text>
            <rect x="110" y="52" width="80" height="72" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="88" text-anchor="middle" font-size="18" font-weight="bold">''</text>
            <text x="150" y="112" text-anchor="middle" font-size="11" font-weight="bold">空字符串</text>
            <rect x="200" y="52" width="80" height="72" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="240" y="88" text-anchor="middle" font-size="18" font-weight="bold" fill="#fff">NULL</text>
            <text x="240" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">未知/没填</text>
            <rect x="30" y="152" width="240" height="46" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="181" text-anchor="middle" font-size="13" font-weight="bold">WHERE 成绩 IS NULL ✅</text>
            <rect x="30" y="214" width="240" height="46" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="243" text-anchor="middle" font-size="13" font-weight="bold">WHERE 成绩 = NULL 查不到 🚫</text>
            <text x="150" y="294" text-anchor="middle" font-size="13" font-weight="bold">「未知」跟谁比都还是未知</text>
            <text x="150" y="326" text-anchor="middle" font-size="12" font-weight="bold">三个值，互不相等 ⚖️</text>
            </svg>`,
        'pk-pick': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">🔑 谁能当主键？</text>
            <rect x="30" y="52" width="240" height="56" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="87" font-size="14" font-weight="bold">姓名</text>
            <text x="256" y="87" text-anchor="end" font-size="13" font-weight="bold">会重复 🚫</text>
            <rect x="30" y="120" width="240" height="56" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="155" font-size="14" font-weight="bold">学号</text>
            <text x="256" y="155" text-anchor="end" font-size="13" font-weight="bold">唯一 + 非空 ✅</text>
            <rect x="30" y="188" width="240" height="56" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="223" font-size="14" font-weight="bold">成绩</text>
            <text x="256" y="223" text-anchor="end" font-size="13" font-weight="bold">可空 + 会重分 🚫</text>
            <text x="150" y="282" text-anchor="middle" font-size="13" font-weight="bold">主键 = 唯一 🔒 + 非空 ✋</text>
            <text x="150" y="314" text-anchor="middle" font-size="13" font-weight="bold">每个格子只放一个值</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">学号：就是你了！🎉</text>
            </svg>`,
        'sql-keys': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">🗣️ 一条查询的三块积木</text>
            <rect x="30" y="60" width="240" height="56" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="52" y="96" font-size="15" font-weight="bold">SELECT</text>
            <text x="256" y="96" text-anchor="end" font-size="13" font-weight="bold">选哪些列</text>
            <rect x="30" y="128" width="240" height="56" rx="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="52" y="164" font-size="15" font-weight="bold" fill="#fff">FROM</text>
            <text x="256" y="164" text-anchor="end" font-size="13" font-weight="bold">从哪张表</text>
            <rect x="30" y="196" width="240" height="56" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="52" y="232" font-size="15" font-weight="bold" fill="#fff">WHERE</text>
            <text x="256" y="232" text-anchor="end" font-size="13" font-weight="bold">什么条件</text>
            <text x="150" y="292" text-anchor="middle" font-size="13.5" font-weight="bold">SELECT … FROM … WHERE</text>
            <text x="150" y="324" text-anchor="middle" font-size="13" font-weight="bold">声明式：只说「要什么」</text>
            </svg>`,
        'sql-declare': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">📣 你说是「要什么」</text>
            <rect x="30" y="50" width="240" height="64" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="78" text-anchor="middle" font-size="12.5" font-weight="bold">SELECT 姓名 FROM 学生表</text>
            <text x="150" y="100" text-anchor="middle" font-size="12.5" font-weight="bold">WHERE 成绩 &gt; 90;</text>
            <text x="150" y="146" text-anchor="middle" font-size="20">⬇️</text>
            <text x="150" y="182" text-anchor="middle" font-size="14.5" font-weight="bold">⚙️ 数据库决定「怎么找」</text>
            <rect x="30" y="198" width="240" height="46" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="227" text-anchor="middle" font-size="12.5" font-weight="bold">选索引 → 定连接顺序 → 取数</text>
            <text x="150" y="286" text-anchor="middle" font-size="13" font-weight="bold">你只描述结果</text>
            <text x="150" y="313" text-anchor="middle" font-size="13" font-weight="bold">路线由它自己算 🧠</text>
            <text x="150" y="341" text-anchor="middle" font-size="12" font-weight="bold">这就是「声明式」</text>
            </svg>`,
        'crud-sql': `<svg viewBox="0 0 300 350">
            <text x="150" y="34" text-anchor="middle" font-size="15" font-weight="bold">🃏 四招 ↔ 四个 SQL 动词</text>
            <rect x="24" y="52" width="252" height="58" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="88" font-size="14" font-weight="bold">➕ Create</text>
            <text x="258" y="88" text-anchor="end" font-size="13" font-weight="bold">INSERT INTO …</text>
            <rect x="24" y="120" width="252" height="58" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="156" font-size="14" font-weight="bold">🔍 Read</text>
            <text x="258" y="156" text-anchor="end" font-size="13" font-weight="bold">SELECT …</text>
            <rect x="24" y="188" width="252" height="58" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="224" font-size="14" font-weight="bold">✏️ Update</text>
            <text x="258" y="224" text-anchor="end" font-size="13" font-weight="bold">UPDATE … SET …</text>
            <rect x="24" y="256" width="252" height="58" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="292" font-size="14" font-weight="bold">🗑️ Delete</text>
            <text x="258" y="292" text-anchor="end" font-size="13" font-weight="bold">DELETE FROM …</text>
            <text x="150" y="342" text-anchor="middle" font-size="13" font-weight="bold">增 C · 查 R · 改 U · 删 D</text>
            </svg>`,
        'delete-family': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🗑️ 删除的四兄弟</text>
            <rect x="26" y="46" width="248" height="62" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="72" font-size="13" font-weight="bold">DELETE … WHERE</text>
            <text x="42" y="96" font-size="11.5" font-weight="bold">按行删，可回滚 ↩️</text>
            <rect x="26" y="116" width="248" height="62" rx="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="142" font-size="13" font-weight="bold" fill="#fff">DELETE 不带 WHERE</text>
            <text x="42" y="166" font-size="11.5" font-weight="bold" fill="#fff">整表清空，险 ⚠️</text>
            <rect x="26" y="186" width="248" height="62" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="212" font-size="13" font-weight="bold" fill="#fff">TRUNCATE TABLE</text>
            <text x="42" y="236" font-size="11.5" font-weight="bold" fill="#fff">DDL，隐式提交，不能回滚</text>
            <rect x="26" y="256" width="248" height="50" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="287" font-size="13" font-weight="bold">软删除：is_deleted = 1</text>
            <text x="150" y="336" text-anchor="middle" font-size="12.5" font-weight="bold">DROP TABLE 连结构一起端走 💥</text>
            </svg>`,
        'constraint-check': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🔍 三行脏数据，抓！</text>
            <rect x="22" y="48" width="256" height="42" rx="8" fill="#f2f2f2" stroke="#1a1a1a" stroke-width="3"/>
            <text x="38" y="75" font-size="11.5" font-weight="bold">010 | 17 岁 | 88 分 ✅</text>
            <rect x="22" y="98" width="256" height="42" rx="8" fill="#ffd6d6" stroke="#ff4757" stroke-width="4"/>
            <text x="38" y="125" font-size="11.5" font-weight="bold">011 | 年龄 -5 岁 🚫</text>
            <rect x="22" y="148" width="256" height="42" rx="8" fill="#ffd6d6" stroke="#ff4757" stroke-width="4"/>
            <text x="38" y="175" font-size="11.5" font-weight="bold">012 | 成绩 120 分 🚫</text>
            <rect x="22" y="198" width="256" height="42" rx="8" fill="#ffd6d6" stroke="#ff4757" stroke-width="4"/>
            <text x="38" y="225" font-size="11.5" font-weight="bold">012 | 学号又重复 🚫</text>
            <text x="150" y="276" text-anchor="middle" font-size="12.5" font-weight="bold">CHECK 管范围，UNIQUE 管重复</text>
            <text x="150" y="308" text-anchor="middle" font-size="13" font-weight="bold">约束就是数据的门卫 🛡️</text>
            <text x="150" y="338" text-anchor="middle" font-size="12" font-weight="bold">脏数据一个都别想进来</text>
            </svg>`,
        'constraint-list': `<svg viewBox="0 0 300 350">
            <rect x="24" y="26" width="252" height="300" rx="14" fill="#fff" stroke="#1a1a1a" stroke-width="5"/>
            <path d="M38 26 H262 A14 14 0 0 1 276 40 V74 H24 V40 A14 14 0 0 1 38 26 Z" fill="#ff9f43" stroke="#1a1a1a" stroke-width="5"/>
            <text x="150" y="58" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">🛡️ 约束清单卡</text>
            <text x="42" y="106" font-size="12.5" font-weight="bold">🔑 PRIMARY KEY</text>
            <text x="258" y="106" text-anchor="end" font-size="11" font-weight="bold">唯一 + 非空</text>
            <line x1="38" y1="120" x2="262" y2="120" stroke="#1a1a1a" stroke-width="2" opacity="0.3"/>
            <text x="42" y="150" font-size="12.5" font-weight="bold">🎯 UNIQUE</text>
            <text x="258" y="150" text-anchor="end" font-size="11" font-weight="bold">不许重复</text>
            <line x1="38" y1="164" x2="262" y2="164" stroke="#1a1a1a" stroke-width="2" opacity="0.3"/>
            <text x="42" y="194" font-size="12.5" font-weight="bold">✅ NOT NULL</text>
            <text x="258" y="194" text-anchor="end" font-size="11" font-weight="bold">必须有值</text>
            <line x1="38" y1="208" x2="262" y2="208" stroke="#1a1a1a" stroke-width="2" opacity="0.3"/>
            <text x="42" y="238" font-size="12.5" font-weight="bold">📏 CHECK</text>
            <text x="258" y="238" text-anchor="end" font-size="11" font-weight="bold">满足条件</text>
            <line x1="38" y1="252" x2="262" y2="252" stroke="#1a1a1a" stroke-width="2" opacity="0.3"/>
            <text x="42" y="282" font-size="12.5" font-weight="bold">📦 DEFAULT</text>
            <text x="258" y="282" text-anchor="end" font-size="11" font-weight="bold">兜底默认值</text>
            <text x="150" y="313" text-anchor="middle" font-size="11" font-weight="bold">主键 = UNIQUE + NOT NULL</text>
            </svg>`,
        'integrity-four': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🧩 数据完整性四类</text>
            <rect x="22" y="50" width="120" height="112" rx="12" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="88" text-anchor="middle" font-size="24">🔑</text>
            <text x="82" y="116" text-anchor="middle" font-size="13" font-weight="bold">实体完整性</text>
            <text x="82" y="140" text-anchor="middle" font-size="10.5" font-weight="bold">主键：唯一 + 非空</text>
            <rect x="158" y="50" width="120" height="112" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="88" text-anchor="middle" font-size="24">🌉</text>
            <text x="218" y="116" text-anchor="middle" font-size="13" font-weight="bold">参照完整性</text>
            <text x="218" y="140" text-anchor="middle" font-size="10.5" font-weight="bold">外键：必须存在</text>
            <rect x="22" y="174" width="120" height="112" rx="12" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="212" text-anchor="middle" font-size="24">📏</text>
            <text x="82" y="240" text-anchor="middle" font-size="13" font-weight="bold">域完整性</text>
            <text x="82" y="264" text-anchor="middle" font-size="10.5" font-weight="bold">类型·CHECK·非空</text>
            <rect x="158" y="174" width="120" height="112" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="212" text-anchor="middle" font-size="24">📋</text>
            <text x="218" y="240" text-anchor="middle" font-size="13" font-weight="bold">用户定义</text>
            <text x="218" y="264" text-anchor="middle" font-size="10.5" font-weight="bold">业务规则：应用层</text>
            <text x="150" y="316" text-anchor="middle" font-size="12.5" font-weight="bold">四条防线，各守一段</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">库内兜底 + 应用层前置</text>
            </svg>`,
        'index-speed': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">⚡ 500 万行的两种命运</text>
            <rect x="22" y="48" width="256" height="120" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="80" text-anchor="middle" font-size="13.5" font-weight="bold">❌ 没有索引</text>
            <text x="150" y="110" text-anchor="middle" font-size="12" font-weight="bold">逐行扫描 5,000,000 行</text>
            <text x="150" y="140" text-anchor="middle" font-size="16" font-weight="bold" fill="#ff4757">≈ 4.2 秒 🐌</text>
            <rect x="22" y="184" width="256" height="120" rx="12" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="216" text-anchor="middle" font-size="13.5" font-weight="bold">✅ 有 B+ 树索引</text>
            <text x="150" y="246" text-anchor="middle" font-size="12" font-weight="bold">只读 3 个数据页</text>
            <text x="150" y="276" text-anchor="middle" font-size="16" font-weight="bold" fill="#00b894">≈ 0.003 秒 ⚡</text>
            <text x="150" y="332" text-anchor="middle" font-size="13" font-weight="bold">快了 1000 多倍！</text>
            </svg>`,
        'index-cost': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">⚖️ 索引的代价</text>
            <line x1="150" y1="66" x2="150" y2="116" stroke="#1a1a1a" stroke-width="5"/>
            <line x1="58" y1="118" x2="242" y2="118" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>
            <line x1="58" y1="118" x2="58" y2="138" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="242" y1="118" x2="242" y2="138" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="18" y="142" width="110" height="72" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="73" y="172" text-anchor="middle" font-size="12" font-weight="bold">查询变快 ⚡</text>
            <text x="73" y="196" text-anchor="middle" font-size="11" font-weight="bold">O(log n) 直达</text>
            <rect x="172" y="142" width="110" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="227" y="172" text-anchor="middle" font-size="12" font-weight="bold">代价 💾</text>
            <text x="227" y="196" text-anchor="middle" font-size="11" font-weight="bold">占空间·写入慢</text>
            <rect x="30" y="240" width="240" height="42" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="267" text-anchor="middle" font-size="12.5" font-weight="bold">每次写入都要维护索引</text>
            <text x="150" y="312" text-anchor="middle" font-size="13" font-weight="bold">空间 + 写入速度</text>
            <text x="150" y="338" text-anchor="middle" font-size="13" font-weight="bold">换 查询速度 💱</text>
            </svg>`,
        'tx-flow': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">💸 一次转账的四个步骤</text>
            <rect x="30" y="48" width="240" height="46" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="77" text-anchor="middle" font-size="13" font-weight="bold">① BEGIN 开启事务</text>
            <rect x="30" y="112" width="240" height="46" rx="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">② UPDATE A 账户 -100</text>
            <rect x="30" y="176" width="240" height="46" rx="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="205" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">③ UPDATE B 账户 +100</text>
            <rect x="30" y="240" width="240" height="46" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="269" text-anchor="middle" font-size="13" font-weight="bold">④ COMMIT 一起落定</text>
            <line x1="150" y1="94" x2="150" y2="112" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="158" x2="150" y2="176" stroke="#1a1a1a" stroke-width="3.5"/>
            <line x1="150" y1="222" x2="150" y2="240" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="316" text-anchor="middle" font-size="13" font-weight="bold">中途出错 → 整体撤销 ↩️</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">钱不会凭空消失</text>
            </svg>`,
        'view-vs-proc': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14.5" font-weight="bold">🪟 虚拟表 vs 🏭 预编译流程</text>
            <rect x="20" y="46" width="126" height="150" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="83" y="80" text-anchor="middle" font-size="22">🪟</text>
            <text x="83" y="106" text-anchor="middle" font-size="13.5" font-weight="bold">视图 VIEW</text>
            <text x="83" y="130" text-anchor="middle" font-size="11" font-weight="bold">只存一条查询定义</text>
            <text x="83" y="152" text-anchor="middle" font-size="11" font-weight="bold">不存数据</text>
            <text x="83" y="174" text-anchor="middle" font-size="11" font-weight="bold">用时现算 ⏱️</text>
            <rect x="154" y="46" width="126" height="150" rx="12" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="217" y="80" text-anchor="middle" font-size="22">🏭</text>
            <text x="217" y="106" text-anchor="middle" font-size="13.5" font-weight="bold">存储过程</text>
            <text x="217" y="130" text-anchor="middle" font-size="11" font-weight="bold">一组 SQL + 参数</text>
            <text x="217" y="152" text-anchor="middle" font-size="11" font-weight="bold">预编译后复用</text>
            <text x="217" y="174" text-anchor="middle" font-size="11" font-weight="bold">CALL 调用 📞</text>
            <rect x="30" y="216" width="240" height="44" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="244" text-anchor="middle" font-size="12.5" font-weight="bold">共同点：逻辑留在数据库端</text>
            <text x="150" y="296" text-anchor="middle" font-size="13" font-weight="bold">一个像橱窗 👀</text>
            <text x="150" y="322" text-anchor="middle" font-size="13" font-weight="bold">一个像流水线 🏭</text>
            <text x="150" y="346" text-anchor="middle" font-size="11.5" font-weight="bold">省的是传输，不是执行时间</text>
            </svg>`,
        'db-objects': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">🏠 库端对象四兄弟</text>
            <rect x="22" y="46" width="120" height="96" rx="12" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="80" text-anchor="middle" font-size="22">🪟</text>
            <text x="82" y="108" text-anchor="middle" font-size="13" font-weight="bold">视图 VIEW</text>
            <text x="82" y="130" text-anchor="middle" font-size="10.5" font-weight="bold">保存的查询</text>
            <rect x="158" y="46" width="120" height="96" rx="12" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="80" text-anchor="middle" font-size="22">🏭</text>
            <text x="218" y="108" text-anchor="middle" font-size="13" font-weight="bold">存储过程</text>
            <text x="218" y="130" text-anchor="middle" font-size="10.5" font-weight="bold">CALL 执行</text>
            <rect x="22" y="156" width="120" height="96" rx="12" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="82" y="190" text-anchor="middle" font-size="22">🧮</text>
            <text x="82" y="218" text-anchor="middle" font-size="13" font-weight="bold">函数 FUNCTION</text>
            <text x="82" y="240" text-anchor="middle" font-size="10.5" font-weight="bold">写在 SELECT 里</text>
            <rect x="158" y="156" width="120" height="96" rx="12" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="218" y="190" text-anchor="middle" font-size="22">⚡</text>
            <text x="218" y="218" text-anchor="middle" font-size="13" font-weight="bold">触发器 TRIGGER</text>
            <text x="218" y="240" text-anchor="middle" font-size="10.5" font-weight="bold">表一变就自动跑</text>
            <text x="150" y="288" text-anchor="middle" font-size="13" font-weight="bold">简单稳定的放库端</text>
            <text x="150" y="316" text-anchor="middle" font-size="13" font-weight="bold">复杂易变的放应用层</text>
            <text x="150" y="344" text-anchor="middle" font-size="12" font-weight="bold">选型要看团队与迁移成本</text>
            </svg>`,
        'view-def': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🪟 视图里存的是「定义」</text>
            <rect x="30" y="52" width="240" height="120" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <path d="M40 52 H260 A10 10 0 0 1 270 62 V86 H30 V62 A10 10 0 0 1 40 52 Z" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="78" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">CREATE VIEW 不及格名单</text>
            <text x="46" y="112" font-size="12" font-weight="bold">AS SELECT 学号, 姓名, 成绩</text>
            <text x="46" y="136" font-size="12" font-weight="bold">FROM 学生表</text>
            <text x="46" y="160" font-size="12" font-weight="bold">WHERE 成绩 &lt; 60;</text>
            <text x="150" y="208" text-anchor="middle" font-size="13" font-weight="bold">里面没有一行数据 🚫</text>
            <text x="150" y="238" text-anchor="middle" font-size="13" font-weight="bold">每次用到，才现去查基表</text>
            <rect x="60" y="264" width="180" height="48" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="294" text-anchor="middle" font-size="12.5" font-weight="bold">所以它不会变快 🚫</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">省的是「抄 SQL」的麻烦</text>
            </svg>`,
        'sql-param': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="14.5" font-weight="bold">🛡️ 参数化：数据永远是数据</text>
            <rect x="24" y="50" width="252" height="64" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="42" y="78" font-size="12" font-weight="bold">SELECT * FROM users</text>
            <text x="42" y="100" font-size="12" font-weight="bold">WHERE name = ?</text>
            <text x="150" y="140" text-anchor="middle" font-size="20">⬇️</text>
            <rect x="24" y="158" width="252" height="56" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="42" y="184" font-size="12" font-weight="bold">SQL 骨架先编译定型</text>
            <text x="42" y="204" font-size="11.5" font-weight="bold">结构从此不再改变 🔒</text>
            <rect x="24" y="226" width="252" height="56" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="42" y="252" font-size="12" font-weight="bold">? ← 输入只当「值」填进去</text>
            <text x="42" y="272" font-size="11.5" font-weight="bold">' OR '1'='1 也失效 ✅</text>
            <text x="150" y="314" text-anchor="middle" font-size="13" font-weight="bold">数据 ≠ 命令</text>
            <text x="150" y="340" text-anchor="middle" font-size="12" font-weight="bold">这条线一划，注入就没了</text>
            </svg>`,
        'sql-concat': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🧵 字符串拼接：现场翻车</text>
            <rect x="24" y="50" width="252" height="86" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="40" y="76" font-size="11.5" font-weight="bold">"SELECT * FROM users</text>
            <text x="40" y="98" font-size="11.5" font-weight="bold"> WHERE name='" + 输入 + "'"</text>
            <text x="40" y="122" font-size="11.5" font-weight="bold" fill="#ff4757">输入 = ' OR '1'='1</text>
            <text x="150" y="160" text-anchor="middle" font-size="20">⬇️</text>
            <rect x="24" y="178" width="252" height="60" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="40" y="204" font-size="12" font-weight="bold" fill="#fff">WHERE name='' OR '1'='1'</text>
            <text x="40" y="226" font-size="11.5" font-weight="bold" fill="#fff">条件永远为真 💣</text>
            <rect x="24" y="252" width="252" height="44" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="280" text-anchor="middle" font-size="12.5" font-weight="bold">不输密码，直接登录 😱</text>
            <text x="150" y="328" text-anchor="middle" font-size="13" font-weight="bold">输入变成了命令！</text>
            </svg>`,
        'sqlinject-myths': `<svg viewBox="0 0 300 350">
            <text x="150" y="32" text-anchor="middle" font-size="15" font-weight="bold">🚫 三个没用的「防御」</text>
            <rect x="24" y="50" width="252" height="76" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="78" font-size="12.5" font-weight="bold">① 手工删单引号 / 转义</text>
            <text x="42" y="102" font-size="11" font-weight="bold">漏掉编码与数字型注入 🕳️</text>
            <rect x="24" y="140" width="252" height="76" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="168" font-size="12.5" font-weight="bold">② 用了 ORM 就免疫</text>
            <text x="42" y="192" font-size="11" font-weight="bold">原生拼接 / 动态列名照样中招</text>
            <rect x="24" y="230" width="252" height="76" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="258" font-size="12.5" font-weight="bold">③ 有 WAF 就够了</text>
            <text x="42" y="282" font-size="11" font-weight="bold">可被编码绕过，只能当一层</text>
            <text x="150" y="338" text-anchor="middle" font-size="12.5" font-weight="bold">根治只有参数化 🛡️</text>
            </svg>`,
        'vectorModelMap': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">意义来自模型，不是人 🤖</text>
            <rect x="24" y="46" width="252" height="52" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="70" text-anchor="middle" font-size="13" font-weight="bold">🙋 人：第 3 维是『可爱度』？</text>
            <text x="150" y="89" text-anchor="middle" font-size="12" font-weight="bold">🤷 说不出——单维没有可读含义</text>
            <text x="150" y="114" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="24" y="126" width="252" height="106" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="150" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">🤖 模型自己学出的坐标系</text>
            <rect x="40" y="162" width="48" height="30" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <text x="64" y="182" text-anchor="middle" font-size="12" font-weight="bold">0.21</text>
            <rect x="96" y="162" width="48" height="30" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <text x="120" y="182" text-anchor="middle" font-size="12" font-weight="bold">-1.32</text>
            <rect x="152" y="162" width="48" height="30" rx="6" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <text x="176" y="182" text-anchor="middle" font-size="12" font-weight="bold">0.87</text>
            <rect x="208" y="162" width="48" height="30" rx="6" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3"/>
            <text x="232" y="182" text-anchor="middle" font-size="13" font-weight="bold">…</text>
            <text x="150" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">768 个分量一起才有语义 🧭</text>
            <rect x="24" y="244" width="252" height="44" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="272" text-anchor="middle" font-size="12" font-weight="bold">换个模型 → 整套坐标全变 🔄</text>
            <text x="150" y="318" text-anchor="middle" font-size="13" font-weight="bold">向量 = 模型给语义画的坐标</text>
            <text x="150" y="340" text-anchor="middle" font-size="12" font-weight="bold">384 / 768 / 1536 都是规格</text>
            </svg>`,
        'vectorReindex': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">换模型 = 换地图 🔀</text>
            <rect x="20" y="46" width="116" height="106" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="78" y="70" text-anchor="middle" font-size="13" font-weight="bold">模型 A</text>
            <text x="78" y="96" text-anchor="middle" font-size="16">🐱</text>
            <text x="78" y="120" text-anchor="middle" font-size="12" font-weight="bold">[0.2, -1.3, …]</text>
            <text x="78" y="140" text-anchor="middle" font-size="12" font-weight="bold">768 维</text>
            <circle cx="150" cy="98" r="13" fill="#fff" stroke="#ff6b6b" stroke-width="3"/>
            <text x="150" y="104" text-anchor="middle" font-size="15" font-weight="bold" fill="#ff6b6b">≠</text>
            <rect x="164" y="46" width="116" height="106" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="222" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">模型 B</text>
            <text x="222" y="96" text-anchor="middle" font-size="16">🐱</text>
            <text x="222" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">[-0.7, 0.4, …]</text>
            <text x="222" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">1536 维</text>
            <rect x="24" y="170" width="252" height="56" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="194" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">⚠️ 旧向量全部失效</text>
            <text x="150" y="214" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">A 的向量和 B 的向量不能比</text>
            <text x="150" y="248" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="24" y="262" width="252" height="48" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="292" text-anchor="middle" font-size="12.5" font-weight="bold">全量重算 + 重建索引 🔁</text>
            <text x="150" y="336" text-anchor="middle" font-size="12" font-weight="bold">只编码新数据 → 新老两个世界</text>
            </svg>`,
        'metricCompare': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">两把尺子，量的不是一回事 📐</text>
            <rect x="16" y="44" width="132" height="172" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="82" y="68" text-anchor="middle" font-size="13" font-weight="bold">📐 余弦：看夹角</text>
            <circle cx="44" cy="190" r="5" fill="#1a1a1a"/>
            <line x1="44" y1="190" x2="132" y2="130" stroke="#ff6b6b" stroke-width="6" stroke-linecap="round"/>
            <line x1="44" y1="190" x2="97" y2="154" stroke="#00d2d3" stroke-width="6" stroke-linecap="round"/>
            <text x="82" y="112" text-anchor="middle" font-size="12" font-weight="bold">方向相同 → 很像</text>
            <text x="110" y="180" text-anchor="middle" font-size="12" font-weight="bold">θ≈0°</text>
            <text x="82" y="208" text-anchor="middle" font-size="12" font-weight="bold">长短不影响 ✅</text>
            <rect x="152" y="44" width="132" height="172" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="218" y="68" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">📏 欧氏：看距离</text>
            <circle cx="186" cy="150" r="9" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3"/>
            <circle cx="248" cy="182" r="9" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="195" y1="153" x2="239" y2="179" stroke="#1a1a1a" stroke-width="3.5" stroke-dasharray="5 4"/>
            <text x="200" y="136" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">长度算进 d</text>
            <text x="218" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">长的那条被推远 ⚠️</text>
            <rect x="24" y="230" width="252" height="44" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="258" text-anchor="middle" font-size="12" font-weight="bold">归一化后：cos = 内积 ⚡</text>
            <text x="150" y="304" text-anchor="middle" font-size="13" font-weight="bold">没有更好的度量，只有一致的 ⚖️</text>
            <text x="150" y="332" text-anchor="middle" font-size="12" font-weight="bold">度量必须与模型、索引匹配</text>
            </svg>`,
        'metricNormalize': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">归一化：把长度压成 1 📏</text>
            <rect x="22" y="46" width="118" height="104" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="81" y="70" text-anchor="middle" font-size="12.5" font-weight="bold">A = [3, 4]</text>
            <circle cx="48" cy="118" r="4.5" fill="#1a1a1a"/>
            <line x1="48" y1="118" x2="118" y2="78" stroke="#ff6b6b" stroke-width="6" stroke-linecap="round"/>
            <text x="81" y="140" text-anchor="middle" font-size="12" font-weight="bold">|A| = 5</text>
            <text x="150" y="104" text-anchor="middle" font-size="16" font-weight="bold">➗</text>
            <rect x="160" y="46" width="118" height="104" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="219" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">A ÷ |A|</text>
            <circle cx="186" cy="118" r="4.5" fill="#1a1a1a"/>
            <line x1="186" y1="118" x2="238" y2="88" stroke="#ffd32a" stroke-width="6" stroke-linecap="round"/>
            <text x="219" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">|A| = 1 ✅</text>
            <text x="150" y="176" text-anchor="middle" font-size="13" font-weight="bold">两个向量都变成长度 1</text>
            <text x="150" y="202" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="30" y="216" width="240" height="52" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="240" text-anchor="middle" font-size="13" font-weight="bold">cos = A·B ÷ (1 × 1)</text>
            <text x="150" y="260" text-anchor="middle" font-size="13" font-weight="bold">= 内积（点积）⚡</text>
            <text x="150" y="296" text-anchor="middle" font-size="12" font-weight="bold">省一次除法，内积索引直接用</text>
            <text x="150" y="320" text-anchor="middle" font-size="12" font-weight="bold">这是 L2 归一化：除以模长 📐</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">不是把每一维缩到 0~1 ⚠️</text>
            </svg>`,
        'curseShell': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">维度灾难：高维空间被压平 🌐</text>
            <circle cx="150" cy="116" r="60" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <circle cx="150" cy="116" r="60" fill="none" stroke="#ff6b6b" stroke-width="11" opacity="0.5"/>
            <circle cx="150" cy="116" r="12" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="121" text-anchor="middle" font-size="12" font-weight="bold">空</text>
            <text x="150" y="198" text-anchor="middle" font-size="12" font-weight="bold">体积几乎都在外层薄壳 🥚</text>
            <rect x="26" y="212" width="248" height="54" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="234" text-anchor="middle" font-size="12" font-weight="bold">最近邻 d₁ ≈ 最远邻 d₂</text>
            <text x="150" y="256" text-anchor="middle" font-size="12" font-weight="bold">距离趋同，比值 → 1 😵</text>
            <rect x="26" y="278" width="248" height="58" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="300" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">KD 树 / R 树剪枝失效 🐌</text>
            <text x="150" y="322" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">工程改用 ANN 近似检索 ⚡</text>
            </svg>`,
        'ivfPq': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">IVF 分桶 + PQ 压缩 🗜️</text>
            <text x="150" y="54" text-anchor="middle" font-size="12" font-weight="bold">🔍 查询只进最近的 nprobe 个桶</text>
            <circle cx="70" cy="104" r="30" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="70" y="110" text-anchor="middle" font-size="12" font-weight="bold">桶1 ✅</text>
            <circle cx="150" cy="104" r="30" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="110" text-anchor="middle" font-size="12" font-weight="bold">桶2 ✅</text>
            <circle cx="230" cy="104" r="30" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3"/>
            <text x="230" y="110" text-anchor="middle" font-size="12" font-weight="bold">桶3 🚫</text>
            <text x="150" y="158" text-anchor="middle" font-size="12" font-weight="bold">nprobe 越大 → 越准也越慢 ⚖️</text>
            <rect x="30" y="176" width="240" height="36" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="200" text-anchor="middle" font-size="12" font-weight="bold">[0.2, -1.3, 0.8, …] 768 维</text>
            <text x="150" y="230" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="42" y="242" width="48" height="30" rx="6" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <text x="66" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">12</text>
            <rect x="98" y="242" width="48" height="30" rx="6" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <text x="122" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">07</text>
            <rect x="154" y="242" width="48" height="30" rx="6" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <text x="178" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">63</text>
            <rect x="210" y="242" width="48" height="30" rx="6" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3"/>
            <text x="234" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">41</text>
            <text x="150" y="296" text-anchor="middle" font-size="12" font-weight="bold">每段量化成 1 字节码 📦</text>
            <text x="150" y="320" text-anchor="middle" font-size="12" font-weight="bold">内存降到几十分之一 📉</text>
            <text x="150" y="344" text-anchor="middle" font-size="12" font-weight="bold">代价：距离只是估算 ⚠️</text>
            </svg>`,
        'milvusLayers': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">三层结构：从表到索引 🏢</text>
            <rect x="30" y="46" width="240" height="60" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="70" text-anchor="middle" font-size="13" font-weight="bold">🏢 Collection：一张向量表</text>
            <text x="150" y="92" text-anchor="middle" font-size="12" font-weight="bold">Schema：向量字段 + 标量字段</text>
            <text x="150" y="120" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="30" y="132" width="240" height="70" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="156" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">🗂️ Partition：按租户 / 日期切</text>
            <rect x="46" y="166" width="64" height="26" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <text x="78" y="184" text-anchor="middle" font-size="12" font-weight="bold">租户A</text>
            <rect x="118" y="166" width="64" height="26" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <text x="150" y="184" text-anchor="middle" font-size="12" font-weight="bold">租户B</text>
            <rect x="190" y="166" width="64" height="26" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
            <text x="222" y="184" text-anchor="middle" font-size="12" font-weight="bold">租户C</text>
            <text x="150" y="224" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="30" y="236" width="240" height="74" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5" class="clickable"/>
            <text x="150" y="260" text-anchor="middle" font-size="13" font-weight="bold">⚡ Index：HNSW / IVF / PQ</text>
            <text x="150" y="282" text-anchor="middle" font-size="12" font-weight="bold">Metric：IP / COSINE / L2</text>
            <text x="150" y="302" text-anchor="middle" font-size="12" font-weight="bold">建好索引才谈得上性能</text>
            <text x="150" y="336" text-anchor="middle" font-size="12" font-weight="bold">查询：先分区裁剪，再比向量 🎯</text>
            </svg>`,
        'filterOrder': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">先过滤 vs 后过滤 🔻</text>
            <text x="82" y="54" text-anchor="middle" font-size="13" font-weight="bold">✅ 先过滤</text>
            <text x="218" y="54" text-anchor="middle" font-size="13" font-weight="bold">⚠️ 后过滤</text>
            <rect x="20" y="64" width="124" height="40" rx="8" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="82" y="89" text-anchor="middle" font-size="12" font-weight="bold">全库 1 亿条</text>
            <text x="82" y="120" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="20" y="126" width="124" height="44" rx="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="82" y="146" text-anchor="middle" font-size="12" font-weight="bold">🏷️ 标量过滤</text>
            <text x="82" y="164" text-anchor="middle" font-size="12" font-weight="bold">剩 50 万条</text>
            <text x="82" y="186" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="20" y="192" width="124" height="44" rx="8" fill="#00d2d3" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="82" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">🔍 候选里 ANN</text>
            <text x="82" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">取 top-k</text>
            <text x="82" y="252" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="20" y="258" width="124" height="48" rx="8" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="3.5" class="clickable"/>
            <text x="82" y="278" text-anchor="middle" font-size="12" font-weight="bold">🎯 相似 + 合规</text>
            <text x="82" y="296" text-anchor="middle" font-size="12" font-weight="bold">召回稳稳的 ✅</text>
            <rect x="156" y="64" width="124" height="40" rx="8" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="218" y="89" text-anchor="middle" font-size="12" font-weight="bold">全库 1 亿条</text>
            <text x="218" y="120" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="156" y="126" width="124" height="44" rx="8" fill="#00d2d3" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="218" y="146" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">🔍 直接 ANN</text>
            <text x="218" y="164" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">只取 top-10</text>
            <text x="218" y="186" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="156" y="192" width="124" height="44" rx="8" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="218" y="212" text-anchor="middle" font-size="12" font-weight="bold">🏷️ 再筛 tenant</text>
            <text x="218" y="230" text-anchor="middle" font-size="12" font-weight="bold">= A 的条件</text>
            <text x="218" y="252" text-anchor="middle" font-size="14" font-weight="bold">⬇</text>
            <rect x="156" y="258" width="124" height="48" rx="8" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="3.5" class="clickable"/>
            <text x="218" y="278" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">😱 一条不剩</text>
            <text x="218" y="296" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">召回直接崩 ❌</text>
            <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">候选太少时，后过滤会筛空 top-k</text>
            </svg>`,
        'ragHybrid': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">双路召回 → 精排 🔀</text>
            <rect x="90" y="42" width="120" height="40" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="68" text-anchor="middle" font-size="12.5" font-weight="bold">❓ 用户问题</text>
            <line x1="118" y1="82" x2="74" y2="112" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="182" y1="82" x2="226" y2="112" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="20" y="114" width="120" height="66" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="80" y="138" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">🔤 BM25 关键词</text>
            <text x="80" y="162" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">编号一搜就中</text>
            <rect x="160" y="114" width="120" height="66" rx="10" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="220" y="138" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">🧭 向量语义</text>
            <text x="220" y="162" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">近义改写抓得到</text>
            <line x1="80" y1="180" x2="126" y2="208" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="220" y1="180" x2="174" y2="208" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="70" y="210" width="160" height="46" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="230" text-anchor="middle" font-size="12" font-weight="bold">合并候选、去重</text>
            <text x="150" y="248" text-anchor="middle" font-size="12" font-weight="bold">各 50 条 → 一起精排</text>
            <text x="150" y="276" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="70" y="288" width="160" height="42" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="315" text-anchor="middle" font-size="12" font-weight="bold">🎯 rerank 取前 3</text>
            <text x="150" y="344" text-anchor="middle" font-size="12" font-weight="bold">粗召回 + 精排 = 又快又准</text>
            </svg>`,
        'ragGrounding': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">有依据才回答 🛡️</text>
            <rect x="24" y="44" width="252" height="58" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="68" text-anchor="middle" font-size="12.5" font-weight="bold">📚 检索到的资料片段</text>
            <text x="150" y="90" text-anchor="middle" font-size="12" font-weight="bold">只允许依据它作答</text>
            <text x="150" y="124" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="20" y="138" width="126" height="102" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="83" y="162" text-anchor="middle" font-size="12.5" font-weight="bold">✅ 资料里有</text>
            <text x="83" y="186" text-anchor="middle" font-size="12" font-weight="bold">给出答案</text>
            <text x="83" y="208" text-anchor="middle" font-size="12" font-weight="bold">+ 片段出处 🔖</text>
            <text x="83" y="230" text-anchor="middle" font-size="12" font-weight="bold">可核对</text>
            <rect x="154" y="138" width="126" height="102" rx="10" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="217" y="162" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">⚠️ 资料里没有</text>
            <text x="217" y="186" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">就说『没有提到』</text>
            <text x="217" y="208" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">或转人工 🙋</text>
            <text x="217" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">绝不硬编</text>
            <rect x="24" y="256" width="252" height="46" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="284" text-anchor="middle" font-size="12" font-weight="bold">允许说不知道 = 可信度底线</text>
            <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">硬答 = 幻觉，且无从核对 ⚠️</text>
            </svg>`,
        'memoryWrite': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">写入前先过两关 🚦</text>
            <rect x="24" y="44" width="252" height="46" rx="10" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="73" text-anchor="middle" font-size="12.5" font-weight="bold">💬 这轮对话冒出一堆信息</text>
            <text x="150" y="108" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="24" y="120" width="252" height="58" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="144" text-anchor="middle" font-size="12.5" font-weight="bold">① 重要性打分 ⭐</text>
            <text x="150" y="166" text-anchor="middle" font-size="12" font-weight="bold">身份 / 偏好 / 承诺 &gt; 寒暄</text>
            <text x="150" y="200" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="24" y="212" width="252" height="58" rx="10" fill="#00d2d3" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="236" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">② 去重 🧹</text>
            <text x="150" y="258" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">同一件事说三遍 → 只留一条</text>
            <text x="150" y="292" text-anchor="middle" font-size="16" font-weight="bold">⬇</text>
            <rect x="50" y="304" width="200" height="40" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4" class="clickable"/>
            <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">摘要 + 编码 → 长期库 💾</text>
            </svg>`,
        'memoryPitfalls': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="bold">长期记忆的五个坑 🕳️</text>
            <rect x="20" y="42" width="260" height="42" rx="9" fill="#ffd32a" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="69" text-anchor="middle" font-size="12" font-weight="bold">🕳️ 什么都记 → 噪音淹没信号</text>
            <rect x="20" y="92" width="260" height="42" rx="9" fill="#ff9f43" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="119" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">🗑️ 只写不删 → 过期信息还在</text>
            <rect x="20" y="142" width="260" height="42" rx="9" fill="#00d2d3" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="169" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">⚔️ 新旧并存 → 模型踩中旧的</text>
            <rect x="20" y="192" width="260" height="42" rx="9" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="219" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">☠️ 记忆污染 → 错误反复放大</text>
            <rect x="20" y="242" width="260" height="42" rx="9" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="3.5" class="clickable"/>
            <text x="150" y="269" text-anchor="middle" font-size="12" font-weight="bold">🔐 不隔离 → 越权召回事故</text>
            <text x="150" y="310" text-anchor="middle" font-size="12" font-weight="bold">防线都在写入那一瞬间 ✍️</text>
            <text x="150" y="336" text-anchor="middle" font-size="12" font-weight="bold">打分 · 去重 · TTL · 覆盖 · 隔离</text>
            </svg>`,
        'sp-birth': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">🐣 塔库的诞生流程</text>
            <rect x="26" y="44" width="248" height="56" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="70" font-size="12.5" font-weight="bold">① 需求：要一个数据库向导</text>
            <text x="42" y="90" font-size="11" font-weight="bold">会说话 · 会讲课 · 会卖萌</text>
            <line x1="150" y1="100" x2="150" y2="112" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="26" y="112" width="248" height="56" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="138" font-size="12.5" font-weight="bold">② 锚点定稿：taku-anchor</text>
            <text x="42" y="158" font-size="11" font-weight="bold">第一张定死形象，1024×1024</text>
            <line x1="150" y1="168" x2="150" y2="180" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="26" y="180" width="248" height="56" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="206" font-size="12.5" font-weight="bold">③ 派生 7 张：以锚点为参考</text>
            <text x="42" y="226" font-size="11" font-weight="bold">6 张章节封面 + 1 张主页主视觉</text>
            <line x1="150" y1="236" x2="150" y2="248" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="26" y="248" width="248" height="56" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="42" y="274" font-size="12.5" font-weight="bold">④ 语义化命名：一眼知道用途</text>
            <text x="42" y="294" font-size="11" font-weight="bold">cover-ch1 … hero-main</text>
            <text x="150" y="336" text-anchor="middle" font-size="12.5" font-weight="bold">8 张图，一个形象 🐣</text>
            </svg>`,
        'sp-anchor': `<svg viewBox="0 0 300 350">
            <text x="150" y="28" text-anchor="middle" font-size="14.5" font-weight="bold">📌 先定锚点，再派生 7 张</text>
            <rect x="96" y="40" width="108" height="92" rx="12" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="78" text-anchor="middle" font-size="26">🤖</text>
            <text x="150" y="102" text-anchor="middle" font-size="11.5" font-weight="bold">taku-anchor</text>
            <text x="150" y="120" text-anchor="middle" font-size="10.5" font-weight="bold">1024×1024</text>
            <line x1="150" y1="132" x2="150" y2="158" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="62" y1="158" x2="238" y2="158" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="62" y1="158" x2="62" y2="170" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="150" y1="158" x2="150" y2="170" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="238" y1="158" x2="238" y2="170" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="24" y="170" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="62" y="198" text-anchor="middle" font-size="10.5" font-weight="bold">ch1 封面</text>
            <rect x="112" y="170" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="198" text-anchor="middle" font-size="10.5" font-weight="bold">ch2 封面</text>
            <rect x="200" y="170" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="238" y="198" text-anchor="middle" font-size="10.5" font-weight="bold">ch3 封面</text>
            <line x1="62" y1="214" x2="62" y2="226" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="4 3"/>
            <line x1="150" y1="214" x2="150" y2="226" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="4 3"/>
            <line x1="238" y1="214" x2="238" y2="226" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="4 3"/>
            <rect x="24" y="226" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="62" y="254" text-anchor="middle" font-size="10.5" font-weight="bold">ch4 封面</text>
            <rect x="112" y="226" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="254" text-anchor="middle" font-size="10.5" font-weight="bold">ch5 封面</text>
            <rect x="200" y="226" width="76" height="44" rx="8" fill="#fff" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="238" y="254" text-anchor="middle" font-size="10.5" font-weight="bold">ch6 封面</text>
            <line x1="150" y1="270" x2="150" y2="282" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="4 3"/>
            <rect x="60" y="282" width="180" height="40" rx="8" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="3.5"/>
            <text x="150" y="307" text-anchor="middle" font-size="10.5" font-weight="bold">hero-main 主页主视觉</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">同一张脸，才有系列感 ✨</text>
            </svg>`,
        'sp-pipeline': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">⚙️ 数塔是怎么跑起来的</text>
            <rect x="30" y="48" width="240" height="58" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="74" text-anchor="middle" font-size="12.5" font-weight="bold">① Python 写剧本</text>
            <text x="150" y="94" text-anchor="middle" font-size="11" font-weight="bold">章节内容 = 一堆字典</text>
            <line x1="150" y1="106" x2="150" y2="122" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="30" y="122" width="240" height="58" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="148" text-anchor="middle" font-size="12.5" font-weight="bold">② 一键编译 data.js</text>
            <text x="150" y="168" text-anchor="middle" font-size="11" font-weight="bold">build_data.py 自动生成</text>
            <line x1="150" y1="180" x2="150" y2="196" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="30" y="196" width="240" height="58" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="222" text-anchor="middle" font-size="12.5" font-weight="bold">③ 浏览器里跑漫画引擎</text>
            <text x="150" y="242" text-anchor="middle" font-size="11" font-weight="bold">SVG 插画 + 互动 + 语音</text>
            <line x1="150" y1="254" x2="150" y2="270" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="30" y="270" width="240" height="48" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="300" text-anchor="middle" font-size="12.5" font-weight="bold">④ 双击即用，不用联网</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">纯前端 · 零依赖运行 🌐🚫</text>
            </svg>`,
        'sp-tools': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">🤖 AI 工具链</text>
            <rect x="66" y="44" width="168" height="52" rx="12" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="70" text-anchor="middle" font-size="12.5" font-weight="bold">ChatGPT / Claude</text>
            <text x="150" y="88" text-anchor="middle" font-size="11" font-weight="bold">大语言模型助手</text>
            <line x1="150" y1="96" x2="150" y2="112" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="54" y1="126" x2="246" y2="126" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="150" y1="112" x2="150" y2="126" stroke="#1a1a1a" stroke-width="4"/>
            <line x1="54" y1="126" x2="54" y2="140" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="150" y1="126" x2="150" y2="140" stroke="#1a1a1a" stroke-width="3"/>
            <line x1="246" y1="126" x2="246" y2="140" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="20" y="140" width="84" height="86" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="62" y="172" text-anchor="middle" font-size="20">📝</text>
            <text x="62" y="196" text-anchor="middle" font-size="12" font-weight="bold">剧情策划</text>
            <text x="62" y="214" text-anchor="middle" font-size="10.5" font-weight="bold">大纲 + 对话</text>
            <rect x="108" y="140" width="84" height="86" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="172" text-anchor="middle" font-size="20">💻</text>
            <text x="150" y="196" text-anchor="middle" font-size="12" font-weight="bold">引擎代码</text>
            <text x="150" y="214" text-anchor="middle" font-size="10.5" font-weight="bold">JS + CSS</text>
            <rect x="196" y="140" width="84" height="86" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="238" y="172" text-anchor="middle" font-size="20">🎨</text>
            <text x="238" y="196" text-anchor="middle" font-size="12" font-weight="bold">漫画美术</text>
            <text x="238" y="214" text-anchor="middle" font-size="10.5" font-weight="bold">8 张插画</text>
            <rect x="30" y="248" width="240" height="46" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="277" text-anchor="middle" font-size="12" font-weight="bold">🗣️ Web Speech API 语音合成</text>
            <text x="150" y="324" text-anchor="middle" font-size="12" font-weight="bold">AI 出草稿，人来定稿 ✍️</text>
            </svg>`,
        'sp-refs': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">📚 参考与引用来源</text>
            <rect x="30" y="46" width="240" height="54" rx="10" fill="#d4f5f5" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="70" font-size="12" font-weight="bold">📘 MySQL 8.0 官方文档</text>
            <text x="46" y="90" font-size="10.5" font-weight="bold">隔离级别 · 索引 · CHECK 约束</text>
            <rect x="30" y="112" width="240" height="54" rx="10" fill="#ffeaa7" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="136" font-size="12" font-weight="bold">📗 Milvus 向量数据库文档</text>
            <text x="46" y="156" font-size="10.5" font-weight="bold">collection / partition / index</text>
            <rect x="30" y="178" width="240" height="54" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="202" font-size="12" font-weight="bold">📙 MDN Web 开发文档</text>
            <text x="46" y="222" font-size="10.5" font-weight="bold">DOM / Canvas / Web Speech API</text>
            <rect x="30" y="244" width="240" height="54" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="46" y="268" font-size="12" font-weight="bold">📕 经典教材与社区实践</text>
            <text x="46" y="288" font-size="10.5" font-weight="bold">术语对照 · 常见误区澄清</text>
            <text x="150" y="330" text-anchor="middle" font-size="12.5" font-weight="bold">先查官方文档，再下结论 🔍</text>
            </svg>`,
        'sp-credits': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15" font-weight="bold">🎬 制作人员名单</text>
            <rect x="30" y="46" width="240" height="220" rx="12" fill="#fff" stroke="#1a1a1a" stroke-width="4.5"/>
            <text x="150" y="78" text-anchor="middle" font-size="12.5" font-weight="bold">策划与剧情</text>
            <text x="150" y="98" text-anchor="middle" font-size="11" font-weight="bold">🙋 作者 + 🤖 AI 助手</text>
            <line x1="50" y1="112" x2="250" y2="112" stroke="#1a1a1a" stroke-width="2" opacity="0.25"/>
            <text x="150" y="136" text-anchor="middle" font-size="12.5" font-weight="bold">漫画与视觉</text>
            <text x="150" y="156" text-anchor="middle" font-size="11" font-weight="bold">🎨 8 张 AI 插画 + SVG</text>
            <line x1="50" y1="170" x2="250" y2="170" stroke="#1a1a1a" stroke-width="2" opacity="0.25"/>
            <text x="150" y="194" text-anchor="middle" font-size="12.5" font-weight="bold">代码与引擎</text>
            <text x="150" y="214" text-anchor="middle" font-size="11" font-weight="bold">💻 Python + JavaScript</text>
            <line x1="50" y1="228" x2="250" y2="228" stroke="#1a1a1a" stroke-width="2" opacity="0.25"/>
            <text x="150" y="250" text-anchor="middle" font-size="11" font-weight="bold">🗣️ 语音：Web Speech API</text>
            <text x="150" y="296" text-anchor="middle" font-size="13" font-weight="bold">AI 是笔，人才是作者 ✍️</text>
            <text x="150" y="324" text-anchor="middle" font-size="12.5" font-weight="bold">谢谢观看 · 一起登塔 🗼</text>
            <text x="150" y="346" text-anchor="middle" font-size="10.5" font-weight="bold">内容如有疏漏，欢迎指正</text>
            </svg>`,
        'cover-ch1': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch1.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第1章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">数据库初探</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">数据撒一地 → 装进表</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'cover-ch2': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch2.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第2章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">SQL 与操作</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">约束 · 索引 · 事务</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'cover-ch3': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch3.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第3章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">数据库底层原理</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">一条 SQL 的旅程</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'cover-ch4': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch4.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第4章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">NoSQL 与缓存</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">键值 · 文档 · 缓存</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'cover-ch5': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch5.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第5章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">分布式架构</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">分片 · 复制 · CAP</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'cover-ch6': `<svg viewBox="0 0 300 350">    <rect x="6" y="6" width="288" height="338" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>    <image href="assets/img/cover-ch6.png" x="14" y="14" width="272" height="204" preserveAspectRatio="xMidYMid slice"/>    <rect x="14" y="14" width="272" height="204" fill="none" stroke="#1a1a1a" stroke-width="4"/>    <text x="150" y="252" text-anchor="middle" font-size="17" font-weight="bold">第6章漫画</text>    <text x="150" y="278" text-anchor="middle" font-size="13" font-weight="bold">向量数据库与 AI</text>    <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">向量 · RAG · 记忆</text>    <text x="150" y="330" text-anchor="middle" font-size="12" font-weight="bold">↓ 往下看这一节的漫画分镜</text>  </svg>`,
        'tx-schemes': `<svg viewBox="0 0 300 350">    <text x="150" y="26" text-anchor="middle" font-size="15" font-weight="bold">三种分布式事务方案</text>    <rect x="18" y="40" width="264" height="78" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="5"/>    <text x="32" y="66" font-size="14" font-weight="bold">1️⃣ 2PC 两阶段提交</text>    <text x="32" y="88" font-size="11.5" font-weight="bold">数据库真回滚（undo）· 强一致</text>    <text x="32" y="108" font-size="11.5" font-weight="bold" fill="#8a2b2b">同步阻塞 · 协调者单点</text>    <rect x="18" y="130" width="264" height="78" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="5"/>    <text x="32" y="156" font-size="14" font-weight="bold">2️⃣ TCC</text>    <text x="32" y="178" font-size="11.5" font-weight="bold">Try 预留 → Confirm 确认 / Cancel 取消</text>    <text x="32" y="198" font-size="11.5" font-weight="bold" fill="#8a2b2b">业务侵入大 · 要防空回滚/悬挂</text>    <rect x="18" y="220" width="264" height="78" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="5"/>    <text x="32" y="246" font-size="14" font-weight="bold">3️⃣ Saga</text>    <text x="32" y="268" font-size="11.5" font-weight="bold">一串本地事务 + 逆向补偿动作</text>    <text x="32" y="288" font-size="11.5" font-weight="bold" fill="#8a2b2b">没有隔离性 · 要防脏读</text>    <text x="150" y="326" text-anchor="middle" font-size="12" font-weight="bold" fill="#555">能不用就不用：能本地事务就别分布式</text>  </svg>`,
        'tcc-pitfalls': `<svg viewBox="0 0 300 350">    <text x="150" y="26" text-anchor="middle" font-size="15" font-weight="bold">TCC 的三个坑</text>    <rect x="20" y="44" width="260" height="82" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="5"/>    <text x="34" y="72" font-size="15" font-weight="bold">🕳 空回滚</text>    <text x="34" y="96" font-size="11.5" font-weight="bold">Try 还没到，Cancel 先来了</text>    <text x="34" y="116" font-size="11.5" font-weight="bold" fill="#0a7d3c">→ Cancel 要能识别并空跑</text>    <rect x="20" y="136" width="260" height="82" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="5"/>    <text x="34" y="164" font-size="15" font-weight="bold">🎈 悬挂</text>    <text x="34" y="188" font-size="11.5" font-weight="bold">Cancel 完了，迟到的 Try 才到</text>    <text x="34" y="208" font-size="11.5" font-weight="bold" fill="#0a7d3c">→ Try 要检查事务状态再执行</text>    <rect x="20" y="228" width="260" height="82" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="5"/>    <text x="34" y="256" font-size="15" font-weight="bold">🔁 幂等</text>    <text x="34" y="280" font-size="11.5" font-weight="bold">重试导致 Cancel/Confirm 各来两次</text>    <text x="34" y="300" font-size="11.5" font-weight="bold" fill="#0a7d3c">→ 唯一键 / 状态机兜底</text>  </svg>`,
        'sql-roles': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔗 五个工位，各管一摊</text>
            <rect x="20" y="46" width="260" height="62" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="13" font-weight="bold">🚪 连接器：验账号、验权限、管连接</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">一个连接对应一个线程</text>
            <rect x="20" y="116" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="141" font-size="13" font-weight="bold">📝 解析器：词法 + 语法分析</text>
            <text x="34" y="164" font-size="11.5" font-weight="bold">产出语法树，只管"合不合法"</text>
            <rect x="20" y="186" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="211" font-size="13" font-weight="bold">🧠 优化器：按统计信息算代价</text>
            <text x="34" y="234" font-size="11.5" font-weight="bold">选执行计划，只管"贵不贵"</text>
            <rect x="20" y="256" width="260" height="62" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="281" font-size="13" font-weight="bold">🏃 执行器：照计划调存储引擎</text>
            <text x="34" y="304" font-size="11.5" font-weight="bold">真正逐行取数并返回结果</text>
            <text x="150" y="342" text-anchor="middle" font-size="12" font-weight="bold">优化器一行数据也不碰，它只负责选路</text>
            </svg>`,
        'bp-page': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">📦 缓冲池的三件道具</text>
            <rect x="20" y="46" width="260" height="66" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="13" font-weight="bold">🗄️ 磁盘：大而慢 🐌</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">一次随机读：0.1 毫秒级</text>
            <rect x="20" y="120" width="260" height="66" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="145" font-size="13" font-weight="bold">⚡ 内存：小而快 🚀</text>
            <text x="34" y="168" font-size="11.5" font-weight="bold">一次访问：0.0001 毫秒级</text>
            <rect x="20" y="194" width="260" height="66" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="219" font-size="13" font-weight="bold">📄 页：最小的搬运单位</text>
            <text x="34" y="242" font-size="11.5" font-weight="bold">InnoDB 默认一页 16KB</text>
            <text x="150" y="296" text-anchor="middle" font-size="12.5" font-weight="bold">读写都先经过缓冲池</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">内存有限：常用物理内存的 50%~75%</text>
            </svg>`,
        'bp-readwrite': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔁 读怎么走、写怎么走</text>
            <rect x="20" y="46" width="260" height="66" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="13" font-weight="bold">📖 读：先查缓冲池</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">命中直接返回，未命中才读磁盘</text>
            <rect x="20" y="120" width="260" height="80" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="145" font-size="12.5" font-weight="bold">✍️ 写：改内存页 + 写日志</text>
            <text x="34" y="168" font-size="11.5" font-weight="bold">脏页标记好，后台线程择机刷盘</text>
            <text x="34" y="191" font-size="11.5" font-weight="bold">WAL：先写日志，再慢慢刷数据</text>
            <rect x="20" y="208" width="260" height="66" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="233" font-size="13" font-weight="bold">🧊 改进版 LRU：冷热分区</text>
            <text x="34" y="256" font-size="11.5" font-weight="bold">一次全表扫描冲不垮热点页</text>
            <text x="150" y="302" text-anchor="middle" font-size="12.5" font-weight="bold">提交事务只写日志，所以返回很快</text>
            <text x="150" y="330" text-anchor="middle" font-size="11.5" font-weight="bold">刷脏不是越勤越好，别把随机写顶到前台</text>
            </svg>`,
        'bptree-height': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🌳 谁更矮，谁就赢</text>
            <rect x="20" y="48" width="124" height="118" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="73" font-size="12.5" font-weight="bold">🔹 二叉树</text>
            <text x="34" y="96" font-size="11" font-weight="bold">1 亿行 ≈ 27 层</text>
            <text x="34" y="119" font-size="11" font-weight="bold">最坏 27 次随机 IO</text>
            <text x="34" y="142" font-size="11" font-weight="bold">红黑树也一样深</text>
            <rect x="156" y="48" width="124" height="118" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="170" y="73" font-size="12.5" font-weight="bold">🌲 B+ 树</text>
            <text x="170" y="96" font-size="11" font-weight="bold">1 亿行 ≈ 3 层</text>
            <text x="170" y="119" font-size="11" font-weight="bold">只要 2~3 次页访问</text>
            <text x="170" y="142" font-size="11" font-weight="bold">扇出大 → 树就矮</text>
            <rect x="20" y="180" width="260" height="74" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="205" font-size="12.5" font-weight="bold">🔍 对手的短板</text>
            <text x="34" y="225.5" font-size="11.5" font-weight="bold">二叉树 / 红黑树：每层只分 2 叉，太高</text>
            <text x="34" y="246" font-size="11.5" font-weight="bold">哈希：等值 O(1)，却不支持范围查询</text>
            <text x="150" y="292" text-anchor="middle" font-size="12.5" font-weight="bold">目标：把 27 次 IO 压到 2~3 次</text>
            <text x="150" y="322" text-anchor="middle" font-size="11.5" font-weight="bold">磁盘按页读写：树越矮，IO 越少</text>
            </svg>`,
        'bptree-design': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🧩 三句话记住 B+ 树</text>
            <rect x="20" y="46" width="260" height="68" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① 非叶节点只存键，不存数据行</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">一页装几百个键 → 扇出大、树矮</text>
            <rect x="20" y="122" width="260" height="68" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="147" font-size="12.5" font-weight="bold">② 数据全部挂在叶子节点上</text>
            <text x="34" y="170" font-size="11.5" font-weight="bold">叶子有序，天然支持排序</text>
            <rect x="20" y="198" width="260" height="68" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="223" font-size="12.5" font-weight="bold">③ 叶子之间是双向链表</text>
            <text x="34" y="246" font-size="11.5" font-weight="bold">范围扫描顺着链表走，不用回上层</text>
            <text x="150" y="292" text-anchor="middle" font-size="12.5" font-weight="bold">非叶带路、叶子装货、链表排队</text>
            <text x="150" y="322" text-anchor="middle" font-size="11.5" font-weight="bold">对比 B 树：数据也放非叶，扇出小、树更高</text>
            </svg>`,
        'bptree-search42': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔍 在 B+ 树里找 42</text>
            <rect x="95" y="44" width="110" height="38" rx="8" fill="#ff6b6b" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="69" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">30 | 60</text>
            <line x1="150" y1="82" x2="150" y2="100" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="95" y="100" width="110" height="34" rx="8" fill="#ff9f43" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="123" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#fff">40 | 45</text>
            <line x1="150" y1="134" x2="150" y2="152" stroke="#1a1a1a" stroke-width="3.5"/>
            <rect x="60" y="152" width="180" height="40" rx="8" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="178" text-anchor="middle" font-size="12.5" font-weight="bold">… 41 | 42 ✓ | 43 …</text>
            <rect x="20" y="212" width="260" height="40" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="236.32" font-size="12" font-weight="bold">1️⃣ 根节点：42 在 30~60 → 走中间分支</text>
            <rect x="20" y="258" width="260" height="40" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="282.32" font-size="12" font-weight="bold">2️⃣ 中间节点：40~45 → 继续往下</text>
            <rect x="20" y="304" width="260" height="40" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="328.32" font-size="12" font-weight="bold">3️⃣ 叶子：命中 42，取出整行数据 ✓</text>
            </svg>`,
        'index-cover': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">⚡ 覆盖索引 免回表</text>
            <rect x="20" y="46" width="260" height="74" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🔁 回表：SELECT * FROM t</text>
            <text x="34" y="91.5" font-size="11.5" font-weight="bold">二级索引叶子只有"索引列 + 主键"</text>
            <text x="34" y="112" font-size="11.5" font-weight="bold">再查一次聚簇索引才拿到整行</text>
            <rect x="20" y="128" width="260" height="74" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="153" font-size="12.5" font-weight="bold">✅ 覆盖：SELECT id FROM t</text>
            <text x="34" y="173.5" font-size="11.5" font-weight="bold">要用的列全在索引叶子里</text>
            <text x="34" y="194" font-size="11.5" font-weight="bold">不用回表，直接返回 ⚡</text>
            <text x="150" y="232" text-anchor="middle" font-size="12.5" font-weight="bold">判断口诀：要用的列是否都在索引里</text>
            <rect x="20" y="252" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="277" font-size="12" font-weight="bold">联合索引 (name, age) 能覆盖更多查询</text>
            <text x="34" y="300" font-size="11.5" font-weight="bold">但宽索引更大、写入更慢，别硬堆 ⚠️</text>
            </svg>`,
        'clustered-cost': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">⚖️ 一次查询读几次页</text>
            <rect x="20" y="48" width="124" height="112" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="73" font-size="12.5" font-weight="bold">🔑 走聚簇索引</text>
            <text x="34" y="96" font-size="11" font-weight="bold">页访问 2~3 次</text>
            <text x="34" y="119" font-size="11" font-weight="bold">叶子就是整行 ✅</text>
            <rect x="156" y="48" width="124" height="112" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="170" y="73" font-size="12.5" font-weight="bold">🔁 走二级索引</text>
            <text x="170" y="96" font-size="11" font-weight="bold">先查二级索引</text>
            <text x="170" y="119" font-size="11" font-weight="bold">再回表 → 近翻倍</text>
            <line x1="40" y1="320" x2="260" y2="320" stroke="#1a1a1a" stroke-width="3"/>
            <rect x="52" y="258" width="56" height="62" rx="8" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="80" y="296" text-anchor="middle" font-size="12" font-weight="bold">2~3 次</text>
            <rect x="192" y="210" width="56" height="110" rx="8" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="220" y="272" text-anchor="middle" font-size="12" font-weight="bold">近 2 倍</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">减少回表 = 高并发查询优化的第一招</text>
            </svg>`,
        'redo-undo-job': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🧾 两本账，各管一头</text>
            <rect x="20" y="46" width="260" height="80" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">📕 Redo：保证"不丢"（持久性）</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">顺序写、循环复用，提交时按策略落盘</text>
            <text x="34" y="117" font-size="11.5" font-weight="bold">崩溃重启 → 重放，补上没刷盘的页</text>
            <rect x="20" y="134" width="260" height="80" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="159" font-size="12.5" font-weight="bold">📗 Undo：保证"能退"（原子性）</text>
            <text x="34" y="182" font-size="11.5" font-weight="bold">记录旧值，ROLLBACK 时倒着恢复</text>
            <text x="34" y="205" font-size="11.5" font-weight="bold">MVCC 快照读也靠它找旧版本</text>
            <text x="150" y="240" text-anchor="middle" font-size="12.5" font-weight="bold">WAL：日志先行，数据页交给后台慢慢刷</text>
            <rect x="20" y="258" width="260" height="52" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="288.5" text-anchor="middle" font-size="12.5" font-weight="bold">一句话：Redo 前进，Undo 后退 ↩</text>
            <text x="150" y="340" text-anchor="middle" font-size="11.5" font-weight="bold">binlog 在 Server 层，是归档日志，负责复制与审计</text>
            </svg>`,
        'wal-order': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🛤️ 断电那一刻见真章</text>
            <rect x="20" y="46" width="260" height="74" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">❌ 先写数据页，再写日志</text>
            <text x="34" y="91.5" font-size="11.5" font-weight="bold">写到一半断电：页半新半旧</text>
            <text x="34" y="112" font-size="11.5" font-weight="bold">没日志可重放，也没法撤销</text>
            <rect x="20" y="128" width="260" height="74" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="153" font-size="12.5" font-weight="bold">✅ 先写日志，再写数据页</text>
            <text x="34" y="173.5" font-size="11.5" font-weight="bold">提交时日志已按策略落盘</text>
            <text x="34" y="194" font-size="11.5" font-weight="bold">重启后重放日志即可补上</text>
            <text x="150" y="232" text-anchor="middle" font-size="12.5" font-weight="bold">所以"提交成功"≠"数据文件已更新"</text>
            <rect x="20" y="252" width="260" height="56" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="277" font-size="12" font-weight="bold">数据页什么时候刷？后台线程择机刷 🧹</text>
            <text x="34" y="300" font-size="11.5" font-weight="bold">铁律：先日志，后数据 🧾</text>
            <text x="150" y="340" text-anchor="middle" font-size="11.5" font-weight="bold">崩溃恢复 = 重放已提交 + 回滚未提交</text>
            </svg>`,
        'crash-recovery': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🧯 崩溃恢复怎么走</text>
            <rect x="20" y="46" width="260" height="68" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① 从检查点开始，不用读全部日志</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">检查点之前的脏页已经刷盘</text>
            <rect x="20" y="122" width="260" height="68" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="147" font-size="12.5" font-weight="bold">② Redo 重放：补上已提交的修改</text>
            <text x="34" y="170" font-size="11.5" font-weight="bold">从检查点往后扫，把该做的做完</text>
            <rect x="20" y="198" width="260" height="68" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="223" font-size="12.5" font-weight="bold">③ Undo 回滚：抹掉未提交的事务</text>
            <text x="34" y="246" font-size="11.5" font-weight="bold">没提交的事务要当作从没发生</text>
            <text x="150" y="296" text-anchor="middle" font-size="12.5" font-weight="bold">顺序：先重放，再回滚</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">前提是日志先落盘：WAL 贯穿始终</text>
            </svg>`,
        'lock-granularity': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔒 锁的三种粒度</text>
            <rect x="20" y="46" width="260" height="62" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🔒 行锁 Record：只锁那一行</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">并发最高，但挡不住"幻读"</text>
            <rect x="20" y="116" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="141" font-size="12.5" font-weight="bold">🕳️ 间隙锁 Gap：锁住记录间的空隙</text>
            <text x="34" y="164" font-size="11.5" font-weight="bold">不让新记录插进来 → 防幻读</text>
            <rect x="20" y="186" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="211" font-size="12.5" font-weight="bold">🔗 Next-Key = 行锁 + 间隙锁</text>
            <text x="34" y="234" font-size="11.5" font-weight="bold">RR 隔离级别下的默认加锁单位</text>
            <text x="150" y="274" text-anchor="middle" font-size="12.5" font-weight="bold">锁越多越安全，并发也越低 ⚖️</text>
            <text x="150" y="304" text-anchor="middle" font-size="11.5" font-weight="bold">MVCC 让普通 SELECT 不加锁也能读</text>
            <text x="150" y="334" text-anchor="middle" font-size="11.5" font-weight="bold">每行都藏着事务 ID + 回滚指针</text>
            </svg>`,
        'readview-compare': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🎚️ 同一行，两种读法</text>
            <rect x="20" y="46" width="260" height="82" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">📸 快照读（普通 SELECT）</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">读 ReadView 允许的那个旧版本</text>
            <text x="34" y="117" font-size="11.5" font-weight="bold">不加锁、0 等待，完全不阻塞 ✅</text>
            <rect x="20" y="136" width="260" height="82" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="161" font-size="12.5" font-weight="bold">🔒 当前读（UPDATE / FOR UPDATE）</text>
            <text x="34" y="184" font-size="11.5" font-weight="bold">读最新已提交版本并加锁</text>
            <text x="34" y="207" font-size="11.5" font-weight="bold">要排队等对方提交或回滚 ⏳</text>
            <text x="150" y="246" text-anchor="middle" font-size="12.5" font-weight="bold">别人正在改这一行，你会怎么读？</text>
            <text x="150" y="276" text-anchor="middle" font-size="12" font-weight="bold">快照读：读旧版本，互不打架 🔄</text>
            <text x="150" y="304" text-anchor="middle" font-size="12" font-weight="bold">当前读：拿最新值，但要等锁 ⏳</text>
            <text x="150" y="334" text-anchor="middle" font-size="11.5" font-weight="bold">RR 下读-改-写要用当前读，否则丢失更新</text>
            </svg>`,
        'nosql-tradeoff': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">⚖️ NoSQL 的三大特点与代价</text>
            <rect x="20" y="46" width="260" height="64" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🧱 灵活 Schema：字段随时加减</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">不用 ALTER TABLE，结构跟着业务走</text>
            <rect x="20" y="118" width="260" height="64" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="143" font-size="12.5" font-weight="bold">📈 水平扩展：加机器就扩容</text>
            <text x="34" y="166" font-size="11.5" font-weight="bold">分片把数据摊到多台节点上</text>
            <rect x="20" y="190" width="260" height="64" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="215" font-size="12.5" font-weight="bold">🔄 多数走最终一致性</text>
            <text x="34" y="238" font-size="11.5" font-weight="bold">停写之后，各副本迟早会一样</text>
            <rect x="20" y="262" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="287" font-size="12.5" font-weight="bold">⚠️ 代价：JOIN 与强事务被弱化</text>
            <text x="34" y="310" font-size="11.5" font-weight="bold">复杂关联查询不如 SQL 顺手</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">NoSQL = Not Only SQL：是补位，不是取代</text>
            </svg>`,
        'nosql-pick': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🧭 选型：两问定去处</text>
            <rect x="20" y="46" width="260" height="74" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① 这份数据长什么样？</text>
            <text x="34" y="91.5" font-size="11.5" font-weight="bold">字段规整 → 关系库</text>
            <text x="34" y="112" font-size="11.5" font-weight="bold">字段常变、要嵌套 → 文档库</text>
            <rect x="20" y="128" width="260" height="74" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="153" font-size="12.5" font-weight="bold">② 这份数据最怕什么？</text>
            <text x="34" y="173.5" font-size="11.5" font-weight="bold">怕不一致 → 关系库（订单、账务）</text>
            <text x="34" y="194" font-size="11.5" font-weight="bold">怕慢 → 键值库（热点缓存）</text>
            <rect x="20" y="210" width="260" height="74" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="235" font-size="12.5" font-weight="bold">🧩 现实答案：混合使用</text>
            <text x="34" y="255.5" font-size="11.5" font-weight="bold">订单进 MySQL、商品进 MongoDB</text>
            <text x="34" y="276" font-size="11.5" font-weight="bold">热点进 Redis、日志进列族库</text>
            <text x="150" y="308" text-anchor="middle" font-size="12.5" font-weight="bold">别手里只有一把锤子 🔨</text>
            <text x="150" y="334" text-anchor="middle" font-size="11.5" font-weight="bold">选型看数据形态和一致性要求，不看名气</text>
            </svg>`,
        'nosql-myth': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🃏 四条传言，逐条破</text>
            <rect x="20" y="46" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">❓"NoSQL 就是不用 SQL"</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">✅ Not Only SQL：该用 SQL 还用</text>
            <rect x="20" y="116" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="141" font-size="12.5" font-weight="bold">❓"NoSQL 没有事务"</text>
            <text x="34" y="164" font-size="11.5" font-weight="bold">✅ 多数已支持：MongoDB 4.0+ 多文档事务</text>
            <rect x="20" y="186" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="211" font-size="12.5" font-weight="bold">❓"NoSQL 一定比关系库快"</text>
            <text x="34" y="234" font-size="11.5" font-weight="bold">✅ 看场景：关系库索引建好也很快</text>
            <text x="150" y="274" text-anchor="middle" font-size="12.5" font-weight="bold">❓"关系库要被淘汰了"</text>
            <text x="150" y="302" text-anchor="middle" font-size="11.5" font-weight="bold">✅ 账务和订单，仍然离不开 ACID</text>
            <text x="150" y="334" text-anchor="middle" font-size="12" font-weight="bold">选型第一原则：这份数据最怕什么？</text>
            </svg>`,
        'redis-fast': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">⚡ Redis 为什么这么快</text>
            <rect x="20" y="46" width="260" height="62" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① 纯内存操作 💨</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">一次命令微秒级，磁盘根本追不上</text>
            <rect x="20" y="116" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="141" font-size="12.5" font-weight="bold">② 命令执行单线程 🧵</text>
            <text x="34" y="164" font-size="11.5" font-weight="bold">无锁竞争、无切换开销 → 天然原子</text>
            <rect x="20" y="186" width="260" height="62" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="211" font-size="12.5" font-weight="bold">③ IO 多路复用 epoll 🔌</text>
            <text x="34" y="234" font-size="11.5" font-weight="bold">一个线程照看上万个连接</text>
            <rect x="20" y="256" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="281" font-size="12.5" font-weight="bold">④ 数据结构高效 🧱</text>
            <text x="34" y="304" font-size="11.5" font-weight="bold">跳表、压缩列表都为省时间而设计</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">⚠️ 单线程怕慢命令：别在生产跑 KEYS *</text>
            </svg>`,
        'redis-types': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🧰 五大金刚各就各位</text>
            <rect x="20" y="46" width="260" height="54" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="77.5" font-size="12.5" font-weight="bold">🔤 String：缓存、计数器、分布式锁</text>
            <rect x="20" y="108" width="260" height="54" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="139.5" font-size="12.5" font-weight="bold">📜 List：简单队列、最新 N 条</text>
            <rect x="20" y="170" width="260" height="54" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="201.5" font-size="12.5" font-weight="bold">🗂️ Hash：存对象的多个字段</text>
            <rect x="20" y="232" width="260" height="54" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="263.5" font-size="12.5" font-weight="bold">🎯 Set：标签去重、共同好友</text>
            <rect x="20" y="294" width="260" height="44" rx="10" fill="#ffd32a" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="320.5" font-size="12.5" font-weight="bold">🏆 ZSet：排行榜、按分数排序</text>
            </svg>`,
        'cache-aside': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🛤️ 缓存到底该怎么改</text>
            <rect x="20" y="46" width="260" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">❌ 先删缓存，再改数据库</text>
            <text x="34" y="90.5" font-size="11.5" font-weight="bold">并发下请求乙会把旧值写回缓存</text>
            <text x="34" y="110" font-size="11.5" font-weight="bold">脏数据可能长期留在缓存里</text>
            <rect x="20" y="126" width="260" height="72" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="151" font-size="12.5" font-weight="bold">✅ 先改数据库，再删缓存</text>
            <text x="34" y="170.5" font-size="11.5" font-weight="bold">这就是 Cache Aside 的主流做法</text>
            <text x="34" y="190" font-size="11.5" font-weight="bold">失败还能重试，脏窗口最小</text>
            <rect x="20" y="206" width="260" height="64" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="231" font-size="12.5" font-weight="bold">为什么是"删"而不是"改"？</text>
            <text x="34" y="254" font-size="11.5" font-weight="bold">改要重算成本高，写序还可能错位</text>
            <text x="150" y="298" text-anchor="middle" font-size="12.5" font-weight="bold">缓存只删不改，读时没命中再回填</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">兜底：给缓存加 TTL，别让它永久脏 ⏰</text>
            </svg>`,
        'cache3-fix': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">💊 三张处方，对症下药</text>
            <rect x="20" y="46" width="260" height="70" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">👻 穿透 → 缓存空值 + 布隆过滤器</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">空值给短 TTL，先拦住不存在的 ID</text>
            <rect x="20" y="124" width="260" height="70" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="149" font-size="12.5" font-weight="bold">🔥 击穿 → 互斥锁 + 逻辑过期</text>
            <text x="34" y="172" font-size="11.5" font-weight="bold">只放一个线程去重建热点缓存</text>
            <rect x="20" y="202" width="260" height="70" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="227" font-size="12.5" font-weight="bold">🏔️ 雪崩 → TTL 加随机 + 多级缓存</text>
            <text x="34" y="250" font-size="11.5" font-weight="bold">别让大批 key 在同一秒过期</text>
            <text x="150" y="298" text-anchor="middle" font-size="12.5" font-weight="bold">一句话：拦截 / 加锁 / 打散</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">先分清病因，再谈药方 💊</text>
            </svg>`,
        'cache3-anti': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🕵️ 这些做法在添柴火</text>
            <rect x="20" y="46" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">⚠️ 所有 key 都设同一整点过期</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">雪崩前奏：失效时间被对齐了</text>
            <rect x="20" y="118" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="143" font-size="12.5" font-weight="bold">⚠️ 查不到数据也不缓存空值</text>
            <text x="34" y="166" font-size="11.5" font-weight="bold">穿透敞开大门，次次打数据库</text>
            <rect x="20" y="190" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="215" font-size="12.5" font-weight="bold">⚠️ 热点失效时全员查库重建</text>
            <text x="34" y="238" font-size="11.5" font-weight="bold">击穿放大器：一百个线程做同一件事</text>
            <rect x="20" y="262" width="260" height="56" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="294.5" text-anchor="middle" font-size="12.5" font-weight="bold">✅ 加固：随机 TTL / 布隆 / 互斥锁</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">凡是让大量请求绕过缓存的做法，都要警惕</text>
            </svg>`,
        'cache3-detail': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔍 三个容易说错的点</text>
            <rect x="20" y="46" width="260" height="70" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① 穿透 ≠ 击穿</text>
            <text x="34" y="89.5" font-size="11.5" font-weight="bold">穿透：数据根本不存在</text>
            <text x="34" y="108" font-size="11.5" font-weight="bold">击穿：数据存在，热点 key 失效了</text>
            <rect x="20" y="124" width="260" height="70" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="149" font-size="12.5" font-weight="bold">② 布隆过滤器会误判</text>
            <text x="34" y="167.5" font-size="11.5" font-weight="bold">说不存在一定不存在；说存在只是可能</text>
            <text x="34" y="186" font-size="11.5" font-weight="bold">误判只影响命中率，不影响正确性</text>
            <rect x="20" y="202" width="260" height="70" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="227" font-size="12.5" font-weight="bold">③ 热点 key 设"永不过期"很危险</text>
            <text x="34" y="245.5" font-size="11.5" font-weight="bold">数据变了缓存也不会自己修正</text>
            <text x="34" y="264" font-size="11.5" font-weight="bold">要靠逻辑过期 + 异步重建兜底</text>
            <text x="150" y="298" text-anchor="middle" font-size="12.5" font-weight="bold">把边界说清楚，才叫真的懂</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">三个灾难的病因不同，药方也就不同 💊</text>
            </svg>`,
        'mongo-scale': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">📈 文档库的本事与代价</text>
            <rect x="20" y="46" width="260" height="62" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🛟 副本集：自动故障转移</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">主节点挂了，从节点选主顶上</text>
            <rect x="20" y="116" width="260" height="62" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="141" font-size="12.5" font-weight="bold">📈 分片：水平扩展</text>
            <text x="34" y="164" font-size="11.5" font-weight="bold">按分片键把集合摊到多台机器</text>
            <rect x="20" y="186" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="211" font-size="12.5" font-weight="bold">🔁 多文档事务：4.0+ 支持</text>
            <text x="34" y="234" font-size="11.5" font-weight="bold">但跨文档事务的代价比单文档高</text>
            <rect x="20" y="256" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="281" font-size="12.5" font-weight="bold">⚠️ 代价：复杂关联不如 SQL</text>
            <text x="34" y="304" font-size="11.5" font-weight="bold">多表关联要靠 $lookup 或应用层拼</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">适用：字段常变、以整份文档读写为主</text>
            </svg>`,
        'mongo-vs-sql': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">📄 文档 vs 表 对照</text>
            <rect x="20" y="46" width="124" height="150" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🗃️ 关系库</text>
            <text x="34" y="94" font-size="11" font-weight="bold">表 Table</text>
            <text x="34" y="117" font-size="11" font-weight="bold">行 Row</text>
            <text x="34" y="140" font-size="11" font-weight="bold">列固定</text>
            <text x="34" y="163" font-size="11" font-weight="bold">外键 + JOIN</text>
            <rect x="156" y="46" width="124" height="150" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="170" y="71" font-size="12.5" font-weight="bold">📄 文档库</text>
            <text x="170" y="94" font-size="11" font-weight="bold">集合 Collection</text>
            <text x="170" y="117" font-size="11" font-weight="bold">文档 Document</text>
            <text x="170" y="140" font-size="11" font-weight="bold">字段自由</text>
            <text x="170" y="163" font-size="11" font-weight="bold">可嵌套数组</text>
            <rect x="20" y="208" width="260" height="72" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="233" font-size="12" font-weight="bold">一条记录 = 一份类 JSON 文档（BSON）</text>
            <text x="34" y="256" font-size="11.5" font-weight="bold">手机 50 个参数、拖鞋 3 个也能共存</text>
            <text x="150" y="306" text-anchor="middle" font-size="12.5" font-weight="bold">同一集合里文档结构可以不同</text>
            <text x="150" y="334" text-anchor="middle" font-size="11.5" font-weight="bold">但查询的形状，仍要靠代码或校验约束</text>
            </svg>`,
        'mongo-embed': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🪆 嵌入还是引用</text>
            <rect x="20" y="46" width="260" height="78" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">📦 嵌入：总是一起读、数量可控</text>
            <text x="34" y="93.5" font-size="11.5" font-weight="bold">订单里嵌商品快照 → 一次读完</text>
            <text x="34" y="116" font-size="11.5" font-weight="bold">代价：文档会变大，改动要一起改</text>
            <rect x="20" y="132" width="260" height="78" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="157" font-size="12.5" font-weight="bold">🔖 引用：各读各的、会单独变化</text>
            <text x="34" y="179.5" font-size="11.5" font-weight="bold">只存 userId，需要时再查一次</text>
            <text x="34" y="202" font-size="11.5" font-weight="bold">代价：多一次查询，可能要 $lookup</text>
            <rect x="20" y="224" width="260" height="60" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="249" font-size="12" font-weight="bold">判断标准：访问方式，不是好不好看</text>
            <text x="34" y="272" font-size="11.5" font-weight="bold">总是一起读 → 嵌入；独立变化 → 引用</text>
            <text x="150" y="312" text-anchor="middle" font-size="12.5" font-weight="bold">无 Schema ≠ 无约束</text>
            <text x="150" y="340" text-anchor="middle" font-size="11.5" font-weight="bold">索引照样要建，不然照样全集合扫描</text>
            </svg>`,
        'mongo-limits': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔍 文档库的三个误区</text>
            <rect x="20" y="46" width="260" height="74" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🧱 误区一：无 Schema = 随便写</text>
            <text x="34" y="91.5" font-size="11.5" font-weight="bold">字段自由，不等于没有约束</text>
            <text x="34" y="112" font-size="11.5" font-weight="bold">同集合十种写法 → 查询就没法写</text>
            <rect x="20" y="126" width="260" height="74" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="151" font-size="12.5" font-weight="bold">📦 误区二：嵌套越多越好</text>
            <text x="34" y="171.5" font-size="11.5" font-weight="bold">单文档上限 16MB，别塞成巨无霸</text>
            <text x="34" y="192" font-size="11.5" font-weight="bold">嵌入要有度：总是一起读才嵌入</text>
            <rect x="20" y="206" width="260" height="74" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="231" font-size="12.5" font-weight="bold">⚡ 误区三：文档库不用建索引</text>
            <text x="34" y="251.5" font-size="11.5" font-weight="bold">没有索引，照样全集合扫描</text>
            <text x="34" y="272" font-size="11.5" font-weight="bold">聚合管道：$match → $group → $sort</text>
            <text x="150" y="306" text-anchor="middle" font-size="12.5" font-weight="bold">把计算下推到数据库，少搬数据</text>
            <text x="150" y="334" text-anchor="middle" font-size="11.5" font-weight="bold">索引与聚合管道，才是它的性能开关</text>
            </svg>`,
        'aof-fsync': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">💾 AOF 刷盘三档</text>
            <rect x="20" y="46" width="260" height="66" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">always：每条命令都 fsync</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">几乎不丢，但最慢 🐢</text>
            <rect x="20" y="120" width="260" height="66" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="145" font-size="12.5" font-weight="bold">everysec：每秒 fsync 一次（默认 ✅）</text>
            <text x="34" y="168" font-size="11.5" font-weight="bold">最多丢约 1 秒的写入</text>
            <rect x="20" y="194" width="260" height="66" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="219" font-size="12.5" font-weight="bold">no：交给操作系统决定</text>
            <text x="34" y="242" font-size="11.5" font-weight="bold">最快，但丢失量不可控 ⚠️</text>
            <rect x="20" y="270" width="260" height="58" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="295" font-size="12" font-weight="bold">用性能换安全 / 用安全换性能</text>
            <text x="34" y="318" font-size="11.5" font-weight="bold">everysec 站中间，所以成了默认值</text>
            </svg>`,
        'rdb-fork': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🍴 RDB 快照是怎么做的</text>
            <rect x="20" y="46" width="260" height="70" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">① fork 出子进程去拍快照</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">父进程继续服务，主线程不阻塞</text>
            <rect x="20" y="124" width="260" height="70" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="149" font-size="12.5" font-weight="bold">② 写时复制（COW）</text>
            <text x="34" y="172" font-size="11.5" font-weight="bold">只复制被改动的页，省内存</text>
            <rect x="20" y="202" width="260" height="70" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="227" font-size="12.5" font-weight="bold">③ BGREWRITEAOF 重写日志</text>
            <text x="34" y="250" font-size="11.5" font-weight="bold">把命令流水账压成最小等价集合</text>
            <text x="150" y="298" text-anchor="middle" font-size="12.5" font-weight="bold">AOF 重写可以手动触发，也能自动触发</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">重写期间新命令照旧追加，不会丢</text>
            </svg>`,
        'persist-myth': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🃏 谣言 vs 站得住</text>
            <rect x="20" y="46" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">❌"RDB 和 AOF 只能二选一"</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">其实可以同时开，4.0+ 还能混合</text>
            <rect x="20" y="118" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="143" font-size="12.5" font-weight="bold">❌"开了 AOF 就一条都不丢"</text>
            <text x="34" y="166" font-size="11.5" font-weight="bold">everysec 也可能丢约 1 秒</text>
            <rect x="20" y="190" width="260" height="64" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="215" font-size="12.5" font-weight="bold">❌"有主从复制就不用持久化"</text>
            <text x="34" y="238" font-size="11.5" font-weight="bold">复制不能代替持久化：误删会一起同步</text>
            <rect x="20" y="262" width="260" height="56" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="294.5" text-anchor="middle" font-size="12.5" font-weight="bold">✅ RDB 文件小，恢复通常比 AOF 快</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">谣言多半源于"默认配置"和想象不一样</text>
            </svg>`,
        'persist-compare': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">⚖️ 三种持久化怎么选</text>
            <rect x="20" y="46" width="260" height="70" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">📸 RDB：周期性快照</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">恢复快、文件小、可能丢几分钟</text>
            <rect x="20" y="124" width="260" height="70" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="149" font-size="12.5" font-weight="bold">🧾 AOF：写命令流水账</text>
            <text x="34" y="172" font-size="11.5" font-weight="bold">丢得少、文件大、恢复要重放</text>
            <rect x="20" y="202" width="260" height="70" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="227" font-size="12.5" font-weight="bold">🧬 4.0+ 混合持久化</text>
            <text x="34" y="250" font-size="11.5" font-weight="bold">RDB 打底 + 增量 AOF，两头都要</text>
            <text x="150" y="298" text-anchor="middle" font-size="12.5" font-weight="bold">everysec 的"1 秒"是理想上界</text>
            <text x="150" y="326" text-anchor="middle" font-size="11.5" font-weight="bold">磁盘拥塞或整机掉电时会更糟 ⚠️</text>
            </svg>`,
        'replication-chain': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🏃 复制的四棒接力</text>
            <rect x="20" y="46" width="260" height="54" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="77.5" font-size="12.5" font-weight="bold">1️⃣ 主库提交：把变更写进 binlog 📝</text>
            <rect x="20" y="108" width="260" height="54" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="139.5" font-size="12.5" font-weight="bold">2️⃣ 主库 dump 线程：把 binlog 推给从库</text>
            <rect x="20" y="170" width="260" height="54" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="201.5" font-size="12.5" font-weight="bold">3️⃣ 从库 IO 线程：写进 relay log 📗</text>
            <rect x="20" y="232" width="260" height="54" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="263.5" font-size="12.5" font-weight="bold">4️⃣ 从库 SQL 线程：重放，数据真正落地</text>
            <text x="150" y="310" text-anchor="middle" font-size="12.5" font-weight="bold">binlog → relay log → 重放</text>
            <text x="150" y="338" text-anchor="middle" font-size="11.5" font-weight="bold">从库重放的是 relay log，不是主库的文件</text>
            </svg>`,
        'replication-mode': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🎚️ 主库要不要等从库</text>
            <rect x="20" y="46" width="260" height="66" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">异步：写完 binlog 立刻返回</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">延迟最低；主库宕机可能丢最后几个事务</text>
            <rect x="20" y="120" width="260" height="66" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="145" font-size="12.5" font-weight="bold">半同步：等至少一个从库"收到"</text>
            <text x="34" y="168" font-size="11.5" font-weight="bold">更稳但更慢；收到 ≠ 重放完成</text>
            <rect x="20" y="194" width="260" height="66" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="219" font-size="12.5" font-weight="bold">全同步：等所有从库重放完成</text>
            <text x="34" y="242" font-size="11.5" font-weight="bold">最安全也最慢，生产很少用</text>
            <text x="150" y="288" text-anchor="middle" font-size="12.5" font-weight="bold">确认"收到"和"重放完"是两回事</text>
            <text x="150" y="314" text-anchor="middle" font-size="11.5" font-weight="bold">半同步下读从库，仍可能读到旧数据</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">取舍：延迟 vs 丢失风险 ⚖️</text>
            </svg>`,
        'rw-stale-read': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">😱 刚改完昵称，还是旧的</text>
            <rect x="20" y="44" width="260" height="62" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="69" font-size="12.5" font-weight="bold">🙋 用户：改昵称 → 提示成功 ✅</text>
            <text x="34" y="92" font-size="11.5" font-weight="bold">紧接着刷新，看到的还是旧名字</text>
            <rect x="20" y="114" width="260" height="62" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="139" font-size="12.5" font-weight="bold">⏱️ 从库还没重放完这条 binlog</text>
            <text x="34" y="162" font-size="11.5" font-weight="bold">复制延迟：毫秒级起步，大事务到秒级</text>
            <rect x="20" y="184" width="260" height="62" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="209" font-size="12.5" font-weight="bold">✅ 修法一：写后短时间强制读主库</text>
            <text x="34" y="232" font-size="11.5" font-weight="bold">会话粘性：这个用户一直走主库</text>
            <rect x="20" y="254" width="260" height="62" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="279" font-size="12.5" font-weight="bold">✅ 修法二：等位点再读</text>
            <text x="34" y="302" font-size="11.5" font-weight="bold">WAIT_FOR_EXECUTED_GTID_SET 等到位点</text>
            <text x="150" y="342" text-anchor="middle" font-size="11.5" font-weight="bold">钱的事读主库，列表页可以读从库</text>
            </svg>`,
        'rw-roles': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🔗 五个工位，各管一摊</text>
            <rect x="20" y="46" width="260" height="50" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="75.5" font-size="12.5" font-weight="bold">👑 主库：唯一权威，负责写 binlog</text>
            <rect x="20" y="104" width="260" height="50" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="133.5" font-size="12.5" font-weight="bold">🚚 从库 IO 线程：拉 binlog 写 relay</text>
            <rect x="20" y="162" width="260" height="50" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="191.5" font-size="12.5" font-weight="bold">🔁 SQL 线程：重放 relay，落成数据</text>
            <rect x="20" y="220" width="260" height="50" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="249.5" font-size="12.5" font-weight="bold">🧭 中间件 / 代理：按 SQL 类型路由</text>
            <text x="150" y="296" text-anchor="middle" font-size="12.5" font-weight="bold">复制链路负责"搬"，路由负责"去哪台"</text>
            <text x="150" y="324" text-anchor="middle" font-size="11.5" font-weight="bold">中间件不认识 binlog，它只看读写</text>
            </svg>`,
        'cap-scenario': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🛤️ 光纤被挖断了</text>
            <rect x="18" y="46" width="120" height="72" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="78" y="71" text-anchor="middle" font-size="12.5" font-weight="bold">🏢 A 机房</text>
            <text x="78" y="94" text-anchor="middle" font-size="11.5" font-weight="bold">一半用户</text>
            <rect x="162" y="46" width="120" height="72" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="222" y="71" text-anchor="middle" font-size="12.5" font-weight="bold">🏢 B 机房</text>
            <text x="222" y="94" text-anchor="middle" font-size="11.5" font-weight="bold">另一半用户</text>
            <text x="150" y="62" text-anchor="middle" font-size="12" font-weight="bold">✂️</text>
            <line x1="138" y1="78" x2="162" y2="78" stroke="#ff4757" stroke-width="4" stroke-dasharray="5 4"/>
            <rect x="20" y="132" width="260" height="70" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="157" font-size="12.5" font-weight="bold">⚡ 分区发生：两边都能收到充值请求</text>
            <text x="34" y="180" font-size="11.5" font-weight="bold">余额服务必须当场表态：收还是不收？</text>
            <rect x="20" y="212" width="260" height="66" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="237" font-size="12.5" font-weight="bold">🛡️ 选 CP：宁可报错，也不能记错账</text>
            <text x="34" y="260" font-size="11.5" font-weight="bold">等多数派恢复再继续服务</text>
            <rect x="20" y="288" width="260" height="54" rx="10" fill="#ffd6d6" stroke="#1a1a1a" stroke-width="4"/>
            <text x="150" y="319.32" text-anchor="middle" font-size="12" font-weight="bold">⚡ 选 AP：先返回成功，事后对账 ⚠️</text>
            </svg>`,
        'cap-cp-ap': `<svg viewBox="0 0 300 350">
            <text x="150" y="30" text-anchor="middle" font-size="15.5" font-weight="bold">🎚️ CP 与 AP 的两副面孔</text>
            <rect x="20" y="46" width="260" height="84" rx="10" fill="#d6f5ff" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="71" font-size="12.5" font-weight="bold">🏦 CP：分区时保一致</text>
            <text x="34" y="94" font-size="11.5" font-weight="bold">可能超时、报错、阻塞</text>
            <text x="34" y="117" font-size="11.5" font-weight="bold">典型：ZooKeeper / etcd / HBase</text>
            <rect x="20" y="138" width="260" height="84" rx="10" fill="#ffe9a8" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="163" font-size="12.5" font-weight="bold">🛒 AP：分区时保可用</text>
            <text x="34" y="186" font-size="11.5" font-weight="bold">照常返回，但可能读到旧值</text>
            <text x="34" y="209" font-size="11.5" font-weight="bold">典型：Cassandra / DynamoDB</text>
            <rect x="20" y="230" width="260" height="72" rx="10" fill="#a9ffc4" stroke="#1a1a1a" stroke-width="4"/>
            <text x="34" y="255" font-size="12" font-weight="bold">BASE = 基本可用 + 软状态 + 最终一致</text>
            <text x="34" y="278" font-size="11.5" font-weight="bold">不是不要一致，是把一致推迟到分区结束</text>
            <text x="150" y="330" text-anchor="middle" font-size="11.5" font-weight="bold">同一个系统也能按数据粒度取舍：余额偏 CP</text>
            </svg>`,
    },

    // ============ 🖼️ 插画兜底解析器 ============
    // 背景：部分分镜引用了尚未绘制的 scene 名（如 table-anatomy、index-cover）。
    // 旧行为：comicScenes[name] 为 undefined → 整个右侧插画区被丢弃，
    //         双栏布局塌陷成单栏，学生看到"这页没有图"。
    // 新行为：按前缀智能回退到同族已定义插画，保证每页都有图、版式不塌。
    SCENE_FALLBACK_PREFIXES: [
        'sharding', 'replication', 'readwrite', 'cap', 'disttx', 'tx', 'cache3',
        'nosql', 'mongo', 'redis', 'persist', 'rdb', 'aof', 'bptree', 'bp',
        'bufferpool', 'index', 'clustered', 'constraint', 'crud', 'sql', 'sqlinject',
        'view', 'db', 'table', 'pk', 'null', 'vector', 'metric', 'hnsw', 'milvus',
        'rag', 'memory', 'lock', 'mvcc', 'redo', 'wal', 'crash', 'integrity', 'delete',
    ],

    // 解析一个 scene 名 → 可用的 SVG 字符串（永不返回 undefined）
    resolveScene(name) {
        if (!name) return null;
        const scenes = this.comicScenes;
        if (scenes[name]) return scenes[name];

        // ① 前缀回退：sharding-route → sharding
        for (const p of this.SCENE_FALLBACK_PREFIXES) {
            if (name === p) continue;
            if (name.startsWith(p) && scenes[p]) {
                this.missingScenes[name] = p;
                return scenes[p];
            }
        }
        // ② 再按最长公共前缀模糊匹配
        let best = null, bestLen = 0;
        for (const key of Object.keys(scenes)) {
            if (key.startsWith('sp-')) continue;
            let n = 0;
            while (n < name.length && n < key.length && name[n].toLowerCase() === key[n].toLowerCase()) n++;
            if (n > bestLen) { bestLen = n; best = key; }
        }
        if (best && bestLen >= 3) {
            this.missingScenes[name] = best;
            return scenes[best];
        }
        // ③ 最终兜底：通用"思考中"插画，保证版式不塌
        this.missingScenes[name] = '(通用)';
        return scenes.scatter || null;
    },

    // 开发期诊断：列出所有走了兜底的 scene，方便后续补齐真插画
    missingScenes: {},
    reportMissingScenes() {
        const keys = Object.keys(this.missingScenes);
        if (keys.length) {
            console.warn('[数塔] 以下 scene 未绘制，已用同族插画兜底：', this.missingScenes);
        }
        return this.missingScenes;
    },

    // ================= 打字机效果 =================
    typeWriterEffect(text, element) {
        if (!element) return;
        element.innerHTML = '';
        let i = 0;
        clearInterval(this.typeWriterTimer);
        this.typeWriterTimer = setInterval(() => {
            if (i < text.length) { element.innerHTML += text.charAt(i); i++; }
            else { clearInterval(this.typeWriterTimer); }
        }, 50);
    },

    // ================= 漫画动画特效 =================
    spawnSpark(x, y, emoji = '✨') {
        const symbols = ['✨', '⭐', '💥', '★', '💫'];
        for (let i = 0; i < 6; i++) {
            const s = document.createElement('span');
            s.className = 'spark';
            s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            s.style.left = x + 'px'; s.style.top = y + 'px';
            const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
            const dist = 60 + Math.random() * 60;
            s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
            s.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 650);
        }
    },

    spawnConfetti() {
        const colors = ['#ff4757', '#ffd32a', '#00d2d3', '#a29bfe', '#55efc4', '#ff9f43'];
        const shapes = ['🎉', '⭐', '💥', '🌟', '❤️', '✦'];
        for (let i = 0; i < 40; i++) {
            const c = document.createElement('div');
            c.className = 'confetti-piece';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.top = '-20px';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDelay = Math.random() * 0.8 + 's';
            c.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
            if (Math.random() > 0.5) {
                c.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                c.style.background = 'transparent';
                c.style.fontSize = (16 + Math.random() * 16) + 'px';
            } else {
                c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            }
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 3500);
        }
    },

    celebrate() {
        document.body.classList.add('celebrating');
        this.spawnConfetti();
        setTimeout(() => document.body.classList.remove('celebrating'), 900);
    },

    // ==================== 💾 学习进度存储（分层容错） ====================
    // 设计目标：不再"只依赖浏览器缓存"。
    //   第 1 层：页面内嵌基线（window.SHUTA_PROGRESS_BASELINE，由 progress-baseline.js 提供）
    //            —— 清缓存 / 隐私模式 / 换浏览器后依然存在，保证进度不归零。
    //   第 2 层：localStorage 增量缓存 —— 让"本次学习"能累积并在下次打开时叠加。
    //   第 3 层：内存态兜底 —— localStorage 被禁用（隐私模式/配额满）时不报错、不白屏。
    PROGRESS_KEY: 'shuta_progress',

    // 安全读取 localStorage：任何异常都降级为 null，绝不抛出打断渲染
    safeStorageGet(key) {
        try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    safeStorageSet(key, val) {
        try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; }
    },
    safeStorageRemove(key) {
        try { window.localStorage.removeItem(key); return true; } catch (e) { return false; }
    },

    // 读取内嵌基线：由 <script src="js/progress-baseline.js"> 注入 window.SHUTA_PROGRESS_BASELINE
    readEmbeddedBaseline() {
        const b = window.SHUTA_PROGRESS_BASELINE;
        if (Array.isArray(b)) return b.slice();
        if (b && Array.isArray(b.completedKps)) return b.completedKps.slice();
        return [];
    },

    initProgress() {
        const baseline = this.readEmbeddedBaseline();

        // 读取缓存增量（旧版本键名 shuta_progress 保持兼容）
        let cached = [];
        const saved = this.safeStorageGet(this.PROGRESS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) cached = parsed;
            } catch (e) { cached = []; }
        }

        // 合并：基线 ∪ 缓存（去重，保持稳定顺序）
        const merged = [];
        baseline.concat(cached).forEach(id => {
            if (id && !merged.includes(id)) merged.push(id);
        });
        this.completedKps = merged;
        this.storageAvailable = (this.safeStorageGet('__shuta_probe__') !== undefined) || true;

        // 回写一次，把基线固化进缓存，后续读取更快
        this.persistProgress();
        this.updateProgressUI();
    },

    // 统一的持久化出口：失败只影响"下次打开的记忆"，绝不影响本次使用
    persistProgress() {
        const ok = this.safeStorageSet(this.PROGRESS_KEY, JSON.stringify(this.completedKps));
        this.storageAvailable = ok;
        return ok;
    },

    saveProgress(kpId) {
        if (!kpId) return;
        if (!this.completedKps.includes(kpId)) {
            this.completedKps.push(kpId);
            const ok = this.persistProgress();
            this.updateProgressUI();
            // 用户若正停在「我的学习记录」那一页，立刻刷新它，做到真实时
            this.refreshLiveBoardIfVisible();
            takuEngine.playVoice(ok ? "叮！知识点已加入学习记录！" : "叮！已记录（本次会话内有效）");
        }
    },

    // 若当前正显示「学习记录」面板，就地重渲染一次（进度变化时调用）
    refreshLiveBoardIfVisible() {
        if (!document.querySelector('.lp-board')) return;
        if (!this.currentChapter || !this.currentChapter.knowledgePoints) return;
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const panel = kp && kp.panels && kp.panels[this.currentPanelIndex];
        if (panel && panel.liveBoard === 'progress') this.renderLiveProgress(panel);
    },

    updateProgressUI() {
        const countEl = document.getElementById('progress-count');
        const totalEl = document.getElementById('progress-total');
        if (countEl) countEl.innerText = this.completedKps.length;
        if (totalEl) {
            let total = 0;
            if (typeof textbookData !== 'undefined' && textbookData.chapters) {
                textbookData.chapters.forEach(c => { if (c && c.knowledgePoints) total += c.knowledgePoints.length; });
            }
            // 兜底：数据未就绪时用内嵌基线里的 total，避免显示成 0 或写死的错值
            if (!total) {
                const b = window.SHUTA_PROGRESS_BASELINE;
                total = (b && b.total) || 0;
            }
            if (total) totalEl.innerText = total;
        }
    },

    // ==================== 🧭 新手引导系统 ====================
    // 设计目标：让第一次打开的人立刻知道「这是什么、从哪开始、怎么玩」。
    // 三层引导：① 首屏引导浮层（塔库对话式）② 「从这里开始」推荐标记 ③ 分镜内新题型提示

    GUIDE_KEY: 'shuta_guide_seen',

    // 是否已经看过首屏引导（看过就不再自动弹出，用户仍可手动点「❓ 怎么玩」重看）
    hasSeenGuide() {
        return this.safeStorageGet(this.GUIDE_KEY) === '1';
    },
    markGuideSeen() {
        this.safeStorageSet(this.GUIDE_KEY, '1');
    },

    // 找出「应该从哪继续」：第一个未完成的知识点
    findRecommendedStart() {
        if (typeof textbookData === 'undefined' || !textbookData.chapters) return null;
        for (const ch of textbookData.chapters) {
            if (!ch || !ch.knowledgePoints) continue;
            for (const kp of ch.knowledgePoints) {
                if (!this.completedKps.includes(kp.id)) {
                    return { chapter: ch, chapterId: ch.id, kpId: kp.id, kpTitle: kp.title };
                }
            }
        }
        return null;  // 全部学完
    },

    // 累计已完成的章节数（用于「第 N 章进行中」提示）
    chapterProgress(chapter) {
        if (!chapter || !chapter.knowledgePoints) return { done: 0, total: 0 };
        let done = 0;
        chapter.knowledgePoints.forEach(kp => { if (this.completedKps.includes(kp.id)) done++; });
        return { done, total: chapter.knowledgePoints.length };
    },

    // ---------- 首屏引导浮层 ----------
    showGuide(force) {
        if (!force && this.hasSeenGuide()) return;
        const old = document.getElementById('guide-overlay');
        if (old) old.remove();

        const start = this.findRecommendedStart();
        const startLine = start
            ? `从 <b>第${start.chapterId}章 · ${start.kpTitle}</b> 开始你的攀登吧！`
            : `你已经把整座塔都爬完啦，太强了！要不要回去复习一下？`;

        const ov = document.createElement('div');
        ov.id = 'guide-overlay';
        ov.className = 'guide-overlay';
        ov.innerHTML = `
            <div class="guide-card">
                <div class="guide-taku">
                    <img src="assets/img/taku-anchor.png" alt="塔库">
                </div>
                <h2 class="guide-title">哔哔——欢迎来到数塔！</h2>
                <p class="guide-sub">我是你的向导塔库，先用 30 秒带你逛一圈👇</p>

                <ol class="guide-steps">
                    <li>
                        <span class="gs-num">1</span>
                        <div class="gs-body">
                            <b>选一章开始爬</b>
                            <span>下面是 6 座塔（章节），<b>从 VOL.1 开始</b>最顺。看到 🚩 标记的那张，就是推荐你接着学的地方。</span>
                        </div>
                    </li>
                    <li>
                        <span class="gs-num">2</span>
                        <div class="gs-body">
                            <b>跟着塔库一页页学</b>
                            <span>每节都有漫画和互动：<b>点右边漫画里的道具</b>、按顺序点、配对、填空、判断、质疑、写答案……做完才会出现「继续」按钮。</span>
                        </div>
                    </li>
                    <li>
                        <span class="gs-num">3</span>
                        <div class="gs-body">
                            <b>做完小测验就算学完</b>
                            <span>每节最后有 3~4 道复盘题，答对就能点亮进度。<b>进度会自动保存</b>，清缓存也不会丢。</span>
                        </div>
                    </li>
                    <li>
                        <span class="gs-num">4</span>
                        <div class="gs-body">
                            <b>想动手写 SQL？去「数塔之家」</b>
                            <span>右上角 <b>🏠 数塔之家</b> 是真实数据库沙盒，可以自己敲 SQL 做任务，学完就来练手。</span>
                        </div>
                    </li>
                </ol>

                <p class="guide-start-line">${startLine}</p>

                <div class="guide-actions">
                    <button class="comic-btn guide-go" id="guide-go">🚀 带我去开始</button>
                    <button class="guide-skip" id="guide-skip">我先自己逛逛</button>
                </div>
                <p class="guide-foot">随时可以点右上角 <b>❓ 怎么玩</b> 重新看这份指南</p>
            </div>
        `;
        document.body.appendChild(ov);

        const close = (goStart) => {
            this.markGuideSeen();
            ov.classList.add('closing');
            setTimeout(() => ov.remove(), 260);
            if (goStart && start) {
                this.startChapter(start.chapter);
            }
        };
        ov.querySelector('#guide-go').onclick = () => close(true);
        ov.querySelector('#guide-skip').onclick = () => close(false);
        ov.onclick = (e) => { if (e.target === ov) close(false); };
    },

    // 🎴 hero 横幅点击翻转：点主图翻出使用指南
    setupHeroGuide() {
        const hero = document.getElementById('hero-banner');
        if (!hero || hero.dataset.guideReady) return;
        hero.dataset.guideReady = '1';

        // 加提示标签
        const hint = document.createElement('div');
        hint.className = 'hero-tap-hint';
        hint.innerText = '📜 数塔传说';
        hero.appendChild(hint);

        // 指南覆盖层（默认隐藏）
        const guide = document.createElement('div');
        guide.className = 'hero-guide-overlay';
        guide.innerHTML = `
            <div class="guide-inner lore">
                <div class="guide-header">
                    <span class="guide-badge">📜 传说</span>
                    <h2>数塔的传说</h2>
                </div>
                <div class="lore-text">
                    <p>在数据的荒原上，矗立着一座高耸入云的<b>数塔</b>。</p>
                    <p>没有人知道它是谁建造的——有人说它是远古的数据遗迹，有人说它是未来 AI 世界的入口。</p>
                    <p>塔共有 <b>六层高</b>：</p>
                    <p>第一层堆满了散落的纸张和锁孔；第二层刻着古老的咒语；第三层藏着齿轮与机关；第四层架着彩虹般的桥梁；第五层悬浮在云海之上；而最顶层——传说藏着<b>通往 AI 世界的钥匙</b>。</p>
                    <p>千百年来，无数冒险者来到塔下，却没有人能爬到顶。直到今天……</p>
                    <p style="text-align:center; font-size:1.15rem; color:#d63031; margin-top:18px;">塔库 🤖 —— 这座塔最后的守护者，选中了你。</p>
                </div>
                <button class="start-btn">⚔️ 踏入数塔</button>
            </div>
        `;
        hero.appendChild(guide);

        let showing = false;
        hero.style.cursor = 'pointer';
        hero.addEventListener('click', (e) => {
            if (e.target.closest('.start-btn')) return;
            showing = !showing;
            guide.style.display = showing ? 'flex' : 'none';
            hint.style.display = showing ? 'none' : 'block';
        });

        // 🚀 开始攀登数塔：关掉指南，去推荐起点（和首屏引导的「带我去开始」一个行为）
        const startBtn = guide.querySelector('.start-btn');
        if (startBtn) {
            startBtn.onclick = (e) => {
                e.stopPropagation();
                guide.style.display = 'none';
                hint.style.display = 'none';
                showing = false;
                const start = this.findRecommendedStart();
                if (start) {
                    this.startChapter(start.chapter);
                } else {
                    takuEngine.playVoice('整座塔都爬完啦！想复习的话，挑一张塔再爬一遍吧');
                }
            };
        }
    },

    // ==================== 📋 学习记录（现场生成） ====================
    // 只把【已完成】的知识点写进日志；没学完的一律不出现。
    // 数据直接读 comicEngine.completedKps，所以它永远等于你的真实进度。
    renderLiveProgress(panel) {
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const total = (kp && kp.panels) ? kp.panels.length : 1;
        const dots = Array.from({ length: total }, (_, i) =>
            `<span class="pd-dot${i === this.currentPanelIndex ? ' active' : ''}"></span>`).join('');

        const chapters = (typeof textbookData !== 'undefined' && textbookData.chapters) ? textbookData.chapters : [];
        const blocks = [];
        let grandTotal = 0, doneTotal = 0;

        chapters.forEach((ch) => {
            if (!ch || !ch.knowledgePoints) return;
            grandTotal += ch.knowledgePoints.length;
            const done = ch.knowledgePoints.filter(k => k && this.completedKps.includes(k.id));
            doneTotal += done.length;
            if (done.length === 0) return;          // ← 没学完的整章不出现
            const items = done.map(k =>
                `<li class="lp-item"><b class="lp-id">${k.id}</b><span class="lp-ico">${k.icon || '📘'}</span>${k.title}</li>`
            ).join('');
            blocks.push(`
                <div class="lp-chapter">
                    <div class="lp-chapter-head">
                        <span class="lp-chapter-name">${ch.title || ('第' + ch.id + '章')}</span>
                        <span class="lp-chapter-count">${done.length}/${ch.knowledgePoints.length}</span>
                    </div>
                    <ul class="lp-list">${items}</ul>
                </div>`);
        });

        const pct = grandTotal ? Math.round(doneTotal / grandTotal * 100) : 0;
        const body = blocks.length
            ? blocks.join('')
            : '<div class="lp-empty">还没有学习记录——去爬塔吧！学完一节，这里就会多出一条。🏰</div>';

        // 复用引擎已有的双栏结构：左边学习记录，右边场景插画
        const sceneSvg = panel.scene ? this.resolveScene(panel.scene) : null;

        this.stage.innerHTML = `
            <div class="comic-panel lesson-page mode-page lp-page">
                <div class="panel-topbar">
                    <span class="pt-chapter">${this.currentChapter.title}</span>
                    <span class="pt-kp">EP.${kp ? kp.id : ''} · ${kp ? kp.title : ''}</span>
                    <span class="pt-progress">分镜 ${this.currentPanelIndex + 1}/${total}<span class="pd-dots">${dots}</span></span>
                </div>
                <div class="${sceneSvg ? 'mode-split' : ''}">
                    <div class="mode-board lp-board" id="interaction-area">
                        <div class="lp-summary">
                            <span class="lp-big">${doneTotal}</span>
                            <span class="lp-slash">/ ${grandTotal} 节已通关</span>
                            <div class="lp-bar"><i style="width:${pct}%"></i></div>
                            <span class="lp-pct">${pct}%</span>
                        </div>
                        <div class="lp-scroll">${body}</div>
                        <div class="lp-actions" id="panel-controls"></div>
                    </div>
                    ${sceneSvg ? `<aside class="mode-scene" id="mode-scene">${sceneSvg}</aside>` : ''}
                </div>
            </div>`;

        if (panel.taku) {
            takuEngine.setEmotion(panel.taku.emotion || 'normal');
            const takuText = document.getElementById('taku-text');
            this.typeWriterEffect(panel.taku.dialogue || "", takuText);
            takuEngine.playVoice(panel.taku.dialogue || "");
        }

        const panelControls = document.getElementById('panel-controls');
        if (this.currentPanelIndex > 0 && panelControls) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.innerText = '⬅ 上一步';
            prevBtn.onclick = () => this.previousPanel();
            panelControls.appendChild(prevBtn);
        }
        if (panelControls) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'comic-btn';
            nextBtn.innerText = (panel.interaction && panel.interaction.text) || '看完，继续 ▶';
            nextBtn.onclick = () => this.nextPanel();
            panelControls.appendChild(nextBtn);
        }
    },

    renderChapters(data) {
        const header = document.getElementById('main-header');
        if (header) header.style.display = 'flex';
        const hero = document.getElementById('hero-banner');
        if (hero) hero.style.display = 'block';
        if (this.globalHomeBtn) this.globalHomeBtn.style.display = 'none';
        if (!this.stage) return;
        this.stage.innerHTML = '';

        if (!data || !data.chapters || !Array.isArray(data.chapters)) {
            this.stage.innerHTML = '<div style="text-align:center; width:100%; color:red; font-size:20px; padding:50px;">⚠️ 数据加载失败。</div>';
            return;
        }

        const listDiv = document.createElement('div');
        listDiv.className = 'chapter-list';

        // 🎴 使用指南合并到上面 hero 横幅：点击横幅翻出指南
        this.setupHeroGuide();

        const recommended = this.findRecommendedStart();

        data.chapters.forEach((chapter, index) => {
            if (!chapter) return;
            const card = document.createElement('div');
            card.className = 'chapter-card';
            const cover = this.chapterCovers[chapter.id];
            const coverImgHtml = cover
                ? `<div class="cover-img-wrap">
                       <img class="cover-img" src="${cover.src}" alt="${chapter.title || ''} 封面插画" loading="lazy">
                       <span class="cover-sfx">${cover.sfx}</span>
                   </div>`
                : `<div class="cover-art">🤖 塔库带你探索</div>`;
            // 🧭 进度与「推荐从这里开始」标记
            const pg = this.chapterProgress(chapter);
            const isRec = recommended && recommended.chapterId === chapter.id;
            const pct = pg.total ? Math.round(pg.done / pg.total * 100) : 0;
            const recHtml = isRec ? `<div class="rec-flag">🚩 推荐从这里开始</div>` : '';
            // 章节整体的学习状态徽标
            let stateHtml = '';
            if (pg.total && pg.done === pg.total) stateHtml = `<div class="ch-state done">✅ 已学完</div>`;
            else if (pg.done > 0) stateHtml = `<div class="ch-state doing">📖 学到 ${pg.done}/${pg.total}</div>`;
            else stateHtml = `<div class="ch-state new">🆕 还没开始</div>`;

            const actionText = pg.done > 0
                ? (pg.done === pg.total ? '点击复习 ▶' : `继续第 ${pg.done + 1} 节 ▶`)
                : '点击开始阅读 ▶';

            card.innerHTML = `
                <div class="comic-cover">
                    <div class="cover-badge">VOL.${chapter.id || index + 1}</div>
                    ${recHtml}
                    ${stateHtml}
                    ${coverImgHtml}
                    <h3>${chapter.title || '未知章节'}</h3>
                    <div class="ch-progress-bar"><i style="width:${pct}%"></i></div>
                    <div class="cover-action">${actionText}</div>
                </div>
            `;
            if (isRec) card.classList.add('is-recommended');
            card.onclick = (e) => {
                this.spawnSpark(e.clientX, e.clientY);
                if (!chapter.knowledgePoints || chapter.knowledgePoints.length === 0) {
                    takuEngine.speak(`《${chapter.title}》的数据还在传输中...`, 3000);
                    takuEngine.setEmotion("confused");
                    return;
                }
                this.startChapter(chapter);
            };
            listDiv.appendChild(card);
        });
        // ⚠️ 必须挂载章节网格，否则首页一片空白、用户无从下手
        this.stage.appendChild(listDiv);
    },

    startChapter(chapter) {
        if (this.globalHomeBtn) this.globalHomeBtn.style.display = 'block';
        const hero = document.getElementById('hero-banner');
        if (hero) hero.style.display = 'none';
        this.currentChapter = chapter;
        this.renderKnowledgePoints(chapter);
    },

    renderKnowledgePoints(chapter) {
        if (!this.stage) return;
        this.stage.innerHTML = '';
        const listDiv = document.createElement('div');
        listDiv.className = 'chapter-list knowledge-layout';

        if (!chapter.knowledgePoints || chapter.knowledgePoints.length === 0) {
            listDiv.innerHTML = '<p style="width:100%; text-align:center; font-size:1.5rem;">这一章还在建设中...</p>';
            this.stage.appendChild(listDiv);
            return;
        }

        chapter.knowledgePoints.forEach((kp, index) => {
            if (!kp) return;
            const card = document.createElement('div');
            card.className = 'chapter-card kp-card';
            const safeId = kp.id || `X-${index + 1}`;
            const safeTitle = kp.title || `神秘知识点 ${index + 1}`;
            const isCompleted = this.completedKps.includes(safeId);
            const isEmpty = !kp.panels || kp.panels.length === 0;

            if (isCompleted) card.classList.add('kp-completed');

            card.innerHTML = `
                ${isCompleted ? '<div class="kp-completed-stamp">✅<br>已学习</div>' : ''}
                <div class="kp-strip">
                    <span class="kp-strip-num">EP.${safeId}</span>
                    <span class="kp-strip-page">P.${String(index + 1).padStart(2, '0')}</span>
                </div>
                <!-- 🖼️ 小节封面插画（取自「数塔世界」路线图）；加载失败时自动回退到 emoji 图标 -->
                <div class="kp-cover">
                    <img src="assets/img/kp/${safeId}.jpg" alt="${safeTitle} 插画" loading="lazy"
                         onload="this.closest('.kp-card').querySelector('.kp-icon-wrap').style.display='none'"
                         onerror="this.parentNode.remove()">
                    <span class="kp-cover-badge">${kp.icon || '📘'}</span>
                </div>
                <div class="kp-icon-wrap">
                    <span class="kp-icon">${kp.icon || '📘'}</span>
                </div>
                <h3>${safeTitle}</h3>
                <div class="cover-action">${isEmpty ? '建设中…' : '点击阅读 ▶'}</div>
            `;
            card.onclick = (e) => {
                if (!isEmpty) this.spawnSpark(e.clientX, e.clientY);
                this.startKnowledgePoint(chapter, index);
            };
            listDiv.appendChild(card);
        });
        this.stage.appendChild(listDiv);
    },

    startKnowledgePoint(chapter, kpIndex) {
        this.currentChapter = chapter;
        this.currentKpIndex = kpIndex;
        this.currentPanelIndex = 0;

        const kp = chapter.knowledgePoints[kpIndex];
        if (!kp || !kp.panels || kp.panels.length === 0) {
            takuEngine.speak("这节的内容还在加载中哦！", 2000);
            return;
        }
        takuEngine.speak(`开始学习：${kp.title}`, 2000);
        this.renderPanel(kp.panels[0]);
    },

    renderPanel(panel) {
        if (!panel || !this.stage) return;

        // 📋 现场生成的学习记录（只列【已经通关】的知识点）
        if (panel.liveBoard === 'progress') {
            this.renderLiveProgress(panel);
            return;
        }

        // 🧩 新题型：排序 / 配对 / 填空 / 对比 / 翻卡 / 找茬 / 抉择 / 分类 / 判断 / 质疑 / 写答案 / 说理解
        if (panel.interaction && this.NEW_MODES.includes(panel.interaction.type)) {
            this.renderModePanel(panel);
            return;
        }

        // 🎬 漫画分镜模式：panel.scene 存在时走左右双栏
        if (panel.scene && this.resolveScene(panel.scene)) {
            this.renderScenePanel(panel);
            return;
        }

        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const total = (kp && kp.panels) ? kp.panels.length : 1;
        const dots = Array.from({ length: total }, (_, i) =>
            `<span class="pd-dot${i === this.currentPanelIndex ? ' active' : ''}"></span>`).join('');

        this.stage.innerHTML = `
            <div class="comic-panel lesson-page">
                <div class="panel-topbar">
                    <span class="pt-chapter">${this.currentChapter.title}</span>
                    <span class="pt-kp">EP.${kp ? kp.id : ''} · ${kp ? kp.title : ''}</span>
                    <span class="pt-progress">分镜 ${this.currentPanelIndex + 1}/${total}<span class="pd-dots">${dots}</span></span>
                </div>
                <div class="stage-area" id="stage-area"></div>
                <div class="interaction-area" id="interaction-area"></div>
                <div class="panel-controls" id="panel-controls"></div>
            </div>
        `;

        if (panel.taku) {
            takuEngine.setEmotion(panel.taku.emotion || "normal");
            const takuText = document.getElementById('taku-text');
            this.typeWriterEffect(panel.taku.dialogue || "", takuText);
            takuEngine.playVoice(panel.taku.dialogue || "");
        }

        const stageArea = document.getElementById('stage-area');
        const interactionArea = document.getElementById('interaction-area');
        const panelControls = document.getElementById('panel-controls');

        if (this.currentPanelIndex > 0 && panelControls) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.innerText = '⬅ 上一步';
            prevBtn.onclick = () => this.previousPanel();
            panelControls.appendChild(prevBtn);
        }

        if (panel.stage && panel.stage.length > 0 && stageArea) {
            panel.stage.forEach(item => {
                const el = document.createElement('div');
                el.className = item.className || '';
                el.innerText = item.content || '';
                stageArea.appendChild(el);
            });
        }

        if (panel.interaction && interactionArea) {
            this.renderInteraction(panel, interactionArea);
        }
    },

    // 统一交互渲染（普通面板与分镜面板共用）
    renderInteraction(panel, interactionArea) {
        if (panel.interaction.type === 'click-object') {
            const objects = document.querySelectorAll(`.${panel.interaction.targetClass}`);
            const needed = objects.length;

            // 🎯 内嵌归位区：点过的东西飞进来，看得见成果
            const zoneLabel = (panel.dropZone && panel.dropZone.label) || '📥 已收集';
            const zone = document.createElement('div');
            zone.className = 'drop-zone inline';
            zone.innerHTML = `
                <span class="drop-zone-label">${zoneLabel}</span>
                <span class="drop-zone-chips"></span>
                <span class="drop-zone-count">0/${needed}</span>
            `;
            interactionArea.appendChild(zone);

            const instruction = document.createElement('p');
            instruction.innerText = panel.interaction.text || "点击进行互动";
            instruction.className = 'instruction-hint';
            interactionArea.appendChild(instruction);

            let collectedCount = 0;

            objects.forEach(obj => {
                obj.onclick = (e) => {
                    if (obj.classList.contains('collected')) return;
                    obj.classList.add('collected');
                    collectedCount++;
                    this.spawnSpark(e.clientX, e.clientY);

                    if (obj.classList.contains('table-header-item')) takuEngine.playVoice("这是‘列’，代表数据的属性！");
                    else if (obj.classList.contains('table-row-item')) takuEngine.playVoice("这是‘行’，代表一条完整的记录！");
                    else if (obj.classList.contains('crud-item')) takuEngine.playVoice("这是：" + obj.innerText);
                    else if (obj.classList.contains('pk-item')) takuEngine.playVoice("主键找到了！");
                    else if (obj.classList.contains('fk-item')) takuEngine.playVoice("外键：连接两张表的桥！");
                    else takuEngine.playVoice(obj.innerText || "叮！");

                    // 🚀 飞入归位区
                    this.flyToZone(obj, zone, () => {
                        this.addZoneChip(zone, obj.innerText);
                        this.updateZoneCount(zone, collectedCount, needed);
                    });

                    if (collectedCount === objects.length) {
                        zone.classList.add('complete');
                        setTimeout(() => this.nextPanel(), 1800);
                    }
                };
            });
        }
        else if (panel.interaction.type === 'quiz') {
            const q = document.createElement('h3');
            q.innerText = panel.interaction.question || "";
            q.className = 'quiz-question';
            interactionArea.appendChild(q);

            (panel.interaction.options || []).forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = 'comic-btn';
                btn.innerText = opt;
                btn.onclick = (e) => {
                    if (index === panel.interaction.answer) {
                        takuEngine.speak("哔哔——回答正确！", 2000);
                        takuEngine.setEmotion("happy");
                        this.spawnSpark(e.clientX, e.clientY, '🎉');
                        interactionArea.querySelectorAll('button').forEach(b => b.disabled = true);
                        setTimeout(() => this.nextPanel(), 2000);
                    } else {
                        takuEngine.speak("哎呀，再想想？");
                        takuEngine.setEmotion("confused");
                        btn.style.background = '#ff6b6b';
                        btn.style.color = '#fff';
                    }
                };
                interactionArea.appendChild(btn);
            });
        }
        else if (panel.interaction.type === 'click') {
            const btn = document.createElement('button');
            btn.className = 'comic-btn';
            btn.innerText = panel.interaction.text || "继续";
            btn.onclick = () => {
                if (panel.interaction.nextAction === 'return_home') this.goHome();
                else this.nextPanel();
            };
            interactionArea.appendChild(btn);
        }
    },

    // ==================== 互动练习面板（新题型） ====================
    renderModePanel(panel) {
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const total = (kp && kp.panels) ? kp.panels.length : 1;
        const dots = Array.from({ length: total }, (_, i) =>
            `<span class="pd-dot${i === this.currentPanelIndex ? ' active' : ''}"></span>`).join('');

        const sceneSvg = panel.scene ? this.resolveScene(panel.scene) : null;
        const hasScene = !!sceneSvg;
        this.stage.innerHTML = `
            <div class="comic-panel lesson-page mode-page">
                <div class="panel-topbar">
                    <span class="pt-chapter">${this.currentChapter.title}</span>
                    <span class="pt-kp">EP.${kp ? kp.id : ''} · ${kp ? kp.title : ''}</span>
                    <span class="pt-progress">分镜 ${this.currentPanelIndex + 1}/${total}<span class="pd-dots">${dots}</span></span>
                </div>
                <div class="explain-area" id="explain-area"></div>
                <div class="${hasScene ? 'mode-split' : ''}">
                    <div class="mode-board" id="interaction-area"></div>
                    ${hasScene ? `<aside class="mode-scene" id="mode-scene">${sceneSvg}</aside>` : ''}
                </div>
                <div class="panel-controls" id="panel-controls"></div>
            </div>
        `;

        if (panel.taku) {
            takuEngine.setEmotion(panel.taku.emotion || "normal");
            const takuText = document.getElementById('taku-text');
            this.typeWriterEffect(panel.taku.dialogue || "", takuText);
            takuEngine.playVoice(panel.taku.dialogue || "");
        }

        const explainArea = document.getElementById('explain-area');
        const board = document.getElementById('interaction-area');
        const panelControls = document.getElementById('panel-controls');

        if (this.currentPanelIndex > 0 && panelControls) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.innerText = '⬅ 上一步';
            prevBtn.onclick = () => this.previousPanel();
            panelControls.appendChild(prevBtn);
        }

        if (panel.explain && explainArea) {
            const el = document.createElement('div');
            el.className = 'bubble';
            el.innerHTML = `
                <img class="bubble-avatar" src="assets/img/taku-anchor.png" alt="塔库">
                <div class="bubble-text">${panel.explain}</div>
            `;
            explainArea.appendChild(el);
        }

        // 题型缎带
        const meta = this.modeMeta[panel.interaction.type] || { icon: '🎯', name: '课堂练习' };
        const ribbon = document.createElement('div');
        ribbon.className = 'mode-ribbon';
        ribbon.innerHTML = `<span>${meta.icon}</span> ${meta.name}`;
        board.appendChild(ribbon);

        // 🧭 玩法说明：第一次遇到这种题型时给一句人话提示
        if (meta.help) {
            const h = document.createElement('div');
            h.className = 'mode-help';
            h.innerHTML = `<span class="mh-icon">💡</span><span>${meta.help}</span>`;
            board.appendChild(h);
        }

        const handlers = {
            sequence: () => this.modeSequence(panel.interaction, board, panel),
            match:    () => this.modeMatch(panel.interaction, board, panel),
            fill:     () => this.modeFill(panel.interaction, board, panel),
            toggle:   () => this.modeToggle(panel.interaction, board, panel),
            flip:     () => this.modeFlip(panel.interaction, board, panel),
            find:     () => this.modeFind(panel.interaction, board, panel),
            branch:   () => this.modeBranch(panel.interaction, board, panel),
            sort:     () => this.modeSort(panel.interaction, board, panel),
            judge:     () => this.modeJudge(panel.interaction, board, panel),
            challenge: () => this.modeChallenge(panel.interaction, board, panel),
            input:     () => this.modeInput(panel.interaction, board, panel),
            describe:  () => this.modeDescribe(panel.interaction, board, panel),
        };
        (handlers[panel.interaction.type] || (() => {}))();
    },

    modeQuestion(it, board) {
        if (!it.question) return;
        const q = document.createElement('div');
        q.className = 'mode-q';
        q.innerText = it.question;
        board.appendChild(q);
    },

    modeDone(board, panel, msg) {
        if (board.querySelector('.mode-done')) return;
        const done = document.createElement('div');
        done.className = 'mode-done';
        done.innerText = msg || '🎉 这一步完成！';
        board.appendChild(done);
        const nextBtn = document.createElement('button');
        nextBtn.className = 'comic-btn mode-next';
        nextBtn.innerText = panel.nextText || '继续 ▶';
        nextBtn.onclick = () => this.nextPanel();
        board.appendChild(nextBtn);
    },

    shakeEl(el) {
        if (!el) return;
        el.classList.remove('shake');
        void el.offsetWidth;
        el.classList.add('shake');
    },

    // —— ① 排序：按正确顺序依次点击 ——
    modeSequence(it, board, panel) {
        const steps = it.steps || [];
        this.modeQuestion(it, board);
        const track = document.createElement('div');
        track.className = 'seq-track';
        steps.forEach((_, i) => {
            const slot = document.createElement('div');
            slot.className = 'seq-slot';
            slot.innerHTML = `<b>${i + 1}</b><span>？</span>`;
            track.appendChild(slot);
        });
        board.appendChild(track);
        const pool = document.createElement('div');
        pool.className = 'seq-pool';
        board.appendChild(pool);

        let next = 0;
        steps.map((s, i) => i).sort(() => Math.random() - 0.5).forEach(i => {
            const chip = document.createElement('button');
            chip.className = 'seq-chip';
            chip.innerText = steps[i];
            chip.onclick = (e) => {
                if (chip.classList.contains('done')) return;
                if (i === next) {
                    chip.classList.add('done');
                    const slot = track.children[next];
                    slot.classList.add('filled');
                    slot.innerHTML = `<b>${next + 1}</b><span>${steps[i]}</span>`;
                    this.spawnSpark(e.clientX, e.clientY);
                    next++;
                    if (next === steps.length) {
                        takuEngine.playVoice('顺序完全正确！');
                        this.modeDone(board, panel, it.doneText || '🎉 顺序完全正确！');
                    }
                } else {
                    this.shakeEl(chip);
                    takuEngine.playVoice(it.wrongText || '再想想，这一步还不是时候');
                }
            };
            pool.appendChild(chip);
        });
    },

    // —— ② 配对：点左再点右 ——
    modeMatch(it, board, panel) {
        const pairs = it.pairs || [];
        this.modeQuestion(it, board);
        const wrap = document.createElement('div');
        wrap.className = 'match-cols';
        const left = document.createElement('div'); left.className = 'match-col';
        const right = document.createElement('div'); right.className = 'match-col';
        wrap.appendChild(left); wrap.appendChild(right);
        board.appendChild(wrap);

        let sel = null, done = 0;
        const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);
        shuffle(pairs.map((_, i) => i)).forEach(i => {
            const b = document.createElement('button');
            b.className = 'match-item';
            b.innerText = pairs[i][0];
            b.dataset.k = i;
            b.onclick = () => {
                if (b.classList.contains('done')) return;
                left.querySelectorAll('.match-item').forEach(x => x.classList.remove('sel'));
                b.classList.add('sel');
                sel = b;
                takuEngine.playVoice('好，再点右边它的搭档');
            };
            left.appendChild(b);
        });
        shuffle(pairs.map((_, i) => i)).forEach(i => {
            const b = document.createElement('button');
            b.className = 'match-item';
            b.innerText = pairs[i][1];
            b.dataset.k = i;
            b.onclick = (e) => {
                if (b.classList.contains('done')) return;
                if (!sel) { this.shakeEl(b); takuEngine.playVoice('先点左边选一项哦'); return; }
                if (sel.dataset.k === b.dataset.k) {
                    sel.classList.add('done');
                    sel.classList.remove('sel');
                    b.classList.add('done');
                    sel = null; done++;
                    this.spawnSpark(e.clientX, e.clientY);
                    if (done === pairs.length) {
                        takuEngine.playVoice('全部配对成功！');
                        this.modeDone(board, panel, it.doneText || '🎉 全部配对成功！');
                    }
                } else {
                    this.shakeEl(b);
                    takuEngine.playVoice(it.wrongText || '不是这一对，再试试');
                }
            };
            right.appendChild(b);
        });
    },

    // —— ③ 填空：点词块填进空格 ——
    modeFill(it, board, panel) {
        const seg = it.sentence || [];
        const chips = it.options || [];
        const answers = it.answers || chips;
        this.modeQuestion(it, board);

        const sent = document.createElement('div');
        sent.className = 'fill-sentence';
        const blanks = [];
        seg.forEach(s => {
            const m = /^\{(\d+)\}$/.exec(s);
            if (m) {
                const bl = document.createElement('span');
                bl.className = 'fill-blank';
                bl.dataset.idx = m[1];
                bl.innerText = '？';
                blanks.push(bl);
                sent.appendChild(bl);
            } else {
                const sp = document.createElement('span');
                sp.className = 'fill-text';
                sp.innerText = s;
                sent.appendChild(sp);
            }
        });
        board.appendChild(sent);

        const pool = document.createElement('div');
        pool.className = 'fill-pool';
        chips.map((c, i) => i).sort(() => Math.random() - 0.5).forEach(ci => {
            const b = document.createElement('button');
            b.className = 'fill-chip';
            b.innerText = chips[ci];
            b.dataset.val = chips[ci];
            b.onclick = () => {
                if (b.classList.contains('used')) return;
                const empty = blanks.find(bl => !bl.dataset.val);
                if (!empty) return;
                empty.innerText = chips[ci];
                empty.dataset.val = chips[ci];
                empty.classList.add('filled');
                b.classList.add('used');
                takuEngine.playVoice('填入 ' + chips[ci]);
                this.checkFill(blanks, answers, pool, board, panel);
            };
            pool.appendChild(b);
        });
        board.appendChild(pool);

        // 点击已填的空格可以取回
        blanks.forEach(bl => bl.onclick = () => {
            if (!bl.dataset.val) return;
            const v = bl.dataset.val;
            pool.querySelectorAll('.fill-chip').forEach(c => { if (c.dataset.val === v) c.classList.remove('used'); });
            bl.innerText = '？';
            bl.dataset.val = '';
            bl.classList.remove('filled', 'ok', 'bad');
        });
    },

    checkFill(blanks, answers, pool, board, panel) {
        if (blanks.some(b => !b.dataset.val)) return;
        const ok = blanks.every((b, i) => b.dataset.val === answers[i]);
        if (ok) {
            blanks.forEach(b => b.classList.add('ok'));
            takuEngine.playVoice('拼得完全正确！');
            this.modeDone(board, panel, '🎉 拼写正确！');
        } else {
            blanks.forEach((b, i) => { if (b.dataset.val !== answers[i]) b.classList.add('bad'); });
            takuEngine.playVoice('有几个位置不对，再调整一下');
            setTimeout(() => {
                blanks.forEach((b, i) => {
                    if (b.dataset.val !== answers[i]) {
                        const v = b.dataset.val;
                        pool.querySelectorAll('.fill-chip').forEach(c => { if (c.dataset.val === v) c.classList.remove('used'); });
                        b.innerText = '？';
                        b.dataset.val = '';
                        b.classList.remove('filled', 'bad');
                    }
                });
            }, 800);
        }
    },

    // —— ④ 对比：拨动开关看两种状态 ——
    modeToggle(it, board, panel) {
        const states = it.states || [];
        this.modeQuestion(it, board);
        let cur = 0;
        const seen = new Set([0]);

        const sw = document.createElement('div');
        sw.className = 'toggle-switch';
        sw.innerHTML = `
            <span class="toggle-knob"></span>
            <span class="toggle-opt" data-i="0">${states[0] ? states[0].label : ''}</span>
            <span class="toggle-opt" data-i="1">${states[1] ? states[1].label : ''}</span>
        `;
        board.appendChild(sw);

        const view = document.createElement('div');
        view.className = 'toggle-view';
        board.appendChild(view);

        const prog = document.createElement('div');
        prog.className = 'toggle-seen';
        board.appendChild(prog);

        const render = () => {
            const s = states[cur] || {};
            view.className = 'toggle-view ' + (s.tone || '');
            view.innerHTML = `<div class="tv-metric">${s.metric || ''}</div><div class="tv-time">${s.time || ''}</div><div class="tv-note">${s.note || ''}</div>`;
            sw.classList.toggle('right', cur === 1);
            sw.querySelectorAll('.toggle-opt').forEach(o => o.classList.toggle('active', Number(o.dataset.i) === cur));
            prog.innerText = `已查看 ${seen.size}/${states.length} 种状态`;
        };
        sw.onclick = () => {
            cur = 1 - cur;
            seen.add(cur);
            render();
            takuEngine.playVoice(states[cur] && states[cur].label ? states[cur].label : '');
            if (seen.size === states.length) {
                this.modeDone(board, panel, it.doneText || '🎉 两种状态都看过了！');
            }
        };
        render();
    },

    // —— ⑤ 翻卡：点开看背面 ——
    modeFlip(it, board, panel) {
        const cards = it.cards || [];
        this.modeQuestion(it, board);
        const grid = document.createElement('div');
        grid.className = 'flip-grid';
        let flipped = 0;
        cards.forEach(c => {
            const card = document.createElement('div');
            card.className = 'flip-card';
            card.innerHTML = `
                <div class="flip-inner">
                    <div class="flip-face flip-front">${c.front}</div>
                    <div class="flip-face flip-back">${c.back}</div>
                </div>`;
            card.onclick = (e) => {
                if (card.classList.contains('flipped')) return;
                card.classList.add('flipped');
                flipped++;
                this.spawnSpark(e.clientX, e.clientY, '✨');
                if (flipped === cards.length) {
                    takuEngine.playVoice('全部揭晓，全记住了吗？');
                    this.modeDone(board, panel, it.doneText || '🎉 全部揭晓！');
                }
            };
            grid.appendChild(card);
        });
        board.appendChild(grid);
    },

    // —— ⑥ 侦探：找出所有目标项 ——
    modeFind(it, board, panel) {
        const rows = it.rows || [];
        const targets = rows.filter(r => r.hit).length;
        let found = 0;
        this.modeQuestion(it, board);

        const prog = document.createElement('div');
        prog.className = 'find-prog';
        prog.innerText = `已找到 0/${targets}`;
        board.appendChild(prog);

        const list = document.createElement('div');
        list.className = 'find-list';
        rows.forEach(r => {
            const b = document.createElement('button');
            b.className = 'find-row';
            b.innerText = r.text;
            b.onclick = (e) => {
                if (b.classList.contains('done') || b.classList.contains('miss')) return;
                if (r.hit) {
                    b.classList.add('done');
                    b.innerHTML = `<s>${r.text}</s> <span class="find-badge">✗ 有问题</span>`;
                    found++;
                    prog.innerText = `已找到 ${found}/${targets}`;
                    this.spawnSpark(e.clientX, e.clientY);
                    if (found === targets) {
                        takuEngine.playVoice('全部揪出来了！');
                        this.modeDone(board, panel, it.doneText || '🎉 全部揪出来了！');
                    }
                } else {
                    b.classList.add('miss');
                    this.shakeEl(b);
                    takuEngine.playVoice(it.wrongText || '这一条是合规的，再看看别的');
                    setTimeout(() => b.classList.remove('miss'), 800);
                }
            };
            list.appendChild(b);
        });
        board.appendChild(list);
    },

    // —— ⑦ 抉择：二选一，选错可重试 ——
    modeBranch(it, board, panel) {
        const opts = it.options || [];
        this.modeQuestion(it, board);
        const wrap = document.createElement('div');
        wrap.className = 'branch-options';
        const res = document.createElement('div');
        res.className = 'branch-result';
        board.appendChild(wrap);
        board.appendChild(res);

        let solved = false;
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'branch-opt';
            b.innerHTML = `<div class="bo-label">${o.label}</div>`;
            b.onclick = (e) => {
                if (solved) return;
                res.className = 'branch-result show ' + (o.tone || '');
                res.innerHTML = o.result || '';
                if (o.tone === 'good') {
                    solved = true;
                    wrap.querySelectorAll('.branch-opt').forEach(x => x.disabled = true);
                    this.spawnSpark(e.clientX, e.clientY, '🎉');
                    takuEngine.playVoice('这条路选对了！');
                    this.modeDone(board, panel, it.doneText || '🎉 判断正确！');
                } else {
                    b.classList.add('wrong');
                    takuEngine.playVoice(it.wrongText || '这个选择有风险，换一条试试');
                }
            };
            wrap.appendChild(b);
        });
    },

    // —— ⑧ 分类：点物品再点筐 ——
    modeSort(it, board, panel) {
        const items = it.items || [];
        const buckets = it.buckets || [];
        const answers = it.answers || [];
        this.modeQuestion(it, board);

        const wrap = document.createElement('div');
        wrap.className = 'sort-wrap';
        const pool = document.createElement('div');
        pool.className = 'sort-pool';
        const row = document.createElement('div');
        row.className = 'sort-buckets';
        wrap.appendChild(pool);
        wrap.appendChild(row);
        board.appendChild(wrap);

        let sel = null, done = 0;
        buckets.forEach((name, bi) => {
            const b = document.createElement('div');
            b.className = 'sort-bucket';
            b.innerHTML = `<div class="bucket-name">${name}</div><div class="bucket-items"></div>`;
            b.onclick = (e) => {
                if (!sel) { this.shakeEl(b); takuEngine.playVoice('先点上面选一个物品'); return; }
                const k = Number(sel.dataset.k);
                if (answers[k] === bi) {
                    const chip = sel;
                    chip.classList.remove('sel');
                    chip.classList.add('used');
                    chip.style.position = 'static';
                    chip.style.transform = 'none';
                    b.querySelector('.bucket-items').appendChild(chip);
                    sel = null; done++;
                    this.spawnSpark(e.clientX, e.clientY);
                    if (done === items.length) {
                        takuEngine.playVoice('分类完全正确！');
                        this.modeDone(board, panel, it.doneText || '🎉 分类完全正确！');
                    }
                } else {
                    this.shakeEl(sel);
                    takuEngine.playVoice(it.wrongText || '这个不放这里，再想想');
                }
            };
            row.appendChild(b);
        });

        items.forEach((text, i) => {
            const c = document.createElement('button');
            c.className = 'sort-chip';
            c.innerText = text;
            c.dataset.k = i;
            c.onclick = () => {
                if (c.classList.contains('used')) return;
                pool.querySelectorAll('.sort-chip').forEach(x => x.classList.remove('sel'));
                c.classList.add('sel');
                sel = c;
                takuEngine.playVoice('好，再点下面它该进的筐');
            };
            pool.appendChild(c);
        });
    },

    // —— ⑨ 判断：逐句判定说法对错，判完马上看解释 ——
    modeJudge(it, board, panel) {
        const list = it.statements || [];
        this.modeQuestion(it, board);
        const wrap = document.createElement('div');
        wrap.className = 'judge-list';
        board.appendChild(wrap);

        let locked = 0;
        list.forEach((st, i) => {
            const card = document.createElement('div');
            card.className = 'judge-card';
            card.innerHTML = `
                <div class="judge-text"><b>说法 ${i + 1}</b><span>${st.text}</span></div>
                <div class="judge-btns">
                    <button class="judge-btn yes">✓ 对</button>
                    <button class="judge-btn no">✗ 不对</button>
                </div>
                <div class="judge-why"></div>`;
            const say = (ok) => {
                if (card.classList.contains('locked')) return;
                if (ok === !!st.answer) {
                    // ⚠️ 卡片配色表示【你答对没有】，不是【这句话本身对不对】。
                    //    以前按 st.answer 上色：用户对一句错话正确地点了"不对"，
                    //    卡片反而变成红色 —— 看起来像答错了。句子的真假改由
                    //    下面的解释文字说明（✓ 这句是对的 / ✗ 这句是错的）。
                    card.classList.add('locked', 'is-correct', ok ? 'picked-yes' : 'picked-no');
                    card.querySelectorAll('.judge-btn').forEach(b => b.disabled = true);
                    const why = card.querySelector('.judge-why');
                    // ✓/✗ 说的是【这句话本身】，所以额外标一句"你判对了"，
                    // 免得和绿色的"答对"配色互相打架
                    why.innerHTML = `<b>${st.answer ? '✓ 这句是对的' : '✗ 这句是错的'}</b>`
                        + `<span class="judge-right">—— 你判对了</span>`
                        + `${st.why ? '<br>' + st.why : ''}`;
                    locked++;
                    this.spawnSpark(card.getBoundingClientRect().left + 40, card.getBoundingClientRect().top + 20);
                    if (locked === list.length) {
                        takuEngine.playVoice(it.doneText || '判断全对，看得很准！');
                        this.modeDone(board, panel, it.doneText || '🎉 判断练习完成！');
                    }
                } else {
                    this.shakeEl(card);
                    takuEngine.playVoice(it.wrongText || '再读一遍这句话，换个角度想想');
                }
            };
            card.querySelector('.judge-btn.yes').onclick = () => say(true);
            card.querySelector('.judge-btn.no').onclick = () => say(false);
            wrap.appendChild(card);
        });
    },

    // —— ⑩ 质疑：塔库的这段话里藏了一处错，点出最可疑的那句 ——
    modeChallenge(it, board, panel) {
        const segs = it.segments || [];
        this.modeQuestion(it, board);
        if (it.lead) {
            const lead = document.createElement('div');
            lead.className = 'claim-lead';
            lead.innerText = it.lead;
            board.appendChild(lead);
        }
        const claim = document.createElement('div');
        claim.className = 'claim-box';
        board.appendChild(claim);
        const note = document.createElement('div');
        note.className = 'claim-note';
        board.appendChild(note);

        let solved = false;
        segs.forEach(sg => {
            const span = document.createElement('span');
            span.innerText = sg.text;
            if (sg.check) {
                span.className = 'claim-seg';
                span.title = '点这里质疑';
                span.onclick = () => {
                    if (solved) return;
                    if (sg.wrong) {
                        solved = true;
                        span.classList.add('busted');
                        note.className = 'claim-note busted';
                        note.innerHTML = `<b>🤨 质疑成功！</b>${sg.why || ''}`;
                        takuEngine.playVoice(it.doneText || '质疑得对，就是这里！');
                        this.modeDone(board, panel, it.doneText || '🎉 质疑成功！');
                    } else {
                        this.shakeEl(span);
                        span.classList.add('probed');
                        note.className = 'claim-note';
                        note.innerHTML = `<span>这句其实没毛病：${sg.why || '再看看别处'}</span>`;
                        takuEngine.playVoice(sg.why || it.wrongText || '这句其实没毛病，再看看别处');
                    }
                };
            }
            claim.appendChild(span);
        });
    },

    // —— ⑪ 动手写答案：输入框作答，回车提交 ——
    modeInput(it, board, panel) {
        this.modeQuestion(it, board);
        const row = document.createElement('div');
        row.className = 'input-row';
        const box = document.createElement('input');
        box.className = 'input-box';
        box.type = 'text';
        box.placeholder = it.placeholder || '把答案写在这里…';
        box.spellcheck = false;
        box.autocomplete = 'off';
        const btn = document.createElement('button');
        btn.className = 'input-confirm';
        btn.innerText = '确认';
        row.appendChild(box);
        row.appendChild(btn);
        board.appendChild(row);
        const note = document.createElement('div');
        note.className = 'input-note';
        board.appendChild(note);

        // 归一化：全角→半角、去空格与引号、忽略大小写、去句尾标点
        const norm = s => String(s || '')
            .toLowerCase()
            .replace(/[Ａ-Ｚａ-ｚ０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
            .replace(/\s+/g, '')
            .replace(/[「」『』"'`]/g, '')
            .replace(/[。；;.！!？?]+$/, '');
        const accept = (it.accept || []).map(norm);
        let tries = 0, solved = false;

        const submit = () => {
            if (solved) return;
            const v = box.value;
            if (!norm(v)) { this.shakeEl(box); return; }
            if (accept.includes(norm(v))) {
                solved = true;
                box.classList.add('ok');
                box.disabled = true;
                btn.disabled = true;
                const r = box.getBoundingClientRect();
                this.spawnSpark(r.left + r.width / 2, r.top);
                note.innerHTML = '';
                takuEngine.playVoice(it.doneText || '写对了，就是它！');
                this.modeDone(board, panel, it.doneText || '🎉 答对了！');
            } else {
                tries++;
                this.shakeEl(row);
                box.classList.add('bad');
                setTimeout(() => box.classList.remove('bad'), 600);
                note.innerHTML = (tries >= 2 && it.hint)
                    ? `<span class="input-hint">💡 提示：${it.hint}</span>`
                    : `<span>${it.wrongText || '还差一点，再想想'}</span>`;
                takuEngine.playVoice(tries >= 2 && it.hint ? '给你一点提示' : (it.wrongText || '还差一点，再想想'));
            }
        };
        btn.onclick = submit;
        box.onkeydown = e => { if (e.key === 'Enter') submit(); };
    },

    // —— ⑫ 用自己的话说说：写下理解，对照参考要点 ——
    modeDescribe(it, board, panel) {
        this.modeQuestion(it, board);
        const ta = document.createElement('textarea');
        ta.className = 'describe-box';
        ta.rows = 4;
        ta.placeholder = it.placeholder || '用自己的话写写看，说错了也没关系…';
        board.appendChild(ta);

        const min = it.minChars || 15;
        const meta = document.createElement('div');
        meta.className = 'describe-meta';
        meta.innerHTML = `<span class="describe-count">已写 <b>0</b> 字（至少 ${min} 字）</span>`;
        const btn = document.createElement('button');
        btn.className = 'describe-submit';
        btn.innerText = '写好了';
        meta.appendChild(btn);
        board.appendChild(meta);

        const out = document.createElement('div');
        out.className = 'describe-out';
        board.appendChild(out);

        ta.oninput = () => {
            const b = meta.querySelector('.describe-count b');
            if (b) b.innerText = ta.value.trim().length;
        };
        btn.onclick = () => {
            if (btn.disabled) return;
            const n = ta.value.trim().length;
            if (n < min) {
                this.shakeEl(ta);
                takuEngine.playVoice(`再多写几句，至少 ${min} 个字，把想法说完整`);
                return;
            }
            ta.disabled = true;
            btn.disabled = true;
            const kws = it.keywords || [];
            const hit = [], miss = [];
            kws.forEach(k => (ta.value.includes(k) ? hit : miss).push(k));
            let html = `<div class="describe-ref"><b>📖 参考理解</b><br>${it.reference || ''}</div>`;
            if (kws.length) {
                html += `<div class="describe-kw">`;
                if (hit.length) html += `<span class="kw-hit">✓ 你写到了：${hit.join('、')}</span>`;
                if (miss.length) html += `<span class="kw-miss">💭 还可以想想：${miss.join('、')}</span>`;
                html += `</div>`;
            }
            out.innerHTML = html;
            takuEngine.playVoice(it.doneText || '写完了！对照一下参考理解吧');
            this.modeDone(board, panel, it.doneText || '🎉 能说出来的，才是自己的！');
        };
    },

    // ==================== 🎬 漫画分镜双栏渲染 ====================
    renderScenePanel(panel) {
        const sfx = panel.sfx || '哇!';
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const total = (kp && kp.panels) ? kp.panels.length : 1;
        const dots = Array.from({ length: total }, (_, i) =>
            `<span class="pd-dot${i === this.currentPanelIndex ? ' active' : ''}"></span>`).join('');

        this.stage.innerHTML = `
            <div class="comic-panel lesson-page">
                <div class="panel-topbar">
                    <span class="pt-chapter">${this.currentChapter.title}</span>
                    <span class="pt-kp">EP.${kp ? kp.id : ''} · ${kp ? kp.title : ''}</span>
                    <span class="pt-progress">分镜 ${this.currentPanelIndex + 1}/${total}<span class="pd-dots">${dots}</span></span>
                </div>
                <div class="lesson-layout">
                    <div class="lesson-left" id="lesson-left">
                        <div class="explain-area" id="explain-area"></div>
                        <div class="interaction-area" id="interaction-area"></div>
                        <div class="panel-controls" id="panel-controls"></div>
                    </div>
                    <div class="lesson-right" id="lesson-right">
                        <div class="sfx-tag">${sfx}</div>
                    </div>
                </div>
            </div>
        `;

        // 塔库对话
        if (panel.taku) {
            takuEngine.setEmotion(panel.taku.emotion || "normal");
            const takuText = document.getElementById('taku-text');
            this.typeWriterEffect(panel.taku.dialogue || "", takuText);
            takuEngine.playVoice(panel.taku.dialogue || "");
        }

        const explainArea = document.getElementById('explain-area');
        const interactionArea = document.getElementById('interaction-area');
        const panelControls = document.getElementById('panel-controls');
        const right = document.getElementById('lesson-right');

        // 🖼️ 注入漫画场景 SVG
        const sceneSvg2 = panel.scene ? this.resolveScene(panel.scene) : null;
        if (sceneSvg2) {
            right.insertAdjacentHTML('beforeend', sceneSvg2);
            // 根据场景类型给右侧不同的美术风格
            const sceneStyleMap = {
                scatter: 'scene-messy',      // 散落：米黄桌面
                table: 'scene-clean',        // 表格：纯白
                column: 'scene-clean',
                row: 'scene-clean',
                twins: 'scene-split',        // 对比：左右分色
                idcard: 'scene-night',       // 身份证：深蓝
                bridge: 'scene-sky',         // 桥：天空蓝
                crud: 'scene-grid',          // CRUD：浅灰网格
                telescope: 'scene-space',    // 望远镜：星空
                'sql-anatomy': 'scene-code', // SQL：代码黑
                'index-miss': 'scene-warning',// 索引：警示红
                'tx-states': 'scene-scale',  // 事务：天平
                cap: 'scene-triangle',       // CAP：三角形
                vector: 'scene-vector',      // 向量：紫
                distance: 'scene-vector',
            };
            const cls = sceneStyleMap[panel.scene];
            if (cls) right.classList.add(cls);
        }

        // 上一步
        if (this.currentPanelIndex > 0 && panelControls) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.innerText = '⬅ 上一步';
            prevBtn.onclick = () => this.previousPanel();
            panelControls.appendChild(prevBtn);
        }

        // 左边讲解：漫画气泡 + 塔库头像
        if (panel.explain && explainArea) {
            const el = document.createElement('div');
            el.className = 'bubble';
            el.innerHTML = `
                <img class="bubble-avatar" src="assets/img/taku-anchor.png" alt="塔库">
                <div class="bubble-text">${panel.explain}</div>
            `;
            explainArea.appendChild(el);
        }

        // 右边漫画场景里摆可点道具（均匀摆位，减少重叠）
        if (panel.stage && panel.stage.length > 0) {
            const positions = this.pickStagePositions(panel.stage.length);
            panel.stage.forEach((item, i) => {
                const el = document.createElement('div');
                el.className = item.className || 'scattered-item';
                el.innerText = item.content || '';
                el.style.position = 'absolute';
                el.style.left = positions[i].x + '%';
                el.style.top = positions[i].y + '%';
                el.style.transform = 'translate(-50%, -50%)';
                right.appendChild(el);
            });
        }

        // 若面板声明了显式交互（继续按钮 / 测验 / 点选对象），优先走交互
        if (panel.interaction) {
            this.renderInteraction(panel, interactionArea);
            return;
        }

        // 默认模式：右侧道具点击收集（点一下 → 飞入归位区）
        const clickables = right.querySelectorAll('.scattered-item, .table-header-item, .table-row-item, .crud-item, .pk-item, .fk-item, .log-item, .ai-tool-item, .ref-item');

        // ✅ 修复：纯讲解页（有 scene + explain，但没有舞台道具、没有 interaction）
        //    旧逻辑在这里直接 return，导致该页永远不显示"继续"按钮，学生被卡死。
        //    现在补一个"继续"按钮，保证每一页都有出口。
        if (clickables.length === 0) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'comic-btn';
            nextBtn.innerText = panel.nextText || '继续 ▶';
            nextBtn.onclick = () => this.nextPanel();
            interactionArea.appendChild(nextBtn);
            return;
        }

        const needed = panel.collectCount || clickables.length;
        const zones = this.createDropZones(panel, right);
        let collected = 0;

        const hint = document.createElement('p');
        hint.className = 'instruction-hint collect-hint';
        hint.innerText = '👆 去右边漫画里点一点，让它们归位！';
        interactionArea.appendChild(hint);

        clickables.forEach((el, idx) => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (el.classList.contains('collected')) return;
                el.classList.add('collected');
                collected++;
                this.spawnSpark(e.clientX, e.clientY);

                // 🚀 飞入归位区，落定后变成一张成果卡片
                const zone = zones[idx % zones.length];
                this.flyToZone(el, zone, () => {
                    this.addZoneChip(zone, el.innerText);
                    zones.forEach(z => this.updateZoneCount(z, collected, needed));
                });

                // 气泡反馈
                let old = right.querySelector('.scene-bubble');
                if (old) old.remove();
                const b = document.createElement('div');
                b.className = 'scene-bubble';
                b.innerText = collected >= needed ? '🎉 全部归位！' : `✨ ${collected}/${needed}`;
                right.appendChild(b);
                setTimeout(() => b.remove(), 1200);

                // ✅ 修复：原条件 `!interactionArea.querySelector('.comic-btn')` 会误判——
                //    interactionArea 里只要已存在任何 comic-btn（例如 quiz 残留/多次渲染），
                //    继续按钮就永远不生成，学生收集完也走不了。改为只判断"本页是否已加过继续按钮"。
                if (collected >= needed && !interactionArea.querySelector('.collect-next-btn')) {
                    hint.innerText = '🎉 内容已归位！可以继续了 →';
                    hint.style.background = '#55efc4';
                    zones.forEach(z => z.classList.add('complete'));
                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'comic-btn collect-next-btn';
                    nextBtn.innerText = panel.nextText || '继续 ▶';
                    nextBtn.onclick = () => this.nextPanel();
                    interactionArea.appendChild(nextBtn);
                }
            });
        });
    },

    // ============ 🎯 归位区（drop zone）============
    // 依据面板配置生成归位区；未配置时给默认收集区
    createDropZones(panel, right) {
        const zoneList = [];
        let cfgs = panel.dropZone;
        let isMulti = false;
        if (Array.isArray(cfgs)) {
            isMulti = true;
        } else if (!cfgs) {
            cfgs = [{ x: 52, y: 84, label: '📥 收集区' }];
        } else {
            cfgs = [cfgs];
        }

        cfgs.forEach((zc) => {
            const z = document.createElement('div');
            z.className = 'drop-zone' + (isMulti ? ' mini' : '');
            const pos = this.zonePosition(zc, right);
            z.style.left = pos.x + '%';
            z.style.top = pos.y + '%';
            z.innerHTML = `
                ${zc.label ? `<span class="drop-zone-label">${zc.label}</span>` : ''}
                <span class="drop-zone-chips"></span>
                <span class="drop-zone-count">0/0</span>
            `;
            right.appendChild(z);
            zoneList.push(z);
        });

        // 单区模式时给场景底部预留空间，避免盖住插图
        if (!isMulti) right.classList.add('has-zone');
        return zoneList;
    },

    // 归位区定位：支持面板百分比 (x/y) 或 SVG 视框坐标 (vbx/vby，自动映射)
    zonePosition(cfg, right) {
        if (cfg.vbx != null && cfg.vby != null) {
            const svg = right.querySelector('svg');
            if (svg) {
                const sr = svg.getBoundingClientRect();
                const pr = right.getBoundingClientRect();
                return {
                    x: ((sr.left - pr.left) + (cfg.vbx / 300) * sr.width) / pr.width * 100,
                    y: ((sr.top - pr.top) + (cfg.vby / 350) * sr.height) / pr.height * 100
                };
            }
        }
        return { x: cfg.x != null ? cfg.x : 52, y: cfg.y != null ? cfg.y : 84 };
    },

    // 飞行动画：用固定定位分身从原地飞向归位区，落定后回调
    flyToZone(el, zone, onDone) {
        if (!el) { onDone && onDone(); return; }
        if (!zone) {
            el.remove();
            onDone && onDone();
            return;
        }
        const srcRect = el.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        const clone = el.cloneNode(true);
        clone.classList.remove('collected');
        Object.assign(clone.style, {
            position: 'fixed',
            left: srcRect.left + 'px',
            top: srcRect.top + 'px',
            width: srcRect.width + 'px',
            height: srcRect.height + 'px',
            margin: '0',
            zIndex: '9998',
            pointerEvents: 'none',
            transform: 'translate(0, 0) scale(1)',
            transformOrigin: 'center center',
            transition: 'transform .55s cubic-bezier(.45, -0.2, .6, 1.15), opacity .28s ease .32s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        el.style.visibility = 'hidden';
        document.body.appendChild(clone);

        const dx = (zoneRect.left + zoneRect.width / 2) - (srcRect.left + srcRect.width / 2);
        const dy = (zoneRect.top + zoneRect.height / 2) - (srcRect.top + srcRect.height / 2);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                clone.style.transform = `translate(${dx}px, ${dy}px) scale(.35) rotate(10deg)`;
                clone.style.opacity = '0';
            });
        });

        setTimeout(() => {
            clone.remove();
            el.remove();
            onDone && onDone();
        }, 640);
    },

    // 在归位区里放一张成果卡片
    addZoneChip(zone, text) {
        const box = zone.querySelector('.drop-zone-chips');
        if (!box) return;
        const chip = document.createElement('span');
        chip.className = 'drop-chip';
        chip.innerText = text || '';
        box.appendChild(chip);
        // 芯片变多、区域变高时自动上浮，保证始终完整可见
        const right = document.getElementById('lesson-right');
        if (right && zone.parentElement === right) this.clampZone(zone, right);
    },

    // 把归位区夹在面板可见范围内：底部触界就整体上移
    clampZone(zone, right) {
        const pr = right.getBoundingClientRect();
        const zr = zone.getBoundingClientRect();
        const margin = 6;
        const bottomPx = zr.bottom - pr.top;
        const maxBottom = pr.height - margin;
        if (bottomPx > maxBottom) {
            const shift = bottomPx - maxBottom;
            const centerPx = (zr.top - pr.top) + zr.height / 2;
            const newCenterPct = ((centerPx - shift) / pr.height) * 100;
            zone.style.top = Math.max(newCenterPct, 4) + '%';
        }
    },

    updateZoneCount(zone, n, total) {
        const c = zone.querySelector('.drop-zone-count');
        if (c) c.innerText = `${n}/${total}`;
    },

    // 分镜道具摆位：按数量分布（坐标为面板中心百分比），避免叠在一起
    pickStagePositions(count) {
        const layouts = {
            1: [[50, 46]],
            2: [[30, 28], [62, 62]],
            3: [[26, 16], [62, 38], [32, 68]],
            4: [[26, 14], [64, 22], [24, 54], [62, 62]],
            5: [[22, 12], [60, 10], [22, 40], [60, 38], [42, 70]],
            6: [[22, 10], [62, 16], [24, 38], [64, 44], [22, 68], [62, 72]]
        };
        let base = layouts[count];
        if (!base) {
            // 超出预设数量：双列均匀铺开
            base = [];
            const rows = Math.ceil(count / 2);
            for (let i = 0; i < count; i++) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                base.push([col === 0 ? 24 : 62, 10 + (row * 78) / Math.max(rows - 1, 1)]);
            }
        }
        // 加一点随机抖动，太板正不好看
        return base.map(p => ({
            x: p[0] + (Math.random() * 5 - 2.5),
            y: p[1] + (Math.random() * 5 - 2.5)
        }));
    },

    nextPanel() {
        this.currentPanelIndex++;
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];

        if (this.currentPanelIndex < kp.panels.length) {
            this.renderPanel(kp.panels[this.currentPanelIndex]);
        } else {
            if (kp.reviewQuiz && kp.reviewQuiz.length > 0) {
                this.currentQuizIndex = 0;
                this.startReviewQuiz();
            } else {
                this.finishKnowledgePoint();
            }
        }
    },

    startReviewQuiz() {
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        const quiz = kp.reviewQuiz[this.currentQuizIndex];
        if (!quiz) { this.finishKnowledgePoint(); return; }

        this.stage.innerHTML = `
            <div class="comic-panel quiz-panel">
                <div class="quiz-header">
                    <span class="badge">📝 复盘测验</span>
                    <span class="quiz-counter">第 ${this.currentQuizIndex + 1} / ${kp.reviewQuiz.length} 题</span>
                </div>
                <h2 class="quiz-title">${quiz.question}</h2>
                <div class="interaction-area" id="quiz-options-area"></div>
                <div class="quiz-explanation" id="quiz-explanation" style="display:none;"></div>
            </div>
        `;

        takuEngine.speak("复盘时间到！检验一下学习成果吧。", 3000);
        const optionsArea = document.getElementById('quiz-options-area');

        (quiz.options || []).forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'comic-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                const explanationArea = document.getElementById('quiz-explanation');
                if (index === quiz.answer) {
                    takuEngine.speak("回答正确！", 1500);
                    takuEngine.setEmotion("happy");
                    optionsArea.querySelectorAll('button').forEach(b => b.disabled = true);

                    explanationArea.style.display = 'block';
                    explanationArea.innerHTML = `<strong>✅ 解析：</strong>${quiz.explanation}`;

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'comic-btn';
                    nextBtn.style.marginTop = '15px';
                    nextBtn.innerText = (this.currentQuizIndex + 1 < kp.reviewQuiz.length) ? '下一题 ⏭' : '完成复盘 ✅';
                    nextBtn.onclick = () => {
                        this.currentQuizIndex++;
                        if (this.currentQuizIndex < kp.reviewQuiz.length) this.startReviewQuiz();
                        else this.finishKnowledgePoint();
                    };
                    explanationArea.appendChild(nextBtn);
                } else {
                    takuEngine.speak("回答错误，再仔细想想哦！", 2000);
                    takuEngine.setEmotion("confused");
                    btn.style.background = '#ff6b6b';
                    btn.style.color = '#fff';
                }
            };
            optionsArea.appendChild(btn);
        });
    },

    finishKnowledgePoint() {
        const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
        this.saveProgress(kp.id);
        this.celebrate();

        takuEngine.speak("这一节你已经完全掌握啦！", 3000);
        takuEngine.setEmotion("happy");

        const nextKpIndex = this.currentKpIndex + 1;
        let nextBtnHtml = '';
        if (nextKpIndex < this.currentChapter.knowledgePoints.length) {
            const nextKp = this.currentChapter.knowledgePoints[nextKpIndex];
            nextBtnHtml = `<button class="comic-btn" onclick="comicEngine.startKnowledgePoint(comicEngine.currentChapter, ${nextKpIndex})">学习下一节：${nextKp.id} ⏭</button>`;
        } else {
            nextBtnHtml = `<h3>🎉 恭喜你！本章全部学完！</h3>`;
        }

        this.stage.innerHTML = `
            <div class="comic-panel" style="justify-content: center;">
                <img src="assets/img/taku-anchor.png" class="celebrate-taku" alt="塔库庆祝">
                <h2 style="font-size:2.5rem; color:var(--accent-color);">🎉 本节学完！</h2>
                <p style="margin-top:10px;">复盘测验完成，知识点已巩固！</p>
                <div style="margin-top:30px; display:flex; gap:15px; flex-wrap:wrap; justify-content:center;">
                    ${nextBtnHtml}
                    <button class="comic-btn" style="background:#dfe6e9;" onclick="comicEngine.renderKnowledgePoints(comicEngine.currentChapter)">返回章节目录</button>
                    <button class="comic-btn" style="background:#ff6b6b; color:white;" onclick="comicEngine.goHome()">返回大厅</button>
                </div>
            </div>`;
    },

    previousPanel() {
        if (this.currentPanelIndex > 0) {
            window.speechSynthesis.cancel();
            this.currentPanelIndex--;
            const kp = this.currentChapter.knowledgePoints[this.currentKpIndex];
            this.renderPanel(kp.panels[this.currentPanelIndex]);
            takuEngine.speak("已返回上一步。");
        } else {
            this.renderKnowledgePoints(this.currentChapter);
        }
    },

    startSpecialLog() {
        const specialChapter = textbookData.specialChapter ||
            (textbookData.chapters || []).find(c => c.id === "SP");
        if (specialChapter) {
            if (this.globalHomeBtn) this.globalHomeBtn.style.display = 'block';
            takuEngine.speak("正在打开塔库的后台日志...", 2000);
            this.startChapter(specialChapter);
            // 直接进入 SP-1：它的第一片就是「我的学习记录」，
            // 点一下就能看到自己的真实进度，不用再点一次章节卡。
            // （不加"用户是否已点走"的判断：startChapter 刚跑完，
            //   此刻的 KP 索引状态并不稳定，加了反而会误拦。）
            this.startKnowledgePoint(specialChapter, 0);
        } else {
            takuEngine.speak("后台日志暂时无法读取...", 2000);
        }
    },

    resetProgress() {
        this.completedKps = [];
        this.safeStorageRemove('shuta_progress');
        this.safeStorageRemove('shuta_home_done');
        this.safeStorageRemove('shuta_home_selected');
        this.updateProgressUI();
        takuEngine.speak("学习进度已重置！", 2000);
        takuEngine.setEmotion("confused");
        setTimeout(() => takuEngine.setEmotion("normal"), 1500);
        if (this.currentChapter) {
            this.renderKnowledgePoints(this.currentChapter);
        } else {
            this.renderChapters(textbookData);
        }
    },

    goHome() {
        window.speechSynthesis.cancel();
        if (this.globalHomeBtn) this.globalHomeBtn.style.display = 'none';
        this.currentChapter = null;
        this.currentKpIndex = 0;
        this.currentPanelIndex = 0;
        clearInterval(this.typeWriterTimer);
        takuEngine.speak("已返回大厅！", 2000);
        takuEngine.setEmotion("normal");
        this.renderChapters(textbookData);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    comicEngine.initProgress();
});