import { builtinModules } from "node:module";
import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["cjs"],
      fileName: () => "main.js",
    },
    rollupOptions: {
      external: ["obsidian", "electron", /^@codemirror\//, /^@lezer\//, ...builtinModules],
      output: {
        banner: `/* A Vite based Obsidian plugin development template. */`,
      },
    },
    outDir: "dist",
    sourcemap: mode === "production" ? false : "inline",
    minify: "esbuild",
  },
  plugins: [
    eslint(),
    {
      name: "obsidian-plugin-assets",
      closeBundle() {
        const outDir = path.resolve(__dirname, "dist");
        if (!existsSync(outDir)) mkdirSync(outDir);
        cpSync("manifest.json", path.join(outDir, "manifest.json"));
        cpSync("styles.css", path.join(outDir, "styles.css"));
        const mainJs = path.join(outDir, "main.js");
        if (existsSync(mainJs)) cpSync(mainJs, "main.js");
        const mainJsMap = path.join(outDir, "main.js.map");
        if (existsSync(mainJsMap)) cpSync(mainJsMap, "main.js.map");
      },
    },
  ],
}));
