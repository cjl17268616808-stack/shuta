/* ==========================================================================
   数塔之家 · dbTasks.js —— 数据库结构 + 第 1~2 章实战任务
   --------------------------------------------------------------------------
   这个模块给"数塔之家"提供三样东西：
     1) SCHEMA/SEED：一座真实的 SQLite 数据库（数塔学校），表结构 + 初始数据
     2) sqlFunctions：注册进 SQLite 的 JS 函数（cos_sim / vec_norm，向量那章要用）
     3) kps：每个知识点对应的"真实数据库操作"任务

   任务对象格式：
     {
       id:       '1-5-1',                        唯一编号
       title:    '把新同学插进名单',               任务标题
       goal:     '往 students 表插入……',           要做什么（给学生看）
       hint:     'INSERT INTO students (...) ...', 提示（可折叠）
       solution: "INSERT INTO students ...;",     标准答案 SQL（"看示范"按钮 + 自动验证用）
       check: {
         uses:   /insert\s+into\s+students/i,     可选：必须执行过匹配的语句（可以是数组）
         verify: { ... } | [ {...}, {...} ]       一项或多项校验，全过才算完成
       }
     }

   校验（verify）支持的类型，见 shutaHome.js 的 runVerify()：
     rows / exists / equals / result / resultRows / table / index / view / column /
     explain / fails / userError / fn
   ========================================================================== */

