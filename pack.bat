@echo off
chcp 65001 >nul
setlocal
rem  Shuta - one click packer
rem  pack.bat            -> standard offline zip
rem  pack.bat full       -> also include raw AI illustration assets
rem  pack.bat force      -> skip the "content not rebuilt" check
rem  pack.bat MyName     -> custom zip name
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\pack.ps1" %1 %2
echo.
pause
