/* 把 .workbuddy/scenes-chN.js 里的新插画合并进 comicEngine.js 的 comicScenes
   用法： node .workbuddy/merge-scenes.mjs [--dry]   */
import fs from 'node:fs';
import vm from 'node:vm';

const ROOT = 'E:/XM/shuta';
const BT = String.fromCharCode(96);
const RE_SCENE = new RegExp('^ {8}[\'"]?([A-Za-z_][\\w-]*)[\'"]?:\\s*' + BT + '<svg', 'gm');
const dry = process.argv.includes('--dry');
const files = fs.readdirSync(ROOT + '/.workbuddy').filter(f => /^scenes-[\w-]+\.js$/.test(f)).sort();
if (!files.length) { console.log('没有找到 .workbuddy/scenes-ch*.js'); process.exit(0); }

/** 宽容解析：双引号字符串里带了真实换行（非法 JS）也能读出来 */
function parseLoose(code) {
  const out = {};
  const re = /^[ \t]*(['"]?)([A-Za-z_][\w-]*)\1[ \t]*:[ \t]*(["'\`])([\s\S]*?)\3[ \t]*,?[ \t]*$/gm;
  let m;
  while ((m = re.exec(code))) {
    let val = m[4];
    if (m[3] !== '\`') val = val.replace(/\\"/g, '"').replace(/\\'/g, "'");
    if (!val.trim().startsWith('<svg')) continue;
    out[m[2]] = val.trim();
  }
  return Object.keys(out).length ? out : null;
}

function loadFragments(path) {
  const code = fs.readFileSync(path, 'utf8');
  const sandbox = { console };
  vm.createContext(sandbox);
  const varName = (code.match(/(?:const|var|let)\s+([A-Za-z_$][\w$]*)\s*=\s*\{/) || [])[1] || 'NEW_SCENES';
  try {
    const v = vm.runInContext(code + '; (typeof ' + varName + ' !== "undefined") ? ' + varName + ' : undefined', sandbox, { filename: path });
    if (v && typeof v === 'object') return v;
  } catch (e) { /* 落到宽容解析 */ }
  try {
    const v = vm.runInContext('({' + code.replace(/^\s*(export\s+default|module\.exports\s*=)/, '') + '})', sandbox, { filename: path });
    if (v && typeof v === 'object') return v;
  } catch (e) { /* 落到宽容解析 */ }
  const loose = parseLoose(code);
  if (loose) console.log('  (宽容解析 ' + path.split('/').pop() + '：' + Object.keys(loose).length + ' 个场景)');
  else console.log('x ' + path + ' 解析失败');
  return loose;
}

function findObjectEnd(src, openIdx) {
  let depth = 0, inTpl = false, inS = false, inD = false;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (inTpl) { if (c === '\\') { i++; continue; } if (c === BT) inTpl = false; continue; }
    if (inS) { if (c === '\\') { i++; continue; } if (c === "'") inS = false; continue; }
    if (inD) { if (c === '\\') { i++; continue; } if (c === '"') inD = false; continue; }
    if (c === BT) { inTpl = true; continue; }
    if (c === "'") { inS = true; continue; }
    if (c === '"') { inD = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

const enginePath = ROOT + '/js/comicEngine.js';
let engine = fs.readFileSync(enginePath, 'utf8');
const blockStart = engine.indexOf('comicScenes: {');
if (blockStart < 0) { console.log('x 找不到 comicScenes'); process.exit(1); }
const openIdx = engine.indexOf('{', blockStart);
const endIdx = findObjectEnd(engine, openIdx);
if (endIdx < 0) { console.log('x comicScenes 括号没配平'); process.exit(1); }
const existing = new Set([...engine.matchAll(RE_SCENE)].map(m => m[1]));

const lines = [];
let insert = '', added = 0, skipped = 0;
for (const f of files) {
  const frag = loadFragments(ROOT + '/.workbuddy/' + f);
  if (!frag) continue;
  for (const name of Object.keys(frag)) {
    const svg = frag[name];
    if (typeof svg !== 'string' || !svg.trim().startsWith('<svg')) { lines.push('  x ' + name + ' 不是 svg 字符串，跳过'); continue; }
    if (existing.has(name)) { skipped++; continue; }
    existing.add(name);
    const body = svg.trim().replace(/\r/g, '').replace(/\n\s*/g, '\n            ');
    insert += "        '" + name + "': " + BT + body + BT + ",\n";
    lines.push('  + ' + name + '（' + svg.length + ' 字符，来自 ' + f + '）');
    added++;
  }
}
console.log(lines.join('\n') || '（没有新场景）');
console.log('新增 ' + added + ' 个，已存在跳过 ' + skipped + ' 个');
if (dry) { console.log('（--dry，没有写文件）'); process.exit(0); }
if (added) {
  // 注意：endIdx 前面还残留着"闭括号的 4 空格缩进"，直接拼会把首条挤成 12 空格
  const head = engine.slice(0, endIdx).replace(/\s+$/, '\n');
  engine = head + insert + '    ' + engine.slice(endIdx);
  fs.writeFileSync(enginePath, engine, 'utf8');
  const after = new Set([...fs.readFileSync(enginePath, 'utf8').matchAll(RE_SCENE)].map(m => m[1]));
  console.log('已写回 comicEngine.js，现在共 ' + after.size + ' 个场景');
}