const dbTasks = {

  /* ====================== 1. 表结构（数塔学校） ====================== */
  schema: [
    "CREATE TABLE classes (id INTEGER PRIMARY KEY, name TEXT NOT NULL, teacher TEXT)",
    "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER, class_id INTEGER REFERENCES classes(id), email TEXT UNIQUE)",
    "CREATE TABLE scores (id INTEGER PRIMARY KEY, student_id INTEGER REFERENCES students(id), subject TEXT NOT NULL, score REAL)",
    "CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT NOT NULL, balance REAL NOT NULL CHECK (balance >= 0))",
    "CREATE TABLE kv_store (k TEXT PRIMARY KEY, v TEXT)",
    "CREATE TABLE articles (id INTEGER PRIMARY KEY, title TEXT NOT NULL, body TEXT, vec TEXT)",
    "CREATE TABLE orders_2024 (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT)",
    "CREATE TABLE orders_2025 (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT)"
  ],

  /* ====================== 2. 初始数据 ====================== */
  seed: [
    "INSERT INTO classes (id, name, teacher) VALUES (1,'一班','塔库'), (2,'二班','小数'), (3,'三班','阿库')",
    "INSERT INTO students (id, name, age, class_id, email) VALUES " +
      "(1,'小明',12,1,'ming@shuta.io'), (2,'小红',12,1,'hong@shuta.io'), (3,'小刚',13,2,'gang@shuta.io'), " +
      "(4,'小美',12,2,NULL), (5,'阿强',14,3,'qiang@shuta.io'), (6,'小雨',13,3,NULL), " +
      "(7,'小雷',12,1,'lei@shuta.io'), (8,'小云',13,2,'yun@shuta.io')",
    "INSERT INTO scores (student_id, subject, score) SELECT id, '数据库', 60 + (id*7)%40 FROM students",
    "INSERT INTO scores (student_id, subject, score) SELECT id, 'SQL',   55 + (id*11)%45 FROM students",
    "INSERT INTO scores (student_id, subject, score) SELECT id, '数学',  50 + (id*13)%50 FROM students",
    "INSERT INTO accounts (id, owner, balance) VALUES (1,'小明',100.0), (2,'小红',50.0)",
    "INSERT INTO kv_store (k, v) VALUES ('user:1:name','塔库'), ('user:1:level','9'), ('counter:visit','1024'), ('cache:home:rows','8')",
    "INSERT INTO articles (id, title, body, vec) VALUES " +
      "(1,'数据库入门','数据库就是有组织地存放数据的地方，像一座塔。','0.90,0.10,0.05,0.20'), " +
      "(2,'索引原理','B+树让查询从全表扫描变成几步跳转。','0.80,0.35,0.10,0.15'), " +
      "(3,'事务与一致性','要么全成功，要么全失败。','0.30,0.85,0.20,0.10'), " +
      "(4,'向量与相似度','把文本变成向量，再算余弦相似度。','0.15,0.20,0.95,0.80'), " +
      "(5,'RAG 检索增强','先用向量检索相关文档，再交给大模型。','0.20,0.25,0.90,0.85'), " +
      "(6,'AI 的记忆','Agent 靠长期记忆记住你说过的话。','0.10,0.30,0.70,0.95')",
    "INSERT INTO orders_2024 (id, user_id, amount, created_at) VALUES (1,1,199.0,'2024-03-11'), (2,2,59.5,'2024-07-02'), (3,1,20.0,'2024-12-30')",
    "INSERT INTO orders_2025 (id, user_id, amount, created_at) VALUES (1,3,88.0,'2025-01-05'), (2,1,320.0,'2025-02-14'), (3,4,15.5,'2025-06-01')"
  ],

  /* ====================== 3. 注册给 SQLite 的 JS 函数 ======================
     sql.js 允许把 JS 函数注册进 SQLite，向量那章就靠这两个函数用 SQL 算相似度。
     ====================================================================== */
  sqlFunctions: {
    cos_sim: function (a, b) {
      const va = String(a == null ? '' : a).split(',').map(Number);
      const vb = String(b == null ? '' : b).split(',').map(Number);
      const n = Math.min(va.length, vb.length);
      let dot = 0, na = 0, nb = 0;
      for (let i = 0; i < n; i++) { dot += va[i] * vb[i]; na += va[i] * va[i]; nb += vb[i] * vb[i]; }
      if (!na || !nb) return 0;
      return dot / (Math.sqrt(na) * Math.sqrt(nb));
    },
    vec_norm: function (a) {
      const va = String(a == null ? '' : a).split(',').map(Number);
      let s = 0;
      for (let i = 0; i < va.length; i++) s += va[i] * va[i];
      return Math.sqrt(s);
    }
  },

  /* ====================== 4. 自定义校验 ======================
     写死期望值的任务有个坑：同学按自己的顺序做任务，前面的 INSERT / DELETE
     会把数据改掉，期望值就对不上了。所以只读类任务统一用"跟参考 SQL 的结果
     比一比"的方式校验 —— 查的是数据库当下的真实状态。
     ====================================================================== */
  checks: {
    sameAsQuery: function (ctx, args) {
      if (!ctx.lastResult) return { ok: false, msg: '还没有成功的查询结果，先在控制台跑一条 SELECT' };
      const ref = dbRunner.rows(ctx.db, args.sql);
      if (!dbRunner.setEq(ctx.lastResult.values, ref, args.ordered)) {
        return {
          ok: false,
          msg: '查询结果和库里真实的数据对不上（你查出来 ' + ctx.lastResult.values.length + ' 行，库里应该 ' + ref.length + ' 行）'
        };
      }
      return { ok: true, msg: '' };
    }
  },

  /* ====================== 5. 各知识点的实战任务 ====================== */
  kps: {

    /* ---------- 第 1 章：数据库初探 ---------- */
    '1-1': [{
      id: '1-1-1',
      title: '给数塔之家建第一张表',
      goal: '创建一张宠物表 pets（字段：id 主键、name 文本非空、kind 文本），再插入至少 2 条记录。',
      hint: "CREATE TABLE pets (id INTEGER PRIMARY KEY, name TEXT NOT NULL, kind TEXT);\nINSERT INTO pets (name, kind) VALUES ('旺财','狗');",
      solution: "CREATE TABLE pets (id INTEGER PRIMARY KEY, name TEXT NOT NULL, kind TEXT);\nINSERT INTO pets (name, kind) VALUES ('旺财','狗'), ('咪咪','猫');",
      check: {
        verify: [
          { kind: 'table', name: 'pets' },
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM pets', expect: 2, op: '>=' }
        ]
      }
    }],

    '1-2': [{
      id: '1-2-1',
      title: '只看一班的花名册',
      goal: '用一条 SELECT 把一班（class_id = 1）所有同学的姓名和年龄查出来，结果必须真的从表里查（不能自己手写值）。',
      hint: 'WHERE 用来挑"行"：SELECT name, age FROM students WHERE class_id = 1;',
      solution: 'SELECT name, age FROM students WHERE class_id = 1;',
      check: {
        uses: /select[\s\S]+from\s+students/i,
        verify: [
          { kind: 'resultRows', expect: 3, op: '==' },
          { kind: 'fn', name: 'sameAsQuery', args: { sql: 'SELECT name, age FROM students WHERE class_id = 1' } }
        ]
      }
    }, {
      id: '1-2-2',
      title: '给表加一列（列就是属性）',
      goal: '给 students 表加一列 nickname（文本），再用一条查询看看新列确实出现了。',
      hint: 'ALTER TABLE students ADD COLUMN nickname TEXT;',
      solution: 'ALTER TABLE students ADD COLUMN nickname TEXT;\nSELECT name, nickname FROM students LIMIT 3;',
      check: {
        uses: /alter\s+table\s+students\s+add\s+column\s+nickname/i,
        verify: { kind: 'column', table: 'students', column: 'nickname' }
      }
    }],

    '1-3': [{
      id: '1-3-1',
      title: '主键说：不许重复',
      goal: '故意往 students 里插一条 id = 1 的同学，让主键把它拦下来（控制台要出现报错才算过关）。',
      hint: "INSERT INTO students (id, name, age, class_id) VALUES (1, '冒牌小明', 12, 1);",
      solution: "INSERT INTO students (id, name, age, class_id) VALUES (1, '冒牌小明', 12, 1);",
      check: {
        verify: { kind: 'userError', sql: /insert\s+into\s+students/i, err: /(UNIQUE|PRIMARY KEY)/i }
      }
    }, {
      id: '1-3-2',
      title: '外键说：别引用不存在的班级',
      goal: '插入一个 class_id = 99 的同学（这个班根本不存在），让外键约束报错。',
      hint: 'students.class_id 参照 classes.id，SQLite 需要 PRAGMA foreign_keys = ON（数塔之家已经帮你开了）。',
      solution: "INSERT INTO students (name, age, class_id) VALUES ('外星人', 99, 99);",
      check: {
        verify: { kind: 'userError', sql: /insert\s+into\s+students/i, err: /FOREIGN KEY/i }
      }
    }],

    '1-4': [{
      id: '1-4-1',
      title: '按年龄排个队',
      goal: '查出所有同学的姓名和年龄，按年龄从大到小排序。',
      hint: 'ORDER BY age DESC',
      solution: 'SELECT name, age FROM students ORDER BY age DESC;',
      check: {
        uses: /order\s+by\s+age\s+desc/i,
        verify: { kind: 'fn', name: 'sameAsQuery', args: { sql: 'SELECT name, age FROM students ORDER BY age DESC' } }
      }
    }, {
      id: '1-4-2',
      title: '每个班有几个人？',
      goal: '用 GROUP BY 统计每个班的同学人数，输出班级号和人数两列。',
      hint: 'SELECT class_id, COUNT(*) FROM students GROUP BY class_id;',
      solution: 'SELECT class_id, COUNT(*) AS 人数 FROM students GROUP BY class_id;',
      check: {
        uses: /group\s+by/i,
        verify: { kind: 'fn', name: 'sameAsQuery', args: { sql: 'SELECT class_id, COUNT(*) FROM students GROUP BY class_id' } }
      }
    }],

    '1-5': [{
      id: '1-5-1',
      title: 'C：把塔库插进名单',
      goal: '往 students 表插入一条记录：name = 塔库，age = 3，class_id = 1。',
      hint: "INSERT INTO students (name, age, class_id) VALUES ('塔库', 3, 1);",
      solution: "INSERT INTO students (name, age, class_id) VALUES ('塔库', 3, 1);",
      check: {
        uses: /insert\s+into\s+students/i,
        verify: { kind: 'rows', sql: "SELECT COUNT(*) FROM students WHERE name='塔库' AND age=3 AND class_id=1", expect: 1, op: '>=' }
      }
    }, {
      id: '1-5-2',
      title: 'U：给 2 号同学改名',
      goal: '把 id = 2 的同学的名字改成「小红红」。',
      hint: "UPDATE students SET name = '小红红' WHERE id = 2;（别忘了 WHERE！）",
      solution: "UPDATE students SET name = '小红红' WHERE id = 2;",
      check: {
        uses: /update\s+students/i,
        verify: [
          { kind: 'rows', sql: "SELECT COUNT(*) FROM students WHERE id=2 AND name='小红红'", expect: 1 },
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM students', expect: 8, op: '>=' }
        ]
      }
    }, {
      id: '1-5-3',
      title: 'D：转学走的同学（外键要先清干净）',
      goal: '8 号同学转学了。他在 scores 表里还留着成绩记录，直接 DELETE 会被外键拦下来——先把他的成绩删掉，再删人，最后确认成绩表里也没有他的残留。',
      hint: 'DELETE FROM scores WHERE student_id = 8;\nDELETE FROM students WHERE id = 8;',
      solution: 'DELETE FROM scores WHERE student_id = 8;\nDELETE FROM students WHERE id = 8;\nSELECT * FROM students;',
      check: {
        uses: /delete\s+from\s+students/i,
        verify: [
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM students WHERE id=8', expect: 0 },
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM scores WHERE student_id=8', expect: 0 }
        ]
      }
    }, {
      id: '1-5-4',
      title: 'R：最会写 SQL 的三个人',
      goal: '查出 SQL 成绩最高的 3 位同学（姓名 + 分数），从高到低。',
      hint: 'JOIN 把 students 和 scores 连起来，再 ORDER BY ... DESC LIMIT 3。',
      solution: "SELECT s.name, sc.score FROM scores sc JOIN students s ON s.id = sc.student_id WHERE sc.subject='SQL' ORDER BY sc.score DESC LIMIT 3;",
      check: {
        uses: /join/i,
        verify: { kind: 'resultRows', expect: 3, op: '==' }
      }
    }],

    /* ---------- 第 2 章：SQL 与操作 ---------- */
    '2-1': [{
      id: '2-1-1',
      title: '亲手撞一次 CHECK 约束',
      goal: '新建一张 members 表（id 主键、name 非空且唯一、age 必须 >= 3），然后故意插一条 age = 1 的记录让它报错。',
      hint: "CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, age INTEGER CHECK (age >= 3));",
      solution: "CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, age INTEGER CHECK (age >= 3));\nINSERT INTO members (name, age) VALUES ('小机器人', 1);",
      check: {
        verify: [
          { kind: 'table', name: 'members' },
          { kind: 'fails', sql: "INSERT INTO members (name, age) VALUES ('测试', 1)", err: /CHECK constraint/i }
        ]
      }
    }, {
      id: '2-1-2',
      title: 'NOT NULL 也拦人',
      goal: '新建一张 badges 表（id 主键、code 文本 NOT NULL），然后插一条不带 code 的记录，让数据库报 NOT NULL 错误。',
      hint: "CREATE TABLE badges (id INTEGER PRIMARY KEY, code TEXT NOT NULL);\nINSERT INTO badges (id) VALUES (1);",
      solution: "CREATE TABLE badges (id INTEGER PRIMARY KEY, code TEXT NOT NULL);\nINSERT INTO badges (id) VALUES (1);",
      check: {
        verify: { kind: 'userError', sql: /insert\s+into\s+badges/i, err: /NOT NULL/i }
      }
    }],

    '2-2': [{
      id: '2-2-1',
      title: '给 class_id 建个索引',
      goal: '给 students 表的 class_id 建一个名为 idx_students_class 的索引，然后确认按班级查询时真的用上了它。',
      hint: 'CREATE INDEX idx_students_class ON students(class_id);',
      solution: 'CREATE INDEX idx_students_class ON students(class_id);',
      check: {
        verify: [
          { kind: 'index', name: 'idx_students_class' },
          { kind: 'explain', sql: 'SELECT * FROM students WHERE class_id = 2', expect: /idx_students_class/ }
        ]
      }
    }, {
      id: '2-2-2',
      title: '让 EXPLAIN 说真话',
      goal: '用 EXPLAIN QUERY PLAN 看看「按科目查分数」这条查询是怎么执行的（贴到控制台跑一次就行）。',
      hint: "EXPLAIN QUERY PLAN SELECT * FROM scores WHERE subject = 'SQL';",
      solution: "EXPLAIN QUERY PLAN SELECT * FROM scores WHERE subject = 'SQL';",
      check: {
        uses: /explain\s+query\s+plan/i,
        verify: { kind: 'resultRows', expect: 1, op: '>=' }
      }
    }],

    '2-3': [{
      id: '2-3-1',
      title: '转账：要么全成功',
      goal: '在一个事务里从 1 号账户转 30 元给 2 号账户，提交后余额应该是 70 和 80。',
      hint: 'BEGIN; UPDATE ...; UPDATE ...; COMMIT;',
      solution: 'BEGIN;\nUPDATE accounts SET balance = balance - 30 WHERE id = 1;\nUPDATE accounts SET balance = balance + 30 WHERE id = 2;\nCOMMIT;',
      check: {
        uses: [/begin/i, /commit/i],
        verify: [
          { kind: 'rows', sql: 'SELECT balance FROM accounts WHERE id=1', expect: 70 },
          { kind: 'rows', sql: 'SELECT balance FROM accounts WHERE id=2', expect: 80 }
        ]
      }
    }, {
      id: '2-3-2',
      title: '反悔：ROLLBACK 把数据还回来',
      goal: '先把 1 号账户余额改成 0，再用 ROLLBACK 撤销，看看余额是不是回到了事务开始前的样子（总之不能停在 0）。',
      hint: 'BEGIN; UPDATE accounts SET balance = 0 WHERE id = 1; ROLLBACK;',
      solution: 'BEGIN;\nUPDATE accounts SET balance = 0 WHERE id = 1;\nROLLBACK;',
      check: {
        uses: /rollback/i,
        verify: [
          { kind: 'rows', sql: 'SELECT balance FROM accounts WHERE id=1', expect: 0, op: '!=' },
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM accounts', expect: 2 }
        ]
      }
    }],

    '2-4': [{
      id: '2-4-1',
      title: '建一个"成绩单"视图',
      goal: '创建视图 v_scores，把学生姓名、科目、分数拼在一起（JOIN students 和 scores），然后查询它。',
      hint: 'CREATE VIEW v_scores AS SELECT ... FROM students s JOIN scores sc ON sc.student_id = s.id;',
      solution: 'CREATE VIEW v_scores AS SELECT s.name AS 姓名, sc.subject AS 科目, sc.score AS 分数 FROM students s JOIN scores sc ON sc.student_id = s.id;\nSELECT * FROM v_scores LIMIT 5;',
      check: {
        uses: /create\s+view\s+v_scores/i,
        verify: [
          { kind: 'view', name: 'v_scores' },
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM v_scores', expect: 24, op: '>=' }
        ]
      }
    }],

    '2-5': [{
      id: '2-5-1',
      title: '亲眼看看 SQL 注入',
      goal: "模拟「拼接字符串」的写法：把条件写成 title = '' OR '1'='1'，看是不是所有文章都被捞出来了。",
      hint: "SELECT * FROM articles WHERE title = '' OR '1'='1';",
      solution: "SELECT * FROM articles WHERE title = '' OR '1'='1';",
      check: {
        uses: /or\s+'1'\s*=\s*'1'/i,
        verify: [
          { kind: 'resultRows', expect: 6, op: '==' },
          { kind: 'fn', name: 'sameAsQuery', args: { sql: 'SELECT * FROM articles' } }
        ]
      }
    }, {
      id: '2-5-2',
      title: '注入能删库，事务能救命',
      goal: "在事务里执行注入式删除 DELETE FROM articles WHERE id = -1 OR '1'='1'，看到文章被清空后立刻 ROLLBACK，把它们救回来。",
      hint: "BEGIN; DELETE FROM articles WHERE id = -1 OR '1'='1'; SELECT COUNT(*) AS 还剩几篇 FROM articles; ROLLBACK;",
      solution: "BEGIN;\nDELETE FROM articles WHERE id = -1 OR '1'='1';\nSELECT COUNT(*) AS 还剩几篇 FROM articles;\nROLLBACK;",
      check: {
        uses: [/rollback/i, /or\s+'1'\s*=\s*'1'/i],
        verify: [
          { kind: 'rows', sql: 'SELECT COUNT(*) FROM articles', expect: 6, op: '==' },
          { kind: 'resultRows', expect: 1, op: '>=' }
        ]
      }
    }]
  }
};
