
const fs=require('fs');
const raw = fs.readFileSync('E:/XM/shuta/css/style.css','utf8').split('\n');
// 逐行做"去注释"并保持行号：先整体去注释再按行，会丢行号；
// 改为：逐行处理，跟踪是否在块注释内
let inComment=false, depth=0;
for(let i=0;i<raw.length;i++){
  let line = raw[i];
  // 处理块注释
  let out='';
  for(let j=0;j<line.length;j++){
    if(!inComment && line[j]==='/' && line[j+1]==='*'){ inComment=true; j++; continue; }
    if(inComment && line[j]==='*' && line[j+1]==='/'){ inComment=false; j++; continue; }
    if(!inComment) out+=line[j];
  }
  for(const ch of out){
    if(ch==='{')depth++;
    else if(ch==='}'){ depth--; if(depth<0){ console.log('❌ 多余右括号 → 原始第 ' + (i+1) + ' 行: ' + raw[i].trim()); depth=0; } }
  }
}
console.log('最终 depth:', depth);
console.log('总行数:', raw.length);
