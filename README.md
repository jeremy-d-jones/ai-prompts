# Codex Prompt Builder App

TypeScript toolkit for synthesizing structured Prompt Packages and single‑shot prompts. Includes:

- CLI for generating artifacts
- Lightweight React UI for interactive prompt building (Vite)

## Requirements

- Node.js 18+ (recommended) and npm 9+

## Install

```bash
npm install
```

## Repository layout

```
prompts/                 # Curated prompt markdowns (organized content)
output/                  # Generated artifacts from the CLI (gitignored)
examples/                # Example inputs/presets (JSON)
src/
  cli/                   # CLI entry and orchestration
  core/                  # Core synthesis logic
  lib/                   # Types and reusable blocks
  ui/                    # Vite + React frontend
tests/                   # Vitest unit tests
dist/                    # Compiled CLI output (tsc)
dist-ui/                 # Built UI (Vite build)
```

## CLI usage

Quickstart (non‑interactive):

```bash
npm run build
node dist/cli/index.js --project-name "Demo" --end-goals "Help users craft great prompts"
```

Interactive (prompts for missing fields):

```bash
# run with no flags to be prompted
npm run dev

# or pass flags to skip prompts
npm run dev -- --project-name "Demo" --end-goals "Help users craft great prompts" --audience engineer --target-framework none --output-target both
```

Generated files are written to `output/`:

- `output/prompt_package.json`
- `output/prompt_package.md` (JSON wrapped in a code fence)
- `output/single_prompt.txt`

Supported flags:

- `--project-name <name>`
- `--end-goals <text>`
- `--audience <audience>` (default: `engineer`)
- `--target-framework <framework>` (default: `none`)
- `--output-target <target>` (default: `both`)

Note: A `--preset` flag is referenced in older docs but is not implemented yet.

## Frontend (Vite + React)

Start the dev server:

```bash
npm run ui:dev
# opens at http://localhost:5173 (use -- --port 5174 to change)
```

Build and preview the UI:

```bash
npm run ui:build
npm run ui:preview
# previews the production build locally
```

Embed the UI component elsewhere:

- Entry: `src/ui/main.tsx`
- Component: `src/ui/PromptBuilder.tsx` (exports `PromptBuilder`)

## Tests

Run the unit tests (Vitest):

```bash
npm test -- --run   # single run
# or simply: npm test (watch mode)
```

## Linting

```bash
npm run lint
```

## Extending blocks

Add or modify reusable content blocks in `src/lib/blocks`. Blocks should export a function or static content the synthesizer can consume.

## Troubleshooting

- Vite dev server port in use: run `npm run ui:dev -- --port 5174`.
- UI build warns about outDir outside root: handled via `emptyOutDir: true` in `vite.config.ts`.
- TypeScript cannot find inquirer types: `@types/inquirer` is already added; run `npm install` if you see TS7016.
- Artifacts not appearing: ensure you are running the CLI and check the `output/` directory.

## Roadmap

- `--preset` flag to load inputs from a JSON file (e.g., from `examples/`) and merge with CLI answers.
