# Template Plugin — 开发规范

## 项目概览

- Obsidian 社区插件模板：TypeScript → esbuild → `main.js`
- 发布产物：`main.js` / `manifest.json` / `styles.css`（位于根目录，GitHub Release 使用）
- 插件 ID：`template-plugin`；许可证：GPL-3.0-only

## 技术栈

- **bun**：包管理器（锁文件 `bun.lock`）
- **TypeScript 6**：原生编译器，仅用于类型检查（`tsc -noEmit`）
- **esbuild 0.28**：CJS 打包；`obsidian`/`electron`/`@codemirror/*`/`@lezer/*`/node 内置模块外部化
- **ESLint 10 + eslint-plugin-obsidianmd**：Obsidian 专用规则
- **Stylelint 17 + stylelint-config-standard**：CSS 专用检查
- **Prettier 3 + stylelint**：统一代码格式（`bun run format`）

## 常用命令

| 命令                   | 作用                                                   |
| ---------------------- | ------------------------------------------------------ |
| `bun run dev`          | 监听 src 与静态资源 → 构建并同步 dist                  |
| `bun run build`        | 类型检查 + 生产构建 + 同步 dist                        |
| `bun run lint`         | ESLint 检查（提交前必须零错误）                        |
| `bun run format`       | Prettier + stylelint 格式化全部代码                    |
| `bun run format:check` | Prettier + stylelint 检查（提交前必须通过）            |
| `bun run version`      | 版本提升（package.json → manifest.json/versions.json） |
| `bun run link <路径>`  | 将 dist 链接到 vault 插件目录（默认启用热重载）        |
| `bun run unlink`       | 取消链接                                               |

## 目录结构

- `src/main.ts`：插件入口，保持最小化，仅做功能注册聚合
- `src/cores/<模块>/`：核心能力（跨功能共享的基础设施，如设置、工具类）
  - `index.ts`：统一出口（仅 re-export）
  - `types.ts`：类型定义
  - `core.ts`：核心逻辑
- `src/features/<模块>/`：业务功能（用户可感知的具体功能，如命令、视图）
  - `index.ts`：统一出口（仅 re-export）
  - `types.ts`：类型定义
  - `core.ts`：核心逻辑
- `scripts/`：构建辅助脚本（不得被插件运行时引用）
- `dist/`：构建产物副本（gitignore，可 link 至 vault）

## 代码规范

1. **命名**：类/接口 PascalCase，函数/变量 camelCase，常量 UPPER_SNAKE_CASE，文件 kebab-case
2. **类型**：strict 全开（含 `noUncheckedIndexedAccess`）；禁止 `any` 与隐式 any
3. **模块组织**：`cores/`（核心能力）与 `features/`（业务功能）均按三段式组织；`index.ts` 仅做 re-export；避免循环导入
4. **注释**：中文，写"为什么"而非"是什么"；不做多余注释
5. **移动端约束**：禁止 `import node:*` 与 Electron API（`obsidianmd/no-nodejs-modules` 规则）
6. **新增依赖**：确认可 bundle 或需加入 esbuild `external` 列表
7. **格式**：由 `.prettierrc` 统一控制——2 空格缩进、双引号、128 列、LF 行尾（与 `.editorconfig` 一致）

## 提交规范（Conventional Commits，与 cliff.toml 对齐）

- 格式：`<type>(<scope>): <描述>`（type 用英文标准前缀，描述用中文）
- 类型映射：

  | type           | 分组      |
  | -------------- | --------- |
  | `feat`         | 新功能    |
  | `fix`          | 缺陷修复  |
  | `doc`          | 文档      |
  | `perf`         | 性能优化  |
  | `refactor`     | 重构      |
  | `style`        | 样式/格式 |
  | `test`         | 测试      |
  | `chore` / `ci` | 杂务/CI   |
  | `revert`       | 回滚      |

- breaking change 使用 `!` 或 `BREAKING CHANGE:` 标记
- 禁止提交：`main.js`、`dist/`、`data.json`、`*.map`、`node_modules`

## 代理行为约束（AI 助手）

1. 修改代码前先阅读相关文件与本规范
2. 每次修改后必须运行 `bun run format` 与 `bun run lint` 验证通过
3. 依赖变更统一通过 `bun install`，不手动修改 `bun.lock`
4. 版本变更使用 `bun run version`，不手动修改 manifest 版本
5. 格式统一使用 `bun run format`，提交前 `bun run format:check` 必须通过
6. 不提交用户未要求的变更（如无关格式化）
7. 提交信息遵循"提交规范"一节，只提供提交信息，提交由用户手动进行

## 构建与发布

- **开发热重载**：`bun run link <vault>/.obsidian/plugins/template-plugin` + `bun run dev`，配合 obsidian-hot-reload 插件自动重载
- **版本流程**：`bun run version`（读 package.json 版本 → 更新 manifest.json/versions.json）
- **Release**：打 tag 触发 GitHub Action（bun 环境）自动构建，产物取自根目录
