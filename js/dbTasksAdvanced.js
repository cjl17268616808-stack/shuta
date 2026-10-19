/* ==========================================================================
   数塔之家 · dbTasksAdvanced.js —— 第 3~6 章实战任务
   --------------------------------------------------------------------------
   这个文件和 dbTasks.js 同构：每个知识点挂 1~2 张"真实数据库操作"任务卡。
   表结构 / 初始数据 / cos_sim 与 vec_norm 函数全部沿用 dbTasks.js，
   不新建数据库、不换表，只是换一批"更底层、更分布式、更 AI"的题目。

   任务对象格式（和 dbTasks.js 一致）：
     { id, title, goal, hint, solution, check }

   校验（verify）类型见 dbRunner.js 的 runVerify()：
     rows / exists / equals / result / resultRows / table / view / index /
     column / explain / fails / userError / fn
   ========================================================================== */

const dbTasksAdvanced = {

  /* ====================== 第 3 章：数据库底层原理 ====================== */

  /* ---------- 3-1 一条 SQL 的执行过程 ---------- */
  '3-1': [{
    id: '3-1-1',
    title: '先看计划，再动手',
    goal: '一条 SELECT 并不是"读一遍表"这么简单，数据库会先为它生成一份执行计划。用 EXPLAIN QUERY PLAN 看看「按年龄查同学」这条 SQL 打算怎么跑，把计划贴到控制台。',
    hint: 'EXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;\n计划里出现 SCAN students 就是"从头到尾扫一遍 students"。',
    solution: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;",
    check: {
      uses: /explain\s+query\s+plan/i,
      verify: [
        { kind: 'explain', sql: 'SELECT * FROM students WHERE age = 12', expect: /SCAN students/ },
        { kind: 'resultRows', expect: 1, op: '>=' }
      ]
    }
  }, {
    id: '3-1-2',
    title: 'SQL 最后变成一串字节码',
    goal: '执行计划的下一步，是编译成一台"小虚拟机"的指令。用 EXPLAIN（不带 QUERY PLAN）把「查一班同学姓名」编译出来，数一数它变成了多少条指令。',
    hint: 'EXPLAIN SELECT name FROM students WHERE class_id = 1;\n结果有 8 列：addr / opcode / p1..p5 / comment，opcode 就是一条条指令（Init、OpenRead、SeekGE、ResultRow…）。',
    solution: "EXPLAIN SELECT name FROM students WHERE class_id = 1;",
    check: {
      uses: /explain\s+select/i,
      verify: { kind: 'resultRows', expect: 8, op: '>=' }
    }
  }],

  /* ---------- 3-2 缓冲池 Buffer Pool ---------- */
  '3-2': [{
    id: '3-2-1',
    title: '一万行把数据库撑大了',
    goal: '用递归 CTE 造一张 1 万行的表 t_big，然后观察数据库从 11 页涨到了多少页；再把缓冲池（cache_size）调小到 100 页，看看查询照样能跑——内存装不下时，数据库会自己换页。',
    hint: "CREATE TABLE t_big AS\n  WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 10000)\n  SELECT n AS id, 'row-' || n AS payload FROM seq;\nPRAGMA cache_size = 100;\nPRAGMA page_count;   -- 数据库一共占了几页（1 页 = 4096 字节）",
    solution: "CREATE TABLE t_big AS\n" +
      "  WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 10000)\n" +
      "  SELECT n AS id, 'row-' || n AS payload FROM seq;\n" +
      "PRAGMA cache_size = 100;\n" +
      "SELECT (SELECT page_count FROM pragma_page_count()) AS 一共几页,\n" +
      "       (SELECT page_size FROM pragma_page_size()) AS 每页字节,\n" +
      "       (SELECT cache_size FROM pragma_cache_size()) AS 缓冲池几页,\n" +
      "       (SELECT COUNT(*) FROM t_big) AS 行数;",
    check: {
      uses: /pragma\s+cache_size/i,
      verify: [
        { kind: 'table', name: 't_big' },
        { kind: 'rows', sql: 'SELECT page_count FROM pragma_page_count()', expect: 20, op: '>=' },
        { kind: 'rows', sql: 'SELECT cache_size FROM pragma_cache_size()', expect: 100 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM t_big', expect: 10000 }
      ]
    }
  }, {
    id: '3-2-2',
    title: '自己搭一个缓冲池',
    goal: '缓冲池就是"内存里的一排小格子"：读一个页先看格子里有没有，有就是命中（HIT），没有就得从磁盘装进来（MISS）。用 bp_frames 当格子、bp_log 当日志，模拟读页过程，最后统计命中了几次、未命中几次。',
    hint: 'MISS：INSERT INTO bp_log (op, page_no) VALUES (\'MISS\', 1); 再 INSERT 进 bp_frames 占一个格子。\nHIT：页面已经在 bp_frames 里，UPDATE bp_frames SET hits = hits + 1 WHERE page_no = 1;',
    solution: "CREATE TABLE disk_pages (page_no INTEGER PRIMARY KEY, content TEXT);\n" +
      "INSERT INTO disk_pages (page_no, content) VALUES (1, '学生页'), (2, '成绩页'), (3, '班级页');\n" +
      "CREATE TABLE bp_frames (frame_no INTEGER PRIMARY KEY, page_no INTEGER UNIQUE, hits INTEGER DEFAULT 0);\n" +
      "CREATE TABLE bp_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, op TEXT, page_no INTEGER);\n" +
      "-- 第一次读第 1 页：格子里没有 → MISS，装进 1 号格子\n" +
      "INSERT INTO bp_log (op, page_no) VALUES ('MISS', 1);\n" +
      "INSERT INTO bp_frames (frame_no, page_no, hits) VALUES (1, 1, 0);\n" +
      "-- 再读第 1 页：已经在格子里 → HIT\n" +
      "UPDATE bp_frames SET hits = hits + 1 WHERE page_no = 1;\n" +
      "INSERT INTO bp_log (op, page_no) VALUES ('HIT', 1);\n" +
      "-- 读第 2 页：又是 MISS，再开一个格子\n" +
      "INSERT INTO bp_log (op, page_no) VALUES ('MISS', 2);\n" +
      "INSERT INTO bp_frames (frame_no, page_no, hits) VALUES (2, 2, 0);\n" +
      "UPDATE bp_frames SET hits = hits + 1 WHERE page_no = 2;\n" +
      "INSERT INTO bp_log (op, page_no) VALUES ('HIT', 2);\n" +
      "-- 回头再读第 1 页：它还在内存里 → HIT\n" +
      "UPDATE bp_frames SET hits = hits + 1 WHERE page_no = 1;\n" +
      "INSERT INTO bp_log (op, page_no) VALUES ('HIT', 1);\n" +
      "SELECT (SELECT COUNT(*) FROM bp_log WHERE op = 'MISS') AS 未命中,\n" +
      "       (SELECT COUNT(*) FROM bp_log WHERE op = 'HIT') AS 命中,\n" +
      "       (SELECT COUNT(*) FROM bp_frames) AS 占用了几个格子;",
    check: {
      uses: /bp_frames/,
      verify: [
        { kind: 'table', name: 'bp_log' },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM bp_log WHERE op = 'MISS'", expect: 2 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM bp_log WHERE op = 'HIT'", expect: 3 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM bp_frames', expect: 2 }
      ]
    }
  }],

  /* ---------- 3-3 为什么是 B+ 树 ---------- */
  '3-3': [{
    id: '3-3-1',
    title: '同一条 SQL，两条完全不同的路',
    goal: '先看「按年龄查同学」的执行计划（全表扫描），然后给 age 建一个索引，再看一次同一句 SQL 的计划——它应该变成 USING INDEX 的定点查找。最后照样把 12 岁的同学查出来，结果一条不少。',
    hint: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;   -- 第一次：SCAN students\nCREATE INDEX idx_students_age ON students(age);\nEXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;   -- 第二次：SEARCH ... USING INDEX",
    solution: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;\n" +
      "CREATE INDEX idx_students_age ON students(age);\n" +
      "EXPLAIN QUERY PLAN SELECT * FROM students WHERE age = 12;\n" +
      "SELECT name FROM students WHERE age = 12;",
    check: {
      uses: /create\s+index\s+idx_students_age/i,
      verify: [
        { kind: 'index', name: 'idx_students_age' },
        { kind: 'explain', sql: 'SELECT * FROM students WHERE age = 12', expect: /USING INDEX/ },
        { kind: 'result', expect: [['小明'], ['小红'], ['小美'], ['小雷']] }
      ]
    }
  }, {
    id: '3-3-2',
    title: '三层跳转 vs 一千次比较',
    goal: 'B+ 树之所以快，是因为它"矮"：找 320 号数据只要从根节点往下跳 3 层。用 btree_nodes 把一棵三层 B+ 树摆出来，再从根一路跳到叶子，数一数一共碰了几个节点，和"全表扫描要碰 1000 行"比一比。',
    hint: '沿 parent_id 往下递归：WHERE 320 BETWEEN key_lo AND key_hi\nWITH RECURSIVE path(...) AS ( SELECT ... WHERE parent_id IS NULL UNION ALL SELECT ... JOIN path ... )',
    solution: "CREATE TABLE btree_nodes (\n" +
      "  node_id INTEGER PRIMARY KEY, parent_id INTEGER, layer INTEGER NOT NULL,\n" +
      "  key_lo INTEGER NOT NULL, key_hi INTEGER NOT NULL, leaf_rowid INTEGER\n" +
      ");\n" +
      "INSERT INTO btree_nodes (node_id, parent_id, layer, key_lo, key_hi, leaf_rowid) VALUES\n" +
      "  (1, NULL, 0, 1, 1000, NULL),\n" +
      "  (2, 1, 1, 1, 500, NULL), (3, 1, 1, 501, 1000, NULL),\n" +
      "  (4, 2, 2, 1, 250, 1), (5, 2, 2, 251, 500, 251),\n" +
      "  (6, 3, 2, 501, 750, 501), (7, 3, 2, 751, 1000, 751);\n" +
      "CREATE TABLE t_scan AS\n" +
      "  WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 1000)\n" +
      "  SELECT n AS id FROM seq;\n" +
      "WITH RECURSIVE path(node_id, layer, key_lo, key_hi) AS (\n" +
      "  SELECT node_id, layer, key_lo, key_hi FROM btree_nodes\n" +
      "   WHERE parent_id IS NULL AND 320 BETWEEN key_lo AND key_hi\n" +
      "  UNION ALL\n" +
      "  SELECT c.node_id, c.layer, c.key_lo, c.key_hi FROM btree_nodes c\n" +
      "    JOIN path p ON c.parent_id = p.node_id AND 320 BETWEEN c.key_lo AND c.key_hi\n" +
      ")\n" +
      "SELECT (SELECT COUNT(*) FROM path) AS 跳了几层,\n" +
      "       (SELECT COUNT(*) FROM t_scan) AS 全表扫描要碰几行;",
    check: {
      uses: /btree_nodes/,
      verify: [
        { kind: 'result', expect: [[3, 1000]] },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM btree_nodes', expect: 7 }
      ]
    }
  }],

  /* ---------- 3-4 聚簇索引与非聚簇索引 ---------- */
  '3-4': [{
    id: '3-4-1',
    title: 'rowid：表本身就是一棵索引',
    goal: 'students 的 id 是 INTEGER PRIMARY KEY，在 SQLite 里它就是 rowid——数据行按它排好序放在表里，这就是聚簇索引。把 rowid 和 id 一起查出来对比，再用 EXPLAIN 看按 rowid 查找走的是什么路。',
    hint: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE rowid = 3;   -- SEARCH ... USING INTEGER PRIMARY KEY\nSELECT rowid, id, name FROM students ORDER BY rowid LIMIT 3;",
    solution: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE rowid = 3;\n" +
      "SELECT rowid AS 行号, id AS 主键, name AS 姓名 FROM students ORDER BY rowid LIMIT 3;",
    check: {
      uses: /rowid/,
      verify: [
        { kind: 'explain', sql: 'SELECT * FROM students WHERE rowid = 3', expect: /INTEGER PRIMARY KEY/ },
        { kind: 'result', expect: [[1, 1, '小明'], [2, 2, '小红'], [3, 3, '小刚']] },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM students WHERE id <> rowid', expect: 0 }
      ]
    }
  }, {
    id: '3-4-2',
    title: '二级索引：有时候还得回表',
    goal: '给 name 建一个二级索引。查 name 时，如果只需要 name 这一列，索引里就全有了（COVERING INDEX，不用回表）；如果要 SELECT * 拿一整行，索引里没有 age、email，数据库就得拿着 rowid 回表取一次。跑两条 EXPLAIN 对比一下。',
    hint: "CREATE INDEX idx_students_name ON students(name);\nEXPLAIN QUERY PLAN SELECT name FROM students WHERE name = '小明';   -- USING COVERING INDEX\nEXPLAIN QUERY PLAN SELECT * FROM students WHERE name = '小明';      -- USING INDEX（要回表）",
    solution: "CREATE INDEX idx_students_name ON students(name);\n" +
      "EXPLAIN QUERY PLAN SELECT name FROM students WHERE name = '小明';\n" +
      "EXPLAIN QUERY PLAN SELECT * FROM students WHERE name = '小明';\n" +
      "SELECT id, name, age FROM students WHERE name = '小明';",
    check: {
      uses: /create\s+index\s+idx_students_name/i,
      verify: [
        { kind: 'index', name: 'idx_students_name' },
        { kind: 'explain', sql: "SELECT name FROM students WHERE name = '小明'", expect: /COVERING INDEX/ },
        { kind: 'explain', sql: "SELECT * FROM students WHERE name = '小明'", expect: /USING INDEX / },
        { kind: 'result', expect: [[1, '小明', 12]] }
      ]
    }
  }],

  /* ---------- 3-5 Redo Log 与 Undo Log ---------- */
  '3-5': [{
    id: '3-5-1',
    title: 'Redo：先记账，再改数据',
    goal: 'WAL（预写日志）的规矩是：先把"我要做什么"写进日志，再去改真正的数据。先看一眼当前日志模式，再建一张 redo_log 记下转账的两步操作，然后才动 accounts，最后确认账改完了、日志也应用了。',
    hint: "PRAGMA journal_mode = WAL;\nINSERT INTO redo_log (tx_id, op, target, amount) VALUES ('tx1', 'DEBIT', 'account:1', 30.0), ('tx1', 'CREDIT', 'account:2', 30.0);\nUPDATE accounts SET balance = balance - 30 WHERE id = 1;\nUPDATE redo_log SET applied = 1 WHERE tx_id = 'tx1';",
    solution: "PRAGMA journal_mode = WAL;\n" +
      "CREATE TABLE redo_log (\n" +
      "  seq INTEGER PRIMARY KEY AUTOINCREMENT, tx_id TEXT, op TEXT,\n" +
      "  target TEXT, amount REAL, applied INTEGER DEFAULT 0\n" +
      ");\n" +
      "-- 第一步：先把要做的操作写进日志\n" +
      "INSERT INTO redo_log (tx_id, op, target, amount) VALUES\n" +
      "  ('tx1', 'DEBIT', 'account:1', 30.0),\n" +
      "  ('tx1', 'CREDIT', 'account:2', 30.0);\n" +
      "-- 第二步：日志写好了，再改真正的数据\n" +
      "UPDATE accounts SET balance = balance - (SELECT amount FROM redo_log WHERE tx_id = 'tx1' AND op = 'DEBIT') WHERE id = 1;\n" +
      "UPDATE accounts SET balance = balance + (SELECT amount FROM redo_log WHERE tx_id = 'tx1' AND op = 'CREDIT') WHERE id = 2;\n" +
      "UPDATE redo_log SET applied = 1 WHERE tx_id = 'tx1';\n" +
      "SELECT (SELECT balance FROM accounts WHERE id = 1) AS 账户1,\n" +
      "       (SELECT balance FROM accounts WHERE id = 2) AS 账户2,\n" +
      "       (SELECT journal_mode FROM pragma_journal_mode()) AS 日志模式,\n" +
      "       (SELECT COUNT(*) FROM redo_log WHERE applied = 1) AS 已应用的日志;",
    check: {
      uses: /pragma\s+journal_mode/i,
      verify: [
        { kind: 'table', name: 'redo_log' },
        { kind: 'result', expect: [[70, 80, 'wal', 2]] }
      ]
    }
  }, {
    id: '3-5-2',
    title: 'Undo：回滚靠的是撤销日志',
    goal: '改数据之前先偷偷抄一份"旧值"到 undo_log，改完发现不对就 ROLLBACK。你会看到两个现象：余额回到原样，而且连 undo 日志里那几条记录也一起被撤销了——因为日志本身也在事务里。',
    hint: "CREATE TABLE undo_log (...);   -- 建表要在 BEGIN 之前，不然表也会被回滚掉\nBEGIN;\nINSERT INTO undo_log (...) SELECT 'tx2', 'account:1', balance FROM accounts WHERE id = 1;\nUPDATE accounts SET balance = 0 WHERE id = 1;\nROLLBACK;",
    solution: "CREATE TABLE undo_log (\n" +
      "  seq INTEGER PRIMARY KEY AUTOINCREMENT, tx_id TEXT, target TEXT,\n" +
      "  before_value REAL, note TEXT\n" +
      ");\n" +
      "BEGIN;\n" +
      "-- 改之前先把旧值抄进撤销日志\n" +
      "INSERT INTO undo_log (tx_id, target, before_value, note)\n" +
      "  SELECT 'tx2', 'account:1', balance, '改之前的样子' FROM accounts WHERE id = 1;\n" +
      "INSERT INTO undo_log (tx_id, target, before_value, note)\n" +
      "  SELECT 'tx2', 'account:2', balance, '改之前的样子' FROM accounts WHERE id = 2;\n" +
      "UPDATE accounts SET balance = balance - 30 WHERE id = 1;\n" +
      "UPDATE accounts SET balance = balance + 30 WHERE id = 2;\n" +
      "-- 出事了：整个事务撤销\n" +
      "ROLLBACK;\n" +
      "SELECT (SELECT balance FROM accounts WHERE id = 1) AS 账户1,\n" +
      "       (SELECT balance FROM accounts WHERE id = 2) AS 账户2,\n" +
      "       (SELECT COUNT(*) FROM undo_log) AS 撤销日志还剩几条;",
    check: {
      uses: /rollback/i,
      verify: [
        { kind: 'table', name: 'undo_log' },
        { kind: 'result', expect: [[100, 50, 0]] }
      ]
    }
  }],

  /* ---------- 3-6 锁与 MVCC ---------- */
  '3-6': [{
    id: '3-6-1',
    title: '乐观锁：版本号说了算',
    goal: '给 accounts 加一列 version（默认 1）。两个人同时读到 version = 1：A 先写成功、版本号变成 2；B 还拿着旧的 version = 1 来写，一行都改不到——这就是乐观锁，不加锁也能防住覆盖别人的修改。',
    hint: "ALTER TABLE accounts ADD COLUMN version INTEGER DEFAULT 1;\nUPDATE accounts SET balance = 80, version = version + 1 WHERE id = 1 AND version = 1;   -- A 成功\nUPDATE accounts SET balance = 999, version = version + 1 WHERE id = 1 AND version = 1; -- B 改到 0 行\nINSERT INTO lock_log (who, changed, note) VALUES ('B', changes(), '被乐观锁拦下');",
    solution: "ALTER TABLE accounts ADD COLUMN version INTEGER DEFAULT 1;\n" +
      "CREATE TABLE lock_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, who TEXT, changed INTEGER, note TEXT);\n" +
      "-- A 先写：版本号还是 1，写入成功并 +1\n" +
      "UPDATE accounts SET balance = 80, version = version + 1 WHERE id = 1 AND version = 1;\n" +
      "INSERT INTO lock_log (who, changed, note) VALUES ('A', changes(), '写成功');\n" +
      "-- B 拿着过期的 version = 1 再写：一行都改不到\n" +
      "UPDATE accounts SET balance = 999, version = version + 1 WHERE id = 1 AND version = 1;\n" +
      "INSERT INTO lock_log (who, changed, note) VALUES ('B', changes(), '乐观锁拦下：版本号已经不是 1 了');\n" +
      "SELECT (SELECT balance FROM accounts WHERE id = 1) AS 余额,\n" +
      "       (SELECT version FROM accounts WHERE id = 1) AS 版本号,\n" +
      "       (SELECT changed FROM lock_log WHERE who = 'B') AS B改了几行;",
    check: {
      uses: [/update\s+accounts/i, /version/i],
      verify: [
        { kind: 'column', table: 'accounts', column: 'version' },
        { kind: 'result', expect: [[80, 2, 0]] }
      ]
    }
  }, {
    id: '3-6-2',
    title: 'SAVEPOINT：只回滚一小段',
    goal: '不是所有反悔都要推翻整个事务。用 SAVEPOINT 打一个存档点，做一次实验性改动再 ROLLBACK TO 回到存档点，然后继续把正经事做完再 RELEASE——账户 1 不受影响，账户 2 只多了 10 元。',
    hint: "SAVEPOINT sp;\nUPDATE accounts SET balance = 0 WHERE id = 2;   -- 实验性改动\nROLLBACK TO sp;                                  -- 只撤销它，事务还开着\nUPDATE accounts SET balance = balance + 10 WHERE id = 2;\nRELEASE sp;",
    solution: "SAVEPOINT sp;\n" +
      "-- 先做一次实验性改动\n" +
      "UPDATE accounts SET balance = 0 WHERE id = 2;\n" +
      "-- 不满意：回到存档点，但整个事务还在\n" +
      "ROLLBACK TO sp;\n" +
      "-- 继续做正经事，然后释放存档点\n" +
      "UPDATE accounts SET balance = balance + 10 WHERE id = 2;\n" +
      "RELEASE sp;\n" +
      "SELECT (SELECT balance FROM accounts WHERE id = 1) AS 账户1,\n" +
      "       (SELECT balance FROM accounts WHERE id = 2) AS 账户2;",
    check: {
      uses: [/savepoint/i, /rollback\s+to/i],
      verify: { kind: 'result', expect: [[100, 60]] }
    }
  }],

  /* ====================== 第 4 章：NoSQL 与缓存 ====================== */

  /* ---------- 4-1 为什么需要 NoSQL ---------- */
  '4-1': [{
    id: '4-1-1',
    title: '属性老是变：一行一属性',
    goal: '关系表要先定好列，可用户想加什么属性你猜不到。用一张 profile_attrs（user_id + attr + val）把随意长的属性存下来，再加一个新属性也不用改表结构，最后用 CASE WHEN 把竖着的属性"横过来"看成一个对象。',
    hint: "CREATE TABLE profile_attrs (user_id INTEGER NOT NULL, attr TEXT NOT NULL, val TEXT, PRIMARY KEY (user_id, attr));\nSELECT user_id, MAX(CASE WHEN attr = '喜欢颜色' THEN val END) AS 喜欢颜色, ... FROM profile_attrs GROUP BY user_id;",
    solution: "CREATE TABLE profile_attrs (\n" +
      "  user_id INTEGER NOT NULL, attr TEXT NOT NULL, val TEXT,\n" +
      "  PRIMARY KEY (user_id, attr)\n" +
      ");\n" +
      "INSERT INTO profile_attrs (user_id, attr, val) VALUES\n" +
      "  (1, '喜欢颜色', '蓝'),\n" +
      "  (1, '常用数据库', 'SQLite'),\n" +
      "  (1, '养了几只猫', '2');\n" +
      "-- 想加一个新属性？直接插一行，表结构一个字都不用改\n" +
      "INSERT INTO profile_attrs (user_id, attr, val) VALUES (1, '最爱的漫画', '数塔');\n" +
      "SELECT user_id,\n" +
      "       MAX(CASE WHEN attr = '喜欢颜色' THEN val END) AS 喜欢颜色,\n" +
      "       MAX(CASE WHEN attr = '常用数据库' THEN val END) AS 常用数据库,\n" +
      "       MAX(CASE WHEN attr = '养了几只猫' THEN val END) AS 猫,\n" +
      "       MAX(CASE WHEN attr = '最爱的漫画' THEN val END) AS 漫画\n" +
      "FROM profile_attrs WHERE user_id = 1 GROUP BY user_id;",
    check: {
      uses: /profile_attrs/,
      verify: [
        { kind: 'table', name: 'profile_attrs' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM profile_attrs', expect: 4 },
        { kind: 'result', expect: [[1, '蓝', 'SQLite', '2', '数塔']] }
      ]
    }
  }, {
    id: '4-1-2',
    title: '加一个字段的代价',
    goal: '关系表加字段要 ALTER TABLE：全班 8 个同学立刻都多出一列，没用上的人全是 NULL。同样的需求，键值表只要插一个键就行，别人的数据一点不受影响。两种加法的代价对比着看。',
    hint: "ALTER TABLE students ADD COLUMN hobby TEXT;\nUPDATE students SET hobby = '看漫画' WHERE id = 1;\nINSERT INTO kv_store (k, v) VALUES ('user:1:hobby', '看漫画') ON CONFLICT(k) DO UPDATE SET v = excluded.v;",
    solution: "ALTER TABLE students ADD COLUMN hobby TEXT;\n" +
      "-- 关系表：列加了，可只有 1 个人填得上，另外 7 个人全是 NULL\n" +
      "UPDATE students SET hobby = '看漫画' WHERE id = 1;\n" +
      "-- 键值表：加一个键就算加了字段，别人的数据完全不动\n" +
      "INSERT INTO kv_store (k, v) VALUES ('user:1:hobby', '看漫画')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "SELECT (SELECT COUNT(*) FROM kv_store WHERE k = 'user:1:hobby') AS 键值表里的新字段,\n" +
      "       (SELECT COUNT(*) FROM students WHERE hobby IS NOT NULL) AS 宽表里填了的人,\n" +
      "       (SELECT COUNT(*) FROM students WHERE hobby IS NULL) AS 宽表里空着的人;",
    check: {
      uses: /alter\s+table\s+students\s+add\s+column\s+hobby/i,
      verify: [
        { kind: 'column', table: 'students', column: 'hobby' },
        { kind: 'result', expect: [[1, 1, 7]] }
      ]
    }
  }],

  /* ---------- 4-2 Redis 键值数据库 ---------- */
  '4-2': [{
    id: '4-2-1',
    title: 'SET / GET / INCR 的 SQL 版',
    goal: 'kv_store 就是一张大哈希表，用它模拟三个 Redis 命令：SET（同一个键反复写，以最后一次为准）、GET（按键取值）、INCR（把计数器加一，连加两次）。最后看看昵称和访问量。',
    hint: "SET：INSERT INTO kv_store (k, v) VALUES ('user:9:name', '小新') ON CONFLICT(k) DO UPDATE SET v = excluded.v;\nINCR：UPDATE kv_store SET v = CAST(v AS INTEGER) + 1 WHERE k = 'counter:visit';",
    solution: "-- SET：键不存在就插入，存在就覆盖（以最后一次为准）\n" +
      "INSERT INTO kv_store (k, v) VALUES ('user:9:name', '小新')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "INSERT INTO kv_store (k, v) VALUES ('user:9:name', '小新新')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "-- INCR：连加两次\n" +
      "UPDATE kv_store SET v = CAST(v AS INTEGER) + 1 WHERE k = 'counter:visit';\n" +
      "UPDATE kv_store SET v = CAST(v AS INTEGER) + 1 WHERE k = 'counter:visit';\n" +
      "-- GET\n" +
      "SELECT (SELECT v FROM kv_store WHERE k = 'user:9:name') AS 昵称,\n" +
      "       (SELECT v FROM kv_store WHERE k = 'counter:visit') AS 访问量;",
    check: {
      uses: /update\s+kv_store/i,
      verify: [
        { kind: 'rows', sql: "SELECT v FROM kv_store WHERE k = 'user:9:name'", expect: '小新新' },
        { kind: 'rows', sql: "SELECT CAST(v AS INTEGER) FROM kv_store WHERE k = 'counter:visit'", expect: 1026 },
        { kind: 'result', expect: [['小新新', '1026']] }
      ]
    }
  }, {
    id: '4-2-2',
    title: 'TTL：给键一个保质期',
    goal: '缓存不能永远有效。给 kv_store 加一列 expire_at，给两个键分别设上"已经过期"和"很久以后才过期"的时间，然后按当前时间清理一次，看看哪个键被删掉了。',
    hint: "ALTER TABLE kv_store ADD COLUMN expire_at TEXT;\nUPDATE kv_store SET expire_at = '2025-01-01 00:00:00' WHERE k = 'cache:home:rows';\nDELETE FROM kv_store WHERE expire_at IS NOT NULL AND expire_at <= '2026-01-01 00:00:00';",
    solution: "ALTER TABLE kv_store ADD COLUMN expire_at TEXT;\n" +
      "-- 这个键早就过期了（假装现在是 2026-01-01）\n" +
      "UPDATE kv_store SET expire_at = '2025-01-01 00:00:00' WHERE k = 'cache:home:rows';\n" +
      "-- 这个键能活到 2099 年\n" +
      "UPDATE kv_store SET expire_at = '2099-12-31 23:59:59' WHERE k = 'user:1:name';\n" +
      "-- 清理：只删过期的那一个\n" +
      "DELETE FROM kv_store WHERE expire_at IS NOT NULL AND expire_at <= '2026-01-01 00:00:00';\n" +
      "SELECT k, v, expire_at FROM kv_store ORDER BY k;",
    check: {
      uses: /expire_at/,
      verify: [
        { kind: 'column', table: 'kv_store', column: 'expire_at' },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM kv_store WHERE k = 'cache:home:rows'", expect: 0 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM kv_store WHERE k = 'user:1:name'", expect: 1 },
        { kind: 'result', expect: [['counter:visit', '1024', null], ['user:1:level', '9', null], ['user:1:name', '塔库', '2099-12-31 23:59:59']] }
      ]
    }
  }],

  /* ---------- 4-3 缓存穿透 / 击穿 / 雪崩 ---------- */
  '4-3': [{
    id: '4-3-1',
    title: '穿透：查不到也要记一笔',
    goal: '有人拿一个不存在的 id（99）反复查文章：缓存没有 → 查库也没有 → 下次又来。用 cache_log 把第一次的过程记下来，然后把"空结果"也写进缓存，第二次同样的查询就能在缓存里拦住了。',
    hint: "1) 查缓存 kv_store 里有没有 cache:article:99 → 没有就是「缓存未命中」；\n2) 回源查 articles 里 id = 99 → 库里也没有；\n3) 回填空值：INSERT INTO kv_store (k, v) VALUES ('cache:article:99', 'NULL') ON CONFLICT(k) DO UPDATE SET v = excluded.v;",
    solution: "CREATE TABLE cache_log (\n" +
      "  seq INTEGER PRIMARY KEY AUTOINCREMENT, round INTEGER, k TEXT, src TEXT, note TEXT\n" +
      ");\n" +
      "-- 第 1 轮：先查缓存\n" +
      "INSERT INTO cache_log (round, k, src, note)\n" +
      "  SELECT 1, 'cache:article:99', 'redis',\n" +
      "         CASE WHEN EXISTS (SELECT 1 FROM kv_store WHERE k = 'cache:article:99')\n" +
      "              THEN '缓存命中' ELSE '缓存未命中' END;\n" +
      "-- 第 1 轮：缓存没命中，回源数据库\n" +
      "INSERT INTO cache_log (round, k, src, note)\n" +
      "  SELECT 1, 'cache:article:99', 'db',\n" +
      "         CASE WHEN EXISTS (SELECT 1 FROM articles WHERE id = 99)\n" +
      "              THEN '库里查到了' ELSE '库里也没有' END;\n" +
      "-- 回填空值，挡住下一次穿透\n" +
      "INSERT INTO kv_store (k, v) VALUES ('cache:article:99', 'NULL')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "-- 第 2 轮：同样的请求又来了一次\n" +
      "INSERT INTO cache_log (round, k, src, note)\n" +
      "  SELECT 2, 'cache:article:99', 'redis',\n" +
      "         CASE WHEN EXISTS (SELECT 1 FROM kv_store WHERE k = 'cache:article:99')\n" +
      "              THEN '缓存命中' ELSE '缓存未命中' END;\n" +
      "SELECT round, src, note FROM cache_log ORDER BY seq;",
    check: {
      uses: /cache_log/,
      verify: [
        { kind: 'rows', sql: "SELECT note FROM cache_log WHERE round = 1 AND src = 'redis'", expect: '缓存未命中' },
        { kind: 'rows', sql: "SELECT note FROM cache_log WHERE round = 1 AND src = 'db'", expect: '库里也没有' },
        { kind: 'rows', sql: "SELECT note FROM cache_log WHERE round = 2 AND src = 'redis'", expect: '缓存命中' },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM kv_store WHERE k = 'cache:article:99'", expect: 1 }
      ]
    }
  }, {
    id: '4-3-2',
    title: '击穿加锁，雪崩错峰',
    goal: '热点键失效的瞬间，一堆请求同时回源，这就是缓存击穿——解决办法是只让一个人去建缓存（抢锁）。同时给一批缓存键设置错开的过期时间，别让它们在同一秒集体失效（雪崩）。',
    hint: "抢锁用 PRIMARY KEY + INSERT OR IGNORE：只有第一个能插进去。\nINSERT OR IGNORE INTO cache_lock (k, holder, ts) VALUES ('lock:hot', 'A', 1);",
    solution: "CREATE TABLE cache_lock (k TEXT PRIMARY KEY, holder TEXT, ts INTEGER);\n" +
      "-- 两个人同时想重建热点缓存，只有第一个能抢到锁\n" +
      "INSERT OR IGNORE INTO cache_lock (k, holder, ts) VALUES ('lock:hot', 'A', 1);\n" +
      "INSERT OR IGNORE INTO cache_lock (k, holder, ts) VALUES ('lock:hot', 'B', 2);\n" +
      "CREATE TABLE cache_ttl (k TEXT PRIMARY KEY, expire_at INTEGER);\n" +
      "-- 过期时间故意错开（100 / 107 / 113），不要一起失效\n" +
      "INSERT INTO cache_ttl (k, expire_at) VALUES\n" +
      "  ('cache:a', 100), ('cache:b', 107), ('cache:c', 113);\n" +
      "SELECT (SELECT COUNT(*) FROM cache_lock) AS 抢到锁的人,\n" +
      "       (SELECT holder FROM cache_lock) AS 是谁,\n" +
      "       (SELECT COUNT(DISTINCT expire_at) FROM cache_ttl) AS 过期时间有几种;",
    check: {
      uses: [/cache_lock/i, /cache_ttl/i],
      verify: [
        { kind: 'table', name: 'cache_ttl' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM cache_lock', expect: 1 },
        { kind: 'rows', sql: 'SELECT holder FROM cache_lock', expect: 'A' },
        { kind: 'result', expect: [[1, 'A', 3]] }
      ]
    }
  }],

  /* ---------- 4-4 MongoDB 文档数据库 ---------- */
  '4-4': [{
    id: '4-4-1',
    title: '一整个文档塞进一列',
    goal: 'MongoDB 里一条记录就是一个 JSON 文档，字段可以各长各的。建一张 docs 表，把两个结构不一样的用户文档塞进 doc 文本列，再用 json_extract 把里面的字段"掏"出来查——u1 有 tags 没 city，u2 有 city 没 tags。',
    hint: "CREATE TABLE docs (coll TEXT NOT NULL, _id TEXT NOT NULL, doc TEXT NOT NULL, PRIMARY KEY (coll, _id));\nINSERT INTO docs (coll, _id, doc) VALUES ('users', 'u1', json_object('name', '小明', 'age', 12, 'tags', json_array('数据库', 'SQL')));\nSELECT _id, json_extract(doc, '$.name') AS 姓名 FROM docs;",
    solution: "CREATE TABLE docs (\n" +
      "  coll TEXT NOT NULL, _id TEXT NOT NULL, doc TEXT NOT NULL,\n" +
      "  PRIMARY KEY (coll, _id)\n" +
      ");\n" +
      "-- 一个文档就是一个 JSON，两个文档的字段可以完全不一样\n" +
      "INSERT INTO docs (coll, _id, doc) VALUES\n" +
      "  ('users', 'u1', json_object('name', '小明', 'age', 12, 'tags', json_array('数据库', 'SQL'))),\n" +
      "  ('users', 'u2', json_object('name', '小红', 'age', 12, 'city', '杭州'));\n" +
      "SELECT _id,\n" +
      "       json_extract(doc, '$.name') AS 姓名,\n" +
      "       json_extract(doc, '$.city') AS 城市\n" +
      "FROM docs ORDER BY _id;",
    check: {
      uses: /json_extract/,
      verify: [
        { kind: 'table', name: 'docs' },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM docs WHERE json_extract(doc, '$.tags') IS NOT NULL", expect: 1 },
        { kind: 'result', expect: [['u1', '小明', null], ['u2', '小红', '杭州']] }
      ]
    }
  }, {
    id: '4-4-2',
    title: '无模式的代价：文档字段也能建索引',
    goal: '文档数据库的代价是"字段漏写了就查不到"。先体会一下：只有 1 个文档有 city。然后像 MongoDB 给字段建索引那样，在 json_extract(doc, \'$.name\') 这种表达式上建索引，让按 name 查文档也走索引。',
    hint: "CREATE INDEX idx_docs_name ON docs(json_extract(doc, '$.name'));\nEXPLAIN QUERY PLAN SELECT * FROM docs WHERE json_extract(doc, '$.name') = '小红';",
    solution: "CREATE TABLE docs (\n" +
      "  coll TEXT NOT NULL, _id TEXT NOT NULL, doc TEXT NOT NULL,\n" +
      "  PRIMARY KEY (coll, _id)\n" +
      ");\n" +
      "INSERT INTO docs (coll, _id, doc) VALUES\n" +
      "  ('users', 'u1', json_object('name', '小明', 'age', 12, 'tags', json_array('数据库', 'SQL'))),\n" +
      "  ('users', 'u2', json_object('name', '小红', 'age', 12, 'city', '杭州'));\n" +
      "-- 给文档里的字段建索引（表达式索引）\n" +
      "CREATE INDEX idx_docs_name ON docs(json_extract(doc, '$.name'));\n" +
      "EXPLAIN QUERY PLAN SELECT * FROM docs WHERE json_extract(doc, '$.name') = '小红';\n" +
      "SELECT _id, json_extract(doc, '$.name') AS 姓名\n" +
      "FROM docs WHERE json_extract(doc, '$.name') = '小红';",
    check: {
      uses: /create\s+index\s+idx_docs_name/i,
      verify: [
        { kind: 'index', name: 'idx_docs_name' },
        { kind: 'explain', sql: "SELECT * FROM docs WHERE json_extract(doc, '$.name') = '小红'", expect: /idx_docs_name/ },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM docs WHERE json_extract(doc, '$.city') IS NOT NULL", expect: 1 },
        { kind: 'result', expect: [['u2', '小红']] }
      ]
    }
  }],

  /* ---------- 4-5 Redis 持久化 ---------- */
  '4-5': [{
    id: '4-5-1',
    title: 'RDB：拍一张全量快照',
    goal: 'RDB 持久化就是「把此刻所有数据抄一份存起来」。用 CREATE TABLE ... AS SELECT 给 kv_store 拍一张快照，然后再往库里加两个键、删一个键，对比快照和现在的库：快照永远停在拍下的那一刻。',
    hint: "CREATE TABLE rdb_snapshot AS SELECT * FROM kv_store;\nINSERT INTO kv_store ...; DELETE FROM kv_store WHERE k = 'cache:home:rows';",
    solution: "-- 拍快照：此刻 4 个键全在里面\n" +
      "CREATE TABLE rdb_snapshot AS SELECT * FROM kv_store;\n" +
      "-- 快照拍完之后，库又变了：加两个、删一个\n" +
      "INSERT INTO kv_store (k, v) VALUES ('user:2:name', '小红')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "INSERT INTO kv_store (k, v) VALUES ('user:2:level', '3')\n" +
      "  ON CONFLICT(k) DO UPDATE SET v = excluded.v;\n" +
      "DELETE FROM kv_store WHERE k = 'cache:home:rows';\n" +
      "SELECT (SELECT COUNT(*) FROM rdb_snapshot) AS 快照里的键,\n" +
      "       (SELECT COUNT(*) FROM kv_store) AS 现在的库,\n" +
      "       (SELECT COUNT(*) FROM rdb_snapshot WHERE k = 'cache:home:rows') AS 快照里还有这个键吗,\n" +
      "       (SELECT COUNT(*) FROM kv_store WHERE k = 'cache:home:rows') AS 现在的库里还有吗;",
    check: {
      uses: /rdb_snapshot/,
      verify: [
        { kind: 'table', name: 'rdb_snapshot' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM rdb_snapshot', expect: 4 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM kv_store', expect: 5 },
        { kind: 'result', expect: [[4, 5, 1, 0]] }
      ]
    }
  }, {
    id: '4-5-2',
    title: 'AOF：把命令记下来再回放',
    goal: 'AOF 持久化是"把每条写命令追加到日志里"，重启时按顺序回放就能把数据变回来。建一张 aof_log 记下 4 条命令（同一个键写了两次、还删了一个键），再按"每个键只认最后一条命令"回放出一份新数据。',
    hint: "回放时每个键要取序号最大的一条：\nSELECT k, v FROM (SELECT k, v, cmd, ROW_NUMBER() OVER (PARTITION BY k ORDER BY seq DESC) AS rn FROM aof_log) WHERE rn = 1 AND cmd = 'SET';",
    solution: "CREATE TABLE aof_log (\n" +
      "  seq INTEGER PRIMARY KEY AUTOINCREMENT, cmd TEXT NOT NULL, k TEXT, v TEXT\n" +
      ");\n" +
      "-- 每一条写命令都追加进日志\n" +
      "INSERT INTO aof_log (cmd, k, v) VALUES\n" +
      "  ('SET', 'user:3:name', '小刚'),\n" +
      "  ('SET', 'counter:visit', '1025'),\n" +
      "  ('SET', 'user:3:name', '小刚强'),\n" +
      "  ('DEL', 'cache:home:rows', NULL);\n" +
      "-- 假装重启：按日志回放（同一个键以最后一条命令为准）\n" +
      "CREATE TABLE kv_after_restart (k TEXT PRIMARY KEY, v TEXT);\n" +
      "INSERT INTO kv_after_restart (k, v)\n" +
      "SELECT k, v FROM (\n" +
      "  SELECT k, v, cmd, ROW_NUMBER() OVER (PARTITION BY k ORDER BY seq DESC) AS rn\n" +
      "  FROM aof_log\n" +
      ") WHERE rn = 1 AND cmd = 'SET';\n" +
      "SELECT k, v FROM kv_after_restart ORDER BY k;",
    check: {
      uses: /aof_log/,
      verify: [
        { kind: 'table', name: 'kv_after_restart' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM kv_after_restart', expect: 2 },
        { kind: 'rows', sql: "SELECT v FROM kv_after_restart WHERE k = 'user:3:name'", expect: '小刚强' },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM kv_after_restart WHERE k = 'cache:home:rows'", expect: 0 }
      ]
    }
  }],

  /* ====================== 第 5 章：分布式架构 ====================== */

  /* ---------- 5-1 分库分表 ---------- */
  '5-1': [{
    id: '5-1-1',
    title: '两张分表，一个总数',
    goal: '数据太多就按年拆表：orders_2024 和 orders_2025 各管一年。用 UNION ALL 把它们拼成一张"逻辑大表"，统计每年的订单数和总金额——分表之后，查询照样能跨表汇总。',
    hint: "SELECT '2024' AS 分片, COUNT(*), SUM(amount) FROM orders_2024\nUNION ALL\nSELECT '2025', COUNT(*), SUM(amount) FROM orders_2025;",
    solution: "SELECT '2024' AS 分片, COUNT(*) AS 订单数, SUM(amount) AS 总金额 FROM orders_2024\n" +
      "UNION ALL\n" +
      "SELECT '2025', COUNT(*), SUM(amount) FROM orders_2025;",
    check: {
      uses: /union\s+all/i,
      verify: [
        { kind: 'result', expect: [['2024', 3, 278.5], ['2025', 3, 423.5]] },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM (SELECT id FROM orders_2024 UNION ALL SELECT id FROM orders_2025)', expect: 6 }
      ]
    }
  }, {
    id: '5-1-2',
    title: '按 user_id 取模分片',
    goal: '横向分片要有一条"路由规则"。这里用最经典的 user_id % 2：偶数进 0 号分片、奇数进 1 号分片。把 orders_2024 的数据按规则灌进两张分片表，再数一数各自装了几条。',
    hint: "CREATE TABLE orders_shard0 (...);  CREATE TABLE orders_shard1 (...);\nINSERT INTO orders_shard0 SELECT id, user_id, amount, created_at FROM orders_2024 WHERE user_id % 2 = 0;\nINSERT INTO orders_shard1 ... WHERE user_id % 2 = 1;",
    solution: "CREATE TABLE orders_shard0 (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\n" +
      "CREATE TABLE orders_shard1 (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\n" +
      "-- 路由规则：user_id % 2，偶数去 0 号分片\n" +
      "INSERT INTO orders_shard0 (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2024 WHERE user_id % 2 = 0;\n" +
      "INSERT INTO orders_shard1 (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2024 WHERE user_id % 2 = 1;\n" +
      "SELECT (SELECT COUNT(*) FROM orders_shard0) AS 零号分片,\n" +
      "       (SELECT COUNT(*) FROM orders_shard1) AS 一号分片,\n" +
      "       (SELECT COUNT(*) FROM orders_shard0 WHERE user_id % 2 <> 0) AS 分错片的;",
    check: {
      uses: [/orders_shard0/i, /user_id\s*%\s*2/i],
      verify: [
        { kind: 'table', name: 'orders_shard1' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM orders_shard0', expect: 1 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM orders_shard1', expect: 2 },
        { kind: 'result', expect: [[1, 2, 0]] }
      ]
    }
  }],

  /* ---------- 5-2 主从复制 ---------- */
  '5-2': [{
    id: '5-2-1',
    title: '从库：先照抄一份',
    goal: '主从复制的第一步是全量拷贝。照着 orders_2025 的结构建一张 orders_2025_replica，把主库的数据整份搬过去，然后确认两边的行数一模一样——从库才敢对外提供读服务。',
    hint: "CREATE TABLE orders_2025_replica (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\nINSERT INTO orders_2025_replica SELECT * FROM orders_2025;",
    solution: "CREATE TABLE orders_2025_replica (\n" +
      "  id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT\n" +
      ");\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2025;\n" +
      "SELECT (SELECT COUNT(*) FROM orders_2025) AS 主库,\n" +
      "       (SELECT COUNT(*) FROM orders_2025_replica) AS 从库,\n" +
      "       (SELECT COUNT(*) FROM orders_2025_replica WHERE id NOT IN (SELECT id FROM orders_2025)) AS 多出来的;",
    check: {
      uses: /orders_2025_replica/,
      verify: [
        { kind: 'table', name: 'orders_2025_replica' },
        { kind: 'result', expect: [[3, 3, 0]] }
      ]
    }
  }, {
    id: '5-2-2',
    title: '补同步：幂等才敢重放',
    goal: '主库插了一笔新订单，从库还差这一笔。用"只补从库没有的 id"这种幂等方式补同步，跑两遍也不会重复。用 repl_log 记录每一步：写入主库后从库落后 1 行，补同步后两边一致。',
    hint: "INSERT INTO orders_2025_replica SELECT * FROM orders_2025 WHERE id NOT IN (SELECT id FROM orders_2025_replica);\n这句可以重复执行，插过的 id 不会再插一遍。",
    solution: "CREATE TABLE repl_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, stage TEXT, master INTEGER, replica INTEGER);\n" +
      "CREATE TABLE orders_2025_replica (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at) SELECT id, user_id, amount, created_at FROM orders_2025;\n" +
      "-- 主库写入一笔新订单\n" +
      "INSERT INTO orders_2025 (id, user_id, amount, created_at) VALUES (4, 5, 66.0, '2025-07-07');\n" +
      "INSERT INTO repl_log (stage, master, replica)\n" +
      "  SELECT '写入主库后', (SELECT COUNT(*) FROM orders_2025), (SELECT COUNT(*) FROM orders_2025_replica);\n" +
      "-- 补同步：只补从库缺的 id（幂等）\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2025 WHERE id NOT IN (SELECT id FROM orders_2025_replica);\n" +
      "INSERT INTO repl_log (stage, master, replica)\n" +
      "  SELECT '补同步后', (SELECT COUNT(*) FROM orders_2025), (SELECT COUNT(*) FROM orders_2025_replica);\n" +
      "-- 再补一次，也不会变成 5 行\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2025 WHERE id NOT IN (SELECT id FROM orders_2025_replica);\n" +
      "INSERT INTO repl_log (stage, master, replica)\n" +
      "  SELECT '再补一次', (SELECT COUNT(*) FROM orders_2025), (SELECT COUNT(*) FROM orders_2025_replica);\n" +
      "SELECT stage, master, replica FROM repl_log ORDER BY seq;",
    check: {
      uses: /repl_log/,
      verify: [
        { kind: 'rows', sql: "SELECT replica FROM repl_log WHERE stage = '写入主库后'", expect: 3 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM repl_log WHERE master = replica', expect: 2 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM orders_2025_replica', expect: 4 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM repl_log', expect: 3 }
      ]
    }
  }],

  /* ---------- 5-3 读写分离 ---------- */
  '5-3': [{
    id: '5-3-1',
    title: '刚写完就读，怎么读不到？',
    goal: '读写分离：写主库、读从库。用户 6 下了一笔新订单（写进主库），紧接着去从库读自己的订单列表——只能读到 0 笔，因为从库还没收到这笔数据，这就是主从延迟。用 read_log 把两次读的结果都记下来。',
    hint: "INSERT INTO read_log (source, note, cnt) SELECT 'replica', '马上去从库读', COUNT(*) FROM orders_2025_replica WHERE user_id = 6;\nINSERT INTO read_log (source, note, cnt) SELECT 'master', '强制读主库', COUNT(*) FROM orders_2025 WHERE user_id = 6;",
    solution: "CREATE TABLE read_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, source TEXT, note TEXT, cnt INTEGER);\n" +
      "CREATE TABLE orders_2025_replica (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at) SELECT id, user_id, amount, created_at FROM orders_2025;\n" +
      "-- 用户 6 下了一笔新订单，写进主库\n" +
      "INSERT INTO orders_2025 (id, user_id, amount, created_at) VALUES (4, 6, 42.0, '2025-08-08');\n" +
      "-- 马上读从库：数据还没同步过去\n" +
      "INSERT INTO read_log (source, note, cnt)\n" +
      "  SELECT 'replica', '马上去从库读自己的订单', COUNT(*) FROM orders_2025_replica WHERE user_id = 6;\n" +
      "-- 同样的查询打到主库：读得到\n" +
      "INSERT INTO read_log (source, note, cnt)\n" +
      "  SELECT 'master', '不放心，强制读主库', COUNT(*) FROM orders_2025 WHERE user_id = 6;\n" +
      "SELECT source, note, cnt FROM read_log ORDER BY seq;",
    check: {
      uses: /read_log/,
      verify: [
        { kind: 'rows', sql: "SELECT cnt FROM read_log WHERE source = 'replica'", expect: 0 },
        { kind: 'rows', sql: "SELECT cnt FROM read_log WHERE source = 'master'", expect: 1 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM orders_2025_replica', expect: 3 }
      ]
    }
  }, {
    id: '5-3-2',
    title: '把延迟窗口等过去',
    goal: '主从延迟只是一个时间窗口。同一笔订单：延迟窗口内读从库是 0 笔，等复制追上之后再读从库就是 1 笔了，和主库完全一致。用 read_log 记下这三个时刻。',
    hint: "先记录延迟窗口内的结果，再 INSERT INTO orders_2025_replica SELECT ... WHERE id NOT IN (...)，然后再读一次。",
    solution: "CREATE TABLE read_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, source TEXT, note TEXT, cnt INTEGER);\n" +
      "CREATE TABLE orders_2025_replica (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at) SELECT id, user_id, amount, created_at FROM orders_2025;\n" +
      "INSERT INTO orders_2025 (id, user_id, amount, created_at) VALUES (4, 6, 42.0, '2025-08-08');\n" +
      "INSERT INTO read_log (source, note, cnt)\n" +
      "  SELECT 'replica', '延迟窗口内读从库', COUNT(*) FROM orders_2025_replica WHERE user_id = 6;\n" +
      "-- 复制追上来\n" +
      "INSERT INTO orders_2025_replica (id, user_id, amount, created_at)\n" +
      "  SELECT id, user_id, amount, created_at FROM orders_2025 WHERE id NOT IN (SELECT id FROM orders_2025_replica);\n" +
      "INSERT INTO read_log (source, note, cnt)\n" +
      "  SELECT 'replica', '同步之后读从库', COUNT(*) FROM orders_2025_replica WHERE user_id = 6;\n" +
      "INSERT INTO read_log (source, note, cnt)\n" +
      "  SELECT 'master', '主库一直是对的', COUNT(*) FROM orders_2025 WHERE user_id = 6;\n" +
      "SELECT (SELECT cnt FROM read_log WHERE note = '延迟窗口内读从库') AS 延迟时读到的,\n" +
      "       (SELECT cnt FROM read_log WHERE note = '同步之后读从库') AS 同步后读到的,\n" +
      "       (SELECT cnt FROM read_log WHERE source = 'master') AS 主库读到的;",
    check: {
      uses: [/read_log/i, /orders_2025_replica/i],
      verify: [
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM read_log', expect: 3 },
        { kind: 'result', expect: [[0, 1, 1]] }
      ]
    }
  }],

  /* ---------- 5-4 CAP 定理 ---------- */
  '5-4': [{
    id: '5-4-1',
    title: '网络分区了，两边各改各的',
    goal: '网络一断，A 区和 B 区只能各自更新：同一个键 user:1:level，A 区改成 10、B 区改成 9。把两边的数据放两张表里，网络恢复后一对比，冲突就暴露出来了。',
    hint: "CREATE TABLE part_a (k TEXT PRIMARY KEY, v TEXT, ver INTEGER);  B 区同理建 part_b。\n冲突检测：SELECT a.k, a.v, b.v FROM part_a a JOIN part_b b ON b.k = a.k WHERE a.v <> b.v;",
    solution: "CREATE TABLE part_a (k TEXT PRIMARY KEY, v TEXT, ver INTEGER);\n" +
      "CREATE TABLE part_b (k TEXT PRIMARY KEY, v TEXT, ver INTEGER);\n" +
      "-- 分区期间：A 区把等级改成 10，B 区改成 9\n" +
      "INSERT INTO part_a (k, v, ver) VALUES ('user:1:level', '10', 2), ('user:1:city', '北京', 1);\n" +
      "INSERT INTO part_b (k, v, ver) VALUES ('user:1:level', '9', 2), ('user:1:city', '北京', 1);\n" +
      "-- 恢复后一对比，只有 level 这个键对不上\n" +
      "SELECT a.k AS 键, a.v AS A区看到的值, b.v AS B区看到的值\n" +
      "FROM part_a a JOIN part_b b ON b.k = a.k\n" +
      "WHERE a.v <> b.v;",
    check: {
      uses: [/part_a/i, /part_b/i],
      verify: [
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM part_a', expect: 2 },
        { kind: 'result', expect: [['user:1:level', '10', '9']] }
      ]
    }
  }, {
    id: '5-4-2',
    title: '谁赢了：版本号裁决冲突',
    goal: '冲突不能靠猜。给每次写入带一个版本号，A 区的版本是 2、B 区是 3，合并时版本大的赢——但落败的那个值不能悄悄丢掉，要写进 conflict_log 留档。',
    hint: "先按 A 区的值插进 merged，再把版本更大的 B 区值更新上去：\nUPDATE merged SET v = (SELECT v FROM part_b WHERE k = merged.k), ver = (SELECT ver FROM part_b WHERE k = merged.k) WHERE EXISTS (SELECT 1 FROM part_b WHERE k = merged.k AND ver > merged.ver);",
    solution: "CREATE TABLE part_a (k TEXT PRIMARY KEY, v TEXT, ver INTEGER);\n" +
      "CREATE TABLE part_b (k TEXT PRIMARY KEY, v TEXT, ver INTEGER);\n" +
      "INSERT INTO part_a (k, v, ver) VALUES ('user:1:level', '10', 2);\n" +
      "INSERT INTO part_b (k, v, ver) VALUES ('user:1:level', '9', 3);\n" +
      "CREATE TABLE merged (k TEXT PRIMARY KEY, v TEXT, ver INTEGER, from_side TEXT);\n" +
      "CREATE TABLE conflict_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, k TEXT, loser TEXT, loser_ver INTEGER);\n" +
      "-- 先放 A 区的值\n" +
      "INSERT INTO merged (k, v, ver, from_side) SELECT k, v, ver, 'A' FROM part_a;\n" +
      "-- 版本更大的 B 区值胜出，A 区的旧值记进冲突日志\n" +
      "INSERT INTO conflict_log (k, loser, loser_ver)\n" +
      "  SELECT m.k, m.v, m.ver FROM merged m JOIN part_b b ON b.k = m.k WHERE b.ver > m.ver;\n" +
      "UPDATE merged\n" +
      "   SET v = (SELECT v FROM part_b WHERE k = merged.k),\n" +
      "       ver = (SELECT ver FROM part_b WHERE k = merged.k),\n" +
      "       from_side = 'B'\n" +
      " WHERE EXISTS (SELECT 1 FROM part_b WHERE k = merged.k AND ver > merged.ver);\n" +
      "SELECT k, v, ver, from_side FROM merged;",
    check: {
      uses: /conflict_log/,
      verify: [
        { kind: 'table', name: 'merged' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM conflict_log', expect: 1 },
        { kind: 'result', expect: [['user:1:level', '9', 3, 'B']] }
      ]
    }
  }],

  /* ---------- 5-5 分布式事务 ---------- */
  '5-5': [{
    id: '5-5-1',
    title: '两阶段提交：先都准备好',
    goal: '跨两个账户转账，中间隔着网络。第一阶段：两个参与者都写下 prepare 状态，谁都没真动手；第二阶段：确认大家都准备好了，才真正扣钱加钱、把状态改成 commit。',
    hint: "CREATE TABLE tcc_tx (tx_id TEXT NOT NULL, participant TEXT NOT NULL, vote TEXT, state TEXT NOT NULL, PRIMARY KEY (tx_id, participant));\nINSERT INTO tcc_tx VALUES ('tx100', 'A账户', 'yes', 'prepare'), ('tx100', 'B账户', 'yes', 'prepare');",
    solution: "CREATE TABLE tcc_tx (\n" +
      "  tx_id TEXT NOT NULL, participant TEXT NOT NULL, vote TEXT, state TEXT NOT NULL,\n" +
      "  PRIMARY KEY (tx_id, participant)\n" +
      ");\n" +
      "-- 第一阶段：所有参与者先写 prepare，还没有人真的改数据\n" +
      "INSERT INTO tcc_tx (tx_id, participant, vote, state) VALUES\n" +
      "  ('tx100', 'A账户', 'yes', 'prepare'),\n" +
      "  ('tx100', 'B账户', 'yes', 'prepare');\n" +
      "-- 第二阶段：全员就绪，才真正落账\n" +
      "UPDATE accounts SET balance = balance - 30 WHERE id = 1;\n" +
      "UPDATE accounts SET balance = balance + 30 WHERE id = 2;\n" +
      "UPDATE tcc_tx SET state = 'commit' WHERE tx_id = 'tx100';\n" +
      "SELECT (SELECT balance FROM accounts WHERE id = 1) AS 账户1,\n" +
      "       (SELECT balance FROM accounts WHERE id = 2) AS 账户2,\n" +
      "       (SELECT COUNT(*) FROM tcc_tx WHERE state = 'commit') AS 已提交的参与者,\n" +
      "       (SELECT COUNT(*) FROM tcc_tx WHERE state = 'prepare') AS 还停在prepare的;",
    check: {
      uses: /tcc_tx/,
      verify: [
        { kind: 'rows', sql: "SELECT balance FROM accounts WHERE id = 1", expect: 70 },
        { kind: 'rows', sql: "SELECT balance FROM accounts WHERE id = 2", expect: 80 },
        { kind: 'result', expect: [[70, 80, 2, 0]] }
      ]
    }
  }, {
    id: '5-5-2',
    title: '一票否决：全体回滚',
    goal: '第二阶段里只要有一个参与者投了 no，整个分布式事务就得放弃。让 B 账户投 no，用一句 CASE WHEN 让协调者给出决定，然后把所有参与者标成 abort——钱一分都不能动。',
    hint: "SELECT CASE WHEN EXISTS (SELECT 1 FROM tcc_tx WHERE tx_id = 'tx200' AND vote = 'no') THEN 'ROLLBACK' ELSE 'COMMIT' END AS 协调者的决定;\nUPDATE tcc_tx SET state = 'abort' WHERE tx_id = 'tx200';",
    solution: "CREATE TABLE tcc_tx (\n" +
      "  tx_id TEXT NOT NULL, participant TEXT NOT NULL, vote TEXT, state TEXT NOT NULL,\n" +
      "  PRIMARY KEY (tx_id, participant)\n" +
      ");\n" +
      "-- B 账户投了反对票\n" +
      "INSERT INTO tcc_tx (tx_id, participant, vote, state) VALUES\n" +
      "  ('tx200', 'A账户', 'yes', 'prepare'),\n" +
      "  ('tx200', 'B账户', 'no', 'prepare');\n" +
      "-- 协调者：只要有一个人说不，全体放弃，谁都不许真的落账\n" +
      "UPDATE tcc_tx SET state = 'abort' WHERE tx_id = 'tx200';\n" +
      "SELECT CASE WHEN EXISTS (SELECT 1 FROM tcc_tx WHERE tx_id = 'tx200' AND vote = 'no')\n" +
      "            THEN 'ROLLBACK' ELSE 'COMMIT' END AS 协调者的决定;",
    check: {
      uses: /vote/i,
      verify: [
        { kind: 'rows', sql: "SELECT COUNT(*) FROM tcc_tx WHERE state = 'abort'", expect: 2 },
        { kind: 'rows', sql: 'SELECT balance FROM accounts WHERE id = 1', expect: 100 },
        { kind: 'result', expect: [['ROLLBACK']] }
      ]
    }
  }],

  /* ====================== 第 6 章：向量数据库与 AI ====================== */

  /* ---------- 6-1 什么是向量 ---------- */
  '6-1': [{
    id: '6-1-1',
    title: '量一量向量的长度',
    goal: 'articles.vec 里存的是 "0.90,0.10,0.05,0.20" 这样的 4 维向量。用已注册的 vec_norm() 函数算一算每篇文章向量的模长（长度），看看哪些向量"更长"。',
    hint: 'SELECT id, title, ROUND(vec_norm(vec), 4) AS 模长 FROM articles ORDER BY id;\n模长 = 各维平方和再开方。',
    solution: "SELECT id, title, ROUND(vec_norm(vec), 4) AS 模长\n" +
      "FROM articles ORDER BY id;",
    check: {
      uses: /vec_norm/,
      verify: [
        { kind: 'result', expect: [
          [1, '数据库入门', 0.9287], [2, '索引原理', 0.8916], [3, '事务与一致性', 0.9287],
          [4, '向量与相似度', 1.2669], [5, 'RAG 检索增强', 1.2787], [6, 'AI 的记忆', 1.2217]
        ] },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM articles WHERE vec_norm(vec) > 1', expect: 3 }
      ]
    }
  }, {
    id: '6-1-2',
    title: '把向量拆成 4 个维度',
    goal: '向量在库里其实是一串逗号分隔的文本，想按维度用就得先拆开。用 json_extract 把它拼成 JSON 数组后按位置取数，把每篇文章拆成 d1~d4 四列存进 vec_flat，再看第 4 篇文章的四个维度。',
    hint: "json_extract('[' || vec || ']', '$[0]') 取第一维，$[1] 取第二维……\nCREATE TABLE vec_flat (article_id INTEGER PRIMARY KEY, d1 REAL, d2 REAL, d3 REAL, d4 REAL);",
    solution: "CREATE TABLE vec_flat (\n" +
      "  article_id INTEGER PRIMARY KEY, d1 REAL, d2 REAL, d3 REAL, d4 REAL\n" +
      ");\n" +
      "INSERT INTO vec_flat (article_id, d1, d2, d3, d4)\n" +
      "SELECT id,\n" +
      "       json_extract('[' || vec || ']', '$[0]'),\n" +
      "       json_extract('[' || vec || ']', '$[1]'),\n" +
      "       json_extract('[' || vec || ']', '$[2]'),\n" +
      "       json_extract('[' || vec || ']', '$[3]')\n" +
      "FROM articles;\n" +
      "SELECT * FROM vec_flat WHERE article_id = 4;",
    check: {
      uses: /vec_flat/,
      verify: [
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM vec_flat', expect: 6 },
        { kind: 'rows', sql: 'SELECT d1 FROM vec_flat WHERE article_id = 1', expect: 0.9 },
        { kind: 'rows', sql: 'SELECT d4 FROM vec_flat WHERE article_id = 6', expect: 0.95 },
        { kind: 'result', expect: [[4, 0.15, 0.2, 0.95, 0.8]] }
      ]
    }
  }],

  /* ---------- 6-2 相似度与距离 ---------- */
  '6-2': [{
    id: '6-2-1',
    title: 'Top-1：我最像谁',
    goal: '拿一个查询向量 "0.20,0.25,0.90,0.85"，用 cos_sim() 和每一篇文章的向量算余弦相似度，按相似度从高到低排序，取出最像的那一篇（记得把 5 号文章本身排除掉）。',
    hint: "ORDER BY cos_sim(vec, '0.20,0.25,0.90,0.85') DESC LIMIT 1;\n余弦相似度越接近 1 越像。",
    solution: "SELECT id, title, ROUND(cos_sim(vec, '0.20,0.25,0.90,0.85'), 4) AS 相似度\n" +
      "FROM articles\n" +
      "WHERE id <> 5\n" +
      "ORDER BY 相似度 DESC\n" +
      "LIMIT 1;",
    check: {
      uses: [/cos_sim/i, /order\s+by/i],
      verify: { kind: 'result', expect: [[4, '向量与相似度', 0.997]] }
    }
  }, {
    id: '6-2-2',
    title: 'Top-3：相似度不够的不要',
    goal: '真实检索不会"矬子里拔将军"：相似度低于 0.45 的直接丢掉，剩下的按相似度排序，看看一共有几篇入围。',
    hint: "WHERE id <> 5 AND cos_sim(vec, '0.20,0.25,0.90,0.85') >= 0.45\nORDER BY 相似度 DESC;",
    solution: "SELECT id, title, ROUND(cos_sim(vec, '0.20,0.25,0.90,0.85'), 4) AS 相似度\n" +
      "FROM articles\n" +
      "WHERE id <> 5 AND cos_sim(vec, '0.20,0.25,0.90,0.85') >= 0.45\n" +
      "ORDER BY 相似度 DESC;",
    check: {
      uses: /cos_sim/i,
      verify: [
        { kind: 'resultRows', expect: 3 },
        { kind: 'result', expect: [[4, '向量与相似度', 0.997], [6, 'AI 的记忆', 0.981], [3, '事务与一致性', 0.4526]] }
      ]
    }
  }],

  /* ---------- 6-3 维度灾难与 HNSW ---------- */
  '6-3': [{
    id: '6-3-1',
    title: '暴力检索：6 个都要算一遍',
    goal: '数据量小的时候，最朴素的检索就是把库里每个向量都算一遍相似度，这叫暴力全扫。先用 ann_log 记下这次要算多少个候选，再取出 Top-1。',
    hint: "INSERT INTO ann_log (stage, candidates) SELECT '暴力全扫', COUNT(*) FROM articles;\n然后再 SELECT ... ORDER BY cos_sim(...) DESC LIMIT 1;",
    solution: "CREATE TABLE ann_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, stage TEXT, candidates INTEGER);\n" +
      "-- 暴力全扫：库里有几篇就得算几遍\n" +
      "INSERT INTO ann_log (stage, candidates) SELECT '暴力全扫', COUNT(*) FROM articles;\n" +
      "SELECT id, title, ROUND(cos_sim(vec, '0.20,0.25,0.90,0.85'), 4) AS 相似度\n" +
      "FROM articles\n" +
      "WHERE id <> 5\n" +
      "ORDER BY 相似度 DESC\n" +
      "LIMIT 1;",
    check: {
      uses: /ann_log/,
      verify: [
        { kind: 'rows', sql: "SELECT candidates FROM ann_log WHERE stage = '暴力全扫'", expect: 6 },
        { kind: 'result', expect: [[4, '向量与相似度', 0.997]] }
      ]
    }
  }, {
    id: '6-3-2',
    title: '先粗筛，再精算',
    goal: '向量一多，暴力全扫就慢了。仿照 HNSW 的思路：先用便宜的粗筛（只看第 3 维 d3 >= 0.5，也就是"偏 AI 方向"的那一批）把候选砍掉一半，再对这几个候选精算余弦相似度。对比一下候选数量，并确认 Top-1 和暴力全扫一样。',
    hint: "先把 vec 拆成 vec_flat（d1~d4），再用 WHERE d3 >= 0.5 粗筛；\nINSERT INTO ann_log (stage, candidates) SELECT '粗筛候选', COUNT(*) FROM vec_flat WHERE d3 >= 0.5;",
    solution: "CREATE TABLE ann_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, stage TEXT, candidates INTEGER);\n" +
      "CREATE TABLE vec_flat (article_id INTEGER PRIMARY KEY, d1 REAL, d2 REAL, d3 REAL, d4 REAL);\n" +
      "INSERT INTO vec_flat (article_id, d1, d2, d3, d4)\n" +
      "SELECT id,\n" +
      "       json_extract('[' || vec || ']', '$[0]'),\n" +
      "       json_extract('[' || vec || ']', '$[1]'),\n" +
      "       json_extract('[' || vec || ']', '$[2]'),\n" +
      "       json_extract('[' || vec || ']', '$[3]')\n" +
      "FROM articles;\n" +
      "-- 第一层：暴力全扫的代价\n" +
      "INSERT INTO ann_log (stage, candidates) SELECT '暴力全扫', COUNT(*) FROM articles;\n" +
      "-- 第二层：粗筛，只看第 3 维（偏 AI 方向的那一批）\n" +
      "INSERT INTO ann_log (stage, candidates) SELECT '粗筛候选', COUNT(*) FROM vec_flat WHERE d3 >= 0.5;\n" +
      "INSERT INTO ann_log (stage, candidates)\n" +
      "  SELECT '精算候选', COUNT(*) FROM articles\n" +
      "   WHERE id <> 5 AND id IN (SELECT article_id FROM vec_flat WHERE d3 >= 0.5);\n" +
      "-- 第三层：只对粗筛出来的候选精算\n" +
      "SELECT id, title, ROUND(cos_sim(vec, '0.20,0.25,0.90,0.85'), 4) AS 相似度\n" +
      "FROM articles\n" +
      "WHERE id <> 5 AND id IN (SELECT article_id FROM vec_flat WHERE d3 >= 0.5)\n" +
      "ORDER BY 相似度 DESC\n" +
      "LIMIT 1;",
    check: {
      uses: /vec_flat/,
      verify: [
        { kind: 'rows', sql: "SELECT candidates FROM ann_log WHERE stage = '粗筛候选'", expect: 3 },
        { kind: 'rows', sql: "SELECT candidates FROM ann_log WHERE stage = '精算候选'", expect: 2 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM ann_log WHERE stage = '粗筛候选' AND candidates < (SELECT candidates FROM ann_log WHERE stage = '暴力全扫')", expect: 1 },
        { kind: 'result', expect: [[4, '向量与相似度', 0.997]] }
      ]
    }
  }],

  /* ---------- 6-4 向量数据库 Milvus ---------- */
  '6-4': [{
    id: '6-4-1',
    title: '建一个 collection',
    goal: 'Milvus 里的表叫 collection：一列是主键、一列是向量、剩下的都是标量（元数据）。建一张 col_articles，把 articles 的向量搬进来，按"前 3 篇是 SQL 基础、后 3 篇是 AI 方向"打上 category，再用 json_object 存一份元数据。',
    hint: "CREATE TABLE col_articles (id INTEGER PRIMARY KEY, vector TEXT NOT NULL, category TEXT, meta TEXT);\nINSERT INTO col_articles (id, vector, category, meta) SELECT id, vec, CASE WHEN id <= 3 THEN 'SQL 基础' ELSE 'AI 方向' END, json_object('title', title) FROM articles;",
    solution: "CREATE TABLE col_articles (\n" +
      "  id INTEGER PRIMARY KEY,\n" +
      "  vector TEXT NOT NULL,\n" +
      "  category TEXT,\n" +
      "  meta TEXT\n" +
      ");\n" +
      "INSERT INTO col_articles (id, vector, category, meta)\n" +
      "SELECT id, vec,\n" +
      "       CASE WHEN id <= 3 THEN 'SQL 基础' ELSE 'AI 方向' END,\n" +
      "       json_object('title', title)\n" +
      "FROM articles;\n" +
      "SELECT id, category, json_extract(meta, '$.title') AS 标题\n" +
      "FROM col_articles WHERE id <= 2 ORDER BY id;",
    check: {
      uses: /col_articles/,
      verify: [
        { kind: 'table', name: 'col_articles' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM col_articles', expect: 6 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM col_articles WHERE category = 'AI 方向'", expect: 3 },
        { kind: 'result', expect: [[1, 'SQL 基础', '数据库入门'], [2, 'SQL 基础', '索引原理']] }
      ]
    }
  }, {
    id: '6-4-2',
    title: '带元数据过滤的向量检索',
    goal: '向量库的看家本领是"先按标量过滤，再算向量相似度"。在 AI 方向这个 category 里做检索（排除 5 号文章本身），按相似度取前 2 条，看看是哪两篇。',
    hint: "WHERE category = 'AI 方向' AND id <> 5 ORDER BY cos_sim(vector, '0.20,0.25,0.90,0.85') DESC LIMIT 2;",
    solution: "CREATE TABLE col_articles (\n" +
      "  id INTEGER PRIMARY KEY,\n" +
      "  vector TEXT NOT NULL,\n" +
      "  category TEXT,\n" +
      "  meta TEXT\n" +
      ");\n" +
      "INSERT INTO col_articles (id, vector, category, meta)\n" +
      "SELECT id, vec,\n" +
      "       CASE WHEN id <= 3 THEN 'SQL 基础' ELSE 'AI 方向' END,\n" +
      "       json_object('title', title)\n" +
      "FROM articles;\n" +
      "SELECT id, json_extract(meta, '$.title') AS 标题,\n" +
      "       ROUND(cos_sim(vector, '0.20,0.25,0.90,0.85'), 4) AS 相似度\n" +
      "FROM col_articles\n" +
      "WHERE category = 'AI 方向' AND id <> 5\n" +
      "ORDER BY 相似度 DESC\n" +
      "LIMIT 2;",
    check: {
      uses: [/cos_sim/i, /category/i],
      verify: [
        { kind: 'rows', sql: "SELECT COUNT(*) FROM col_articles WHERE category = 'AI 方向'", expect: 3 },
        { kind: 'result', expect: [[4, '向量与相似度', 0.997], [6, 'AI 的记忆', 0.981]] }
      ]
    }
  }],

  /* ---------- 6-5 RAG ---------- */
  '6-5': [{
    id: '6-5-1',
    title: '先检索：挑出最相关的两段',
    goal: 'RAG 的第一步是"检索"。用户问的是向量检索相关的问题，用 cos_sim 从文章库里挑出最相关的 2 篇，把标题和正文一起捞出来（5 号文章本身不算）。',
    hint: "SELECT id, title, body FROM articles WHERE id <> 5 ORDER BY cos_sim(vec, '0.20,0.25,0.90,0.85') DESC LIMIT 2;",
    solution: "SELECT id, title, body\n" +
      "FROM articles\n" +
      "WHERE id <> 5\n" +
      "ORDER BY cos_sim(vec, '0.20,0.25,0.90,0.85') DESC\n" +
      "LIMIT 2;",
    check: {
      uses: /cos_sim/i,
      verify: {
        kind: 'result',
        expect: [
          [4, '向量与相似度', '把文本变成向量，再算余弦相似度。'],
          [6, 'AI 的记忆', 'Agent 靠长期记忆记住你说过的话。']
        ]
      }
    }
  }, {
    id: '6-5-2',
    title: '拼一段 prompt 交给大模型',
    goal: '检索到的段落要拼进提示词里。先把最相关的 2 篇存成 rag_context，再用字符串拼接 + GROUP_CONCAT 拼出一段完整的 prompt：角色设定 + 参考资料 + 学生的问题。',
    hint: "CREATE TABLE rag_context AS SELECT id, title, body, cos_sim(...) AS sim FROM articles WHERE id <> 5 ORDER BY sim DESC LIMIT 2;\nGROUP_CONCAT('【' || title || '】' || body, ' ' ORDER BY id)",
    solution: "CREATE TABLE rag_context AS\n" +
      "SELECT id, title, body, cos_sim(vec, '0.20,0.25,0.90,0.85') AS sim\n" +
      "FROM articles\n" +
      "WHERE id <> 5\n" +
      "ORDER BY sim DESC\n" +
      "LIMIT 2;\n" +
      "CREATE TABLE rag_prompt (id INTEGER PRIMARY KEY, prompt TEXT);\n" +
      "INSERT INTO rag_prompt (id, prompt)\n" +
      "SELECT 1,\n" +
      "       '你是数塔之家的数据库助教。参考资料：' ||\n" +
      "       (SELECT GROUP_CONCAT('【' || title || '】' || body, ' ' ORDER BY id) FROM rag_context) ||\n" +
      "       ' 学生的问题：什么是向量检索？请用一句话回答。';\n" +
      "SELECT prompt FROM rag_prompt;",
    check: {
      uses: [/rag_prompt/i, /rag_context/i],
      verify: [
        { kind: 'rows', sql: "SELECT COUNT(*) FROM rag_context", expect: 2 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM rag_prompt WHERE instr(prompt, '参考资料') > 0 AND instr(prompt, '学生的问题') > 0", expect: 1 },
        { kind: 'rows', sql: "SELECT COUNT(*) FROM rag_prompt WHERE instr(prompt, '向量与相似度') > 0 AND instr(prompt, 'AI 的记忆') > 0", expect: 1 },
        { kind: 'rows', sql: 'SELECT length(prompt) FROM rag_prompt', expect: 80, op: '>=' }
      ]
    }
  }],

  /* ---------- 6-6 AI Agent 长期记忆 ---------- */
  '6-6': [{
    id: '6-6-1',
    title: '给 Agent 建一本记忆册',
    goal: 'Agent 的长期记忆就是一张表：什么时候记的、这条记忆有多重要、记的内容是什么、属于哪一类。建一张 memories 表，写下 4 条不同类型的记忆。',
    hint: "CREATE TABLE memories (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, importance INTEGER NOT NULL, content TEXT NOT NULL, kind TEXT);\nts 用固定时间字符串，别用随机/当前时间，不然结果不可复现。",
    solution: "CREATE TABLE memories (\n" +
      "  id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
      "  ts TEXT NOT NULL,\n" +
      "  importance INTEGER NOT NULL,\n" +
      "  content TEXT NOT NULL,\n" +
      "  kind TEXT\n" +
      ");\n" +
      "INSERT INTO memories (ts, importance, content, kind) VALUES\n" +
      "  ('2025-01-01 09:00:00', 3, '用户叫小明，12 岁', '事实'),\n" +
      "  ('2025-01-02 10:30:00', 9, '用户说以后都用中文回答', '偏好'),\n" +
      "  ('2025-01-03 20:15:00', 5, '用户正在学数据库索引', '进度'),\n" +
      "  ('2025-01-05 08:00:00', 7, '用户喜欢漫画风格的讲解', '偏好');\n" +
      "SELECT id, ts, importance, content FROM memories ORDER BY id;",
    check: {
      uses: /memories/,
      verify: [
        { kind: 'table', name: 'memories' },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM memories', expect: 4 },
        { kind: 'rows', sql: 'SELECT COUNT(*) FROM memories WHERE importance >= 9', expect: 1 }
      ]
    }
  }, {
    id: '6-6-2',
    title: '取回：最近的 + 最重要的',
    goal: '记忆太多塞不进上下文，得挑着取。用 recall_log 记下两次召回：按时间取最近 2 条（看看他最近在忙什么），再按重要程度取最重要的 1 条（他的长期偏好）。',
    hint: "INSERT INTO recall_log (mode, content) SELECT '最近', content FROM memories ORDER BY ts DESC LIMIT 2;\nINSERT INTO recall_log (mode, content) SELECT '最重要', content FROM memories ORDER BY importance DESC, ts DESC LIMIT 1;",
    solution: "CREATE TABLE memories (\n" +
      "  id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
      "  ts TEXT NOT NULL,\n" +
      "  importance INTEGER NOT NULL,\n" +
      "  content TEXT NOT NULL,\n" +
      "  kind TEXT\n" +
      ");\n" +
      "INSERT INTO memories (ts, importance, content, kind) VALUES\n" +
      "  ('2025-01-01 09:00:00', 3, '用户叫小明，12 岁', '事实'),\n" +
      "  ('2025-01-02 10:30:00', 9, '用户说以后都用中文回答', '偏好'),\n" +
      "  ('2025-01-03 20:15:00', 5, '用户正在学数据库索引', '进度'),\n" +
      "  ('2025-01-05 08:00:00', 7, '用户喜欢漫画风格的讲解', '偏好');\n" +
      "CREATE TABLE recall_log (seq INTEGER PRIMARY KEY AUTOINCREMENT, mode TEXT, content TEXT);\n" +
      "-- 召回一：最近说过的话\n" +
      "INSERT INTO recall_log (mode, content)\n" +
      "  SELECT '最近', content FROM memories ORDER BY ts DESC LIMIT 2;\n" +
      "-- 召回二：最重要的偏好（重要程度相同再看谁更新）\n" +
      "INSERT INTO recall_log (mode, content)\n" +
      "  SELECT '最重要', content FROM memories ORDER BY importance DESC, ts DESC LIMIT 1;\n" +
      "SELECT mode, content FROM recall_log ORDER BY seq;",
    check: {
      uses: /recall_log/,
      verify: [
        { kind: 'rows', sql: "SELECT COUNT(*) FROM recall_log WHERE mode = '最近'", expect: 2 },
        { kind: 'rows', sql: "SELECT content FROM recall_log WHERE mode = '最重要'", expect: '用户说以后都用中文回答' },
        { kind: 'result', expect: [['最近', '用户喜欢漫画风格的讲解'], ['最近', '用户正在学数据库索引'], ['最重要', '用户说以后都用中文回答']] }
      ]
    }
  }]

};

/* 把第 3~6 章的任务接到总任务库上（1~2 章已经在 dbTasks.kps 里了，直接合并） */
dbTasks.kps = Object.assign(dbTasks.kps, dbTasksAdvanced);
