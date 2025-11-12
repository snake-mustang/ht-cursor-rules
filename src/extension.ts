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
    folder: string; // 子文件夹名称
}

/**
 * 所有可用的类别
 */
const CATEGORIES: Category[] = [
    {
        id: 'frontend',
        name: 'Frontend Frameworks & Libraries',
        description: '前端框架和库 - Vue, React, Angular, Svelte 等',
        icon: '🎨',
        folder: 'frontend'
    },
    {
        id: 'backend',
        name: 'Backend & Full-Stack',
        description: '后端和全栈框架 - Go, Java, PHP, Python 等',
        icon: '🚀',
        folder: 'backend'
    },
    {
        id: 'game-development',
        name: 'Game Development',
        description: '游戏开发 - Unity, Unreal, Cocos, LayaBox 等',
        icon: '🎮',
        folder: 'game-development'
    },
    {
        id: 'mobile',
        name: 'Mobile Development',
        description: '移动开发 - iOS, Android, Flutter, React Native 等',
        icon: '📱',
        folder: 'mobile'
    },
    {
        id: 'database-api',
        name: 'Database & API',
        description: '数据库和 API - GraphQL, REST, Axios 等',
        icon: '🗄️',
        folder: 'database'
    },
    {
        id: 'testing',
        name: 'Testing Frameworks',
        description: '测试框架 - Cypress, Playwright, Jest, Vitest 等',
        icon: '🧪',
        folder: 'testing'
    },
    {
        id: 'other',
        name: 'Other',
        description: '其他规则',
        icon: '📂',
        folder: 'other'
    }
];

/**
 * 所有可用的规则模板
 */
