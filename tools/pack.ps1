<#
  数塔 · 一键打包（离线包 / 提交包）
  ---------------------------------------------------------------
  双击 pack.bat 就会跑这个脚本，它做五件事：
    1. 预检：必需文件在不在；内容源码是不是比 js/data.js 新（改了 Python 没重编译就打包 = 包里的内容是旧的）
    2. 给 index.html 里的 js/css 引用刷上缓存版本号 ?v=时间戳
    3. 生成 zip：显式用正斜杠写条目名（Compress-Archive 会写成反斜杠，别人解压会出错，所以不用它）
    4. 自检：反斜杠 0 个、垃圾文件 0 个、关键文件齐全、index.html 在根
    5. 打印体积与用法
#>
param(
  [string]$Mode = '',
  [string]$Name = ''
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Full  = ($Mode -match '^(full|完整)$')
$Force = ($Mode -match '^(force|强制)$')
if ($Mode -and -not $Full -and -not $Force -and -not $Name) { $Name = $Mode }

function Say($text, $color = 'Gray') { Write-Host $text -ForegroundColor $color }
function Ok($text)   { Write-Host ("    OK   " + $text) -ForegroundColor Green }
function Bad($text)  { Write-Host ("    错   " + $text) -ForegroundColor Red }

Write-Host ''
Say '=== 数塔 · 打包 ===' 'Cyan'
Say ("项目目录：" + $Root)
Write-Host ''

# ---------- 1. 预检 ----------
Say '[1/5] 预检' 'Cyan'
$must = @(
  'index.html',
  'js/data.js',
  'js/comicEngine.js',
  'js/shutaHome.js',
  'js/dbTasks.js',
  'js/dbTasksAdvanced.js',
  'js/dbRunner.js',
  'js/bgmEngine.js',
  'css/style.css',
  'css/home.css',
  'data/textbook.json',
  'vendor/sqljs/sql-wasm.js',
  'vendor/sqljs/sql-wasm.wasm',
  'vendor/sqljs/sql-wasm-b64.js',
  'assets/img/hero-main.png',
  'assets/fonts/ZCOOLKuaiLe-Regular.woff2'
)
$missing = @()
foreach ($m in $must) { if (-not (Test-Path (Join-Path $Root $m))) { $missing += $m } }
if ($missing.Count) {
  foreach ($m in $missing) { Bad ("缺文件：" + $m) }
  throw '必需文件不全，先修好再打包。'
}
Ok ("必需文件齐全（" + $must.Count + " 项）")

$dataJs = Get-Item (Join-Path $Root 'js/data.js')
$srcNewer = @(Get-ChildItem (Join-Path $Root 'python_src') -Recurse -File -Include *.py |
             Where-Object { $_.LastWriteTime -gt $dataJs.LastWriteTime })
if ($srcNewer.Count -and -not $Force) {
  Bad ("python_src 里有 " + $srcNewer.Count + " 个文件比 js/data.js 新 —— 内容改了但没重新编译，包里会是旧内容")
  Say  '        先执行：  python python_src/build_data.py' 'Yellow'
  Say  '        确实要用当前 data.js 打包，就运行：  pack.bat force' 'Yellow'
  throw '内容没重编译。'
}
if ($srcNewer.Count) { Say ("    （已按 force 跳过重编译检查，有 " + $srcNewer.Count + " 个源文件更新）") 'Yellow' }
else { Ok '内容源码与 data.js 同步' }

# ---------- 2. 缓存版本号 ----------
Say '[2/5] 刷新缓存版本号' 'Cyan'
$ver = Get-Date -Format 'yyyyMMddHHmm'
$idx = Join-Path $Root 'index.html'
$html = Get-Content $idx -Raw
$html = [regex]::Replace($html, '((?:src|href)="(?:js|css)/[^"?]+)"', { param($m) $m.Groups[1].Value + '?v=' + $ver + '"' })
$html = [regex]::Replace($html, '((?:src|href)="(?:js|css)/[^"?]+)\?v=[^"]*"', { param($m) $m.Groups[1].Value + '?v=' + $ver + '"' })
Set-Content $idx $html -NoNewline -Encoding UTF8
$after = ([regex]::Matches((Get-Content $idx -Raw), '\?v=')).Count
Ok ("index.html 里 " + $after + " 处 js/css 引用已刷成 ?v=" + $ver)

# ---------- 3. 收集文件 ----------
Say '[3/5] 收集文件' 'Cyan'
$tops = @('index.html', 'README.md', 'AI_USAGE.md', 'css', 'js', 'data', 'assets', 'vendor', 'python_src')
if ($Full) { $tops += @('shuta-comic-illustrations_assets', 'shuta-comic-illustrations.miora') }
# 注意：img-originals / 备份 目录里是【未压缩原图】，绝不能进交付包
# （曾经因为它在 assets 下而被整包带走，zip 从 13MB 涨到 25MB）
$skipRegex = '\\(__pycache__|\.idea|\.workbuddy|node_modules|img-originals|备份)\\'
$skipFile  = '\.(pyc|bak|tmp|log|zip)$|^(Thumbs\.db|\.DS_Store)$'

$files = @()
foreach ($t in $tops) {
  $p = Join-Path $Root $t
  if (-not (Test-Path $p)) { continue }
  if ((Get-Item $p).PSIsContainer) {
    $files += Get-ChildItem $p -Recurse -File -Force | Where-Object {
      $_.FullName -notmatch $skipRegex -and $_.Name -notmatch $skipFile
    }
  } else {
    $files += Get-Item $p
  }
}
$files = $files | Sort-Object FullName -Unique
Ok ("共 " + $files.Count + " 个文件，解压后 " + [math]::Round((($files | Measure-Object -Property Length -Sum).Sum / 1MB), 2) + " MB")

# ---------- 4. 生成 zip ----------
Say '[4/5] 生成压缩包' 'Cyan'
if (-not $Name) { $Name = '数塔' + (Get-Date -Format 'yyyyMMdd') }
if ($Name -notmatch '\.zip$') { $Name = $Name + '.zip' }
$Zip = Join-Path $Root $Name
if (Test-Path $Zip) { Remove-Item $Zip -Force }

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$fs  = [System.IO.File]::Open($Zip, [System.IO.FileMode]::Create)
$arc = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($f in $files) {
    $rel = $f.FullName.Substring($Root.Length).TrimStart('\').Replace('\', '/')
    [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($arc, $f.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal)
  }
} finally {
  $arc.Dispose(); $fs.Dispose()
}
Ok ("已生成 " + $Zip)

# ---------- 5. 自检 ----------
Say '[5/5] 自检' 'Cyan'
$z = [System.IO.Compression.ZipFile]::OpenRead($Zip)
$names = @($z.Entries | ForEach-Object { $_.FullName })
$count = $names.Count
$bad   = @($names | Where-Object { $_ -like '*\*' }).Count
$junk  = @($names | Where-Object { $_ -match '(^|/)(\.idea|\.workbuddy|__pycache__)(/|$)|\.pyc$|\.bak$|Thumbs\.db|\.DS_Store' }).Count
$key   = @('index.html','js/data.js','js/comicEngine.js','js/shutaHome.js','js/dbTasksAdvanced.js','css/home.css','data/textbook.json','vendor/sqljs/sql-wasm.wasm','vendor/sqljs/sql-wasm-b64.js','assets/img/hero-main.png')
$lack  = @($key | Where-Object { $names -notcontains $_ })
$rawMB = [math]::Round((($z.Entries | Measure-Object -Property Length -Sum).Sum / 1MB), 2)
$z.Dispose()
$zipMB = [math]::Round(((Get-Item $Zip).Length / 1MB), 2)

$fail = 0
if ($bad -eq 0) { Ok '路径全是正斜杠' } else { Bad ("有 " + $bad + " 条路径是反斜杠"); $fail++ }
if ($junk -eq 0) { Ok '没有垃圾文件（.idea/.workbuddy/__pycache__/*.pyc/*.bak）' } else { Bad ("混进 " + $junk + " 个垃圾文件"); $fail++ }
if ($names -contains 'index.html') { Ok 'index.html 在压缩包根目录' } else { Bad 'index.html 不在根目录'; $fail++ }
if ($lack.Count -eq 0) { Ok ("关键文件齐全（" + $key.Count + " 项）") } else { Bad ("缺关键文件：" + ($lack -join '、')); $fail++ }
if ($count -gt 30) { Ok ("文件数 " + $count) } else { Bad ("文件数偏少：" + $count); $fail++ }

Write-Host ''
Write-Host ("  压缩后 " + $zipMB + " MB    解压后 " + $rawMB + " MB") -ForegroundColor Cyan
if ($Full) { Say '  模式：完整包（含 AI 原始素材 + 画布文件）' }
else { Say '  模式：标准离线包（不含 AI 原始素材；要带就运行 pack.bat full）' }
Write-Host ''
if ($fail -eq 0) {
  Write-Host '  打包完成。这个 zip 解压后双击 index.html 就能离线运行：' -ForegroundColor Green
  Say '    · 教程、插画、语音（浏览器 TTS）、背景音乐（现场合成）都在本地，不联网也能用'
  Say '    · 数塔之家用的是内联 WASM 的 SQLite，双击打开也能跑'
  Say '    · 35 个知识点 / 194 个分镜 / 15 种互动模式（含「AI 日志」章节）'
} else {
  Write-Host ("  有 " + $fail + " 项没过，先别提交。") -ForegroundColor Red
}
Write-Host ''
