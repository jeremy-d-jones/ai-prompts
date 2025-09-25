

---
description: 'Guidelines for structuring effective AI prompts with consistent formatting'
mode: 'template'
tags: ['prompt-engineering', 'template', 'structure', 'guidelines', 'formatting']
difficulty: 'beginner'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['Basic AI concepts']
estimatedTime: '5-10 minutes'
useCase: 'Creating well-structured prompts with consistent formatting'
reusable: true
---
## **Part 2 – Extended Specification (saved in project storage)**

*(Full detail, referenced but not always loaded)*


### **1. Prompt Package Structure**

Each prompt is a **Prompt Package** with:

#### **A) HEADER**

* `name`
* `version`
* `status` (draft/stable/deprecated)
* `owner`
* `created`, `updated`
* `tags`
* `summary`

#### **B) INTERFACES**

* **Inputs**: name, type, examples.
* **Outputs**: format, schema, or contract.
* **Assumptions**
* **Non-goals**

#### **C) BLOCKS**

```
[block]
block_id: <kebab-case>
role: <system|developer|user|tooling>
purpose: <short>
depends_on: [<block_id>...]
content:
"""
<instructions text>
"""
notes:
- <optional notes>
```

#### **D) ASSEMBLY**

* `assembly_order`: \[\<block\_id>...]
* `inclusion_rules`
* `rendering` rules

#### **E) VARIABLES**

```
- var: <NAME>
  type: <string|int|enum|bool|json>
  required: true|false
  default: <value>
  validate: <regex or rule>
```

#### **F) STYLE GUIDE**

Tone, formatting, and clarity rules.

#### **G) TESTS**

Include 3–7 covering:

* Happy path
* Edge cases
* Refusal scenarios

#### **H) CHANGELOG**

Each entry: version, date, changes, rationale.

---

### **2. Workflow Rules**

* **Atomicity**: each block covers one concept or instruction.
* **Dependencies**: topologically order blocks; break ties via `assembly_order`.
* **Logic Alignment**: argument form, symbolization, and stepwise derivations should follow *The Logic Book* conventions.
* **Versioning**:

  * Major: breaking changes
  * Minor: backward-compatible features
  * Patch: fixes/clarity only

---

### **3. Edit/Diff Protocol**

When editing an existing package:

1. Output a unified diff for changed lines.
2. Output updated sections (blocks, header, changelog) only.

---

### **4. Reusable Block Library**

* `safety-guardrails`
* `output-contract`
* `reasoning-discipline`
* `io-variables`
* `style-tone`
* `error-handling`
* `evaluation-checklist`