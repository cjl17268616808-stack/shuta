/* 插画覆盖审计：每个分镜是否都有 scene、同一个知识点里同一张图重复几次
   用法： node .workbuddy/audit-scenes.mjs   （先跑 build_data.py） */
import fs from 'node:fs';
import vm from 'node:vm';

const ROOT = 'E:/XM/shuta';
const BT = String.fromCharCode(96);
const sandbox = { window: {}, console: { log() {}, warn() {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);
const data = vm.runInContext(fs.readFileSync(ROOT + '/js/data.js', 'utf8') + '\n;textbookData', sandbox, { filename: 'data.js' });

const engine = fs.readFileSync(ROOT + '/js/comicEngine.js', 'utf8');
const RE_SCENE = new RegExp('^ {8}[\'"]?([A-Za-z_][\\w-]*)[\'"]?:\\s*' + BT + '<svg', 'gm');
const scenes = new Set([...engine.matchAll(RE_SCENE)].map(m => m[1]));

const problems = [];
const rows = [];
let totalPanels = 0, withScene = 0, missingScene = 0;

function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }

function walk(chapters) {
  for (const ch of chapters) {
    for (const kp of (ch.knowledgePoints || [])) {
      const panels = kp.panels || [];
      const used = panels.map(p => p.scene).filter(Boolean);
      const counts = {};
      used.forEach(s => { counts[s] = (counts[s] || 0) + 1; });
      const miss = panels.filter(p => !p.scene).length;
      const unknown = [...new Set(used.filter(s => !scenes.has(s)))];
      const worst = Math.max(0, ...Object.values(counts));
      totalPanels += panels.length;
      withScene += used.length;
      missingScene += miss;
      rows.push(pad(kp.id, 5) + ' ' + pad(panels.length + '分镜', 6) + ' 用图' + pad(Object.keys(counts).length, 2) +
        ' 最多重复' + worst + '  ' + panels.map(p => p.scene || '———').join(' '));
      if (miss) problems.push(kp.id + '：有 ' + miss + ' 个分镜没有插画');
      if (worst > 2) problems.push(kp.id + '：同一张插画重复了 ' + worst + ' 次（建议 <=2）');
      if (unknown.length) problems.push(kp.id + '：场景不存在 ' + unknown.join('、'));
      if (Object.keys(counts).length < 2 && panels.length >= 5) problems.push(kp.id + '：' + panels.length + ' 个分镜只用了 1 张插画');
    }
  }
}
walk(data.chapters);
if (data.specialChapter) walk([data.specialChapter]);

console.log(rows.join('\n'));
console.log('');
console.log('引擎里共有场景插画 ' + scenes.size + ' 张');
console.log('分镜总数 ' + totalPanels + '，带插画 ' + withScene + '（' + Math.round(withScene / totalPanels * 100) + '%），缺插画 ' + missingScene);
console.log('');
console.log('=== 问题 ' + problems.length + ' 条 ===');
problems.forEach(p => console.log(' x ' + p));
process.exit(problems.length ? 1 : 0);
