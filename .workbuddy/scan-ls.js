
const fs=require('fs');
const files=['js/bgmEngine.js','js/takuEngine.js','js/comicEngine.js','js/shutaHome.js','js/main.js','js/dbRunner.js'];
let total=0, unguarded=0;
for(const f of files){
  const lines=fs.readFileSync('E:/XM/shuta/'+f,'utf8').split('\n');
  console.log('=== '+f+' ===');
  lines.forEach((ln,i)=>{
    if(!/localStorage\.(getItem|setItem|removeItem|clear)/.test(ln)) return;
    total++;
    // 判断该行是否在 try 保护内：向前看 6 行内是否有 try {，或有 safeStorage
    const ctx = lines.slice(Math.max(0,i-6), i+1).join('\n');
    const guarded = /try\s*\{/.test(ctx) || /safeStorage/.test(ln) || /catch/.test(lines[i]||'');
    // 更可靠：看该行本身是否含 catch/try 内联
    const inlineGuard = /try|catch/.test(ln);
    const safe = guarded || inlineGuard;
    if(!safe){ unguarded++; console.log('  ⚠️ L'+(i+1)+': '+ln.trim().slice(0,100)); }
  });
}
console.log();
console.log('localStorage 调用总数:', total, ' 疑似未保护:', unguarded);
