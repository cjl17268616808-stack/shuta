/* scene-kit.mjs —— 把结构化定义拼成 300x350 的漫画 SVG，并在生成时做布局校验
   校验项：文字是否越界、文字之间是否重叠、矩形是否越界、文字是否溢出所在盒子。 */
import fs from 'node:fs';

export const PALETTE = ['#ffd32a', '#ff6b6b', '#00d2d3', '#ff9f43', '#a9ffc4', '#ffe9a8', '#d6f5ff', '#ffd6d6', '#fff', '#e8e8e8'];

const EMOJI_RANGES = [[0x1F000, 0x1FAFF], [0x2600, 0x27BF], [0x2B00, 0x2BFF], [0x1F1E6, 0x1F1FF], [0x2190, 0x21FF], [0x2B50, 0x2B55], [0xFE0F, 0xFE0F], [0x20E3, 0x20E3]];
function isEmoji(c) { return EMOJI_RANGES.some(([a, b]) => c >= a && c <= b); }

export function textWidth(s, fs) {
  let w = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0);
    if (c === 0x200D) continue;
    if (c === 0xFE0F) continue;
    if (c === 0x20E3) { w += fs * 0.95; continue; }
    if (isEmoji(c)) { w += fs * 1.18; continue; }
    if (c > 0x2E80) { w += fs; continue; }
    if (c === 0x20) { w += fs * 0.30; continue; }
    if (c >= 0x2010 && c <= 0x203A) { w += fs * 0.6; continue; }
    w += fs * 0.56;
  }
  return w;
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ---------- 定义用的构造器 ---------- */
export const T = (text) => ({ k: 'title', text });
export const X = (x, y, fs, text, o = {}) => ({ k: 'text', x, y, fs, text, ...o });
export const B = (x, y, w, h, fill, lines) => ({ k: 'box', x, y, w, h, fill, lines });
export const R = (x, y, w, h, fill, o = {}) => ({ k: 'rect', x, y, w, h, fill, ...o });
export const L = (x1, y1, x2, y2, o = {}) => ({ k: 'line', x1, y1, x2, y2, ...o });

