/* 把 defs-chN.mjs 里的场景定义渲染成 SVG，做布局校验，并追加进 .workbuddy/scenes-chN.js
   用法：node .workbuddy/compose-scenes.mjs [--dry] */
import fs from 'node:fs';
import { buildAll, appendScenes } from './scene-kit.mjs';
import ch3 from './defs-ch3.mjs';
import ch4 from './defs-ch4.mjs';
import ch5 from './defs-ch5.mjs';

const dry = process.argv.includes('--dry');
const BT = String.fromCharCode(96);
const engine = fs.readFileSync('E:/XM/shuta/js/comicEngine.js', 'utf8');
const RE = new RegExp('^ {8}[\'"]?([A-Za-z_][\\w-]*)[\'"]?:\\s*' + BT + '<svg', 'gm');
const known = new Set([...engine.matchAll(RE)].map(m => m[1]));

const errs = [];
for (const g of [ch3, ch4, ch5]) {
  const { svgs, errs: e } = buildAll(g);
  errs.push(...e);
  const names = Object.keys(svgs);
  const dup = names.filter(n => known.has(n));
  if (dup.length) errs.push('第' + g.chapter + '章 与引擎已有场景重名：' + dup.join('、'));
  console.log('第' + g.chapter + '章：' + names.length + ' 个新场景 → ' + g.file);
  console.log('   ' + names.join('  '));
  if (!e.length && !dry) appendScenes(g.file, svgs);
}
if (errs.length) {
  console.log('');
  console.log('=== 布局问题 ' + errs.length + ' 条 ===');
  errs.forEach(x => console.log(' x ' + x));
  process.exit(1);
}
console.log('');
console.log('✅ 布局校验通过：没有越界、没有文字互相重叠、没有文字溢出盒子' + (dry ? '（--dry 未写文件）' : ''));
