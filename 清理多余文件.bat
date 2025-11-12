@echo off
chcp 65001 >nul
cls
echo.
echo ================================================
echo    清理多余文件
echo ================================================
echo.
echo 准备删除以下文件：
echo.
echo  ❌ icon-1.png
echo  ❌ ht-cursor-rules-1.0.0.vsix
echo  ❌ ht-cursor-rules-1.0.1.vsix
echo  ❌ 立即打包-v1.0.2.bat
echo.
echo 保留以下文件：
echo.
echo  ✅ icon.png
echo  ✅ ht-cursor-rules-1.0.2.vsix
echo.
echo ================================================
echo.
pause

echo.
echo 开始清理...
echo.

if exist "icon-1.png" (
    del /F /Q "icon-1.png"
    if exist "icon-1.png" (
        echo ❌ 删除 icon-1.png 失败
    ) else (
        echo ✅ 删除 icon-1.png 成功
    )
) else (
    echo ℹ️  icon-1.png 不存在
)

if exist "ht-cursor-rules-1.0.0.vsix" (
    del /F /Q "ht-cursor-rules-1.0.0.vsix"
    if exist "ht-cursor-rules-1.0.0.vsix" (
        echo ❌ 删除 ht-cursor-rules-1.0.0.vsix 失败
    ) else (
        echo ✅ 删除 ht-cursor-rules-1.0.0.vsix 成功
    )
) else (
    echo ℹ️  ht-cursor-rules-1.0.0.vsix 不存在
)

if exist "ht-cursor-rules-1.0.1.vsix" (
    del /F /Q "ht-cursor-rules-1.0.1.vsix"
    if exist "ht-cursor-rules-1.0.1.vsix" (
        echo ❌ 删除 ht-cursor-rules-1.0.1.vsix 失败
    ) else (
        echo ✅ 删除 ht-cursor-rules-1.0.1.vsix 成功
    )
) else (
    echo ℹ️  ht-cursor-rules-1.0.1.vsix 不存在
)

if exist "立即打包-v1.0.2.bat" (
    del /F /Q "立即打包-v1.0.2.bat"
    if exist "立即打包-v1.0.2.vsix" (
        echo ❌ 删除 立即打包-v1.0.2.bat 失败
    ) else (
        echo ✅ 删除 立即打包-v1.0.2.bat 成功
    )
) else (
    echo ℹ️  立即打包-v1.0.2.bat 不存在
)

echo.
echo ================================================
echo 清理完成！
echo ================================================
echo.
echo 剩余文件：
dir /B icon*.png 2>nul
dir /B *.vsix 2>nul
dir /B *.bat 2>nul
echo.
pause

rem 自我删除
(goto) 2>nul & del "%~f0"

