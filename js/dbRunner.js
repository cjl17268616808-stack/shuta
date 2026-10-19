/* ==========================================================================
   数塔之家 · dbRunner.js —— 真正干活的那一层（浏览器和自测脚本共用）
   --------------------------------------------------------------------------
   把"执行 SQL / 校验任务"的逻辑单独放这里，好处是：
     数塔之家页面里跑的校验，和开发时用 node 跑的自测脚本是同一份代码，
     不会出现"页面上说过了、脚本说没过"的情况。
   ========================================================================== */
const dbRunner = {

  /** 造一座全新的"数塔学校"数据库（内存库，用 SQL 构造函数传入，方便 node 里复用） */
  createDb(SQL, tasks) {
    const db = new SQL.Database();
    db.run('PRAGMA foreign_keys = ON');
    (tasks.schema || []).forEach(function (s) { db.run(s); });
    (tasks.seed || []).forEach(function (s) { db.run(s); });
    for (const name in (tasks.sqlFunctions || {})) {
      try { db.create_function(name, tasks.sqlFunctions[name]); } catch (e) { console.warn('[db] 注册函数失败：' + name, e); }
    }
    return db;
  },

  /** 建库（schema + seed），供"重置数据库"用 */
  seed(db, tasks) {
    (tasks.schema || []).forEach(function (s) { db.run(s); });
    (tasks.seed || []).forEach(function (s) { db.run(s); });
  },

  /** 执行一段 SQL（可以包含多条语句），把结果和报错都收好 */
  exec(db, sql) {
    const out = { results: [], error: null, ms: 0 };
    const t0 = Date.now();
    try {
      out.results = db.exec(sql) || [];
    } catch (e) {
      out.error = String((e && e.message) || e).trim();
    }
    out.ms = Date.now() - t0;
    return out;
  },

  /**
   * 把一段 SQL 切成一条条语句。
   * 分号在字符串、引号标识符、注释、以及 TRIGGER 的 BEGIN…END 体里都不算分隔符。
   */
  splitStatements(sql) {
    const text = String(sql == null ? '' : sql);
    const out = [];
    let cur = '';
    let i = 0;
    const n = text.length;
    let inSingle = false, inDouble = false, inBacktick = false, inBracket = false, inLine = false, inBlock = false;
    let trigger = false;
    const flush = function () { if (cur.trim()) out.push(cur.trim()); cur = ''; };
    while (i < n) {
      const ch = text[i], nx = text[i + 1];
      if (inLine) { cur += ch; if (ch === '\n') inLine = false; i++; continue; }
      if (inBlock) { cur += ch; if (ch === '*' && nx === '/') { cur += nx; i += 2; inBlock = false; continue; } i++; continue; }
      if (inSingle) { cur += ch; if (ch === "'") { if (nx === "'") { cur += nx; i += 2; continue; } inSingle = false; } i++; continue; }
      if (inDouble) { cur += ch; if (ch === '"') { if (nx === '"') { cur += nx; i += 2; continue; } inDouble = false; } i++; continue; }
      if (inBacktick) { cur += ch; if (ch === '`') inBacktick = false; i++; continue; }
      if (inBracket) { cur += ch; if (ch === ']') inBracket = false; i++; continue; }
      if (ch === '-' && nx === '-') { inLine = true; cur += ch; i++; continue; }
      if (ch === '/' && nx === '*') { inBlock = true; cur += ch; i++; continue; }
      if (ch === "'") { inSingle = true; cur += ch; i++; continue; }
      if (ch === '"') { inDouble = true; cur += ch; i++; continue; }
      if (ch === '`') { inBacktick = true; cur += ch; i++; continue; }
      if (ch === '[') { inBracket = true; cur += ch; i++; continue; }
      if (ch === ';') {
        if (trigger && !/\bEND\s*$/i.test(cur)) { cur += ch; i++; continue; }   // TRIGGER 体内的分号不切
        flush(); trigger = false; i++; continue;
      }
      cur += ch;
      if (cur.length < 90 && /\bCREATE\s+(TEMP\s+|TEMPORARY\s+)?TRIGGER\b/i.test(cur)) trigger = true;
      i++;
    }
    flush();
    return out;
  },

  /**
   * 逐条执行。好处：每条语句单独进历史，谁成功、谁报错一目了然，
   * 任务校验就能要求"必须有一条真正跑成功的语句"，而不是"你敲过这几个字"。
   * 遇到第一条报错就停（和 DBeaver 等客户端的默认行为一致）。
   */
  execAll(db, sql) {
    const stmts = dbRunner.splitStatements(sql);
    const out = { results: [], error: null, failedSql: '', ms: 0, statements: [] };
    const t0 = Date.now();
    for (let k = 0; k < stmts.length; k++) {
      const one = stmts[k];
      const r = dbRunner.exec(db, one);
      out.statements.push({ sql: one, error: r.error });
      if (r.error) { out.error = r.error; out.failedSql = one; break; }
      if (r.results.length) out.results = out.results.concat(r.results);
    }
    out.ms = Date.now() - t0;
    return out;
  },

  /** 取第一行第一列（校验用的内部查询） */
  scalar(db, sql) {
    try {
      const r = db.exec(sql);
      if (!r || !r.length || !r[0].values.length) return undefined;
      return r[0].values[0][0];
    } catch (e) { return undefined; }
  },

  /* ====================== 结果比较 ====================== */
  num(v) { return typeof v === 'number' ? Math.round(v * 1e9) / 1e9 : v; },

  valueEq(a, b) {
    if (a === b) return true;
    if (a == null && b == null) return true;
    if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-9;
    if (typeof a === 'number' || typeof b === 'number') return String(a) === String(b);
    return JSON.stringify(a) === JSON.stringify(b);
  },

  rowEq(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!dbRunner.valueEq(a[i], b[i])) return false;
    return true;
  },

  /** 结果集比较：默认不要求顺序（多重集），ordered = true 时严格按顺序 */
  setEq(got, expect, ordered) {
    const g = (got || []).map(function (r) { return r.map(dbRunner.num); });
    const e = (expect || []).map(function (r) { return r.map(dbRunner.num); });
    if (g.length !== e.length) return false;
    const key = function (r) { return JSON.stringify(r); };
    if (ordered) return g.every(function (r, i) { return key(r) === key(e[i]); });
    const a = g.map(key).sort(), b = e.map(key).sort();
    return a.every(function (x, i) { return x === b[i]; });
  },

  cmp(v, op, expect) {
    const a = dbRunner.num(v), b = dbRunner.num(expect);
    switch (op || '==') {
      case '>=': return a >= b;
      case '<=': return a <= b;
      case '>': return a > b;
      case '<': return a < b;
      case '!=': return a !== b;
      default: return dbRunner.valueEq(a, b);
    }
  },

  /** 把 sqlite_master / PRAGMA 的结果转成好看的一行行 */
  rows(db, sql) {
    try {
      const r = db.exec(sql);
      return r && r.length ? r[0].values : [];
    } catch (e) { return []; }
  },

  /* ====================== 单项校验 ====================== */
  /**
   * 失败时把内部校验 SQL 翻译成"人话"，并给一句"正确的该怎么写"。
   * 只讲写法和思路，绝不往控制台里替用户写语句、更不代跑。
   */
  humanize(v, got) {
    const opTxt = { '==': '正好是 ', '>=': '至少 ', '<=': '最多 ', '>': '大于 ', '<': '小于 ', '!=': '不等于 ' };
    const op = opTxt[v.op || '=='] || '正好是 ';
    const sql = String(v.sql || '').trim().replace(/\s+/g, ' ');
    const mCnt = /^select count\(\*\) from ["'\x60\[]?(\w+)/i.exec(sql);
    const mOne = /^select ([\w.]+) from ["'\x60\[]?(\w+)["'\x60\]]?(?: where ([\s\S]+?))?$/i.exec(sql);
    if (v.kind === 'rows' && mCnt) {
      const t = mCnt[1];
      return {
        msg: '「' + t + '」表现在有 ' + got + ' 条记录，这张卡要求 ' + op + v.expect + ' 条。',
        fix: '往表里加记录用：\nINSERT INTO ' + t + ' (列1, 列2) VALUES (值1, 值2);\n（一条语句可以插多行，用逗号隔开；要删记录用 DELETE FROM ' + t + ' WHERE 条件;）'
      };
    }
    if (v.kind === 'rows' && mOne) {
      const where = mOne[3] ? '（' + mOne[3] + '）' : '';
      return {
        msg: '「' + mOne[2] + '」表里' + where + '的 ' + mOne[1] + ' 现在是 ' + got + '，要求 ' + op + v.expect + '。',
        fix: '改数值用：\nUPDATE ' + mOne[2] + ' SET ' + mOne[1] + ' = 新值 WHERE ' + (mOne[3] || '条件') + ';'
      };
    }
    switch (v.kind) {
      case 'table': return { msg: '数据库里还没有「' + v.name + '」这张表。', fix: '建表：\nCREATE TABLE ' + v.name + ' (\n  列名 类型 约束,\n  …\n);\n主键写 PRIMARY KEY，必填写 NOT NULL，默认值写 DEFAULT 值' };
      case 'view': return { msg: '还没有「' + v.name + '」这个视图。', fix: '建视图：\nCREATE VIEW ' + v.name + ' AS\nSELECT 列… FROM 表… WHERE 条件;' };
      case 'index': return { msg: '还没有「' + v.name + '」这个索引。', fix: '建索引：\nCREATE INDEX ' + v.name + ' ON 表名(列名);' };
      case 'column': return { msg: v.table + ' 表里没有 ' + v.column + ' 这一列。', fix: '加列用：\nALTER TABLE ' + v.table + ' ADD COLUMN ' + v.column + ' 类型;' };
      case 'resultRows': return { msg: '你这次查询返回了 ' + got + ' 行，要求 ' + op + v.expect + ' 行。', fix: '行数不对先看 WHERE 条件（宽了还是窄了），再想要不要 LIMIT、要不要 ORDER BY' };
      case 'result': return { msg: '你这次查询的结果和库里的真实数据对不上（你查出 ' + got + ' 行）。', fix: '对着表核三件事：SELECT 的列对不对、WHERE 条件对不对、结果要不要 ORDER BY' };
      case 'equals': return { msg: '这次查询的结果和期望不一致。', fix: '检查 SELECT 的列、WHERE 条件，以及是不是多查/少查了行' };
      case 'exists': return { msg: '这条查询什么都没查到。', fix: '核对表名、列名和 WHERE 条件；字符串值要加单引号，空值判断要用 IS NULL' };
      case 'explain': return { msg: '执行计划里没走索引，还是在全表扫描。', fix: '先确认索引建了；再检查条件有没有让索引失效：列上套函数、前导 %、跳过最左列、两边类型不一致' };
      case 'fails': return { msg: '这条语句本该被数据库拦住，但它执行成功了 —— 说明约束没生效。', fix: '约束是建表时写的：NOT NULL / UNIQUE / CHECK(条件) / REFERENCES 父表(列)' };
      case 'userError': return { msg: '还没看到数据库报这个错。', fix: '故意撞一次约束：插一条违反约束的数据（重复主键、引用不存在的父记录、违反 CHECK），让数据库把错误抛出来' };
      default: return { msg: '这一项还没达成。', fix: '' };
    }
  },

  failHuman(v, got) {
    const h = dbRunner.humanize(v, got);
    return { ok: false, msg: h.msg, fix: h.fix || '' };
  },

  runVerify(ctx, v) {
    const db = ctx.db;
    const pass = function (msg) { return { ok: true, msg: msg || '' }; };

    switch (v.kind) {
      case 'rows': {
        const got = dbRunner.scalar(db, v.sql);
        if (got === undefined) return { ok: false, msg: '这条校验查询没有结果：' + v.sql, fix: '' };
        return dbRunner.cmp(got, v.op, v.expect) ? pass() : dbRunner.failHuman(v, got);
      }
      case 'exists': {
        const r = dbRunner.rows(db, v.sql);
        return r.length ? pass() : dbRunner.failHuman(v, 0);
      }
      case 'equals': {
        const r = dbRunner.rows(db, v.sql);
        return dbRunner.setEq(r, v.expect, v.ordered) ? pass() : dbRunner.failHuman(v, r.length);
      }
      case 'result': {
        if (!ctx.lastResult) return { ok: false, msg: '还没有成功的查询结果 —— 先在控制台跑一条 SELECT，再回来检查。', fix: '例：SELECT * FROM 表名 LIMIT 20;' };
        if (!dbRunner.setEq(ctx.lastResult.values, v.expect, v.ordered)) return dbRunner.failHuman(v, ctx.lastResult.values.length);
        return pass();
      }
      case 'resultRows': {
        if (!ctx.lastResult) return { ok: false, msg: '还没有成功的查询结果 —— 先在控制台跑一条 SELECT，再回来检查。', fix: '例：SELECT * FROM 表名 LIMIT 20;' };
        const n = ctx.lastResult.values.length;
        return dbRunner.cmp(n, v.op, v.expect) ? pass() : dbRunner.failHuman(v, n);
      }
      case 'table':
      case 'view': {
        const type = v.kind;
        const r = dbRunner.rows(db, "SELECT name FROM sqlite_master WHERE type='" + type + "' AND name='" + v.name + "'");
        return r.length ? pass() : dbRunner.failHuman(v, 0);
      }
      case 'index': {
        const r = dbRunner.rows(db, "SELECT name FROM sqlite_master WHERE type='index' AND name='" + v.name + "'");
        return r.length ? pass() : dbRunner.failHuman(v, 0);
      }
      case 'column': {
        const r = dbRunner.rows(db, 'PRAGMA table_info(' + v.table + ')');
        const found = r.some(function (row) { return row[1] === v.column; });
        return found ? pass() : dbRunner.failHuman(v, 0);
      }
      case 'explain': {
        const r = dbRunner.rows(db, 'EXPLAIN QUERY PLAN ' + v.sql);
        const text = r.map(function (row) { return row.join(' '); }).join('\n');
        return v.expect.test(text) ? pass() : dbRunner.failHuman(v, text);
      }
      case 'fails': {
        const r = dbRunner.exec(db, v.sql);
        if (!r.error) return dbRunner.failHuman(v, 0);
        if (v.err && !v.err.test(r.error)) return { ok: false, msg: '报错内容不是期待的那种：' + r.error, fix: '' };
        return pass();
      }
      case 'userError': {
        const hit = (ctx.history || []).some(function (h) {
          return h.error && (!v.sql || v.sql.test(h.sql)) && (!v.err || v.err.test(h.error));
        });
        return hit ? pass() : dbRunner.failHuman(v, 0);
      }
      case 'fn': {
        const fn = (ctx.api && ctx.api.checks || {})[v.name];
        if (!fn) return { ok: false, msg: '找不到自定义校验函数：' + v.name, fix: '' };
        const r = fn(ctx, v.args) || {};
        return r.ok ? pass(r.msg) : { ok: false, msg: r.msg || '自定义校验没通过', fix: r.fix || '' };
      }
      default:
        return { ok: false, msg: '未知的校验类型：' + v.kind, fix: '' };
    }
  },


  /* ====================== 整张任务卡校验 ====================== */
  runCheck(ctx, check) {
    if (!check) return { ok: true, msg: '' };
    const usesList = [].concat(check.uses || []);
    const hist = ctx.history || [];
    for (let i = 0; i < usesList.length; i++) {
      const re = usesList[i];
      // 必须有一条**执行成功**的语句匹配。只敲过、但被数据库拒绝的，不算完成。
      if (hist.some(function (h) { return !h.error && re.test(h.sql); })) continue;
      const tried = hist.filter(function (h) { return re.test(h.sql); });
      const hint = (ctx.task && ctx.task.hint) ? ctx.task.hint : '';
      if (tried.length) {
        const lastErr = tried[tried.length - 1].error || '';
        return {
          ok: false,
          msg: '这条语句被数据库拒绝了，不算完成：' + lastErr,
          fix: hint,
          rejected: true,
          err: lastErr
        };
      }
      return {
        ok: false,
        msg: '这一步还没做成 —— 控制台里没有一条执行成功的语句做到这件事。',
        fix: hint
      };
    }
    const list = [].concat(check.verify || []);
    for (let i = 0; i < list.length; i++) {
      const r = dbRunner.runVerify(ctx, list[i]);
      if (!r.ok) return r;
    }
    return { ok: true, msg: '' };
  }
};
