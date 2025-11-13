import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * 规则模板类型
 */
interface RuleTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    fileName: string;
}

/**
 * 类别类型
 */
interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    folder: string;
}

/**
 * 所有可用的类别
 */
const CATEGORIES: Category[] = [
    {
        id: 'frontend',
        name: 'Frontend Frameworks & Libraries',
        description: '前端框架和库',
        icon: '🎨',
        folder: 'frontend'
    },
    {
        id: 'backend',
        name: 'Backend & Full-Stack',
        description: '后端和全栈框架',
        icon: '🚀',
        folder: 'backend'
    },
    {
        id: 'mobile',
        name: 'Mobile Development',
        description: '移动开发',
        icon: '📱',
        folder: 'mobile'
    },
    {
        id: 'game-development',
        name: 'Game Development',
        description: '游戏开发',
        icon: '🎮',
        folder: 'game-development'
    },
    {
        id: 'css-styling',
        name: 'CSS & Styling',
        description: 'CSS 和样式',
        icon: '🎨',
        folder: 'css-styling'
    },
    {
        id: 'state-management',
        name: 'State Management',
        description: '状态管理',
        icon: '🔄',
        folder: 'state-management'
    },
    {
        id: 'database-api',
        name: 'Database & API',
        description: '数据库和 API',
        icon: '🗄️',
        folder: 'database-api'
    },
    {
        id: 'testing',
        name: 'Testing Frameworks',
        description: '测试框架',
        icon: '🧪',
        folder: 'testing'
    },
    {
        id: 'hosting',
        name: 'Hosting & Deployments',
        description: '托管和部署',
        icon: '🌐',
        folder: 'hosting'
    },
    {
        id: 'build-tools',
        name: 'Build Tools & Development',
        description: '构建工具和开发',
        icon: '🔧',
        folder: 'build-tools'
    },
    {
        id: 'language-specific',
        name: 'Language-Specific',
        description: '语言特定',
        icon: '💻',
        folder: 'language-specific'
    },
    {
        id: 'other',
        name: 'Other',
        description: '其他',
        icon: '📂',
        folder: 'other'
    }
];

/**
 * 所有可用的规则模板
 */
