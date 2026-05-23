[English](./README.md) | 简体中文

# Obsidian Plugin Template

基于 Vite 的 Obsidian 插件开发模板，支持 TypeScript 类型检查和热重载开发。

## 特性

-   **Vite 构建** — 使用 Vite 打包，支持 ESNext 语法
-   **TypeScript** — 完整的类型检查支持
-   **热重载** — `npm run dev` 监听文件变更自动 rebuild 并同步产物
-   **设置面板** — 示例 SettingTab 可快速扩展插件配置
-   **多模式构建** — development 模式输出 inline sourcemap，production 模式关闭

## 快速开始

```bash
# 克隆模板
git clone <repo-url> <your-plugin-name>
cd <your-plugin-name>

# 安装依赖
npm install

# 启动开发模式（文件变更自动构建）
npm run dev

# 生产构建
npm run build
```

将插件目录放到 Obsidian vault 的 `.obsidian/plugins/<your-plugin-name>/` 下，在 Obsidian 中启用即可。

> [!NOTE]
> **热重载**：`npm run dev` 仅负责自动构建并同步 `main.js`，Obsidian 本身不会自动检测文件变更并重新加载插件。建议安装 [hot-reload](https://github.com/pjeby/hot-reload) 插件，它会在检测到 `main.js` 或 `manifest.json` 变更时自动重载对应插件，使开发体验接近真正的热重载。

## 可用脚本

| 命令                   | 说明                                     |
|----------------------|----------------------------------------|
| `npm run dev`        | 开发模式，watch 文件变更并自动 rebuild             |
| `npm run build`      | 类型检查 + 生产构建                            |
| `npm run lint`       | ESLint 代码检查                            |
| `npm run check`      | Prettier 格式检查                          |
| `npm run format`     | Prettier 格式化                           |
| `npm run dist-link`  | 将 dist 软链接到测试仓库的插件目录                   |
| `npm run clean`      | 清理 dist 和产物文件                          |
| `npm run clean:deep` | 清理 dist、产物文件和 node_modules             |
| `npm run version`    | 升级版本号，同步 manifest.json 和 versions.json |

## 项目结构

```
.
├── src/
│   ├── main.ts          # 插件入口，注册命令、事件、设置页
│   └── settings.ts      # 设置接口定义与 SettingTab 实现
├── manifest.json        # Obsidian 插件清单
├── styles.css           # 插件样式
├── dist-link.ts         # 将 dist 软链接到测试仓库插件目录
├── vite.config.ts       # Vite 构建配置
├── tsconfig.json        # TypeScript 配置（仅类型检查）
├── version-bump.ts     # 版本号升级脚本
└── versions.json        # 版本兼容性映射
```

## 自定义

1. 在 `manifest.json` 中修改 `id`、`name`、`description`、`author` 等信息
2. 全局搜索替换 `TemplatePlugin` → `YourPluginName`（`src/main.ts`、`src/settings.ts`）
3. 开发前清理 `src/main.ts` 和 `src/settings.ts` 中的示例代码

## 技术栈

-   [Vite](https://vitejs.dev) 构建
-   [TypeScript](https://www.typescriptlang.org) 类型检查
-   [ESLint](https://eslint.org) 代码检查
-   [Prettier](https://prettier.io) 代码格式化
-   [Obsidian API](https://docs.obsidian.md) 插件开发

## CI/CD

| Workflow      | 触发条件             | 说明                   |
|---------------|------------------|----------------------|
| `lint.yml`    | 推送 / PR 到 `main` | ESLint + Prettier 检查 |
| `release.yml` | 推送 tag（`x.y.z`）  | 构建并创建 GitHub Release |

### 约定式提交

本项目使用 [git-cliff](https://github.com/orhun/git-cliff) 基于 [Conventional Commits](https://www.conventionalcommits.org) 自动生成 changelog。提交信息请使用以下前缀：

| 前缀               | 分组   |
|------------------|------|
| `feat:`          | 新功能  |
| `fix:`           | 问题修复 |
| `doc:`           | 文档   |
| `perf:`          | 性能优化 |
| `refactor:`      | 重构   |
| `style:`         | 样式   |
| `test:`          | 测试   |
| `chore:` / `ci:` | 杂项   |
| `revert:`        | 回滚   |

> 不符合上述前缀的提交将被排除在 changelog 之外。

## 许可证

[GPL-3.0](LICENSE)
