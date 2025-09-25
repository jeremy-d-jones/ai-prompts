---
description: 'AI-powered prompt builder application for creating and managing custom prompts'
mode: 'prompt'
tags: ['ai', 'prompt-engineering', 'application', 'react', 'typescript', 'fullstack', 'prompt-management', 'cli']
difficulty: 'intermediate'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['React', 'TypeScript', 'AI concepts', 'Prompt engineering basics', 'Node.js']
estimatedTime: '25-45 minutes'
useCase: 'Building an AI-powered application for prompt creation and management'
---

## HEADER

* **name:** codex-prompt-builder-app
* **version:** 0.1.0
* **status:** draft
* **owner:** Jeremy D. Jones
* **created:** 2025-08-13
* **updated:** 2025-08-13
* **tags:** codex, prompt-engineering, generator, cli, web, typescript, react, node
* **summary:** Instruct Codex to generate an application that collects user inputs and synthesizes reusable Prompt Packages and/or single-shot prompts

---

## INTERFACES

### Inputs
* **project_name** (string) — Human-friendly name for the prompt/app
* **target_framework** (enum) — react, nextjs, node-cli, python-cli, fastapi, express, none
* **output_target** (enum) — single_prompt, prompt_package_json, both
* **style_choices** (json) — Tone, formatting preferences, constraints
* **inspirations** (json) — List of URLs, quotes, or references
* **audience** (enum) — engineer, designer, executive, general
* **end_goals** (string) — What the generated prompt should make the model produce/do
* **constraints** (json) — "no external web calls," "deterministic steps," "include tests," etc.
* **variables** (json) — Domain-specific variables the prompt should expose
* **reusable_blocks** (json) — Names of blocks to include from standard library
* **assembly_order** (array) — Explicit order of blocks, if user wants to override defaults

### Outputs
* **Single-shot prompt** (string) OR
* **Prompt Package** (JSON or Markdown) following the structure: HEADER, INTERFACES, BLOCKS, ASSEMBLY, VARIABLES, STYLE GUIDE, TESTS, CHANGELOG

### Assumptions
* User's "Extended Specification" is available in project storage and defines the Prompt Package structure and workflow rules
* If user selects a UI framework, Codex should scaffold a minimal app to collect inputs and export outputs

### Non-goals
* Building a full backend with auth or persistence beyond local file export
* Visual polish beyond minimal, functional UI (unless user explicitly requests)

---

## BLOCKS

### [block]
**block_id:** system-mission
**role:** system
**purpose:** Set Codex's mission
**content:**
```
You are Codex generating an application that turns user inputs into a fully structured Prompt Package and/or single-shot prompt for downstream LLMs. Prioritize modularity, reproducibility, and auditability. All logic should be explicit and deterministic. Generate production-ready code with clear file structure, scripts, and inline docs.
```

### [block]
**block_id:** developer-app-spec
**role:** developer
**purpose:** App spec (CLI + optional web UI)
**content:**
```
Build a Node.js TypeScript project with two deliverables:

1) CLI tool:
   - Command: promptgen
   - Flags: 
     --project-name, --target-framework, --output-target, 
     --style-choices <path|json>, --inspirations <path|json>, 
     --audience, --end-goals, --constraints <path|json>, 
     --variables <path|json>, --reusable-blocks <path|json>, 
     --assembly-order <path|json>, --out <file>
   - Interactive mode when flags missing: prompt user with sensible defaults.
   - Output either:
       a) single_prompt.txt
       b) prompt_package.json (or .md)
       c) both
   - Provide validation and friendly error messages.

2) Optional web UI (if target_framework in {react, nextjs}):
   - Minimal form with sections: Project, Audience & Goals, Style, Inspirations, Variables, Blocks, Assembly.
   - Live preview pane that renders the Prompt Package.
   - Export buttons: "Download Prompt", "Download Package (JSON/MD)".

General:
- Use ESM TypeScript, `tsx` for dev, `vitest` for tests, and `eslint`.
- Provide `package.json` scripts: build, dev, test, lint, cli.
- Keep code modular: `src/cli`, `src/ui`, `src/core`, `src/lib`.
- No external network calls; all logic is local.
```