const RULE_TEMPLATES: RuleTemplate[] = [
    // Frontend Frameworks & Libraries
    { id: 'frontend-general', name: '前端通用规则（推荐）', description: '适用于所有前端项目的通用开发规范和最佳实践', category: 'frontend', fileName: 'frontend-general-best-practices.cursorrules' },
    { id: 'angular-typescript', name: 'Angular + TypeScript', description: 'Angular TypeScript 开发最佳实践', category: 'frontend', fileName: 'angular-typescript.cursorrules' },
    { id: 'astro-typescript', name: 'Astro + TypeScript', description: 'Astro TypeScript 开发最佳实践', category: 'frontend', fileName: 'astro-typescript.cursorrules' },
    { id: 'nextjs15-react19-vercel-ai', name: 'Next.js 15 + React 19 + Vercel AI', description: 'Next.js 15 + React 19 + Vercel AI SDK 开发指南', category: 'frontend', fileName: 'nextjs15-react19-vercel-ai.cursorrules' },
    { id: 'nextjs14-tailwind-seo', name: 'Next.js 14 + Tailwind + SEO', description: 'Next.js 14 + Tailwind + SEO 优化', category: 'frontend', fileName: 'nextjs14-tailwind-seo.cursorrules' },
    { id: 'nextjs-react-tailwind', name: 'Next.js + React + Tailwind', description: 'Next.js + React + Tailwind 开发指南', category: 'frontend', fileName: 'nextjs-react-tailwind.cursorrules' },
    { id: 'nextjs-react-typescript', name: 'Next.js + React + TypeScript', description: 'Next.js + React + TypeScript 开发指南', category: 'frontend', fileName: 'nextjs-react-typescript.cursorrules' },
    { id: 'nextjs-typescript', name: 'Next.js + TypeScript', description: 'Next.js TypeScript 开发最佳实践', category: 'frontend', fileName: 'nextjs-typescript.cursorrules' },
    { id: 'qwik-typescript-vite', name: 'Qwik + TypeScript + Vite', description: 'Qwik + TypeScript + Vite 开发指南', category: 'frontend', fileName: 'qwik-typescript-vite.cursorrules' },
    { id: 'react-components', name: 'React Components', description: 'React 组件开发最佳实践', category: 'frontend', fileName: 'react-components.cursorrules' },
    { id: 'react-typescript-nextjs-nodejs', name: 'React + TypeScript + Next.js + Node.js', description: 'React + TypeScript + Next.js + Node.js 全栈开发', category: 'frontend', fileName: 'react-typescript-nextjs-nodejs.cursorrules' },
    { id: 'solidjs-basic', name: 'Solid.js Basic', description: 'Solid.js 基础开发指南', category: 'frontend', fileName: 'solidjs-basic.cursorrules' },
    { id: 'solidjs-typescript', name: 'Solid.js + TypeScript', description: 'Solid.js TypeScript 开发指南', category: 'frontend', fileName: 'solidjs-typescript.cursorrules' },
    { id: 'svelte5-vs-svelte4', name: 'Svelte 5 vs Svelte 4', description: 'Svelte 5 vs Svelte 4 对比指南', category: 'frontend', fileName: 'svelte5-vs-svelte4.cursorrules' },
    { id: 'sveltekit-restful-tailwind', name: 'SvelteKit + RESTful API + Tailwind', description: 'SvelteKit + RESTful API + Tailwind 开发指南', category: 'frontend', fileName: 'sveltekit-restful-tailwind.cursorrules' },
    { id: 'sveltekit-tailwind-typescript', name: 'SvelteKit + Tailwind + TypeScript', description: 'SvelteKit + Tailwind + TypeScript 开发指南', category: 'frontend', fileName: 'sveltekit-tailwind-typescript.cursorrules' },
    { id: 'vue3-composition-api', name: 'Vue 3 Composition API', description: 'Vue 3 Composition API 开发指南', category: 'frontend', fileName: 'vue3-composition-api.cursorrules' },
    { id: 'vue3-nuxt3-typescript', name: 'Vue 3 + Nuxt 3 + TypeScript', description: 'Vue 3 + Nuxt 3 + TypeScript 开发指南', category: 'frontend', fileName: 'vue3-nuxt3-typescript.cursorrules' },

    // Backend & Full-Stack
    { id: 'backend-general', name: '后端通用规则（推荐）', description: '适用于所有后端项目的通用开发规范和最佳实践', category: 'backend', fileName: 'backend-general-best-practices.cursorrules' },
    { id: 'convex-best-practices', name: 'Convex Best Practices', description: 'Convex 后端开发最佳实践', category: 'backend', fileName: 'convex-best-practices.cursorrules' },
    { id: 'deno-integration', name: 'Deno Integration', description: 'Deno 集成开发指南', category: 'backend', fileName: 'deno-integration.cursorrules' },
    { id: 'elixir-phoenix-docker', name: 'Elixir + Phoenix + Docker', description: 'Elixir + Phoenix + Docker 开发指南', category: 'backend', fileName: 'elixir-phoenix-docker.cursorrules' },
    { id: 'go-backend-scalability', name: 'Go Backend Scalability', description: 'Go 后端可扩展性开发最佳实践', category: 'backend', fileName: 'go-backend-scalability.cursorrules' },
    { id: 'go-basic', name: 'Go Basic', description: 'Go 基础开发指南', category: 'backend', fileName: 'go-basic.cursorrules' },
    { id: 'htmx-basic', name: 'HTMX Basic', description: 'HTMX 基础开发指南', category: 'backend', fileName: 'htmx-basic.cursorrules' },
    { id: 'htmx-flask', name: 'HTMX + Flask', description: 'HTMX + Flask 开发指南', category: 'backend', fileName: 'htmx-flask.cursorrules' },
    { id: 'java-springboot-jpa', name: 'Java + SpringBoot + JPA', description: 'Java + SpringBoot + JPA 开发指南', category: 'backend', fileName: 'java-springboot-jpa.cursorrules' },
    { id: 'laravel-php83', name: 'Laravel + PHP 8.3', description: 'Laravel + PHP 8.3 开发指南', category: 'backend', fileName: 'laravel-php83.cursorrules' },
    { id: 'nodejs-mongodb', name: 'Node.js + MongoDB', description: 'Node.js + MongoDB 开发指南', category: 'backend', fileName: 'nodejs-mongodb.cursorrules' },
    { id: 'python-fastapi', name: 'Python FastAPI', description: 'Python FastAPI 开发最佳实践', category: 'backend', fileName: 'python-fastapi.cursorrules' },
    { id: 'python-django-best-practices', name: 'Python Django Best Practices', description: 'Python Django 开发最佳实践', category: 'backend', fileName: 'python-django-best-practices.cursorrules' },
    { id: 'typescript-nestjs-best-practices', name: 'TypeScript + NestJS Best Practices', description: 'TypeScript + NestJS 开发最佳实践', category: 'backend', fileName: 'typescript-nestjs-best-practices.cursorrules' },

    // Mobile Development
    { id: 'react-native-expo', name: 'React Native + Expo', description: 'React Native + Expo 开发指南', category: 'mobile', fileName: 'react-native-expo.cursorrules' },
    { id: 'swiftui-guidelines', name: 'SwiftUI Guidelines', description: 'SwiftUI 开发规范', category: 'mobile', fileName: 'swiftui-guidelines.cursorrules' },
    { id: 'android-jetpack-compose', name: 'Android Jetpack Compose', description: 'Android Jetpack Compose 开发指南', category: 'mobile', fileName: 'android-jetpack-compose.cursorrules' },
    { id: 'flutter-expert', name: 'Flutter Expert', description: 'Flutter 专家开发指南', category: 'mobile', fileName: 'flutter-expert.cursorrules' },
    { id: 'uikit-guidelines', name: 'UIKit Guidelines', description: 'UIKit 开发规范', category: 'mobile', fileName: 'uikit-guidelines.cursorrules' },

    // Game Development
    { id: 'unity-csharp', name: 'Unity (C#)', description: 'Unity C# 游戏开发规范', category: 'game-development', fileName: 'unity-csharp.cursorrules' },
    { id: 'unreal-cpp', name: 'Unreal Engine (C++)', description: 'Unreal Engine C++ 游戏开发规范', category: 'game-development', fileName: 'unreal-cpp.cursorrules' },
    { id: 'cocos-typescript', name: 'Cocos Creator (TypeScript)', description: 'Cocos Creator TypeScript 游戏开发规范', category: 'game-development', fileName: 'cocos-typescript.cursorrules' },
    { id: 'layabox-typescript', name: 'LayaBox (TypeScript)', description: 'LayaBox TypeScript 游戏开发规范', category: 'game-development', fileName: 'layabox-typescript.cursorrules' },

    // CSS & Styling
    { id: 'tailwind-nextjs', name: 'Tailwind + Next.js', description: 'Tailwind + Next.js 样式开发指南', category: 'css-styling', fileName: 'tailwind-nextjs.cursorrules' },
    { id: 'tailwind-react-firebase', name: 'Tailwind + React + Firebase', description: 'Tailwind + React + Firebase 开发指南', category: 'css-styling', fileName: 'tailwind-react-firebase.cursorrules' },
    { id: 'html-tailwind-javascript', name: 'HTML + Tailwind + JavaScript', description: 'HTML + Tailwind + JavaScript 开发指南', category: 'css-styling', fileName: 'html-tailwind-javascript.cursorrules' },

    // State Management
    { id: 'react-redux-typescript', name: 'React + Redux + TypeScript', description: 'React + Redux + TypeScript 状态管理指南', category: 'state-management', fileName: 'react-redux-typescript.cursorrules' },
    { id: 'react-mobx', name: 'React + MobX', description: 'React + MobX 状态管理指南', category: 'state-management', fileName: 'react-mobx.cursorrules' },
    { id: 'react-react-query', name: 'React + React Query', description: 'React + React Query 数据管理指南', category: 'state-management', fileName: 'react-react-query.cursorrules' },

    // Database & API
    { id: 'graphql-apollo-client', name: 'GraphQL + Apollo Client', description: 'GraphQL + Apollo Client 开发指南', category: 'database-api', fileName: 'graphql-apollo-client.cursorrules' },
    { id: 'typescript-axios', name: 'TypeScript + Axios', description: 'TypeScript + Axios API 开发指南', category: 'database-api', fileName: 'typescript-axios.cursorrules' },

    // Testing
    { id: 'cypress-e2e-testing', name: 'Cypress E2E Testing', description: 'Cypress E2E 测试最佳实践', category: 'testing', fileName: 'cypress-e2e-testing.cursorrules' },
    { id: 'jest-unit-testing', name: 'Jest Unit Testing', description: 'Jest 单元测试最佳实践', category: 'testing', fileName: 'jest-unit-testing.cursorrules' },
    { id: 'playwright-e2e-testing', name: 'Playwright E2E Testing', description: 'Playwright E2E 测试最佳实践', category: 'testing', fileName: 'playwright-e2e-testing.cursorrules' },
    { id: 'vitest-unit-testing', name: 'Vitest Unit Testing', description: 'Vitest 单元测试最佳实践', category: 'testing', fileName: 'vitest-unit-testing.cursorrules' },

    // Hosting & Deployments
    { id: 'netlify', name: 'Netlify', description: 'Netlify 部署和配置指南', category: 'hosting', fileName: 'netlify.cursorrules' },

    // Build Tools & Development
    { id: 'chrome-extension-js-ts', name: 'Chrome Extension (JS/TS)', description: 'Chrome 扩展开发指南 (JS/TS)', category: 'build-tools', fileName: 'chrome-extension-js-ts.cursorrules' },
    { id: 'git-commit-messages', name: 'Git Commit Messages', description: 'Git 提交消息规范', category: 'build-tools', fileName: 'git-commit-messages.cursorrules' },
    { id: 'typescript-code-convention', name: 'TypeScript Code Convention', description: 'TypeScript 代码规范', category: 'build-tools', fileName: 'typescript-code-convention.cursorrules' },

    // Language-Specific
    { id: 'python-best-practices', name: 'Python Best Practices', description: 'Python 开发最佳实践', category: 'language-specific', fileName: 'python-best-practices.cursorrules' },
    { id: 'python-developer', name: 'Python Developer', description: 'Python 开发者指南', category: 'language-specific', fileName: 'python-developer.cursorrules' },
    { id: 'r-best-practices', name: 'R Best Practices', description: 'R 语言开发最佳实践', category: 'language-specific', fileName: 'r-best-practices.cursorrules' },
    { id: 'cpp-programming-guidelines', name: 'C++ Programming Guidelines', description: 'C++ 编程规范', category: 'language-specific', fileName: 'cpp-programming-guidelines.cursorrules' },

    // Other
    { id: 'code-guidelines', name: 'Code Guidelines', description: '代码开发规范', category: 'other', fileName: 'code-guidelines.cursorrules' },
    { id: 'optimize-dry-solid', name: 'Optimize (DRY & SOLID)', description: 'DRY & SOLID 优化原则', category: 'other', fileName: 'optimize-dry-solid.cursorrules' }
];

