import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
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
        extraFileExtensions: [".json"],
      },
    },
  },
  ...obsidianmd.configs.recommended,
  // 关闭与 prettier 冲突的格式规则（须为最后一个 config 块）
  eslintConfigPrettier,
);
