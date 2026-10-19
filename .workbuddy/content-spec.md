# 数塔 · 内容规范（写章节内容前必读）

## 一、文件与结构
- 每章一个文件：\`python_src/chapters/chapterN.py\`，顶层变量 \`CHAPTER_N_DATA\`（第 5 章就是 \`CHAPTER_5_DATA\`）。
- 结构：\`{"id": N, "title": "第N章：…", "knowledgePoints": [ 知识点… ]}\`
- 知识点：\`{"id": "5-1", "title": "…", "icon": "🍰", "panels": [ 分镜… ], "reviewQuiz": [ 复习题… ]}\`
- 复习题：\`{"question", "options": [...], "answer": 正确选项下标, "explanation": "解析"}\`
- **只允许改自己那章的 .py 文件**；不要动 data.js（自动生成）、comicEngine.js、其他章节。

## 二、分镜（panel）字段
\`\`\`python
{"id": 1,                      # 从 1 开始连续
 "taku": {"emotion": "normal", "dialogue": "塔库说的话"},   # emotion ∈ normal|happy|confused
 "scene": "sharding",          # 可选，漫画插画（名字必须已存在于 comicEngine.comicScenes，见第五节）
 "sfx": "开切!",                # 可选，场景面板的拟声字
 "explain": "讲解正文，可用 <strong> <br> <code> 等 HTML",
 "stage": [ {"type": "text", "content": "🔪 文字", "className": "scattered-item"} ],   # 可选
 "dropZone": {"x": 50, "y": 84, "label": "🍰 分片方案"},     # 可选，配合 click-object
 "collectCount": 4, "nextText": "继续 ▶",                    # 可选
 "interaction": { ... }        # 可选，见第三节；不写就是纯讲解页
}
\`\`\`
- \`className\` 只能取：\`scattered-item\`（散落待点）、\`organized-item\`（已归位）、\`table-header-item\`、\`table-row-item\`、\`pk-item\`、\`fk-item\`、\`crud-item\`、\`magic-effect\`（写"🤔 想一想"用）。
- 同时有 \`scene\` 和 \`interaction\` 时，页面是"左边互动板 + 右边漫画插画"的双栏，插画会跟着一起出现——**所以新模式面板尽量都带上本知识点的 scene**。

## 三、互动模式（15 种，字段必须完全按这里写）
| type | 字段 | 说明 |
|---|---|---|
| \`click\` | \`text\` | 只有一个"继续"按钮（**别整节课都用它，它不算互动**） |
| \`click-object\` | \`targetClass\`, \`text\` | 点舞台上的物品，飞进归位区 |
| \`quiz\` | \`question\`, \`options:[…]\`, \`answer: 下标\` | 单选 |
| \`sequence\` | \`question\`, \`steps:[按正确顺序的字符串…]\`(≥3), \`doneText?\`, \`wrongText?\` | 按顺序点击 |
| \`match\` | \`question\`, \`pairs:[[左,右]…]\`(≥3), \`doneText?\`, \`wrongText?\` | 左点一下右点一下配对 |
| \`fill\` | \`question\`, \`sentence:["文本","{0}","文本","{1}"]\`, \`options:[词块…]\`, \`answers:[每个空格的正确值…]\` | 点词块填空；\`{n}\` 是空格，answer 顺序 = 空格顺序 |
| \`toggle\` | \`question\`, \`states:[{label, metric, time, note, tone}×2]\` | 拨开关对比两种状态；\`tone\` 用 \`good\`/\`bad\` |
| \`flip\` | \`question\`, \`cards:[{front, back}…]\`(≥3), \`doneText?\` | 翻卡揭秘 |
| \`find\` | \`question\`, \`rows:[{text, hit:true/false}…]\`(≥4，至少 1 个 hit), \`doneText?\`, \`wrongText?\` | 侦探：揪出有问题的行 |
| \`branch\` | \`question\`, \`options:[{label, result, tone}…]\`(≥2，**有且只有一个 tone="good"**), \`doneText?\`, \`wrongText?\` | 抉择：选错会显示后果并可重试 |
| \`sort\` | \`question\`, \`items:[…]\`, \`buckets:[…]\`, \`answers:[每个 item 的筐下标]\`, \`wrongText?\` | 分类 |
| \`judge\` | \`question\`, \`statements:[{text, answer:true/false, why}…]\`(≥2)，每条都必须写 \`why\` | 判断练习：逐句判定对错，判完马上看解释；建议对错混着出 |
| \`challenge\` | \`question\`, \`lead?\`, \`segments:[{text} 或 {text, check:true, why} 或 {text, check:true, wrong:true, why}…]\`(≥3) | 质疑练习：一段话拆成片段，\`check:true\` 的是可点质疑的可疑段（≥2），**全段有且只有 1 处 \`wrong:true\`**（必须 check+why），没被点破的 check 段也会用 \`why\` 解释"这句为何没错" |
| \`input\` | \`question\`, \`accept:[可接受答案…]\`(≥1), \`placeholder?\`, \`hint?\`, \`doneText?\`, \`wrongText?\` | 手动输入：输入框作答回车提交；比较时忽略大小写/全半角/空格/引号/句尾标点；错 2 次亮出 \`hint\` |
| \`describe\` | \`prompt\`, \`reference\`(参考理解，必填), \`minChars?\`(默认15), \`keywords?:[要点…]\` | 用户描述：用自己的话写理解，写完对照参考理解 + 关键要点；不判对错，是反思型互动 |

## 四、质量红线（校验脚本会逐条检查）
1. **每个知识点 ≥ 5 个分镜**（原来的 3 个太短）。
2. **每个知识点至少用到 2 种不同的"新互动模式"**（上表第 4~15 行那 12 种），且 **模式组合与本书其它知识点不能雷同**——不要每节都是"场景 → 一种模式 → quiz"。quiz 可以留，但它是收尾，不是唯一。
3. **每个知识点正文 ≥ 3200 字符**（JSON 序列化长度，\`explain\` 是主要来源：每页 200~400 字，要讲透，不要一句话打发）。
4. **严谨**：术语、数字、机制必须与真实数据库一致。易错点要主动澄清，例如：
   - Database（数据集合）≠ DBMS（管理软件）；
   - MySQL 默认存储引擎 InnoDB、默认隔离级别 **REPEATABLE READ**（且靠 MVCC + 间隙锁在很大程度上避免了幻读，但**不是**"完全串行化"）；
   - 索引不是越多越好（写放大）、最左前缀、覆盖索引、回表；
   - CAP 是**分区容忍时必须二选一**（P 是前提，不是三选二）；BASE 是最终一致；
   - 2PC 有同步阻塞与协调者单点问题，TCC/Saga/本地消息表各自补偿语义不同；
   - Redis 单线程指**命令执行**单线程（6.0 起 IO 多线程）、RDB 是快照可能丢最后一次、AOF everysec 最多丢 1 秒；
   - 向量：余弦相似度与向量长度无关（模长归一化后 = 内积）、维度灾难、HNSW 是近似检索（召回率 < 100%）、Milvus 的 collection/partition/index/metric 概念。
5. **有趣但不是游戏**：数塔是"动画 + 漫画 + 插画 + 互动 + 文字"一体的教学网站，**禁止游戏化措辞**——全站不说「通关 / 关卡 / 挑战 / 闯关 / 得分 / 战胜」，改说「学完 / 完成 / 练习 / 试一试」；塔库的口吻（"哔——"）、生活化比喻、拟声字 \`sfx\`（"开切!"、"同步中!"）都保留，失败提示要鼓励而不是打击（\`wrongText\`）。
6. **复习题 ≥ 3 题**，每题都要 \`explanation\`，错误选项要设计成"看起来对的常见误解"。

## 五、插画（comicScenes）
- 现有场景名（可直接复用，务必拼写一致）：
  \`scatter, table, twins, idcard, bridge, crud, constraint, index, transaction, acid, viewproc, sqlinject, sqlflow, bufferpool, bptree, clustered, redoundo, mvcc, nosql, redis, cache3, mongodb, rdb, sharding, replication, readwrite, cap, disttx, vector, distance, hnsw, milvus, rag, agentmem, celeb\`
- 同一个知识点的多个分镜**尽量轮换不同的插画**；需要全新插画时，把 SVG 写进 \`.workbuddy/scenes-<你的章节>.js\`（片段形式：\`场景名: \`<svg …</svg>\`,\`），命名用 \`<知识点>-<用途>\`（如 \`sharding-route\`），由外层合并进 comicEngine，**不要自己改 comicEngine.js**。

## 六、写完必须自检
\`\`\`powershell
cd E:\XM\shuta
& '<python>' python_src/build_data.py     # 重新编译（data.js / data/textbook.json）
& '<node>' .workbuddy/verify-content.mjs  # 逐条检查上面所有红线
\`\`\`
必须做到校验脚本输出 **0 个错误**（章节尚未写完时，警告可以留，但错误必须清零）。