const RULE_TEMPLATES: RuleTemplate[] = [
    // ==========================================
    // Frontend Frameworks & Libraries
    // ==========================================
    // Vue 生态（公司主力技术栈）
    {
        id: 'vue2-options-api',
        name: 'Vue 2 Options API',
        description: 'Vue 2 Options API 完整开发指南',
        category: 'frontend',
        fileName: 'vue2-options-api.cursorrules'
    },
    {
        id: 'vue2-jsx',
        name: 'Vue 2 + JSX',
        description: 'Vue 2 + JSX/TSX 开发指南',
        category: 'frontend',
        fileName: 'vue2-jsx.cursorrules'
    },
    {
        id: 'vue3-composition-api',
        name: 'Vue 3 Composition API',
        description: 'Vue 3 Composition API 开发指南',
        category: 'frontend',
        fileName: 'vue3-composition-api.cursorrules'
    },
    {
        id: 'vue3-jsx',
        name: 'Vue 3 + JSX',
        description: 'Vue 3 + JSX/TSX 开发指南',
        category: 'frontend',
        fileName: 'vue3-jsx.cursorrules'
    },
    {
        id: 'vue3-nuxtjs',
        name: 'Vue 3 + Nuxt.js',
        description: 'Vue 3 + Nuxt 3 全栈开发',
        category: 'frontend',
        fileName: 'vue-nuxtjs.cursorrules'
    },
    // React 生态
    {
        id: 'react-redux-typescript',
        name: 'React + Redux + TypeScript',
        description: 'React + Redux + TypeScript 开发最佳实践',
        category: 'frontend',
        fileName: 'react-redux-typescript.cursorrules'
    },
    {
        id: 'react-nextjs',
        name: 'React + Next.js',
        description: 'React + Next.js 全栈开发',
        category: 'frontend',
        fileName: 'react-nextjs.cursorrules'
    },
    // 其他框架
    {
        id: 'angular-typescript',
        name: 'Angular + TypeScript',
        description: 'Angular + TypeScript 开发指南',
        category: 'frontend',
        fileName: 'angular-typescript.cursorrules'
    },
    {
        id: 'sveltekit-typescript',
        name: 'SvelteKit + TypeScript',
        description: 'SvelteKit + TypeScript 开发指南',
        category: 'frontend',
        fileName: 'sveltekit-typescript.cursorrules'
    },

    // ==========================================
    // Backend & Full-Stack
    // ==========================================
    {
        id: 'go-backend',
        name: 'Go Backend Scalability',
        description: 'Go 后端开发与可扩展性最佳实践',
        category: 'backend',
        fileName: 'go-backend.cursorrules'
    },
    {
        id: 'java-springboot',
        name: 'Java SpringBoot + JPA',
        description: 'SpringBoot + JPA 开发最佳实践',
        category: 'backend',
        fileName: 'java-springboot.cursorrules'
    },
    {
        id: 'springcloud-java',
        name: 'Spring Cloud + Java',
        description: 'Spring Cloud 微服务开发最佳实践',
        category: 'backend',
        fileName: 'springcloud-java.cursorrules'
    },
    {
        id: 'php-best-practices',
        name: 'PHP Best Practices',
        description: 'PHP 开发最佳实践',
        category: 'backend',
        fileName: 'php-best-practices.cursorrules'
    },
    {
        id: 'python-fastapi',
        name: 'Python FastAPI',
        description: 'FastAPI 开发最佳实践',
        category: 'backend',
        fileName: 'python-fastapi.cursorrules'
    },
    {
        id: 'python-django',
        name: 'Python Django',
        description: 'Django 开发最佳实践',
        category: 'backend',
        fileName: 'python-django.cursorrules'
    },

    // ==========================================
    // Game Development
    // ==========================================
    {
        id: 'unity-csharp',
        name: 'Unity (C#)',
        description: 'Unity C# 游戏开发规范',
        category: 'game-development',
        fileName: 'unity-csharp.cursorrules'
    },
    {
        id: 'unreal-cpp',
        name: 'Unreal Engine (C++)',
        description: 'Unreal Engine C++ 游戏开发规范',
        category: 'game-development',
        fileName: 'unreal-cpp.cursorrules'
    },
    {
        id: 'cocos-typescript',
        name: 'Cocos Creator (TypeScript)',
        description: 'Cocos Creator TypeScript 游戏开发规范',
        category: 'game-development',
        fileName: 'cocos-typescript.cursorrules'
    },
    {
        id: 'layabox-typescript',
        name: 'LayaBox (TypeScript)',
        description: 'LayaBox TypeScript 游戏开发规范',
        category: 'game-development',
        fileName: 'layabox-typescript.cursorrules'
    },

    // ==========================================
    // Mobile Development
    // ==========================================
    {
        id: 'react-native-expo',
        name: 'React Native Expo',
        description: 'React Native + Expo 开发最佳实践',
        category: 'mobile',
        fileName: 'react-native-expo.cursorrules'
    },
    {
        id: 'swiftui-guidelines',
        name: 'SwiftUI Guidelines',
        description: 'SwiftUI 开发规范和指南',
        category: 'mobile',
        fileName: 'swiftui.cursorrules'
    },
    {
        id: 'objective-c',
        name: 'Objective-C iOS',
        description: 'Objective-C iOS 开发最佳实践',
        category: 'mobile',
        fileName: 'objective-c.cursorrules'
    },
    {
        id: 'android-jetpack-compose',
        name: 'Android Jetpack Compose',
        description: 'Android Jetpack Compose 开发最佳实践',
        category: 'mobile',
        fileName: 'android-jetpack.cursorrules'
    },
    {
        id: 'flutter-expert',
        name: 'Flutter Expert',
        description: 'Flutter 专家级开发指南',
        category: 'mobile',
        fileName: 'flutter-expert.cursorrules'
    },

    // ==========================================
    // Database & API
    // ==========================================
    {
        id: 'graphql-apollo',
        name: 'GraphQL + Apollo Client',
        description: 'GraphQL 与 Apollo Client 开发',
        category: 'database-api',
        fileName: 'graphql-apollo.cursorrules'
    },

    // ==========================================
    // Testing Frameworks
    // ==========================================
    {
        id: 'cypress-e2e',
        name: 'Cypress E2E Testing',
        description: 'Cypress 端到端测试最佳实践',
        category: 'testing',
        fileName: 'cypress-e2e.cursorrules'
    },
    {
        id: 'playwright-e2e',
        name: 'Playwright E2E Testing',
        description: 'Playwright 端到端测试最佳实践',
        category: 'testing',
        fileName: 'playwright-e2e.cursorrules'
    },
    {
        id: 'jest-unit',
        name: 'Jest Unit Testing',
        description: 'Jest 单元测试最佳实践',
        category: 'testing',
        fileName: 'jest-testing.cursorrules'
    },
    {
        id: 'vitest-unit',
        name: 'Vitest Unit Testing',
        description: 'Vitest 测试框架最佳实践',
        category: 'testing',
        fileName: 'vitest-testing.cursorrules'
    }
];

/**
 * 插件激活时调用
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('HT Cursor Rules 已激活');

    // 注册命令：添加 Cursor 规则
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

    // 显示类别选择
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

    // 显示该类别下的规则
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
    // 过滤出该类别的规则
    const rulesInCategory = RULE_TEMPLATES.filter(
        template => template.category === category.id
    );

    if (rulesInCategory.length === 0) {
        vscode.window.showInformationMessage('该类别暂无可用规则');
        return;
    }

    // 按类别分组显示规则
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
        
        // 获取类别信息
        const category = CATEGORIES.find(c => c.id === template.category);
        if (!category) {
            vscode.window.showErrorMessage(`❌ 找不到类别: ${template.category}`);
            return;
        }
        
        // 读取规则模板内容（支持子文件夹）
        const templatePath = path.join(context.extensionPath, 'rules', category.folder, template.fileName);
        
        if (!fs.existsSync(templatePath)) {
            vscode.window.showErrorMessage(`❌ 找不到规则模板文件: ${category.folder}/${template.fileName}`);
            return;
        }

        const templateContent = fs.readFileSync(templatePath, 'utf8');

        // 检查目标文件是否存在
        if (fs.existsSync(targetPath)) {
            const existingContent = fs.readFileSync(targetPath, 'utf8');
            
            // 检查是否已经包含该规则
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
                // 规则不存在，询问是覆盖还是合并
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
            // 文件不存在，直接创建
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
    // 添加分隔符和新规则
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
