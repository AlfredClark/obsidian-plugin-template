import obsidianmd from "eslint-plugin-obsidianmd";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { parser } from "typescript-eslint";
import { globalIgnores, defineConfig } from "eslint/config";

export default defineConfig(
  globalIgnores([
    "node_modules",
    "dist",
    "esbuild.config.ts",
    "scripts/*.ts",
    "versions.json",
    "main.js",
    "package.json",
    "tsconfig.json",
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ["manifest.json"],
        },
        // 基于配置文件自身位置解析，不依赖进程 cwd，IDE 与 CLI 行为一致
        tsconfigRootDir: decodeURIComponent(new URL(".", import.meta.url).pathname),
        extraFileExtensions: [".json", ".svelte"],
      },
    },
  },
  ...obsidianmd.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        // <script lang="ts"> 的解析器；.svelte 整体由 svelte-eslint-parser 处理
        parser,
        // .svelte 不经 tsc 项目，类型检查由 svelte-check 承担，避免 projectService 报错
        projectService: false,
      },
    },
  },
  // 关闭与 prettier 冲突的格式规则（须为最后一个 config 块）
  eslintConfigPrettier,
);
