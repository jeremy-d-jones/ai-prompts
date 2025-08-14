# Codex Prompt Builder App

Minimal TypeScript project that synthesizes Prompt Packages and single-shot prompts.

## Quickstart

```bash
npm install
npm run build
node dist/cli/index.js --project-name demo --end-goals "Test"
```

Outputs `prompt_package.json`, `prompt_package.md`, and `single_prompt.txt`.

## Tests

```bash
npm test
```

## Presets

Use the included `examples/preset-normal-science.json` for a Kuhn-inspired tone:

```bash
npm run cli -- --preset examples/preset-normal-science.json
```

## Extend Blocks

Add templates in `src/lib/blocks` exporting a `render` function.