/* ---------- 渲染 + 校验 ---------- */
export function renderScene(name, parts) {
  const errs = [];
  const bad = (m) => errs.push(name + '：' + m);
  const lines = ['<svg viewBox="0 0 300 350">'];
  const texts = [];   // {x0,y0,x1,y1,desc}

  const pushText = (x, y, fs, text, o) => {
    const w = textWidth(text, fs);
    const a = o.a || 'start';
    const x0 = a === 'middle' ? x - w / 2 : (a === 'end' ? x - w : x);
    const x1 = x0 + w;
    const y0 = y - fs * 0.82, y1 = y + fs * 0.30;
    if (x0 < 4) bad('文字越左边界 x0=' + x0.toFixed(1) + ' 「' + text + '」');
    if (x1 > 296) bad('文字越右边界 x1=' + x1.toFixed(1) + ' 「' + text + '」');
    if (y0 < 4) bad('文字越上边界 y0=' + y0.toFixed(1) + ' 「' + text + '」');
    if (y1 > 347) bad('文字越下边界 y1=' + y1.toFixed(1) + ' 「' + text + '」');
    texts.push({ x0, y0, x1, y1, desc: text });
    const anchor = a === 'middle' ? ' text-anchor="middle"' : (a === 'end' ? ' text-anchor="end"' : '');
    const fill = o.fill ? ' fill="' + o.fill + '"' : '';
    const weight = o.w === false ? '' : ' font-weight="bold"';
    const extra = o.extra ? ' ' + o.extra : '';
    lines.push('    <text x="' + x + '" y="' + y + '"' + anchor + ' font-size="' + fs + '"' + weight + fill + extra + '>' + esc(text) + '</text>');
    return { x0, x1 };
  };

  for (const p of parts) {
    if (p.k === 'title') {
      pushText(150, 30, 15.5, p.text, { a: 'middle' });
    } else if (p.k === 'text') {
      const o = { ...p };
      delete o.k; delete o.x; delete o.y; delete o.fs; delete o.text;
      pushText(p.x, p.y, p.fs, p.text, o);
    } else if (p.k === 'rect') {
      if (p.x < 0 || p.y < 0 || p.x + p.w > 300 || p.y + p.h > 350) bad('矩形越界 ' + JSON.stringify([p.x, p.y, p.w, p.h]));
      if (!PALETTE.includes(p.fill)) bad('填充色不在palette：' + p.fill);
      lines.push('    <rect x="' + p.x + '" y="' + p.y + '" width="' + p.w + '" height="' + p.h + '" rx="' + (p.rx === undefined ? 8 : p.rx) + '" fill="' + p.fill + '" stroke="#1a1a1a" stroke-width="' + (p.sw || 4) + '"/>');
    } else if (p.k === 'line') {
      const dash = p.dash ? ' stroke-dasharray="' + p.dash + '"' : '';
      lines.push('    <line x1="' + p.x1 + '" y1="' + p.y1 + '" x2="' + p.x2 + '" y2="' + p.y2 + '" stroke="' + (p.stroke || '#1a1a1a') + '" stroke-width="' + (p.sw || 3.5) + '"' + dash + '/>');
    } else if (p.k === 'box') {
      const { x, y, w, h, fill } = p;
      if (x < 0 || y < 0 || x + w > 300 || y + h > 350) bad('盒子越界 ' + JSON.stringify([x, y, w, h]));
      if (!PALETTE.includes(fill)) bad('填充色不在palette：' + fill);
      lines.push('    <rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + fill + '" stroke="#1a1a1a" stroke-width="4"/>');
      const ls = p.lines || [];
      const n = ls.length;
      if (!n) { bad('空盒子'); continue; }
      let spacing = 0;
      if (n > 1) {
        spacing = Math.min(23, (h - 33) / (n - 1));
        if (spacing < 17) bad('盒子太矮放不下 ' + n + ' 行 (h=' + h + ', spacing=' + spacing.toFixed(1) + ')');
      }
      ls.forEach((ln, i) => {
        const fs = ln[1] === undefined ? 11.5 : ln[1];
        const text = ln[0];
        const o = { fill: ln[2] };
        let ly, lx;
        if (ln[3] === 'c') { lx = x + w / 2; o.a = 'middle'; ly = n === 1 ? y + h / 2 + fs * 0.36 : y + 25 + i * spacing; }
        else { lx = x + 14; ly = n === 1 ? y + h / 2 + fs * 0.36 : y + 25 + i * spacing; }
        const bb = pushText(lx, ly, fs, text, o);
        if (bb.x1 > x + w - 5) bad('文字溢出盒子右边「' + text + '」 x1=' + bb.x1.toFixed(1) + ' 盒右=' + (x + w - 5));
        if (ly + fs * 0.30 > y + h - 3) bad('文字溢出盒子底边「' + text + '」 y=' + ly + ' 盒底=' + (y + h));
        if (ly - fs * 0.82 < y + 2) bad('文字溢出盒子顶边「' + text + '」 y=' + ly + ' 盒顶=' + y);
      });
    }
  }
  // 文字互相重叠
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i], b = texts[j];
      const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
      const oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      if (ox > 3 && oy > 3.5) bad('文字重叠「' + a.desc + '」×「' + b.desc + '」 ox=' + ox.toFixed(1) + ' oy=' + oy.toFixed(1));
    }
  }
  lines.push('</svg>');
  return { svg: lines.join('\n'), errs };
}

export function buildAll(defs) {
  const out = {};
  const errs = [];
  for (const [name, parts] of defs.scenes) {
    if (out[name]) { errs.push('重名场景 ' + name); continue; }
    const r = renderScene(name, parts);
    errs.push(...r.errs);
    out[name] = r.svg;
  }
  return { svgs: out, errs };
}

const START = '        // >>> auto-composed START >>>';
const END = '        // >>> auto-composed END >>>';

export function appendScenes(relFile, svgs) {
  const path = 'E:/XM/shuta/' + relFile;
  let src = '';
  try { src = fs.readFileSync(path, 'utf8'); } catch (e) { src = ''; }
  const s = src.indexOf(START), e = src.indexOf(END);
  if (s >= 0 && e > s) src = (src.slice(0, s) + src.slice(e + END.length)).replace(/^\r?\n/, '');
  // 文件若是 `const X = { ... };` 结构，就把内容插到收尾的 } 之前
  let head, tail = '';
  const close = src.lastIndexOf('}');
  if (close >= 0 && /^\s*;?\s*$/.test(src.slice(close + 1))) {
    head = src.slice(0, close).replace(/\s*$/, '\n');
    tail = (src.slice(close).replace(/^\s*/, '') || '};') + '\n';
  } else {
    head = src.replace(/\s*$/, '\n');
  }
  const body = Object.entries(svgs).map(([name, svg]) =>
    "        '" + name + "': " + String.fromCharCode(96) + svg + String.fromCharCode(96) + ',').join('\n');
  const chunk = START + '\n' + body + '\n' + END + '\n';
  fs.writeFileSync(path, head + chunk + tail, 'utf8');
  return Object.keys(svgs).length;
}
