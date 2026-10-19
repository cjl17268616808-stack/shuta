/* 数塔之家任务库自测：每道任务都要满足
     (1) 什么都没做时 -> 校验不通过（不能白送）
     (2) 跑一遍标准答案 -> 校验通过
   用的是页面里同一份 dbRunner.js，所以这里过了，页面上就是过的。
   （内部工具，验证完可删） */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const ROOT = 'E:/XM/shuta';
const require = createRequire(import.meta.url);
const initSqlJs = require(path.join(ROOT, 'vendor/sqljs/sql-wasm.js'));
const SQL = await initSqlJs({ locateFile: (f) => path.join(ROOT, 'vendor/sqljs', f) });

const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {}, Math, JSON, Object, Array, String, Number };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ['js/dbTasks.js', 'js/dbTasksAdvanced.js', 'js/dbRunner.js']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log('(跳过不存在的文件 ' + f + ')'); continue; }
  vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
const tasks = vm.runInContext('dbTasks', sandbox);
const runner = vm.runInContext('dbRunner', sandbox);

const problems = [];
const results = [];
const seen = new Set();
let taskCount = 0;

for (const kp of Object.keys(tasks.kps)) {
  const list = tasks.kps[kp];
  if (!Array.isArray(list) || !list.length) { problems.push(kp + ' 没有任务'); continue; }
  for (const t of list) {
    taskCount++;
    if (seen.has(t.id)) problems.push('任务编号重复：' + t.id);
    seen.add(t.id);
    for (const field of ['id', 'title', 'goal', 'solution', 'check']) {
      if (!t[field]) problems.push(t.id + ' 缺少字段 ' + field);
    }
    const entry = { id: t.id, kp, title: t.title, base: '', sol: '' };
    try {
      // (1) 空白库：不能已经通过
      let db = runner.createDb(SQL, tasks);
      const api = { checks: tasks.checks || {} };
      let ctx = { db, history: [], lastResult: null, api };
      const base = runner.runCheck(ctx, t.check);
      entry.base = base.ok ? 'PASS(不该通过!)' : 'fail';
      if (base.ok) problems.push(t.id + ' 什么都没做就通过了');

      // (2) 跑标准答案：必须通过（和页面一样逐条执行、逐条记历史）
      db = runner.createDb(SQL, tasks);
      ctx = { db, history: [], lastResult: null, api };
      const r = runner.execAll(db, t.solution);
      (r.statements || []).forEach((st) => ctx.history.push({ sql: st.sql, error: st.error }));
      if (!r.error && r.results.length) {
        const last = r.results[r.results.length - 1];
        ctx.lastResult = { columns: last.columns, values: last.values, sql: t.solution };
      }
      const after = runner.runCheck(ctx, t.check);
      entry.sol = after.ok ? 'pass' : 'FAIL';
      entry.msg = after.msg || '';
      entry.solErr = r.error || '';
      if (!after.ok) problems.push(t.id + ' 标准答案没通过：' + after.msg + (r.error ? ' | SQL报错: ' + r.error : ''));

      // (3) 回归"语句错了却能过"的 bug：模拟上次会话已经把对象建好、
      //     这次会话里历史是空的，用户又跑了一遍同样的脚本 -> 报 already exists。
      //     这种情况下**不能**算通过（以前只看"你敲过这几个字"，会误判通过）。
      const db3 = runner.createDb(SQL, tasks);
      const warm = runner.execAll(db3, t.solution);
      if (!warm.error) {
        const r2 = runner.execAll(db3, t.solution);
        if (r2.error && t.check && t.check.uses) {
          const ctx2 = { db: db3, history: [], lastResult: null, api };
          (r2.statements || []).forEach((st) => ctx2.history.push({ sql: st.sql, error: st.error }));
          const again = runner.runCheck(ctx2, t.check);
          if (again.ok) problems.push(t.id + ' 语句被数据库拒绝却仍然通过：' + r2.error);
        }
      }
    } catch (e) {
      entry.base = entry.base || 'EXC';
      entry.sol = 'EXC';
      problems.push(t.id + ' 抛异常：' + (e && e.message));
    }
    results.push(entry);
  }
}

const kps = Object.keys(tasks.kps);
console.log('知识点覆盖：' + kps.length + ' 个 | 任务总数：' + taskCount);
console.log(results.map((r) => [r.id.padEnd(8), r.base.padEnd(12), r.sol.padEnd(6), r.title].join(' ')).join('\n'));
console.log('\n=== 问题 ' + problems.length + ' 条 ===');
problems.forEach((p) => console.log(' - ' + p));
process.exit(problems.length ? 1 : 0);
