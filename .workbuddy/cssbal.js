const fs=require('fs');
const nc=fs.readFileSync('E:/XM/shuta/css/style.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'');
let d=0; for(const c of nc){ if(c==='{')d++; else if(c==='}')d--; }
console.log('CSS 括号深度:', d, d===0?'✅ 平衡':'❌ 不平衡');