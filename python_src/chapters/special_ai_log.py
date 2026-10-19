# 特殊模块：AI辅助与制作人员名单
SPECIAL_AI_LOG = {
    "id": "SP",
    "title": "AI辅助与制作人员名单",
    "knowledgePoints": [
        # ===== SP-1 塔库的诞生：幕后揭秘 =====
        {
            "id": "SP-1",
            "title": "塔库的诞生：幕后揭秘",
            "icon": "🧬",
            "panels": [
                # 放在第一片：一打开「AI 日志」就先看到自己的真实记录，
                # 而不是先读一堆静态叙事（否则很容易以为日志是写死的）
                {
                    "id": 1,
                    "taku": {"emotion": "happy", "dialogue": "欢迎来到数塔的后台！先给你看成绩单——这份记录是现场从你的进度生成的，你学一节它就多一条。"},
                    "liveBoard": "progress", "scene": "sp-credits", "sfx": "成绩单!",
                    "explain": "📋 <strong>我的学习记录（实时）</strong><br>这张表由浏览器<strong>现场生成</strong>：只列出你<strong>已经通关</strong>的知识点，并按章节归拢。<br>没学完的不会出现在这里——所以它永远等于你的真实进度，而不是写死的文案。",
                    "interaction": {"type": "click", "text": "看完，继续 ▶"}
                },
                {
                    "id": 2,
                    "taku": {"emotion": "normal", "dialogue": "成绩单收好，接下来交代一下我是怎么被造出来的。点击查看我的诞生日志！"},
                    "scene": "sp-birth", "sfx": "后台!",
                    "explain": "📜 <strong>幕后日志 · 第 1 条</strong><br>数塔不是「一个网页」，而是三层拼起来的小机器：<br>📄 <strong>数据蓝图</strong>——6 章正文加 1 个 SP 章节、合计 <strong>35 个知识点 / 193 个分镜 / 15 种互动模式</strong>，全部写成 Python 字典；改字、加图、调顺序都发生在这一层。<br>⚙️ <strong>漫画引擎</strong>——<code>comicEngine.js</code> 把字典渲染成分镜：SVG 插画、互动面板、塔库对话都在这里。<br>🗣️ <strong>语音交互</strong>——Web Speech API 让塔库把讲解念出来，<strong>不需要任何音频文件</strong>。<br>👉 把右下角三条日志收进收集区，我们一层层拆开看。",
                    "stage": [
                        {"type": "text", "content": "📄 数据蓝图 (Python)", "className": "log-item"},
                        {"type": "text", "content": "⚙️ 漫画引擎 (JS/CSS)", "className": "log-item"},
                        {"type": "text", "content": "🗣️ 语音交互 (Web Speech API)", "className": "log-item"}
                    ],
                    "interaction": {"type": "click-object", "targetClass": "log-item", "text": "点击阅读幕后日志"},
                    "dropZone": {"label": "🧾 日志收集"}
                },
                {
                    "id": 3,
                    "taku": {"emotion": "happy", "dialogue": "整个项目采用 'Python 编写剧本 -> 自动生成 data.js -> 纯前端单机渲染' 的架构。不需要联网，双击就能运行！先记住流水线，再答我一个文件名。"},
                    "scene": "sp-pipeline", "sfx": "流水线!",
                    "explain": "⚙️ <strong>三段式流水线</strong><br>① <code>python_src/chapters/*.py</code> 写剧本 → ② <code>build_data.py</code> 一键编译成 <code>js/data.js</code> → ③ 浏览器里的 <code>comicEngine.js</code> 把它渲染成漫画页。<br>所以整本书<strong>不用服务器、不用联网</strong>：双击 <code>index.html</code> 就能跑，比赛现场也不怕断网。<br>代价是「改动要重新编译一次」——这是<strong>内容与表现分离</strong>的经典取舍：写内容的人只碰 Python，写引擎的人只碰 JS，两边不会互相踩脚。<br>🧠 考你一个名字：站在 ① 和 ③ 中间、把剧本变成 <code>js/data.js</code> 的那个脚本，叫什么？",
                    "interaction": {"type": "input",
                        "question": "把 Python 剧本一键编译成 js/data.js 的脚本，文件名叫 ______？",
                        "accept": ["build_data.py", "build_data"],
                        "placeholder": "文件名…",
                        "hint": "build + 下划线 + data——它干的正是「建造数据」的活，躺在项目根目录里。",
                        "doneText": "🎉 对，build_data.py！剧本经它编译，浏览器才能读到 js/data.js。"}
                },
                {
                    "id": 4,
                    "taku": {"emotion": "happy", "dialogue": "哔——重点来了！书里这 8 张漫画，其实是从同一张图「生」出来的。看看它们排在一起的样子！"},
                    "scene": "sp-anchor", "sfx": "家族照!",
                    "explain": "🎨 <strong>8 张 AI 漫画，1 个锚点</strong><br>第一步先画<strong>锚点</strong> <code>assets/img/taku-anchor.png</code>（1024×1024）：把塔库的脸、天线、机身配色和线条风格一次性<strong>定死</strong>；<br>第二步<strong>以锚点为参考图</strong>，派生其余 7 张——6 张章节封面 <code>cover-ch1 … cover-ch6</code>（1024×768）和主页主视觉 <code>hero-main</code>（1280×720）。<br>锚点的真正作用是<strong>系列一致性</strong>：后面每一张生成时都「看着」同一张参考图，角色的五官比例、配色和画风才不会一人一个样。<br><div style='display:flex; flex-wrap:wrap; gap:6px; margin:10px 0;'><img src='assets/img/taku-anchor.png' alt='塔库锚点 1024x1024' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch1.png' alt='第1章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch2.png' alt='第2章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch3.png' alt='第3章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch4.png' alt='第4章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch5.png' alt='第5章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch6.png' alt='第6章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/hero-main.png' alt='主页主视觉 1280x720' style='width:64%; border:3px solid #1a1a1a; border-radius:8px;'></div>🧩 <strong>画布里的插画又是另一回事</strong>：分镜里的漫画场景是用 SVG <strong>手写代码</strong>画的（几何图形 + emoji + 粗描边），矢量、能无限放大，还能被互动面板「点」。<br>🗺️ <strong>32 张小节封面</strong>又是第三种来源：它们不是 AI 生成的，而是从作者绘制的《数塔世界》总览路线图里<strong>逐格切分</strong>出来的——自动识别 6 列 × 5~6 行的网格边界，跳过节标题、避开页脚，再统一成 3:1 并补上该章节的底色。AI 在这里只用来写切图脚本，画面本身出自作者之手。",
                    "stage": []
                },
                {
                    "id": 5,
                    "taku": {"emotion": "confused", "dialogue": "考考你——要让 8 张插画里的塔库长得一模一样，第一步该做什么？"},
                    "scene": "sp-birth", "sfx": "想一想!",
                    "stage": [{"type": "text", "content": "🤔 想一想", "className": "magic-effect"}],
                    "explain": "🎯 <strong>锚点先行，是 AI 绘画里最省事的一致性技巧</strong><br>把第一张图当成「角色设定稿」，之后每一张都拿它当参考图（图生图 / 参考图模式），模型就会照着同一张脸继续画。<br>反过来做会怎样？先画 6 张封面、每个封面各自描述一次角色——最后很可能出现 6 个不同的塔库：天线长短不一、配色深浅不同，读者会以为换了个主角。<br>这也是工程上的通用思路：<strong>先定「接口」，再批量生产</strong>。锚点就是这套插画的接口。",
                    "interaction": {"type": "quiz", "question": "❓ 让 8 张插画保持同一个角色形象，第一步该做什么？",
                        "options": ["先画一张『锚点』形象并定稿，之后每张都以它为参考图派生", "每张图都重新描述一次角色，让 AI 自由发挥", "先把 6 张封面画完，最后再补主页主视觉"], "answer": 0}
                },
            ]
        },
        # ===== SP-2 AI 工具用途声明 =====
        {
            "id": "SP-2",
            "title": "AI 工具用途声明",
            "icon": "🤖",
            "panels": [
                {
                    "id": 1,
                    "taku": {"emotion": "normal", "dialogue": "根据比赛要求，我必须诚实交代。在我的编写过程中，AI 工具扮演了重要角色！点击查看具体用途！"},
                    "scene": "sp-tools", "sfx": "工具链!",
                    "explain": "🤖 <strong>诚实声明：AI 参与了哪些环节</strong><br>① <strong>剧情与互动策划</strong>：拟大纲、起章节标题、设计互动面板的点子，AI 出草稿；<br>② <strong>引擎代码</strong>：<code>comicEngine.js</code>、CSS 漫画风格、切图与校验脚本，AI 辅助编写与调试；<br>③ <strong>角色插画（8 张）</strong>：由 AI 图像模型 <strong>Miora</strong> 生成——<code>miora_text_to_image</code> 出锚点、<code>miora_edit_image</code> 派生其余 7 张；<br>④ <strong>分镜漫画（139 张）</strong>：<strong>人工手写 SVG</strong>，不是 AI 生成；<br>⑤ <strong>小节点封面（32 张）</strong>：从作者画的《数塔世界》路线图<strong>切分</strong>而来，也不是 AI 生成；<br>⑥ <strong>语音与音乐</strong>：Web Speech API + Web Audio API 现场合成，不依赖任何音频文件，与 AI 无关。<br>一句话：<strong>AI 负责「快」，人负责「对」</strong>——每一段内容都经过人工核对、改写和实测。",
                    "stage": [
                        {"type": "text", "content": "🤖 剧情与交互策划：AI辅助", "className": "ai-tool-item"},
                        {"type": "text", "content": "💻 引擎代码编写：AI辅助", "className": "ai-tool-item"},
                        {"type": "text", "content": "🎨 卡通UI与漫画风格：AI辅助", "className": "ai-tool-item"}
                    ],
                    "interaction": {"type": "click-object", "targetClass": "ai-tool-item", "text": "点击查看具体使用的工具"},
                    "dropZone": {"label": "🤖 工具清单"}
                },
                {
                    "id": 2,
                    "taku": {"emotion": "happy", "dialogue": "哔——按比赛要求，工具要报实数：大语言模型用的是 DeepSeek，角色插画用的是 Miora；语音和背景音乐不靠 AI，是浏览器现场合成的。清单听完，来辨几句真话假话。"},
                    "scene": "sp-pipeline", "sfx": "技术栈!",
                    "explain": "🧰 <strong>工具清单（按实际使用的写）</strong><br>• <strong>DeepSeek</strong>（大语言模型）：拟大纲、写初稿、代码起草与调试，以及成稿后的<strong>逐条自查与优化</strong>；<br>• <strong>Miora</strong>（AI 图像模型）：8 张角色插画——先用 <code>miora_text_to_image</code> 出<strong>锚点</strong>，再用 <code>miora_edit_image</code> 以锚点为参考派生其余 7 张；<br>• <strong>Web Speech API</strong>：浏览器原生 <code>speechSynthesis</code>，塔库的讲解与提示音全靠它现场合成——<strong>零音频文件、零第三方库</strong>，离线也能说话；<br>• <strong>Web Audio API</strong>：背景音乐按乐谱规则现场合成，同样不占一个字节音频资源；<br>• <strong>sql.js</strong>（开源库，非 AI）：把真正的 SQLite 编译成 WebAssembly，支撑「数塔之家」的动手练习。<br>⚠️ <strong>AI 不署名知识</strong>：文字里的事实、数字、结论都对照官方文档逐条核过（见下一节），AI 只是提效的笔。哔——下面几句话，逐条判对错：",
                    "interaction": {"type": "judge",
                        "question": "下面几句话，分别判断对错：",
                        "statements": [
                           {"text": "塔库的语音由浏览器原生 speechSynthesis 现场合成，不需要任何音频文件。", "answer": True,
                            "why": "Web Speech API 是浏览器自带能力：讲解与提示音现场生成，零音频文件、零第三方库，离线也能说话。"},
                           {"text": "插画和初稿都出自 AI，所以事实内容不必再人工核对了。", "answer": False,
                            "why": "AI 不署名知识：文字里的事实、数字、结论都要对照官方文档逐条核对——AI 负责「快」，人负责「对」，责任始终在人。"},
                           {"text": "8 张角色插画是各自独立生成的，彼此互不参考。", "answer": False,
                            "why": "先画一张「锚点」把塔库的脸、天线、配色、线条风格定死，其余 7 张都以它为参考图派生，才能保持系列一致性。"},
                           {"text": "背景音乐由 Web Audio API 现场合成，不占音频资源。", "answer": True,
                            "why": "和语音同理：旋律按规则现场合成，不依赖任何音频文件——这是整本书「单机可跑」的一部分。"}
                        ]}
                },
                {
                    "id": 3,
                    "taku": {"emotion": "normal", "dialogue": "哔——翻开四张卡，看看每个环节里「AI 做了什么」和「人做了什么」。"},
                    "scene": "sp-tools", "sfx": "翻卡!",
                    "explain": "🃏 <strong>AI 是副驾驶，不是自动驾驶</strong><br>把四个环节摊开看，你会发现人的工作并没有消失，只是从「从零手写」变成了「定标准、做判断、担责任」：<br>选题与结构由人拍板，AI 负责把想法快速铺开成初稿；代码由 AI 起草，人负责跑起来、测出来、改到对；插画由 AI 生成，人负责定锚点、挑选、重画不满意的部分。",
                    "stage": [],
                    "interaction": {"type": "flip", "question": "🃏 翻开四张卡：AI 出了什么力，人守住了什么",
                        "cards": [
                           {"front": "📝 剧情与文案", "back": "AI：按大纲批量出草稿、给标题备选。<br>人：定知识结构、逐句改写、核对数据库术语。"},
                           {"front": "💻 引擎与互动", "back": "AI：写初版 JS/CSS、补边界情况。<br>人：在浏览器里真机跑通、调度分镜节奏、修 bug。"},
                           {"front": "🎨 8 张角色插画", "back": "AI（Miora）：按参考图生成插画。<br>人：定锚点形象、筛选成稿、统一画风。<br>另有 139 张分镜 SVG 与 32 张小节封面<b>并非 AI 生成</b>：前者手写代码，后者从作者路线图切分。"},
                           {"front": "🗣️ 语音与音乐", "back": "AI：辅助写合成参数与旋律规则。<br>人：选音色、调节奏，保证听感不吵。"}
                        ],
                        "doneText": "🎉 谁出力、谁负责，一目了然！"},
                    "nextText": "最后答一题 ▶"
                },
                {
                    "id": 4,
                    "taku": {"emotion": "confused", "dialogue": "考考你——关于 AI 在本项目里的角色，哪种说法最准确？"},
                    "scene": "sp-credits", "sfx": "想一想!",
                    "stage": [{"type": "text", "content": "🤔 想一想", "className": "magic-effect"}],
                    "explain": "✍️ <strong>署名与责任</strong>：工具不会为错误负责，作者才会。所以「用了 AI」从来不是免责声明，反而意味着更严格的校对义务——尤其是数据库这种<strong>版本敏感</strong>的知识：MySQL 8.0.16 前后的 CHECK 约束、InnoDB 的默认隔离级别，差一个字就是错的。",
                    "interaction": {"type": "quiz", "question": "❓ 关于 AI 在本项目里的角色，哪种说法最准确？",
                        "options": ["AI 是提效工具：它出草稿，最终由人审校、测试并定稿，责任在人", "整本书从内容到插画都由 AI 自动生成，没有人工参与", "既然用了 AI，就不必再核对事实和引用来源"], "answer": 0}
                }
            ]
        },
        # ===== SP-3 参考与引用来源 =====
        {
            "id": "SP-3",
            "title": "参考与引用来源",
            "icon": "📚",
            "panels": [
                {
                    "id": 1,
                    "taku": {"emotion": "normal", "dialogue": "为了保证知识的准确性，我也查阅了大量权威资料！点击查看我的参考书架！"},
                    "scene": "sp-refs", "sfx": "书架!",
                    "explain": "📚 <strong>参考书架（第一手来源优先）</strong><br>📘 <strong>MySQL 8.0 官方文档</strong>：隔离级别、MVCC、索引与最左前缀、CHECK 约束的版本差异；<br>📗 <strong>Milvus 官方文档</strong>：collection / partition / index / metric 等向量检索概念；<br>📙 <strong>MDN Web 文档</strong>：DOM、Canvas/SVG、Web Speech API 的用法；<br>📕 <strong>经典教材与开源社区实践</strong>：事务、分布式、缓存与 SQL 优化的通用结论。<br>原则只有一条：<strong>能查官方文档的，就不抄二手博客</strong>。",
                    "stage": [
                        {"type": "text", "content": "📚 MySQL 8.0 官方文档", "className": "ref-item"},
                        {"type": "text", "content": "📚 Milvus 向量数据库文档", "className": "ref-item"},
                        {"type": "text", "content": "📚 MDN Web 开发文档", "className": "ref-item"}
                    ],
                    "interaction": {"type": "click-object", "targetClass": "ref-item", "text": "点击翻阅参考来源"},
                    "dropZone": {"label": "📚 参考书架"}
                },
                {
                    "id": 2,
                    "taku": {"emotion": "happy", "dialogue": "知识来源于官方文档、开源社区和经典教材。数塔只做知识的搬运工和美化师！致谢听完，别急着翻页——先说说你的理解。"},
                    "scene": "sp-credits", "sfx": "致谢!",
                    "explain": "🙏 <strong>致谢</strong><br>感谢 MySQL、Milvus、MDN 等官方文档团队，以及把踩坑经验写下来的开源社区作者——没有这些公开资料，就没有这本小书的严谨性；他们的版本说明与变更日志，更是书里每个「版本坑」的第一手出处。<br>🎬 <strong>制作名单</strong>：策划与剧情（作者 + AI 助手）· 漫画与视觉（8 张 AI 插画 + 手写 SVG）· 代码与引擎（Python + JavaScript）· 语音（Web Speech API 现场合成）。<br>📝 名单不是走过场：把每个环节用了什么工具写清楚，读者才知道哪些结论该重点复核——AI 参与越多的部分，越要写明是怎么核验的，书里每一处结论的可信度仍以官方文档为准；工具会更新换代，可追溯的核验过程才是内容可信的根。如果你发现哪里写错了，欢迎指正：<strong>一本敢写「版本坑」的书，也得敢认自己的错</strong>。<br>🧠 趁热打铁——为什么「版本敏感」的知识要这么较真？不查文档直接信，会栽什么跟头？（提示：想想 8.0.16 前后的差别）说说你的看法：",
                    "interaction": {"type": "describe",
                        "prompt": "用自己的话说说：像「MySQL 8.0.16 起 CHECK 约束才真正生效」这种版本敏感的知识，为什么必须查对应版本的官方文档并动手实测，而不能只信博客或 AI 的回答？",
                        "reference": "版本敏感的知识差一个版本号就可能整句皆错：MySQL 8.0.16 之前 CHECK 约束会被解析但不强制，写「一直生效」就是错的。博客可能过时，AI 给的是「听起来对」；只有对应版本的官方文档加亲手在目标版本上试一次，给到的才是「确实对」。顺带一提：官方文档默认展示最新版，核对历史行为时记得切到对应版本的归档页，再与其他来源交叉验证兜底——这正是本站的核对三连。",
                        "keywords": ["版本", "官方文档", "实测", "交叉验证", "归档"],
                        "minChars": 20}
                },
                {
                    "id": 3,
                    "taku": {"emotion": "normal", "dialogue": "哔——资料那么多，怎么判断哪条能信？来把来源和它的用途配上对。"},
                    "scene": "sp-refs", "sfx": "配对!",
                    "explain": "🔗 <strong>引用规范：来源要对得上问题</strong><br>版本相关的机制问题，只能查对应版本的官方文档；前端 API 的用法查 MDN；向量数据库的概念查 Milvus 文档；跨产品的通用原理再用教材与社区实践交叉验证。<br>点左边一项，再点右边它的搭档。",
                    "stage": [],
                    "interaction": {"type": "match", "question": "🔗 把「资料」和「它最该用来核对什么」配成一对",
                        "pairs": [
                           ["📘 MySQL 8.0 官方文档", "隔离级别、索引最左前缀、CHECK 约束的版本差异"],
                           ["📗 Milvus 官方文档", "collection / partition / index / metric 的定义"],
                           ["📙 MDN Web 文档", "DOM、Canvas/SVG、Web Speech API 的用法"],
                           ["📕 教材与社区实践", "跨产品的通用原理与常见误区的交叉验证"]
                        ],
                        "wrongText": "哔——不是这一对，想想这个来源最权威的范围是什么？",
                        "doneText": "🎉 来源各就各位，引用才站得住！"},
                    "nextText": "最后一题 ▶"
                },
                {
                    "id": 4,
                    "taku": {"emotion": "confused", "dialogue": "考考你——书里写「MySQL 8.0.16 起 CHECK 约束才真正强制生效」，这种细节该怎么核对？"},
                    "scene": "sp-credits", "sfx": "想一想!",
                    "stage": [{"type": "text", "content": "🎓 收尾考", "className": "magic-effect"}],
                    "explain": "🔍 <strong>核对三连</strong>：查对应版本的官方文档 → 在目标版本上亲手试一次 → 与其他来源交叉验证。<br>AI 给的是「听起来对」，文档和实验给的是「确实对」——这两者的差距，就是一本教程靠不靠谱的分界线。<br>🎉 到这里，数塔的全部内容就讲完了：从「数据撒了一地」到「向量检索与 AI 记忆」，希望这座塔你爬得开心！",
                    "interaction": {"type": "quiz", "question": "❓ 书里这种「版本敏感」的细节，最靠谱的核对方式是哪一种？",
                        "options": ["翻对应版本的官方文档，并亲手在目标版本上试一次", "某篇博客这么写，那肯定没错", "直接问 AI，它说的一定对"], "answer": 0}
                }
            ]
        }
    ]
}
