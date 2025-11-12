@echo off
chcp 65001 >nul
cls
echo.
echo ================================================
echo    HT Cursor Rules v1.0.2 打包工具
echo ================================================
echo.
echo 本次更新：
echo  ✨ 添加扩展图标
echo  🐛 修复 Vue 3 JSX 语法错误（v-model → vModel）
echo.
echo ================================================
echo.

:MENU
echo 请选择操作：
echo.
echo  [1] 立即打包（推荐）
echo  [2] 先编译，再打包
echo  [3] 仅编译 TypeScript
echo  [4] 查看规则文件列表
echo  [0] 退出
echo.
set /p choice=请输入选项 (0-4): 

if "%choice%"=="1" goto PACKAGE
if "%choice%"=="2" goto COMPILE_AND_PACKAGE
if "%choice%"=="3" goto COMPILE_ONLY
if "%choice%"=="4" goto LIST_FILES
if "%choice%"=="0" goto END
echo 无效的选项，请重新选择！
echo.
goto MENU

:COMPILE_AND_PACKAGE
echo.
echo [1/2] 编译 TypeScript...
echo ================================================
call npm run compile
if %errorlevel% neq 0 (
    echo.
    echo ❌ 编译失败！
    pause
    exit /b %errorlevel%
)
echo ✅ 编译成功
echo.

:PACKAGE
echo [2/2] 打包扩展...
echo ================================================
call npx @vscode/vsce package
if %errorlevel% neq 0 (
    echo.
    echo ❌ 打包失败！
    pause
    exit /b %errorlevel%
)
echo.
echo ================================================
echo ✅ 打包完成！
echo ================================================
echo.
echo 生成的文件：
for %%f in (ht-cursor-rules-1.0.2.vsix) do (
    if exist %%f (
        echo  📦 %%f (%%~zf 字节^)
    )
)
echo.
echo 安装测试命令：
echo   code --install-extension ht-cursor-rules-1.0.2.vsix
echo.
pause
goto END

:COMPILE_ONLY
echo.
echo 编译 TypeScript...
echo ================================================
call npm run compile
if %errorlevel% neq 0 (
    echo.
    echo ❌ 编译失败！
) else (
    echo ✅ 编译成功
)
echo.
pause
goto MENU

:LIST_FILES
echo.
echo 规则文件列表：
echo ================================================
echo Frontend (9个):
dir /B rules\frontend\*.cursorrules 2>nul
echo.
echo Backend (6个):
dir /B rules\backend\*.cursorrules 2>nul
echo.
echo Mobile (5个):
dir /B rules\mobile\*.cursorrules 2>nul
echo.
echo Game Development (4个):
dir /B rules\game-development\*.cursorrules 2>nul
echo.
echo Database (1个):
dir /B rules\database\*.cursorrules 2>nul
echo.
echo Testing (4个):
dir /B rules\testing\*.cursorrules 2>nul
echo.
echo 总计: 29 个规则文件
echo.
pause
goto MENU

:END
echo.
echo 再见！
timeout /t 2 >nul
exit