### [block]
**block_id:** developer-core-logic
**role:** developer
**purpose:** Synthesis logic for Prompt Package and single prompt
**content:**
```
Implement a pure function `synthesizePackage(inputs: Inputs): PromptPackage` that:
- Populates HEADER from inputs (name, version=0.1.0, status=draft, timestamps).
- Builds INTERFACES from provided variables and constraints.
- Assembles BLOCKS:
  * Always include mission block that states the objective in the user's words.
  * Map `reusable_blocks` names to pre-authored templates stored in `src/lib/blocks`.
  * Generate a `style-tone` block from `style_choices`.
  * Generate an `io-variables` block from `variables`.
  * Generate an `output-contract` block from `end_goals` (define output schema/format).
- Create ASSEMBLY with a topological order (or override via `assembly_order`).
- Add VARIABLES section from `variables` with type, required, default, and validation rule.
- Add STYLE GUIDE (tone, formatting, clarity) from `style_choices`.
- Add TESTS (3–7): happy path, edge cases, refusal/safety scenarios.
- Add CHANGELOG entry with rationale.

Also implement `renderSinglePrompt(pkg: PromptPackage): string` that:
- Renders a single prompt composed of selected blocks in `assembly_order`.
- Inlines variables with {{PLACEHOLDERS}} and includes a short "FILL THESE" checklist.
```

### [block]
**block_id:** developer-templates
**role:** developer
**purpose:** Reusable block templates
**content:**
```
Provide block templates in `src/lib/blocks` with lightweight params:
- safety-guardrails
- output-contract
- reasoning-discipline
- io-variables
- style-tone
- error-handling
- evaluation-checklist

Each template exports:
  export type TemplateParams = Record<string, unknown>;
  export function render(params: TemplateParams): Block;
Include JSDoc for expected params.
```

### [block]
**block_id:** developer-validation
**role:** developer
**purpose:** Input validation & DX
**content:**
```
- Validate enums and JSON shapes; show actionable errors.
- Provide sample JSON files in /examples for style, inspirations, variables, blocks, and assembly.
- Add `--preset quickstart` that loads a ready-made configuration.
```

### [block]
**block_id:** reasoning-discipline
**role:** developer
**purpose:** Enforce explicit, stepwise logic in assembly
**content:**
```
- Ensure every included block has a stated purpose and dependency-free content.
- Require assembly to be topologically ordered; fail if cycles detected.
- Prefer explicit rules over heuristics; no hidden assumptions.
```

### [block]
**block_id:** style-tone
**role:** developer
**purpose:** Defaults for tone & formatting if user provides none
**content:**
```
- Tone: direct, technical, concise; bullet-first; numbered steps for procedures.
- Formatting: compact sections; code fences for code; headings for major sections.
- Clarity: avoid purple prose; name assumptions; call out limits.
```

### [block]
**block_id:** output-contract
**role:** developer
**purpose:** Make outputs deterministic and checkable
**content:**
```
- Single-shot prompt must declare intended model role, inputs, constraints, and output format.
- Prompt Package must be valid per internal TS types; run `vitest` schema checks.
```

### [block]
**block_id:** error-handling
**role:** developer
**purpose:** Fail clearly and recoverably
**content:**
```
- On invalid input: show errors + suggest minimal fixes; exit non-zero in CLI.
- In UI: inline field errors with tooltips and example values.
```

### [block]
**block_id:** evaluation-checklist
**role:** developer
**purpose:** Quick QA before export
**content:**
```
- Does the mission align with end_goals?
- Are variables named, typed, validated?
- Is assembly order deterministic?
- Are tests included and runnable?
- Is style consistent with style_choices?
```

---

## ASSEMBLY

