# GitHub 推送指南

## 方法一：命令行推送（推荐）

打开 PowerShell 或 CMD，执行以下命令：

### 1. 初始化Git仓库（如果还没有）
```bash
cd D:\1-GIT\ht-cursor-rules
git init
```

### 2. 添加所有文件
```bash
git add .
```

### 3. 提交代码
```bash
git commit -m "feat: v1.0.0 首次发布 - 24种精选规则"
```

### 4. 重命名分支为 main
```bash
git branch -M main
```

### 5. 添加远程仓库
```bash
git remote add origin https://github.com/snake-mustang/ht-cursor-rules.git
```

如果提示 remote 已存在，先删除再添加：
```bash
git remote remove origin
git remote add origin https://github.com/snake-mustang/ht-cursor-rules.git
```

### 6. 推送到 GitHub
```bash
git push -u origin main
```

⚠️ **注意**：首次推送可能需要输入 GitHub 凭证或配置 SSH key。

---

## 方法二：使用 GitHub Desktop（最简单）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开 GitHub Desktop
3. 点击 `File` → `Add Local Repository`
4. 选择 `D:\1-GIT\ht-cursor-rules` 文件夹
5. 如果提示"This directory does not appear to be a Git repository"，点击 `Create a repository`
6. 在左侧查看所有改动的文件
7. 在 Summary 输入：`feat: v1.0.0 首次发布`
8. 点击 `Commit to main`
9. 点击顶部的 `Publish repository` 按钮
10. 在弹窗中：
    - Name: `ht-cursor-rules`
    - 取消勾选 "Keep this code private"（公开仓库）
    - 点击 `Publish Repository`

---

## 方法三：使用 VS Code 内置Git

1. 在 VS Code 中打开项目
2. 点击左侧的 `Source Control` 图标（或按 `Ctrl+Shift+G`）
3. 点击 `Initialize Repository`（如果还没初始化）
4. 在更改列表中，点击 `+` 号添加所有文件
5. 在消息框输入：`feat: v1.0.0 首次发布`
6. 点击 `✓` 提交
7. 点击 `...` → `Remote` → `Add Remote`
8. 输入远程仓库URL：`https://github.com/snake-mustang/ht-cursor-rules.git`
9. 输入远程名称：`origin`
10. 点击 `...` → `Push` → `Push to...` → 选择 `origin/main`

---

## 验证推送成功

推送成功后，访问：
https://github.com/snake-mustang/ht-cursor-rules

应该能看到所有代码文件。

---

## 常见问题

### Q: 提示"remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/snake-mustang/ht-cursor-rules.git
```

### Q: 提示需要身份验证
**方式1：使用Personal Access Token**
1. 访问 https://github.com/settings/tokens
2. 点击 `Generate new token` → `Generate new token (classic)`
3. 勾选 `repo` 权限
4. 生成token并复制
5. 推送时使用token作为密码

**方式2：使用SSH**
1. 生成SSH key：`ssh-keygen -t ed25519 -C "your_email@example.com"`
2. 添加到GitHub：https://github.com/settings/keys
3. 修改远程URL：
```bash
git remote set-url origin git@github.com:snake-mustang/ht-cursor-rules.git
git push -u origin main
```

### Q: 推送被拒绝（rejected）
```bash
# 强制推送（谨慎使用，会覆盖远程内容）
git push -u origin main --force
```

---

## 后续更新代码

完成首次推送后，以后更新代码只需：

```bash
git add .
git commit -m "更新说明"
git push
```

---

**需要帮助？** 
- 检查网络连接
- 确认GitHub账号权限
- 查看错误信息

祝推送顺利！🚀