/**
 * 插件激活时调用
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('HT Cursor Rules 已激活');

    const addRulesCommand = vscode.commands.registerCommand(
        'ht-cursor-rules.addRules',
        async () => {
            await showCategorySelector(context);
        }
    );

    context.subscriptions.push(addRulesCommand);
}

/**
 * 显示类别选择器
 */
async function showCategorySelector(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('⚠️ 请先打开一个工作区');
        return;
    }

    const categoryItems = CATEGORIES.map(category => ({
        label: `${category.icon} ${category.name}`,
        description: category.description,
        category: category
    }));

    const selectedCategory = await vscode.window.showQuickPick(categoryItems, {
        placeHolder: '请选择规则类别',
        matchOnDescription: true
    });

    if (!selectedCategory) {
        return;
    }

    await showRuleSelector(context, selectedCategory.category, workspaceFolders[0].uri.fsPath);
}

/**
 * 显示规则选择器
 */
async function showRuleSelector(
    context: vscode.ExtensionContext,
    category: Category,
    workspacePath: string
) {
    const rulesInCategory = RULE_TEMPLATES.filter(
        template => template.category === category.id
    );

    if (rulesInCategory.length === 0) {
        vscode.window.showInformationMessage('该类别暂无可用规则');
        return;
    }

    const items = rulesInCategory.map(template => ({
        label: `$(file) ${template.name}`,
        description: '',
        detail: template.description,
        template: template
    }));

    const selected = await vscode.window.showQuickPick(items, {
        placeHolder: `请选择要添加的 ${category.name} 规则`,
        matchOnDescription: true,
        matchOnDetail: true
    });

    if (!selected) {
        return;
    }

    await addCursorRules(context, selected.template, workspacePath);
}

