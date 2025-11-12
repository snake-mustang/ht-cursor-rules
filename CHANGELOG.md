# 更新日志

## [1.0.3] - 2025-11-12

### ✨ 功能增强

#### 规则更新
- ✅ **新增 Unity C# 规则**：Unity Tower Defense Game with Nintendo Ringcon 开发规范
- ✅ **新增 PHP 规则**：PHP 8.0+ 开发最佳实践（PSR规范、现代PHP特性、安全实践）
- ✅ **新增 Flutter 规则**：Flutter 3.x + BLoC + Clean Architecture 专家级开发指南
- ➖ **删除 GraphQL Apollo 规则**：简化技术栈选择，移除 Database & API 分类
- 📊 **规则总数更新**：从 26 种增加到 28 种

#### 格式规范
- 📝 **添加 MDC Frontmatter**：为所有 25 个规则文件添加 `.mdc` 格式的 Frontmatter
  - 包含 `description`（规则描述）
  - 包含 `globs`（文件匹配模式）
  - 包含 `alwaysApply`（是否自动应用）
- ✨ **规范化格式**：所有规则文件遵循统一的 MDC 格式标准

#### 分类优化
- 🗄️ **移除 Database & API 类别**：从 7 大类简化为 6 大类
- 📂 **保留核心分类**：
  - 🎨 Frontend Frameworks (9种)
  - 🚀 Backend & Full-Stack (6种)
  - 🎮 Game Development (4种)
  - 📱 Mobile Development (5种)
  - 🧪 Testing Frameworks (4种)
  - 📂 Other

### 📝 技术细节

**Frontmatter 示例**：
```markdown
---
description: "Unity C# 游戏开发规范"
globs:
  - "Assets/**/*.cs"
alwaysApply: false
---
```

**已完成文件**（25/28）：
- ✅ Frontend 规则（9个）
- ✅ Backend 规则（5个）
- ✅ Mobile 规则（4个）
- ✅ Game Development 规则（3个）
- ✅ Testing 规则（4个）

**新增规则**（3个）：
- ✅ Unity C# - Tower Defense with Nintendo Ringcon
- ✅ PHP - Modern PHP 8.0+ Best Practices
- ✅ Flutter - Clean Architecture + BLoC Pattern

---

## [1.0.2] - 2025-11-12

### 🎨 优化

- ✨ **添加扩展图标**：为扩展添加官方图标，提升市场展示效果

### 🐛 Bug 修复

- 🔧 **修复 Vue 3 JSX 语法错误**：将所有 `v-model` 指令更正为 JSX 正确语法 `vModel`
  - 修复了 4 处 `v-model` 错误用法
  - 确保 JSX 代码示例的正确性

---

## [1.0.1] - 2025-11-12

### 🎨 优化

#### README 文档全面优化
- ✨ **标题描述重写**：突出"一键安装，一键配置"核心卖点
- 📦 **权威性增强**：明确规则来源于 GitHub 最高星项目 awesome-cursorrules（⭐35k+）
- 📖 **快速开始简化**：从 50+ 行精简到 7 行，更加简洁明了
- 💡 **使用场景优化**：从 80+ 行精简到 4 行，一目了然
- 📦 **安装说明简化**：从 12 行精简到 4 行
- 🔄 **结构重组**：按用户使用流程优化章节顺序，提升阅读体验

#### Vue 规则优化
- ➕ **新增** Vue 2 + JSX 开发指南（完整的 JSX/TSX 语法支持）
- ➕ **新增** Vue 3 + JSX 开发指南（Composition API + JSX）
- ➖ **移除** Vue 2 + Vuex（简化技术栈选择）
- ➖ **移除** Vue 3 + Pinia（简化技术栈选择）
- 📝 **重命名** Vue + Nuxt.js → Vue 3 + Nuxt.js（明确版本号）

#### 其他优化
- 📄 package.json 描述与 README 保持一致
- 📐 文档可读性和用户体验大幅提升
- ✨ 整体品质优化

---

## [1.0.0] - 2025-11-12

### 🎉 首次发布

#### 核心功能
- ✨ 支持 28 种精选技术栈规则
- 🎯 两级选择系统（类别 → 规则）
- 📁 子文件夹分类管理
- 🔄 智能规则管理（覆盖/合并/取消）
- ⭐ **Vue 生态特别完善**（5种规则，公司主力技术栈）

#### 规则分类

**现已支持 28 种精选规则**，涵盖 6 大核心类别：