```
assembly_order:
  - system-mission
  - developer-app-spec
  - developer-core-logic
  - developer-templates
  - developer-validation
  - reasoning-discipline
  - style-tone
  - output-contract
  - error-handling
  - evaluation-checklist
inclusion_rules:
  - Always include system-mission and developer-core-logic.
  - Include UI code only if target_framework ∈ {react, nextjs}.
  - Include tests by default (vitest).
rendering:
  - Export Prompt Package as JSON and Markdown.
  - Render single-shot prompt from assembled blocks.
```

---

## VARIABLES

```yaml
- var: PROJECT_NAME
  type: string
  required: true
  validate: ".{3,}"
- var: TARGET_FRAMEWORK
  type: enum
  required: true
  default: node-cli
  validate: "react|nextjs|node-cli|python-cli|fastapi|express|none"
- var: OUTPUT_TARGET
  type: enum
  required: true
  default: both
  validate: "single_prompt|prompt_package_json|both"
- var: STYLE_CHOICES
  type: json
  required: false
- var: INSPIRATIONS
  type: json
  required: false
- var: AUDIENCE
  type: enum
  required: true
  default: engineer
  validate: "engineer|designer|executive|general"
- var: END_GOALS
  type: string
  required: true
- var: CONSTRAINTS
  type: json
  required: false
- var: VARIABLES
  type: json
  required: false
- var: REUSABLE_BLOCKS
  type: json
  required: false
- var: ASSEMBLY_ORDER
  type: json
  required: false
```

---

## STYLE GUIDE

* Be deterministic; list steps explicitly.
* Prefer small, composable modules and pure functions.
* Keep prompts compact and free of fluff.
* Document assumptions and non-goals.

---

## TESTS

1. **Happy path (CLI):** Provide all flags; expect `prompt_package.json` and `single_prompt.txt` with valid schema and placeholders.
2. **Interactive path:** Omit flags; answer prompts; expect identical outputs to flagged run.
3. **UI build (React/Next.js):** `npm run build` succeeds; form inputs produce valid preview and downloadable files.
4. **Validation error:** Unknown `target_framework` ⇒ non-zero exit; actionable error text.
5. **Assembly override:** Provide custom assembly array ⇒ rendered prompt respects order.
6. **Minimal config:** Only `project_name` and `end_goals` ⇒ sensible defaults; valid outputs.

---

## CHANGELOG

* **0.1.0 (2025-08-13):** Initial package defining Codex app generator for prompt synthesis; includes CLI, optional UI, reusable blocks, and deterministic assembly.

---

## HOW TO USE (Paste the following into Codex)

**Instruction to Codex (verbatim):**

```
You are Codex. Generate a TypeScript project that implements the "codex-prompt-builder-app" Prompt Package above.

Deliver:
1) A Node.js TypeScript CLI (ESM) named `promptgen` with commands/flags exactly as specified.
2) Optional minimal React or Next.js UI scaffold when target framework requests it.
3) A core module `src/core/synthesize.ts` with:
   - `synthesizePackage(inputs): PromptPackage`
   - `renderSinglePrompt(pkg): string`
4) Reusable block templates in `src/lib/blocks` for the named blocks.
5) Validation helpers, example JSONs in `/examples`, and tests with `vitest`.
6) Scripts in `package.json`: 
   - "dev", "build", "test", "lint", "cli" (runs the tool locally)
7) Output writers that save:
   - `single_prompt.txt`
   - `prompt_package.json`
   - `prompt_package.md`

Project shape:
- package.json, tsconfig.json, eslint config
- src/cli/index.ts               (argument parsing + interactive prompts)
- src/core/synthesize.ts         (pure logic)
- src/lib/blocks/*.ts            (templates)
- src/lib/schema.ts              (types for PromptPackage)
- src/ui/*                        (only if react/nextjs)
- examples/*.json
- tests/*.test.ts

Rules:
- No external network calls.
- Strong input validation with friendly errors.
- Deterministic assembly; fail on cycles or missing blocks.
- Keep code clean, documented, and ready to run with `npm i && npm run cli`.

Finally:
- Print a short README.md including quickstart, examples, and how to extend blocks.
```