/**
 * 添加 Cursor 规则到项目
 */
async function addCursorRules(
    context: vscode.ExtensionContext,
    template: RuleTemplate,
    workspacePath: string
) {
    try {
        const targetPath = path.join(workspacePath, '.cursorrules');
        
        const category = CATEGORIES.find(c => c.id === template.category);
        if (!category) {
            vscode.window.showErrorMessage(`❌ 找不到类别: ${template.category}`);
            return;
        }
        
        const templatePath = path.join(context.extensionPath, 'rules', category.folder, template.fileName);
        
        if (!fs.existsSync(templatePath)) {
            vscode.window.showErrorMessage(`❌ 找不到规则模板文件: ${category.folder}/${template.fileName}`);
            return;
        }

        const templateContent = fs.readFileSync(templatePath, 'utf8');

        if (fs.existsSync(targetPath)) {
            const existingContent = fs.readFileSync(targetPath, 'utf8');
            
            const ruleHeader = `# ${template.name}`;
            if (existingContent.includes(ruleHeader)) {
                const choice = await vscode.window.showWarningMessage(
                    `⚠️ .cursorrules 文件中似乎已包含 "${template.name}" 规则，是否继续？`,
                    '覆盖',
                    '合并',
                    '取消'
                );

                if (!choice || choice === '取消') {
                    return;
                }

                if (choice === '覆盖') {
                    await writeRulesFile(targetPath, templateContent);
                    await showSuccessMessage(template, targetPath, '覆盖');
                } else if (choice === '合并') {
                    const mergedContent = mergeRules(existingContent, templateContent);
                    await writeRulesFile(targetPath, mergedContent);
                    await showSuccessMessage(template, targetPath, '合并');
                }
            } else {
                const choice = await vscode.window.showInformationMessage(
                    '📄 已存在 .cursorrules 文件，请选择操作：',
                    '合并',
                    '覆盖',
                    '取消'
                );

                if (!choice || choice === '取消') {
                    return;
                }

                if (choice === '覆盖') {
                    await writeRulesFile(targetPath, templateContent);
                    await showSuccessMessage(template, targetPath, '覆盖');
                } else if (choice === '合并') {
                    const mergedContent = mergeRules(existingContent, templateContent);
                    await writeRulesFile(targetPath, mergedContent);
                    await showSuccessMessage(template, targetPath, '合并');
                }
            }
        } else {
            await writeRulesFile(targetPath, templateContent);
            await showSuccessMessage(template, targetPath, '创建');
        }

    } catch (error) {
        vscode.window.showErrorMessage(`❌ 添加规则失败：${error}`);
    }
}

/**
 * 写入规则文件
 */
async function writeRulesFile(filePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 合并规则内容
 */
function mergeRules(existingContent: string, newContent: string): string {
    return existingContent.trimEnd() + '\n\n' + 
           '# ==========================================\n' +
           '# 以下规则由 HT Cursor Rules 自动添加\n' +
           '# ==========================================\n\n' +
           newContent;
}

/**
 * 显示成功消息并询问是否打开文件
 */
async function showSuccessMessage(
    template: RuleTemplate,
    filePath: string,
    action: string
) {
    const message = `✅ ${action}成功！已将 "${template.name}" 规则添加到 .cursorrules 文件`;
    
    const choice = await vscode.window.showInformationMessage(
        message,
        '查看文件',
        '关闭'
    );

    if (choice === '查看文件') {
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
    }
}

/**
 * 插件停用时调用
 */
export function deactivate() {
    console.log('HT Cursor Rules 已停用');
}