- 🎨 **Frontend Frameworks** (9 种)
  - **Vue 生态**（5 种，公司主力 ⭐）
    - Vue 2 Options API（自定义创建，1000+ 行）
    - Vue 2 + JSX（自定义创建）
    - Vue 3 Composition API
    - Vue 3 + JSX（自定义创建）
    - Vue 3 + Nuxt.js
  - **React 生态**（2 种）
    - React + Redux + TypeScript
    - React + Next.js（自定义创建）
  - **其他框架**（2 种）
    - Angular + TypeScript
    - SvelteKit + TypeScript

- 🚀 **Backend & Full-Stack** (6 种)
  - Go Backend Scalability
  - Java SpringBoot + JPA
  - Spring Cloud + Java（自定义创建，2000+ 行）
  - PHP Best Practices
  - Python FastAPI
  - Python Django

- 📱 **Mobile Development** (5 种)
  - React Native Expo
  - SwiftUI Guidelines
  - Objective-C iOS（自定义创建，1500+ 行）
  - Android Jetpack Compose
  - Flutter Expert

- 🧪 **Testing Frameworks** (4 种)
  - Cypress E2E Testing
  - Playwright E2E Testing
  - Jest Unit Testing
  - Vitest Unit Testing

- 🎮 **Game Development** (4 种)
  - Unity (C#) - 完整游戏开发规范
  - Unreal Engine (C++) - UE C++ 开发指南（3000+ 行）
  - Cocos Creator (TypeScript) - Cocos 开发规范（1500+ 行）
  - LayaBox (TypeScript) - LayaBox H5 游戏开发（1200+ 行）

#### 新增规则
- **Vue 3 Composition API**：Vue 3 官方推荐的 Composition API 开发指南

#### 特色功能

- 📦 **子文件夹结构**：规则文件按类别存储，组织清晰
- 🎯 **两级选择**：先选类别，再选规则，使用更便捷
- 🔀 **智能管理**：支持覆盖、合并、取消三种模式
- 📝 **高质量规则**：包含完整代码示例和最佳实践
- 🌟 **自定义规则**：Vue2, React+Next.js, Spring Cloud, Objective-C 等专门定制

#### 规则来源

- ✨ 大部分规则来自 [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) 开源社区
- 🌟 部分规则专门定制，内容详尽（1000-2000+ 行）

#### 技术亮点

- 🏗️ 全新的文件夹结构，便于扩展和维护
- 🎮 完整的游戏开发生态（Unity, Unreal, Cocos, LayaBox）
- 🔧 聚焦主流核心技术栈，提高规则质量
- 📖 完整的文档和使用指南

---

## 未来计划

### [1.1.0] - 计划中
- [ ] 添加更多后端框架规则
- [ ] 添加 AI/ML 开发规则
- [ ] 支持自定义规则模板
- [ ] 规则预览功能

### [1.2.0] - 计划中
- [ ] 规则版本管理
- [ ] 在线规则库
- [ ] 社区分享功能
- [ ] 规则导入导出

### 新增
- 🎉 初始版本发布
- ✨ 支持 9 种预设规则类型
  - Python 开发规则
  - HTML/CSS/JavaScript 规则
  - React 开发规则
  - Vue.js 开发规则
  - iOS 应用开发规则
  - Android 应用开发规则
  - 微信小程序开发规则
  - Chrome 插件开发规则
  - 通用开发规则
- 🚀 实现规则预览功能
- 🔧 支持规则合并和覆盖
- 📝 支持命令面板调用
- 🖱️ 支持右键菜单快捷操作
- 📖 完整的规则文档和示例
- 🎨 友好的用户交互界面

### 特性
- 智能检测已有规则文件
- 灵活的规则管理（覆盖/合并/取消）
- 完善的错误处理
- 详细的成功提示
- 支持多项目独立配置

---

## 未来计划

### [1.2.0] - 计划中
- [ ] 添加更多后端框架规则
  - NestJS
  - FastAPI
  - Django
  - Spring Boot
  - Rust
  - Go
- [ ] 添加测试框架规则（Cypress, Playwright, Jest 等）
- [ ] 支持自定义规则模板
- [ ] 规则预览功能
- [ ] 规则搜索和筛选
- [ ] 多语言支持（中文/英文）

### [1.3.0] - 计划中
- [ ] 规则版本管理
- [ ] 在线规则库
- [ ] 社区分享功能
- [ ] 规则导入导出
- [ ] 规则编辑器

---

## 反馈

如有问题或建议，请访问：[GitHub Issues](https://github.com/your-username/ht-cursor-rules/issues)

