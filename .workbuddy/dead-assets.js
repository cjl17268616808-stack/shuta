
const fs=require('fs'), path=require('path');
const ROOT='E:/XM/shuta';
// 收集所有源码文本
let src='';
(function walk(dir){
  for(const f of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,f.name);
    if(f.isDirectory()){
      if(/node_modules|\.git|\.workbuddy|img-originals|__pycache__/.test(f.name)) continue;
      walk(p);
    } else if(/\.(js|mjs|css|html|json|py|md)$/.test(f.name)){
      try{ src += fs.readFileSync(p,'utf8'); }catch(e){}
    }
  }
})(ROOT);

// 扫描 assets 下所有文件
const assetsDir=path.join(ROOT,'assets');
const files=[];
(function walk(dir){
  for(const f of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,f.name);
    if(f.isDirectory()){
      if(f.name==='img-originals') continue;
      walk(p);
    } else files.push(p);
  }
})(assetsDir);

let total=0, dead=[];
for(const p of files){
  const rel = p.substring(ROOT.length+1).replace(/\\/g,'/');
  const base = path.basename(p);
  total += fs.statSync(p).size;
  // 引用检查：完整相对路径 或 文件名
  const used = src.includes(rel) || src.includes(base);
  if(!used) dead.push([rel, fs.statSync(p).size]);
}
console.log('assets 在用文件合计: ' + (total/1048576).toFixed(2) + ' MB, 共 ' + files.length + ' 个');
console.log();
if(dead.length){
  console.log('❌ 未被任何源码引用的文件 (' + dead.length + ' 个, ' + (dead.reduce((a,b)=>a+b[1],0)/1048576).toFixed(2) + ' MB):');
  dead.sort((a,b)=>b[1]-a[1]).forEach(d=>console.log('   ' + d[0] + '  ' + (d[1]/1024).toFixed(0) + ' KB'));
} else console.log('✅ assets 下无死文件');
