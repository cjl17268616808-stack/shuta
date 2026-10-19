// =======================================================
// ⚠️ 此文件由 Python 自动生成，请勿直接修改！
// =======================================================

const textbookData = {
  "projectName": "数塔",
  "takuWelcome": "哔哔——数据流连接成功！我是你的专属向导塔库！准备好攀登数据库的高塔了吗？",
  "takuIdle": "哔哔——等待指令中...",
  "chapters": [
    {
      "id": 1,
      "title": "第1章：数据库初探",
      "knowledgePoints": [
        {
          "id": "1-1",
          "title": "初识数据库",
          "icon": "📦",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——教室里的数据撒了一地！快帮塔库把5张纸条捡起来！"
              },
              "scene": "scatter",
              "sfx": "混乱!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "📋 整理区"
              },
              "explain": "😵 30 个同学的<strong>学号、姓名、成绩</strong>全写在纸条上随便一扔：老师要找『小明的成绩』得翻半天，改一个分数要重抄一遍，统计平均分要数半小时，两个人同时改还会互相覆盖，最后谁对谁错都说不清，吵起来都没证据。<br>📐 数据一『散』，查找、更新、统计全都变成体力活，而且越用越乱、越乱越不敢改，最后连『这份数据到底准不准』都没人敢保证。<br>🎯 量化一下：30 条数据放进表格里，3 秒就能定位；散着放平均要翻 15 张纸条，数据涨到 3000 条就是 1500 张，工作量直接翻百倍，还没算上抄错、漏抄的风险。<br>👉 先帮塔库把这 5 张纸条一张张捡起来，亲手感受一下『散』到底有多折磨人。<br>🧠 一句话记住：<strong>数据不是不能存，而是不能散着存</strong>。",
              "stage": [
                {
                  "type": "text",
                  "content": "📦 学号",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📦 姓名",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📦 成绩",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📦 小明",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📦 95分",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 5,
              "nextText": "捡完啦，继续 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "完美！散落的信息整齐排进了表格——这就是数据库！哔——趁热打铁，判断几句话的对错！"
              },
              "scene": "table",
              "sfx": "整齐!",
              "explain": "📊 同样是 30 条数据，散着放要翻半天，按<strong>表</strong>组织起来就变得可预期：<br>📌 <strong>列</strong>（学号 / 姓名 / 成绩）说明『存的是什么』，这是结构；<br>📝 <strong>行</strong>（006 ｜ 小红 ｜ 88 分）是一条完整记录，这是内容。<br>🎯 差别有多大？3 列 × 1000 行的学生表，找某人的成绩只需按列定位、<strong>秒级命中</strong>；散着放只能逐张翻找，数据涨到 1 万行也照样秒回，纸张怕是要铺满整间教室。刚才那 6 个部件——3 个表头、3 个格子——就是这么各归各位的。<br>📐 数据库里的数据永远<strong>按行列排列</strong>，这是后面所有知识的地基。<br>🧠 口诀：<strong>列定形状，行存内容</strong>。趁热打铁，判断一下下面几句话的对错！",
              "interaction": {
                "type": "judge",
                "question": "⚖️ 下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "把 30 个同学的资料按『行和列』的表格组织起来，查找、统计才能又快又稳。",
                    "answer": true,
                    "why": "对——列定形状、行存内容：按列定位 3 秒命中；散着放平均要翻 15 张纸条，数据越多越翻不动。"
                  },
                  {
                    "text": "数据只要存下来了就行，散着放和按表格放，用起来没什么区别。",
                    "answer": false,
                    "why": "错——散着放查找要翻半天、改一处要重抄、两人同改还会互相覆盖，最后连数据准不准都没人敢保证；只有按行列组织的表才靠得住。"
                  },
                  {
                    "text": "横向的一行（006 ｜ 小红 ｜ 88 分）只描述了一个属性。",
                    "answer": false,
                    "why": "错——行是一条<strong>完整记录</strong>，把一个实体的学号、姓名、成绩横着排成一条；只描述一类属性的是列。"
                  }
                ]
              },
              "nextText": "我懂了，继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "数据库可不只会『存』！翻开四张卡，看看它的四大本领。"
              },
              "scene": "db-powers",
              "sfx": "四大本领!",
              "explain": "💡 光会存还不够。纸质表格放 3 年就发霉，100 个人同时看要复印 100 份，改一处还得追着所有人重印——所以真正的数据库必须有真本事，不能只是个『文件柜』。<br>📐 先锚定概念：<strong>数据库（Database）= 有组织、可管理、能被多人共享的数据集合</strong>，让它『活』起来的是管理软件 <strong>DBMS</strong>（如 MySQL）。<br>🎯 四大本领：💾 存得住（落盘 + 日志，断电不丢）、🔍 找得快（<strong>索引</strong>让百万行定位到<strong>毫秒级</strong>）、👥 一起用（并发靠锁与隔离）、🛡️ 管得严（权限与约束）。<br>📌 说法澄清：口语把 MySQL 叫『数据库』，严谨说法是 <strong>DBMS</strong>，下一页就把这两个概念分清楚。<br>👉 翻开四张卡，逐一认领这四项本领吧。",
              "interaction": {
                "type": "flip",
                "question": "🃏 点亮每张卡，翻面看数据库的四大本领",
                "cards": [
                  {
                    "front": "💾 存得住",
                    "back": "数据持久化落盘，断电不丢；<br>再配合日志与备份，意外也能恢复。"
                  },
                  {
                    "front": "🔍 找得快",
                    "back": "依靠<strong>索引</strong>，百万行数据也能毫秒级定位，不必逐行翻找。"
                  },
                  {
                    "front": "👥 一起用",
                    "back": "多用户<strong>并发</strong>访问：靠锁与事务隔离，各改各的互不打架。"
                  },
                  {
                    "front": "🛡️ 管得严",
                    "back": "账号<strong>权限</strong>分级、操作审计、数据约束——谁能看、谁能改，由它说了算。"
                  }
                ],
                "doneText": "🎉 四大本领全揭晓！"
              },
              "nextText": "来道题试试 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——四大本领还热乎吧？再考你一个最容易混的点：数据库和管它的软件，分得清吗？"
              },
              "scene": "scatter",
              "sfx": "分个类!",
              "explain": "很多人张口就说『我装了个 MySQL 数据库』——这句话把两个概念黏在了一起，考试和面试都爱在这里挖坑：<br>🗄️ <strong>数据库（Database）</strong>：按一定结构组织起来的数据集合，是『被管理的东西』，比如『一个班级的数据』。<br>⚙️ <strong>DBMS（数据库管理系统）</strong>：MySQL、PostgreSQL、Oracle 这些『负责管数据的软件』，是能安装、能启动、能升级的程序。<br>🎯 一句话分辨：能双击安装、能启动进程的是 DBMS；躺在它里面的那堆表和记录才是数据库。一个 DBMS 实例里可以装很多个库，库下面才是表，别混为一谈。<br>🧠 口诀：<strong>数据库是被管的东西，DBMS 是管东西的软件。</strong><br>👉 把下面的东西，分进正确的筐里！",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 哪些属于『数据库（数据集合）』，哪些属于『DBMS（管理软件）』？",
                "items": [
                  "30 个同学的学号、姓名、成绩这批数据",
                  "MySQL 8.0 这套软件本身",
                  "订单表 + 用户表 组成的那堆业务数据",
                  "PostgreSQL",
                  "SQL Server"
                ],
                "buckets": [
                  "🗄️ 数据库（数据的集合）",
                  "⚙️ DBMS（管数据的软件）"
                ],
                "answers": [
                  0,
                  1,
                  0,
                  1,
                  1
                ],
                "wrongText": "哔——再想想：它是一堆『数据』，还是一个能跑起来的『软件』？"
              },
              "nextText": "分好啦，再较个真 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——补一节『较真时间』：日常口语和教科书说法，有几处不太一样哦。"
              },
              "scene": "db-vs-dbms",
              "sfx": "认一认!",
              "explain": "📌 <strong>较真时间</strong><br>① 口语问『你连的哪个数据库』，严谨说法是<strong>哪台 DBMS 上的哪个库</strong>——一个 MySQL 实例（instance）里可放很多库，库下面才是表。<br>② 按数据模型分：<strong>关系型</strong>（MySQL/PostgreSQL，表和 SQL）与<strong>非关系型 NoSQL</strong>（Redis 键值、MongoDB 文档、Neo4j 图），各管一段场景。<br>③ 为什么不直接用文件？文件缺四样要命的东西：<strong>并发控制</strong>（两人同改互相覆盖）、<strong>事务</strong>（写一半断电就烂）、<strong>索引</strong>（查一个学号读整个文件）、<strong>权限</strong>。<br>④ <strong>SQL</strong> 才是你跟 DBMS 说话的语言，有 ANSI 标准，各家再扩方言——MySQL 的写法搬到 Oracle 常要改。<br>🎯 一句话：<strong>数据库是『东西』，DBMS 是『管家』，SQL 是跟管家说的暗号。</strong>",
              "nextText": "懂了，做题 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "那数据库到底有什么用？考考你！"
              },
              "scene": "db-powers",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 数据库最核心的作用是？",
                "options": [
                  "存数据并方便查找",
                  "画画",
                  "放音乐"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "数据库和单机 Excel 文件最本质的区别是？",
              "options": [
                "数据库支持高效检索、并发访问和权限管理，由数据库软件统一管理",
                "数据库能存更多汉字",
                "没有区别"
              ],
              "answer": 0,
              "explanation": "Excel 是单机文件；数据库是『数据管理系统』：结构化存储、快速检索、多用户并发访问、权限与事务保障——这是 30 个同学的数据『撒一地』和『进系统』的根本差别。"
            },
            {
              "question": "『数据库』里最基础的数据组织单位是？",
              "options": [
                "表（Table）",
                "文件夹",
                "幻灯片"
              ],
              "answer": 0,
              "explanation": "关系型数据库把数据存进『表』：行是一条记录、列是一个属性。多个表通过主外键建立关系，组成一个『数据库』（Database）。"
            },
            {
              "question": "DBMS 和数据库是同一个东西吗？",
              "options": [
                "不是：数据库是『数据集合』，DBMS 是『管理它的软件』（如 MySQL）",
                "是，只是叫法不同",
                "DBMS 是数据库里的一个表"
              ],
              "answer": 0,
              "explanation": "严谨地说：数据库（Database）指数据的集合；DBMS（Database Management System）指管理数据的软件。日常口语里常把 MySQL 直接叫『数据库』，属于约定俗成的简称。"
            }
          ]
        },
        {
          "id": "1-2",
          "title": "表、行、列",
          "icon": "📊",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "欢迎来到第二课！竖着的叫『列』，横着的叫『行』。来做一次分类练习！"
              },
              "scene": "table",
              "sfx": "分一分!",
              "explain": "📊 一张表里，<strong>列（Column / 字段 / 属性）</strong>回答『存的是什么』——学号、姓名、成绩；<strong>行（Row / 记录）</strong>回答『存了谁』——『006｜小红｜88 分』这一整条。<br>🎯 看结构：3 列 × 1000 行 = 3000 个格子。横向切一刀得到一行完整信息（查某个人），纵向切一刀得到一列同类数据（算全班平均分），两种切法回答的是不同问题。<br>📐 所以『成绩』是列，『小红那一整条』才是行——偏偏新手最爱把这两者说反。<br>📌 说『一列成绩』是对的，说『一行成绩』就错了，因为一行里还包含学号和姓名。<br>👉 先点物品，再点它该进的筐。<br>🧠 一条完整信息才是<strong>行</strong>，列只是一类属性。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 哪些是『列』？哪些是『行』？把它们放进正确的筐",
                "items": [
                  "学号",
                  "姓名",
                  "006 ｜ 小红 ｜ 88 分",
                  "成绩",
                  "007 ｜ 小明 ｜ 95 分"
                ],
                "buckets": [
                  "📊 列（属性）",
                  "📝 行（记录）"
                ],
                "answers": [
                  0,
                  0,
                  1,
                  0,
                  1
                ],
                "wrongText": "再想想：一条完整的信息才是『行』哦"
              },
              "nextText": "分类完成，继续 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——先别急着往下走，把术语对准：同一件事，教材里可能有三个名字，别被绕晕。"
              },
              "scene": "table-anatomy",
              "sfx": "对术语!",
              "explain": "📚 <strong>术语对照表</strong><br>• <strong>列</strong> = 字段（Field）= 属性（Attribute）→ 回答『这一类信息是什么』<br>• <strong>行</strong> = 记录（Record）= 元组（Tuple）→ 回答『这一个实体是谁』<br>• <strong>表</strong> = 关系（Relation）→ 关系型数据库的基本存储单位<br>📐 <strong>结构是『定义』出来的</strong>：建表时（<code>CREATE TABLE</code>）就得写清楚有几列、每列叫什么、存什么<strong>数据类型</strong>（学号 VARCHAR、成绩 INT）。列一确定，这张表的『形状』就固定了。<br>🧱 <strong>内容是『塞』进去的</strong>：每执行一次 <code>INSERT</code>，表里就多一行。行数天天在涨，列数却不会自己变——想加列得用 <code>ALTER TABLE</code>。<br>🎯 比喻：<strong>列是货架的格子，行是格子里的货。</strong><br>🧠 为什么要较真术语：文档、代码、面试里三种叫法混着用，把名字对齐，读文档看报错才不费劲。",
              "nextText": "看看数据怎么落表 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "理论够了，来走一遍真流程：一张学生表，是怎么从『无』到『有数据』的？"
              },
              "scene": "table",
              "sfx": "建表中!",
              "explain": "🔢 <strong>顺序错了会当场报错</strong>：表还没建，行没地方放，数据库直接甩你一句『表不存在』；没有数据，<code>SELECT</code> 只能返回空结果；记录不存在，<code>UPDATE</code> 影响 <strong>0 行</strong>。<br>🎯 正确顺序：先立列（形状）→ 再放行（内容）→ 按行取回 → 改动这一行。<br>📐 记住这四步是层层依赖的：<code>CREATE TABLE</code> 定形，<code>INSERT</code> 填内容，<code>SELECT</code> 取数据，<code>UPDATE</code> 改数据。<br>👉 按正确顺序依次点击四步。<br>🧠 口诀：<strong>先建表，再插行，查得到，改得动</strong>。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 按正确顺序，点击『学生表从无到有』的四个步骤",
                "steps": [
                  "CREATE TABLE 学生(学号, 姓名, 成绩) —— 先立好列",
                  "INSERT INTO 学生 VALUES('007','小明',95) —— 再放进一行",
                  "SELECT * FROM 学生 WHERE 学号='007' —— 按行取回记录",
                  "UPDATE 学生 SET 成绩=100 WHERE 学号='007' —— 改动这一行"
                ],
                "wrongText": "哔——顺序不对哦！表都还没建，行往哪儿放？再来一次！",
                "doneText": "🎉 全对！列先定形，行后落座～"
              },
              "nextText": "还有几条规律 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——最后较个真！行和列的规律你都听完了，接下来塔库要说一段话，里面藏了一处错误，点出最可疑的那句！"
              },
              "scene": "null-trap",
              "sfx": "避坑!",
              "explain": "🧭 <strong>三条规律，一次讲透</strong><br>① <strong>列决定『能存什么』</strong>：列是有数据类型的，成绩列里塞 <code>'优秀'</code>，严格模式下会被直接拒绝——类型是第一道门卫。<br>② <strong>行决定『存了谁』</strong>：一行是一个实体的完整描述，少一个属性就少一块信息。<br>③ <strong>行列交叉处只放一个原子值</strong>：一格子里既写手机号又写地址，日后想按手机号查就得切字符串——这就是不规范设计（第一范式要求每格不可再分）。<br>🕳️ 顺便认识 <strong>NULL</strong>：它表示『未知/没填』，<strong>不等于 0 也不等于空字符串</strong>；判断必须用 <code>IS NULL</code>，写 <code>= NULL</code> 永远匹配不到任何行。<br>🧮 量级感：5 列 1000 行的学生表在数据库眼里只是玩具；真实订单表动辄上亿行，同样『按列描述、按行存放』，代价天差地别——所以表结构要一开始就设计对。<br>👉 规律听完了，塔库要说一段『听起来全对』的话，动动手指点出藏错误的那句！",
              "interaction": {
                "type": "challenge",
                "question": "🔎 塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库清了清嗓子，一口气说了下去——",
                "segments": [
                  {
                    "text": "一张表里，列回答『存的是什么』，行回答『存了谁』，"
                  },
                  {
                    "text": "列的个数和类型在建表时就定死了，行数却能一直往上涨，",
                    "check": true,
                    "why": "这句完全正确：形状由 <code>CREATE TABLE</code> 定义，想加列得用 <code>ALTER TABLE</code>；每次 <code>INSERT</code> 加的是行，行数天天涨、列数不会自己变。"
                  },
                  {
                    "text": "而且行列交叉的格子里想塞几样信息都没问题，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：一格只能放一个<strong>不可再分的原子值</strong>。一格又写手机号又写地址，日后按手机号查就得切字符串——第一范式要求每格不可再分。"
                  },
                  {
                    "text": "至于 NULL，它表示『未知』，不等于 0 也不等于空字符串，想找它得用 IS NULL。",
                    "check": true,
                    "why": "这句没错：NULL 不参与普通比较，写 <code>= NULL</code> 永远匹配不到任何行，判断必须用 <code>IS NULL</code>。"
                  }
                ]
              },
              "nextText": "来做题 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——『姓名』是行还是列？"
              },
              "scene": "table-anatomy",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 『姓名』在表格里是？",
                "options": [
                  "一行数据",
                  "一列（字段）",
                  "一张表"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "一张『学生表』里，『007 号同学』这条完整记录在数据库术语里叫什么？",
              "options": [
                "一行（记录 Row）",
                "一列（字段 Column）",
                "一个表"
              ],
              "answer": 0,
              "explanation": "行 = 一条完整记录（一个实体的全部属性）；列 = 字段/属性（一类数据）。『007 号同学』的学号、姓名、成绩横着排成一条，就是一行。"
            },
            {
              "question": "关于『列』的术语，下面哪组是等价的说法？",
              "options": [
                "列 = 字段 = 属性",
                "列 = 行 = 记录",
                "列 = 表 = 库"
              ],
              "answer": 0,
              "explanation": "列（Column）、字段（Field）、属性（Attribute）说的是同一件事：描述数据的某一类特征。行（Row）、记录（Record）、元组（Tuple）则都指一条完整数据。"
            },
            {
              "question": "关于表中『行』和『列』的关系，下列说法正确的是？",
              "options": [
                "列的个数和类型在建表时就定好了，行的条数可以随业务不断增长",
                "行的条数固定，列的个数可以随便加",
                "行和列都由数据库自动决定，不需要设计"
              ],
              "answer": 0,
              "explanation": "建表（CREATE TABLE）确定的是『形状』：有几列、每列叫什么、存什么类型；之后每次 INSERT 增加的是『内容』——行的条数。想改形状要用 ALTER TABLE，而且在大表上加列、改类型往往是重操作，所以表结构要尽量一次设计清楚。"
            }
          ]
        },
        {
          "id": "1-3",
          "title": "主键与外键",
          "icon": "🆔",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——班里有两个『小明』！数据库怎么分清谁是谁？"
              },
              "scene": "twins",
              "sfx": "长得一样!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🔍 对比区"
              },
              "explain": "😱 班里有两个『小明』，成绩 95 和 60——只用名字，你根本分不清要改的是谁：一次误操作就把别人的成绩覆盖了，事后还查不出是谁改的，因为操作日志里记的也只有『小明』两个字，追责都无从下手。<br>🎯 拆开看更直观：4 张纸条（姓名：小明 / 成绩：95 / 姓名：小明 / 成绩：60）能拼出好几种组合，到底哪个 95 属于哪个小明？谁也说不清，程序更说不清，全校统计平均分也会跟着一起算错，而且错了还发现不了。<br>📐 想区分记录，就必须有一个<strong>绝不重复</strong>的标识——这就是<strong>主键</strong>要解决的问题。<br>📌 主键的任务不是描述这条记录，而是唯一地认出它：名字做不到，学号可以。<br>👉 先帮塔库把这 4 张纸条一张张捡起来，对比着看看。",
              "stage": [
                {
                  "type": "text",
                  "content": "姓名：小明",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "成绩：95",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "姓名：小明",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "成绩：60",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "那怎么办？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "既然名字靠不住，就给每条记录发『身份证』。来考考你：哪些字段够格当主键？"
              },
              "scene": "idcard",
              "sfx": "找一找!",
              "explain": "🔍 <strong>主键</strong>的合格标准只有两条：<strong>唯一</strong>（全场不重复）＋ <strong>非空</strong>（必须有值），缺一不可，少一条就会出乱子——比如两条记录抢同一个身份，数据库会直接拒绝写入，报『主键重复』。<br>🎯 对照数据逐条看：学号 007 全班就一个、且必填，能当主键；姓名有 3 个人同名，直接出局；成绩有人同分、还可能缺考为空；邮箱注册时可不填，空值违反非空。<br>📐 一句话锚定：<code>PRIMARY KEY = UNIQUE + NOT NULL</code>，两条同时成立才算数。<br>📌 面试考点：MySQL 的 UNIQUE 列允许出现多个 NULL，主键却一个都不行。<br>👉 点出所有够格当主键的候选字段！",
              "interaction": {
                "type": "find",
                "question": "🔍 从下面的字段里，找出所有『能当主键』的候选",
                "rows": [
                  {
                    "text": "学号（全校唯一，必填）",
                    "hit": true
                  },
                  {
                    "text": "姓名（有 3 个同学同名）",
                    "hit": false
                  },
                  {
                    "text": "身份证号（每人唯一，必填）",
                    "hit": true
                  },
                  {
                    "text": "成绩（可空缺，且多人同分）",
                    "hit": false
                  },
                  {
                    "text": "邮箱（注册时可不填）",
                    "hit": false
                  }
                ],
                "wrongText": "这个字段会重复或可能为空，当不了主键哦"
              },
              "nextText": "还有外键呢 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "而外键呢？它像一座桥，把学生表连到班级表！但如果随便填会怎样？"
              },
              "scene": "bridge",
              "sfx": "桥梁!",
              "explain": "🌉 <strong>外键</strong> = 表与表之间的连接桥梁。<br>🎯 没有它会怎样：学生表的『班级号』随手填个 C9，而班级表里根本没有 C9——这条记录就成了找不到归属的<strong>孤儿记录</strong>，统计班级人数时凭空多出一个班，报表全乱，事后还得靠人工一条条翻查才能揪出来。<br>📐 铁律只有一条：<strong>外键的值必须真实存在于被引用的表里</strong>（或为 NULL），这正是『参照完整性』的含义——关系不能凭空存在，学生也不能属于一个根本不存在的班级。<br>📌 补充：外键列允许为 NULL，代表『暂未归属』——新同学还没分班，归属本身就是未知的，因此不算违规。<br>👉 点一条路线试试，数据库会当场把结果告诉你，非常直观。<br>🧠 外键守的是『关系不能凭空存在』。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 学生表的『班级号』外键，填什么才合法？",
                "options": [
                  {
                    "label": "路线A：填 C9 —— 这个班级并不存在",
                    "tone": "bad",
                    "result": "❌ 插入被数据库<strong>拒绝</strong>！外键约束保证『学生所属的班级必须真实存在』，杜绝『孤儿记录』。"
                  },
                  {
                    "label": "路线B：填 C1 —— 火箭班，班级表里确有此班",
                    "tone": "good",
                    "result": "✅ 通过！学生与班级正确关联——这就是外键守护的<strong>参照完整性</strong>。"
                  }
                ],
                "doneText": "🎉 参照完整性，理解到位！"
              },
              "nextText": "再补几处细节 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——较真时间讲完了！主键外键还有些『考试不考、上岗必踩』的细节。动笔时间到，写个关键字试试！"
              },
              "scene": "idcard",
              "sfx": "划重点!",
              "explain": "📌 <strong>主键的三种常见形态</strong><br>① <strong>自增代理键</strong>：<code>id INT AUTO_INCREMENT PRIMARY KEY</code>——没有业务含义、永不变动，工程上最常用。<br>② <strong>业务主键</strong>：拿学号、身份证号当主键，天然有意义；可一旦业务规则变动（身份证升位、学号重编），就要动全表关联。<br>③ <strong>复合主键</strong>：<code>PRIMARY KEY (学号, 课程号)</code>——单个都不唯一，合起来才唯一，选课表就是经典例子。<br>⚠️ <strong>唯一约束 ≠ 主键</strong>：一张表只能有一个主键，UNIQUE 可以有多个；更关键的是 NULL——主键一个都不许有，而 MySQL 的 UNIQUE 列允许出现<strong>多个 NULL</strong>（NULL 不参与『重复』比较）。<br>🌉 <strong>外键的附加动作</strong>：<code>ON DELETE CASCADE</code>（父删子跟删）、<code>ON DELETE SET NULL</code>（外键置空）、默认 <code>RESTRICT</code>（有子记录就拒绝删）。动手删之前先想『下游怎么办』。<br>👉 动笔时间：『父表删了、子表跟着删』的那条子句，请你亲手把关键字写出来！",
              "interaction": {
                "type": "input",
                "question": "✍️ 「父表删了、子表跟着删」的子句写作 ON DELETE ______？写出空格里的关键字：",
                "accept": [
                  "CASCADE"
                ],
                "placeholder": "往里写…",
                "hint": "意思是『级联』——像瀑布一样，上游一垮，水一路跟着冲下去。就藏在上面外键附加动作那一行里。",
                "doneText": "🎉 对，CASCADE（级联删除）！父删子跟删，下游一起处理。"
              },
              "nextText": "最后一题 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——哪个最适合当学生表主键？"
              },
              "scene": "pk-pick",
              "sfx": "选一选!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 学生表用哪个做主键？",
                "options": [
                  "姓名",
                  "学号",
                  "成绩"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "主键的取值要求是？",
              "options": [
                "必须唯一，且不允许为空",
                "可以重复，只要不为空",
                "允许为空，也允许重复"
              ],
              "answer": 0,
              "explanation": "主键 = 唯一 + 非空（PRIMARY KEY = UNIQUE + NOT NULL）：它是每条记录的唯一标识，绝不重复、绝不缺席。"
            },
            {
              "question": "外键的值有什么要求？",
              "options": [
                "必须是被引用表中真实存在的值（或为 NULL）",
                "可以随便填",
                "必须是数字"
              ],
              "answer": 0,
              "explanation": "外键维护『参照完整性』：学生表的『班级号』必须在班级表里存在。这样就不会出现『小明属于一个不存在的班级』这种孤儿记录。"
            },
            {
              "question": "为什么外键的值允许为 NULL？",
              "options": [
                "表示『暂未归属』——如新同学还没分班，NULL 代表未知，不算违反参照完整性",
                "因为数据库偷懒",
                "NULL 会自动变成 0"
              ],
              "answer": 0,
              "explanation": "NULL 在 SQL 里表示『未知』。参照完整性只要求『已知的值必须真实存在』；未分班的新同学，归属本身就是未知的，所以允许 NULL。"
            },
            {
              "question": "选课表里，同一个学号可以选多门课，同一门课也有多个学号，主键该怎么设计？",
              "options": [
                "把（学号, 课程号）设为复合主键",
                "只把学号设为主键",
                "干脆不要主键，反正数据不多"
              ],
              "answer": 0,
              "explanation": "单独看学号或课程号都会重复，只有『学号 + 课程号』这个组合能唯一标识一条选课记录，这就是复合主键。工程上也常另加一个自增 id 当代理主键，同时给 (学号, 课程号) 加唯一约束——两种做法都能保证唯一性。"
            }
          ]
        },
        {
          "id": "1-4",
          "title": "SQL 语言初探",
          "icon": "🗣️",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "怎么让数据库干活？用 SQL 下命令！点三个关键词听听意思！"
              },
              "scene": "sql-keys",
              "sfx": "三块积木!",
              "stage": [
                {
                  "type": "text",
                  "content": "🗣️ SELECT",
                  "className": "crud-item"
                },
                {
                  "type": "text",
                  "content": "📋 FROM",
                  "className": "crud-item"
                },
                {
                  "type": "text",
                  "content": "🔍 WHERE",
                  "className": "crud-item"
                }
              ],
              "dropZone": {
                "label": "🗣️ SQL 命令区"
              },
              "explain": "🗣️ 想让数据库交出『火箭班成绩大于 90 的同学』。如果只能手工翻表，100 万行数据你准备翻到哪年？翻完还得自己核对，一页看漏就前功尽弃。<br>📐 所以需要一门语言：<strong>SQL</strong>（Structured Query Language，结构化查询语言）就是跟关系型数据库对话的标准语言。<br>🎯 一条最简单的查询只要三个部件：🔍 <code>SELECT</code> 选出哪些列 · 📋 <code>FROM</code> 从哪张表 · 🎯 <code>WHERE</code> 满足什么条件。<br>📌 记住：SQL 是<strong>声明式</strong>语言，你说要什么，数据库决定怎么找。<br>👉 点一点上面三个关键词，把它们收进命令区。<br>🧠 三个词凑齐，你就能向数据库提问了。",
              "interaction": {
                "type": "click-object",
                "targetClass": "crud-item",
                "text": "👆 点一点三个 SQL 关键词，把它们收进命令区"
              }
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "现在轮到你出手！把词块填进空格，拼出一条完整查询。"
              },
              "scene": "sql-declare",
              "sfx": "拼一条!",
              "explain": "📐 SQL 是<strong>声明式</strong>语言：你只描述『要什么』，数据库负责决定『怎么找』——要不要走索引、先扫哪张表、怎么合并结果，全由它自己定，你一句都不用管。<br>🎯 标准语序是 <strong>SELECT → FROM → WHERE</strong>，完整例子：<code>SELECT 姓名 FROM 学生表 WHERE 成绩 &gt;= 90;</code>，读作『从学生表里把成绩 ≥ 90 的行挑出来，只要姓名这一列』。<br>👉 把词块拖进空格，亲手拼出这条查询试试。<br>🧠 口诀：<strong>SELECT 挑列，FROM 定表，WHERE 筛行。</strong><br>💡 注意：这只是写给人看的顺序，数据库真正执行的顺序完全是另一回事，下一页揭晓。",
              "interaction": {
                "type": "fill",
                "question": "🧩 把词块填进空格，拼出『查成绩大于 90 的学生姓名』",
                "sentence": [
                  "SELECT",
                  "{0}",
                  "FROM",
                  "{1}",
                  "WHERE",
                  "{2}",
                  ">= 90;"
                ],
                "options": [
                  "姓名",
                  "学生表",
                  "成绩"
                ],
                "answers": [
                  "姓名",
                  "学生表",
                  "成绩"
                ],
                "doneText": "🎉 SQL 拼写正确！"
              },
              "nextText": "SQL 的全家福 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——SQL 可不是只有 SELECT！翻开四张卡，看看这门语言的全家福。"
              },
              "scene": "sqlflow",
              "sfx": "分类!",
              "explain": "📐 SQL 不只是 <code>SELECT</code>——按『干什么』分成四大类：<br>🏗️ <strong>DDL</strong> 动结构（CREATE / ALTER / DROP / TRUNCATE）<br>✍️ <strong>DML</strong> 动行数据（INSERT / UPDATE / DELETE）<br>🔍 <strong>DQL</strong> 只读查询（SELECT）<br>🔑 <strong>DCL / TCL</strong> 管权限与事务（GRANT / REVOKE、COMMIT / ROLLBACK）<br>🎯 认全分类，看到任何一条命令都能对上号——这也是面试的高频考点。<br>👉 翻开四张卡，看看这门语言的全家福。<br>🧠 口诀：<strong>DDL 动结构，DML 动数据，DQL 只查询，DCL 管权限</strong>。",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开四张卡，认识 SQL 的四大类语句",
                "cards": [
                  {
                    "front": "🏗️ DDL 数据定义",
                    "back": "<strong>CREATE / ALTER / DROP / TRUNCATE</strong><br>动的是<strong>结构</strong>：建表、加列、删表。DDL 执行会<strong>隐式提交</strong>，一旦执行不能简单 ROLLBACK。"
                  },
                  {
                    "front": "✍️ DML 数据操作",
                    "back": "<strong>INSERT / UPDATE / DELETE</strong><br>动的是<strong>行</strong>。它们可以放进事务里，提交前随时能回滚。"
                  },
                  {
                    "front": "🔍 DQL 数据查询",
                    "back": "<strong>SELECT</strong><br>只读不写。不少教材把它并进 DML，说法不同、含义一样，别被绕晕。"
                  },
                  {
                    "front": "🔑 DCL / TCL 控制类",
                    "back": "<strong>GRANT / REVOKE</strong> 管权限，<strong>COMMIT / ROLLBACK / SAVEPOINT</strong> 管事务。<br>谁能看、谁能改，由它们说了算。"
                  }
                ],
                "doneText": "🎉 SQL 全家福，认全了！"
              },
              "nextText": "还有更较真的 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——书上写的顺序，和数据库真正执行的顺序，居然不是一回事？听完合上书，用你自己的话讲一遍！"
              },
              "scene": "sql-anatomy",
              "sfx": "较真!",
              "explain": "📌 <strong>较真时间：书写顺序 ≠ 执行顺序</strong><br>你写的是：<code>SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT</code>。数据库真正干活的顺序却是：<code>FROM</code>（定数据源、做连接）→ <code>WHERE</code>（过滤行）→ <code>GROUP BY</code>（分组）→ <code>HAVING</code>（过滤组）→ <code>SELECT</code>（挑列、算表达式）→ <code>ORDER BY</code>（排序）→ <code>LIMIT</code>（截取）。<br>这解释了两个新手必踩的坑：① <code>WHERE</code> 里为什么不能用 SELECT 起的别名？那时别名还没算出来；而 <code>ORDER BY</code> 在 SELECT 之后执行，所以能用。② 筛聚合结果为什么必须用 <code>HAVING</code>？WHERE 在分组之前就跑完了，那时还没有『组』这个概念。<br>🧾 另外记住：关键字<strong>大小写不敏感</strong>（Linux 上表名区分大小写）；字符串用<strong>单引号</strong>；方言各异——<code>LIMIT</code> 是 MySQL 的写法，Oracle 用 <code>ROWNUM</code>。<br>👉 光看不等于学会了——合上书，用自己的话把这套顺序讲一遍！",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：SQL 的书写顺序和执行顺序为什么不是一回事？WHERE 里为什么用不了 SELECT 起的别名？",
                "reference": "书写顺序是写给人看的：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT；数据库真正干活的顺序是 FROM 定数据源 → WHERE 过滤行 → GROUP BY 分组 → HAVING 过滤组 → SELECT 挑列 → ORDER BY 排序 → LIMIT 截取。WHERE 在 SELECT 之前执行，那时别名还没算出来，所以用不了；ORDER BY 排在 SELECT 之后，所以能用别名。同理，筛聚合结果必须用 HAVING——WHERE 跑完的时候，『组』还不存在。",
                "keywords": [
                  "执行顺序",
                  "过滤",
                  "分组",
                  "别名",
                  "排序"
                ],
                "minChars": 20
              },
              "nextText": "收尾答题 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——查询数据用哪个开头？"
              },
              "scene": "sql-keys",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 查找数据用哪个 SQL 命令？",
                "options": [
                  "DELETE",
                  "SELECT",
                  "DROP"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "下面哪条 SQL 是『查找成绩大于 90 的学生姓名』？",
              "options": [
                "SELECT 姓名 FROM 学生表 WHERE 成绩>90",
                "SELECT 学生表 FROM 姓名",
                "WHERE 成绩>90 SELECT 姓名"
              ],
              "answer": 0,
              "explanation": "标准语序：SELECT 要哪些列 → FROM 哪张表 → WHERE 什么条件。SQL 是声明式语言：你描述『要什么』，数据库决定『怎么找』。"
            },
            {
              "question": "SQL 中 FROM 子句的作用是？",
              "options": [
                "指定数据来自哪张表",
                "过滤条件",
                "对结果排序"
              ],
              "answer": 0,
              "explanation": "FROM 指定数据源（表/视图）；WHERE 负责过滤行；ORDER BY 负责排序。三者配合就是最常用的查询骨架。"
            },
            {
              "question": "下面哪一组 SQL 语句都属于『动结构』的 DDL？",
              "options": [
                "CREATE / ALTER / DROP",
                "INSERT / UPDATE / DELETE",
                "SELECT / COMMIT / GRANT"
              ],
              "answer": 0,
              "explanation": "DDL（数据定义语言）动的是表结构：CREATE 建表、ALTER 改列、DROP 删表；TRUNCATE 也归在 DDL 里（会隐式提交）。INSERT/UPDATE/DELETE 属于 DML，动的是行数据；SELECT 是查询（DQL）；COMMIT 属于事务控制。"
            }
          ]
        },
        {
          "id": "1-5",
          "title": "增删改查（CRUD）",
          "icon": "🎛️",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "数据库操作就四个词：CRUD！把右边四个按钮全点一遍！"
              },
              "scene": "crud",
              "sfx": "CRUD!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🎛️ CRUD 操作台"
              },
              "explain": "➕ Create 新增<br>🔍 Read 查询<br>✏️ Update 修改<br>🗑️ Delete 删除<br>📐 数据库操作看着五花八门，落到根本只有这四件事——日常开发里 <strong>90% 的 SQL</strong> 都逃不出这四类，剩下 10% 多半是权限与事务控制语句，遇到再学不迟。<br>🎯 一条转学生记录的一生正好走完一轮：转学进来（INSERT）→ 班主任按学号查成绩（SELECT）→ 期中考后更正分数（UPDATE）→ 毕业离校归档（DELETE），四步一个不少。<br>📌 面试考点：CRUD 说的是<strong>业务操作</strong>，SQL 语句只是它的实现，两者要能一一对上号，别只背字母。<br>👉 把右边四个按钮全点一遍，先把这套口诀刻进脑子里！",
              "stage": [
                {
                  "type": "text",
                  "content": "➕ Create 新增",
                  "className": "crud-item"
                },
                {
                  "type": "text",
                  "content": "🔍 Read 查询",
                  "className": "crud-item"
                },
                {
                  "type": "text",
                  "content": "✏️ Update 修改",
                  "className": "crud-item"
                },
                {
                  "type": "text",
                  "content": "🗑️ Delete 删除",
                  "className": "crud-item"
                }
              ],
              "collectCount": 4,
              "nextText": "记住口诀 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "口诀：增 C、查 R、改 U、删 D！翻翻卡片，看看每招对应的 SQL。"
              },
              "scene": "crud-sql",
              "sfx": "对号入座!",
              "explain": "📐 四个操作各有自己的 SQL 动词，混了就要闹笑话：<br>➕ 新增 <code>INSERT</code>｜🔍 查询 <code>SELECT</code>｜✏️ 修改 <code>UPDATE</code>｜🗑️ 删除 <code>DELETE</code>。<br>🎯 动手写长这样：<code>UPDATE 学生表 SET 成绩=100 WHERE 学号='007';</code>——<code>WHERE</code> 才决定『改谁』，写漏了就是整张表遭殃，这是新手最惨烈的事故之一。<br>📌 易错点：别把 <code>INSERT</code>（凭空造一行）和 <code>UPDATE</code>（改动已有行）记反。<br>👉 翻开四张卡，把口诀和语句一一对上号，别只背字母。<br>🧠 口诀：<strong>增 C、查 R、改 U、删 D</strong>。",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开四张卡，记住每个操作对应的 SQL 语句",
                "cards": [
                  {
                    "front": "➕ C",
                    "back": "<strong>Create 新增</strong><br>INSERT INTO 学生表 VALUES (…);"
                  },
                  {
                    "front": "🔍 R",
                    "back": "<strong>Read 查询</strong><br>SELECT * FROM 学生表 WHERE 学号='007';"
                  },
                  {
                    "front": "✏️ U",
                    "back": "<strong>Update 修改</strong><br>UPDATE 学生表 SET 成绩=100 WHERE 学号='007';"
                  },
                  {
                    "front": "🗑️ D",
                    "back": "<strong>Delete 删除</strong><br>DELETE FROM 学生表 WHERE 学号='007';"
                  }
                ],
                "doneText": "🎉 四句口诀全记住！"
              },
              "nextText": "看一条记录的一生 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——跟着一位转学生，把这四个操作按人生顺序走一遍！"
              },
              "scene": "crud-pipeline",
              "sfx": "走一遍!",
              "explain": "🔢 顺序错了，故事就不成立：人还没进表，怎么查得到？分数还没改，归档删掉的就是错的，等于白删一条有效记录，还丢了证据。<br>🎯 一条记录的一生：<code>INSERT</code> 插入 → <code>SELECT</code> 查询 → <code>UPDATE</code> 修改 → <code>DELETE</code> 删除，正好把 CRUD 走完一轮。<br>📐 这也是真实业务的时序：先有数据，才有查询和修改，最后才轮到归档删除——顺序反了，整条业务逻辑就崩了。<br>📌 面试考点：CRUD 不是四个孤立的动作，而是同一条数据在不同生命阶段的四种操作。<br>👉 请你按时间顺序，依次点击这四个步骤，试试看。<br>🧠 口诀：<strong>先进表，再查改，最后删</strong>。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 按时间顺序，点击『一位转学生记录』的四个步骤",
                "steps": [
                  "INSERT 插入：转学生小美被录入学生表",
                  "SELECT 查询：班主任按学号查她的成绩",
                  "UPDATE 修改：期中成绩更正为 92",
                  "DELETE 删除：毕业离校，归档后删除这一行"
                ],
                "wrongText": "哔——时间线乱啦！人还没进表，怎么查得到？再来一次！",
                "doneText": "🎉 完美！增 → 查 → 改 → 删，一条记录的一生走完了。"
              },
              "nextText": "最后较个真 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——DELETE 真的把数据删干净了吗？这里有几个反直觉的坑，判断几句话试试！"
              },
              "scene": "delete-family",
              "sfx": "较真!",
              "explain": "📌 <strong>较真时间：删数据的四种『死法』</strong><br>① <code>DELETE FROM 表 WHERE …</code>：按行删，写事务日志、<strong>可以回滚</strong>；占用的空间不一定马上还给操作系统（InnoDB 是标记删除 + 空间复用）。<br>② <strong>DELETE 忘写 WHERE</strong>：整表清空。只要还没提交、日志还在就能回滚，但线上的惊吓是真的——执行前先用同样条件跑一次 <code>SELECT</code> 确认影响范围，是老手的肌肉记忆。<br>③ <code>TRUNCATE TABLE</code>：直接清空、不能加 WHERE、速度极快；MySQL 里它属于 DDL，会<strong>隐式提交</strong>、一般无法回滚，自增计数也重置。<br>④ <code>DROP TABLE</code>：连表结构一起端走，最彻底。<br>🗂️ 还有更温和的<strong>软删除</strong>：只把 <code>is_deleted</code> 标成 1，查询时统一加过滤。好处是可恢复、可审计、外键不断；代价是每条查询都得记得带条件，忘了就会把『已删除』的数据又查出来。<br>👉 这些坑最容易被想当然，判断一下下面几句话的对错！",
              "interaction": {
                "type": "judge",
                "question": "⚖️ 关于删数据，下面几句话分别判断对错：",
                "statements": [
                  {
                    "text": "DELETE 忘了写 WHERE，整张表的行都会被删掉。",
                    "answer": true,
                    "why": "对——WHERE 是行级筛选器，省略它 DELETE 就作用于全表。执行前先用同样条件跑一次 SELECT 确认影响范围，是老手的肌肉记忆。"
                  },
                  {
                    "text": "TRUNCATE TABLE 又快又安全，和 DELETE 一样随时可以回滚。",
                    "answer": false,
                    "why": "错——TRUNCATE 在 MySQL 里属于 DDL，会隐式提交、一般无法回滚，还会重置自增计数；能回滚的是逐行写事务日志的 DELETE。"
                  },
                  {
                    "text": "软删除只把 is_deleted 标成 1，查询时统一加过滤条件，好处是可恢复、可审计、外键不断。",
                    "answer": true,
                    "why": "对——但代价是每条查询都得记得带条件，忘了就会把『已删除』的数据查出来。"
                  }
                ]
              },
              "nextText": "毕业考来了 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——『加一个新同学』属于？"
              },
              "scene": "crud",
              "sfx": "毕业考!",
              "stage": [
                {
                  "type": "text",
                  "content": "🎓 毕业考",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 『添加新同学』是哪个操作？",
                "options": [
                  "Read 查询",
                  "Create 新增",
                  "Delete 删除"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "对应 CRUD 四个操作的 SQL 语句，完全正确的是？",
              "options": [
                "增 INSERT / 查 SELECT / 改 UPDATE / 删 DELETE",
                "增 SELECT / 查 INSERT / 改 DELETE / 删 UPDATE",
                "四个操作都用 SELECT"
              ],
              "answer": 0,
              "explanation": "CRUD = Create（INSERT 插入）、Read（SELECT 查询）、Update（UPDATE 修改）、Delete（DELETE 删除）。这是使用频率最高的四条 SQL 语句。"
            },
            {
              "question": "UPDATE 和 DELETE 语句里，如果忘了写 WHERE 会怎样？",
              "options": [
                "整张表的所有行都会被修改/删除——生产环境的大事故",
                "只会改第一行",
                "数据库会报错拒绝执行"
              ],
              "answer": 0,
              "explanation": "WHERE 是『行级筛选器』。省略它，UPDATE / DELETE 就会作用于全表每一行。运维规范里常说：执行前先用同样的条件跑一次 SELECT 确认影响范围。"
            },
            {
              "question": "MySQL 里 TRUNCATE TABLE 和 DELETE FROM 表（不带 WHERE）的区别，说法正确的是？",
              "options": [
                "TRUNCATE 属于 DDL、速度极快、会隐式提交、一般不能回滚，还会重置自增计数；DELETE 逐行删除、可回滚",
                "两者完全一样，只是写法不同",
                "TRUNCATE 一次只能删一行"
              ],
              "answer": 0,
              "explanation": "TRUNCATE 直接丢弃整张表的数据页，不逐行记录，所以快得离谱；但它是 DDL 语义、会隐式提交，事务里回滚不了，AUTO_INCREMENT 也会被重置。DELETE 属于 DML，逐行删除并写日志，可以放进事务回滚。两者都会让空间暂时留在表空间里，不一定马上归还操作系统。"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "第2章：SQL 与操作",
      "knowledgePoints": [
        {
          "id": "2-1",
          "title": "数据完整性约束",
          "icon": "🛡️",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——有人往'年龄'字段里填了 -5 岁，数据库居然没拦住？这样可不行！"
              },
              "scene": "constraint",
              "sfx": "报警!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🚨 已拦截"
              },
              "explain": "🤔 先想一个场景：如果数据库只负责『把数据塞进去』，会怎样？<br>😱 有人填出『年龄 = -5 岁』，有人<strong>两个学号一模一样</strong>，还有人成绩填了 <code>200</code> 分——数据库照单全收，等哪天报表一出，全是错的，还得人工一条条翻。<br>📐 所以数据库光<strong>存</strong>不行，还得<strong>管</strong>——替数据的正确性把关的那套规则，就叫<strong>约束（CONSTRAINT）</strong>。注意它的关键点是『<strong>由数据库自己执行</strong>』：哪怕程序写漏了、有人直接连数据库改了数据，检查照样跑。<br>🎯 点一点，看看哪些脏数据混进来了，再逐条把它们拦住！<strong>记住：约束是数据库的『底线』，不是程序员的自觉。</strong>",
              "stage": [
                {
                  "type": "text",
                  "content": "😱 年龄 = -5",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "😱 学号 = 空",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "😱 两个一样的学号",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "😱 成绩 = 200 分",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "来修理它们 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "学以致用！这是一份刚导入的学生数据，作为数据侦探，把违规的行都揪出来！"
              },
              "scene": "constraint-check",
              "sfx": "抓脏数据!",
              "explain": "🤔 约束到底长什么样？把它想成建表时雇好的三道安检门——不合规的数据，一条都别想进。<br>📐 对照下面这张检查清单抓人：<br>① 学号 <strong>UNIQUE（唯一）</strong>：不许重复，两个人不能共用一个学号；<br>② 年龄 <strong>CHECK 年龄 &gt;= 0</strong>：填 <code>-5</code> 当场拦下；<br>③ 成绩 <strong>CHECK 0~100</strong>：<code>120</code> 分这种越界值一律拒收。<br>🎯 五行数据里藏着 <strong>3 行违规</strong>，点出来。小提示：第 4 行的学号 <code>012</code> 和第 3 行撞车了——<strong>重复也是违规</strong>，别只盯着明显的负数；判断时逐条对照上面三项，一个都别漏。",
              "interaction": {
                "type": "find",
                "question": "🔍 点出所有违规的数据行（共 3 条）",
                "rows": [
                  {
                    "text": "学号 010 ｜ 年龄 17 ｜ 成绩 88",
                    "hit": false
                  },
                  {
                    "text": "学号 011 ｜ 年龄 -5 ｜ 成绩 90",
                    "hit": true
                  },
                  {
                    "text": "学号 012 ｜ 年龄 16 ｜ 成绩 120",
                    "hit": true
                  },
                  {
                    "text": "学号 012 ｜ 年龄 16 ｜ 成绩 75",
                    "hit": true
                  },
                  {
                    "text": "学号 013 ｜ 年龄 18 ｜ 成绩 66",
                    "hit": false
                  }
                ],
                "wrongText": "这行数据完全合规，再看看别的"
              },
              "nextText": "该上装甲了 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——光会抓贼还不够，得亲手把门卫装上！来拼一条建表语句。"
              },
              "scene": "constraint",
              "sfx": "装门卫!",
              "explain": "🤔 光会抓脏数据还不够，得亲手把安检门装上——写进建表语句，约束才会真正生效。<br>📐 记住四句话，门卫各管一段：<br>🔑 <strong>PRIMARY KEY</strong> 管身份——唯一 <strong>且</strong> 非空，一行一个；<br>🎯 <strong>UNIQUE</strong> 管不重复——邮箱这种『可以不填，填了就得唯一』的字段用它；<br>✅ <strong>NOT NULL</strong> 管不缺值——年龄缺了就没法算；<br>📦 <strong>DEFAULT</strong> 管兜底——不填时自动写 <code>'在读'</code>。<br>🎯 把这四个词块填进空格，给『学生表』装上全套门卫。装完你会发现：<strong>约束是列的属性，写好建表语句，脏数据连门都进不来。</strong>",
              "interaction": {
                "type": "fill",
                "question": "🧩 把约束词块填进空格，给『学生表』装好门卫",
                "sentence": [
                  "给『学号』加上 ",
                  "{0}",
                  "，它就永远唯一且不为空；给『邮箱』加上 ",
                  "{1}",
                  "，可以不填、但填了不许重复；给『年龄』加上 ",
                  "{2}",
                  "，就再也不会出现空缺；给『状态』配上 ",
                  "{3}",
                  "，不填时数据库自动写入『在读』。"
                ],
                "options": [
                  "PRIMARY KEY",
                  "UNIQUE",
                  "NOT NULL",
                  "DEFAULT"
                ],
                "answers": [
                  "PRIMARY KEY",
                  "UNIQUE",
                  "NOT NULL",
                  "DEFAULT"
                ],
                "doneText": "🎉 门卫上岗！脏数据这回想进都进不来。"
              },
              "nextText": "再对一遍清单 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——门卫都装好了！现在换我背一遍『门卫职责清单』，听听我背得对不对。"
              },
              "scene": "constraint-list",
              "sfx": "来挑刺!",
              "explain": "🧠 把五把锁一次记牢，每一把对应它挡下的事故——<br>🛡️ <strong>NOT NULL</strong> 非空：这一格必须有值，写成 <code>age INT NOT NULL</code>；<br>🎯 <strong>UNIQUE</strong> 唯一：不许重复（注意 MySQL 里<strong>多个 NULL 不算重复</strong>），邮箱列就该用它；<br>✅ <strong>CHECK</strong> 检查：满足条件才放行，例如 <code>CHECK (age &gt;= 0)</code>；<br>📦 <strong>DEFAULT</strong> 默认：不填时自动写 <code>'active'</code>，写成 <code>status DEFAULT 'active'</code>；<br>🔑 <strong>PRIMARY KEY</strong> 主键 = 唯一 + 非空，一行一个身份；外键则守着表与表之间的参照完整性——引用的行必须真实存在。<br>🎯 一句话小结：<strong>约束是『列的属性』，写好建表语句，脏数据根本进不来。</strong>清单背完不算数——塔库现在要凭记忆复述一遍，他自信满满，其实混进了一处错误，用你的火眼金睛把它点破！",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库清了清嗓子，背起了门卫职责清单——",
                "segments": [
                  {
                    "text": "建表的时候，给学号加上主键，"
                  },
                  {
                    "text": "主键就能保证这一列不重复也不为空，",
                    "check": true,
                    "why": "这句完全正确：主键 = 唯一 + 非空，相当于 UNIQUE 和 NOT NULL 的合体。"
                  },
                  {
                    "text": "邮箱列加了唯一约束之后，连不填都不允许，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：UNIQUE 允许不填——MySQL 里多个 NULL 也不算重复；『可以不填，填了就必须唯一』才是唯一约束的真实行为，把它和 NOT NULL 混为一谈是最常见的误解。"
                  },
                  {
                    "text": "而外键则保证你填的班级号，在班级表里真实存在。",
                    "check": true,
                    "why": "这句也没错：外键维护参照完整性，引用的行必须真实存在（或者干脆留空），孤儿记录进不来。"
                  }
                ]
              }
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——较真时间：约束其实还分『门派』，而且藏着一个版本大坑。"
              },
              "scene": "integrity-four",
              "sfx": "较真!",
              "explain": "📌 <strong>较真时间：约束其实还分『门派』</strong><br>① <strong>实体完整性</strong>：每一行都要能被唯一认出来 → 主键（唯一 + 非空）。<br>② <strong>参照完整性</strong>：外键指向的那一行必须真实存在 → 外键约束，杜绝『孤儿记录』。<br>③ <strong>域完整性</strong>：单个字段取值范围合法 → 数据类型、NOT NULL、CHECK、DEFAULT。<br>④ <strong>用户定义完整性</strong>：业务规则，比如『下单时间不能晚于发货时间』，通常放应用层或触发器。<br>⚠️ <strong>版本大坑（面试常考）</strong>：MySQL 8.0.16 之前<strong>能写</strong> <code>CHECK (age &gt;= 0)</code>，却只做语法解析、<strong>根本不校验</strong>；8.0.16 起才真强制执行。看到老项目里的 CHECK 别急着信，先确认版本。<br>🧹 <strong>约束不是万能的</strong>：它管得住数据库自己就能判断的规则，管不住跨系统业务规则（如『同一身份证一天最多注册 3 次』）——正确姿势是<strong>数据库约束兜底 + 应用层校验前置</strong>。<br>🧠 一句话：<strong>四类完整性 = 认得出（主键）、指得准（外键）、写得对（域）、合业务（用户定义）。</strong>",
              "nextText": "最后一题 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——email 字段'可以不填，但填了就不许重复'，用哪个约束？"
              },
              "scene": "constraint-list",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ '允许为空，但填了不能重复'——用哪个约束？",
                "options": [
                  "NOT NULL 非空约束",
                  "UNIQUE 唯一约束",
                  "CHECK 检查约束"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "主键约束（PRIMARY KEY）相当于哪两个约束的组合？",
              "options": [
                "UNIQUE + NOT NULL",
                "CHECK + DEFAULT",
                "UNIQUE + CHECK"
              ],
              "answer": 0,
              "explanation": "主键必须同时满足'唯一'和'非空'。细节：UNIQUE 约束在 MySQL 中允许多个 NULL（空不着算重复），而主键一个 NULL 都不允许。"
            },
            {
              "question": "外键约束（FOREIGN KEY）的作用是？",
              "options": [
                "保证引用关系有效：外键值必须存在于被引用表中（或为 NULL）",
                "让查询自动变快",
                "自动备份数据"
              ],
              "answer": 0,
              "explanation": "外键维护'参照完整性'：学生表的'班级号'必须是班级表里真实存在的班级，杜绝'孤儿记录'。它保证的是正确性，不负责提速。"
            },
            {
              "question": "关于 MySQL 的 CHECK 约束，下列说法正确的是？",
              "options": [
                "MySQL 8.0.16 起才真正强制执行；更早的版本会解析但忽略它",
                "从 MySQL 5.0 起一直强制执行",
                "MySQL 不支持 CHECK 语法"
              ],
              "answer": 0,
              "explanation": "严谨冷知识：MySQL 8.0.16 之前的版本可以写 CHECK，但只做语法解析、不做实际校验（依赖应用层兜底）。8.0.16+ 才真正强制。这也是选型时容易踩的'看似有用实则没生效'的坑。"
            }
          ]
        },
        {
          "id": "2-2",
          "title": "索引：为什么查得快",
          "icon": "🔖",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "这是一本 3000 页的《数据大百科》，帮我找第 2132 页的内容——你怎么找？"
              },
              "scene": "index",
              "sfx": "翻书!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🔖 找书区"
              },
              "explain": "🤔 先做个思想实验：一本 3000 页的《数据大百科》，要你找第 2132 页的内容，你怎么找？<br>📐 两种命运——<br>① <strong>一页页往前翻</strong>：第 1 页…第 2 页…第 3 页，运气差要翻 2000 多次，这就是 <strong>全表扫描</strong>，代价 <code>O(n)</code>，数据量翻倍、耗时也翻倍；<br>② <strong>翻书末的目录，直奔 2132</strong>：一步到位，这就是 <strong>索引查找</strong>。<br>🎯 索引就是数据库的『目录』——为某一列单独存一份<strong>排好序</strong>的结构。查数据时先查目录、再跳过去取，自然快得多。<strong>代价是这份目录要额外占地方，写数据时还得跟着改。</strong>点一点，亲手体验这两种找法的差距到底有多大。",
              "stage": [
                {
                  "type": "text",
                  "content": "📖 翻到第 1 页…没找到",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📖 翻到第 2 页…没找到",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📖 翻到第 3 页…没找到",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔖 目录：直达第 2132 页！",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "索引真香 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "光说不够震撼！来亲手拨一下开关，看看同一张 500 万行的表，两种命运。"
              },
              "scene": "index-speed",
              "sfx": "对比!",
              "explain": "🤔 『有索引快』到底能快多少？别背结论，自己拨开关看数字。<br>📐 同一个查询 <code>SELECT * FROM users WHERE id = 100</code>，跑在 <strong>500 万行</strong>的 <code>users</code> 表上，走的路完全不同：<br>❌ 无索引 → 每一行都读出来比对，磁盘 IO 拉满；<br>✅ 有索引 → B+ 树三层，几次 IO 直达目标行。<br>🎯 来回拨一拨：<strong>5,000,000 行 ≈ 4.2 秒</strong>对 <strong>3 个数据页 ≈ 0.003 秒</strong>——差了 <strong>1000 多倍</strong>。数据量再翻十倍，这个差距只会更夸张：扫描是线性增长，B+ 树几乎是平的。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 拨动开关，对比『无索引』和『有索引』的查询代价",
                "states": [
                  {
                    "label": "❌ 关闭索引",
                    "metric": "逐行扫描 5,000,000 行",
                    "time": "≈ 4.2 秒",
                    "note": "全表扫描：每一行都要读出来比对，磁盘 IO 拉满",
                    "tone": "bad"
                  },
                  {
                    "label": "✅ 开启索引",
                    "metric": "读取 3 个数据页",
                    "time": "≈ 0.003 秒",
                    "note": "B+ 树 3 次 IO 直达目标行——快了 1000 多倍",
                    "tone": "good"
                  }
                ],
                "doneText": "🎉 天壤之别，亲眼看过了！"
              },
              "nextText": "但索引也有脾气 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——索引不是万能护身符！有些写法会让它当场罢工。"
              },
              "scene": "index-miss",
              "sfx": "失效!",
              "explain": "🤔 索引也不是万能护身符：条件写得不对，它当场罢工，查询悄悄退回全表扫描——而且<strong>不报错</strong>，最容易被忽略。<br>📐 假设 <code>users</code> 表在 <code>name</code>、<code>phone</code>、<code>created_at</code>、<code>age</code> 上都建了索引。核心原理只有一条：<strong>索引按『列的原值』排好序；一旦你对列做了函数或运算，有序性就用不上了</strong>，只能逐行算完再比。同理，<code>LIKE '%小明'</code> 这种前导百分号也等于『没有前缀可用』。<br>🎯 点出所有会退化成全表扫描的写法（共 <strong>4 条</strong>），别手软！",
              "interaction": {
                "type": "find",
                "question": "🔍 揪出会让索引失效的查询写法（共 4 条）",
                "rows": [
                  {
                    "text": "WHERE id = 100（主键等值查找）",
                    "hit": false
                  },
                  {
                    "text": "WHERE name LIKE '%小明'（前导百分号）",
                    "hit": true
                  },
                  {
                    "text": "WHERE YEAR(created_at) = 2024（对索引列用函数）",
                    "hit": true
                  },
                  {
                    "text": "WHERE phone = '13800000000'（字符串等值比较）",
                    "hit": false
                  },
                  {
                    "text": "WHERE age + 1 = 18（列参与算术运算）",
                    "hit": true
                  },
                  {
                    "text": "索引是 (name, status)，却只写 WHERE status = 1（跳过最左列）",
                    "hit": true
                  }
                ],
                "wrongText": "哔——这条其实走得了索引哦！再仔细看看条件对列做了什么"
              },
              "nextText": "为什么会这样？▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——较真时间：索引这颗『银弹』，内部结构其实很有讲究。"
              },
              "scene": "bptree",
              "sfx": "拆开看!",
              "explain": "🧠 <strong>较真时间：这颗『银弹』内部很有讲究</strong><br>🌳 <strong>为什么用 B+ 树</strong>：它是<strong>矮胖</strong>的多路平衡树——三层左右就能覆盖上千万行，一次查找几次磁盘 IO；叶子节点间用链表相连，<code>BETWEEN</code> 这类范围查询能顺链表扫。<br>📚 <strong>聚簇索引 vs 二级索引</strong>：InnoDB 的主键索引就是<strong>聚簇索引</strong>（叶子节点存整行，一张表只有一棵）；其它都是<strong>二级索引</strong>，叶子里存『索引列 + 主键值』。<br>🔁 <strong>回表</strong>：用二级索引查 <code>SELECT *</code>，要先拿到主键、再回聚簇索引取整行——这两步合称回表。<br>🎯 <strong>覆盖索引</strong>：查询要的列全在索引里（比如只查 <code>name</code>）就不用回表，直接被索引喂饱。<br>📐 <strong>最左前缀</strong>：复合索引 <code>(a,b,c)</code> 像先按 a、再按 b、再按 c 排的电话簿，必须<strong>从最左连续匹配</strong>，只写 <code>b = 1</code> 用不上。<br>🧠 口诀：<strong>树矮胖、二级索引回表、覆盖免回表、复合索引守最左；验不验，看 EXPLAIN。</strong>",
              "nextText": "回到权衡 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——回到权衡：天下没有免费的午餐，索引的代价我来算笔账，算完你再亲手补全一条建索引语句！"
              },
              "scene": "index-cost",
              "sfx": "算笔账!",
              "explain": "⚖️ 天下没有免费的午餐：索引把查询从 <code>O(n)</code> 拉成 <code>O(log n)</code>，这笔钱从哪来？<br>📐 索引 = 把列值<strong>排好序另存一份</strong>（B+ 树），查询时先查目录再取数据；没有索引，就只能逐行扫描 O(n) 硬扛。代价有两处——<br>💾 <strong>空间</strong>：每个索引都额外占磁盘，大字段的索引动辄几 GB；<br>✍️ <strong>写入</strong>：每次 INSERT / UPDATE / DELETE 都要同步维护每一棵索引树，写变慢，这叫<strong>写放大</strong>。<br>🎯 所以只给<strong>高频查询、连接、排序</strong>用到的列建索引，写法是 <code>CREATE INDEX 索引名 ON 表名(列名)</code>；性别、状态这种只有两三个值的列选择性太差，建了往往不划算。<strong>索引不是越多越好，够用就行。</strong>光看不练假把式——下面这条语句想给 email 列建一个『不许重复』的索引，缺了个关键字，你来补上！",
              "interaction": {
                "type": "input",
                "question": "给 users 表的 email 列建一个『不许重复』的索引，补全关键字：CREATE __________ idx_email ON users(email);",
                "accept": [
                  "UNIQUE INDEX",
                  "UNIQUE"
                ],
                "placeholder": "一个或两个单词…",
                "hint": "它要同时说清两件事：这列不许重复 + 这是一个索引。先写声明唯一的词，再写声明索引的词——只写声明唯一的那一个词也算对。",
                "doneText": "🎉 对，UNIQUE INDEX！既建了索引，又顺手声明了唯一，一步到位。"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——给'手机号'加了索引后，哪个操作反而变慢了？"
              },
              "scene": "index",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 加索引后，哪个操作会变慢？",
                "options": [
                  "按手机号查用户",
                  "插入新用户",
                  "WHERE 手机号=xxx 查询"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "索引本质上是什么？",
              "options": [
                "一份独立的、有序的'数据目录'，存储在磁盘上",
                "数据被复制到内存里",
                "一种视图"
              ],
              "answer": 0,
              "explanation": "索引是额外的数据结构（InnoDB 用 B+ 树组织）。它不改变原表数据，但占用空间，且写入时要同步维护——这正是'空间和写入速度'换'查询速度'。"
            },
            {
              "question": "为什么不能给每一列都加索引？",
              "options": [
                "会占大量空间、拖慢写入，还增加优化器选择成本",
                "数据库最多只支持 3 个索引",
                "索引会让查询变慢"
              ],
              "answer": 0,
              "explanation": "每多一个索引，每次 INSERT / UPDATE / DELETE 都要多维护一份。索引不是越多越好，通常只给高频查询条件、连接字段、排序字段建索引。"
            },
            {
              "question": "在 users 表的 name 列上建了索引，执行 SELECT name FROM users WHERE name = '小明'，这次查询最可能怎样？",
              "options": [
                "只读索引就够了（覆盖索引），不必回表取整行",
                "一定要回表两次",
                "数据库会拒绝执行这种查询"
              ],
              "answer": 0,
              "explanation": "查询要的列（name）全都长在这棵索引上，B+ 树的叶子节点就能给出答案，省掉了『拿主键回聚簇索引取整行』的回表步骤——这就是覆盖索引。把 SELECT name 换成 SELECT *，通常就得回表了。"
            }
          ]
        },
        {
          "id": "2-3",
          "title": "事务：要么全成功，要么全失败",
          "icon": "⚖️",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "紧急警报！转账执行到一半，机房断电了——A 账户已经扣了 100 块！"
              },
              "scene": "transaction",
              "sfx": "断电!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "⚖️ 事务核对"
              },
              "explain": "🤔 先想一个真问题：转账在数据库里其实是<strong>两条 SQL</strong>，而这两条之间隔着一个真实的断电窗口。<br>📐 A 账户 <code>-100</code>、B 账户 <code>+100</code>。如果只执行成功了前一条就断电——账面对不上：这 100 块既不在 A 也不在 B，<strong>凭空消失</strong>；反过来先加后减，就是凭空多出来。总账永远差 100，对账的人查到天亮也查不出。<br>🎯 点一点看看现场：哪些操作已经落地，哪些还没发生？<strong>数据库该怎么把这一半的改动收回去？</strong>这正是『事务』要解决的核心问题——<strong>要么一起成功，要么一起作废，绝不允许只做一半。</strong>点一点，看看现场到底缺了哪一步。",
              "stage": [
                {
                  "type": "text",
                  "content": "💸 A 账户 -100 ✅ 已执行",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "💰 B 账户 +100 ❌ 没执行",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 2,
              "nextText": "数据库怎么救？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——解药登场：事务！四个特性我先讲一遍，讲完换你用自己的话说说看。"
              },
              "scene": "acid",
              "sfx": "ACID!",
              "explain": "🧠 <strong>事务（TRANSACTION）</strong> = 一组操作<strong>同生共死</strong>：要么全做成，要么全部撤销。一次转账事务的完整流程：<code>BEGIN</code> 开始 → <code>SQL：A 账户 -100</code> → <code>SQL：B 账户 +100</code> → <code>COMMIT</code> 提交，中途任何一步出错，就整体回滚。四个字母各管一段——<br>⚛️ <strong>原子性 Atomicity</strong>：全做或全不做，靠 <strong>undo 日志</strong>把已做的改回去；<br>🧩 <strong>一致性 Consistency</strong>：事务前后约束始终成立，账不能凭空多也不能少；<br>🚪 <strong>隔离性 Isolation</strong>：并发事务互不干扰，靠锁 + MVCC 实现；<br>🪨 <strong>持久性 Durability</strong>：一旦 <code>COMMIT</code>，随后断电也不丢，靠 <strong>redo 日志</strong>落盘。<br>🎯 一句话记住：<strong>要么全成，要么全撤；提交之后，就赖不掉了。</strong>四个字母过完一遍，先别急着往下翻——合上这页，用自己的话把四个特性各自在保证什么说一遍，说得糙没关系，说一遍比读十遍记得牢。",
              "interaction": {
                "type": "describe",
                "prompt": "就用刚才这笔转账：用自己的话说说，事务的四个特性各自在保证什么？",
                "reference": "原子性管『要么全做、要么全不做』——扣款和到账同生共死，靠 undo 日志兜底；一致性管『做完之后账是平的』——钱不会凭空多、也不会凭空少，约束始终成立；隔离性管『并发的事务互不干扰』——别人同时在转账，也不会被你这半截数据带偏；持久性管『提交了就不会丢』——COMMIT 之后哪怕断电，redo 日志也能恢复。",
                "keywords": [
                  "原子",
                  "一致",
                  "隔离",
                  "持久"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——四个字母都听过了，可它们各管什么事？来配对！"
              },
              "scene": "tx-states",
              "sfx": "配对!",
              "explain": "🤔 四个字母背得滚瓜烂熟，可它们各自到底在防哪一类事故？这才是面试官最爱追问的地方。<br>📐 换个角度记：每个特性背后都站着一场事故——<strong>原子性</strong>挡『做一半断电』，<strong>持久性</strong>挡『提交后宕机丢数据』，<strong>隔离性</strong>挡『并发事务互相偷看』，<strong>一致性</strong>挡『钱凭空消失、约束被破坏』。<br>🎯 左边是字母，右边是它挡住的事故。点左边一项，再点右边它的搭档；配错了没关系，会有提示告诉你它真正在防什么。<strong>能说清『防什么』，才算真懂 ACID，而不只是背下来四个缩写。</strong>配的时候慢一点，想清楚每个字母背后到底站的是哪一场事故，这样理解会牢固得多。想清楚再点，配对才会记得牢。",
              "interaction": {
                "type": "match",
                "question": "🔗 把 ACID 的四个特性，和它负责解决的问题配成一对",
                "pairs": [
                  [
                    "原子性 Atomicity",
                    "一组操作不可分割：要么全做，要么靠 undo 全部撤销"
                  ],
                  [
                    "一致性 Consistency",
                    "事务前后数据都满足约束与业务规则，不会出现『钱凭空消失』"
                  ],
                  [
                    "隔离性 Isolation",
                    "并发事务互不干扰，靠锁与 MVCC 实现"
                  ],
                  [
                    "持久性 Durability",
                    "一旦 COMMIT，即使随后断电也不丢，由 redo 日志落盘保障"
                  ]
                ],
                "wrongText": "哔——不是这一对，想想这个字母真正在防什么事故？",
                "doneText": "🎉 四个字母，各就各位！"
              },
              "nextText": "亲手演一遍转账 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "说得热闹，不如亲手演一遍转账！把四个步骤按正确顺序点出来。"
              },
              "scene": "tx-flow",
              "sfx": "演一遍!",
              "explain": "🤔 光背定义记不住，不如亲手演一遍转账：四个步骤，顺序一步都不能乱。<br>📐 正确顺序：<code>BEGIN</code> 开启事务 → <code>UPDATE</code> A 账户 <code>-100</code> → <code>UPDATE</code> B 账户 <code>+100</code> → <code>COMMIT</code> 提交落定。<br>🎯 关键在容错：中间任何一步出错，就整体 <code>ROLLBACK</code>，回到 <code>BEGIN</code> 之前『什么都没发生』的状态——这正是原子性的落地方式。可要是先 <code>COMMIT</code> 了再出错，就再也回不去了。动手点一点，按顺序走完这笔转账，观察每一步之后账面上余额的变化。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 按正确顺序，依次点击转账事务的四个步骤",
                "steps": [
                  "BEGIN —— 开启事务",
                  "UPDATE：A 账户 -100",
                  "UPDATE：B 账户 +100",
                  "COMMIT —— 提交，落定"
                ],
                "wrongText": "顺序乱了！中途出错可回不到原状态哦",
                "doneText": "🎉 顺序完全正确，事务成立！"
              },
              "nextText": "还有传言要辟 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——较真时间：隔离级别这一块，传言比真相多。"
              },
              "scene": "mvcc",
              "sfx": "较真!",
              "explain": "📌 <strong>四个隔离级别</strong>（从松到严）：读未提交 → 读已提交 → 可重复读 → 串行化。越高越一致、并发越差。要挡三种异常：<strong>脏读</strong>（读了别人未提交、可能回滚的数据）、<strong>不可重复读</strong>（同一行两次读到的值变了）、<strong>幻读</strong>（同一条件两次查行数变了）。<br>🎯 <strong>InnoDB 默认是『可重复读 RR』</strong>，不是读已提交——Oracle、PostgreSQL 默认才是读已提交，面试常考。<br>🔍 <strong>RR 凭什么挡住幻读</strong>：普通 <code>SELECT</code> 走 <strong>MVCC 快照读</strong>，读事务开始那一刻的版本；而 <code>UPDATE</code>、<code>FOR UPDATE</code> 这类<strong>当前读</strong>会加<strong>间隙锁（Next-Key Lock）</strong>。严谨说法是：<strong>靠 MVCC + 间隙锁在很大程度上避免幻读，而非完全串行化。</strong><br>⚠️ 两个细节：<code>ROLLBACK</code> 只能回滚<strong>尚未提交</strong>的改动；DDL 会<strong>隐式提交</strong>事务。<br>⏳ <strong>长事务最要命</strong>：链长、锁久。",
              "nextText": "最后一题 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——断电导致转账只做了一半，哪个特性可以防止这种事故？"
              },
              "scene": "acid",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 防止'做一半'靠哪个特性？",
                "options": [
                  "原子性 Atomicity",
                  "持久性 Durability",
                  "隔离性 Isolation"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "数据库隔离级别从低到高，排序正确的是？",
              "options": [
                "读未提交 → 读已提交 → 可重复读 → 串行化",
                "串行化 → 可重复读 → 读已提交 → 读未提交",
                "读已提交 → 读未提交 → 串行化 → 可重复读"
              ],
              "answer": 0,
              "explanation": "隔离级别越高、并发越差。MySQL InnoDB 默认'可重复读（RR）'：普通查询走快照读实现可重复读，配合间隙锁防止幻读。"
            },
            {
              "question": "读到别的事务尚未提交、将来可能回滚的数据，这叫什么？",
              "options": [
                "脏读",
                "幻读",
                "不可重复读"
              ],
              "answer": 0,
              "explanation": "脏读：读了未提交的数据。不可重复读：同一行两次读到的值被别的事务改了。幻读：两次同样条件的查询，行数变了（有人插入/删除了行）。"
            },
            {
              "question": "MySQL InnoDB 的默认隔离级别，以及它处理幻读的方式，正确的是？",
              "options": [
                "可重复读（REPEATABLE READ）：普通查询靠 MVCC 快照读，当前读靠间隙锁，很大程度上避免幻读，但并非完全串行化",
                "读已提交（READ COMMITTED）：靠表级排他锁防幻读",
                "串行化（SERIALIZABLE）：所有查询排队执行"
              ],
              "answer": 0,
              "explanation": "InnoDB 默认是 REPEATABLE READ（Oracle、PostgreSQL 的默认才是读已提交）。RR 下普通 SELECT 走 MVCC 快照读，读的是事务开始那一刻的版本；SELECT … FOR UPDATE、UPDATE、DELETE 这类当前读会加 Next-Key Lock（记录锁 + 间隙锁），挡住范围内的插入。所以是『很大程度上』避免幻读，而不是把并发完全串行化。"
            }
          ]
        },
        {
          "id": "2-4",
          "title": "视图与存储过程",
          "icon": "🪟",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "总部要看'不及格学生名单'，但你不能让他们翻整张学生表——做个'定制橱窗'！"
              },
              "scene": "viewproc",
              "sfx": "橱窗!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🪟 橱窗区"
              },
              "explain": "🤔 总部只想看『不及格学生名单』，可你总不能把整张学生表——连同身份证号、家庭住址——都开放给他们，出了事谁负责？<br>📐 <strong>视图（VIEW）= 被保存下来的一条查询</strong>：<code>CREATE VIEW 不及格名单 AS SELECT 姓名, 成绩 FROM 学生 WHERE 成绩 &lt; 60</code>。它<strong>只存定义、不存数据</strong>，每次被用到时才按定义现算，所以基表一变结果立刻跟着变。<br>🎯 好处一句话：<strong>复杂查询只写一次，敏感列一列都不暴露。</strong>顺便澄清一个常见误解：视图<strong>不是</strong>数据的拷贝，本身也不提速。点一点，把橱窗摆出来，看看总部透过它到底能看见些什么，又看不见什么。",
              "stage": [
                {
                  "type": "text",
                  "content": "👀 总部只看到：不及格名单",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔒 看不到身份证号等敏感列",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "✅ 权限最小化，更安全",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "还有存储过程 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——橱窗看完了，流水线这就登场！讲完我再出三句话，你逐句判判对错。"
              },
              "scene": "view-vs-proc",
              "sfx": "对比!",
              "explain": "🤔 视图和存储过程都是『把逻辑留在数据库里』，很多人一开口就把它们搞混。<br>📐 一句话锚定差异——<br>🪟 <strong>视图是『橱窗』</strong>：<code>CREATE VIEW 名字 AS SELECT …</code>，只存查询定义、不存数据，是张虚拟表，用来简化复杂查询、隔离权限；<br>🏭 <strong>存储过程是『流水线』</strong>：一组 SQL + 参数 + 流程控制，预编译后一次 <code>CALL</code> 跑完全程，用于批量处理和减少网络往返。<br>🎯 关键区别：视图解决『<strong>怎么看</strong>』，存储过程解决『<strong>怎么做</strong>』；视图不能传参，存储过程能带 IN / OUT 参数。至于逻辑该不该放进数据库，是个权衡：简单稳定的封在库端省传输，复杂易变的留给应用层好维护。<strong>一句话记住：橱窗用来看，流水线用来跑。</strong>刚讲的这几条，恰恰是最容易被说岔的地方——下面三句话，逐句判对错，判定完看解析！",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "视图会像普通表一样，把查询结果再存一份。",
                    "answer": false,
                    "why": "视图只存查询定义、不存数据，每次被用到才按定义现算——所以基表一变，结果立刻跟着变。"
                  },
                  {
                    "text": "存储过程可以把一组 SQL 打包成一次调用。",
                    "answer": true,
                    "why": "这正是存储过程的价值：预编译、可复用，一次 CALL 跑完全程，省去反复的网络往返。"
                  },
                  {
                    "text": "视图和存储过程一样，都能带参数。",
                    "answer": false,
                    "why": "视图就是一条固定的查询定义，不能传参；能带 IN / OUT 参数的是存储过程。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "两位选手都到齐了——来一场配对练习，把它们和各自的特点连起来！"
              },
              "scene": "view-vs-proc",
              "sfx": "配对!",
              "explain": "🤔 定义念一遍不算学会，能一眼分清『这是谁』才算——来场配对练习。<br>📐 左边是名字，右边是描述，边配边回忆刚才那句话：视图是只存定义的橱窗、存储过程是预编译可传参的流水线、两者的共同点是把逻辑封在库端、省掉反复传输。<br>🎯 左边是名字，右边是描述。点左边一项，再点右边它的搭档；配错也不要紧，会有提示帮你纠正。小技巧：先抓住『谁在存数据、谁能传参数』这两个关键点，剩下的自然就对上了。<strong>配完这三对，视图和存储过程就再也不会傻傻分不清。</strong>记住分界线：<strong>视图只读定义、不存数据、不能传参；存储过程预编译、可传参、用 CALL 调用。</strong>一个负责『怎么看』，一个负责『怎么做』——分不清的时候，默念这句口诀就行。多试几次也没关系，直到你能脱口而出为止。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的概念，和右边正确的描述配成一对",
                "pairs": [
                  [
                    "视图",
                    "一条被保存的查询：只存定义，不存数据"
                  ],
                  [
                    "存储过程",
                    "预编译的一组 SQL，可带参数、可复用"
                  ],
                  [
                    "两者的共同点",
                    "都把逻辑封存在数据库端，省去反复传输"
                  ]
                ],
                "wrongText": "不是这一对，再想想它们的本质"
              },
              "nextText": "再比一个真实需求 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——同一个需求『不及格名单』，两种做法摆在面前。拨开关看看区别。"
              },
              "scene": "viewproc",
              "sfx": "对比!",
              "explain": "🤔 同一个需求『当前所有不及格学生』，摆在面前两条路：每天导一张快照表，还是建视图实时算？<br>📐 <strong>快照表</strong>读得快（0.01 秒），但数据<strong>会过期</strong>——今天刚挂科的同学不在名单里，还得写定时任务维护，表越攒越多；<br>📐 <strong>视图</strong>每次现算（0.02 秒），<strong>永远是最新的</strong>，只存一条 <code>SELECT</code> 定义，基表一变结果就变，代价是用到时才计算。<br>🎯 来回拨一拨：你愿意为『实时』多付那 0.01 秒吗？<strong>省下的时间，往往是拿『数据可能是错的』换来的。</strong>顺带一提：MySQL 没有原生物化视图，想『既快又新』只能自己用索引或定时任务折中。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 拨动开关：『快照表』和『视图实时算』，你选哪个？",
                "states": [
                  {
                    "label": "❌ 每天导一张快照表",
                    "metric": "数据截止到昨天 23:00",
                    "time": "查询 0.01 秒（很快）",
                    "note": "读得快，但会过期：今天刚挂科的同学不在名单里。还得写定时任务维护，表越攒越多。MySQL 没有原生物化视图，只能这样模拟。",
                    "tone": "bad"
                  },
                  {
                    "label": "✅ 用视图 VIEW 实时算",
                    "metric": "永远是最新的数据",
                    "time": "查询 0.02 秒（现算）",
                    "note": "只存一条 SELECT 定义，基表一变结果就变，不用维护。代价是每次用到都要现算——把过滤条件用到的列建成索引，就没那么肉疼了。",
                    "tone": "good"
                  }
                ],
                "doneText": "🎉 实时 vs 快照，心里有数了！"
              },
              "nextText": "还有几处细节 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——较真时间：视图能不能改？它能让查询变快吗？"
              },
              "scene": "db-objects",
              "sfx": "较真!",
              "explain": "📌 <strong>视图能不能改</strong>：简单视图（单表、无聚合、没有 DISTINCT / GROUP BY / UNION 和子查询）通常能增删改，改动落到基表上；带聚合、DISTINCT、GROUP BY、UNION 的一般<strong>不可更新</strong>，数据库直接报错。<br>🔒 <code>WITH CHECK OPTION</code> 很实用：它禁止『通过视图插入一条自己看不见的行』——给不及格视图加上它，就塞不进一个 95 分的学生。<br>🚫 <strong>视图不存数据，所以它不提速</strong>：省的是『复杂 SQL 抄来抄去』的麻烦，不是执行时间；想加速还得靠索引或物化。<br>🏭 <strong>存储过程</strong>用 <code>CALL 名字(参数)</code> 调用，可带 IN / OUT 参数、写流程控制。优势是预编译 + 省掉网络往返；代价是<strong>逻辑分散在库里</strong>——版本管理、单测、代码审查都更麻烦，换数据库基本要重写。<br>🧩 分清亲戚：<strong>函数 FUNCTION</strong> 放在 SQL 表达式里用（<code>SELECT 算总分(学号)</code>）；<strong>触发器 TRIGGER</strong> 是『表一变就自动跑』，威力大也难排查。<br>⚖️ 现代通例：<strong>简单稳定的逻辑放库端，复杂易变的业务逻辑放应用层。</strong>",
              "nextText": "最后一题 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——视图里实际存储的是什么？"
              },
              "scene": "view-def",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 视图里实际存储的是？",
                "options": [
                  "数据的一份拷贝",
                  "一条查询的定义（用时才执行）",
                  "磁盘上的索引文件"
                ],
                "answer": 1
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "视图最典型的安全用途是？",
              "options": [
                "只暴露部分行/列给特定用户，隐藏敏感字段",
                "自动加密数据库",
                "代替每日备份"
              ],
              "answer": 0,
              "explanation": "给报表账号只授予'姓名、成绩'视图的权限，用户无需（也不被允许）直接访问原表，敏感列自然隔离——这是'最小权限原则'的常见落地方式。"
            },
            {
              "question": "存储过程相比在应用里逐条发 SQL，主要优势是？",
              "options": [
                "预编译 + 减少网络往返，逻辑封装在数据库端",
                "让数据自动变正确",
                "不需要任何权限"
              ],
              "answer": 0,
              "explanation": "存储过程一次编译、多次执行，复杂流程在库内完成，省去来回通信。但也要权衡：逻辑分散、难调试、迁移性差，现代架构更倾向把复杂业务逻辑留在应用层。"
            },
            {
              "question": "关于视图，下列说法正确的是？",
              "options": [
                "视图只是被保存的一条查询，本身不存数据，所以不会让查询变快；含 GROUP BY / DISTINCT 的视图一般不可更新",
                "视图会把查询结果存成实体表，所以查询更快",
                "通过视图改数据不会影响基表"
              ],
              "answer": 0,
              "explanation": "视图的价值在『简化与隔离』：复杂 SQL 只写一次、权限只放开一部分列。但它每次被用到都要现算，性能取决于基表和索引；想『把结果存下来换速度』那是物化视图的路子，MySQL 至今没有原生支持。可更新性也有限：简单单表视图通常能增删改，带聚合、DISTINCT、GROUP BY、UNION 的一般不行。"
            }
          ]
        },
        {
          "id": "2-5",
          "title": "SQL 注入与防范",
          "icon": "🔐",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "黑客在登录框里输入了：' OR '1'='1 —— 居然直接登录成功了！？"
              },
              "scene": "sqlinject",
              "sfx": "入侵!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🛡️ 证据区"
              },
              "explain": "🤔 黑客在登录框里敲的不是密码，而是一句 SQL：<code>' OR '1'='1</code>——居然直接登录成功了！<br>📐 原因只有一个：代码把<strong>用户输入直接拼进了 SQL 语句</strong>，于是 <code>WHERE</code> 条件被改写成恒为真，密码校验形同虚设。<strong>输入的『数据』身份被偷偷升级成了『命令』</strong>——这就是 <strong>SQL 注入</strong>。<br>🎯 点一点，看看它是怎么从登录框里的一句输入，一步步演变成整个数据库失守的。<strong>根因不在黑客多厉害，而在代码把『数据』和『命令』混在了一起——这条界线，正是后面所有防御的地基。</strong>看仔细，它是怎么把后面的密码校验整段『注释掉』的。",
              "stage": [
                {
                  "type": "text",
                  "content": "👹 输入：' OR '1'='1",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "💣 拼出的 SQL 条件永远为真",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "😱 数据库交出全部账号数据",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "它是怎么得手的？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——登录框只是冰山一角！翻开卡片，看看注入家族的几位成员。"
              },
              "scene": "sqlinject",
              "sfx": "翻卡!",
              "explain": "🤔 登录框只是冰山一角——同一个根因，能被攻击者玩出好几种花样，让人防不胜防。<br>📐 本质永远只有一句：<strong>用户输入被当成了 SQL 代码</strong>。至于被利用成什么样，就看攻击者的想象力：登录绕过、<code>UNION</code> 拖库、盲注猜数据、堆叠与二次注入。<br>🎯 翻开四张卡，把注入家族认全：登录绕过、<code>UNION</code> 拖库、盲注、堆叠与二次注入。危害一次比一次重——从骗过登录，到整张表被悄悄带走。<strong>别嫌花样多，知道它怎么打，才知道该往哪儿防。</strong>四张卡对应四种典型场景：有回显的、没回显的、要拼接数据的、要绕过多道防线的——每一种的破法与危害都不一样，得逐个认脸。认全之后你会发现，它们的根因其实是同一个。",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开四张卡，认识 SQL 注入的常见形态",
                "cards": [
                  {
                    "front": "🚪 ① 登录绕过",
                    "back": "输入 <code>' OR '1'='1' --</code> 让 WHERE 恒为真；末尾的 <code>--</code> 再把后面的密码校验整段注释掉。"
                  },
                  {
                    "front": "🧲 ② UNION 拖库",
                    "back": "用 <code>UNION SELECT 用户名, 密码 FROM 用户表</code> 把别的表的数据拼进查询结果，一次带走整张表。"
                  },
                  {
                    "front": "⏱️ ③ 盲注",
                    "back": "页面不回显数据时，靠『页面真假差异』或者 <code>SLEEP(5)</code> 的延迟，一个字符一个字符地把数据猜出来。慢，但能成。"
                  },
                  {
                    "front": "💣 ④ 堆叠 / 二次注入",
                    "back": "堆叠注入用分号再接一条语句（能不能成取决于驱动设置）；二次注入更阴——恶意数据先被『安全地』存进库，等另一个功能把它读出来拼接时才引爆。"
                  }
                ],
                "doneText": "🎉 攻击家族的套路，认全了！"
              },
              "nextText": "那怎么防？▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——防注入的心得我总结好了，你听听有没有漏洞，可疑的地方尽管指出来！"
              },
              "scene": "sql-param",
              "sfx": "听心得!",
              "explain": "🤔 知道怎么被打，还得知道怎么防。根治办法只有一条：<strong>让『数据』永远当数据，绝不能让它变成『命令』。</strong>写成代码就是 <code>SELECT * FROM users WHERE name = ?</code>——问号单独传输、永远只是数据，注入字符串塞进来也无效。<br>📐 防注入四板斧——<br>① <strong>参数化查询（预编译）——首选、治本</strong>：SQL 骨架先编译定型，输入只能当参数填进那个洞里；<br>② <strong>输入校验</strong>：类型、长度、白名单，尤其管住列名这类不能参数化的位置；<br>③ <strong>最小权限</strong>：Web 账号不给 <code>DROP</code>、<code>FILE</code> 等权限，缩小爆炸半径；<br>④ <strong>WAF 只是补充</strong>，可被绕过，绝不能当唯一防线。<br>🎯 一句话：<strong>参数化治本，其余三层都是纵深。</strong>下面塔库要复述自己的防御心得——他自觉滴水不漏，其实混进了一处致命误解，把它点出来！",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库拍着胸脯，讲起了自己的防御心得——",
                "segments": [
                  {
                    "text": "防注入我已经想明白了："
                  },
                  {
                    "text": "只要把用户输入里的单引号统统过滤掉，拼字符串就绝对安全，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：数字型注入（<code>id = 1 OR 1=1</code>）根本不需要引号，字符编码、各数据库的转义规则也各有坑——过滤引号挡不住所有注入，参数化才是从机制上治本。"
                  },
                  {
                    "text": "稳妥的做法是参数化查询，把 SQL 骨架先编译定型，",
                    "check": true,
                    "why": "这句没错：骨架先定死，占位符只能填值，输入再怎么捣乱也改不了语句结构。"
                  },
                  {
                    "text": "再配合最小权限，就算出事也掀不起大浪。",
                    "check": true,
                    "why": "也对：Web 账号不给 DROP、FILE 这类权限，万一被注入，爆炸半径也有限——这是纵深防御的最后一层。"
                  }
                ]
              }
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "紧急演练！黑客已经把这个输入送进来了，两条代码路线，你选哪条上线？"
              },
              "scene": "sql-concat",
              "sfx": "演练!",
              "explain": "🤔 同一段攻击载荷 <code>' OR '1'='1</code>，交给两段不同的代码，结果可能天差地别。<br>📐 <strong>路线A 拼接派</strong>：<code>'SELECT * FROM users WHERE name=' + 输入</code>——输入直接改写语句结构，条件恒为真；<br>📐 <strong>路线B 参数化派</strong>：<code>SELECT * FROM users WHERE name = ?</code>——骨架先编译定型，输入只能当值填进去。<br>🎯 选一条路线上线，看看后果：一条让黑客免密登录、拖走全库；另一条让注入载荷退化成一段普通字符串、当场失效。<strong>两条代码只差一个 <code>?</code>，安全与失守也只差这一个 <code>?</code>。</strong>",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 两条登录校验代码，上线哪一条？",
                "options": [
                  {
                    "label": "路线A：字符串拼接<br><code>\"SELECT * FROM users WHERE name='\" + 输入 + \"'\"</code>",
                    "tone": "bad",
                    "result": "😱 输入被拼进 SQL 语句，条件变成了<strong>永远为真</strong>——黑客不输密码就登录成功，全部账号数据暴露！这就是 SQL 注入。"
                  },
                  {
                    "label": "路线B：参数化查询<br><code>SELECT * FROM users WHERE name = ?</code>",
                    "tone": "good",
                    "result": "✅ SQL 骨架先编译定型，输入随后作为<strong>纯参数值</strong>填入。此时 <code>' OR '1'='1</code> 只是一段普通字符串，注入彻底失效。"
                  }
                ],
                "wrongText": "这条路线有注入风险，换一条试试",
                "doneText": "🎉 防线拉满，注入无效！"
              },
              "nextText": "还有三个误区 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——较真时间：有几个『看起来在防御、其实没用』的做法，得说清楚。"
              },
              "scene": "sqlinject-myths",
              "sfx": "较真!",
              "explain": "📌 <strong>误区一：『把单引号删掉或转义就安全了』</strong>。手工转义要同时考虑字符编码、数字型注入（<code>id = 1 OR 1=1</code> 根本不需要引号）和不同数据库的转义规则，漏一个就是漏洞。参数化可靠，是因为它<strong>从机制上</strong>让输入无法改变语句结构，而不是『过滤掉了坏字符』。<br>📌 <strong>误区二：『用了 ORM 就免疫』</strong>。ORM 的查询构造器一般会参数化，可你一旦拼原生 SQL，或把用户输入塞进 <code>ORDER BY</code>、表名、列名，照样中招。<br>📌 <strong>为什么表名列名不能参数化</strong>？因为占位符只能代替<strong>值</strong>、不能代替<strong>结构</strong>——语句编译那一刻结构就定死了。这类地方只能<strong>白名单校验</strong>：允许的列名写死在代码里，不匹配就拒绝。<br>📌 <strong>误区三：『有 WAF 就够了』</strong>。WAF 会被编码变形绕过，也会误杀正常请求，它只是<strong>纵深防御的一层</strong>。<br>🛡️ 完整一套：<strong>参数化（根治）+ 白名单（兜住结构）+ 最小权限（缩小爆炸半径）+ 报错不外泄 + 日志审计</strong>——安全不是一道门，而是一层层墙。",
              "nextText": "最后一题 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——最根本有效的防注入手段是什么？"
              },
              "scene": "sql-param",
              "sfx": "想一想!",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 最根本有效的防注入手段是？",
                "options": [
                  "参数化查询（预编译）",
                  "把用户输入里的单引号删掉",
                  "把数据库端口改掉"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "参数化查询为什么能防注入？",
              "options": [
                "SQL 结构先编译固定，参数永远只是'值'，无法改变语句结构",
                "因为它把单引号转义了",
                "因为它加密了输入内容"
              ],
              "answer": 0,
              "explanation": "预编译先把骨架（SELECT … WHERE name=?）发给数据库编译定型，参数随后单独传输、作为纯值填入。此时即使参数里含 SQL 关键字，也只是普通字符串。手工转义/黑名单容易漏，参数化才是根治。"
            },
            {
              "question": "为什么说『最小权限』能降低注入的危害？",
              "options": [
                "Web 账号权限小，即使被注入也做不到 DROP TABLE、读写他人数据等危险操作",
                "因为权限小查询更快",
                "因为小权限账号不需要密码"
              ],
              "answer": 0,
              "explanation": "纵深防御：参数化是『不让注入发生』，最小权限是『万一发生了也掀不起大浪』。生产环境给应用的账号通常只授予必要的 SELECT/INSERT/UPDATE，DDL 权限单独管控。"
            },
            {
              "question": "为什么表名、列名、ORDER BY 的排序方向这些地方，不能用参数化占位符？",
              "options": [
                "占位符只能替换『值』，不能替换语句结构；这些位置必须用白名单校验后再拼",
                "因为占位符会让查询变慢",
                "因为数据库不支持带参数的排序"
              ],
              "answer": 0,
              "explanation": "预编译是把语句的『骨架』先编译定型，占位符只是骨架上的洞，洞里塞进去的永远是值——所以它没法变成表名或关键字。遇到必须动态决定列名或排序方向的场景（比如前端传 sort=score），正确做法是把允许的取值写死在代码里做映射：sort 只能是 score 或 created_at，其余一律拒绝。"
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "第3章：数据库底层原理",
      "knowledgePoints": [
        {
          "id": "3-1",
          "title": "一条SQL的执行过程",
          "icon": "🏭",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "你的 SQL 从敲下回车到拿到结果，要经过一条'流水线'。点一点每个工位，看它们干什么！"
              },
              "scene": "sqlflow",
              "sfx": "开工!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🏭 流水线"
              },
              "explain": "🤔 <strong>先想一个问题</strong>：你敲下 <code>SELECT * FROM students WHERE id = 1</code>，回车到出结果只花了 2 毫秒。这 2 毫秒里，MySQL 到底干了什么？<br>搞不清这条流水线，你就解释不了这些日常困惑：为什么加了索引还是慢？为什么同一条 SQL 换个写法能快 100 倍？为什么 EXPLAIN 预测扫 10 行、实际扫了 10 万行？<br><br>一条 SQL 要过<strong>五关</strong>：<strong>连接器</strong> → <strong>解析器</strong> → <strong>优化器</strong> → <strong>执行器</strong> → <strong>存储引擎</strong>。<br>🔌 <strong>连接器</strong>管'你是谁、能不能进'：验账号、验权限、分配连接（一个连接一个线程）；<br>📖 <strong>解析器</strong>管'你这句话合不合法'：词法分析切词、语法分析建语法树；<br>🧠 <strong>优化器</strong>管'怎么干最便宜'：按代价挑执行计划；<br>⚙️ <strong>执行器</strong>管'照着计划干'：不停调用存储引擎接口；<br>💾 <strong>存储引擎</strong>（InnoDB）真正去缓冲池和磁盘读写数据。<br><br>💡 <strong>为什么值得记这条线</strong>：优化慢查询的第一步，是判断瓶颈卡在<strong>哪一关</strong>——语法报错是解析器的事，选错索引是优化器的事，锁等待是引擎的事。找错环节，调优全靠猜。<br>⚠️ 冷知识：MySQL 8.0 已<strong>彻底删除查询缓存</strong>（5.7.20 起废弃），别再指望它加速重复查询——那是应用层缓存（Redis）的活。",
              "stage": [
                {
                  "type": "text",
                  "content": "🚪 连接器：验证账号、管理连接",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📝 解析器：语法分析，生成语法树",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧠 优化器：决定用哪个索引、怎么执行",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🏃 执行器：按执行计划调存储引擎",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "💾 InnoDB：真正读写内存和磁盘上的数据",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 5,
              "nextText": "谁最聪明？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "优化器是'军师'：同一条 SQL 有好多走法，它负责挑最省的路线。哔——听懂了？写个名字给我看看！"
              },
              "scene": "sqlflow",
              "sfx": "选路!",
              "explain": "🧠 <strong>优化器</strong>按'成本'估算选择执行方案：走不走索引、先查哪张表、怎么连接。同一条 SQL 往往有多条执行路径，快慢能差<strong>几个数量级</strong>——选对了 1 毫秒返回，选错了可能卡住 10 秒；它替你选路，却<strong>一行数据都不碰</strong>——只'选路'，'走路'的是执行器。<br>📐 <strong>它怎么判断</strong>：靠<strong>统计信息</strong>（索引基数 cardinality、数据页数等）估算。<br>· 统计信息说'这个条件能筛掉 <strong>99%</strong> 的行' → 走索引 ⚡；<br>· 说'几乎要全表' → 干脆全表扫描。<br>因为是采样得来的估算，<code>EXPLAIN</code> 里的 <code>rows</code> 只是<strong>估算值</strong>，预测和实际差几倍是正常的；'执行计划永远不变'也是错的——统计过期、数据倾斜、参数不同，都可能让它改走另一条路。<br>🧰 <strong>诊断三件套</strong>：<code>EXPLAIN</code> 看计划 → <code>ANALYZE TABLE</code> 更新统计信息 → 实在不行才用 <code>FORCE INDEX</code> 硬干预。<br>👇 <strong>现场检验</strong>：这位只'选路'不'走路'的军师，叫什么名字？写在下面。",
              "interaction": {
                "type": "input",
                "question": "SQL 流水线里，负责'选路'、自己一行数据都不碰的组件是？（中文名或英文名都行）",
                "accept": [
                  "优化器",
                  "查询优化器",
                  "Optimizer",
                  "optimizer"
                ],
                "placeholder": "往里写…",
                "hint": "流水线第三站的'军师'，英文名以 Opt- 开头，本意就是'最优'。",
                "doneText": "🎉 对，就是优化器（Optimizer）——选路的是它，走路的才是执行器。"
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "光看名片不够，来个配对练习！把每个工位和它的职责连起来。"
              },
              "scene": "sql-roles",
              "sfx": "配对!",
              "explain": "🔗 五个环节环环相扣：谁验证身份？谁检查语法？谁决定路线？点左边一项，再点右边它的职责。<br>一句话分辨：<strong>解析器管'合不合法'，优化器管'贵不贵'</strong>。解析器只认语法规则，它根本不知道表里有多少行；优化器拿到语法树和统计信息，它一行数据也不碰。<br>还有一步常被漏掉：MySQL 5.7 起在解析器和优化器之间多了<strong>预处理</strong>（检查表、列是否存在，展开视图、确定权限），它属于'理解你要什么'的大解析阶段，别和优化器搅在一起。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的环节，和右边它真正负责的事情配成一对",
                "pairs": [
                  [
                    "连接器",
                    "验证账号权限、管理客户端连接"
                  ],
                  [
                    "解析器",
                    "做词法与语法分析，生成语法树"
                  ],
                  [
                    "优化器",
                    "基于统计信息估算代价，选择执行计划"
                  ],
                  [
                    "执行器",
                    "按执行计划调用存储引擎取数"
                  ]
                ],
                "wrongText": "这条职责不是它管的，再想想"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——别把工序记串了！把下面这些活儿，按它们真正发生的阶段丢进三个筐。"
              },
              "scene": "sqlflow-cost",
              "sfx": "分类中!",
              "explain": "🗂️ <strong>为什么要分三段</strong>：因为'慢'的原因藏在不同段里。搞清一段归属，才知道该查什么。<br><br>📝 <strong>解析段</strong>——把文本变成树，搞清'你要什么'（不碰数据、不算代价）；<br>🧠 <strong>优化段</strong>——算代价，决定'怎么干最便宜'（只算不干）；<br>🏃 <strong>执行段</strong>——按计划调用存储引擎，真正把数据取出来。<br><br>📌 <strong>判断口诀</strong>：凡是'检查、翻译、校验存在性'的 → 解析段；凡是'估算、比较、选择方案'的 → 优化段；凡是'调用引擎、逐行读、过滤、返回客户端'的 → 执行段。<br><br>⚠️ <strong>一个高频误判</strong>：<strong>排序、分组不一定发生在某一个固定阶段</strong>——如果排序列上有可用的索引，顺序本身就已经满足要求，直接顺着索引读就行；只有无法利用索引时，才需要临时表或文件排序。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把这些活儿，丢进它真正归属的阶段筐里",
                "items": [
                  "词法分析：把 SQL 文本切成一个个 token",
                  "语法分析：校验语法并生成语法树",
                  "预处理：检查表、列是否存在，展开视图",
                  "基于统计信息估算代价，比较不同执行方案",
                  "决定走哪个索引、多表按什么顺序连接",
                  "调用存储引擎接口，逐行读取并过滤记录",
                  "把结果集返回给客户端"
                ],
                "buckets": [
                  "📝 解析阶段",
                  "🧠 优化阶段",
                  "🏃 执行阶段"
                ],
                "answers": [
                  0,
                  0,
                  0,
                  1,
                  1,
                  2,
                  2
                ],
                "wrongText": "想想这一步是在'读懂'、'选路'还是'干活'"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——决定'用哪个索引'的环节是？"
              },
              "scene": "sqlflow-cost",
              "sfx": "想一想!",
              "explain": "❓ <strong>收个尾</strong>：优化器只负责'选路'，它决定走不走索引、先查哪张表，但一行数据也不碰。<br><br>📊 <strong>代价模型主要看三件事</strong>：预计要扫多少行、要不要回表、要不要临时表或排序。<br><br>🎯 <strong>举个具体例子</strong>：<code>students</code> 表 100 万行，<code>gender</code> 列只有'男/女'两个值。<br>· 查 <code>WHERE id = 12345</code>：只命中 1 行，走主键索引约 3 次页访问，很快；<br>· 查 <code>WHERE gender = '男'</code>：命中约 50 万行，占了半张表。走索引要先扫 50 万个索引项、再回表 50 万次（还都是随机 IO）；不如直接顺序扫全表。优化器算完这笔账，<strong>主动放弃索引</strong>。<br>所以'没走索引'不等于'优化器犯傻'，很可能它算得比你准。<br><br>🧠 <strong>一句话记住</strong>：<strong>筛得狠才走索引</strong>（能筛掉 99% 就划算），<strong>筛不动就全表扫</strong>（几乎命中全表时，随机回表比顺序扫描更贵）。<br><br>✅ <strong>实操建议</strong>：看到'没走索引'先别急着加 <code>FORCE INDEX</code>，用 <code>EXPLAIN</code> 看清它为什么这么选，再决定是更新统计信息（<code>ANALYZE TABLE</code>）还是改写 SQL。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 决定'用哪个索引'的环节是？",
                "options": [
                  "优化器",
                  "连接器",
                  "解析器"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "解析器（Parser）的工作是？",
              "options": [
                "检查 SQL 语法，并把文本转换成语法树",
                "执行 SQL 并返回结果",
                "缓存查询结果"
              ],
              "answer": 0,
              "explanation": "解析器负责'读懂'SQL：词法分析切词、语法分析校验合法性，产出语法树交给后续环节。它不负责'怎么查最快'——那是优化器的工作。"
            },
            {
              "question": "同一条 SQL，MySQL 一定能选到最优执行计划吗？",
              "options": [
                "不一定：优化器基于统计信息'估算'成本，可能选错索引",
                "一定最优",
                "随机选择，看运气"
              ],
              "answer": 0,
              "explanation": "优化器依据统计信息（行数、区分度等）估算：统计过期或数据倾斜时可能选错。DBA 通常用 EXPLAIN 分析，必要时更新统计信息或 FORCE INDEX 干预。"
            },
            {
              "question": "MySQL 8.0 里，重复执行同一条查询还能靠'查询缓存'加速吗？",
              "options": [
                "不能：查询缓存已在 8.0 被移除，重复查询要靠应用层缓存（如 Redis）",
                "能：8.0 默认开启查询缓存",
                "能：查询缓存改名成了 Buffer Pool"
              ],
              "answer": 0,
              "explanation": "查询缓存在 5.7.20 被标记废弃、MySQL 8.0 正式移除。原因是它按整条 SQL 文本做键，任何一张相关表发生写操作都要让缓存失效，命中率低而失效开销大。Buffer Pool 缓存的是数据页，和'查询缓存'完全是两回事。"
            }
          ]
        },
        {
          "id": "3-2",
          "title": "缓冲池 (Buffer Pool)",
          "icon": "⚡",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "磁盘读一次数据要 0.1 毫秒级，内存只要 0.0001 毫秒级——差 1000 倍！InnoDB 的秘诀：把数据页搬进内存！"
              },
              "scene": "bp-page",
              "sfx": "提速!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "⚡ 缓冲池"
              },
              "explain": "🤔 <strong>先算一笔账</strong>：内存随机访问约 <strong>100 纳秒</strong>，机械盘随机读约 <strong>10 毫秒</strong>——差了 <strong>10 万倍</strong>。如果每次查数据都老老实实读盘，一台普通服务器每秒只能扛几十次查询。<br>可现实是 MySQL 每秒能处理上万次——多出来的性能从哪来？答案就是这个组件。<br><br>📐 <strong>缓冲池（Buffer Pool）</strong>是内存中的'数据页仓库'，读写都先经过它。InnoDB 以<strong>页</strong>为单位管理数据，默认一页 <strong>16KB</strong>，缓冲池缓存的就是这些页（数据页、索引页、undo 页等），再用一张页表记录'哪个页在内存的哪儿'。<br>💡 一句话定位：<strong>缓冲池就是把'毫秒'换成'纳秒'的那层缓存</strong>。<br>⚠️ 但它不是越大越好：它要和操作系统、其它进程抢物理内存，生产常用物理内存的 50%~75%，还要给连接、排序等留出余量。",
              "stage": [
                {
                  "type": "text",
                  "content": "🗄️ 磁盘：大但慢 🐌",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "⚡ 内存缓冲池：快但小 🚀",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📄 页：16KB，最小的搬运单位",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "读写怎么走？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "读先查内存；写先改内存并写日志，磁盘慢慢来——这就是 WAL 的智慧。哔——轮到你用自己的话讲一遍了。"
              },
              "scene": "bp-readwrite",
              "sfx": "WAL!",
              "explain": "<strong>读</strong>：命中缓冲池 → 直接返回 ⚡；未命中 → 从磁盘把页读进来。<br><strong>写</strong>：修改内存中的页（标记为'<strong>脏页</strong>'），同时先写日志（WAL），脏页由后台线程择机刷盘。<br>三个容易含糊的点：<br>① 提交事务时写的是<strong>日志</strong>，不是数据文件，所以提交能很快返回；<br>② 脏页什么时候刷是'择机'：redo 快写满、空闲页不够、系统空闲或正常关库时都会加快刷；<br>③ 淘汰用<strong>改进版 LRU</strong>：链表分成 young / old 两段（默认 5/8 是 young），新读入的页先插到 old 段头部，只有被再次访问才有机会升进 young——一次大扫描最多污染 old 段，冲不垮热点数据。<br>👇 <strong>检验一下</strong>：'读看命中、写改内存、日志先行、脏页后刷'——换成你自己的话，讲给我听。",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：读一页数据和写一页数据，缓冲池分别是怎么处理的？为什么事务提交能很快返回？",
                "reference": "读先查缓冲池：命中就直接返回，未命中才从磁盘把 16KB 的页读进来。写先改内存里的页并标记为脏页，同时按 WAL 先把变更写入日志——提交时只保证日志落盘，脏页由后台线程择机刷回磁盘；顺序写日志快、随机写数据页慢，所以提交能秒回。淘汰用改进版 LRU 冷热分区，防止一次大扫描把热点页冲走。",
                "keywords": [
                  "命中",
                  "脏页",
                  "日志",
                  "刷盘",
                  "LRU"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "缓冲池的日常就是四种剧本循环上演，翻翻卡片，看看每种情况怎么处理。"
              },
              "scene": "bp-readwrite",
              "sfx": "翻卡!",
              "explain": "🃏 四种典型场景：读命中、读未命中、写数据、脏页刷盘——每种的处理路径都不同，别混在一起记。<br>记住主线：<strong>读看命中、写改内存、日志先行、脏页后刷</strong>。<br>补两个严谨细节：<br>① 刷脏不是一页一页随机写，如果这一页的邻居也脏，会顺手一起刷（邻居刷），把随机 IO 攒成更连续的 IO；<br>② 万一脏页写到一半断电，页可能'写坏一半'——InnoDB 还有 <strong>doublewrite（双写缓冲）</strong>兜底：先把页顺序写进双写区，再写数据文件，崩溃后能用副本把坏页修回来。",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开四张卡，看看缓冲池的四种日常",
                "cards": [
                  {
                    "front": "🎯 读·命中",
                    "back": "目标页就在缓冲池里——<strong>0 次磁盘 IO</strong>，直接返回。这是绝大多数读请求的状态。"
                  },
                  {
                    "front": "💿 读·未命中",
                    "back": "从磁盘把 16KB 数据页读进缓冲池（可能顺势预读相邻页），再返回数据。"
                  },
                  {
                    "front": "✍️ 写·改页",
                    "back": "先修改缓冲池中的页，并标记为<strong>脏页</strong>；同时把变更写入日志（WAL）。"
                  },
                  {
                    "front": "🌊 脏页刷盘",
                    "back": "由后台线程<strong>择机</strong>把脏页写回磁盘——不是提交时立刻写，用顺序写日志换随机写数据页。"
                  }
                ],
                "doneText": "🎉 四种剧本全看懂！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——侦探时间！生产库里这些操作，哪些会把缓冲池搅得鸡飞狗跳？"
              },
              "scene": "bufferpool-scan",
              "sfx": "搜查中!",
              "explain": "🕵️ 缓冲池最怕两件事：<strong>一次性的大量访问</strong>和<strong>内存不够用</strong>。<br>大扫描（全表 SELECT *、全表 UPDATE）会把大量只读一次就再也不用的页塞进缓冲池，挤占热点数据的位置，还会制造出成堆脏页，让后台刷脏突然忙起来；把 innodb_buffer_pool_size 调到超过物理内存，操作系统只能把内存换到 swap——这时候'内存数据库'变成了'磁盘数据库'，性能断崖式下跌。<br>⚠️ 别误会：改进版 LRU 的 old 段能挡住相当一部分冲击，所以'一次全表扫描就把热点全冲走'是夸张说法；但在高并发 + 大表场景下，它依然是实打实的风险，所以慢查询治理和缓冲池监控一个都不能少。",
              "interaction": {
                "type": "find",
                "question": "🕵️ 揪出所有会让缓冲池失效或抖动的操作",
                "rows": [
                  {
                    "text": "高峰期对大表跑 SELECT *，几百万行一次灌进缓冲池",
                    "hit": true
                  },
                  {
                    "text": "对大表执行全表 UPDATE，几乎所有数据页都要改一遍",
                    "hit": true
                  },
                  {
                    "text": "innodb_buffer_pool_size 设得比物理内存还大，机器开始用 swap",
                    "hit": true
                  },
                  {
                    "text": "热点订单走主键等值查询，命中率高、页面复用充分",
                    "hit": false
                  },
                  {
                    "text": "把缓冲池设为物理内存的 50%~75%，让热点数据常驻",
                    "hit": false
                  }
                ],
                "wrongText": "哔——这一条其实是好习惯，换一条看看",
                "doneText": "🎉 全揪出来了！缓冲池最怕'一次性大量访问 + 内存不够'。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——更新一行数据时，InnoDB 第一时间修改的是什么？"
              },
              "scene": "bufferpool",
              "sfx": "想一想!",
              "explain": "❓ <strong>收个尾，记住这条铁律</strong>：<strong>改数据先改内存页，写日志保证不丢，落盘交给后台</strong>。<br><br>🎯 <strong>它解释了一个常见现象</strong>：执行完 <code>UPDATE</code> 事务秒回，但用 <code>iostat</code> 看磁盘却一点都不忙——很多人因此担心'数据还没落盘，是不是不安全'。<br>真相是：提交时落盘的是<strong>顺序写的 Redo Log</strong>（很快），数据页由后台择机刷（随机写，较慢）。只要日志在，数据就不会丢，所以'提交成功'是可信的。<br><br>✅ <strong>一句话记住</strong>：'提交成功' ≠ '数据已写进数据文件'，而是 = '变更已写进 Redo Log 并按要求落盘'。<br>⚠️ 反过来也别误会：脏页不是'越早刷干净越好'——刷得太勤会把随机写压力顶到前台，反而拖慢正常请求。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 更新数据时，第一时间修改的是？",
                "options": [
                  "内存缓冲池里的页（标记为脏页）",
                  "磁盘上的数据文件",
                  "备份文件"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "为什么 InnoDB 先写日志（Redo Log）比直接写数据页快？",
              "options": [
                "日志是顺序追加写，数据页是随机读写",
                "日志写在内存里，永远不落盘",
                "日志会先压缩数据"
              ],
              "answer": 0,
              "explanation": "磁盘上顺序写远快于随机写。WAL（Write-Ahead Logging）先把变更顺序写入日志保证不丢，脏页再异步刷盘——用'顺序写'换'随机写'是数据库性能的基石。"
            },
            {
              "question": "缓冲池越大查询就一定越快吗？",
              "options": [
                "通常命中率更高，但过大会挤占系统内存，需要合理设置",
                "一定越快，越大越好",
                "没有任何影响"
              ],
              "answer": 0,
              "explanation": "缓冲池是'数据页缓存'，越大命中率通常越高（生产常设为物理内存的 50%~75%）；但要给操作系统和其它进程留空间——并不是无限收益。"
            },
            {
              "question": "一次全表扫描会不会把缓冲池里的热点数据全部冲掉？",
              "options": [
                "不会全冲掉：改进版 LRU 的 old 段吸收了这类一次性访问",
                "会，热点数据必然被全部淘汰",
                "不会，因为全表扫描根本不进缓冲池"
              ],
              "answer": 0,
              "explanation": "InnoDB 把 LRU 链表分成 young（约 5/8）和 old 两段，新页先进 old 段头部，被再次访问才升入 young。全表扫描读进来的页大多只在 old 段待一会儿就被淘汰，热点页基本不受影响。但大扫描仍会带来刷脏压力和内存挤占，不能放任。"
            },
            {
              "question": "事务提交成功后，数据一定已经写进磁盘的数据文件了吗？",
              "options": [
                "不一定：通常只保证变更已写入 Redo Log 并按要求落盘",
                "一定，提交就等于写数据文件",
                "一定，提交会清空缓冲池"
              ],
              "answer": 0,
              "explanation": "提交的语义是'日志持久化'（配合 innodb_flush_log_at_trx_commit 等参数），脏页由后台择机刷盘。所以宕机后可能看到'数据文件还是旧的'，但重启重放 Redo Log 就能把已提交的修改补回来。"
            }
          ]
        },
        {
          "id": "3-3",
          "title": "为什么是 B+ 树",
          "icon": "🌲",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "1 亿条数据，二叉树要 ~27 次磁盘 IO；B+ 树只要 2~3 次！同样的数据，差距为什么这么大？"
              },
              "scene": "bptree-height",
              "sfx": "对比!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🌲 B+树要点"
              },
              "explain": "🤔 <strong>先看一个数字</strong>：1 亿条数据，如果用<strong>二叉搜索树</strong>来组织，树高约 log₂(1亿) ≈ <strong>27 层</strong>。磁盘按<strong>页</strong>读，每下一层≈一次随机 IO，就要 <strong>27 次随机 IO</strong>；机械盘每次约 10 毫秒 → 查一条要 <strong>270 毫秒</strong>。而 B+ 树只要 <strong>3 层</strong>，约 30 毫秒——<strong>快了将近 10 倍</strong>。<br>这 10 倍不是靠算法更聪明，而是靠一个朴素的事实：<strong>磁盘 IO 的最小单位是页，不是行</strong>。<br><br>📐 <strong>把候选摆出来对比</strong>：<br>🔹 <strong>二叉搜索树</strong>：每节点只分 2 叉 → 27 层，27 次随机 IO；<br>🔹 <strong>红黑树 / AVL</strong>：平衡做得好，但仍是'二叉'，上亿数据照样深；<br>🔹 <strong>哈希表</strong>：等值查询 O(1)，可惜键间无序，<strong>范围查询直接歇菜</strong>；<br>🔹 <strong>B+ 树</strong>：一个页塞下几百个键，3 层覆盖上千万行——这就是'矮胖'的胜利。<br><br>🎯 <strong>一句话记住</strong>：<strong>树越矮，IO 越少</strong>；数据库索引的胜负手，从来不是'比较次数'，而是'磁盘访问次数'。",
              "stage": [
                {
                  "type": "text",
                  "content": "🌳 二叉树：每层只分 2 叉 → 树很高",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🌲 B+ 树：一个节点塞几百个键 → 树很矮",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📖 叶子节点串成链表 → 范围查询顺着扫",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "深入设计 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "B+ 树的设计全为了'少走路'：非叶只带路，数据全在叶子且排好队。哔——下面几句话，你来把把关！"
              },
              "scene": "bptree-design",
              "sfx": "设计!",
              "explain": "① 非叶节点<strong>只存键</strong>不存数据 → 一页装几百个键 → 扇出大、树矮；<br>② 数据全部在<strong>叶子</strong>且有序；<br>③ 叶子之间有<strong>双向链表</strong>：BETWEEN、ORDER BY 顺序扫超快。反面教材：哈希索引等值查询 O(1)，但<strong>不支持范围查询</strong>。<br>📐 顺手算个量级：非叶页按 8 字节主键 + 6 字节页指针算能放约 1170 个键，1170 × 1170 × 16 ≈ <strong>2200 万行</strong>（一页约 16 行时）；行很窄时 1170³ ≈ <strong>16 亿</strong>——'三层扛千万到上亿'是合理量级，具体看行大小与页利用率。<br>⚠️ 但外面流传的说法未必都对，比如'键存了两遍太浪费'、'索引一定比全表扫描快'（条件命中大部分行时，顺序全表扫描反而更省）、'叶子存的一定是整行'（要看索引类型：聚簇索引的叶子才是整行，二级索引的叶子是'索引列 + 主键值'）。<br>👇 <strong>检验一下</strong>：下面几句话，分别判断对错——错误的都是真实常见的误解，判定后记得看解析。",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "B+ 树的非叶节点只存键不存数据，所以一页能装下更多键，树更矮、IO 更少。",
                    "answer": true,
                    "why": "非叶节点只做导航，一页能容纳几百个键，扇出大、树就矮，磁盘 IO 随之更少。"
                  },
                  {
                    "text": "哈希索引等值查询 O(1)，比 B+ 树更适合当数据库的主索引。",
                    "answer": false,
                    "why": "哈希把键打散，键之间无序：范围查询、ORDER BY、最左前缀统统歇菜。数据库主索引要的是有序的 B+ 树。"
                  },
                  {
                    "text": "B+ 树把每个键存了两遍（非叶一遍、叶子一遍），纯属浪费空间。",
                    "answer": false,
                    "why": "非叶多存的那份键，换来大扇出和叶子链表——树更矮、范围扫描能顺着扫，这点空间花得非常划算。"
                  },
                  {
                    "text": "B+ 树的叶子节点之间用双向链表串着，范围查询不用回到树顶。",
                    "answer": true,
                    "why": "叶子有序且成链，找到起点后顺着链表扫就行，BETWEEN、ORDER BY 都受益。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "光看不算会——来走一遍真实的搜索路径：在 B+ 树里找数字 42。"
              },
              "scene": "bptree-search42",
              "sfx": "找42!",
              "explain": "🔢 模拟一次索引查找：从根出发，每到一层先比较一次，就能排除大量数据。把三步按先后顺序点出来！<br>每一步其实都在做同一件事：<strong>用一次页内比较，把候选范围缩小到原来的几百分之一</strong>。所以 B+ 树的查找代价 ≈ 树高，而不是数据行数。<br>⚠️ 别把'页访问次数'和'磁盘 IO 次数'完全划等号：根节点和上层非叶节点通常常驻缓冲池，命中时就是内存访问；真正可能落盘的，往往是最后访问的叶子页。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 在 B+ 树里查找 42，按真实路径顺序点击三步",
                "steps": [
                  "从根节点出发：42 在 30~60 之间 → 走中间分支",
                  "到达中间节点：42 在 40~45 之间 → 继续往右",
                  "到达叶子节点：命中 42，取出整行数据 ✓"
                ],
                "wrongText": "顺序不对——查找必须从根一路往下走",
                "doneText": "🎉 路径正确！整个过程只用了 3 次节点访问"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——把 B+ 树的零件装回去！一句话里挖了五个空，看你手稳不稳。"
              },
              "scene": "bptree-design",
              "sfx": "填空!",
              "explain": "🧩 把 B+ 树的几个关键词填回句子里：非叶只存<strong>键</strong>、叶子存数据并连成<strong>双向链表</strong>、一次磁盘读写的最小单位是默认 <strong>16KB</strong> 的页。<br>串成一句话记：<strong>非叶带路、叶子装货、链表排好队</strong>——带路的不装货，所以一页能带几百条路；装货的排好队，所以范围查询能顺着扫。<br>💡 再补一个对照：B 树把数据也存在非叶节点里，一个页能放的键就少得多，扇出小、树更高；而且它的叶子之间没有链表，范围扫描要反复回到上层，所以数据库索引最终选了 B+ 树而不是 B 树。",
              "interaction": {
                "type": "fill",
                "question": "🧩 把词块填进空格，拼出 B+ 树的设计说明",
                "sentence": [
                  "B+ 树的非叶节点只存",
                  "{0}",
                  "、不存数据行，所以一页能装下几百个键，扇出大、树很",
                  "{1}",
                  "；所有数据行都挂在",
                  "{2}",
                  "节点上，并用",
                  "{3}",
                  "串起来，范围查询能顺着顺序扫；InnoDB 里一次磁盘读写的最小单位是默认 ",
                  "{4}",
                  " 的数据页。"
                ],
                "options": [
                  "键值（索引列）",
                  "矮",
                  "叶子",
                  "双向链表",
                  "16KB"
                ],
                "answers": [
                  "键值（索引列）",
                  "矮",
                  "叶子",
                  "双向链表",
                  "16KB"
                ],
                "doneText": "🎉 拼得漂亮！非叶带路、叶子装货、链表排队。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——B+ 树成为数据库索引首选，最核心的两个原因是？"
              },
              "scene": "bptree",
              "sfx": "想一想!",
              "explain": "❓ 总结：B+ 树胜出的两个核心原因——<strong>矮胖</strong>（扇出大、树高低、IO 少）和 <strong>叶子有序 + 链表</strong>（范围查询、排序都能顺着扫）。<br>再补一个严谨的点：InnoDB 的索引不止 B+ 树一种。它还有<strong>自适应哈希索引（AHI）</strong>：引擎会观察热点页的等值查询模式，自动在内存里建哈希索引，把某些等值查找降到接近常数级；但它是引擎自己维护的，不能由用户直接指定，范围查询和排序仍然只能靠 B+ 树。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ B+ 树胜出的两个核心原因？",
                "options": [
                  "矮胖（扇出大、IO 少）+ 叶子链表支持范围查询",
                  "长得好看 + 实现最简单",
                  "省内存 + 不用磁盘"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "InnoDB 一个数据页默认多大？三层 B+ 树大约能索引多少数据？",
              "options": [
                "16KB；理论上千万级到十亿级",
                "1MB；几百万条",
                "512 字节；十万条"
              ],
              "answer": 0,
              "explanation": "InnoDB 默认页 16KB。假设主键 bigint（8 字节）+ 页指针 6 字节，一个非叶页约放 16KB/14B ≈ 1170 个键；1170 的 3 次方 ≈ 16 亿。实际因页利用率和数据行大小而不同，树高一般 2~4 层。"
            },
            {
              "question": "为什么哈希索引不能替代 B+ 树做数据库主索引？",
              "options": [
                "哈希只擅长等值查询，不支持范围查询和排序",
                "哈希太占内存",
                "哈希查询比 B+ 树慢"
              ],
              "answer": 0,
              "explanation": "哈希把键映射到桶：等值查询 O(1)，但键之间'无序'，WHERE age&gt;18、ORDER BY、最左前缀统统无能为力。所以数据库默认索引结构是有序的 B+ 树；哈希索引只在特定场景（如 Memory 引擎等值查）补充使用。"
            },
            {
              "question": "B+ 树的非叶节点为什么不存数据行？",
              "options": [
                "为了让一个页装下更多键，扇出更大、树更矮",
                "因为数据行太大存不下",
                "纯粹为了省磁盘空间，和性能无关"
              ],
              "answer": 0,
              "explanation": "非叶节点只带路：一页装的键越多，每个节点指向的孩子就越多（扇出大）。扇出大 → 树矮 → 一次查找经过的页少 → 磁盘 IO 少。代价是查找必须走到叶子才能拿到数据，而这个代价远小于多下一层带来的额外 IO。"
            }
          ]
        },
        {
          "id": "3-4",
          "title": "聚簇索引与非聚簇索引",
          "icon": "🔑",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "InnoDB 里，表本身就是一棵按主键排序的 B+ 树——叶子节点里装的不是'地址'，是完整的一行行数据！"
              },
              "scene": "clustered",
              "sfx": "见真身!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🔑 索引要点"
              },
              "explain": "这棵树就叫<strong>聚簇索引</strong>：<strong>数据即索引</strong>，一张表只有一棵。点一点三大特征！<br>准确说：InnoDB 把主键当作聚簇索引键，整张表的数据行就挂在主键 B+ 树的叶子节点上，所以'按主键查一行'就是'在树上找到那个叶子'。<br>💡 三个延伸事实：<br>① 建表时没写主键，InnoDB 会找一个非空唯一索引当聚簇键；一个都没有时，它会生成一个 6 字节的隐藏行 ID（DB_ROW_ID）来建树——所以'建表不设主键'不是好习惯；<br>② 主键最好近似递增：插入点集中在树的最右侧，页写满就开新页；<br>③ 主键越短越好，因为每个二级索引的叶子都要带上它。",
              "stage": [
                {
                  "type": "text",
                  "content": "🌳 叶子 = 完整数据行",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔀 主键乱序插入 → 页分裂变慢",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "1️⃣ 一张表只能有一个聚簇索引",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "二级索引呢？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "你建的其它索引叫'二级索引'：叶子只存 索引列 + 主键值——想拿整行？得'回表'。哔——接下来塔库要一口气背一段，盯紧最可疑的那句。"
              },
              "scene": "index-cover",
              "sfx": "回表!",
              "explain": "按 name 查整行 → 先在 name 索引查到<strong>主键值</strong> → 再回聚簇索引捞整行 = <strong>回表</strong>。<br>如果查询的列都在索引里（如只查 name 和 id）→ <strong>覆盖索引</strong>，免回表 ⚡；联合索引 <code>idx(a, b, c)</code> 讲<strong>最左前缀</strong>：只能从最左列开始连续匹配，只有 WHERE b = 1 用不上它。<br>⚠️ 两个严谨澄清：<br>① InnoDB 里严格来说<strong>没有独立的'非聚簇索引'结构</strong>：二级索引本质是'聚簇索引的辅助索引'，叶子存主键；真正'索引与数据分离、叶子存行地址'的是 MyISAM 的索引；<br>② 别把索引当糖豆：每个索引都要单独维护一棵 B+ 树，写多读少的表索引越多，写入放大约明显。<br>👇 <strong>实战检验</strong>：塔库的'背诵时间'到了——这段话里藏着一处错误，点出最可疑的那句。",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库拍着胸脯，一口气说了下去——",
                "segments": [
                  {
                    "text": "聚簇索引的叶子节点存的是整行数据，"
                  },
                  {
                    "text": "所以一张表可以建好几个聚簇索引，想按哪种键排序就建哪种，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：数据只能按一种方式物理排序，聚簇索引一张表只有一个。InnoDB 用主键建它，没有主键就找非空唯一索引，再没有就生成隐藏的 DB_ROW_ID；想要别的'排序视图'，只能建二级索引。"
                  },
                  {
                    "text": "而二级索引的叶子里只存'索引列 + 主键值'，",
                    "check": true,
                    "why": "这句正确：正因为叶子不带整行，用二级索引查别的列才要拿着主键'回表'，再回聚簇索引多降一次 B+ 树。"
                  },
                  {
                    "text": "查询要用的列如果恰好全在索引里，就成了覆盖索引，连回表都省了。",
                    "check": true,
                    "why": "这句没错：覆盖索引不是新的索引类型，而是'需要的列全在索引里'的状态，优化器不再回表，EXPLAIN 的 Extra 会显示 Using index。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "来当一次查询规划师！这几个查询，哪些能靠覆盖索引免回表，哪些必须回表？"
              },
              "scene": "index-cover",
              "sfx": "分类!",
              "explain": "🗂️ 已知：users 表有二级索引 <code>idx_name(name)</code>，InnoDB 的二级索引叶子存 <strong>索引列 + 主键值</strong>。<br>判断下面每条查询是『覆盖索引』还是『需要回表』。<br>判断方法很简单：<strong>把查询要用的列列出来，看它们是否全都在索引里</strong>——全在 = 覆盖，缺一列（比如 email，或者 SELECT *）就要回表。<br>注意 <code>SELECT id</code> 也算覆盖：id 是主键，天然就在二级索引的叶子里。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把每条查询放进正确的筐",
                "items": [
                  "SELECT id FROM users WHERE name='小明'",
                  "SELECT email FROM users WHERE name='小明'",
                  "SELECT id FROM users WHERE name LIKE '小%'",
                  "SELECT * FROM users WHERE name='小明'"
                ],
                "buckets": [
                  "✅ 覆盖索引（不回表）",
                  "🔁 需要回表"
                ],
                "answers": [
                  0,
                  1,
                  0,
                  1
                ],
                "wrongText": "想想索引叶子里到底存了哪些列"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——同一条数据，走不同的索引，代价到底差多少？拨一下开关，数字自己会说话。"
              },
              "scene": "clustered-cost",
              "sfx": "拨一拨!",
              "explain": "🎚️ 同一条数据，走不同的索引，代价差多少？拨动开关看看。<br><strong>聚簇索引查主键</strong>：一次 B+ 树下降，叶子就是整行 → 大约 2~3 次页访问。<br><strong>二级索引查整行</strong>：先走二级索引找到主键，再回聚簇索引查一次 → 页访问次数接近翻倍。<br>这就是为什么'减少回表'是高并发查询优化的第一招：把常用列做成联合索引，让查询变成覆盖索引。<br>⚠️ 但别矫枉过正：为了覆盖而堆一个十几列的宽索引，会让索引本身变得很大、写入更慢，还容易踩到最左前缀的坑。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 切换索引类型，看一次查询要读多少次页",
                "states": [
                  {
                    "label": "🔑 聚簇索引查主键",
                    "metric": "页访问：约 2~3 次",
                    "time": "一次 B+ 树下降，叶子即整行",
                    "note": "SELECT * FROM users WHERE id = 5：聚簇索引的叶子节点就是完整数据行，找到即拿到，不需要第二次查找。",
                    "tone": "good"
                  },
                  {
                    "label": "🔖 二级索引查整行",
                    "metric": "页访问：约 4~6 次（索引树 + 回表）",
                    "time": "先走二级索引，再按主键回聚簇索引",
                    "note": "SELECT * FROM users WHERE name = '小明'：name 索引的叶子只有『name + 主键 id』，必须拿着 id 再回聚簇索引查一次——这就是回表。让查询列全部落在索引里（覆盖索引），这一步就能省掉。",
                    "tone": "bad"
                  }
                ],
                "doneText": "🎉 一次回表，代价近乎翻倍——现在你明白优化器为什么在乎它了。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——email 有二级索引，SELECT * FROM users WHERE email='a@b.com' 的执行路径是？"
              },
              "scene": "clustered",
              "sfx": "想一想!",
              "explain": "❓ email 有二级索引时，<code>SELECT * FROM users WHERE email = 'a@b.com'</code> 的执行路径是：先在 email 索引里找到主键值，再拿主键回聚簇索引取整行——这就是回表。<br>如果 SQL 改成 <code>SELECT id, email FROM users WHERE email = 'a@b.com'</code>，需要的列都在 email 索引叶子里，就不用回表了。<br>⚠️ 额外提醒：二级索引不保证唯一时，同一个 email 可能对应多行，回表要一行一行来，代价随命中行数线性上涨。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 通过二级索引查整行的路径是？",
                "options": [
                  "email 索引查到主键 → 回表取整行",
                  "直接全表扫描",
                  "email 索引叶子直接存整行，无需回表"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "为什么推荐用自增 ID 做 InnoDB 主键，而不是随机 UUID？",
              "options": [
                "自增插入总在树最右侧追加，避免随机插入引发的页分裂",
                "UUID 太长存不下",
                "自增主键会自动加密"
              ],
              "answer": 0,
              "explanation": "聚簇索引按主键排序。自增主键新行永远插在最后，页写满就开新页；随机 UUID 的插入点全树乱跳，频繁触发页分裂和数据搬移，写入性能与空间利用率双双变差。"
            },
            {
              "question": "覆盖索引（Covering Index）指的是？",
              "options": [
                "查询需要的列全部包含在索引里，不必回表取整行",
                "索引覆盖了表里所有列",
                "索引被复制了一份做备份"
              ],
              "answer": 0,
              "explanation": "覆盖索引不是一种特殊的索引类型，而是'这条查询恰好用得上索引里的全部列'的状态。执行计划里 Extra 出现 Using index 就是覆盖索引生效、没有回表。"
            },
            {
              "question": "关于 InnoDB 的'非聚簇索引'，下面哪种说法更严谨？",
              "options": [
                "InnoDB 的二级索引叶子存主键值；真正'叶子存行地址'的非聚簇索引是 MyISAM",
                "InnoDB 和 MyISAM 的索引都是聚簇索引",
                "二级索引的叶子里存着完整的数据行"
              ],
              "answer": 0,
              "explanation": "术语容易混：InnoDB 的二级索引（也叫辅助索引）叶子是『索引列 + 主键值』，取整行还得回表，并不是把数据行和索引分开存；MyISAM 的索引才是典型的非聚簇索引——索引文件与数据文件分离，叶子存的是数据行的地址。"
            }
          ]
        },
        {
          "id": "3-5",
          "title": "Redo Log 与 Undo Log",
          "icon": "🧾",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "如果数据改到一半宕机——内存里的脏页全丢了！数据库凭什么敢说'提交成功就不会丢'？"
              },
              "scene": "redoundo",
              "sfx": "双保险!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🧾 日志区"
              },
              "explain": "靠两本'小账本'：<strong>Redo Log</strong>（我打算怎么改）和 <strong>Undo Log</strong>（改之前长什么样）。<br>更准确的分工是：<br>📕 <strong>Redo Log</strong> 是 InnoDB 引擎层的<strong>物理逻辑日志</strong>（记录'哪个页做了什么修改'），大小固定、循环写，提交时按策略落盘，专用于崩溃恢复；<br>📗 <strong>Undo Log</strong> 是<strong>逻辑日志</strong>（记录反向操作：插入对应删除、更新对应改回旧值），存放在回滚段里，用于事务回滚和 MVCC 快照读。<br>💡 关键设计叫 <strong>WAL（Write-Ahead Logging）</strong>：先写日志再写数据页，用'顺序写小日志'换'随机写大页'。",
              "stage": [
                {
                  "type": "text",
                  "content": "📕 Redo Log：重做——崩溃后重放恢复",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📗 Undo Log：撤销——回滚 + 读旧版本",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧾 WAL：先写日志，慢慢刷数据页",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "看它们怎么救场 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "Redo 保'不丢'，Undo 保'能退'——一个负责前进，一个负责后退。哔——撑起这套打法的设计原则有个缩写，你写写看！"
              },
              "scene": "redo-undo-job",
              "sfx": "分工!",
              "explain": "<strong>Redo Log</strong>：顺序写、循环复用——write pos 追着 checkpoint 跑，写满就得先推进检查点才能继续；提交时日志已落盘 → 崩溃重启'重放'补上没刷盘的数据（保证 D 持久性）。<br><strong>Undo Log</strong>：记录修改前的旧值 → ROLLBACK 时恢复（保证 A 原子性），MVCC 快照读也靠它找到旧版本。<br>再补两块拼图：<br>① <strong>binlog 在 Server 层</strong>，是归档日志，用于主从复制和数据找回，和引擎层的 Redo 不是一回事；<br>② 两者靠<strong>内部两阶段提交</strong>保持一致：写 Redo（prepare）→ 写 binlog → 提交 Redo（commit）；崩溃恢复时，处于 prepare 的 Redo 若对应 binlog 完整就提交，否则回滚。<br>👇 <strong>检验一下</strong>：先写日志、再写数据页，用'顺序写小日志'换'随机写大页'——这套设计原则的英文缩写是？",
              "interaction": {
                "type": "input",
                "question": "先写日志、再写数据页，用'顺序写小日志'换'随机写大页'——这套设计原则的英文缩写是？",
                "accept": [
                  "WAL"
                ],
                "placeholder": "往里写…",
                "hint": "它是 Write-Ahead Logging（日志先行）的首字母缩写，一共 3 个字母。",
                "doneText": "🎉 对，WAL（Write-Ahead Logging）——日志先行，数据殿后。"
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "confused",
                "dialogue": "机房突然断电！恢复方案有两条路，你押哪条？"
              },
              "scene": "wal-order",
              "sfx": "断电!",
              "explain": "🛤️ 提交事务时，『写数据页』和『写日志』的先后顺序，决定了断电后能不能恢复。选一条路线，看看真的断电时会发生什么。<br>顺带回答一个常见疑问：'先写日志，那数据页什么时候写？'——由后台线程择机刷。刷之前宕机，重启时按日志重放就能补回来；反过来，如果数据页先刷、日志还没写，宕机后这个页就处于'没人知道该怎么修'的状态：既没有日志可重放，也没有日志可撤销。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 崩溃恢复大考：哪种写入顺序能保住已提交的数据？",
                "options": [
                  {
                    "label": "路线A：先把数据页写回磁盘，再写日志",
                    "tone": "bad",
                    "result": "😱 若在『写数据页』中途断电：日志还没来得及记录，磁盘上的数据页<strong>半新半旧</strong>——数据库无法判断该重做还是撤销，数据可能损坏。"
                  },
                  {
                    "label": "路线B：先写 Redo 日志并落盘，数据页慢慢刷（WAL）",
                    "tone": "good",
                    "result": "✅ 断电重启后：按日志重放——已提交的变更补上，未提交的撤销。这就是 <strong>WAL（Write-Ahead Logging）</strong>：日志先行，数据殿后。"
                  }
                ],
                "wrongText": "这条路线在断电时会出问题，换一条试试",
                "doneText": "🎉 WAL 铁律掌握：先写日志，再写数据！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——重启之后，数据库到底按什么顺序把自己救回来？四步，排错了数据就回不来。"
              },
              "scene": "crash-recovery",
              "sfx": "恢复中!",
              "explain": "🧯 崩溃恢复不是'把日志从头读一遍'这么简单。InnoDB 启动时会读 Redo Log，从检查点位置开始前滚，先让数据页回到'日志记录的最终状态'（连未提交事务的修改也会先重做一遍），再用 Undo 把未提交的事务撤销。<br>⚠️ 顺序不能反：<strong>必须先重做、再回滚</strong>。因为崩溃那一刻无法确定哪些修改已经落到数据页上，干脆按日志全部重做（重做是幂等的），让磁盘状态与日志一致，然后才有依据地回滚未提交事务。<br>💡 再补一句：Redo 是循环写的，检查点会随脏页刷盘不断推进，所以恢复只需要从检查点开始重放，不必读完整本日志——日志文件小，恢复也快。",
              "interaction": {
                "type": "sequence",
                "question": "🧯 崩溃恢复四步走，按真实顺序点击",
                "steps": [
                  "启动时读取 Redo Log，从检查点（checkpoint）位置开始扫描",
                  "前滚：重放 Redo，把已记录但没刷盘的修改补回数据页（未提交事务的修改也先重做）",
                  "回滚：用 Undo Log 把崩溃时未提交的事务全部撤销",
                  "数据到达一致状态，恢复完成，开始对外提供服务"
                ],
                "wrongText": "顺序不对——恢复要先把该做的做完，再撤不该做的",
                "doneText": "🎉 先重做、再回滚，恢复顺序完全正确！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——数据库崩溃重启后，靠什么恢复已提交但还没刷盘的数据？"
              },
              "scene": "redoundo",
              "sfx": "想一想!",
              "explain": "❓ 崩溃重启后，恢复已提交但未刷盘的数据靠的是<strong>重放 Redo Log</strong>。<br>Undo Log 负责的是另一件事：把崩溃时还没提交的事务撤销掉，以及支撑 MVCC 读取旧版本。<br>⚠️ 一个容易忽略的细节：Redo 是循环写的，它不可能保留全部历史——只要一个脏页已经刷盘、对应日志不再需要，检查点就会向前推进、腾出空间。所以恢复是从检查点开始重放，而不是从头读完整本日志。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 崩溃重启后靠什么恢复数据？",
                "options": [
                  "重放 Redo Log",
                  "读取 Undo Log",
                  "重新执行用户的所有 SQL"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "Redo Log 和 binlog 是一回事吗？",
              "options": [
                "不是：Redo 在 InnoDB 引擎层用于崩溃恢复；binlog 在 Server 层用于归档和主从复制",
                "是同一个东西的两个名字",
                "binlog 是 Redo 的备份文件"
              ],
              "answer": 0,
              "explanation": "职责不同：Redo 保证'本机崩溃不丢'，是循环写的物理日志；binlog 记录所有变更、用于主从同步与数据找回。两者通过'内部两阶段提交'保持一致。"
            },
            {
              "question": "Undo Log 在 MVCC（多版本并发控制）中的作用是？",
              "options": [
                "保存数据的历史版本，让快照读能读到旧版本",
                "加快磁盘写入速度",
                "记录用户登录日志"
              ],
              "answer": 0,
              "explanation": "每行数据都有隐藏的'版本链'（事务 ID + 回滚指针），旧版本就存在 Undo Log 里。快照读沿版本链找到'对当前事务可见'的版本，实现读写互不阻塞。"
            },
            {
              "question": "崩溃恢复时，为什么必须'先重做（Redo）再回滚（Undo）'？",
              "options": [
                "因为崩溃时无法确定哪些修改已落到数据页上，先按日志全部重做让状态一致，才有依据回滚",
                "因为 Undo Log 比 Redo Log 小",
                "因为回滚会让 Redo Log 失效"
              ],
              "answer": 0,
              "explanation": "重做是幂等的：把日志里记录的修改全部重放一遍，磁盘状态就与日志一致（包含未提交事务的修改）。此时再用 Undo 精确撤销未提交事务，恢复结果才是确定的。顺序反过来，撤销的依据就不完整。"
            }
          ]
        },
        {
          "id": "3-6",
          "title": "锁机制与 MVCC",
          "icon": "📸",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "你在读文章，别人同时在改文章——不加锁会读错，加锁又太慢。MVCC 的答案：给数据'拍快照'，各读各的版本！"
              },
              "scene": "mvcc",
              "sfx": "快照!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "📸 快照区"
              },
              "explain": "<strong>快照读</strong>（普通 SELECT）：读事务开始时的快照，不加锁、不阻塞。<br><strong>当前读</strong>（UPDATE / SELECT … FOR UPDATE）：读最新版本并加锁。<br>为什么普通 SELECT 能不加锁？因为 InnoDB 给每行数据藏了隐藏列：<strong>DB_TRX_ID</strong>（最后修改它的事务 ID）和 <strong>DB_ROLL_PTR</strong>（指向 Undo Log 中旧版本的回滚指针）。一行数据就这样串成一条<strong>版本链</strong>，读的时候按规则挑一个'对我可见'的版本即可。<br>至于'哪些版本可见'，由 <strong>ReadView</strong> 决定。",
              "stage": [
                {
                  "type": "text",
                  "content": "📸 普通 SELECT → 快照读（MVCC）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔒 UPDATE / FOR UPDATE → 当前读（加锁）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🤝 读不阻塞写，写不阻塞读",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "锁有几种？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "行锁锁一行，间隙锁锁'空隙'，加起来就是 Next-Key 锁——幻读的克星。哔——这段有点绕，换你讲给我听。"
              },
              "scene": "lock-granularity",
              "sfx": "上锁!",
              "explain": "锁的粒度：<strong>行锁</strong>（Record）→ <strong>间隙锁</strong>（Gap，锁区间防幻读）→ <strong>Next-Key 锁</strong>（行 + 它前面的间隙）。<br>MVCC 版本链：每行藏着 事务 ID + 回滚指针；<strong>ReadView</strong> 决定'哪些版本我能看见'——它记录了生成那一刻的<strong>活跃事务 ID 列表 m_ids</strong>、最小活跃 ID、下一个待分配 ID 和'我自己'的事务 ID。可见性规则：版本的事务 ID 比最小活跃还小 → 可见；落在活跃列表里（还没提交）→ 不可见；大于等于下一个待分配 ID（生成之后才开始的）→ 不可见；不可见就顺着回滚指针找上一个版本。<br>RC：每次 SELECT 生成 ReadView；RR：第一次生成后复用（MySQL 默认）。<br>⚠️ 所以 RC 和 RR 的差别不在'有没有版本链'，而在<strong>ReadView 什么时候生成</strong>：RC 每次快照读都新建（能看见别人刚提交的），RR 只建一次并复用（看不见）。<br>👇 <strong>检验一下</strong>：把这个差别用你自己的话讲出来。",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：RC 和 RR 都靠 MVCC，为什么一个能看见别人刚提交的数据、另一个不能？",
                "reference": "两者的版本链机制完全一样，差别全在 ReadView 的生成时机：RC 每次快照读都新建一个 ReadView，所以别人刚提交的版本马上对它可见；RR 只在第一次快照读时生成并全程复用，事务期间别人提交的新版本一律不可见，所以能可重复读。想看最新数据就得用当前读（加锁读）。",
                "keywords": [
                  "ReadView",
                  "时机",
                  "可见",
                  "提交",
                  "复用"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "两种读法到底差在哪？拨动开关，看看同一时刻它们的行为。"
              },
              "scene": "readview-compare",
              "sfx": "对比!",
              "explain": "🎚️ 场景：事务 T1 读『余额』，同时事务 T2 正在执行 <code>UPDATE 余额 = 90</code>（尚未提交）。切换开关，对比两种读法的反应。<br>关键结论：<strong>快照读不加锁、不等待</strong>，它读的是自己 ReadView 允许的那个旧版本；<strong>当前读必须排队</strong>，它读最新已提交版本并加锁，可能要一直等到对方提交或回滚（默认最长等 innodb_lock_wait_timeout = 50 秒）。<br>💡 这正是 MVCC 的价值：让'读'和'写'不互相堵车，把并发度拉起来。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 切换读法，看它面对『别人正在改这一行』时的态度",
                "states": [
                  {
                    "label": "📸 快照读（普通 SELECT）",
                    "metric": "读到：余额 = 100",
                    "time": "0 等待，不阻塞",
                    "note": "读的是事务开始时的旧版本（MVCC 版本链），完全不受 T2 影响，也不阻塞 T2",
                    "tone": "good"
                  },
                  {
                    "label": "🔒 当前读（FOR UPDATE）",
                    "metric": "读到：必须等锁释放",
                    "time": "阻塞中…直到 T2 提交/回滚",
                    "note": "读最新已提交版本并加锁——拿到的是最新真相，但要付出等待的代价",
                    "tone": "bad"
                  }
                ],
                "doneText": "🎉 两种读法，一目了然！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——秒杀现场！两个请求同时抢最后一件库存，你打算怎么守住它？"
              },
              "scene": "mvcc-lock",
              "sfx": "抢库存!",
              "explain": "🛤️ 读-改-写（先查出来、算一算、再写回去）是最容易出并发的写法。<br>RR 隔离级别下，普通 SELECT 是快照读，两个事务可能都读到库存 = 10，各自算出 9 写回去，结果少卖一件——这叫<strong>丢失更新</strong>。<br>两种正确姿势：<br>① 把'读'升级成当前读（SELECT … FOR UPDATE），让这一行从读到写被同一个事务锁住；<br>② 干脆不先读：用一条 <code>UPDATE stock = stock - 1 WHERE id = ? AND stock &gt;= 1</code>，让数据库在行锁保护下原子自减。<br>⚠️ 注意别用'本机 synchronized / 单机锁'：服务多实例部署时，每台机器的锁互不相识。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 两个请求同时抢最后一件库存，你选哪个方案？",
                "options": [
                  {
                    "label": "A：把隔离级别降到 READ UNCOMMITTED，让读不被阻塞",
                    "tone": "bad",
                    "result": "💥 脏读：读到了别人还没提交、甚至可能马上回滚的数据。为了'快'放弃了正确性，超卖照样发生，还会读到根本不存在的库存。"
                  },
                  {
                    "label": "B：读的时候用 SELECT … FOR UPDATE 锁住这一行再改；或者直接 UPDATE stock = stock - 1 WHERE id = ? AND stock &gt;= 1",
                    "tone": "good",
                    "result": "✅ 两种都是把『读-改-写』串行化的正确做法：前者用当前读把整行从读到写锁住，后者把判断和扣减合并成一条原子语句，由行锁保证互斥。"
                  },
                  {
                    "label": "C：放进一个事务里就不管了——反正有事务保证",
                    "tone": "bad",
                    "result": "🌀 事务保证的是原子性（要么全成功要么全失败），不是『读-改-写』之间的互斥。RR 下快照读照样读到旧值，两个事务各写各的，丢失更新照样发生。"
                  },
                  {
                    "label": "D：在应用里加 synchronized 锁住这段代码",
                    "tone": "bad",
                    "result": "🖥️ 单机锁只在'一个进程'里有效。服务部署了 3 个实例，就是 3 把互不相识的锁，请求分散到不同机器上，库存依然会被同时扣。分布式场景要用数据库锁或分布式锁。"
                  }
                ],
                "wrongText": "这个方案挡不住并发，再想想：要么让读变成当前读，要么让扣减变成一条原子语句",
                "doneText": "🎉 读-改-写要么『加锁串行化』，要么『交给数据库一条原子语句』！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——普通 SELECT 会阻塞在'被别人 UPDATE 锁住的行'上吗？"
              },
              "scene": "mvcc",
              "sfx": "想一想!",
              "explain": "❓ 快照读遇到被锁的行不会阻塞：它读的是 Undo Log 里的旧版本，不加锁、不等待。<br>真正会等锁的是当前读（UPDATE / DELETE / SELECT … FOR UPDATE）。<br>⚠️ 再补一个严谨点：RR 靠 MVCC + 间隙锁（Next-Key Lock）能在很大程度上避免幻读，但它<strong>不等于完全串行化</strong>——如果事务里先做快照读、后面又做当前读（比如 SELECT 之后 UPDATE 同一区间），当前读看到的是最新数据，可能出现'两次读结果不一致'的观感。要绝对串行，得用 SERIALIZABLE，代价是并发度大幅下降。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 快照读遇到被锁的行会怎样？",
                "options": [
                  "不会阻塞：它读旧版本，不加锁不等待",
                  "一直等到锁释放",
                  "直接报错退出"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "InnoDB 的'可重复读'下，两次普通 SELECT 结果为什么一样？",
              "options": [
                "第一次快照读生成的 ReadView 全程生效，期间提交的新版本对它不可见",
                "第二次查询走了缓存",
                "数据库偷偷给行加了锁"
              ],
              "answer": 0,
              "explanation": "RR 在第一次快照读时生成 ReadView，之后整个事务复用它——其它事务新提交的修改'看不见'，从而实现可重复读。想看最新数据要用当前读（加锁读）。"
            },
            {
              "question": "间隙锁（Gap Lock）主要用来防什么？",
              "options": [
                "幻读：阻止其它事务在区间内插入新行",
                "脏读：读了未提交的数据",
                "死锁"
              ],
              "answer": 0,
              "explanation": "幻读是'两次同条件查询行数变了'——本质是有人往查询区间插入了新行。间隙锁锁住记录之间的空隙，把插入挡在门外。注意：读已提交（RC）隔离级别下间隙锁基本失效。"
            },
            {
              "question": "唯一索引上做等值查询并且命中一行时，Next-Key 锁会怎样？",
              "options": [
                "退化成记录锁，只锁住这一行（不再需要间隙锁）",
                "依然锁住整个区间",
                "直接升级成表锁"
              ],
              "answer": 0,
              "explanation": "Next-Key 锁是'记录锁 + 间隙锁'的组合。当等值查询在唯一索引上命中唯一一行时，不可能再有新行插进这个'唯一值'的位置，间隙锁就没有必要了，InnoDB 会把它退化成记录锁——这也是它能少锁一点、并发更好的原因。"
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "第4章：NoSQL 与缓存",
      "knowledgePoints": [
        {
          "id": "4-1",
          "title": "为什么需要 NoSQL",
          "icon": "🧩",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "购物车、聊天记录、社交关系……这些数据硬塞进'表格'会很别扭。NoSQL 家族：不是所有数据都该住表格式公寓！"
              },
              "scene": "nosql",
              "sfx": "四大家族!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "🧩 家族合影"
              },
              "explain": "🤔 先想一个场景：手机 50 个参数、拖鞋 3 个，硬塞进表格会怎样？要么几十张表，要么一大堆 NULL。<br>关系库擅长'规整 + 事务'，可<strong>海量、灵活、高并发</strong>的场景各有更合适的家。点一点认识四大家族：<br>🔑 <strong>键值</strong>（Redis）：一键一值，读写极快，缓存/会话/计数器；<br>📄 <strong>文档</strong>（MongoDB）：一条记录就是一份类 JSON，字段可各不相同，商品/内容/画像；<br>🏛️ <strong>列族</strong>（HBase、Cassandra）：为海量写入和稀疏字段而生，日志/埋点；<br>🕸️ <strong>图</strong>（Neo4j）：节点和边才是主角，社交/推荐/风控关联。<br>一句话小结：<strong>NoSQL 是 Not Only SQL</strong>——不是不要 SQL，而是分工，不是替代。",
              "stage": [
                {
                  "type": "text",
                  "content": "🔑 键值：Redis（缓存/会话）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📄 文档：MongoDB（商品/内容）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🏛️ 列族：HBase（海量日志）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🕸️ 图：Neo4j（社交关系）",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "它们凭什么快？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——心动之前先冷静一下：换了 NoSQL 就能'又快又省心'吗？拿几句话练一练，判断对错。"
              },
              "scene": "nosql-tradeoff",
              "sfx": "取舍!",
              "explain": "🤔 换成 NoSQL 就能'又快又省心'吗？天下没有免费的午餐。<br>三大特点：🧱 <strong>灵活 Schema</strong>（字段随时加减）；📈 <strong>水平扩展</strong>（加机器就扩容）；🔄 多数走<strong>最终一致性</strong>。<br>代价很具体：JOIN 与强事务被弱化，复杂关联不如 SQL 顺手。<br>📐 把话说准：<strong>最终一致</strong>指'写入后各副本允许短暂不一致，停止写入后终将收敛'，绝不是'数据会丢'。它源自 <strong>BASE</strong>（基本可用 + 软状态 + 最终一致），是对 ACID 的工程妥协。<br>⚠️ 面试坑：<strong>CAP 不是三选二</strong>——P 是前提，真正要权衡的是'分区发生那一刻'选 C 还是 A。<br>🧠 小结：<strong>用 NoSQL，就要接受它的取舍。</strong><br>📋 光听结论不算懂——下面几句话，凭刚学的判断对错，每判完一句塔库都会告诉你为什么。",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "NoSQL 就是『不用 SQL』，上了 NoSQL 就可以彻底忘掉关系型数据库。",
                    "answer": false,
                    "why": "NoSQL = Not Only SQL（不只是 SQL）：强调的是换一种更合适的数据模型，MongoDB 和 Redis 都有自己的查询接口。它的定位是分工补位，不是全面替代。"
                  },
                  {
                    "text": "MongoDB 4.0+ 已支持多文档事务，『NoSQL 没有事务』的说法过时了。",
                    "answer": true,
                    "why": "MongoDB 4.0+ 支持多文档事务（4.2 起跨分片），Redis 也有 MULTI/EXEC 与 Lua 脚本；只是跨分片的强事务代价高，账务这类场景仍优先关系型数据库。"
                  },
                  {
                    "text": "最终一致的意思是写进去的数据会丢。",
                    "answer": false,
                    "why": "最终一致说的是'写入后各副本允许短暂不一致，停止写入后终将收敛'，不是'数据会丢'。会不会丢取决于持久化与复制策略，和一致性模型是两回事。"
                  },
                  {
                    "text": "CAP 定理是说分布式系统只能在 C、A、P 里三选二。",
                    "answer": false,
                    "why": "P（分区容忍）是分布式系统的前提，不是选项；真正要权衡的是分区发生那一刻选 C 还是 A。没有分区发生时，C 和 A 可以同时满足。"
                  }
                ]
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "光认识不行，要会用！来一场配对：什么数据，该住哪个家？"
              },
              "scene": "nosql-pick",
              "sfx": "选型!",
              "explain": "🤔 光背名字没用，选型是要付账的：选错了，轻则天天写兼容代码，重则上线后数据对不上。<br>📐 口诀只有一句：<strong>看数据形态 + 看一致性要求</strong>。点左边一种库，再点右边它最擅长的场景。<br>🎯 举三个真实落点：缓存会话放 Redis（微秒级），字段各异的商品放 MongoDB（一个文档装完），海量日志放 HBase（写得多、字段稀疏）。<br>🎯 反例也很常见：因为团队只会 MySQL，就把聊天记录、埋点日志、购物车全部塞进一张大表，再加一堆 JSON 字段——查询写不动，扩展也扩不了。<br>🧠 小结：现实中绝大多数系统是<strong>混合使用</strong>的——订单账务给关系库、商品详情给文档库、热点给 Redis、日志给列族；要避免的是'手里只有一把锤子'。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的数据库类型，配到右边它最擅长的场景",
                "pairs": [
                  [
                    "键值 KV（Redis）",
                    "缓存、会话、计数器——极速读写热数据"
                  ],
                  [
                    "文档（MongoDB）",
                    "字段灵活变化的内容，如商品目录"
                  ],
                  [
                    "列族（HBase）",
                    "海量写入的日志与埋点数据"
                  ],
                  [
                    "图（Neo4j）",
                    "社交关系、路径推荐等关系网络"
                  ]
                ],
                "wrongText": "这个场景不是它的主场，再想想"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——江湖上关于 NoSQL 的传言太多了，翻卡逐条破谣！"
              },
              "scene": "nosql-myth",
              "sfx": "破谣!",
              "explain": "🤔 传言为什么流行？因为每句都'有一点点影子'：早期 NoSQL 确实事务弱、确实多数最终一致——但技术会进化，用几年前的印象给今天的系统选型，是要出事的。<br>🃏 比如'NoSQL 没有事务'：MongoDB 4.0+ 早已支持多文档事务，Redis 也有 MULTI/EXEC 与 Lua 脚本，只是跨分片强事务代价高；再比如'NoSQL 一定比 MySQL 快'：按主键点查两者都在毫秒以内，NoSQL 的优势其实在灵活结构与水平扩展。<br>翻完四张卡，请抓住一个关键问题：<strong>这份数据最怕什么？</strong>怕不一致（账务）→ 关系库；怕结构僵（商品）→ 文档库；怕慢（热点）→ 键值库；怕写不下（日志）→ 列族库。<br>🧠 小结：<strong>选型看场景，不看名气。</strong>",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开四张卡，破除关于 NoSQL 的江湖传言",
                "cards": [
                  {
                    "front": "❓ 传言一：NoSQL 就是『不用 SQL』",
                    "back": "✅ 事实：NoSQL = <strong>Not Only SQL</strong>（不只是 SQL）。它强调的是'换一种更合适的数据模型'：MongoDB 有自己的查询语言，Redis 也有丰富的命令接口——不用关系模型，不等于不会查询。"
                  },
                  {
                    "front": "❓ 传言二：NoSQL 没有事务，不能存重要数据",
                    "back": "✅ 事实：早期多数 NoSQL 只保证单行/单文档原子性，但现在 MongoDB 4.0+ 支持<strong>多文档事务</strong>，Redis 有 MULTI/EXEC 和 Lua 脚本。只是跨分片的强事务代价高，账务这类场景仍然优先关系型数据库。"
                  },
                  {
                    "front": "❓ 传言三：最终一致 = 数据会丢",
                    "back": "✅ 事实：最终一致说的是'副本之间短暂不同步，但最终会收敛'，不是'写丢了'。会不会丢取决于持久化策略——比如 Redis 默认 AOF everysec 最多丢约 1 秒的写入，而只开 RDB 则可能丢掉最后一次快照之后的全部数据。"
                  },
                  {
                    "front": "❓ 传言四：NoSQL 一定比 MySQL 快",
                    "back": "✅ 事实：快慢取决于场景。按主键做点查，两者都在毫秒以内；NoSQL 的优势主要在灵活结构与水平扩展。关系库只要索引设计得当、SQL 写得对，性能一点也不弱。"
                  }
                ],
                "doneText": "🎉 四个传言全部破除！选型看场景，不看名气。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——'朋友的朋友'这种关系网络，最适合哪种数据库？"
              },
              "scene": "nosql",
              "sfx": "想一想!",
              "explain": "🤔 '朋友的朋友'这种关系，在关系库里要写多次自连接（表 JOIN 自己），层数一深，SQL 又长又慢；在图数据库里，它只是'从节点 A 沿边走出去两步'。<br>📐 图库真正的价值在<strong>多跳、深路径、关系密集</strong>的查询：社交推荐、反欺诈、知识图谱。<br>🎯 三跳以内的小数据量，关系库照样够用；真正拉开差距的是五跳、十跳的深路径查询。<br>⚠️ 但要严谨：数据量小的时候，关系库加好索引也跑得不错，别为'看起来先进'上重型组件——引入一套新中间件，运维和一致性成本都是真金白银。<br>🧠 小结：选型第一原则是<strong>先看清数据长什么样、查询怎么问，再决定用什么库</strong>——图数据库不是'更高级的数据库'，它只是把'关系'本身存成了一等公民，关系越密、跳数越深，它越划算。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ '朋友的朋友'关系网络用哪种库？",
                "options": [
                  "图数据库（如 Neo4j）",
                  "键值数据库",
                  "列族数据库"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "NoSQL 常说的'最终一致性'意味着？",
              "options": [
                "写入后各副本允许短暂不一致，但一段时间后会自动达成一致",
                "永远不一致，数据会丢",
                "数据不落盘"
              ],
              "answer": 0,
              "explanation": "为换取可用性与扩展性，多数分布式 NoSQL 默认最终一致：主从复制有毫秒~秒级延迟，但最终所有副本数据相同。转账这类强一致场景依然更适合关系型数据库。"
            },
            {
              "question": "CAP 定理的正确理解是？",
              "options": [
                "分布式系统里 P（分区容忍）是前提，分区发生时要在 C 与 A 之间取舍",
                "任何系统都只能同时满足 C、A、P 中的两个",
                "只要选了 AP 就一定会丢数据"
              ],
              "answer": 0,
              "explanation": "网络分区不是'要不要'的问题，而是分布式系统里迟早会发生的事实，所以 P 通常被视为前提。CAP 真正表达的是：当分区正在发生时，系统只能选择继续保证一致性（拒绝部分请求）或继续保证可用性（返回可能过期的数据）。没有分区时，C 和 A 可以同时满足。"
            },
            {
              "question": "BASE 里的 E（最终一致）和 ACID 里的 C（一致性）是一回事吗？",
              "options": [
                "不是：ACID 的一致性指事务前后数据仍满足约束，BASE 的最终一致指副本最终收敛",
                "是，同一个意思的两种说法",
                "BASE 的 E 指永远不返回错误"
              ],
              "answer": 0,
              "explanation": "ACID 的 C 强调'事务把数据库从一个合法状态带到另一个合法状态'（约束不被破坏）；BASE 的 E 强调'多副本之间最终会一致'。前者是单机事务语义，后者是分布式复制语义，经常被混为一谈。"
            }
          ]
        },
        {
          "id": "4-2",
          "title": "Redis 键值数据库",
          "icon": "⚡",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "happy",
                "dialogue": "Redis 住在内存里，一次操作微秒级——能扛每秒十万级请求！点一点它的五大金刚。"
              },
              "scene": "redis",
              "sfx": "超快!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "⚡ 五大金刚"
              },
              "explain": "🤔 10 万次/秒的请求，磁盘数据库扛得住吗？扛不住——所以要把数据放进内存。<br>📐 Redis 是<strong>内存数据库</strong>：数据放 RAM（所以快），磁盘只负责持久化。五种基础结构各有主场：<br>🔤 <strong>String</strong>：缓存对象、计数器（<code>INCR</code> 本身原子）、分布式锁（<code>SET k v NX EX 秒</code>）；<br>📜 <strong>List</strong>：简单消息队列、最新 N 条；🗂️ <strong>Hash</strong>：存对象，可只改一个字段；<br>🎯 <strong>Set</strong>：去重、共同好友（<code>SINTER</code>）；🏆 <strong>ZSet</strong>：排行榜、延迟队列。<br>🧠 小结：<strong>选错结构，代码和性能都差一个档次</strong>；另外单个 key 别太大，大 key 会拖慢持久化与主从同步。",
              "stage": [
                {
                  "type": "text",
                  "content": "🔤 String：缓存、计数器",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📜 List：消息队列、最新列表",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🗂️ Hash：存对象字段",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🎯 Set：去重、共同好友",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🏆 ZSet：排行榜（按分数排序）",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 5,
              "nextText": "为什么这么快？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——'简单就是快'这句口诀背下来了？我把快的原因连成一段话，里面混了一句错的——火眼金睛，把它指出来！"
              },
              "scene": "redis-fast",
              "sfx": "单线程!",
              "explain": "🤔 同样一份数据，放 MySQL 上每秒几千次就吃紧，Redis 能到十万级——差在哪？<br>① 纯<strong>内存</strong>操作；② 命令执行<strong>单线程</strong>，无锁竞争、无切换开销；③ <strong>IO 多路复用</strong>，一个线程管上万个连接；④ 数据结构高效。（6.0 起网络 IO 可多线程，但命令执行仍是单线程。）<br>⚠️ 副作用很致命：一条慢命令会卡住所有人。<code>KEYS *</code>、大 key 的 <code>HGETALL</code> 都可能让实例停顿，生产要用 <code>SCAN</code> 替代 KEYS。<br>🧠 小结：<strong>单线程 + 单条命令原子</strong>，所以 <code>INCR</code>、<code>SETNX</code> 天生适合做计数器和锁。<br>🕵️ 背口诀不算懂——塔库把这几条原因一口气连说了一遍，其中一句说漏了嘴，看你能不能当场抓住。",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库清了清嗓子，一口气说了下去——",
                "segments": [
                  {
                    "text": "Redis 每秒能扛十万级请求，"
                  },
                  {
                    "text": "首先因为它的数据主要放在内存里，读写不碰磁盘，",
                    "check": true,
                    "why": "这句站得住：内存读写比磁盘快几个量级，纯内存操作是 Redis 快的根基。"
                  },
                  {
                    "text": "其次命令执行是单线程的，没有锁竞争、没有上下文切换，",
                    "check": true,
                    "why": "也对：单线程指的是命令执行环节由一个线程串行完成，换来的是无锁和天然原子。"
                  },
                  {
                    "text": "所以整个 Redis 从网络收发到持久化，全都只有这一个线程在做，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：单线程只覆盖命令执行；网络 IO、RDB/AOF 持久化、过期清理等由其他线程或子进程承担，6.0 起连网络 IO 都可以配置成多线程。"
                  },
                  {
                    "text": "再加上 IO 多路复用，一个线程就能盯住上万个连接。"
                  }
                ]
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "五种数据结构各显神通，来做个填空：什么任务，派谁上场？"
              },
              "scene": "redis-types",
              "sfx": "填空!",
              "explain": "🤔 做排行榜，你会把分数拼成一个字符串存进 String，然后取出来排序吗？100 万用户，每次都要全量取出再排——又慢又费内存。<br>📐 选对结构就省事了：排行榜用 <strong>ZSet</strong>，<code>ZINCRBY</code> 加分、<code>ZREVRANGE</code> 取前 N 名，都是 O(log N)；<br>存用户对象用 <strong>Hash</strong>，只改一个字段不必整条重写；标签去重用 <strong>Set</strong>（<code>SADD</code> 天然去重）；简单队列用 <strong>List</strong>。<br>🧠 小结：<strong>别只把 Redis 当 String 缓存用</strong>；另外 List 做队列没有消费确认，消息不能丢时该用 Stream 或 Kafka。",
              "interaction": {
                "type": "fill",
                "question": "🧩 把数据结构填到它最合适的任务后面",
                "sentence": [
                  "游戏排行榜用",
                  "{0}",
                  "；存用户对象的多个字段用",
                  "{1}",
                  "；做标签去重用",
                  "{2}",
                  "；做简单消息队列用",
                  "{3}",
                  "。"
                ],
                "options": [
                  "ZSet 有序集合",
                  "Hash 哈希",
                  "Set 集合",
                  "List 列表"
                ],
                "answers": [
                  "ZSet 有序集合",
                  "Hash 哈希",
                  "Set 集合",
                  "List 列表"
                ],
                "doneText": "🎉 五大金刚，各就各位！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔——改价了！数据库更新了，缓存里还躺着旧价格。四个方案，你选哪个？"
              },
              "scene": "cache-aside",
              "sfx": "抉择!",
              "explain": "🤔 刚改完价格，数据库是新的，缓存里还躺着旧价格——用户看到 3999，实际 3499。缓存和数据库'双写'，中间一定有窗口。<br>📐 主流做法是 <strong>Cache Aside</strong>：<strong>更新数据库 → 删除缓存</strong>，读未命中再回填。为什么是删而不是改？改要重算（成本高），并发下两次写入还会错位，把旧值写进缓存。<br>⚠️ 坦白说它也不是 100% 强一致：读线程恰好读到旧值、又在删除之后回填，缓存就会残留脏数据。所以工业界再叠加 <strong>TTL + 延迟双删 / 订阅 binlog</strong> 兜底。<br>🧠 小结：<strong>缓存一致性只能做到最终一致</strong>——这个前提必须说清楚；把缓存当数据库用，迟早会被旧数据打脸。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 商品改价：数据库要更新，缓存里还是旧价。你选哪个方案？",
                "options": [
                  {
                    "label": "A：先删除缓存，再更新数据库",
                    "tone": "bad",
                    "result": "🌀 并发下会翻车：请求甲删掉缓存，请求乙立刻把<strong>旧值</strong>读回缓存，甲这才更新完数据库——缓存里就长期躺着旧价格，直到下次过期。"
                  },
                  {
                    "label": "B：先更新数据库，再删除缓存（Cache Aside）+ 合理 TTL，必要时延迟双删兜底",
                    "tone": "good",
                    "result": "✅ 这是工业界主流做法：<strong>数据库是唯一真相</strong>，缓存只做'删'不做'改'，读请求未命中再回填。极端并发下仍有极小概率不一致（读线程恰好读到旧值并回填），所以再叠加 TTL、必要时延迟双删或订阅 binlog（如 Canal）异步修正。"
                  },
                  {
                    "label": "C：两个都更新——先更新数据库，再更新缓存里的值",
                    "tone": "bad",
                    "result": "📉 双重代价：写入放大（每次都要重算缓存值），而且两个并发更新的顺序一旦错位，缓存里可能留下后写的旧值。除非缓存值计算极便宜且并发极低，否则不如直接删除。"
                  },
                  {
                    "label": "D：把缓存 TTL 设成 24 小时，靠过期自然修正",
                    "tone": "bad",
                    "result": "🕰️ 不一致窗口长达 24 小时，用户可能一整天都看到昨天的价格。这是把'缓存'当'数据库'用了——缓存可以短暂不一致，但不能长期说谎。"
                  }
                ],
                "wrongText": "这个方案在并发下会留下脏数据，再想想：先动数据库，再让缓存失效",
                "doneText": "🎉 记住顺序：先动数据库，再让缓存失效；缓存只删不改。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——做'游戏积分排行榜'（按分数实时排序），用哪种结构？"
              },
              "scene": "redis",
              "sfx": "想一想!",
              "explain": "🤔 游戏积分排行榜要按分数实时排序，用哪种结构？选错了，每次更新排名都得全量重排。<br>📐 答案是 <strong>ZSet（有序集合）</strong>：成员带分数，Redis 内部用跳表 + 哈希维护顺序，<code>ZADD</code> 更新、<code>ZREVRANGE</code> 取前 N，都是 O(log N)。<br>🎯 换成 List 很难受：它按插入顺序排，改一个人的分数得先找位置、删掉、再插回，取前十名还得把整条 List 读出来排序；换成 Set 则根本没有'分数'概念，无法排序。而 ZSet 内部是跳表 + 哈希，几百万成员也能毫秒级返回前 100 名。<br>🧠 小结：<strong>同一份数据，选对结构比写更多代码更管用</strong>——排行榜还有两个顺手点：用 <code>ZREVRANGE key 0 99</code> 取前 100 名，用 <code>ZINCRBY</code> 给某人加分，全程不需要把整个榜单读进应用内存。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 实时排行榜用哪种结构？",
                "options": [
                  "ZSet 有序集合",
                  "List 列表",
                  "Set 集合"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "'Redis 单线程'具体指什么？",
              "options": [
                "命令的执行是单线程（6.0 后网络 IO 可多线程）",
                "整个 Redis 里只有一个线程做所有事",
                "同一时刻只能有一个客户端连接"
              ],
              "answer": 0,
              "explanation": "'单线程'指命令执行环节：换来无锁与原子性。网络读写、持久化等由其它线程/进程承担。注意慢命令（如 KEYS *）会卡住全部请求，生产环境应禁用。"
            },
            {
              "question": "为什么通常只把'热点数据'放 Redis？",
              "options": [
                "内存贵且有限，全量数据放内存成本过高",
                "Redis 存不下超过 1GB 的数据",
                "磁盘速度更慢所以不适合"
              ],
              "answer": 0,
              "explanation": "内存单位成本远高于磁盘，Redis 适合'少而热'：缓存、会话、计数器、排行榜。大 key 和全量数据会推高成本、拖慢持久化与主从同步。"
            },
            {
              "question": "Redis 里过期的 key 是怎么被清理的？",
              "options": [
                "惰性删除（访问时判断过期）+ 定期删除（周期性抽样清理）",
                "到点立刻精确删除，一秒都不差",
                "只能靠人工 DEL"
              ],
              "answer": 0,
              "explanation": "Redis 不会为每个 key 都挂一个定时器（太耗资源）：访问到某个 key 时顺手判断是否过期（惰性删除），同时后台周期性随机抽样一批设了 TTL 的 key 清理（定期删除）。所以'逻辑上过期'和'内存被释放'之间可能有一小段延迟；内存真的不够时，还会按 maxmemory-policy（如 allkeys-lru、volatile-lru）淘汰 key。"
            }
          ]
        },
        {
          "id": "4-3",
          "title": "缓存穿透击穿雪崩",
          "icon": "🌋",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "confused",
                "dialogue": "缓存三大灾难：名字长得像，病因完全不同！点一点，先认清这三个家伙。"
              },
              "scene": "cache3",
              "sfx": "灾难!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "🌋 灾难档案"
              },
              "explain": "🤔 都是'请求打到数据库上'，为什么药方完全不同？因为病因不同。<br>👻 <strong>穿透</strong>：查的是<strong>根本不存在</strong>的数据——缓存没有、库里也没有，于是每次都绕开缓存直接查库；被不存在的 ID 反复刷，库就顶不住。<br>🔥 <strong>击穿</strong>：数据<strong>存在</strong>，但某个<strong>热点 key 突然失效</strong>，上万请求同时发现缓存没了，一起查库、一起回填。<br>🏔️ <strong>雪崩</strong>：<strong>大批 key 同时失效</strong>（统一定时刷新），或者 Redis 整体不可用，流量像雪崩一样整体压向数据库。<br>🧠 小结：<strong>穿透=数据不存在，击穿=一个热点没了，雪崩=一大片同时没了。</strong>",
              "stage": [
                {
                  "type": "text",
                  "content": "👻 穿透：查'根本不存在'的数据，缓存永不命中",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔥 击穿：某个'热点 key'突然过期，瞬间全打到 DB",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🏔️ 雪崩：'大批 key 同时过期'或 Redis 宕机",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "开处方 ▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——药方开好了：穿透靠'拦'，击穿靠'锁'，雪崩靠'打散'。先把最出名的那味药名填对，别开错方子。"
              },
              "scene": "cache3-fix",
              "sfx": "开处方!",
              "explain": "🤔 分清病因之后，药方其实各就各位：穿透靠'拦'，击穿靠'锁'，雪崩靠'打散'。<br>👻 <strong>穿透</strong> → 缓存空值（短 TTL）+ <strong>布隆过滤器</strong>先拦一道；<br>🔥 <strong>击穿</strong> → 互斥锁，只放一个请求重建缓存；或热点 key 逻辑过期（不设物理 TTL，靠业务字段判断过期、异步重建）；<br>🏔️ <strong>雪崩</strong> → 过期时间加<strong>随机数</strong> + 多级缓存（本地 + Redis）+ 集群高可用 + 限流降级兜底。<br>🧠 小结：三张处方可叠加，但优先级不同——<strong>穿透和雪崩是系统性风险，必须提前设计；击穿是热点问题，可以针对性加固。</strong><br>✍️ 纸上谈兵不算会开药——药方里最出名的这味药，名字你来填。",
              "interaction": {
                "type": "input",
                "question": "防缓存穿透的两位主力，一位是『把查不到的结果也缓存成空值（短 TTL）』，另一位是在缓存前面加一层 ______ 过滤器——它说『不存在』就一定不存在，能把海量恶意 key 挡在数据库门外。",
                "accept": [
                  "布隆",
                  "布隆过滤器",
                  "bloom",
                  "bloomfilter",
                  "bloom filter"
                ],
                "placeholder": "两个字或四个字…",
                "hint": "音译自人名 Bloom。它用位数组 + 多个哈希函数做概率判断：说'不存在'一定不存在，说'存在'只是可能存在。",
                "doneText": "🎉 对，布隆过滤器！穿透先被它拦一道，漏网的再由缓存和数据库裁决。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——热点 key 刚失效，上万请求正在冲过来！按正确的处置顺序点出来。"
              },
              "scene": "cache3-toolkit",
              "sfx": "抢修中!",
              "explain": "🤔 热点 key 刚失效，一万个请求同时查库，库要执行一万次同样的重查询——其实只需要一次。<br>📐 处置流程就四步：<strong>先看缓存 → 未命中抢锁 → 抢到的查库并回填 → 没抢到的等一等再读缓存</strong>。放一个线程进去，其余等几十毫秒读缓存，数据库压力立刻从'一万'降到'一'。<br>⚠️ 抢锁必须用 <code>SET key value NX EX 秒数</code>（原子地'不存在才设置 + 带过期'），别用'先判断再设置'两步：那本身有竞态，还可能因为持锁进程挂掉把锁永久留下。<br>🧠 小结：<strong>击穿的本质是缓存失效瞬间的并发</strong>，锁就是那道闸门——注意锁超时别设太长，否则持锁线程一旦卡住，其他请求要白等很久；也别忘在 finally 里释放锁。",
              "interaction": {
                "type": "sequence",
                "question": "🔧 热点 key 失效了，按正确的处置顺序点击四步",
                "steps": [
                  "请求先查缓存：命中就直接返回，完全不碰数据库",
                  "未命中：用 SET key value NX EX 抢一把互斥锁，只有抢到的线程去查数据库",
                  "抢到锁的线程查库、把结果写回缓存并设置 TTL，然后释放锁",
                  "没抢到锁的线程短暂等待后重试读缓存，而不是一起冲进数据库"
                ],
                "wrongText": "顺序不对——先看缓存，再抢锁，重建后回填",
                "doneText": "🎉 处置流程正确：一个线程重建，其余请求排队读缓存。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "🕵️ 侦查时间到——下面这些做法，哪些是在给缓存灾难'添柴火'？"
              },
              "scene": "cache3-anti",
              "sfx": "侦查!",
              "explain": "🤔 侦查的标准只有一条：<strong>凡是让'大量请求同时绕过缓存'或'让缓存大批同时失效'的做法，都是隐患。</strong><br>🎯 反面案例：所有 key 设成同一个整点过期（雪崩前奏）；查不到数据时不缓存空值、也不前置拦截（穿透敞开大门）；热点 key 失效时放任所有线程查库重建（击穿放大器）。<br>✅ 而'加随机 TTL''布隆过滤器''互斥锁重建'恰恰是三条正向加固。<br>🧠 小结：<strong>布隆过滤器有误判率</strong>——它说'不存在'就一定不存在，可以放心拦；说'存在'只是'可能存在'，仍要由缓存和数据库裁决。它是漏斗，不是真相。<br>另一个常被忽略的隐患：把全站缓存集中在一台 Redis 上，实例一挂就是整片雪崩，集群高可用和本地缓存正是为它准备的。",
              "interaction": {
                "type": "find",
                "question": "🕵️ 揪出所有会引发缓存穿透/击穿/雪崩的做法",
                "rows": [
                  {
                    "text": "所有商品缓存的 TTL 都设成 30 分钟整，零点集体失效",
                    "hit": true
                  },
                  {
                    "text": "热点 key 的 TTL 加上随机偏移（30 分钟 ± 5 分钟）",
                    "hit": false
                  },
                  {
                    "text": "查不存在的 ID 时直接放行打到数据库，也不缓存空值",
                    "hit": true
                  },
                  {
                    "text": "用布隆过滤器先挡掉明显不存在的请求",
                    "hit": false
                  },
                  {
                    "text": "热点 key 失效瞬间，上万个线程同时冲进数据库重建缓存",
                    "hit": true
                  },
                  {
                    "text": "热点 key 用互斥锁或逻辑过期，只放一个请求去重建",
                    "hit": false
                  }
                ],
                "wrongText": "哔——这一条其实是在加固缓存，换一条看看",
                "doneText": "🎉 全部揪出来了：同时失效、不做拦截、并发重建，才是真凶。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "处方开完了，再把几个容易被说错的边界讲清楚——细节才是严谨。"
              },
              "scene": "cache3-detail",
              "sfx": "划重点!",
              "explain": "🤔 三个细节，说含糊了面试就挂在这里。<br>① <strong>穿透 vs 击穿不是写错一个字</strong>：穿透是数据根本不存在、每次都绕开缓存；击穿是数据存在、只是热点 key 失效了，本质是并发重建。<br>② <strong>布隆过滤器有误判</strong>：说'不存在'一定不存在；说'存在'只是可能存在（哈希冲突），仍要放行裁决。<br>③ <strong>雪崩不等于 Redis 挂了</strong>：大批 key 同时过期是雪崩，集群整体不可用也是雪崩——前者靠 TTL 加随机，后者靠高可用 + 本地缓存 + 限流降级。<br>⚠️ 隐蔽的坑：空值缓存 TTL 太长，业务后来真插入了这条数据，用户会一直看到'不存在'——<strong>空值要用短 TTL（30~60 秒）</strong>，或写入时主动删掉它。<br>🧠 小结：细节才是严谨。",
              "stage": [
                {
                  "type": "text",
                  "content": "🔍 穿透 = 数据不存在",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🔥 击穿 = 一个热点 key 失效",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🏔️ 雪崩 = 一大批 key 同时失效",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🧠 空值缓存要用短 TTL",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——某热点商品 key 过期瞬间，上万请求齐刷刷打到数据库，这是哪个灾难？"
              },
              "scene": "cache3-toolkit",
              "sfx": "想一想!",
              "explain": "🤔 单个热点 key 过期引来万箭齐发，这算哪一个灾难？<br>📐 是<strong>击穿</strong>：数据本来存在，只是缓存那一刻没了，并发全落到库上。穿透的关键词是'不存在'（每次都绕开缓存）；雪崩的关键词是'一大批'（很多 key 同时失效或缓存整体不可用）。<br>⚠️ 顺带纠正一个误解：把热点 key 设成'永不过期'看似能防击穿，其实很危险——数据变了缓存永远不自修正，还一直占内存。<br>🧠 小结：更稳妥的做法是<strong>逻辑过期</strong>——物理上不设 TTL，值里带一个过期时间字段，读到已过期的数据时异步重建、旧值先兜着用，既不阻塞请求，也不会长时间说谎。请记住这三个词的关键词：穿透看'不存在'，击穿看'一个热点'，雪崩看'一大批'——分清名字，才开得对药方。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 单个热点 key 过期引来万箭齐发？",
                "options": [
                  "缓存击穿",
                  "缓存穿透",
                  "缓存雪崩"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "布隆过滤器为什么能防穿透？",
              "options": [
                "它能快速判断'数据一定不存在'，把无效请求挡在缓存之前",
                "它把空值缓存起来了",
                "它给查询做了加密"
              ],
              "answer": 0,
              "explanation": "布隆过滤器说'不存在'→数据一定不存在（可放心拦截）；说'存在'→有误判概率（放行由缓存/数据库再裁决）。用极小内存拦掉海量无效查询，是防穿透利器。"
            },
            {
              "question": "防缓存雪崩最低成本的手段是？",
              "options": [
                "给每个 key 的过期时间加随机偏移，避免同时失效",
                "把所有 key 设为永不过期",
                "每天凌晨统一清空缓存"
              ],
              "answer": 0,
              "explanation": "'同时过期'是雪崩主因。在原 TTL 上叠加随机值（如 30 分钟 ± 5 分钟），把过期时刻打散；再配合多级缓存与集群，风险大幅降低。"
            },
            {
              "question": "'缓存雪崩'和'缓存击穿'最本质的区别是？",
              "options": [
                "雪崩是大批 key 同时失效或缓存整体不可用；击穿是单个热点 key 失效引发的并发重建",
                "两者是同一件事的两种叫法",
                "雪崩只影响读请求，击穿只影响写请求"
              ],
              "answer": 0,
              "explanation": "量级和范围不同：击穿是'一个热点'被瞬间的高并发冲击，靠互斥锁 / 逻辑过期解决；雪崩是'一大片'同时失效或缓存层整体故障，要靠 TTL 打散、多级缓存、集群高可用和限流兜底共同解决。"
            }
          ]
        },
        {
          "id": "4-4",
          "title": "MongoDB 文档数据库",
          "icon": "📄",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "商品详情：手机有 50 个参数，拖鞋只有 3 个——用 MySQL 要几十张关联表。MongoDB：一个文档全装下！"
              },
              "scene": "mongodb",
              "sfx": "自由!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "📄 文档区"
              },
              "explain": "🤔 商品详情：手机 50 个参数、拖鞋只有 3 个。用 MySQL 要么几十张关联表，要么一堆 NULL 列——新增一个品类就得改表结构。<br>📐 <strong>文档数据库</strong>换了个思路：一条记录是一份类 JSON 的文档（BSON），字段随意增减、可以嵌套。三个概念对齐一下：<br>📄 <strong>文档</strong> ≈ 关系库的一行，但能带子文档和数组；📂 <strong>集合</strong> ≈ 一张表，但不强制结构，同集合文档可长得不一样；🗄️ <strong>数据库</strong> ≈ 命名空间。<br>🎯 举个例子：<code>{name:'手机', price:3999, tags:['5G','快充']}</code> 就是一份完整文档，商品的所有信息一次读完，新增品类不用动任何表结构。<br>🧠 小结：<strong>文档库用'读一次拿全'换掉了'多表拼装'。</strong>",
              "stage": [
                {
                  "type": "text",
                  "content": "📄 文档：{ name:'手机', price:3999, tags:[…] }",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📂 集合 ≈ 表，但无固定字段",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🪆 支持嵌套：订单里直接嵌商品列表",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "它还有什么本事？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——分布式的本领等会儿再展开，先练一句基本功：'文档'和关系库的'行'，差别你能说出几句？写给我看看。"
              },
              "scene": "mongo-scale",
              "sfx": "扩展!",
              "explain": "🤔 高可用和水平扩展常被混着说，其实是两件事：一个保证'坏了一台不宕机'，一个解决'一台装不下'。<br>📐 ① <strong>副本集</strong>：一组保存相同数据的节点，主节点写、从节点复制，主挂了自动选举——这是<strong>高可用</strong>，不是扩展；② <strong>分片</strong>才是<strong>水平扩展</strong>：按分片键切开，每个分片本身又可是一个副本集。<br>🎯 ③ <strong>多文档事务</strong> 4.0 起支持（4.2 起跨分片），但有性能代价，能用单文档原子操作就别上事务。<br>🧠 小结：<strong>无 Schema ≠ 没有约束</strong>；副本集保高可用、分片做水平扩展、多文档事务保正确性，三者别混着说，业务规则该用 schema validation 写下来。<br>✍️ 这些本领都建立在文档模型上——先用你自己的话把'文档 vs 行'说清楚，塔库再给你对照参考理解。",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：MongoDB 的「文档」和关系型数据库的「行」最大差别是什么？",
                "reference": "行必须先定好列再填值，所有行结构一致；文档是一个 JSON 风格的结构，每个文档可以有自己的字段和嵌套子结构，天然适合字段多变的场景。代价是单文档有 16MB 上限，跨文档的事务与关联不如关系型直接。",
                "keywords": [
                  "文档",
                  "结构灵活",
                  "嵌套",
                  "16MB"
                ],
                "minChars": 20
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——选型考试开始！这些场景，该进 MongoDB 的筐，还是 MySQL 的筐？"
              },
              "scene": "mongo-vs-sql",
              "sfx": "分类!",
              "explain": "🤔 同一个项目里，商品放哪个库、订单放哪个库，纠结半天——其实标准只有两条。<br>📐 <strong>数据形态</strong>（字段是否规整、要不要嵌套）+ <strong>一致性要求</strong>（要不要跨表强事务与严格约束）。字段差异大、按整份文档读写 → 文档库更自然；多方对账、严格约束、复杂关联 → 关系库更稳。<br>🎯 现实答案往往是'都要'：商品在 MongoDB、订单支付留在 MySQL，两者用商品 ID 关联。<br>🎯 再补一个反例：把强事务的库存扣减放进文档库，看着也能跑，一旦要跨集合回滚就得自己写补偿逻辑——省下的表结构，会以更贵的方式还回来。<br>🧠 小结：这叫<strong>混合持久化（Polyglot Persistence）</strong>，是分工而不是二选一站队——用对地方，两种库都省心；用错地方，两种库都难受。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把这些场景放进更合适的数据库筐里",
                "items": [
                  "商品详情：手机 50 个参数，拖鞋只有 3 个，字段差异极大",
                  "订单支付与账务流水，要求跨表强事务",
                  "用户行为日志：写入量巨大、字段经常新增",
                  "秒杀库存扣减，必须严格不超卖、能对账",
                  "CMS 文章内容：正文结构不固定，基本按整篇读写"
                ],
                "buckets": [
                  "📄 MongoDB 更合适",
                  "🗃️ MySQL 更合适"
                ],
                "answers": [
                  0,
                  1,
                  0,
                  1,
                  0
                ],
                "wrongText": "想想这份数据最怕什么：怕结构僵，还是怕不一致"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "🛤️ 电商商品系统要改版了——各品类字段差异极大、读多写少。你打算怎么落地？"
              },
              "scene": "mongo-embed",
              "sfx": "抉择!",
              "explain": "🤔 电商商品系统要改版：各品类字段差异极大、读多写少。把商品也塞进 MySQL 会怎样？新增一个品类就要 DDL 改表，查询还得按品类拼不同的 SQL。<br>📐 架构选型的关键不是'哪个库更强'，而是<strong>'哪份数据放在哪儿最合适'</strong>。商品的特征是字段随品类变、整份文档读写、少跨品类关联；订单账务的特征是强事务、要严格对账。<br>🎯 所以典型答案是<strong>分工</strong>：商品用文档模型（读一次拿全、新增品类不动结构），订单支付留在关系库享受 ACID。<br>🧠 小结：<strong>为了'统一技术栈'把所有数据塞进一个库，代价迟早会以另一种形式回来</strong>——选型的关键不是哪个库更强，而是哪份数据放在哪儿最合适；能用最简单的方案解决问题，才是最省心的架构。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 商品系统改版，你选哪个落地方式？",
                "options": [
                  {
                    "label": "A：给每个品类在 MySQL 里建一张宽表，几十张表 + 大量 NULL 列",
                    "tone": "bad",
                    "result": "🧱 表数量爆炸：新增一个品类就要改表结构（DDL），查询要按品类拼不同的 SQL，大量 NULL 还浪费空间。'结构不固定'的数据硬套关系模型，维护成本会越来越高。"
                  },
                  {
                    "label": "B：商品用 MongoDB 文档存（公共字段 + 品类特有字段嵌套），订单和支付继续留在 MySQL",
                    "tone": "good",
                    "result": "✅ 一份文档就是一件完整商品，读一次拿全、新增品类不动结构；订单与账务继续享受关系库的强事务与约束。这就是典型的混合持久化架构——各取所长。"
                  },
                  {
                    "label": "C：所有字段塞进 MySQL 的一个 text 列，查询时用 LIKE 模糊匹配",
                    "tone": "bad",
                    "result": "🔍 无法有效建索引，查询退化成全表扫描；数据也没有任何结构校验，取出来还要在代码里手工解析。‘灵活'变成了'失控'——这恰恰是文档库要解决的问题，却被当成了解决方案。"
                  },
                  {
                    "label": "D：商品和订单全部迁到 MongoDB，并关掉事务来换性能",
                    "tone": "bad",
                    "result": "💸 账务失去跨文档的强事务保障，对账和补偿会变成噩梦。而且 MongoDB 4.0+ 本来就支持多文档事务——'为了性能关掉正确性'是把可选项当成了必选项。"
                  }
                ],
                "wrongText": "这个方案会有长期维护或正确性代价，再想想：哪份数据最需要什么",
                "doneText": "🎉 选型的关键不是'哪个库更强'，而是'哪份数据放在哪儿最合适'。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "最后把三个最容易说错的点钉死——面试和实战都爱考。"
              },
              "scene": "mongo-limits",
              "sfx": "划重点!",
              "explain": "🤔 三个最容易说错的点，面试和实战都爱考。<br>① <strong>无 Schema ≠ 没有约束</strong>：集合不强制结构，但业务仍要靠 schema validation 守住形状，否则同一个集合里出现十种写法，查询就没法写了。<br>② <strong>嵌入 vs 引用按访问方式选</strong>：总是一起读、数量可控就嵌入（订单嵌商品快照）；会被独立查询、数量大会增长就引用（用户与订单）。而且单个文档有 <strong>16MB</strong> 上限，越大更新越贵。<br>③ <strong>索引照样要建</strong>：支持单字段、复合、多键、文本、地理空间索引；没有索引同样 COLLSCAN 全集合扫描。<br>🧠 小结：<strong>'换了数据库就不用管索引'是危险的错觉</strong>；强关联强事务的核心账务别放文档库。",
              "stage": [
                {
                  "type": "text",
                  "content": "🧱 无 Schema ≠ 无约束",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🪆 嵌入 vs 引用，按访问方式选",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🔖 索引照样要建，否则 COLLSCAN",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "📦 单文档上限 16MB",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——MongoDB 里一条记录叫什么？"
              },
              "scene": "mongodb",
              "sfx": "想一想!",
              "explain": "🤔 面试里一句'你们 MongoDB 那张表怎么设计的'，就能听出你熟不熟。<br>📐 术语对齐：一条记录叫<strong>文档（Document）</strong>，存在<strong>集合（Collection）</strong>里；文档用 BSON 表示，可以嵌套子文档和数组。'行 / 表'是关系库的说法，别混着用。<br>🎯 记住一个细节：每个文档都有唯一的 <code>_id</code>，不指定时驱动会生成 ObjectId（12 字节，含时间戳 + 机器/进程信息 + 计数器）。<br>🧠 小结：ObjectId 大致随时间递增，但不保证严格单调，<strong>不要把它当顺序号用</strong>；它设计的目标只是全局唯一——时间戳精确到秒，同一秒内制造出来的文档，靠后面那几位随机数与计数器区分开。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ MongoDB 里一条记录叫？",
                "options": [
                  "文档 Document",
                  "行 Row",
                  "表 Table"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "什么场景优先选 MongoDB 而不是 MySQL？",
              "options": [
                "字段结构不固定、需要嵌套存储、以文档整体读写为主",
                "需要复杂多表 JOIN 和强事务",
                "数据量很小"
              ],
              "answer": 0,
              "explanation": "典型如商品目录（品类字段各异）、CMS 内容、日志、用户画像。若核心是复杂事务与强关联查询（如金融账务），关系型数据库仍是首选。"
            },
            {
              "question": "MongoDB 的集合（Collection）和关系库的表，最大的区别是？",
              "options": [
                "集合不强制字段结构，同一集合里的文档可以有不同字段",
                "集合不能建索引",
                "集合里的文档必须是完全相同的结构"
              ],
              "answer": 0,
              "explanation": "集合是'文档的容器'，默认不校验字段结构，这让字段频繁变化的场景很舒服；代价是数据形状要靠应用或 schema validation 自己守住。索引、唯一约束等能力 MongoDB 一样有——没有索引的查询同样会全集合扫描。"
            },
            {
              "question": "MongoDB 里'嵌入'和'引用'应该怎么选？",
              "options": [
                "总是一起读、数量可控的用嵌入；会被独立查询、数量大或频繁变化的用引用",
                "永远用嵌入，文档越大越好",
                "永远用引用，避免任何嵌套"
              ],
              "answer": 0,
              "explanation": "嵌入把相关数据放在一份文档里，读一次拿全，适合'订单 + 商品快照'这类总是同时访问的数据；引用用 ID 关联另一个集合，适合会被独立查询、数量可能无限增长的数据。注意单个文档有 16MB 上限，而且文档越大，更新与网络传输的成本越高。"
            }
          ]
        },
        {
          "id": "4-5",
          "title": "Redis 持久化机制",
          "icon": "📸",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "Redis 数据住内存，万一断电呢？别慌——它会'拍照'（RDB）也会'记账'（AOF）！"
              },
              "scene": "rdb",
              "sfx": "双保险!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "💾 持久化区"
              },
              "explain": "🤔 Redis 把数据放在内存里，那断电的一瞬间数据去哪了？答案是：它会'拍照'，也会'记账'。<br>📐 <strong>RDB</strong>：周期性把内存数据拍成二进制<strong>快照</strong>（文件小、恢复快，但可能丢最后一次快照之后的写入）；<strong>AOF</strong>：把每条写命令追加成<strong>流水账</strong>（丢得少，文件更大）。<br>🎯 两个决定了它们性格的细节：① RDB 快照由 <code>fork</code> 出的<strong>子进程</strong>完成，配合<strong>写时复制（COW）</strong>，子进程看到 fork 那一刻的数据视图，被改动的页才复制，所以主线程基本不阻塞（数据特别大时 fork 本身有短暂停顿）；② AOF 记的是命令流水，文件会越来越大，所以要做 <strong>AOF 重写（bgrewriteaof）</strong>：按当前数据状态生成等价的最小命令集。<br>🧠 小结：<strong>RDB 是时间点，AOF 是过程。</strong>",
              "stage": [
                {
                  "type": "text",
                  "content": "📸 RDB：快照——恢复快，可能丢最后一次快照后的数据",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧾 AOF：流水账——丢得少，文件更大",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 2,
              "nextText": "AOF 怎么刷盘？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——三档落盘节奏听懂了？网上关于持久化的'名言'可不少，一句一句判真假，数字要经得起追问。"
              },
              "scene": "aof-fsync",
              "sfx": "选档!",
              "explain": "🤔 记账记到什么程度才算安全？每写一条就落一次盘最安全，可硬盘会哭；攒着不落盘最快，可宕机就丢一片。AOF 给了三档。<br>📐 <strong>always</strong>：每条命令都 fsync，最安全也最慢；<strong>everysec</strong>：每秒刷一次，最多丢约 1 秒，默认 ✅；<strong>no</strong>：交给操作系统决定，最快、丢失量不可控。<br>🎯 Redis 4.0+ 还有<strong>混合持久化</strong>：RDB 全量 + AOF 增量，重启又快又全。<br>⚠️ 说严谨点：everysec 由后台线程每秒 fsync，上一次没完成就推迟到下一次，最坏可能丢接近 2 秒；always 保证的是'已 fsync'，磁盘缓存说谎时理论上仍有极小概率损失。<br>🧠 小结：<strong>everysec 是安全与性能的平衡点</strong>；真正不能丢的数据，本来也不该只放 Redis。<br>📋 三档和数字都过目了——下面几句'名言'，逐句判断对错，判完塔库把每句的坑讲给你听。",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "开了 AOF（everysec）就一条数据都不会丢。",
                    "answer": false,
                    "why": "everysec 每秒刷一次盘，宕机最多丢约 1 秒的写入；上一次 fsync 没完成还会推迟到下一次，最坏接近 2 秒。只有 always 才接近逐条不丢，代价是性能。"
                  },
                  {
                    "text": "RDB 是某一时刻的快照，文件小，恢复通常比 AOF 重放命令快。",
                    "answer": true,
                    "why": "RDB 是时间点的二进制快照，直接加载即可；代价是可能丢掉最后一次快照之后的全部写入——不只是一条，可能是几分钟。"
                  },
                  {
                    "text": "RDB 和 AOF 只能二选一。",
                    "answer": false,
                    "why": "两者可以同时开启；Redis 4.0+ 还有混合持久化——AOF 文件开头是一段 RDB 全量、后面追加增量命令，重启先加载全量再重放增量，又快又全。"
                  },
                  {
                    "text": "AOF 重写（bgrewriteaof）会按当前数据生成等价的最小命令集，给文件瘦身。",
                    "answer": true,
                    "why": "AOF 记的是命令流水，只会越来越大；重写由 fork 出的子进程完成，不长时间阻塞主线程，生产环境可以放心开着自动重写。"
                  }
                ]
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 3,
              "taku": {
                "emotion": "happy",
                "dialogue": "哔——把 AOF 和 RDB 的关键数字填进去，手别抖！"
              },
              "scene": "rdb-fork",
              "sfx": "填空!",
              "explain": "🤔 这一页填的全是'会考的数字'，填错一个，面试官立刻知道你没配过。<br>📐 always 每条都刷，几乎不丢 0 条；everysec 每秒刷，最多丢约 1 秒；no 交给操作系统，丢多少不可控。RDB 快照靠 <code>fork</code> 出的子进程 + 写时复制完成。<br>🎯 三种策略记成一句话：<strong>always 用性能换安全，no 用安全换性能，everysec 站中间</strong>。<br>🧠 小结：另外记住 AOF 重写的触发方式——手动执行 <code>BGREWRITEAOF</code>，或由配置自动触发（当前 AOF 文件比上次重写后增长超过一定百分比、且大于最小体积时）；重写同样由 <code>fork</code> 出的子进程完成，不会长时间阻塞主线程，所以生产环境可以放心开着自动重写。",
              "interaction": {
                "type": "fill",
                "question": "🧩 把词块填进空格，拼出 Redis 持久化的关键参数",
                "sentence": [
                  "AOF 的 fsync 策略有三档：always 每条命令都刷盘，宕机最多丢 ",
                  "{0}",
                  "；everysec 每秒刷一次，最多丢 ",
                  "{1}",
                  "（Redis 默认）；no 交给操作系统决定，丢失量 ",
                  "{2}",
                  "。RDB 生成快照时由 ",
                  "{3}",
                  " 出的子进程完成，配合写时复制（COW），主线程基本不阻塞。"
                ],
                "options": [
                  "0 条命令（几乎不丢）",
                  "约 1 秒的写入",
                  "不可控",
                  "fork"
                ],
                "answers": [
                  "0 条命令（几乎不丢）",
                  "约 1 秒的写入",
                  "不可控",
                  "fork"
                ],
                "doneText": "🎉 参数全对！always 最安全、everysec 最常用、no 最不可控。"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "关于持久化的谣言也不少。哔——把下面这些说法分别丢进『站得住』和『是谣言』两个筐，看看你会不会被问倒。"
              },
              "scene": "persist-myth",
              "sfx": "翻卡!",
              "explain": "🤔 持久化这块传言特别多，因为'默认配置'和'你以为的默认配置'经常不是一回事。<br>📐 最有代表性的一条：<strong>'开了 AOF 就一条都不会丢'</strong>——假的，默认 everysec 就最多丢约 1 秒。<br>🎯 另一条：<strong>'RDB 和 AOF 只能二选一'</strong>——假的，两者可以同时开启，4.0+ 还能混合持久化。<br>🎯 其余两条也别放过：'有主从复制就不需要持久化'——复制是同步副本，误删和写坏会一起传过去，它不是备份；'4.0+ 混合持久化'——真的，AOF 文件开头是一段 RDB 全量、后面追加增量命令。<br>🧠 翻卡时留意两个数字：RDB 可能丢掉'最后一次快照之后'的全部写入（可能是几分钟），AOF everysec 最多约 1 秒。小结一句：<strong>RDB 恢复快、文件小、可能丢得多；AOF 丢得少、文件大、恢复慢；混合持久化两头都要。</strong>",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把这些说法分别丢进『✅ 站得住』和『❌ 是谣言』两个筐",
                "items": [
                  "RDB 和 AOF 只能二选一",
                  "开了 AOF 就一条数据都不会丢",
                  "RDB 文件小，恢复通常比 AOF 重放命令快",
                  "有主从复制了，就不需要持久化",
                  "Redis 4.0+ 支持混合持久化：AOF 前缀是 RDB 全量、后面是增量命令"
                ],
                "buckets": [
                  "✅ 站得住的说法",
                  "❌ 是谣言"
                ],
                "answers": [
                  1,
                  1,
                  0,
                  1,
                  0
                ],
                "wrongText": "再想想：默认 everysec 就最多丢约 1 秒，怎么能说一条都不丢呢？"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "最后把几个容易被含糊过去的点说清楚——数字要经得起追问。"
              },
              "scene": "persist-compare",
              "sfx": "划重点!",
              "explain": "🤔 说'RDB 会丢数据'不够，到底丢多少？说不清数字，就等于没说。<br>📐 ① <strong>RDB 是某个时刻的快照</strong>：默认配置（如 save 900 1 / 300 10 / 60 10000），两次快照之间的写入在宕机时全部丢失——不是'丢一条'，可能丢几分钟。<br>② <strong>AOF everysec 的 1 秒是理想上界</strong>：上次 fsync 没结束就推迟，最坏接近 2 秒。<br>③ <strong>AOF 文件会膨胀</strong>：记的是命令流水，所以增长到一定比例要做重写，用当前数据生成等价最小命令集（也是 fork 子进程干的）。<br>④ <strong>混合持久化（4.0+）</strong>：开启 <code>aof-use-rdb-preamble</code> 后，AOF 开头是 RDB 全量、后面是增量命令，重启先加载全量再重放增量。<br>🧠 小结：<strong>持久化文件是恢复的唯一依据，备份和监控不能省</strong>——磁盘写满、文件损坏都会让持久化变成心理安慰。",
              "stage": [
                {
                  "type": "text",
                  "content": "📸 RDB = 某个时刻的快照",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🧾 AOF everysec ≤ 约 1 秒",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🔁 AOF 重写防止文件膨胀",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🧬 4.0+ 混合持久化",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——everysec 策略下宕机，最坏会丢多少数据？"
              },
              "scene": "rdb",
              "sfx": "想一想!",
              "explain": "🤔 everysec 策略下突然宕机，最坏会丢多少数据？答'一点都不会丢'的，通常没配过生产。<br>📐 准确答案是约 <strong>1 秒</strong>的写入（fsync 被推迟时可能接近 2 秒）。这正是它成为默认值的原因：用'最多丢一秒'换来接近 always 的安全性，同时几乎没有性能代价。<br>⚠️ 但别把这句话反过来说成'everysec 绝对只丢 1 秒'——真正的最坏情况还取决于磁盘 IO 是否拥塞、fsync 是否被推迟、是不是整机掉电。<br>🧠 小结：<strong>能不能丢、能丢多少，由'持久化策略 + 业务容忍度'共同决定</strong>。缓存数据丢了可以回源重建，计数、队列、锁这类状态丢了就可能错账，得慎之又慎——真要一条不丢，就该上数据库或消息队列，而不是指望单机 Redis。",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ everysec 最坏丢多少？",
                "options": [
                  "最多约 1 秒的写操作",
                  "最多 1 条命令",
                  "全部数据"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "RDB 快照是怎么生成的？会长时间阻塞主线程吗？",
              "options": [
                "fork 子进程 + 写时复制（COW）完成，主线程基本不受影响",
                "主线程直接写文件，全程阻塞",
                "由另一台机器生成"
              ],
              "answer": 0,
              "explanation": "fork 出的子进程持有 fork 时刻的数据视图；期间主线程继续服务新请求，被改动的页通过 COW 复制，不干扰快照。数据量极大时 fork 本身会有短暂停顿。"
            },
            {
              "question": "开了 AOF（everysec）就不会丢数据了吗？",
              "options": [
                "不是：默认最多丢约 1 秒的写入，fsync 被推迟时可能接近 2 秒",
                "是，一条都不会丢",
                "不是，AOF 根本不持久化"
              ],
              "answer": 0,
              "explanation": "everysec 由后台线程每秒 fsync 一次；如果上一次 fsync 还没完成，本次会推迟到下一次，所以最坏可能丢接近 2 秒的写入。要更安全可设 always（每条命令都 fsync），代价是性能下降。"
            },
            {
              "question": "Redis 4.0+ 的'混合持久化'是什么？",
              "options": [
                "AOF 文件前半段是 RDB 全量快照、后半段是增量命令，重启又快又全",
                "同时写两份 RDB 文件互为备份",
                "把 RDB 和 AOF 分别存在两台机器上"
              ],
              "answer": 0,
              "explanation": "开启 aof-use-rdb-preamble 后，AOF 重写生成的文件以 RDB 格式的全量数据开头，后面追加增量命令。重启时先加载全量、再重放增量，兼顾了 RDB 的'恢复快'和 AOF 的'丢得少'。"
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "第5章：分布式架构",
      "knowledgePoints": [
        {
          "id": "5-1",
          "title": "分库分表",
          "icon": "🍰",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "单表 5000 万行，索引加了一堆，查询还是越来越慢——该'切蛋糕'了！哔——先别急着下刀，把四种切法收进箱子再说。"
              },
              "scene": "sharding",
              "sfx": "开切!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "🍰 切法收集箱"
              },
              "explain": "🤔 先看一个真实场景：订单表 5000 万行，<code>user_id</code> 索引也加了，可 <code>SELECT * FROM orders WHERE user_id=888 ORDER BY id DESC LIMIT 20</code> 还是要 2 秒——因为 <strong>B+ 树高到 4~5 层</strong>，每次查询多打好几次磁盘 IO，而 MySQL 单表超过 <strong>2000 万行</strong>后性能就明显下滑。<br>📐 一句话锚定：<strong>分库分表 = 把一张大表按规则切成若干小份</strong>，<strong>垂直拆分</strong>按业务/字段切，<strong>水平拆分</strong>按行切。它能治单表过大、单库连接数打满，但代价是<strong>路由、跨片查询、跨库事务</strong>全都得自己扛。<br>🎯 点一点，先把四种切法收进箱子。",
              "stage": [
                {
                  "type": "text",
                  "content": "🔪 垂直分库：用户库 / 订单库 / 商品库各立门户",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔪 垂直分表：冷热字段分离，大字段挪去扩展表",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🍰 水平分表：同结构按行拆（user_id % 4 → user_0..3）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧭 路由：先算分片键，再决定 SQL 发往哪一片",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "两种拆分差在哪？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "两种拆分差在哪？两把刀，方向完全不同：一把竖着切字段和业务，一把横着切行。哔——记住方向，再帮我从下面这段话里揪出最可疑的那句。"
              },
              "scene": "sharding-split",
              "sfx": "两把刀!",
              "explain": "🤔 同样是『拆表』，为什么有人拆完变快、有人拆完更慢？因为方向根本不同。<br>📐 <strong>垂直拆分 = 按业务/字段拆</strong>：① <strong>垂直分库</strong>——订单、用户、商品各建一个库，连接数与 IO 不再互相抢；② <strong>垂直分表</strong>——把 <code>TEXT/BLOB</code> 大字段挪去扩展表，热点表一行变小，<strong>一个 16KB 数据页就装得下更多行</strong>。它边界清晰，但<strong>单表行数并没有减少</strong>。<br>🎯 <strong>水平拆分 = 同结构按行拆</strong>：表结构完全不变，<code>user_id % 4</code> → user_0~user_3，每张表 1250 万行，<strong>B+ 树从 5 层降到 3 层</strong>；代价是多出<strong>路由与跨片查询</strong>两道新难题。<br>🧠 一句话记住：<strong>垂直拆的是『列』和『业务』，水平拆的是『行』</strong>。工程顺序是先垂直（改动小、见效快），再水平（真正解决单表过大）。<br>🧩 学完两种刀法，来辨一辨真假：塔库下面这段话里，有一句错得最离谱。",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库推了推眼镜，拍着胸脯一口气说了下去——",
                "segments": [
                  {
                    "text": "拆表的学问不在刀法，而在方向："
                  },
                  {
                    "text": "垂直拆分按业务和字段切，拆完各表结构各不相同；水平拆分按行切，拆完每张表长得一模一样，",
                    "check": true,
                    "why": "这句正确：判断口诀就是看拆完的几张表『长得一样』还是『各不相同』——垂直动的是『列』与业务，水平动的是『行』。"
                  },
                  {
                    "text": "水平拆分把 5000 万行按 user_id % 4 切成四张同结构表，B+ 树从 5 层降到 3 层，",
                    "check": true,
                    "why": "这句正确：单表行数降到约 1250 万，树高降下来，每次查询的磁盘 IO 随之减少——这正是水平拆分治『单表过大』的原理。"
                  },
                  {
                    "text": "所以分片键随便挑一个字段取模就行，反正取模之后数据分布都很均匀，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：分片键要选『最高频查询都带得上它』的字段——订单按 user_id 分片，『我的订单』永远单片直达；随手选一个（比如 order_no）会让大多数查询广播全部 4 个分片再归并，开销直接乘 4；而按商家 id 这类天然不均的键取模，大商家还会造成数据倾斜和热点——『取模均匀』均匀的是哈希值，不是业务量。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "中间件的路由逻辑很直白：算得出分片键就单片直达，算不出就得挨个敲门。哔——把下面这些『只能全库路由』的查询揪出来！"
              },
              "scene": "sharding-route",
              "sfx": "算一算!",
              "explain": "🤔 分片之后，一条 SQL 到底发往哪一片？<br>📐 路由的本质是四步：<strong>解析 SQL → 提取分片键 → 计算目标分片 → 改写 SQL 只发往那一片</strong>。<br>🎯 反过来，如果 SQL <strong>没带分片键</strong>（比如 <code>WHERE order_no = 'A1001'</code>，但表是按 user_id 分的片），或者要做范围/排序/分页，中间件只能把语句<strong>广播</strong>给全部 4 个分片，再把结果<strong>归并</strong>（内存排序、聚合、去重）——一次查询的开销直接乘 4。<br>🧠 一句话记住：<strong>带得上分片键 = 1 片直达；带不上 = 4 片广播 + 归并</strong>。深分页最贵：<code>LIMIT 100000, 20</code> 要求每个分片都吐出 10 万行，内存和网络双双被拖垮。",
              "interaction": {
                "type": "find",
                "question": "🔍 揪出所有『算不出分片键、只能全库路由』的查询",
                "rows": [
                  {
                    "text": "SELECT * FROM orders WHERE order_no = 'A1001'（order_no 不是分片键）",
                    "hit": true
                  },
                  {
                    "text": "SELECT * FROM orders WHERE user_id = 888",
                    "hit": false
                  },
                  {
                    "text": "SELECT * FROM orders WHERE amount > 100 ORDER BY created_at DESC LIMIT 20",
                    "hit": true
                  },
                  {
                    "text": "SELECT * FROM orders WHERE user_id = 888 AND status = 1",
                    "hit": false
                  },
                  {
                    "text": "SELECT COUNT(*) FROM orders",
                    "hit": true
                  },
                  {
                    "text": "INSERT INTO orders (user_id, amount) VALUES (889, 20)",
                    "hit": false
                  }
                ],
                "doneText": "🎉 全部揪出来了！能提取到分片键的查询只发往一片；提取不到的只能广播到所有分片再归并——这是分库分表里最贵的操作。",
                "wrongText": "这一条带着分片键 user_id，中间件算一次取模就能直达，再看看别的"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "给你五张'刀法'卡片，哪些属于垂直拆分、哪些属于水平拆分？哔——放进正确的筐里，看清它们切的是'列'还是'行'。"
              },
              "scene": "sharding",
              "sfx": "分类!",
              "explain": "🤔 最容易混的一步：『按业务拆库』和『按用户取模拆表』到底谁垂直、谁水平？<br>📐 别被名字骗了——<strong>垂直</strong>的关键词是『业务 / 字段 / 冷热』，拆完每张表<strong>结构各不相同</strong>；<strong>水平</strong>的关键词是『同结构、按行、取模或按范围』，拆完每张表<strong>长得一模一样</strong>。<br>🎯 举个例子：把 <code>user(id,name,头像,简介)</code> 拆成 <code>user_base</code> 与 <code>user_ext</code> 是<strong>垂直分表</strong>，两张表列不同；把订单表按 <code>order_id % 8</code> 拆成 8 张是<strong>水平分表</strong>，8 张表结构完全相同。<br>🧠 判断口诀：<strong>看拆完的几张表『长得一样』还是『各不相同』</strong>。逐条判一判。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把这些拆分方案放进正确的筐",
                "items": [
                  "把『登录日志表』从用户库拆到独立的日志库",
                  "user 表拆成 user_base(id,name) 与 user_ext(id,头像,简介)",
                  "订单表按 order_id % 8 拆成 8 张同结构表",
                  "流水表按月份拆成 24 张同结构的月表",
                  "把商品表里的『详情富文本』大字段挪到独立扩展表"
                ],
                "buckets": [
                  "⬆️ 垂直拆分（切业务/字段）",
                  "➡️ 水平拆分（切行）"
                ],
                "answers": [
                  0,
                  0,
                  1,
                  1,
                  0
                ],
                "wrongText": "再看看这一条：它切的是'字段或业务'，还是'同一个结构里的一批行'？"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "拆完才发现真正的坑在后面：ID 会撞号、查询会跨片、扩容会搬家。哔——三个细节一次讲透。"
              },
              "scene": "sharding-split",
              "sfx": "有坑!",
              "explain": "🤔 拆完才发现，真正的坑全在后面：<code>% 4</code> 一加机器变 <code>% 5</code>，<strong>约 80% 的数据都要跨库搬家</strong>。三个细节最容易翻车：<br>① <strong>全局唯一 ID</strong>：单表自增分片后必然撞号。<strong>雪花算法</strong>是 64 位 = 1 位符号 + 41 位毫秒时间戳（约 69 年）+ 10 位机器 ID（1024 台）+ 12 位序列号，<strong>同一毫秒每台机器能出 4096 个</strong>；要防<strong>时钟回拨</strong>导致重复。UUID 唯一却<strong>无序</strong>，随机插入会让 B+ 树频繁<strong>页分裂</strong>。<br>② <strong>分片键</strong>：理想是<strong>最高频的查询都带得上它</strong>——订单按 user_id 分片，『我的订单』永远单片直达；选错就会跨片、热点、扩容困难。<br>③ <strong>扩容与跨片事务</strong>：正解是<strong>一致性哈希</strong>（只迁移相邻一段）或<strong>成倍扩容</strong>（4→8）配合双写 + 校验 + 切读 + 下线老库；跨片只能靠 TCC / Saga / 本地消息表兜底（5-5 节细讲）。<br>🧠 记住：<strong>分片键选得好，扩容和查询都不痛</strong>。",
              "stage": [
                {
                  "type": "text",
                  "content": "❄️ 雪花 ID：1 + 41 + 10 + 12 位，每毫秒 4096 个",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🔑 分片键 = 最高频的查询条件",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🧮 扩容：一致性哈希 / 成倍扩容双写",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "记住这三条 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——分片键选得好不好，其实一个标准就能判断。"
              },
              "scene": "sharding-route",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 下面哪种情况说明分片键选得好？",
                "options": [
                  "最高频的查询条件里都带着这个分片键，能单库直达",
                  "分片键用随机 UUID，数据分布最均匀",
                  "分片键经常变化，方便重新打散数据"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "垂直拆分和水平拆分，本质区别是什么？",
              "options": [
                "垂直按业务/字段拆（切列），水平按行拆成多张同结构的表",
                "垂直拆库、水平拆表，只是叫法不同",
                "垂直用于 MySQL，水平用于 NoSQL"
              ],
              "answer": 0,
              "explanation": "垂直拆的是'列与业务'：垂直分库按业务域分家，垂直分表把冷门/大字段挪走；拆完每个库表结构都不同。水平拆的是'行'：表结构不变，把几千万行按分片键分到多张同结构表或多个库，拆完每张表长得一样。前者减少'宽度'与耦合，后者减少'高度'与单表行数。"
            },
            {
              "question": "分片后为什么推荐雪花算法，而不是随机 UUID 做全局 ID？",
              "options": [
                "UUID 无序，随机插入会引发 B+ 树页分裂，写入变慢、页利用率下降",
                "UUID 会重复，不能保证唯一",
                "UUID 是 64 位整数，存不下"
              ],
              "answer": 0,
              "explanation": "UUID 几乎不会重复，但完全无序：每次插入都落在 B+ 树随机位置，频繁触发页分裂与数据搬移，索引页利用率也差。雪花算法生成的是趋势递增的 64 位整数（1 位符号 + 41 位毫秒时间戳 + 10 位机器 ID + 12 位序列号），同一毫秒每台机器可出 4096 个，插入基本追加在右侧——代价是要处理时钟回拨。"
            },
            {
              "question": "『分片数取模后，直接加机器』为什么是灾难？",
              "options": [
                "模数一变，绝大多数数据的归属都变了，几乎全量迁移",
                "加了机器会导致 ID 冲突",
                "新机器上没有 binlog，无法同步"
              ],
              "answer": 0,
              "explanation": "hash % 4 变 hash % 5，只有约 1/5 的数据留在原地，其余都要跨库搬家——期间还要双写、校验、切流。工程上要么用一致性哈希（只影响相邻一段），要么成倍扩容（4→8），让一部分分片整体搬到新库，把迁移量降到最小。"
            },
            {
              "question": "分片后为什么『不带分片键的深分页』最贵？",
              "options": [
                "所有分片都要返回前 N 条再归并排序，越翻到后面返回的数据量越大",
                "分片表没有主键，只能全表扫描",
                "中间件不支持 LIMIT 语法"
              ],
              "answer": 0,
              "explanation": "跨片分页必须归并：中间件把 LIMIT 放大后广播给每个分片，各自返回一批数据，再在内存里排序取前 N 条。翻到第 1000 页时，每个分片都要吐出海量行，内存与网络都被拖垮。常用解法是带上分片键、用游标（记住上次的 id）代替 offset，或把列表页放进搜索引擎/缓存。"
            }
          ]
        },
        {
          "id": "5-2",
          "title": "主从复制",
          "icon": "📡",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "一台 MySQL 顶多几千 QPS，活动一来就被打爆，还怕它宕机全站停摆。哔——先点一点，把复制的零件摆上桌。"
              },
              "scene": "replication",
              "sfx": "同步中!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "📡 链路零件箱"
              },
              "explain": "🤔 先算一笔账：单台 MySQL 大约扛 <strong>5000 QPS</strong>，而一个活动页面的读请求能冲到 <strong>5 万 QPS</strong>——只靠一台机器必然被打爆。更糟的是：它一旦宕机，全站直接停摆，恢复期间用户看到的是 404。<br>📐 <strong>复制（Replication）</strong>就是让一台<strong>主库</strong>的变更自动同步到一台或多台<strong>从库</strong>，一次解决两件事：<strong>高可用</strong>（主库挂了从库顶上）和<strong>读扩展</strong>（读写分离的数据源）——加 1 台从库，读能力就多一份，这也是第 5-3 节读写分离的地基。<br>🎯 链路零件有四个，少一个链路就断。点一点，把它们收进箱子。",
              "stage": [
                {
                  "type": "text",
                  "content": "📝 binlog：主库的变更日志（那块黑板）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🚚 dump 线程：把 binlog 推给从库",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📗 relay log：从库本地落地的中继日志",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "▶️ SQL 线程：把 relay log 里的变更重放一遍",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "黑板上记的是什么？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "同一块黑板，可以记三种字：SQL 原文、行级变更、或者自动挑。哔——选错了，主从数据可能对不上。听完三种记法，亲手把黑板的名字填进链路里。"
              },
              "scene": "replication-binlog",
              "sfx": "三种字!",
              "explain": "🤔 同一条 SQL，在主库和从库跑出来结果会不一样吗？会——如果用的是 STATEMENT 格式。<br>📝 <strong>binlog 有三种格式</strong>，直接影响日志大小与主从一致性：<br>① <code>STATEMENT</code>：记『SQL 原文』，日志小；但 <code>NOW()</code>、<code>UUID()</code>、<code>RAND()</code>、带 <code>LIMIT</code> 却无 <code>ORDER BY</code> 的 UPDATE 在主从两边<strong>执行结果可能不同</strong>，属于不安全语句。<br>② <code>ROW</code>：记『每一行怎么变』，最安全，主从必然一致（<strong>MySQL 5.7+ 默认</strong>）；代价是日志大——一条影响 10 万行的 UPDATE 就要记 10 万行变更。<br>③ <code>MIXED</code>：普通语句用 STATEMENT，遇到不确定的自动切 ROW。<br>🧠 一句话记住：<strong>日志小选 STATEMENT，数据准选 ROW</strong>。⚠️ 别搞混：<strong>binlog 是 Server 层日志</strong>（负责复制与归档），<strong>redo log 是 InnoDB 引擎层日志</strong>（只管本机崩溃恢复）。<br>🧩 链路的第一站，就是这块黑板的名字——来，亲手填一次。",
              "interaction": {
                "type": "input",
                "question": "主从复制里，主库把变更写进 ______ 日志，从库的 IO 线程把它拉回去，存成本地的中继日志。",
                "accept": [
                  "binlog",
                  "二进制日志",
                  "binary log"
                ],
                "placeholder": "一个词…",
                "hint": "binary log 的缩写，六个字母；注意它是 Server 层的日志，别和 InnoDB 的 redo log 搞混。",
                "doneText": "🎉 对，binlog！链路的第一棒就是它：主库写 binlog，dump 线程推送，从库 IO 线程收进 relay log，SQL 线程重放。"
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "一块黑板，怎么变成从库上的数据？哔——四个环节按真实顺序点出来，错一步链路就不通。"
              },
              "scene": "replication-chain",
              "sfx": "接力!",
              "explain": "🤔 一块黑板（binlog），要经过几步才能变成从库上的数据？答案是<strong>四棒接力</strong>，少一棒链路就断。<br>🔗 完整链路：<strong>主库提交写 binlog → dump 线程推送 → 从库 IO 线程写入 relay log → 从库 SQL 线程重放</strong>。分工是：主库 dump 线程负责『推』，从库 IO 线程负责『收并落盘』，从库 SQL 线程负责『把变更重做一遍』。<br>⚠️ 措辞要准：从库重放的是<strong>relay log（中继日志）</strong>——它是 binlog 在从库的落地副本，<strong>不是从库直接读主库的 binlog 文件</strong>。<br>🧠 一句话记住：<strong>binlog 记、dump 推、IO 收、SQL 放</strong>。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 按真实顺序，点击主从复制的四个环节",
                "steps": [
                  "主库：事务提交时把变更写进 binlog",
                  "主库 dump 线程：读出 binlog 并推送给从库",
                  "从库 IO 线程：接收后写入本地的 relay log",
                  "从库 SQL 线程：读 relay log 并在从库重放"
                ],
                "doneText": "🎉 链路打通：binlog → relay log → 重放！",
                "wrongText": "顺序反了——主库先记黑板，从库才有得搬"
              },
              "nextText": "快还是稳？▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "异步快，半同步稳，差别其实只有一件事：主库提交时，要不要等从库回话。哔——拨动开关比一比。"
              },
              "scene": "replication-mode",
              "sfx": "拨一拨!",
              "explain": "🤔 异步快、半同步稳，差别其实只有一件事：<strong>主库返回成功之前，等不等从库确认</strong>。<br>🎚️ <strong>异步</strong>——写完 binlog 立刻返回，延迟≈0；主库此刻宕机，最后若干事务可能<strong>根本没送到从库</strong>，故障切换就丢数据。<strong>半同步</strong>——至少一个从库<strong>确认收到</strong> binlog 才返回成功，多等一个毫秒级网络来回。<br>⚠️ 关键区别：<code>AFTER_COMMIT</code> 是<strong>先提交再等确认</strong>，这期间别的会话已经能看见它；<code>AFTER_SYNC</code> 是<strong>先等确认再提交</strong>（MySQL 5.7 起默认），保证『客户端看到成功 ⇒ 至少一台从库已持有该事务』。<br>🧠 但记住：<strong>『收到』不等于『已重放』</strong>——从库可能还没执行完，读从库照样读到旧数据。<strong>全同步</strong>等所有从库，最稳最慢，生产几乎不用。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 拨动开关，对比两种复制模式在『主库突然宕机』时的表现",
                "states": [
                  {
                    "label": "⚡ 异步复制",
                    "metric": "主库：写完 binlog 立刻返回成功",
                    "time": "延迟 ≈ 0，不等从库",
                    "note": "从库只知道自己'尽可能追'。主库宕机且来不及切换时，最后若干事务可能从未到达从库——对账时才会发现少了数据",
                    "tone": "bad"
                  },
                  {
                    "label": "🛡️ 半同步复制（AFTER_SYNC）",
                    "metric": "主库：≥1 个从库确认收到 binlog 才返回成功",
                    "time": "多等一个网络来回（毫秒级）",
                    "note": "已提交的事务至少存在于一台从库上，切换不丢数据。但只保证'收到了'，不保证'已重放完'——读写分离的延迟问题依旧存在",
                    "tone": "good"
                  }
                ],
                "doneText": "🎉 快与稳的权衡，看清楚了！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "从库总是慢半拍，到底慢在哪？哔——三个来源、两个监控指标，还有一个必须说准的措辞。"
              },
              "scene": "replication",
              "sfx": "追不上!",
              "explain": "🤔 从库总是慢半拍，到底慢在哪？又该信哪个指标？<br>🐌 <strong>延迟的三个来源</strong>：① <strong>从库 SQL 线程重放慢</strong>——主库几十个并发同时写，从库（早期）单个 SQL 线程逐条重放，遇到一次删百万行的大事务、或<strong>没有主键/索引的批量 UPDATE</strong>，只能一行行扫；② <strong>从库自己忙</strong>——报表慢查询把 IO/CPU 抢走，重放线程饿着；③ <strong>网络</strong>——跨机房、带宽打满、抖动。<br>📊 <strong>监控看两样</strong>：<code>Seconds_Behind_Master</code>（大事务时会跳变，<strong>不能全信</strong>）；更可靠的是比对 <strong>GTID 位点</strong>：<code>Retrieved_Gtid_Set</code> 与 <code>Executed_Gtid_Set</code> 的差集。<br>🧠 一句话记住：异步/半同步整体是<strong>最终一致</strong>，不能说成『强一致』；想读到最新只有两条路——<strong>强制走主库</strong>或<strong>等位点</strong>（<code>WAIT_FOR_EXECUTED_GTID_SET</code>）。",
              "stage": [
                {
                  "type": "text",
                  "content": "🐌 延迟三来源：重放 / 从库负载 / 网络",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "📊 监控：Seconds_Behind_Master + GTID 位点",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🛡️ 要最新数据：读主库 or 等位点",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——半同步让主库等到了从库的确认，那从库一定已经把数据重放完了吗？"
              },
              "scene": "replication-binlog",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 半同步复制下，主库返回『提交成功』时意味着什么？",
                "options": [
                  "至少一个从库已经收到这份 binlog，但不一定重放完成",
                  "所有从库都已重放完成，读哪台都是最新数据",
                  "从库会暂停业务，等主库通知才继续"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "binlog 的 ROW 格式相比 STATEMENT 格式，优劣势是什么？",
              "options": [
                "ROW 更安全（主从必然一致），但日志更大、批量更新时膨胀明显",
                "ROW 日志更小，但容易主从不一致",
                "两者只是文件名不同，没有区别"
              ],
              "answer": 0,
              "explanation": "STATEMENT 记 SQL 原文，日志小，但 NOW()、UUID()、RAND()、无 ORDER BY 的 LIMIT UPDATE 等语句在主从两侧执行结果可能不同，导致数据不一致。ROW 记录每一行的前后变化，主从必然一致（MySQL 5.7+ 默认），代价是日志量大——一条 UPDATE 影响 10 万行就要记 10 万行的变更。MIXED 则是自动折中。"
            },
            {
              "question": "半同步复制的 AFTER_SYNC 比 AFTER_COMMIT 更安全，安全在哪？",
              "options": [
                "AFTER_SYNC 先等从库确认再提交，客户端看到『提交成功』时从库已持有该事务",
                "AFTER_SYNC 会等所有从库确认",
                "AFTER_COMMIT 不会写 binlog"
              ],
              "answer": 0,
              "explanation": "AFTER_COMMIT 先提交、再等从库确认：这段时间里其它会话已经能看到这个事务，一旦主库宕机且从库还没收到，故障切换后这条已提交的数据就消失了。AFTER_SYNC 把等待提前到提交之前（先拿到从库 ACK 再进提交阶段），保证'客户端看到成功 ⇒ 至少一台从库已有该事务'，是 MySQL 5.7 起的默认等待点。"
            },
            {
              "question": "从库重放追不上主库，最常见的诱因是？",
              "options": [
                "主库并发写入，从库单个 SQL 线程逐条重放，遇到大事务或无索引批量更新更慢",
                "从库磁盘容量比主库小",
                "binlog 格式选了 ROW，从库无法解析"
              ],
              "answer": 0,
              "explanation": "主库可以几十个并发同时写，从库早期只有一个 SQL 线程重放 relay log，写入压力一大就排队；大事务（一次百万行删除）与没有主键/索引的批量 UPDATE 会让重放退化成逐行扫描，延迟迅速拉大。MySQL 5.7+ 支持基于组提交的并行复制（多 worker）来缓解，但根因仍在'大事务'与'从库负载'。"
            },
            {
              "question": "想在读写分离架构里保证『读到刚写的数据』，下面哪种做法是可靠的？",
              "options": [
                "把这条读请求强制发往主库，或等待从库执行到指定 GTID 位点",
                "在应用里 sleep 200 毫秒再读从库",
                "多读几台从库，取最新的一份"
              ],
              "answer": 0,
              "explanation": "sleep 只是把'不确定'换成'固定慢'：延迟可能是 1 毫秒也可能是 10 秒。读主库能立刻拿到最新数据；等位点（WAIT_FOR_EXECUTED_GTID_SET）则精确等到从库执行完该事务再返回，兼顾了'读到最新'与'不浪费主库'。多读几台从库取最新也没有意义——你无法判断谁最新，反而增加连接开销。"
            }
          ]
        },
        {
          "id": "5-3",
          "title": "读写分离",
          "icon": "🔀",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "业务里 90% 是查询、只有 10% 是写，却全挤在一台主库上排队。哔——能不能让'读'和'写'各走各的路？点一点把分流的零件收好。"
              },
              "scene": "readwrite",
              "sfx": "分流!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "🔀 分流调度台"
              },
              "explain": "🤔 先看一组真实比例：电商业务里 <strong>SELECT 占 90%，写只占 10%</strong>。10 台机器如果都做同样的事，等于让 9 台陪跑；而全挤在一台主库上排队，列表页和报表一慢，写请求也跟着卡。<br>📐 <strong>读写分离</strong>：写（INSERT/UPDATE/DELETE）走<strong>主库</strong>，读（SELECT）分摊到<strong>从库</strong>。<br>🎯 它不是『让数据库变快』的魔法，而是把<strong>读压力水平摊开</strong>：1 台主库扛写，N 台从库扛读，读能力随从库数量增长。<br>🧠 一句话记住：<strong>读写分离 = 用数据的新鲜度换吞吐量</strong>。点一点，把分流的零件收好。",
              "stage": [
                {
                  "type": "text",
                  "content": "✍️ 写 → 主库（数据的唯一权威来源）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "👀 读 → 从库（可挂多台，分摊查询）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "⚖️ 主库专心写，不再被报表和列表页拖住",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧩 中间件/代理：解析 SQL 类型，决定发往哪个库",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "代价是什么？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "confused",
                "dialogue": "分散压力的代价，是你读到的东西可能'稍微旧一点'。哔——这个'稍微'，就是线上事故的常客。这笔账别只听我讲，用你自己的话写一遍，我才信你真懂了。"
              },
              "scene": "readwrite-delay",
              "sfx": "慢半拍!",
              "explain": "🤔 吞吐上去了，那代价是什么？——你读到的数据可能『稍微旧一点』。<br>⏱️ 为什么旧？因为从库要等主库把 binlog 传过来、再由自己的 SQL 线程重放，这段<strong>复制延迟</strong>通常<strong>几毫秒到几百毫秒</strong>，赶上大事务可到秒级。<br>😱 两个经典现场：① 用户改完昵称，下拉刷新还是旧的，再刷一次才变——只是体验差；② 下单成功跳转『我的订单』显示『暂无订单』，用户以为没付成功<strong>又下了一单</strong>——这是真金白银的事故。<br>🧠 一句话记住：<strong>写主读从 = 用一致性换吞吐</strong>。分级标准很清楚：能忍旧的（商品列表、排行榜、报表）读从库，绝不能忍的（支付结果、订单状态、扣款后确认）读主库。<br>🧩 下面轮到你了：把『读能力从哪来、旧数据从哪来』用自己的话说一遍，写完对照参考说法，看漏了哪个关键词。",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：读写分离为什么能让读能力变强？它拿什么换了这份吞吐——刚写完立刻去读从库，会发生什么？",
                "reference": "写（INSERT/UPDATE/DELETE）集中到主库，读（SELECT）分摊到多台从库，读吞吐随从库数量水平扩展；但复制是异步的，主库的变更要先写进 binlog，从库的 IO 线程拉回来存成中继日志，SQL 线程重放完才算追平——这段复制延迟通常毫秒到几百毫秒，大事务时可能到秒级。所以刚写完立刻读从库，就可能读到旧值：读写分离本质是用数据的新鲜度（一致性）换吞吐。",
                "keywords": [
                  "主库",
                  "从库",
                  "binlog",
                  "重放",
                  "复制延迟"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "confused",
                "dialogue": "真实事故现场：用户改完昵称立刻刷新，看到的还是旧名字。哔——三条修复路线，你押哪一条？"
              },
              "scene": "rw-stale-read",
              "sfx": "怎么办!",
              "explain": "🤔 真实事故现场：用户改完昵称立刻刷新，看到的还是旧名字——他以为没保存成功，又改了一遍，结果这次『旧』得更久。<br>🛤️ 后端日志很清楚：写请求走了主库并且<strong>执行成功</strong>，紧接着的读请求走了从库，而那时从库<strong>还没重放完</strong>这条更新，返回的是重放前的旧版本。这类问题在监控上往往什么都看不到——它不报错、不超时，只是<strong>悄悄返回了旧值</strong>。<br>⚠️ 先纠正一个常见误判：这<strong>不是『数据没保存』</strong>，而是你读了一个还没追上的副本。所以『让用户再刷新一次』『加重试』都不算修复——它们只是把 bug 藏起来。<br>🎯 三条候选路线摆在下面：<strong>哪条能真正修好它，哪条只是把问题换个地方？</strong>",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 『刚写完立刻读』读到旧数据，你会选哪条修复路线？",
                "options": [
                  {
                    "label": "路线A：这段时间里，把该用户的读请求强制走主库（写后读主 / 会话粘性）",
                    "tone": "good",
                    "result": "✅ 正解：一致性要求高的读本来就不该交给从库。常见实现有'写后 N 秒内该会话读主库'、'把写请求的 GTID 带上，读之前等位点（WAIT_FOR_EXECUTED_GTID_SET）'。延迟只有毫秒级，用户完全无感。"
                  },
                  {
                    "label": "路线B：干脆让所有读请求都走主库，最省心",
                    "tone": "bad",
                    "result": "😵 那读写分离就白做了：主库既要扛写又要扛读，压力回到原点，几台从库在旁边空转看戏。"
                  },
                  {
                    "label": "路线C：读之前先 sleep 200 毫秒，等从库追上来",
                    "tone": "bad",
                    "result": "🐌 sleep 换不来正确性：延迟可能 1 毫秒，也可能 10 秒。你只是把'可能读旧'换成了'一定变慢'。正确做法是<strong>等位点</strong>或<strong>强制走主库</strong>。"
                  }
                ],
                "wrongText": "再想想：这条路线要么把压力又推回主库，要么只是把'不确定'换成了'一定慢'",
                "doneText": "🎉 记住口诀：一致性要求高的读，要么读主库，要么等位点！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "读写分离里有五个工位，谁搬、谁放、谁指挥，可别张冠李戴。哔——来配对！"
              },
              "scene": "rw-roles",
              "sfx": "配对!",
              "explain": "🤔 读写分离里最容易张冠李戴的一句话是：『中间件负责同步数据』——错，它连 binlog 都不认识。<br>🔗 拆开看，这其实是<strong>两套机制在配合</strong>：<strong>复制链路</strong>负责把数据搬过去（谁权威、谁搬运、谁重放），<strong>路由规则</strong>负责决定这条 SQL 该发往哪台库、什么时候该走主库。<br>💡 提示：① 『数据的权威版本在哪』（主库）和『谁负责搬日志』（主库 dump 线程 + 从库 IO 线程）是两回事；② 中间件只看 SQL 是读还是写，<strong>不看数据新旧</strong>，也不可能替你去补数据。<br>🧠 记住 5 个工位：主库、从库 IO 线程、从库 SQL 线程、中间件、会话粘性（写后读主）。来配对！",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的角色，配到右边它真正负责的事",
                "pairs": [
                  [
                    "主库（Master）",
                    "接收所有写请求并写 binlog，是数据的唯一权威来源"
                  ],
                  [
                    "从库 IO 线程",
                    "从主库拉取 binlog，写入本地 relay log"
                  ],
                  [
                    "从库 SQL 线程",
                    "把 relay log 中的变更重放到从库数据文件"
                  ],
                  [
                    "数据库中间件 / 代理",
                    "解析 SQL 读写类型，按规则路由到主库或某台从库"
                  ],
                  [
                    "会话粘性（写后读主）",
                    "把刚写完那段时间里同一会话的读请求锁定到主库"
                  ]
                ],
                "wrongText": "这条职责不是它管的，再想想——搬运、重放、路由是三件不同的事",
                "doneText": "🎉 五个工位，各就各位！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "normal",
                "dialogue": "最后把三个必须说准的点钉死：它是最终一致、想读最新有三招、别用重试掩盖问题。哔——"
              },
              "scene": "readwrite",
              "sfx": "说准了!",
              "explain": "🤔 面试里只要说到读写分离，这三个点被问到的概率最高。<br>⚠️ <strong>三个必须说准的点</strong>：<br>① 读写分离默认是<strong>最终一致</strong>，<strong>不是强一致</strong>。把主从复制说成『实时同步』是常见错误；异步复制下主库宕机甚至可能丢最后几个事务。<br>② 拿到最新数据的三招：<strong>强制走主库</strong>（最简单常用）、<strong>等位点</strong>（<code>WAIT_FOR_EXECUTED_GTID_SET</code>，等到从库执行到指定 GTID 再读）、<strong>半同步复制</strong>（保证从库已收到，但不保证已重放）。<br>③ <strong>别用『读从库 + 失败重试』掩盖</strong>：用户看到的『一会儿旧一会儿新』本身就是 bug。按业务分级——支付、下单结果读主库；商品列表、排行榜、离线报表读从库。<br>🧠 还有一条常被忽略：<strong>从库不是免费的，从 2 台加到 10 台读能力也不会线性提升</strong>——主库 dump 线程与网络出口会先成为瓶颈，每台从库还要重复消耗存储和重放 CPU。",
              "stage": [
                {
                  "type": "text",
                  "content": "🧾 措辞：读写分离 = 最终一致，不是强一致",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🛡️ 读最新三招：走主库 / 等位点 / 半同步",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🎯 分级路由：钱的事读主库，列表页读从库",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——『等位点』到底等的是什么？"
              },
              "scene": "readwrite-delay",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 用 WAIT_FOR_EXECUTED_GTID_SET 解决『刚写完读不到』，它等的是什么？",
                "options": [
                  "等到指定从库已经执行到那个 GTID 位点，再返回读结果",
                  "等到主库把 binlog 文件删掉",
                  "等固定的 100 毫秒再读"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "读写分离提升吞吐的本质原因是什么？",
              "options": [
                "读流量分摊到多台从库，读能力随从库数量水平扩展，主库专注于写",
                "从库的磁盘比主库快",
                "读请求会走内存缓存，不访问磁盘"
              ],
              "answer": 0,
              "explanation": "读多写少的业务里，SELECT 占绝大多数。把读分摊到 N 台从库，读能力近似可以水平扩展，主库则专心处理写与保证数据权威。注意它换来的是'最终一致'：复制是异步/半同步的，从库天然慢半拍。"
            },
            {
              "question": "用户改完昵称立刻刷新，看到的还是旧昵称，最可能的原因是？",
              "options": [
                "读请求被路由到从库，而从库还没重放完这条更新（复制延迟）",
                "写请求根本没提交成功",
                "浏览器缓存了昵称，需要清缓存"
              ],
              "answer": 0,
              "explanation": "写走主库成功、读走从库却读到重放前的旧版本，就是主从延迟。修法有三：把这条读强制发往主库；读之前等位点（WAIT_FOR_EXECUTED_GTID_SET）；对一致性要求不高的场景接受最终一致。'写失败'和'浏览器缓存'也都是可能原因，但日志显示写成功时，主从延迟才是第一嫌疑。"
            },
            {
              "question": "把从库从 2 台加到 10 台，读能力就会线性提升吗？",
              "options": [
                "不会：主库 dump 线程与网络出口成为瓶颈，且每台从库的延迟不同、连接与存储成本翻倍",
                "会：从库数量与读吞吐永远成正比",
                "不会：从库数量超过 3 台后复制会失败"
              ],
              "answer": 0,
              "explanation": "从库也要靠主库推 binlog：从库越多，主库的 dump 线程、网络出口压力越大；同时每台从库都要消耗一份存储与重放 CPU。此外从库间延迟不一致，会让'读旧数据'的表现更随机。所以实际扩容常配合中间件按权重/延迟做路由，甚至把报表类读迁到离线库。"
            },
            {
              "question": "为什么不应该在从库上执行写操作？",
              "options": [
                "从库数据来自重放，本地写入会与复制链路冲突，导致主从不一致甚至复制中断",
                "从库的磁盘是只读硬件，物理上写不进去",
                "从库写入会被自动同步回主库，造成循环复制"
              ],
              "answer": 0,
              "explanation": "从库的数据由 SQL 线程重放 relay log 得到，它的'权威版本'在主库。在从库本地写入，轻则被后续重放覆盖，重则因主键冲突让 SQL 线程报错停下（复制中断）。因此从库通常设为 read_only，需要写入时必须先做故障切换把从库提升为主库。"
            }
          ]
        },
        {
          "id": "5-4",
          "title": "CAP 定理",
          "icon": "🔺",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "分布式系统的'不可能三角'：一致性 C、可用性 A、分区容忍 P。哔——先别急着背'三选二'，这三个字母的准确含义你确定说得对吗？"
              },
              "scene": "cap",
              "sfx": "断了!",
              "dropZone": {
                "x": 50,
                "y": 84,
                "label": "🔺 取舍档案"
              },
              "explain": "🤔 面试常问『CAP 怎么选』，但真正的淘汰点在前面：<strong>这三个字母你定义得准吗？</strong>定义含糊，后面所有取舍都是错的。<br>🔺 三个词都有严格含义：<br><strong>C（一致性）</strong>不是『数据长得一样』，而是<strong>线性一致</strong>——写一旦成功返回，之后的任何读都必须看到这个值或更新的值；<br><strong>A（可用性）</strong>不是『性能好』，而是<strong>每个非故障节点都能在有限时间内返回非错误的响应</strong>（返回错误、或一直不返回，都<strong>不算</strong>可用）；<br><strong>P（分区容忍）</strong>是网络分区（丢包、超时、断连）时系统仍能继续运行。<br>🧠 点一点，先把三条定义收好——后面所有取舍都建立在这上面。",
              "stage": [
                {
                  "type": "text",
                  "content": "C 一致性：每次读都能读到最近一次成功写入的值（线性一致）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "A 可用性：每个非故障节点都能在有限时间内返回非错误响应",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "P 分区容忍：网络分区（消息丢失/延迟）时系统仍能继续运行",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "真的是三选二吗？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "confused",
                "dialogue": "『CAP 就是三选二』——这句话被传了二十年，也错了二十年。哔——纠正完，再来几句判断题，验验你听懂了几成。"
              },
              "scene": "cap-partition",
              "sfx": "划重点!",
              "explain": "🤔 『CAP 就是三选二』——这句话被传了二十年，也错了二十年。<br>🔺 最常见的误读：CAP = 三个里挑两个。准确说法是：<strong>当网络分区（P）真的发生时</strong>，你才必须在 C 和 A 之间二选一。<br>为什么 P 不能放弃？只要系统跨网络部署，断网、丢包、超时、交换机重启、机房互联抖动都是<strong>客观会发生的事实</strong>——P 不是『选不选』，而是<strong>必须接受的前提</strong>。放弃 P 等于假设网络永不故障，那只能把系统塞回一台机器里，也就不叫分布式了。<br>🎯 所以现实只有两条路：<strong>CP</strong>（分区时宁可拒绝服务/阻塞，也不返回可能错误的数据）和 <strong>AP</strong>（分区时继续响应，各节点先各自说话，事后收敛）。<br>🧠 补充 <strong>PACELC</strong>：<em>if Partition: A or C; Else: Latency or C</em>——网络一切正常时，强一致也要等多数派确认，<strong>延迟</strong>必然上升，这时你权衡的是 L 与 C。<br>🧩 概念辨析最怕似是而非——下面几句话，逐条判一判对错。",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "CAP 定理说分布式系统可以在一致性、可用性、分区容忍性里任选两个。",
                    "answer": false,
                    "why": "网络分区（P）是分布式系统的现实前提，不是可选项；CAP 真正的含义是：<strong>分区发生时</strong>，只能在 C 和 A 之间二选一。"
                  },
                  {
                    "text": "BASE 方案追求最终一致，而不是每一刻都强一致。",
                    "answer": true,
                    "why": "BASE = 基本可用（Basically Available）+ 软状态（Soft state）+ 最终一致（Eventually consistent），是 AP 路线常见的设计取向。"
                  },
                  {
                    "text": "放弃 P 等于假设网络永不故障，系统实际只能塞回一台机器，也就不叫分布式了。",
                    "answer": true,
                    "why": "这句正确：跨网络部署时断网、丢包、超时是客观会发生的，P 是必须接受的前提——所以现实里只有 CP 和 AP 两条路可选。"
                  },
                  {
                    "text": "网络一切正常、没有分区时，追求强一致不需要付出任何代价。",
                    "answer": false,
                    "why": "错在这里：PACELC 的 Else 分支说得很清楚——没有分区时，强一致也要等多数派确认，<strong>延迟</strong>必然上升，这时权衡的是 L 与 C。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "confused",
                "dialogue": "警报！两个机房之间的光纤被挖断了。哔——此刻你就是余额服务的负责人，怎么选？"
              },
              "scene": "cap-scenario",
              "sfx": "分区了!",
              "explain": "🤔 警报：A 机房和 B 机房之间的光纤被挖断了，两边的监控同时开始告警。<br>🛤️ 场景：两个机房各有一半用户，各自都能收到充值请求——它们<strong>看不见对方</strong>，却都能对外服务。此刻你就是<strong>账户余额服务</strong>的负责人，这笔写入该怎么办？<br>🎯 判断标准只有一条：<strong>『错的代价』和『停的代价』谁更大</strong>。余额错一次，可能是双花、是真实资金损失、最后只能靠人工对账兜底；服务停 30 秒，用户重试一次就过去了——这两个代价在这个业务里<strong>完全不对等</strong>。<br>⚠️ 先认清角色：这是<strong>余额</strong>服务，不是购物车、也不是点赞。换成购物车，答案会反过来。<br>🧠 想一想：你会选哪条路？",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 网络分区发生了，负责余额服务的你选哪条路？",
                "options": [
                  {
                    "label": "路线A：保一致（CP）——确认不了多数派就拒绝这笔写入并返回错误，等分区恢复",
                    "tone": "good",
                    "result": "✅ 钱的事不能'先记账后对账'：宁可短暂不可用，也绝不允许两个机房各自扣款导致<strong>双花</strong>。ZooKeeper、etcd、多数派数据库在分区时都选择牺牲可用性来守住一致。"
                  },
                  {
                    "label": "路线B：保可用（AP）——两边都先接受写入，网络恢复后再合并",
                    "tone": "bad",
                    "result": "💸 同一个账户的 100 元余额可能被两个机房各扣一次。金额类数据一旦'事后合并'，往往只能靠人工对账兜底——省下的可用性，用事故来还。"
                  },
                  {
                    "label": "路线C：不检测分区，照常读写不管心跳",
                    "tone": "bad",
                    "result": "🧟 这是最危险的一种：系统以为一切正常，实际已经<strong>脑裂</strong>，两个'主'同时对外服务，数据开始分叉，越晚发现越难修。"
                  }
                ],
                "wrongText": "换个角度想：这笔操作动的是钱，你愿意为'随时可用'付出数据错误的代价吗？",
                "doneText": "🎉 记住：不是哪个更高级，而是先想清楚『错的代价』和『停的代价』谁更大！"
              },
              "nextText": "两条路线放一起比 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "CP 和 AP 不是好坏之分，而是把代价放在哪里的选择。哔——拨动开关，看它们在同一个分区场景下的两副面孔。"
              },
              "scene": "cap-cp-ap",
              "sfx": "比一比!",
              "explain": "🤔 同一个网络分区，CP 和 AP 的差别到底落在哪几分钟里？拨动开关比一比。<br>🎚️ 关键结论先给：<strong>AP 不是『不要一致』，而是把一致推迟到分区结束之后</strong>——这就是 BASE：Basically Available（基本可用）+ Soft state（软状态）+ Eventually consistent（最终一致）。分区期间 AP 返回的可能是旧值，但分区恢复后会<strong>收敛</strong>到同一个值。<br>🎯 CP 则相反：分区期间宁可超时、报错、阻塞，也不返回可能错误的数据。<br>🧠 还有一层常被忽略：CAP 的取舍可以<strong>按数据粒度</strong>做——同一个系统里余额读主库（偏 CP）、商品浏览量走缓存（偏 AP），并不矛盾。<strong>没有更好，只有更合适</strong>。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 场景：余额服务遇到网络分区。切换开关，对比 CP 与 AP 的表现",
                "states": [
                  {
                    "label": "🏦 CP：分区时保一致",
                    "metric": "分区期间：可能超时、报错、阻塞",
                    "time": "等到多数派恢复才继续服务",
                    "note": "典型系统：ZooKeeper、etcd、HBase。适合钱、库存、配置、分布式锁这类『宁可停也不能错』的数据",
                    "tone": "good"
                  },
                  {
                    "label": "🛒 AP：分区时保可用",
                    "metric": "分区期间：每个请求都能拿到响应（可能是旧值或待合并值）",
                    "time": "立即返回，不阻塞",
                    "note": "典型系统：Cassandra、Eureka、DynamoDB 类。适合购物车、点赞、商品列表、注册中心节点表等『旧一点也能接受』的数据，分区结束后靠版本/向量时钟收敛",
                    "tone": "bad"
                  }
                ],
                "doneText": "🎉 没有更好，只有更合适！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "happy",
                "dialogue": "最后来填空！把这几个术语钉进脑子里，面试和评审都能一口说准。哔——"
              },
              "scene": "cap",
              "sfx": "填空!",
              "explain": "🤔 最后来填空，把三个概念一次性钉牢。<br>🧩 这段笔记串起了 <strong>CAP、BASE、多数派</strong>：先讲 P 的准确含义，再讲它在取舍里的地位，然后是 BASE 的第三个字母，最后是 Raft 提交需要谁的确认。<br>⚠️ 两个易错点先想清楚：CAP 里的 P 说的是『<strong>网络断了系统还能不能跑</strong>』，<strong>不是性能</strong>；BASE 里的 E 说的是『<strong>迟早会变成一样</strong>』，<strong>不是一直一样</strong>。<br>🎯 点词块填空——别被『强一致』『少数派』这种看着顺眼的干扰项带偏。<br>🧠 填完默念一遍：<strong>P 是前提，分区时 C / A 二选一，BASE 用最终一致换可用</strong>。",
              "interaction": {
                "type": "fill",
                "question": "🧩 把词块填进空格，补完这份 CAP 笔记",
                "sentence": [
                  "CAP 里的 P 指的是 ",
                  "{0}",
                  "；因为跨网络部署时它无法回避，所以 P 是 ",
                  "{1}",
                  "，真正的取舍发生在分区时的 C 与 A 之间。BASE 是对 AP 路线的延伸：Basically Available + Soft state + ",
                  "{2}",
                  "。在多数派系统里，Raft 要求 ",
                  "{3}",
                  " 确认才能提交；Quorum 的 N/R/W 要满足 R + W > N，才能保证读到的集合与写入的集合必有交集。"
                ],
                "options": [
                  "分区容忍",
                  "前提而不是选项",
                  "最终一致",
                  "多数派节点",
                  "强一致",
                  "少数派节点",
                  "原子性"
                ],
                "answers": [
                  "分区容忍",
                  "前提而不是选项",
                  "最终一致",
                  "多数派节点"
                ],
                "wrongText": "有个空填得不对——想想'多数派 vs 少数派'和'最终一致 vs 强一致'这两对反义词"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——『CAP 必须三选二』这句话，问题出在哪？"
              },
              "scene": "cap-partition",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ 『CAP 必须三选二』这个说法的问题在于？",
                "options": [
                  "P 是分布式系统的前提而不是可选项，实际情况是分区时在 C 与 A 之间二选一",
                  "其实三个都能要，只是配置没调对",
                  "CAP 只适用于关系型数据库，其它系统不受约束"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "CAP 中 C（一致性）的准确定义是什么？",
              "options": [
                "线性一致：每次读都能读到最近一次成功写入的值",
                "所有节点的数据在同一时刻物理完全相同",
                "所有节点都能返回成功响应"
              ],
              "answer": 0,
              "explanation": "CAP 里的 C 是 linearizability（线性一致）：写一旦成功返回，之后的任何读都必须看到这个值或更新的值。它不等于'所有副本时刻字节一致'（那是副本同步的强一致模型），更不是'A 的另一种说法'。A 指每个非故障节点都能在有限时间内返回非错误响应。"
            },
            {
              "question": "为什么说分布式系统里『放弃 P（CA）』基本做不到？",
              "options": [
                "网络分区是客观现实：只要跨网络部署，断网、丢包、超时就无法避免",
                "CA 模式的授权费用太高",
                "CA 需要专门的硬件支持"
              ],
              "answer": 0,
              "explanation": "P（分区容忍）描述的是'网络分区发生时系统还能继续运行'。跨网络部署就意味着断网、丢包、超时、交换机重启随时可能发生——P 不是可选项，而是前提。真正的工程问题是分区发生时牺牲 C 还是牺牲 A，这才有了 CP 与 AP 两条路线。"
            },
            {
              "question": "BASE 中的 E（Eventually consistent）和 ACID 中的 C（Consistency）是一回事吗？",
              "options": [
                "不是：ACID 的 C 指事务前后满足约束（偏强一致），BASE 的 E 指副本最终会收敛到一致",
                "是：都表示数据一致，只是叫法不同",
                "不是：ACID 的 C 指最终一致，BASE 的 E 指强一致"
              ],
              "answer": 0,
              "explanation": "ACID 的 C 是'事务把数据库从一个合法状态带到另一个合法状态'（约束不被破坏），配合隔离级别提供强一致语义；BASE 的 E 是'副本之间允许短暂不一致，但停止写入后最终会收敛到同一个值'。两套体系的 C 含义并不相同，混用会让技术方案描述失真。"
            },
            {
              "question": "Quorum 机制里，为什么要求 R + W > N？",
              "options": [
                "保证读集合与写集合必然有交集，读到的数据里至少有一份是最新的",
                "为了让读写速度更快",
                "为了节省存储空间"
              ],
              "answer": 0,
              "explanation": "N 是副本数，W 是写成功需要的副本数，R 是读需要询问的副本数。只要 R + W > N，读集合与写集合在数学上必然相交，读的时候就能靠版本号挑出最新值。Raft 的'多数派提交'正是 W = R = 多数派（N/2 + 1）的特例；若 R + W ≤ N，就可能读到一个完全没参与最新写入的集合，读到旧值。"
            }
          ]
        },
        {
          "id": "5-5",
          "title": "分布式事务",
          "icon": "🌐",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "下单要扣库存、扣余额、还要生成订单——三个操作跨了三个库。哔——扣了两步第三步失败了，谁来把前两步撤回去？先把三位选手请上台。"
              },
              "scene": "disttx",
              "sfx": "跨库!",
              "dropZone": [
                {
                  "vbx": 78,
                  "vby": 88,
                  "label": "扣库存"
                },
                {
                  "vbx": 222,
                  "vby": 88,
                  "label": "扣余额"
                },
                {
                  "vbx": 150,
                  "vby": 201,
                  "label": "出订单"
                }
              ],
              "explain": "🤔 先看一笔下单：扣 1 件库存、扣 100 元余额、生成 1 张订单——三个操作落在<strong>三个不同的库</strong>上。如果第一步扣完库存，第二步扣款失败，谁来把已经扣掉的那件库存加回去？<br>📐 单机事务里，InnoDB 用 undo/redo 保证『要么全成、要么全不成』；可一旦<strong>跨库、跨服务</strong>，<strong>没有任何一个数据库能替所有参与者做主</strong>——库存库根本不知道余额库的存在，它没能力把别人的事务一起回滚，更没有能力为这三笔操作提供<strong>统一的提交点</strong>。<br>🎯 所以必须引入一个<strong>协调者</strong>，来统一指挥三笔操作一起提交、或者一起回滚。点一点，先让三位参与者就位：库存、账户、订单。",
              "stage": [
                {
                  "type": "text",
                  "content": "📦 库存服务：扣 1 件库存",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "💰 账户服务：扣 100 元",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🧾 订单服务：生成 1 张订单",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "最经典的方案？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "最经典的方案叫 2PC：先问一遍'你准备好了吗'，再统一下达'提交'或'回滚'。哔——好用，但有两个致命弱点。听完我会一口气总结一段，里面有一句错得最离谱，帮我当场抓住。"
              },
              "scene": "disttx-2pc",
              "sfx": "两阶段!",
              "explain": "🤔 最经典的方案叫 2PC：先问一遍『你准备好了吗』，再统一下达『提交』或『回滚』。好用，但有两个致命弱点。<br>📐 <strong>两阶段提交</strong>：① <strong>准备阶段</strong>——协调者询问所有参与者『能提交吗』，参与者<strong>执行事务但不提交</strong>，锁住资源、写好 undo/redo，回复 yes 或 no；② <strong>提交阶段</strong>——全部 yes 就下令 commit，只要有一个 no 或超时，全体 rollback。<br>⚠️ 三个硬伤：<strong>同步阻塞</strong>——从准备到提交之间资源一直被锁着，吞吐很低；<strong>协调者单点</strong>——协调者宕机，参与者只能干等并长期持锁；<strong>不一致窗口</strong>——提交阶段部分参与者收到 commit、部分没收到就宕机，数据分叉。<br>🧠 <strong>3PC</strong> 把准备拆成 CanCommit + PreCommit 并加超时，减少阻塞，但分区下仍可能脑裂，工程上很少直接用。<br>🧩 学完两阶段，来听塔库总结一段——其中有一句是错的，看你能不能当场抓住。",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库清了清嗓子，拍着胸脯一口气说了下去——",
                "segments": [
                  {
                    "text": "下单要动库存、余额、订单三个库，谁也没法替所有参与者做主，只能请一位协调者统一指挥，"
                  },
                  {
                    "text": "最经典的方案是 2PC：先问所有参与者『能提交吗』，收齐 yes 再统一下达 commit，有一个 no 或超时就全体回滚，",
                    "check": true,
                    "why": "这句正确：准备阶段参与者执行事务但不提交，锁住资源、写好 undo/redo；提交阶段全 yes 才 commit，否则全体回滚。"
                  },
                  {
                    "text": "而准备阶段只是问一问、什么都不做，所以 2PC 几乎没有性能开销，",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：准备阶段参与者已经执行事务并锁住资源，从准备到提交之间一直持锁——这就是『同步阻塞』，吞吐很低；协调者若在此刻宕机，参与者只能干等并长期持锁，这是第二个硬伤『协调者单点』。"
                  },
                  {
                    "text": "也正因为这些硬伤，跨服务的场景工程上更常用 TCC、Saga、本地消息表这类最终一致方案。",
                    "check": true,
                    "why": "这句正确：它们的『回滚』语义各不相同——TCC 撤销 Try 阶段的资源预留，Saga 反向执行补偿冲正，本地消息表靠投递重试加消费幂等收敛——但都绕开了 2PC 的长期持锁。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "把镜头放慢：协调者要先写下自己的日志，否则它一宕机就'失忆'了。哔——按真实时序点出每一步。"
              },
              "scene": "disttx-2pc",
              "sfx": "记日志!",
              "explain": "🤔 把镜头放慢：协调者为什么要在发请求<strong>之前</strong>先写日志？因为它一旦宕机，就再也说不清自己做过什么了。<br>🎬 时序的关键在<strong>三块日志</strong>：协调者发起前的日志、协调者的『决定』日志（<strong>提交点</strong>）、参与者的 undo/redo。真正<strong>不可逆的时刻</strong>，是协调者写下决定的那一刻——此前一切都能回滚，此后必须重试到所有参与者都执行完。<br>🎯 失败处理也在两步里：投票阶段收不到全部 yes（或有人超时），就全局回滚；参与者一旦投了 yes，就<strong>只能被动等协调者的决定，等不到就一直持锁</strong>——这正是 2PC 最被诟病的地方。<br>🧠 按真实时序点出每一步，顺序颠倒就会出现数据分叉。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 按真实时序点击 2PC 的每一步",
                "steps": [
                  "协调者把事务写入自己的日志，然后向所有参与者发送『准备』请求",
                  "参与者执行事务但不提交：锁定资源、写 undo/redo，回复 yes 或 no",
                  "协调者收齐投票：只要有一个 no 或超时，就决定全局回滚",
                  "协调者把决定写入日志（提交点），再向所有参与者发送 commit / rollback",
                  "参与者按指令提交或回滚、释放锁，并回复『已完成』"
                ],
                "doneText": "🎉 两阶段走完！注意：决定一旦落日志，就必须重试到所有参与者都执行完。",
                "wrongText": "时序错了——必须先投票、再决定、最后才真正提交；顺序颠倒就会出现数据分叉"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "分布式事务里重试是家常便饭，可重试遇上'不幂等'的操作，就会重复扣款。哔——来当侦探，把这批回调里的惯犯揪出来！"
              },
              "scene": "disttx",
              "sfx": "查案!",
              "explain": "🤔 分布式事务里重试是家常便饭，可重试遇上『不幂等』的操作，就会<strong>重复扣款</strong>——用户投诉、财务对不上账。<br>📐 <strong>幂等</strong>的定义：同一个请求执行一次和执行多次，结果相同。判断方法只有一个问题：<strong>这一行再执行一遍，结果会不会变？</strong><br>🎯 逐行看下面的支付回调，点出所有不幂等的行。两类惯犯要记住：『在现有值上做增减』和『无唯一键的插入』。<br>⚠️ 提醒：第一行 <code>SET balance = 100</code> <strong>是幂等的</strong>——重复执行结果一样——但它会把别人的并发修改<strong>覆盖掉</strong>，属于『幂等但危险』，不是这道题要找的目标。<br>🧠 这就是侦探题的陷阱：<strong>幂等 ≠ 安全</strong>。",
              "interaction": {
                "type": "find",
                "question": "🔍 点出所有『重试就会出事』的不幂等操作",
                "rows": [
                  {
                    "text": "UPDATE account SET balance = 100 WHERE id = 7　—— 把余额改成固定值",
                    "hit": false
                  },
                  {
                    "text": "UPDATE account SET balance = balance - 100 WHERE id = 7　—— 在现有值上扣款",
                    "hit": true
                  },
                  {
                    "text": "先查去重表，再 INSERT 一条带唯一索引 (order_id, type) 的流水",
                    "hit": false
                  },
                  {
                    "text": "无条件 INSERT 一条支付流水，表上没有任何唯一索引",
                    "hit": true
                  },
                  {
                    "text": "UPDATE orders SET status = 'paid' WHERE id = 1001 AND status = 'created'　—— 状态机只允许 created → paid",
                    "hit": false
                  }
                ],
                "doneText": "🎉 抓到了！『在现有值上做增减』和『无唯一键的插入』，都是重试就会出事的惯犯。",
                "wrongText": "再想想：这一行如果被重试执行两次，结果会不会变？"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "happy",
                "dialogue": "四种主流方案，它们的'回滚'含义完全不同。哔——别把真回滚、业务补偿、重试幂等混为一谈，来配对！"
              },
              "scene": "tx-schemes",
              "sfx": "配一对!",
              "explain": "🤔 四种方案都叫『能回滚』，可它们的『回滚』根本<strong>不是同一件事</strong>。<br>🔗 2PC 是数据库<strong>真回滚</strong>（undo 撤销，数据像没发生过）；TCC 是调用 <strong>Cancel 接口</strong>（撤销 Try 阶段的预留）；Saga 是执行<strong>补偿动作</strong>（反向冲正，中间状态对外可见）；本地消息表靠<strong>重试 + 幂等</strong>收敛。<br>🎯 补偿语义不同，出故障时的排查方式也完全不同：2PC 看协调者与锁等待，TCC 看空回滚／悬挂，Saga 看补偿幂等与脏读，消息表看去重表与重投。<br>🧠 记住口诀：<strong>真回滚 ≠ 业务补偿 ≠ 重试幂等</strong>。来配对！",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的方案，配到右边它真正的补偿语义",
                "pairs": [
                  [
                    "2PC（两阶段提交）",
                    "准备 + 提交两阶段，由数据库回滚真正撤销，强一致但同步阻塞、协调者单点"
                  ],
                  [
                    "TCC（Try-Confirm-Cancel）",
                    "Try 预留资源、Confirm 确认、Cancel 取消；业务侵入大，要处理空回滚、悬挂与幂等"
                  ],
                  [
                    "Saga",
                    "长事务拆成一串本地事务，失败时反向执行补偿动作；没有隔离性，要防脏读（可用语义锁）"
                  ],
                  [
                    "本地消息表 / 事务消息",
                    "本地事务与消息写入同库，靠投递重试加消费幂等达成最终一致"
                  ],
                  [
                    "幂等设计",
                    "唯一键去重、状态机只允许 X→Y、Token / 去重表——重试的安全带"
                  ]
                ],
                "wrongText": "这两者的补偿语义不一样：一个是数据库真回滚，一个是业务自己补偿，再看看",
                "doneText": "🎉 补偿语义分清楚了：真回滚 ≠ 业务补偿 ≠ 重试幂等！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "normal",
                "dialogue": "最后收一份避坑清单：TCC 的三个坑，Saga 的隔离性，还有一句必须记牢的大实话。哔——"
              },
              "scene": "tcc-pitfalls",
              "sfx": "避坑!",
              "explain": "🤔 这一页是避坑清单——下面三条 TCC 的坑，<strong>不处理必出事故</strong>。<br>⚠️ <strong>TCC 的三个经典坑</strong>：① <strong>空回滚</strong>——Try 根本没执行（例如请求超时未到达），Cancel 却先来了，Cancel 必须能识别『我没 Try 过』并直接返回成功；② <strong>悬挂</strong>——Cancel 先执行完，迟到的 Try 又来了，把资源<strong>永久预留</strong>住，要靠『防悬挂』记录拦住后到的 Try；③ <strong>幂等</strong>——网络抖动会让 Confirm/Cancel 重复到达，同一笔必须只生效一次。<br>🎯 <strong>Saga</strong>：长事务拆成一串本地事务 T1…Tn，失败时反向补偿 Cn…C1。它<strong>没有隔离性</strong>——别人可能读到『钱扣了但订单还没出』，可用<strong>语义锁</strong>（把记录标记为『处理中』）缓解。<br>🧠 最后一句记牢：<strong>分布式事务里的『回滚』多数不是数据库回滚，而是业务补偿</strong>；补偿必须<strong>幂等、可重试、可对账</strong>——对账是最后一道防线。",
              "stage": [
                {
                  "type": "text",
                  "content": "🕳️ 空回滚：没 Try 就先 Cancel",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🎈 悬挂：Cancel 先到，迟到的 Try 把资源占死",
                  "className": "organized-item"
                },
                {
                  "type": "text",
                  "content": "🧾 补偿三件套：幂等 + 重试 + 对账",
                  "className": "organized-item"
                }
              ],
              "interaction": {
                "type": "click",
                "text": "收下清单 ▶"
              }
            },
            {
              "id": 7,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——TCC 里的 Cancel 遇到『Try 根本没执行过』，正确做法是什么？"
              },
              "scene": "tx-schemes",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "interaction": {
                "type": "quiz",
                "question": "❓ TCC 的 Cancel 遇到『Try 从未执行』的空回滚，正确做法是？",
                "options": [
                  "识别出这是空回滚，直接返回成功，同时留下防悬挂标记拦住迟到的 Try",
                  "报错让上层一直重试，直到 Try 到达为止",
                  "照样执行业务回滚，把没扣过的钱加回去"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "2PC 最主要的两个缺点是什么？",
              "options": [
                "同步阻塞（准备到提交之间一直持锁）和协调者单点（协调者宕机则参与者干等）",
                "不支持回滚和无法持久化",
                "只能用于两台机器，超过三台就报错"
              ],
              "answer": 0,
              "explanation": "准备阶段参与者已经执行事务并锁住资源，却要等协调者的最终决定——这段时间业务被阻塞，吞吐急剧下降。协调者一旦宕机，参与者既不能提交也不能回滚，只能长期持锁等待（还可能产生数据不一致窗口）。3PC 用预询问和超时缓解阻塞，但换来了脑裂风险。"
            },
            {
              "question": "TCC 和 Saga 的『补偿』有什么本质区别？",
              "options": [
                "TCC 有 Try 阶段的资源预留，Cancel 只需撤销预留；Saga 直接提交本地事务，失败后靠补偿动作反向冲正，且没有隔离性",
                "两者完全一样，只是名字不同",
                "Saga 是数据库回滚，TCC 是业务补偿"
              ],
              "answer": 0,
              "explanation": "TCC 通过 Try 把资源'冻结'（如把余额从可用转入冻结），Confirm 只是确认扣减，Cancel 只是解冻，因此不会出现已被别人花掉的钱。Saga 每一步都真实提交，中间状态对外可见（没有隔离性），补偿只能'反向冲正'，所以要防脏读（语义锁）、要求补偿幂等。2PC 才是数据库层面的真回滚。"
            },
            {
              "question": "为什么『重试』必须搭配『幂等』？",
              "options": [
                "重试不可避免（超时无法区分成功与失败），不幂等的操作重试会导致重复扣款、重复发券",
                "重试会让数据库变慢，幂等能加速",
                "幂等可以让重试次数变少"
              ],
              "answer": 0,
              "explanation": "网络超时后，调用方并不知道对方到底执行成功没有——只能重试。如果操作是'余额减 100'这种非幂等的，重试就会重复扣款。常用幂等手段：唯一键去重表、状态机（只允许 created→paid）、Token 机制、带版本号的条件更新；补偿与消息消费同样必须幂等。"
            },
            {
              "question": "3PC 相比 2PC 改进了什么，又没解决什么？",
              "options": [
                "用『预询问 + 准备』两阶段加超时减少了阻塞，但网络分区下仍可能脑裂、数据不一致",
                "彻底消除了阻塞和单点故障",
                "把两阶段合并成一阶段，速度更快"
              ],
              "answer": 0,
              "explanation": "3PC 把 2PC 的准备阶段拆成 CanCommit（预询问）与 PreCommit（准备），并让参与者在超时后可以自行决定提交，从而在协调者失联时减少长时间持锁。但它引入新的不一致可能：分区时一部分节点超时提交、另一部分回滚，系统状态分叉（脑裂）。因此生产上更常见的是 TCC、Saga、本地消息表这类最终一致方案。"
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "第6章：向量数据库与AI",
      "knowledgePoints": [
        {
          "id": "6-1",
          "title": "什么是向量",
          "icon": "🧭",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——在 AI 眼里，'猫'不是一个字，而是 768 个小数！点一点右边三件道具，看文字怎么'变身'成向量。"
              },
              "scene": "vector",
              "sfx": "变身!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🧭 向量区"
              },
              "explain": "🤔 先别谈定义：如果让你写一条 <code>WHERE content LIKE '%猫%'</code>，用户搜『猫咪喂养』就永远搜不到『怎么养猫』——<strong>字面不同、意思相同，关键词匹配天生抓不住</strong>。<br>📐 <strong>Embedding（嵌入）</strong>＝用一个<strong>编码模型</strong>把文本喂进去，吐出一串<strong>定长实数向量</strong>。单个数字没意义，<strong>整串的方向才有意义</strong>：语义相近的对象在空间里彼此靠近。'猫' [0.21,-1.32,…] 与'小猫' [0.19,-1.28,…] 几乎重合，和'汽车' [-2.13,0.74,…] 隔得很远，维度一律 768。<br>🎯 <strong>维度由模型决定</strong>：384（MiniLM 一类小模型）/ 768（BERT-base 系）/ 1536（OpenAI ada-002）。<br>🧠 一句话记住：<strong>向量 = 模型替语义画的坐标；模型一换，整张地图都得重画。</strong>哔——点一点右边三件道具，把它们收进向量区！",
              "stage": [
                {
                  "type": "text",
                  "content": "🐱 '猫' → [0.21, -1.32, 0.87, …] 共 768 维",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🐈 '小猫' → [0.19, -1.28, 0.91, …] 挨得很近",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🚗 '汽车' → [-2.13, 0.74, -0.42, …] 离得很远",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "维度是什么？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "confused",
                "dialogue": "哔？那第 3 维是不是'可爱度'、第 7 维是不是'毛茸茸程度'？——都不是！拆开看完，再答我一个名字。"
              },
              "scene": "vectorDims",
              "sfx": "拆开看!",
              "explain": "🤔 初次看到 768 个小数，几乎所有人都会猜：第 3 维是『可爱度』、第 7 维是『毛茸茸程度』吧？——<strong>都不是</strong>。<br>📐 <strong>维度 ≠ 可读属性</strong>：768 维可以想成高维空间里的一个点，但<strong>单独拎出某一维，你说不出它的物理含义</strong>——它是模型在训练里自己学出来的抽象坐标，语义分散在整串数字的方向上。<br>🎯 只有两种情况谈得上'单维语义'：① <strong>人工特征</strong>，比如你手写拼的 [年龄, 价格, 点击率, …]；② 个别<strong>可解释维度</strong>，比如某些图像模型里恰好对应亮度的那一维。常见规格：<strong>384</strong>（MiniLM 小模型）/ <strong>768</strong>（BERT-base 系）/ <strong>1536</strong>（OpenAI ada-002）；维度也不是越大越好——翻倍则存储与检索开销大致线性上涨，效果未必跟着涨。<br>🧠 一句话记住：<strong>维度是'有几个分量'（规格），不是'每个分量代表什么'（语义）。</strong>哔——顺手考你个行话：把文本喂进模型、吐出一串定长向量的这套技术，行话叫什么？",
              "interaction": {
                "type": "input",
                "question": "把文本喂进编码模型、吐出一串定长实数向量的技术，行话叫 ______？（一个英文单词，写中文名也算对）",
                "accept": [
                  "embedding",
                  "embedding model",
                  "embedding模型",
                  "嵌入",
                  "嵌入模型",
                  "embedding（嵌入）"
                ],
                "placeholder": "一个词…",
                "hint": "E 开头的英文单词，中文叫「嵌入」——把一个对象「嵌」进向量空间，变成一串有方向的坐标。",
                "doneText": "🎉 对，Embedding！就是它把语义「嵌」进了高维地图。"
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "别背名词，来配对——左边这些家伙，右边才是它们真正的含义。"
              },
              "scene": "vector",
              "sfx": "配对!",
              "explain": "🤔 面试常问：『维度』和『某一维的含义』，是同一件事吗？——<strong>不是</strong>，一个说的是<strong>数量</strong>，一个说的是<strong>内容</strong>。<br>📐 前者问'这个向量有几个分量'（384 / 768 / 1536？），由模型规格决定，翻文档就有答案；后者问'第 3 个数字代表什么'，在 embedding 里通常<strong>说不出所以然</strong>——语义藏在整体方向里，拆开就没了。<br>🎯 <strong>具体例子</strong>：拿同一句『怎么养猫』，MiniLM 输出 384 个数、BERT-base 输出 768 个数；数字个数变了，但任何一维你都读不出含义。更狠的一点：<strong>换 embedding 模型，旧向量全部失效</strong>——必须全量重算并重建索引。<br>🧠 一句话记住：<strong>维度是规格，含义是语义；规格能查，语义只能靠整体比。</strong>点左边一项，再点右边它的解释。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的概念，和右边它真正的含义配成一对",
                "pairs": [
                  [
                    "Embedding（嵌入）",
                    "把对象映射成固定长度实数向量的过程"
                  ],
                  [
                    "向量的维度",
                    "分量的个数（如 384 / 768 / 1536），由所用的模型决定"
                  ],
                  [
                    "某一维的含义",
                    "通常没有可读的物理含义，语义藏在整体方向里"
                  ],
                  [
                    "语义相近",
                    "在同一个向量空间里，两个向量彼此靠得更近"
                  ],
                  [
                    "换 embedding 模型",
                    "旧向量全部失效：必须全量重算并重建索引"
                  ]
                ],
                "doneText": "🎉 五个概念全部归位！",
                "wrongText": "这条含义对不上——想想'是谁在决定这个数字'"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "流程走一遍就记住了：文本进、向量出。把词块点进空格里！"
              },
              "scene": "vectorDims",
              "explain": "🤔 一段文本，怎么变成'能检索的向量'？中间少一步、错一步，检索就全废。<br>📐 全程四步：送进 <strong>编码模型</strong> → 得到定长<strong>实数向量</strong> → 与原文一起写进<strong>向量数据库</strong> → 建索引，才能按语义查。<br>🎯 <strong>具体例子</strong>：把『怎么养猫』编码成 768 个浮点数，再把原文存进向量库的标量字段——向量用来找，原文用来给模型读。最易踩坑的是第三个空：<strong>文档和用户问题必须用同一个模型编码</strong>，否则两者根本不在同一张地图上，算出来的相似度毫无意义。<br>🧠 一句话记住：<strong>文本进、向量出、一起入库；分词器影响'模型看到什么'，真正产出向量的永远是编码模型。</strong>把词块点进空格里！",
              "interaction": {
                "type": "fill",
                "question": "🧩 把'文本 → 可检索向量'的流程填完整",
                "sentence": [
                  "把一段文本送进 ",
                  "{0}",
                  "，得到固定长度的 ",
                  "{1}",
                  "；想让'文档'和'用户问题'能互相比较，两者必须用 ",
                  "{2}",
                  " 编码；最后把向量连同原文一起写进 ",
                  "{3}",
                  " 并建好索引，才能按语义检索。",
                  ""
                ],
                "options": [
                  "编码模型（embedding model）",
                  "实数向量",
                  "同一个模型",
                  "向量数据库",
                  "分词器（tokenizer）",
                  "关系主键"
                ],
                "answers": [
                  "编码模型（embedding model）",
                  "实数向量",
                  "同一个模型",
                  "向量数据库"
                ],
                "doneText": "🎉 流程打通：文本 → 向量 → 入库 → 可检索！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "最容易翻车的地方来了——换了模型，旧的向量还能接着用吗？"
              },
              "scene": "vectorReindex",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "🤔 公司把 embedding 模型从 A 升级到 B，旧的 2000 万条向量还能接着用吗？——<strong>不能，一条都不能</strong>。<br>📐 模型 A 和模型 B 各自定义了一套坐标系：<strong>把 A 的向量和 B 的向量算余弦，数字再漂亮也毫无意义</strong>，它们压根不在同一张地图上。<br>🎯 <strong>具体例子</strong>：只给新文档用 B 编码、旧数据留着 A，检索时新文档会系统性霸榜，旧文档几乎再也召不回来。正确做法是<strong>全量重算 + 重建索引</strong>，用评测集确认召回没退化再切流量。另外<strong>维度不是越大越好</strong>：384 维小模型做语义搜索常常够用，1536 维意味着存储与计算成倍上涨。<br>🧠 一句话记住：<strong>向量是模型给语义画的坐标，模型一换，地图就换。</strong>",
              "interaction": {
                "type": "click",
                "text": "考考你 ▶"
              }
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——关于向量，下面哪个说法站得住脚？"
              },
              "scene": "vectorModelMap",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 先别急着点选项，回忆三句：向量是<strong>哪个模型</strong>画的坐标？单独一维<strong>说得出</strong>含义吗？维度变大，存储与召回<strong>一定</strong>更好吗？",
              "interaction": {
                "type": "quiz",
                "question": "❓ 关于向量，哪个说法是对的？",
                "options": [
                  "同一个模型编码出的向量才有可比性，换模型要全量重算并重建索引",
                  "向量的第 3 维通常表示'可爱程度'这类可读属性",
                  "维度越高，检索结果一定越准"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "为什么'猫'和'狗'的向量距离，比'猫'和'汽车'更近？",
              "options": [
                "编码模型从海量语料里学到了语义：语义相近的对象被映射到相近的位置",
                "因为'猫'和'狗'的笔画数接近",
                "向量是随机分布的，纯属巧合"
              ],
              "answer": 0,
              "explanation": "embedding 模型的训练目标，就是让'语义与共现关系相近'的对象在向量空间里靠得更近。这件事和字面、笔画都无关——『猫咪喂养指南』和『怎么养猫』一个字都不重，向量却可以很近，这正是向量检索能'按意思搜'的原因。"
            },
            {
              "question": "给你一个 1536 维向量，你能说出第 3 维代表什么吗？",
              "options": [
                "通常说不出：绝大多数维度没有可读的物理含义",
                "一定能，每一维都对应一个人工定义的属性",
                "能，第 3 维固定表示'情感倾向'"
              ],
              "answer": 0,
              "explanation": "只有人工特征向量（你手写拼出来的那一串），或者个别被验证过的可解释维度，才谈得上单维语义。神经网络学出来的 1536 个维度是抽象坐标，语义分散在整个向量的方向与位置上，拆开看单个分量是没有意义的。"
            },
            {
              "question": "公司的 embedding 模型从 A 升级到 B，向量库该怎么处理？",
              "options": [
                "全量重新编码 + 重建索引，保证新旧数据出自同一个模型",
                "只把新入库的文档用 B 编码，旧向量留着继续用",
                "把 A 的向量和 B 的向量放一起算相似度就行"
              ],
              "answer": 0,
              "explanation": "不同模型的空间互相独立，混着存会让检索结果系统性地偏向某一批数据。正确做法是版本化切换：全量重算、重建索引，用评测集确认召回没退化，再切线上流量——这也是'换模型'最贵的那部分成本。"
            },
            {
              "question": "'文本长度翻倍，输出向量的维度也会翻倍'——这个说法对吗？",
              "options": [
                "不对：维度是模型的输出规格，文本再长也还是同一个维度",
                "对，文本越长维度越高",
                "对，但只对中文成立"
              ],
              "answer": 0,
              "explanation": "维度是模型固定的输出规格（384 / 768 / 1536 都是常见值）。长文本会被截断或切成多块，但每一块产出的向量维度始终一致——这正是向量数据库能建定长索引、做批量矩阵运算的前提。"
            }
          ]
        },
        {
          "id": "6-2",
          "title": "向量相似度与距离",
          "icon": "📐",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——两个向量谁更'像'？得用尺子量。点一点三把尺子，看它们各量的是什么。"
              },
              "scene": "distance",
              "sfx": "量一量!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "📏 度量区"
              },
              "explain": "🤔 两篇文档的向量谁更'像'？——尺子有三把，量的是三件不同的事，选错结果全反。<br>📐 <strong>余弦相似度</strong>看<strong>方向</strong>：cos = (A·B) / (|A||B|)，取值 <strong>-1 ~ 1</strong>，夹角越小越像，1 = 方向完全一致。<strong>欧氏距离（L2）</strong>看<strong>位置差</strong>：两点之间的直线距离，越小越像，<strong>对向量长度敏感</strong>。<strong>内积（点积，IP）</strong>直接算 A·B：<strong>点积 = cos × |A| × |B|</strong>，方向和长度一起算。<br>🎯 <strong>具体例子</strong>：文档 A 的模长是文档 B 的 3 倍但方向几乎一样，cos 给 0.96（很相似），L2 却给出 12.7 的'有点远'——同一对向量，两个相反的结论。<br>🧠 一句话记住：<strong>余弦比方向、欧氏比位置、内积比'方向 × 长度'。</strong>哔——点一点，把三把尺子收进度量区！",
              "stage": [
                {
                  "type": "text",
                  "content": "📐 余弦：只看夹角，忽略长度",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "📏 欧氏：两点直线距离，长度会算进去",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "✖️ 内积：方向 × 长度，一起算",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "有什么讲究？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "记住三条铁律，能帮你少踩半年坑。学完别急着背，用自己的话讲给我听。"
              },
              "scene": "distance",
              "sfx": "铁律!",
              "explain": "🤔 为什么老工程师总说'先归一化'？因为记住三条铁律，能帮你少踩半年坑。<br>📐 ① <strong>余弦与长度无关</strong>：把向量整体乘 10 倍，cos 一点不变——长短文本混在一个库里检索时，这个性质特别值钱。<br>② <strong>L2 归一化后，余弦 = 内积</strong>：把每个向量除以自己的模长，|A| = |B| = 1，分母变成 1，cos = A·B——工程上省一次除法，现成的内积索引直接可用 ⚡。<br>③ <strong>度量必须与索引、模型匹配</strong>：Milvus 里 <code>metric_type</code> 写 <code>IP</code> / <code>COSINE</code> / <code>L2</code>，<strong>建索引时就定死</strong>；索引按 L2 建、查询却按内积排序，排出来的'最相似'<strong>就是错的</strong>——不报错，只是答非所问。<br>🧠 一句话记住：<strong>度量选错 = 结果全错。归一化省一次除法，度量不一致赔一次事故。</strong>哔——现在换你当老师：",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：长短不一的文档混在一个库里检索时，为什么余弦相似度比欧氏距离更靠谱？",
                "reference": "余弦只看两个向量的「方向」（夹角），不看模长——向量整体乘几倍，cos 都不变，长短文档一视同仁；欧氏距离把「长度差」算进距离，长文档模长天生更大，容易被误判成'不相似'。所以混检时余弦恰好把长度这个干扰剥掉了；而且归一化后余弦等于内积，工程实现还更省事。",
                "keywords": [
                  "方向",
                  "长度",
                  "夹角",
                  "归一化"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "别背公式，走一遍计算过程：给你 A、B 两个向量，你怎么手算出余弦？"
              },
              "scene": "metricCos",
              "sfx": "算一算!",
              "explain": "🤔 面试让你白板手算两个 3 维向量的余弦，你会先算什么？——很多人上来就相除，结果顺序全反。<br>📐 余弦的本质是'<strong>先把长度除掉，再比方向</strong>'：<strong>点积</strong>衡量两个向量有多一致，<strong>模长之积</strong>负责把长度因素归一掉。<br>🎯 <strong>具体例子</strong>：A = [1, 2, 3]、B = [2, 4, 6]（B 正好是 A 的 2 倍长）。点积 = 2+8+18 = 28，|A| = √14 ≈ 3.74，|B| ≈ 7.48，cos = 28 ÷ 27.98 ≈ 1.00——长度翻倍，相似度一点没变，这正是余弦的价值。<br>🧠 一句话记住：<strong>先点积、再模长、最后相除，四步一步都不能颠倒。</strong>按正确顺序点出这四步。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 手算两个向量的余弦相似度，按正确的计算顺序点击四步",
                "steps": [
                  "① 逐位相乘再求和：算出点积 A·B",
                  "② 各分量平方求和再开方：算出两个模长 |A| 和 |B|",
                  "③ 点积 ÷（|A| × |B|）：得到 -1 ~ 1 之间的余弦值",
                  "④ 对所有候选按余弦降序排，取前 top-k 作为检索结果"
                ],
                "doneText": "🎉 顺序正确！余弦 = 点积 ÷ 两个模长之积",
                "wrongText": "顺序不对哦——先算点积，再算模长，最后才相除"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "拨动开关，把两把尺子摆在一起看——它们的脾气完全不同。"
              },
              "scene": "metricCompare",
              "explain": "🤔 同一对向量，换一把尺子，结论能从『非常相似』变成『有点远』——你信哪个？<br>📐 场景：文档 A 的向量长度是文档 B 的 3 倍，方向几乎一致（两篇都在讲猫粮）。<strong>余弦只看夹角</strong>，报 cos = 0.96『非常相似』；<strong>欧氏把长度差算进距离</strong>，报 dist = 12.7『有点远』。<br>🎯 <strong>为什么</strong>：文本语义检索默认用余弦，因为长文档的模长天生更大，容易在 L2 下被误判成'不相似'；而图像、音频模型常配 L2，因为它们训练时就是按 L2 优化的。<br>🧠 一句话记住：<strong>没有'更好的度量'，只有'和模型训练目标一致的度量'。</strong>动手前先看模型文档，别凭感觉选。拨动开关，看两把尺子怎么判。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 同一对向量，余弦和欧氏会给出完全不同的判断",
                "states": [
                  {
                    "label": "📐 余弦相似度 cos",
                    "metric": "cos = 0.96 → 判定：非常相似",
                    "time": "与向量长度无关",
                    "note": "只看夹角。长短文本混检、语义检索的默认选择；代价是丢掉了'长度'里可能携带的信息（比如强度、置信度）。",
                    "tone": "good"
                  },
                  {
                    "label": "📏 欧氏距离 L2",
                    "metric": "dist = 12.7 → 判定：有点远",
                    "time": "对向量长度敏感",
                    "note": "长度差被算进距离：模长 3 倍的那条会被推远。图像、音频模型常用 L2，因为它们训练时就是按 L2 优化的；用在长短不一的文本上，容易把'长文档'误判成'不相似'。",
                    "tone": "bad"
                  }
                ],
                "doneText": "🎉 一个看方向，一个看位置——别混用！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "happy",
                "dialogue": "最后一关：把公式和两条工程铁律填完整，填完你就出师了。"
              },
              "scene": "metricNormalize",
              "explain": "🤔 公式背得滚瓜烂熟，为什么还会出事故？因为<strong>第四个空</strong>才是生产环境的高发区——代码能跑、不报错，结果却南辕北辙。<br>📐 补全后：cos = <strong>A·B</strong> ÷ <strong>|A| × |B|</strong>；两个向量都做 L2 归一化（模长变成 1）之后，分母为 1，cos 就等于<strong>内积</strong>；可如果索引按 L2 建、查询时却按内积排序，结果<strong>就是错的</strong>。<br>🎯 顺手澄清一个常见混淆：这里的<strong>归一化指 L2 归一化</strong>——把向量除以自己的模长，让长度为 1；<strong>不是</strong>把每一维缩放到 0~1 的区间缩放，两者不是一回事。<br>🧠 一句话记住：<strong>公式只有一个，坑全在'度量、索引、模型三者是否一致'上。</strong>填完这一页你就出师了。",
              "interaction": {
                "type": "fill",
                "question": "🧩 补全余弦公式与两条工程铁律",
                "sentence": [
                  "余弦相似度 cos = ",
                  "{0}",
                  " ÷ ",
                  "{1}",
                  "；把两个向量都做 L2 归一化（模长变成 1）后，cos 就等于 ",
                  "{2}",
                  "；如果索引按 L2 建、查询时却按内积排序，结果 ",
                  "{3}",
                  "。",
                  ""
                ],
                "options": [
                  "A·B（点积）",
                  "|A| × |B|（两个模长之积）",
                  "内积（点积）",
                  "就是错的（度量和索引必须一致）",
                  "A + B（逐位相加）",
                  "曼哈顿距离"
                ],
                "answers": [
                  "A·B（点积）",
                  "|A| × |B|（两个模长之积）",
                  "内积（点积）",
                  "就是错的（度量和索引必须一致）"
                ],
                "doneText": "🎉 公式与铁律全对！度量选错，再快的索引也是白搭"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——文本语义检索里，最常用的那把尺子是哪个？为什么？"
              },
              "scene": "metricCos",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 三个选项里，有两个是'听着像距离、其实用错了地方'的度量。先想：长短不一的文本混在一个库里，哪种度量最不怕长度干扰？",
              "interaction": {
                "type": "quiz",
                "question": "❓ 文本语义检索里最常用的度量是？",
                "options": [
                  "余弦相似度：只看方向，不受文本长短影响",
                  "曼哈顿距离：绝对值相加，算得最快",
                  "汉明距离：适合连续的浮点向量"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "向量做了 L2 归一化之后，余弦相似度和内积是什么关系？",
              "options": [
                "相等：两个模长都变成 1，分母为 1，cos 就等于内积",
                "互为倒数",
                "没有关系，是两个独立的量"
              ],
              "answer": 0,
              "explanation": "cos = (A·B) / (|A||B|)。归一化后 |A| = |B| = 1，分母是 1，于是 cos = A·B。这就是工程上'先归一化、再用内积索引'省下一次除法的根据——很多向量库的 COSINE 度量内部就是这么实现的。"
            },
            {
              "question": "如果建索引时用 L2、查询时却按内积排序，会发生什么？",
              "options": [
                "排序结果是错的：召回的是'按错误标准最像'的数据",
                "只是慢一点，结果不变",
                "数据库一定当场崩溃"
              ],
              "answer": 0,
              "explanation": "Milvus 里索引的 metric_type 与查询不一致，常常直接报错；但更隐蔽的情况是'能跑通却答非所问'——比如模型是按余弦训练的，你却用 L2 排序。度量是索引定义的一部分，建索引时就定死了，改度量等于重建索引。"
            },
            {
              "question": "文档 A 的向量长度是文档 B 的 3 倍、方向几乎相同，余弦和欧氏会怎么判？",
              "options": [
                "余弦判'非常相似'，欧氏判'有距离'",
                "两者都判相似",
                "两者都判不相似"
              ],
              "answer": 0,
              "explanation": "余弦只看夹角，方向一致就给高分；欧氏把长度差算进距离里，模长 3 倍的那条会被推远。所以'长文档和短文档混在一个库里检索'时，用 L2 会系统性地歧视长文本——选度量前，先看 embedding 模型是按什么目标训练的。"
            },
            {
              "question": "公式 '点积 = cos × |A| × |B|' 说明了什么？",
              "options": [
                "内积同时含方向和长度信息，未归一化时不能直接当余弦用",
                "点积永远等于余弦",
                "点积与向量长度无关"
              ],
              "answer": 0,
              "explanation": "把公式拆开看：cos 是方向，|A| × |B| 是长度。内积把两者乘在一起，所以它奖励'又像又长'的向量。如果你的语义相似度只想看方向，要么用 COSINE，要么先归一化再用内积——否则'长文档'会因为模长大而凭空得分。"
            }
          ]
        },
        {
          "id": "6-3",
          "title": "维度灾难与 HNSW",
          "icon": "🕸️",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "哔——1 亿条向量，逐条比距离要几十秒。HNSW 的绝招：先大步跳，再小步找！点一点它的三件法宝。"
              },
              "scene": "hnsw",
              "sfx": "跳一跳!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🕸️ 导航图"
              },
              "explain": "🤔 1 亿条向量，逐条比距离要几十秒——线上业务等不起。凭什么能变快？<br>📐 <strong>HNSW（Hierarchical Navigable Small World，分层可导航小世界图）</strong>把'最近邻搜索'变成'<strong>图上跳着走</strong>'：<br>· <strong>上层稀疏</strong>：节点少、边很长，用来<strong>大步跨越</strong>，几步就到目标附近；<br>· <strong>越往下越密</strong>：边变短，用来<strong>精细定位</strong>；<br>· <strong>最底层包含全部节点</strong>，最终答案在这里产出；<br>· 代价是<strong>近似</strong>：召回率通常 95%+，但<strong>不是 100%</strong>，而且图结构最吃内存。<br>🎯 <strong>具体例子</strong>：从顶层入口点跳 3~4 次就能落到目标附近，再在最底层微调几下——只访问几十个节点，比全量比 1 亿次快了几个数量级。<br>🧠 一句话记住：<strong>先大步跳、再小步找。</strong>哔——点一点右边三件法宝，把它们收进导航图！",
              "stage": [
                {
                  "type": "text",
                  "content": "🧭 上层稀疏图：几步跨过半个空间（长跳）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🕸️ 下层密集图：小步微调，逼近目标（精查）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🎯 近似检索：召回率 95%+，速度快百倍",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "为什么要近似？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "confused",
                "dialogue": "为什么不老老实实精确查找？——因为在高维空间里，'找最近'这件事本身就失灵了。听完来逐条判牌。"
              },
              "scene": "hnswLayers",
              "sfx": "薄壳!",
              "explain": "🤔 为什么不老老实实精确查找？——因为在几十维以上的空间里，'找最近'这件事本身就失灵了。<br>📐 <strong>维度灾难</strong>：维度升高时空间体积几乎全部集中在<strong>薄壳</strong>上，任意两点距离<strong>趋于接近</strong>，最近邻与最远邻的距离之比<strong>趋近 1</strong>。后果很直接：靠'分区域剪枝'的<strong>树形索引失效</strong>——KD 树、R 树到几十维就退化成全表扫描；想让'最近'和'次近'区分开，需要比较的候选点呈指数级增长。<br>🎯 于是改用 <strong>ANN（近似最近邻）</strong>，用极小的召回损失换百倍速度。三种主流索引：<strong>HNSW</strong> 分层图，快且准、最吃内存；<strong>IVF</strong> 先聚类分桶，查询只看 <code>nprobe</code> 个桶；<strong>PQ</strong> 乘积量化压缩向量，省内存损精度，常组合成 <code>IVF_PQ</code>。<br>🧠 一句话记住：<strong>ANN 召回率小于 100%，'检索结果里没有'不等于'库里没有'。</strong>哔——下面几句话，逐条判对错：",
              "interaction": {
                "type": "judge",
                "question": "下面几句话，分别判断对错：",
                "statements": [
                  {
                    "text": "维度升高后，最近邻与最远邻的距离之比会趋近 1，靠'分区剪枝'的树形索引随之失效。",
                    "answer": true,
                    "why": "这正是维度灾难：空间体积集中到薄壳上、点与点距离趋于接近，KD 树、R 树几十维就退化成全表扫描，所以才需要 ANN 近似结构。"
                  },
                  {
                    "text": "HNSW 检索返回的结果是精确的最近邻。",
                    "answer": false,
                    "why": "HNSW 是近似最近邻检索（ANN）：贪心跳跃可能停在局部最优，召回率通常 95%+ 但不是 100%；想提高召回要调大 efSearch，代价是查询变慢。"
                  },
                  {
                    "text": "PQ 用乘积量化把向量压成短码，距离计算和压缩前一样精确。",
                    "answer": false,
                    "why": "PQ 省内存的代价是距离被'估算'、精度下降，所以常与 IVF 组合成 IVF_PQ，在成本与精度之间取舍。"
                  },
                  {
                    "text": "IVF 查询时只进最可能相关的 nprobe 个桶：桶选得越少越快，但召回越低。",
                    "answer": true,
                    "why": "IVF 先聚类分桶，nprobe 就是'这次查几个桶'的旋钮：少了快而漏，多了慢而全，本质还是精度与速度的取舍。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "同一批 1 亿条向量，两种查法差多少？拨动开关，看看账本。"
              },
              "scene": "curseShell",
              "explain": "🤔 同一批 1 亿条 768 维向量，同一条查询，两种查法差多少？先把账算清楚。<br>📐 <strong>Flat（暴力精确）</strong>：和库里每个向量都算一次距离，<strong>召回率 100%</strong>，一条都不会漏，代价是单次查询<strong>秒级</strong>——几万条以内或离线跑评测完全够用。<strong>HNSW（近似）</strong>：只沿图探索一小部分节点，单次<strong>毫秒级</strong>，召回率 95%~99%，可用参数调。<br>🎯 <strong>具体例子</strong>：1 亿 × 768 维逐条比对，即使每秒能算 1 亿次也要 1 秒以上；HNSW 只访问几十上百个点，毫秒返回。漏掉的那几条通常排在语义尾部，对答案影响很小——但这个'很小'<strong>必须用评测集量出来</strong>，不能拍脑袋相信。<br>🧠 一句话记住：<strong>近似 ≠ 不准；真正危险的是压根不知道自己的召回率是多少。</strong>拨动开关看账本。",
              "interaction": {
                "type": "toggle",
                "question": "🎚️ 精确检索 vs 近似检索：同一批数据的两种命运",
                "states": [
                  {
                    "label": "🐢 暴力精确检索（Flat）",
                    "metric": "召回率 100%：一条都不会漏",
                    "time": "单次查询：秒级（1 亿 × 768 维逐条比对）",
                    "note": "和库里的每一个向量都算一次距离，结果绝对准确。几万条以内、或离线跑评测时完全够用；上亿条时，这个延迟任何线上业务都扛不住。",
                    "tone": "bad"
                  },
                  {
                    "label": "⚡ HNSW 近似检索",
                    "metric": "召回率 95%~99%（可用参数调）",
                    "time": "单次查询：毫秒级",
                    "note": "沿图跳着找，只探索一小部分节点。漏掉的那几个点通常排在语义排序的尾部，对最终答案影响很小——但这个'很小'必须用评测集量出来，而不是拍脑袋相信。",
                    "tone": "good"
                  }
                ],
                "doneText": "🎉 100% 精确 vs 毫秒级近似，工程上几乎总选后者"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "happy",
                "dialogue": "来，跟着查询向量在 HNSW 里走一趟——看清'逐层下钻'到底怎么走。"
              },
              "scene": "hnsw",
              "sfx": "下钻!",
              "explain": "🤔 查询向量进了 HNSW，到底怎么走？顺序错一步，理解就全歪了。<br>📐 流程：从<strong>最上层入口点</strong>进入，沿长边贪心跳到离 q 更近的节点；当前层四周没有更近的邻居时（<strong>局部最优</strong>），<strong>下沉</strong>到下一层继续搜；到<strong>最底层</strong>做精细搜索，把访问过的点按距离维护进候选队列，最后取距离最小的 top-k 返回。<br>🎯 关键在<strong>第 ② 步的贪心</strong>：每一步只走向'当前看来更近'的邻居，所以可能停在局部最优、错过真正的最近邻——这正是召回率达不到 100% 的根本原因，也是 <code>efSearch</code> 调大能提升召回的原因。<br>🧠 一句话记住：<strong>先粗后细、从上往下；贪心换速度，efSearch 换召回。</strong>按正确顺序点这五步。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 一次 HNSW 查询的五个步骤，按真实顺序点击",
                "steps": [
                  "① 从最上层的入口点进入，沿长边跳到离 q 更近的节点",
                  "② 在当前层反复贪心跳跃，直到四周没有更近的邻居（局部最优）",
                  "③ 下沉到下一层，以刚才的位置为起点继续搜索（图越来越密）",
                  "④ 在最底层做精细搜索，把访问过的点按距离维护进候选队列",
                  "⑤ 取候选队列中距离最小的 top-k 返回（近似结果，不保证 100% 准确）"
                ],
                "doneText": "🎉 上层跳跃、下层精查——这就是'可导航小世界'",
                "wrongText": "顺序不对哦——必须先粗后细，从最稀疏的顶层往下走"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "线上出状况了：P99 延迟 200ms 超标，召回率只有 70%。你第一个动作是什么？"
              },
              "scene": "ivfPq",
              "explain": "🤔 线上报警：检索 P99 延迟 200ms 超标，召回率只有 70%。你的<strong>第一个</strong>动作是什么？<br>📐 这不是'调参玄学'题，而是<strong>先度量、再调优</strong>的工程题。先问自己：手上有没有一个<strong>召回率评测集</strong>？调每一个旋钮，能不能量化它的代价？<br>🎯 分清三组旋钮的归属：<code>M</code>（每个节点的连边数）和 <code>efConstruction</code>（建索引时的候选广度）在<strong>建索引期</strong>生效，调整要重建索引；<code>efSearch</code> 在<strong>查询期</strong>生效，改完立即见效。把 efSearch 从 128 调到 8，延迟马上好看，召回却会掉到 50% 出头——你只是把一个指标换成了更糟的另一个。<br>🧠 一句话记住：<strong>没有评测集，调参就是瞎猜。</strong>选一条路线，看看真实后果。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 检索 P99 延迟超标、召回率只有 70%，你先做什么？",
                "options": [
                  {
                    "label": "A. 先把 efSearch 从 128 调到 8，延迟立刻好看",
                    "tone": "bad",
                    "result": "😅 延迟确实降下来了，但候选队列更小、探索节点更少，召回率会掉到 50% 出头——你只是把一个指标换成了另一个更糟的指标。<strong>没有评测集，调参就是瞎猜。</strong>"
                  },
                  {
                    "label": "B. 先建召回率评测集，再按延迟预算在 efSearch / 量化 / 分片之间调",
                    "tone": "good",
                    "result": "✅ 正确姿势：固定一批'问题 → 正确文档'的标注，把<strong>召回率与延迟一起量出来</strong>。<code>efSearch</code> 是查询期召回与延迟的主旋钮，<code>M</code> / <code>efConstruction</code> 决定索引质量与构建成本，PQ 量化省内存但损精度，分片副本提吞吐。<strong>让指标说话，而不是让手感说话。</strong>"
                  },
                  {
                    "label": "C. 直接换回暴力精确检索，召回率 100% 最稳",
                    "tone": "bad",
                    "result": "💥 召回率是 100% 了，但上亿条向量逐条比对，延迟从毫秒级变成秒级——除非你的库只有几万条，暴力扫描在生产上根本扛不住。精确与近似不是'对错'，而是<strong>延迟预算内的取舍</strong>。"
                  }
                ],
                "doneText": "🎉 先度量、再调优——这才是 ANN 参数的正确开法"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——HNSW 的三个参数里，哪个直接决定'查询时'的召回率与延迟？"
              },
              "scene": "hnswLayers",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 三个参数分属两个阶段：建索引期 vs 查询期。先想清楚——哪个改完立刻生效、不用重建索引？",
              "interaction": {
                "type": "quiz",
                "question": "❓ 哪个参数是'查询期'召回率与延迟的主旋钮？",
                "options": [
                  "efSearch：搜索时保留的候选队列大小",
                  "M：每个节点的连边数",
                  "efConstruction：建索引时的候选广度"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "什么是'维度灾难'最直观的表现？",
              "options": [
                "高维空间里任意两点距离趋于接近，最近与最远的距离之比趋近 1",
                "维度越高向量占的内存越小",
                "维度越高检索越精确"
              ],
              "answer": 0,
              "explanation": "维度升高时空间体积集中到薄壳上，点与点之间的距离差被'压平'：最近邻和最远邻几乎一样远。这让'分区域剪枝'的树形索引彻底失效（KD 树、R 树几十维就退化成全表扫描），也正是 ANN 近似算法存在的理由。"
            },
            {
              "question": "HNSW 的 efSearch 调大意味着什么？",
              "options": [
                "搜索更努力、召回率更高，但延迟上升",
                "索引文件变小",
                "内存占用更低"
              ],
              "answer": 0,
              "explanation": "efSearch 控制查询时候选队列的大小：调大 → 多探索几个节点、召回率上升、延迟变高；调小 → 快但可能漏。它是'召回率 ↔ 延迟'最常用的调节旋钮，注意它只影响查询，不改索引本身（改 M、efConstruction 才需要重建索引）。"
            },
            {
              "question": "用 HNSW 检索，结果里没有某条你确定库里有、且语义很接近的文档，最合理的解释是？",
              "options": [
                "ANN 是近似检索，召回率小于 100%，它可能被漏掉了",
                "数据库坏了，数据丢了",
                "这条文档的向量维度不对"
              ],
              "answer": 0,
              "explanation": "近似检索只探索图的一部分，漏掉少量真正最近邻是设计内的代价。排查顺序：先确认数据确实写进去了（一致性级别、是否已建索引），再调大 efSearch 或改用混合检索复现，最后才怀疑数据问题。'检索不到'和'库里没有'是两件事。"
            },
            {
              "question": "IVF 和 PQ 各自的核心取舍是什么？",
              "options": [
                "IVF 先聚类分桶、只搜 nprobe 个桶提速；PQ 用乘积量化压缩向量省内存、牺牲精度",
                "IVF 省内存，PQ 提速度",
                "两者都是精确检索算法"
              ],
              "answer": 0,
              "explanation": "IVF 把向量聚成若干桶，查询只进最可能相关的 nprobe 个桶，桶进得少就快、召回就低；PQ 把向量切成若干段分别量化成短码，内存能压到原来的几十分之一，但距离是'估算'出来的、精度下降。生产中常见的组合是 IVF_PQ：先分桶再压缩，用精度换大规模下的成本。"
            }
          ]
        },
        {
          "id": "6-4",
          "title": "向量数据库 (Milvus)",
          "icon": "🏢",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "向量得有地方住。Milvus 是专为亿级向量检索设计的分布式数据库——先认清房型和规矩！"
              },
              "scene": "milvus",
              "sfx": "入住!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🏢 入住登记"
              },
              "explain": "🤔 手里有 1 亿条向量，往哪放？只存文件、每次加载到内存？——光加载就要几百 GB，服务根本起不来。Milvus 就是给向量准备的'公寓楼'，先认清房型和规矩。<br>📐 四个概念一次认清：<strong>Collection</strong>（≈ 关系库里的表，装同一类数据）→ <strong>Schema</strong>（字段定义：向量字段 + 标量字段）→ <strong>Partition</strong>（collection 内部再切分，查询可只扫相关分区）→ <strong>Index</strong>（HNSW / IVF / PQ，决定速度与召回）；再加一个贯穿全局的 <strong>Metric</strong>（IP / COSINE / L2）。<br>🎯 <strong>具体例子</strong>：建一张 <code>FLOAT_VECTOR(dim=768)</code> 的 collection，按 <code>tenant_id</code> 建分区，再挂一个 HNSW 索引——亿级数据也能毫秒级召回。<br>🧠 一句话记住：<strong>Collection 装数据、Partition 切范围、Index 管速度、Metric 定标准。</strong>点一点右边四张登记卡！",
              "stage": [
                {
                  "type": "text",
                  "content": "🏢 Collection：一张'向量表'，装同一类数据",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🏷️ Schema：FLOAT_VECTOR(dim=768) + 标量字段",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🗂️ Partition：按租户/日期切分，查询可裁剪",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "⚡ Index：HNSW / IVF / PQ，决定速度与召回",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 4,
              "nextText": "查询怎么做？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "Milvus 最实用的一招：向量和标量条件一起查，叫混合查询。听完我一口气讲完——里面有句话不对劲。"
              },
              "scene": "milvusHybrid",
              "sfx": "混合查!",
              "explain": "🤔 纯向量检索最大的麻烦：『找个和这张图相似的，但租户必须是 A、价格还要低于 100』——该怎么查？<br>📐 这就是<strong>混合查询</strong>：<code>向量相似 AND tenant_id = 'A' AND price &lt; 100</code>。关键在于<strong>过滤与检索的先后顺序</strong>。<strong>先过滤</strong>＝先用标量条件筛出候选，再在候选里做向量检索，结果准；过滤后候选集较小时 Milvus 会退化成<strong>暴力精确检索</strong>，召回率反而更高。<strong>后过滤</strong>＝先 ANN 取 top-k 再丢掉不满足条件的，快，但有致命前提。<br>🎯 <strong>具体例子</strong>：全库 1000 万条里只有 3 条属于租户 A，你却先取 top-10 再筛 tenant_id——这 10 条几乎全不是租户 A 的，<strong>筛完一条不剩，召回率直接归零</strong>。<br>🧠 一句话记住：<strong>强筛选性的标量条件，要做成分区键或标量索引，让数据库'先缩范围、再比向量'。</strong>哔——我下面这段话里藏了一处错误，你来挑出来：",
              "interaction": {
                "type": "challenge",
                "question": "塔库这段话里藏了一处错误，点出最可疑的那句：",
                "lead": "塔库清了清嗓子，一口气讲了下去——",
                "segments": [
                  {
                    "text": "Milvus 里装同一类向量的顶层单元叫 collection，"
                  },
                  {
                    "text": "里面还能按租户切成 partition，检索时只扫相关分区、缩小候选范围，",
                    "check": true,
                    "why": "这句正确：partition 是 collection 内部的逻辑分片，配合分区裁剪（partition key），强筛选性的标量条件能先缩范围再比向量。"
                  },
                  {
                    "text": "真要小心的是过滤顺序——全库只有 3 条属于租户 A 时，先取 top-10 再筛租户，很可能筛完一条不剩，"
                  },
                  {
                    "text": "不过别担心，只要挂上 HNSW 索引，召回率就能达到 100%。",
                    "check": true,
                    "wrong": true,
                    "why": "错在这里：HNSW 是近似检索（ANN），召回率通常 95%+ 但达不到 100%；想提高召回要调大 efSearch，代价是延迟上升。"
                  }
                ]
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "概念对对碰——左边是 Milvus 的术语，右边是它真正的职责。"
              },
              "scene": "milvus",
              "sfx": "配对!",
              "explain": "🤔 概念都听过，一到排查故障就抓瞎——因为没分清<strong>谁在干什么活</strong>。<br>📐 五组职责各有归属：<strong>Collection</strong> 装数据、<strong>Partition</strong> 切范围、<strong>Index</strong> 管速度与召回、<strong>Metric</strong> 定距离标准、<strong>Consistency Level</strong> 调一致性与延迟的取舍（Strong / Bounded / Session / Eventually）。<br>🎯 最容易忽略的是这条：<strong>Metric 属于索引定义，不是查询参数</strong>——改度量就得<strong>重建索引</strong>，这也是'索引与模型必须匹配'的由来；而一致性级别只影响读到的数据新旧，不改索引结构，随时可调。<br>🧠 一句话记住：<strong>装数据的、切范围的、管速度的、定标准的、调一致性的，各司其职，别混着调。</strong>点左边一项，再点右边它的职责。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的 Milvus 概念，和右边它真正的职责配成一对",
                "pairs": [
                  [
                    "Collection",
                    "≈ 关系库里的表，装同一类向量和它的标量字段"
                  ],
                  [
                    "Partition",
                    "collection 内部再切分，查询可只扫相关分区（分区裁剪）"
                  ],
                  [
                    "Index（HNSW / IVF / PQ）",
                    "决定检索的速度与召回率，建好索引才谈得上性能"
                  ],
                  [
                    "Metric（IP / COSINE / L2）",
                    "距离度量，必须与模型的训练方式、索引保持一致"
                  ],
                  [
                    "Consistency Level",
                    "Strong / Bounded / Session / Eventually，一致性与延迟的取舍"
                  ]
                ],
                "doneText": "🎉 五个概念各就各位！",
                "wrongText": "对不上——回忆一下它到底是'装数据'还是'管查询'的"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "别把'向量算法库'和'向量数据库'搞混——排雷时间到。"
              },
              "scene": "milvusLayers",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "🤔 一句话常把人带沟里：『我们用 Faiss 做向量数据库』——<strong>Faiss 根本不是数据库</strong>。排雷时间到。<br>📐 <strong>Faiss 是向量检索算法库</strong>：索引快、算法全，但没有 SQL、没有副本与故障转移、没有持久化和并发管理——服务、存储、扩缩容都得你自己写。<strong>pgvector 是关系库扩展</strong>：向量变成 Postgres 的一列，赢在<strong>事务、JOIN、成熟的备份与权限体系</strong>，适合百万级以内；输在<strong>亿级规模下的性能与横向扩展</strong>。<br>🎯 <strong>规模化三件套</strong>：磁盘索引 <strong>DiskANN</strong>（图放 SSD 省内存）、<strong>量化</strong>（PQ / SQ 压缩向量）、<strong>分片 + 副本</strong>（拆数据、扛并发）。一致性四级：<code>Strong</code> 读到最新最慢 / <code>Bounded</code> 容忍一定时间窗的旧数据 / <code>Session</code> 同一客户端读到自己刚写的 / <code>Eventually</code> 最快、可能读到旧的。<br>🧠 一句话记住：<strong>算法库 ≠ 数据库；写多读少的日志型场景，Eventually 往往就够。</strong>",
              "interaction": {
                "type": "click",
                "text": "继续 ▶"
              }
            },
            {
              "id": 5,
              "taku": {
                "emotion": "confused",
                "dialogue": "侦探时间！下面六条操作描述里，藏着几处'迟早出事'的写法，全部揪出来。"
              },
              "scene": "milvusHybrid",
              "explain": "🤔 下面六条都是真实项目里出现过的片段，有的能上线，有的迟早出事——你能一眼分辨吗？<br>📐 排查顺序建议背下来：<strong>① 度量是否与索引一致 → ② 索引建了没 → ③ 新老数据是否同一个模型 → ④ 过滤策略会不会把候选筛空</strong>。这四步能覆盖绝大多数线上事故。<br>🎯 <strong>具体例子</strong>：索引按 L2 建、查询 <code>metric_type</code> 却填 IP（'都是距离，应该差不多'）；模型升级后只给新文档用新模型编码；5000 万条向量一条索引都不建；过滤命中率极低却固定用后过滤——这四类全是要出事的写法。反过来，<code>FLOAT_VECTOR</code> 的 dim 与模型输出一致（768）、按 tenant_id 建分区做裁剪，都是标准做法。<br>🧠 一句话记住：<strong>度量错、索引缺、模型混用、后过滤筛空——四条占全，服务必崩。</strong>有问题的点一下，没问题的放过。",
              "interaction": {
                "type": "find",
                "question": "🔍 揪出所有会出事的写法（度量写错、漏建索引、模型混用……）",
                "rows": [
                  {
                    "text": "索引按 L2 建好，查询时 metric_type 填 IP：'都是距离，应该差不多'",
                    "hit": true
                  },
                  {
                    "text": "embedding 模型升级到新版，只把新入库的文档用新模型编码",
                    "hit": true
                  },
                  {
                    "text": "先按 tenant_id 建分区，查询时带上分区名做裁剪",
                    "hit": false
                  },
                  {
                    "text": "5000 万条向量一条索引都不建，然后抱怨查询要几十秒",
                    "hit": true
                  },
                  {
                    "text": "schema 里向量字段声明为 FLOAT_VECTOR，dim 与模型输出维度一致（768）",
                    "hit": false
                  },
                  {
                    "text": "过滤条件命中率极低，却仍固定用后过滤：先 ANN 取 top-10 再筛标量条件",
                    "hit": true
                  }
                ],
                "doneText": "🎉 全揪出来了！这四处正是向量库上线后最常见的翻车点",
                "wrongText": "这条是标准做法，没问题——再看看别的"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——既然有了向量检索，为什么还要标量过滤？顺序为什么重要？"
              },
              "scene": "filterOrder",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 先想一个极端：全库 1000 万条里只有 3 条属于租户 A。先过滤和后过滤，哪一种还找得回来？",
              "interaction": {
                "type": "quiz",
                "question": "❓ 混合查询里，'先过滤还是后过滤'为什么重要？",
                "options": [
                  "过滤后候选很少时，后过滤会把 top-k 筛空，召回率断崖式下跌",
                  "先过滤一定比后过滤快",
                  "只影响代码写法，不影响结果"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "Faiss 和 Milvus 的本质区别是什么？",
              "options": [
                "Faiss 是向量检索算法库，缺 SQL、副本、持久化与并发管理；Milvus 是完整的向量数据库",
                "两者是同一个项目的两个版本",
                "Faiss 只能存图片，Milvus 只能存文本"
              ],
              "answer": 0,
              "explanation": "Faiss 提供的是索引结构与检索算法（Flat / IVF / HNSW / PQ），快且灵活，但数据的持久化、并发、故障恢复、扩缩容都要你自己实现。向量数据库 = 算法 + 存储 + 服务 + 运维能力，Milvus、Qdrant、Weaviate 都属于这一类。"
            },
            {
              "question": "刚写入一批向量，立刻用另一个客户端查询却查不到，最可能的原因是？",
              "options": [
                "一致性级别选得较松（如 Eventually），副本还没同步完",
                "向量维度写错了",
                "数据被自动删除了"
              ],
              "answer": 0,
              "explanation": "Milvus 有 Strong / Bounded / Session / Eventually 四种一致性级别，默认的 Bounded 容忍一定时间窗内的旧数据。写入后要立刻读到，可以显式指定 Strong，或写入后 flush、按主键查一次确认——这是分布式系统的正常权衡，不是 bug。"
            },
            {
              "question": "pgvector 相比专用向量数据库，取舍在哪里？",
              "options": [
                "赢在事务、JOIN 与成熟的关系库生态，输在亿级规模的性能与横向扩展",
                "pgvector 支持无限规模",
                "pgvector 不能存储向量"
              ],
              "answer": 0,
              "explanation": "pgvector 让向量成为 Postgres 里的一列，可以和企业已有的用户表、订单表直接 JOIN，事务与权限体系现成，百万级以内非常香。但当数据涨到亿级、并发要求又高时，专用向量库在索引结构、分片与存算分离上的优势就体现出来了——没有最好的，只有匹配规模的。"
            },
            {
              "question": "全库 1000 万条里只有 3 条属于租户 A，你却用后过滤取 top-10 再筛 tenant_id，会发生什么？",
              "options": [
                "大概率筛完一条不剩，召回率极低；应改用分区或先过滤",
                "结果更准确",
                "没有影响，只是慢一点"
              ],
              "answer": 0,
              "explanation": "后过滤的候选池是'全库最相似的 top-k'，如果没有租户约束，这 10 条很可能全都不是租户 A 的，筛完就是空。正确做法是把 tenant_id 做成 partition key（分区裁剪）或标量索引走先过滤，让向量检索只在候选集里跑。"
            }
          ]
        },
        {
          "id": "6-5",
          "title": "RAG：检索增强生成",
          "icon": "📚",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "normal",
                "dialogue": "模型不知道你们公司上周发的公告，硬答就是幻觉。RAG 的办法：开卷考试——先查资料，再作答！"
              },
              "scene": "rag",
              "sfx": "开卷!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "📚 流程区"
              },
              "explain": "🤔 你问模型『我们公司上周发的公告说了什么』，它一本正经地编了一条——因为训练数据里根本没有你们公司。<strong>模型知识有截止日期，私有知识它一无所知，硬答就是幻觉。</strong><br>📐 <strong>RAG = Retrieval（检索）+ Augmented（增强）+ Generation（生成）</strong>，把私有知识库变成模型的'随身参考书'，等于把闭卷考试改成<strong>开卷考试</strong>。<br>🎯 两条流水线：<strong>离线</strong>——文档 → 切分 chunk → embedding → 写入向量库；<strong>在线</strong>——问题向量化 → 检索 top-k 片段 → 精排 → 拼进 prompt → 生成带出处的答案。<br>🧠 一句话记住：<strong>先查资料、再作答，答案有出处才可信。</strong>哔——点一点右边三件道具，把它们收进流程区！",
              "stage": [
                {
                  "type": "text",
                  "content": "📚 离线：文档 → 切块 → 向量化 → 入库",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🔍 在线：问题向量化 → ANN 检索 top-k",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "✍️ 生成：片段 + 问题 → 只依据资料作答",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "切块有什么讲究？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "happy",
                "dialogue": "第一个坑就在'切块'——切得不对，后面全白搭。学完顺手把 RAG 的名字也焊牢。"
              },
              "scene": "ragChunk",
              "sfx": "切块!",
              "explain": "🤔 第一个坑就在'切块'，而且它决定了后面所有环节的上限——切得不对，检索再快也白搭。<br>📐 <strong>Chunk（切块）是 RAG 的地基</strong>：<strong>切太大</strong>——一段里塞了好几个主题，向量被'平均'掉、语义稀释，命中率下降还白烧 token；<strong>切太小</strong>——一句被切成半句，上下文没了，答案残缺：『它的保修期是两年』，可『它』是谁？<br>🎯 常见做法：按<strong>语义或标题层级</strong>切（Markdown 标题、代码函数、合同条款），长度控制在<strong>几百字</strong>量级，并留 <strong>overlap（重叠）</strong>——相邻块重叠 <strong>10%~20%</strong>，避免关键句正好落在切缝上。切完给每块带上<strong>元数据</strong>（文档名、章节、更新时间），过滤和引用溯源都靠它。<br>🧠 一句话记住：<strong>按语义切、几百字一块、留 10%~20% 重叠、每块带元数据。</strong>地基打好了，再补一刀名词题——RAG 三个字母各管一步：",
              "interaction": {
                "type": "input",
                "question": "RAG 的三个步骤：先检索（Retrieval），再增强（Augmentation），最后让模型拿着检索到的资料组织成回答，这一步叫 ______？",
                "accept": [
                  "generation",
                  "生成",
                  "generate",
                  "generating",
                  "generation（生成）"
                ],
                "placeholder": "一个词…",
                "hint": "R-A-G 的 G：Generation——让大模型依据检索到的资料作答，而不是靠记忆硬答。",
                "doneText": "🎉 对，Generation！先查资料、再作答——这就是开卷考试的写法。"
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "把在线流水线按真实顺序走一遍——顺序错了，答案就飞了。"
              },
              "scene": "rag",
              "sfx": "流水线!",
              "explain": "🤔 从用户提问到给出答案，中间有五道工序；顺序错一步，答案就飞了。<br>📐 一次 RAG 问答的在线链路：<strong>① 问题用建库时的同一个 embedding 模型编码 → ② 向量库 ANN 检索 top-k（常与 BM25 关键词召回组成混合检索）→ ③ rerank 用 cross-encoder 逐条打分重排 → ④ 片段 + 问题按模板拼进 prompt → ⑤ 生成答案</strong>。<br>🎯 顺序里藏着两条硬约束：<strong>查询和入库必须用同一个 embedding 模型</strong>（否则不在同一张地图上）；<strong>rerank 一定发生在检索之后、拼 prompt 之前</strong>——它做的是'从 50 条里精挑 3 条'，不是替代检索。<br>🧠 一句话记住：<strong>检索 → 精排 → 拼 prompt → 生成，四步不能颠倒。</strong>按真实顺序把它们点出来。",
              "interaction": {
                "type": "sequence",
                "question": "🔢 在线 RAG 流水线，按真实顺序点击五个环节",
                "steps": [
                  "① 用户提问 → 用建库时的同一个 embedding 模型编码成查询向量",
                  "② 向量库做 ANN 检索取 top-k，常与 BM25 关键词召回组成混合检索",
                  "③ rerank：用 cross-encoder 精排模型对候选逐条打分，重排后取前几条",
                  "④ 把片段 + 问题按模板拼进 prompt，明确要求'只依据资料回答并给出处'",
                  "⑤ 模型生成答案；资料里没有依据时，直接回答'资料中没有提到'"
                ],
                "doneText": "🎉 检索 → 精排 → 拼 prompt → 生成，全对！",
                "wrongText": "顺序不对——先检索、再精排，最后才轮到生成"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "confused",
                "dialogue": "线上真实一幕：检索回来的片段相似度只有 0.35，明显不相关。你让模型怎么办？"
              },
              "scene": "ragHybrid",
              "explain": "🤔 线上真实一幕：检索回来的片段相似度只有 0.35，明显不相关。你让模型怎么办？<br>📐 这道题考的不是技术，而是<strong>产品底线</strong>：<strong>宁可说'不知道'，也不要有依据地硬答</strong>。记住两个判断：检索为空或分数明显偏低，是'<strong>没找到</strong>'，不是'答得不好'。<br>🎯 <strong>具体例子</strong>：prompt 里要求必须给答案时，模型会拿训练语料里的'常识'补全，读起来非常像真的，而且<strong>没有任何出处可以核对</strong>——这就是最典型的 RAG 幻觉。正确补救是<strong>修召回</strong>：混合检索、查询改写（HyDE）、加 rerank；而不是把 top-k 从 5 调到 50——那会让 token 成本暴涨、无关片段稀释注意力（长上下文里模型对中段信息的利用率最低，称为 lost in the middle）。<br>🧠 一句话记住：<strong>允许说不知道 + 给出处，是可信度的底线。</strong>选一条路线，看看真实后果。",
              "interaction": {
                "type": "branch",
                "question": "🛤️ 检索结果明显不相关（相似度 0.35），你让模型怎么办？",
                "options": [
                  {
                    "label": "A. 明确回答'现有资料里没有相关内容'，并给出检索到的近似片段或转人工入口",
                    "tone": "good",
                    "result": "✅ 这是唯一不会产生幻觉的选择。RAG 的幻觉绝大多数来自'没有依据还硬答'：当 prompt 要求必须给答案时，模型会拿训练语料里的'常识'补全，读起来非常像真的。<strong>允许说不知道 + 给出处</strong>，是可信度的底线。"
                  },
                  {
                    "label": "B. 让模型'尽量回答'：用户要的是答案，不是'我不知道'",
                    "tone": "bad",
                    "result": "😱 模型会用预训练语料硬凑一段听起来很专业的回答，用户信了、业务出错，而且<strong>没有任何出处可以核对</strong>——这就是最典型的 RAG 幻觉。检索质量决定答案上限，检索错了，生成再流畅也是错的。"
                  },
                  {
                    "label": "C. 把 top-k 从 5 一口气调到 50，把所有片段都塞进 prompt",
                    "tone": "bad",
                    "result": "🥵 token 成本暴涨，而且无关片段会稀释注意力（长上下文里，模型对<strong>中段信息</strong>的利用率最低，称为 lost in the middle），答案反而更差。正确做法是<strong>先修召回</strong>：混合检索、查询改写、HyDE，再加 rerank 精排。"
                  },
                  {
                    "label": "D. 把相似度阈值改成 0，这样'总能检索到东西'",
                    "tone": "bad",
                    "result": "🤡 阈值归零只是让低质量片段更容易混进来：问题从'没检索到'变成'检索到一堆垃圾'，模型照样答错，而且错得更自信。阈值不是用来'消掉报错'的，是用来<strong>守住'宁缺毋滥'这条线</strong>的。"
                  }
                ],
                "doneText": "🎉 有依据才回答——这就是 RAG 的可信度底线",
                "wrongText": "这条路会把幻觉放大，换一条试试"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "happy",
                "dialogue": "最后一关：把客服助手的 prompt 模板填完整。每一句约束都在防一类幻觉！"
              },
              "scene": "ragGrounding",
              "explain": "🤔 同一句『请依据资料回答』，写得好能防幻觉，写得松就是给幻觉开门。<br>📐 模板四句话分别防住四类问题（对应四个空格）：<strong>只依据参考资料</strong>防越权作答；<strong>查不到就说『资料中没有提到』</strong>防幻觉；<strong>每条结论给出处</strong>防不可核查；<strong>严禁凭记忆编造数字、日期和事实</strong>防数字编造。<br>🎯 小心那些'看起来也很顺'的词块：把『参考资料』换成『你自己的知识』，读起来通顺，实际是把幻觉请进了门——填空时别只看顺不顺，要看它<strong>把回答锚在哪里</strong>。<br>🧠 一句话记住：<strong>锁定资料、允许说不知道、必须给出处、禁止编数字。</strong>把客服助手的 prompt 模板填完整！",
              "interaction": {
                "type": "fill",
                "question": "🧩 补全 RAG 的提示词模板（每一空都在防幻觉）",
                "sentence": [
                  "你是客服助手：只依据 ",
                  "{0}",
                  " 回答；",
                  "如果资料里查不到，就直接说 ",
                  "{1}",
                  "；",
                  "每条结论后面必须给出 ",
                  "{2}",
                  "；",
                  "严禁凭记忆编造 ",
                  "{3}",
                  "。",
                  ""
                ],
                "options": [
                  "参考资料（检索到的片段）",
                  "『资料中没有提到』",
                  "出处（片段编号或链接）",
                  "数字、日期和事实",
                  "自己的猜测",
                  "数据库版本号"
                ],
                "answers": [
                  "参考资料（检索到的片段）",
                  "『资料中没有提到』",
                  "出处（片段编号或链接）",
                  "数字、日期和事实"
                ],
                "doneText": "🎉 模板完整：只依据资料、必须给出处、允许说不知道"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——检索质量和生成质量，哪个决定 RAG 答案的上限？"
              },
              "scene": "ragHybrid",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 先分清两件事：检索负责'把对的资料找出来'，生成负责'把资料说清楚'。资料错了，换更大的模型有用吗？",
              "interaction": {
                "type": "quiz",
                "question": "❓ RAG 里，什么决定了答案的上限？",
                "options": [
                  "检索：资料没找对，模型再强也只能编",
                  "生成：换个更大的模型就一定更准",
                  "两者完全独立，互不影响"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "chunk 切得太大或太小，分别会带来什么问题？",
              "options": [
                "太大：多个主题被'平均'，语义稀释、白烧 token；太小：上下文断裂，答案残缺",
                "越大越好，token 不是问题",
                "越小越好，切得越碎检索越准"
              ],
              "answer": 0,
              "explanation": "切块是在'信息完整度'和'语义聚焦度'之间找平衡：太大则向量形容不出重点、检索打不中；太小则一句半句丢主语，模型拿到也没法用。工程上的常规做法是几百字量级 + 10%~20% 重叠，并按标题、段落等语义边界切，而不是按固定字数硬切。"
            },
            {
              "question": "为什么要先向量召回 50 条，再用 cross-encoder 精排取 3 条？",
              "options": [
                "向量召回快但粗（问题和文档各自编码），cross-encoder 把两者拼在一起精算、准但慢，两级配合兼顾速度与准确",
                "因为向量库最多只能存 50 条",
                "纯粹为了多花点钱"
              ],
              "answer": 0,
              "explanation": "双塔（bi-encoder）把问题和文档分别编码成向量，可以离线预计算，检索快但精度有限；cross-encoder 把'问题 + 文档'一起送进模型打分，能捕捉细粒度的交互，但无法预计算、代价高，只能用在少量候选上。所以标准流水线是'大范围粗召回 + 小范围精排'。"
            },
            {
              "question": "RAG 系统上线后，应该拿什么指标评估？",
              "options": [
                "召回率（该找到的找到了吗）+ 答案忠实度（回答有没有依据）",
                "只看回答字数够不够长",
                "只看响应速度快不快"
              ],
              "answer": 0,
              "explanation": "RAG 的错误可以拆成两类：检索没找对（召回率问题），以及找到了却答歪、答出资料里没有的内容（忠实度/幻觉问题）。分开度量才能定位是改切块与召回，还是改 prompt 与生成模型。只盯'回答得像不像人话'，是评估不出来的。"
            },
            {
              "question": "用户搜产品编号 'ERR-4021'，向量检索总是抓不到对应文档，最有效的补救是？",
              "options": [
                "加 BM25 关键词检索做混合召回，再统一用 rerank 排序",
                "把 embedding 模型换成更大的",
                "把 top-k 直接调到 1000"
              ],
              "answer": 0,
              "explanation": "编号、缩写、人名这类稀有词，语义模型往往抓不住——它们在训练语料里出现太少，字面匹配的 BM25 反而一试就中。混合检索（关键词 + 向量）多路召回、再统一 rerank，是业界处理'专有名词 + 自然语言'混合查询的标配；换大模型或调大 top-k 都治不了这个病。"
            }
          ]
        },
        {
          "id": "6-6",
          "title": "AI Agent 与长期记忆",
          "icon": "🧠",
          "panels": [
            {
              "id": 1,
              "taku": {
                "emotion": "happy",
                "dialogue": "轮到我自己的老本行了——Agent 的'记忆'。上下文窗口会装满，重要的事得另找地方存！"
              },
              "scene": "agentmem",
              "sfx": "记住你!",
              "dropZone": {
                "x": 52,
                "y": 84,
                "label": "🧠 记忆区"
              },
              "explain": "🤔 跟 Agent 聊了三天，它一句'你是谁'就全忘了——因为上下文窗口就那么大，<strong>装满就溢出</strong>，重要的事必须另找地方存。<br>📐 三种记忆分工不同：<strong>短期记忆</strong>＝当前对话的上下文窗口，有长度上限、超了要压缩或摘要；<strong>工作记忆</strong>＝当前任务的状态（计划、中间结果、工具返回值），任务结束即可丢；<strong>长期记忆</strong>＝跨会话的重要事实，落在向量库或 KV 存储里，用时按语义召回。<br>🎯 <strong>具体例子</strong>：『用户住在杭州，养了一只叫团子的猫』——这句话三天后的新会话里还得能用，它就必须进长期记忆；而刚才那次工具调用返回的原始 JSON，解析完就该扔。<br>🧠 一句话记住：<strong>用完就扔的进上下文，跨会话有用的进向量库。</strong>哔——点一点右边三张记忆卡，把它们收进记忆区！",
              "stage": [
                {
                  "type": "text",
                  "content": "🧠 短期：对话上下文（有窗口上限，会溢出）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "🗂️ 工作记忆：当前任务状态（计划、中间结果）",
                  "className": "scattered-item"
                },
                {
                  "type": "text",
                  "content": "💾 长期：向量库 / KV（跨会话、可语义召回）",
                  "className": "scattered-item"
                }
              ],
              "collectCount": 3,
              "nextText": "怎么存、怎么取？▶"
            },
            {
              "id": 2,
              "taku": {
                "emotion": "normal",
                "dialogue": "记住什么、怎么找回来，都有讲究——不是把聊天记录一股脑倒进去。学完换你来当记忆设计师。"
              },
              "scene": "memoryWeight",
              "sfx": "加权!",
              "explain": "🤔 很多人做 Agent 记忆的方式是把聊天记录一股脑倒进向量库——结果检索出来一堆废话，还把真正重要的事淹了。<br>📐 <strong>写入</strong>：先判断<strong>什么值得记</strong>（重要性打分：身份、偏好、承诺 &gt; 寒暄），再<strong>去重</strong>（同一件事说三遍只留一条），最后摘要 + 编码入库。<strong>检索</strong>：三项加权打分——<strong>recency（时间衰减，越新越重要）+ importance（重要性）+ relevance（与当前问题的向量相似度）</strong>，取加权分最高的几条注入上下文。<br>🎯 <strong>治理</strong>三件事：<strong>遗忘</strong>（设 TTL 或衰减，避免陈旧信息越积越多）、<strong>冲突消解</strong>（同一事实更新时用新版本覆盖，而不是两条并存让模型自己猜）、<strong>隐私与权限</strong>（按用户隔离、可被删除，这是合规要求）。<br>🧠 一句话记住：<strong>只按相似度召回会漏掉'很久以前、但当时很重要'的信息，三项加权才完整。</strong>哔——现在换你来定规矩：",
              "interaction": {
                "type": "describe",
                "prompt": "用自己的话说说：Agent 收到一条信息时，你怎么判断它该进短期/工作记忆，还是长期记忆？举一个例子。",
                "reference": "判断标准只有一条：下次会话还找得回来吗？只在当前任务里有意义、用完就扔的——这一轮的对话历史、工具返回的原始 JSON、当前计划清单——进短期或工作记忆，窗口装满就压缩成摘要；跨会话还要用的——『用户住在杭州，养了一只叫团子的猫』、三个月前的排版偏好、历史排查经验——必须写进长期记忆（向量库 / KV），之后按语义召回。",
                "keywords": [
                  "跨会话",
                  "上下文",
                  "长期",
                  "向量库"
                ],
                "minChars": 20
              }
            },
            {
              "id": 3,
              "taku": {
                "emotion": "normal",
                "dialogue": "分类练习——这些信息该进哪种记忆？看你分不分得清。"
              },
              "scene": "agentmem",
              "sfx": "分类!",
              "explain": "🤔 一条信息该进哪种记忆？判断标准其实只有一条。<br>📐 <strong>用完就扔、只在当前任务里有意义</strong> → 短期或工作记忆；<strong>跨会话还有用、以后要能想起来</strong> → 长期记忆。<br>🎯 <strong>具体例子</strong>：『这一轮对话的完整消息历史』『刚才工具返回的原始 JSON，下一步就要解析』『当前任务的计划清单』都属于前者，任务一结束就可以丢；而『用户住在杭州，养了一只叫团子的猫』『三个月前说过的排版偏好』『历史上解决同类报错的排查经验』都必须写进长期库，否则下一次会话又要从头问一遍。<br>🧠 一句话记住：<strong>问自己'下次会话还找得回来吗'，答案就出来了。</strong>另外补一句：短期记忆装满后并不是被丢掉，而是<strong>压缩成摘要</strong>继续留在上下文里——摘要的质量直接决定 Agent 会不会'失忆'。",
              "interaction": {
                "type": "sort",
                "question": "🗂️ 把这些信息放进该去的记忆筐里",
                "items": [
                  "这一轮对话的完整消息历史",
                  "『用户住在杭州，养了一只叫团子的猫』",
                  "刚才工具调用返回的原始 JSON，下一步就要解析",
                  "用户三个月前说过的排版偏好",
                  "当前任务的计划清单和已完成步骤",
                  "历史上解决同类报错的排查经验"
                ],
                "buckets": [
                  "🧠 短期 / 工作记忆（在上下文里）",
                  "💾 长期记忆（向量库 / KV）"
                ],
                "answers": [
                  0,
                  1,
                  0,
                  1,
                  0,
                  1
                ],
                "wrongText": "再想想：这条信息'下次会话还找得回来吗'？"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 4,
              "taku": {
                "emotion": "normal",
                "dialogue": "配对时间——记忆的五个操作，各自负责防住什么问题？"
              },
              "scene": "memoryWrite",
              "explain": "🤔 记忆的五个操作，各自在防什么问题？分不清'写路径'和'读路径'，就会一直在错的地方使劲。<br>📐 五组职责：<strong>写入 write</strong> 先做重要性打分与去重，决定什么才值得进长期库；<strong>检索 recall</strong> 按 recency + importance + relevance 加权取回；<strong>遗忘 forget</strong> 给记忆设过期时间或衰减；<strong>更新 update</strong> 在同一事实变化时覆盖旧版本、防止新旧冲突并存；<strong>记忆污染 poisoning</strong> 是'错误信息一旦写进长期库，会被反复检索出来放大'的后果。<br>🎯 关键区分：<strong>写入、更新、遗忘</strong>都发生在<strong>写路径</strong>上，<strong>检索</strong>发生在<strong>读路径</strong>上；而污染是'写错了之后，在读路径被反复放大'——防线要在写入侧，补救才在读侧。<br>🧠 一句话记住：<strong>写的错，读的扛；五个操作，各防一个坑。</strong>点左边一项，再点右边它的职责。",
              "interaction": {
                "type": "match",
                "question": "🔗 把左边的记忆操作，和右边它的真实职责配成一对",
                "pairs": [
                  [
                    "写入 write",
                    "先做重要性打分与去重，决定什么才值得进长期库"
                  ],
                  [
                    "检索 recall",
                    "按 recency 时间衰减 + importance 重要性 + relevance 相似度加权取回"
                  ],
                  [
                    "遗忘 forget",
                    "给记忆设过期时间或衰减，避免陈旧信息越积越多"
                  ],
                  [
                    "更新 update",
                    "同一事实变化时覆盖旧版本，防止新旧冲突并存"
                  ],
                  [
                    "记忆污染 poisoning",
                    "错误信息一旦写进长期库，会被反复检索出来放大"
                  ]
                ],
                "doneText": "🎉 五个操作，各防一个坑！",
                "wrongText": "对不上——想想这个操作是在'写'还是在'读'"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 5,
              "taku": {
                "emotion": "happy",
                "dialogue": "最后翻五张牌，看看长期记忆最容易踩的坑——我当年全踩过，哔。"
              },
              "scene": "memoryPitfalls",
              "explain": "🤔 长期记忆最容易踩的五个坑，翻开之前先猜猜：<strong>解法</strong>会是什么？<br>📐 一句话概括这五个坑：<strong>记太多（噪音压过信号）、删太少（过期信息照样被召回）、留两份（新旧冲突）、不校验（污染被反复强化）、不隔离（隐私越权）</strong>——而它们几乎都发生在'<strong>写入的那一瞬间</strong>'。<br>🎯 <strong>具体例子</strong>：一次错误的工具返回值被当成事实写进长期库，之后每次相关对话都把它检索出来，错误被<strong>反复强化</strong>，比一次性的幻觉更难发现；解法是写入前校验来源与置信度、保留可追溯的出处、支持人工纠正与删除。再比如『用户在上海』和『用户搬到杭州了』同时存在，模型会随机踩中旧的那条。<br>🧠 一句话记住：<strong>记忆的质量，在写进去那一刻就已经决定了。</strong>我当年五个坑全踩过，哔。",
              "interaction": {
                "type": "flip",
                "question": "🃏 翻开五张卡，看看长期记忆的五个坑与解法",
                "cards": [
                  {
                    "front": "🕳️ 坑一：什么都记",
                    "back": "把每一句话都写进长期库 → 检索时噪音压过信号，还白烧存储和 token。<br><strong>解法</strong>：写入前做重要性打分与去重，只留'未来还会用到'的事实。"
                  },
                  {
                    "front": "🗑️ 坑二：只写不删",
                    "back": "三年前的地址、早已失效的配置一直躺在库里，还照样被召回。<br><strong>解法</strong>：给记忆设 TTL 或时间衰减，定期归档与清理。"
                  },
                  {
                    "front": "⚔️ 坑三：新旧冲突",
                    "back": "『用户在上海』和『用户搬到杭州了』同时存在，模型随机踩中旧的那条。<br><strong>解法</strong>：写入时检测冲突，用新版本覆盖并把旧版本标记失效，而不是两条都留。"
                  },
                  {
                    "front": "☠️ 坑四：记忆污染",
                    "back": "一次错误的工具结果被当成事实写进长期库，之后每次相关对话都被检索出来，错误被<strong>反复强化</strong>。<br><strong>解法</strong>：写入前校验来源与置信度，保留可追溯的出处，支持人工纠正与删除。"
                  },
                  {
                    "front": "🔐 坑五：隐私与权限",
                    "back": "A 用户的记忆被 B 用户的会话召回——这是事故，不只是 bug。<br><strong>解法</strong>：记忆按用户 / 租户隔离，支持'被遗忘权'（按主体彻底删除），敏感字段加密，并审计召回记录。"
                  }
                ],
                "doneText": "🎉 五张牌翻完，记忆的坑全看清了！"
              },
              "nextText": "继续 ▶"
            },
            {
              "id": 6,
              "taku": {
                "emotion": "confused",
                "dialogue": "考考你——'用户三个月前说过的偏好'，最该存到哪里？"
              },
              "scene": "memoryWeight",
              "stage": [
                {
                  "type": "text",
                  "content": "🤔 想一想",
                  "className": "magic-effect"
                }
              ],
              "explain": "❓ 关键问自己两句：这条信息<strong>下次会话还找得回来吗</strong>？上下文窗口<strong>装得下、撑得住</strong>吗？",
              "interaction": {
                "type": "quiz",
                "question": "❓ 跨会话还要用的用户偏好，最合适的存储是？",
                "options": [
                  "向量数据库或 KV：持久保存，能按语义召回",
                  "当前对话的上下文窗口",
                  "直接写进模型权重"
                ],
                "answer": 0
              }
            }
          ],
          "reviewQuiz": [
            {
              "question": "为什么不用'把全部聊天记录塞进提示词'来实现 Agent 记忆？",
              "options": [
                "上下文窗口有上限、越长越贵，无关信息还会稀释注意力、拉低回答质量",
                "聊天记录无法保存到磁盘",
                "模型读不懂长文本"
              ],
              "answer": 0,
              "explanation": "上下文是有限且按 token 计费的资源：全量塞进去既贵又吵，关键信息会被淹没在无关内容里。正确姿势是——短期上下文做摘要压缩，长期事实写进向量库，需要时按语义召回最相关的几条，这正是向量数据库在 Agent 时代的核心价值。"
            },
            {
              "question": "Agent 记忆检索常用的三项加权是什么？",
              "options": [
                "recency（时间衰减）+ importance（重要性）+ relevance（向量相似度）",
                "长度 + 标点 + 语言",
                "随机 + 轮询 + 先来先服务"
              ],
              "answer": 0,
              "explanation": "只按相似度召回，会把'很久以前、但当时很重要'的信息漏掉；只看时间，又会漏掉长期有效的事实。工程上通常把三者归一化后加权求和：relevance 保证'对题'，recency 保证'不过时'，importance 保证'关键信息不被淹没'，权重按业务调。"
            },
            {
              "question": "Agent 把一次错误的工具返回值当成事实写进了长期记忆，最严重的后果是？",
              "options": [
                "之后每次相关对话都会把它检索出来，错误被反复放大",
                "向量数据库会立刻崩溃",
                "向量的维度会自动改变"
              ],
              "answer": 0,
              "explanation": "这就是记忆污染：长期记忆是'事实来源'，一旦写入错误信息，它会持续参与后续所有召回，模型反复读到就反复当真，比一次性的幻觉更难发现和纠正。防线在写入侧——校验来源与置信度、保留出处、支持人工纠正与按条删除。"
            },
            {
              "question": "长期记忆里同一事实出现了两条互相矛盾的记录（『用户在上海』/『用户搬到杭州了』），正确做法是？",
              "options": [
                "写入时检测冲突，用新版本覆盖并把旧版本标记失效",
                "两条都留着，让模型自己判断",
                "把两条都删掉，重新问用户"
              ],
              "answer": 0,
              "explanation": "把矛盾留给模型判断，等于把一致性风险转嫁给每一次推理——同一问题在不同时刻可能得到不同答案。正确做法是在写入侧做冲突消解：识别'同一主体的同一属性'，新版本生效、旧版本标记失效（保留历史便于审计），并用时间戳兜底。"
            }
          ]
        }
      ]
    }
  ],
  "specialChapter": {
    "id": "SP",
    "title": "AI辅助与制作人员名单",
    "knowledgePoints": [
      {
        "id": "SP-1",
        "title": "塔库的诞生：幕后揭秘",
        "icon": "🧬",
        "panels": [
          {
            "id": 1,
            "taku": {
              "emotion": "happy",
              "dialogue": "欢迎来到数塔的后台！先给你看成绩单——这份记录是现场从你的进度生成的，你学一节它就多一条。"
            },
            "liveBoard": "progress",
            "scene": "sp-credits",
            "sfx": "成绩单!",
            "explain": "📋 <strong>我的学习记录（实时）</strong><br>这张表由浏览器<strong>现场生成</strong>：只列出你<strong>已经通关</strong>的知识点，并按章节归拢。<br>没学完的不会出现在这里——所以它永远等于你的真实进度，而不是写死的文案。",
            "interaction": {
              "type": "click",
              "text": "看完，继续 ▶"
            }
          },
          {
            "id": 2,
            "taku": {
              "emotion": "normal",
              "dialogue": "成绩单收好，接下来交代一下我是怎么被造出来的。点击查看我的诞生日志！"
            },
            "scene": "sp-birth",
            "sfx": "后台!",
            "explain": "📜 <strong>幕后日志 · 第 1 条</strong><br>数塔不是「一个网页」，而是三层拼起来的小机器：<br>📄 <strong>数据蓝图</strong>——6 章正文加 1 个 SP 章节、合计 <strong>35 个知识点 / 193 个分镜 / 15 种互动模式</strong>，全部写成 Python 字典；改字、加图、调顺序都发生在这一层。<br>⚙️ <strong>漫画引擎</strong>——<code>comicEngine.js</code> 把字典渲染成分镜：SVG 插画、互动面板、塔库对话都在这里。<br>🗣️ <strong>语音交互</strong>——Web Speech API 让塔库把讲解念出来，<strong>不需要任何音频文件</strong>。<br>👉 把右下角三条日志收进收集区，我们一层层拆开看。",
            "stage": [
              {
                "type": "text",
                "content": "📄 数据蓝图 (Python)",
                "className": "log-item"
              },
              {
                "type": "text",
                "content": "⚙️ 漫画引擎 (JS/CSS)",
                "className": "log-item"
              },
              {
                "type": "text",
                "content": "🗣️ 语音交互 (Web Speech API)",
                "className": "log-item"
              }
            ],
            "interaction": {
              "type": "click-object",
              "targetClass": "log-item",
              "text": "点击阅读幕后日志"
            },
            "dropZone": {
              "label": "🧾 日志收集"
            }
          },
          {
            "id": 3,
            "taku": {
              "emotion": "happy",
              "dialogue": "整个项目采用 'Python 编写剧本 -> 自动生成 data.js -> 纯前端单机渲染' 的架构。不需要联网，双击就能运行！先记住流水线，再答我一个文件名。"
            },
            "scene": "sp-pipeline",
            "sfx": "流水线!",
            "explain": "⚙️ <strong>三段式流水线</strong><br>① <code>python_src/chapters/*.py</code> 写剧本 → ② <code>build_data.py</code> 一键编译成 <code>js/data.js</code> → ③ 浏览器里的 <code>comicEngine.js</code> 把它渲染成漫画页。<br>所以整本书<strong>不用服务器、不用联网</strong>：双击 <code>index.html</code> 就能跑，比赛现场也不怕断网。<br>代价是「改动要重新编译一次」——这是<strong>内容与表现分离</strong>的经典取舍：写内容的人只碰 Python，写引擎的人只碰 JS，两边不会互相踩脚。<br>🧠 考你一个名字：站在 ① 和 ③ 中间、把剧本变成 <code>js/data.js</code> 的那个脚本，叫什么？",
            "interaction": {
              "type": "input",
              "question": "把 Python 剧本一键编译成 js/data.js 的脚本，文件名叫 ______？",
              "accept": [
                "build_data.py",
                "build_data"
              ],
              "placeholder": "文件名…",
              "hint": "build + 下划线 + data——它干的正是「建造数据」的活，躺在项目根目录里。",
              "doneText": "🎉 对，build_data.py！剧本经它编译，浏览器才能读到 js/data.js。"
            }
          },
          {
            "id": 4,
            "taku": {
              "emotion": "happy",
              "dialogue": "哔——重点来了！书里这 8 张漫画，其实是从同一张图「生」出来的。看看它们排在一起的样子！"
            },
            "scene": "sp-anchor",
            "sfx": "家族照!",
            "explain": "🎨 <strong>8 张 AI 漫画，1 个锚点</strong><br>第一步先画<strong>锚点</strong> <code>assets/img/taku-anchor.png</code>（1024×1024）：把塔库的脸、天线、机身配色和线条风格一次性<strong>定死</strong>；<br>第二步<strong>以锚点为参考图</strong>，派生其余 7 张——6 张章节封面 <code>cover-ch1 … cover-ch6</code>（1024×768）和主页主视觉 <code>hero-main</code>（1280×720）。<br>锚点的真正作用是<strong>系列一致性</strong>：后面每一张生成时都「看着」同一张参考图，角色的五官比例、配色和画风才不会一人一个样。<br><div style='display:flex; flex-wrap:wrap; gap:6px; margin:10px 0;'><img src='assets/img/taku-anchor.png' alt='塔库锚点 1024x1024' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch1.png' alt='第1章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch2.png' alt='第2章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch3.png' alt='第3章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch4.png' alt='第4章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch5.png' alt='第5章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/cover-ch6.png' alt='第6章封面' style='width:31%; border:3px solid #1a1a1a; border-radius:8px;'><img src='assets/img/hero-main.png' alt='主页主视觉 1280x720' style='width:64%; border:3px solid #1a1a1a; border-radius:8px;'></div>🧩 <strong>画布里的插画又是另一回事</strong>：分镜里的漫画场景是用 SVG <strong>手写代码</strong>画的（几何图形 + emoji + 粗描边），矢量、能无限放大，还能被互动面板「点」。<br>🗺️ <strong>32 张小节封面</strong>又是第三种来源：它们不是 AI 生成的，而是从作者绘制的《数塔世界》总览路线图里<strong>逐格切分</strong>出来的——自动识别 6 列 × 5~6 行的网格边界，跳过节标题、避开页脚，再统一成 3:1 并补上该章节的底色。AI 在这里只用来写切图脚本，画面本身出自作者之手。",
            "stage": []
          },
          {
            "id": 5,
            "taku": {
              "emotion": "confused",
              "dialogue": "考考你——要让 8 张插画里的塔库长得一模一样，第一步该做什么？"
            },
            "scene": "sp-birth",
            "sfx": "想一想!",
            "stage": [
              {
                "type": "text",
                "content": "🤔 想一想",
                "className": "magic-effect"
              }
            ],
            "explain": "🎯 <strong>锚点先行，是 AI 绘画里最省事的一致性技巧</strong><br>把第一张图当成「角色设定稿」，之后每一张都拿它当参考图（图生图 / 参考图模式），模型就会照着同一张脸继续画。<br>反过来做会怎样？先画 6 张封面、每个封面各自描述一次角色——最后很可能出现 6 个不同的塔库：天线长短不一、配色深浅不同，读者会以为换了个主角。<br>这也是工程上的通用思路：<strong>先定「接口」，再批量生产</strong>。锚点就是这套插画的接口。",
            "interaction": {
              "type": "quiz",
              "question": "❓ 让 8 张插画保持同一个角色形象，第一步该做什么？",
              "options": [
                "先画一张『锚点』形象并定稿，之后每张都以它为参考图派生",
                "每张图都重新描述一次角色，让 AI 自由发挥",
                "先把 6 张封面画完，最后再补主页主视觉"
              ],
              "answer": 0
            }
          }
        ]
      },
      {
        "id": "SP-2",
        "title": "AI 工具用途声明",
        "icon": "🤖",
        "panels": [
          {
            "id": 1,
            "taku": {
              "emotion": "normal",
              "dialogue": "根据比赛要求，我必须诚实交代。在我的编写过程中，AI 工具扮演了重要角色！点击查看具体用途！"
            },
            "scene": "sp-tools",
            "sfx": "工具链!",
            "explain": "🤖 <strong>诚实声明：AI 参与了哪些环节</strong><br>① <strong>剧情与互动策划</strong>：拟大纲、起章节标题、设计互动面板的点子，AI 出草稿；<br>② <strong>引擎代码</strong>：<code>comicEngine.js</code>、CSS 漫画风格、切图与校验脚本，AI 辅助编写与调试；<br>③ <strong>角色插画（8 张）</strong>：由 AI 图像模型 <strong>Miora</strong> 生成——<code>miora_text_to_image</code> 出锚点、<code>miora_edit_image</code> 派生其余 7 张；<br>④ <strong>分镜漫画（139 张）</strong>：<strong>人工手写 SVG</strong>，不是 AI 生成；<br>⑤ <strong>小节点封面（32 张）</strong>：从作者画的《数塔世界》路线图<strong>切分</strong>而来，也不是 AI 生成；<br>⑥ <strong>语音与音乐</strong>：Web Speech API + Web Audio API 现场合成，不依赖任何音频文件，与 AI 无关。<br>一句话：<strong>AI 负责「快」，人负责「对」</strong>——每一段内容都经过人工核对、改写和实测。",
            "stage": [
              {
                "type": "text",
                "content": "🤖 剧情与交互策划：AI辅助",
                "className": "ai-tool-item"
              },
              {
                "type": "text",
                "content": "💻 引擎代码编写：AI辅助",
                "className": "ai-tool-item"
              },
              {
                "type": "text",
                "content": "🎨 卡通UI与漫画风格：AI辅助",
                "className": "ai-tool-item"
              }
            ],
            "interaction": {
              "type": "click-object",
              "targetClass": "ai-tool-item",
              "text": "点击查看具体使用的工具"
            },
            "dropZone": {
              "label": "🤖 工具清单"
            }
          },
          {
            "id": 2,
            "taku": {
              "emotion": "happy",
              "dialogue": "哔——按比赛要求，工具要报实数：大语言模型用的是 DeepSeek，角色插画用的是 Miora；语音和背景音乐不靠 AI，是浏览器现场合成的。清单听完，来辨几句真话假话。"
            },
            "scene": "sp-pipeline",
            "sfx": "技术栈!",
            "explain": "🧰 <strong>工具清单（按实际使用的写）</strong><br>• <strong>DeepSeek</strong>（大语言模型）：拟大纲、写初稿、代码起草与调试，以及成稿后的<strong>逐条自查与优化</strong>；<br>• <strong>Miora</strong>（AI 图像模型）：8 张角色插画——先用 <code>miora_text_to_image</code> 出<strong>锚点</strong>，再用 <code>miora_edit_image</code> 以锚点为参考派生其余 7 张；<br>• <strong>Web Speech API</strong>：浏览器原生 <code>speechSynthesis</code>，塔库的讲解与提示音全靠它现场合成——<strong>零音频文件、零第三方库</strong>，离线也能说话；<br>• <strong>Web Audio API</strong>：背景音乐按乐谱规则现场合成，同样不占一个字节音频资源；<br>• <strong>sql.js</strong>（开源库，非 AI）：把真正的 SQLite 编译成 WebAssembly，支撑「数塔之家」的动手练习。<br>⚠️ <strong>AI 不署名知识</strong>：文字里的事实、数字、结论都对照官方文档逐条核过（见下一节），AI 只是提效的笔。哔——下面几句话，逐条判对错：",
            "interaction": {
              "type": "judge",
              "question": "下面几句话，分别判断对错：",
              "statements": [
                {
                  "text": "塔库的语音由浏览器原生 speechSynthesis 现场合成，不需要任何音频文件。",
                  "answer": true,
                  "why": "Web Speech API 是浏览器自带能力：讲解与提示音现场生成，零音频文件、零第三方库，离线也能说话。"
                },
                {
                  "text": "插画和初稿都出自 AI，所以事实内容不必再人工核对了。",
                  "answer": false,
                  "why": "AI 不署名知识：文字里的事实、数字、结论都要对照官方文档逐条核对——AI 负责「快」，人负责「对」，责任始终在人。"
                },
                {
                  "text": "8 张角色插画是各自独立生成的，彼此互不参考。",
                  "answer": false,
                  "why": "先画一张「锚点」把塔库的脸、天线、配色、线条风格定死，其余 7 张都以它为参考图派生，才能保持系列一致性。"
                },
                {
                  "text": "背景音乐由 Web Audio API 现场合成，不占音频资源。",
                  "answer": true,
                  "why": "和语音同理：旋律按规则现场合成，不依赖任何音频文件——这是整本书「单机可跑」的一部分。"
                }
              ]
            }
          },
          {
            "id": 3,
            "taku": {
              "emotion": "normal",
              "dialogue": "哔——翻开四张卡，看看每个环节里「AI 做了什么」和「人做了什么」。"
            },
            "scene": "sp-tools",
            "sfx": "翻卡!",
            "explain": "🃏 <strong>AI 是副驾驶，不是自动驾驶</strong><br>把四个环节摊开看，你会发现人的工作并没有消失，只是从「从零手写」变成了「定标准、做判断、担责任」：<br>选题与结构由人拍板，AI 负责把想法快速铺开成初稿；代码由 AI 起草，人负责跑起来、测出来、改到对；插画由 AI 生成，人负责定锚点、挑选、重画不满意的部分。",
            "stage": [],
            "interaction": {
              "type": "flip",
              "question": "🃏 翻开四张卡：AI 出了什么力，人守住了什么",
              "cards": [
                {
                  "front": "📝 剧情与文案",
                  "back": "AI：按大纲批量出草稿、给标题备选。<br>人：定知识结构、逐句改写、核对数据库术语。"
                },
                {
                  "front": "💻 引擎与互动",
                  "back": "AI：写初版 JS/CSS、补边界情况。<br>人：在浏览器里真机跑通、调度分镜节奏、修 bug。"
                },
                {
                  "front": "🎨 8 张角色插画",
                  "back": "AI（Miora）：按参考图生成插画。<br>人：定锚点形象、筛选成稿、统一画风。<br>另有 139 张分镜 SVG 与 32 张小节封面<b>并非 AI 生成</b>：前者手写代码，后者从作者路线图切分。"
                },
                {
                  "front": "🗣️ 语音与音乐",
                  "back": "AI：辅助写合成参数与旋律规则。<br>人：选音色、调节奏，保证听感不吵。"
                }
              ],
              "doneText": "🎉 谁出力、谁负责，一目了然！"
            },
            "nextText": "最后答一题 ▶"
          },
          {
            "id": 4,
            "taku": {
              "emotion": "confused",
              "dialogue": "考考你——关于 AI 在本项目里的角色，哪种说法最准确？"
            },
            "scene": "sp-credits",
            "sfx": "想一想!",
            "stage": [
              {
                "type": "text",
                "content": "🤔 想一想",
                "className": "magic-effect"
              }
            ],
            "explain": "✍️ <strong>署名与责任</strong>：工具不会为错误负责，作者才会。所以「用了 AI」从来不是免责声明，反而意味着更严格的校对义务——尤其是数据库这种<strong>版本敏感</strong>的知识：MySQL 8.0.16 前后的 CHECK 约束、InnoDB 的默认隔离级别，差一个字就是错的。",
            "interaction": {
              "type": "quiz",
              "question": "❓ 关于 AI 在本项目里的角色，哪种说法最准确？",
              "options": [
                "AI 是提效工具：它出草稿，最终由人审校、测试并定稿，责任在人",
                "整本书从内容到插画都由 AI 自动生成，没有人工参与",
                "既然用了 AI，就不必再核对事实和引用来源"
              ],
              "answer": 0
            }
          }
        ]
      },
      {
        "id": "SP-3",
        "title": "参考与引用来源",
        "icon": "📚",
        "panels": [
          {
            "id": 1,
            "taku": {
              "emotion": "normal",
              "dialogue": "为了保证知识的准确性，我也查阅了大量权威资料！点击查看我的参考书架！"
            },
            "scene": "sp-refs",
            "sfx": "书架!",
            "explain": "📚 <strong>参考书架（第一手来源优先）</strong><br>📘 <strong>MySQL 8.0 官方文档</strong>：隔离级别、MVCC、索引与最左前缀、CHECK 约束的版本差异；<br>📗 <strong>Milvus 官方文档</strong>：collection / partition / index / metric 等向量检索概念；<br>📙 <strong>MDN Web 文档</strong>：DOM、Canvas/SVG、Web Speech API 的用法；<br>📕 <strong>经典教材与开源社区实践</strong>：事务、分布式、缓存与 SQL 优化的通用结论。<br>原则只有一条：<strong>能查官方文档的，就不抄二手博客</strong>。",
            "stage": [
              {
                "type": "text",
                "content": "📚 MySQL 8.0 官方文档",
                "className": "ref-item"
              },
              {
                "type": "text",
                "content": "📚 Milvus 向量数据库文档",
                "className": "ref-item"
              },
              {
                "type": "text",
                "content": "📚 MDN Web 开发文档",
                "className": "ref-item"
              }
            ],
            "interaction": {
              "type": "click-object",
              "targetClass": "ref-item",
              "text": "点击翻阅参考来源"
            },
            "dropZone": {
              "label": "📚 参考书架"
            }
          },
          {
            "id": 2,
            "taku": {
              "emotion": "happy",
              "dialogue": "知识来源于官方文档、开源社区和经典教材。数塔只做知识的搬运工和美化师！致谢听完，别急着翻页——先说说你的理解。"
            },
            "scene": "sp-credits",
            "sfx": "致谢!",
            "explain": "🙏 <strong>致谢</strong><br>感谢 MySQL、Milvus、MDN 等官方文档团队，以及把踩坑经验写下来的开源社区作者——没有这些公开资料，就没有这本小书的严谨性；他们的版本说明与变更日志，更是书里每个「版本坑」的第一手出处。<br>🎬 <strong>制作名单</strong>：策划与剧情（作者 + AI 助手）· 漫画与视觉（8 张 AI 插画 + 手写 SVG）· 代码与引擎（Python + JavaScript）· 语音（Web Speech API 现场合成）。<br>📝 名单不是走过场：把每个环节用了什么工具写清楚，读者才知道哪些结论该重点复核——AI 参与越多的部分，越要写明是怎么核验的，书里每一处结论的可信度仍以官方文档为准；工具会更新换代，可追溯的核验过程才是内容可信的根。如果你发现哪里写错了，欢迎指正：<strong>一本敢写「版本坑」的书，也得敢认自己的错</strong>。<br>🧠 趁热打铁——为什么「版本敏感」的知识要这么较真？不查文档直接信，会栽什么跟头？（提示：想想 8.0.16 前后的差别）说说你的看法：",
            "interaction": {
              "type": "describe",
              "prompt": "用自己的话说说：像「MySQL 8.0.16 起 CHECK 约束才真正生效」这种版本敏感的知识，为什么必须查对应版本的官方文档并动手实测，而不能只信博客或 AI 的回答？",
              "reference": "版本敏感的知识差一个版本号就可能整句皆错：MySQL 8.0.16 之前 CHECK 约束会被解析但不强制，写「一直生效」就是错的。博客可能过时，AI 给的是「听起来对」；只有对应版本的官方文档加亲手在目标版本上试一次，给到的才是「确实对」。顺带一提：官方文档默认展示最新版，核对历史行为时记得切到对应版本的归档页，再与其他来源交叉验证兜底——这正是本站的核对三连。",
              "keywords": [
                "版本",
                "官方文档",
                "实测",
                "交叉验证",
                "归档"
              ],
              "minChars": 20
            }
          },
          {
            "id": 3,
            "taku": {
              "emotion": "normal",
              "dialogue": "哔——资料那么多，怎么判断哪条能信？来把来源和它的用途配上对。"
            },
            "scene": "sp-refs",
            "sfx": "配对!",
            "explain": "🔗 <strong>引用规范：来源要对得上问题</strong><br>版本相关的机制问题，只能查对应版本的官方文档；前端 API 的用法查 MDN；向量数据库的概念查 Milvus 文档；跨产品的通用原理再用教材与社区实践交叉验证。<br>点左边一项，再点右边它的搭档。",
            "stage": [],
            "interaction": {
              "type": "match",
              "question": "🔗 把「资料」和「它最该用来核对什么」配成一对",
              "pairs": [
                [
                  "📘 MySQL 8.0 官方文档",
                  "隔离级别、索引最左前缀、CHECK 约束的版本差异"
                ],
                [
                  "📗 Milvus 官方文档",
                  "collection / partition / index / metric 的定义"
                ],
                [
                  "📙 MDN Web 文档",
                  "DOM、Canvas/SVG、Web Speech API 的用法"
                ],
                [
                  "📕 教材与社区实践",
                  "跨产品的通用原理与常见误区的交叉验证"
                ]
              ],
              "wrongText": "哔——不是这一对，想想这个来源最权威的范围是什么？",
              "doneText": "🎉 来源各就各位，引用才站得住！"
            },
            "nextText": "最后一题 ▶"
          },
          {
            "id": 4,
            "taku": {
              "emotion": "confused",
              "dialogue": "考考你——书里写「MySQL 8.0.16 起 CHECK 约束才真正强制生效」，这种细节该怎么核对？"
            },
            "scene": "sp-credits",
            "sfx": "想一想!",
            "stage": [
              {
                "type": "text",
                "content": "🎓 收尾考",
                "className": "magic-effect"
              }
            ],
            "explain": "🔍 <strong>核对三连</strong>：查对应版本的官方文档 → 在目标版本上亲手试一次 → 与其他来源交叉验证。<br>AI 给的是「听起来对」，文档和实验给的是「确实对」——这两者的差距，就是一本教程靠不靠谱的分界线。<br>🎉 到这里，数塔的全部内容就讲完了：从「数据撒了一地」到「向量检索与 AI 记忆」，希望这座塔你爬得开心！",
            "interaction": {
              "type": "quiz",
              "question": "❓ 书里这种「版本敏感」的细节，最靠谱的核对方式是哪一种？",
              "options": [
                "翻对应版本的官方文档，并亲手在目标版本上试一次",
                "某篇博客这么写，那肯定没错",
                "直接问 AI，它说的一定对"
              ],
              "answer": 0
            }
          }
        ]
      }
    ]
  }
};
