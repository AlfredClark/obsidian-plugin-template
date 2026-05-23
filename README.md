English | [简体中文](./README_zh.md)

# Obsidian Plugin Template

A Vite based Obsidian plugin development template with TypeScript support and hot reload.

## Features

-   **Vite Build** — Uses Vite for bundling, supports ESNext syntax
-   **TypeScript** — Full type checking support
-   **Hot Reload** — `npm run dev` watches file changes and auto rebuilds with output sync
-   **Settings Panel** — Example SettingTab for quick plugin configuration extension
-   **Multimode Build** — development mode with inline sourcemaps, production mode minified

## Quick Start

```bash
# Clone the template
git clone <repo-url> <your-plugin-name>
cd <your-plugin-name>

# Install dependencies
npm install

# Start dev mode (auto rebuild on file changes)
npm run dev

# Production build
npm run build
```

Place the plugin directory under your Obsidian vault at `.obsidian/plugins/<your-plugin-name>/`, then enable it in Obsidian.

> [!NOTE]
> **Hot Reload**: `npm run dev` only handles auto building and syncing `main.js`. Obsidian does not detect file changes and reload plugins on its own. Install the [hot-reload](https://github.com/pjeby/hot-reload) plugin — it automatically reloads the corresponding plugin when `main.js` or `manifest.json` changes, giving you a near true hot reload experience.

## Available Scripts

| Command              | Description                                        |
|----------------------|----------------------------------------------------|
| `npm run dev`        | Dev mode, watch file changes and auto rebuild      |
| `npm run build`      | Type check + production build                      |
| `npm run lint`       | Lint source files with ESLint                      |
| `npm run check`      | Check code formatting with Prettier                |
| `npm run format`     | Format source files with Prettier                  |
| `npm run clean`      | Remove dist and output files                       |
| `npm run clean:deep` | Remove dist, output files and node_modules         |
| `npm run version`    | Bump version, sync manifest.json and versions.json |

## Project Structure

```
.
├── src/
│   ├── main.ts          # Plugin entry, registers commands, events, settings tab
│   └── settings.ts      # Settings interface and SettingTab implementation
├── manifest.json        # Obsidian plugin manifest
├── styles.css           # Plugin styles
├── vite.config.ts       # Vite build configuration
├── tsconfig.json        # TypeScript configuration (type check only)
├── version-bump.ts     # Version bump script
└── versions.json        # Version compatibility mapping
```

## Customization

1. Edit `id`, `name`, `description`, `author` etc. in `manifest.json`
2. Replace `TemplatePlugin` → `YourPluginName` globally (`src/main.ts`, `src/settings.ts`)
3. Remove example code from `src/main.ts` and `src/settings.ts` before development

## Tech Stack

-   [Vite](https://vitejs.dev) build tool
-   [TypeScript](https://www.typescriptlang.org) type checking
-   [ESLint](https://eslint.org) code linting
-   [Prettier](https://prettier.io) code formatting
-   [Obsidian API](https://docs.obsidian.md) plugin development

## CI/CD

| Workflow      | Trigger             | Description                     |
|---------------|---------------------|---------------------------------|
| `lint.yml`    | Push / PR to `main` | ESLint + Prettier check         |
| `release.yml` | Tag push (`x.y.z`)  | Build and create GitHub Release |

### Conventional Commits

This project uses [git-cliff](https://github.com/orhun/git-cliff) to generate changelogs from [Conventional Commits](https://www.conventionalcommits.org). Use the following prefixes for commit messages:

| Prefix           | Group         |
|------------------|---------------|
| `feat:`          | Features      |
| `fix:`           | Bug Fixes     |
| `doc:`           | Documentation |
| `perf:`          | Performance   |
| `refactor:`      | Refactor      |
| `style:`         | Styling       |
| `test:`          | Testing       |
| `chore:` / `ci:` | Miscellaneous |
| `revert:`        | Revert        |

> Commits not matching these prefixes will be excluded from the changelog.

## License

[GPL-3.0](LICENSE)
