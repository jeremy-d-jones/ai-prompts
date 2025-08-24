---
description: 'Framework for improving and refining prompts through targeted questions and analysis'
mode: 'prompt'
tags: ['prompt-engineering', 'ai', 'refinement', 'optimization', 'questions', 'analysis', 'improvement']
difficulty: 'intermediate'
author: 'Jeremy D. Jones'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['Basic prompt engineering', 'AI concepts']
estimatedTime: '10-20 minutes'
useCase: 'Improving existing prompts through systematic analysis and refinement'
---
# Questions for Prompt Refinement

Append entries with:
- Timestamp (UTC)
- File/Module
- Decision point
- Clarifying question
- Assumption made

## 2025-08-09T00:00:00Z
- File/Module: Repo setup / Shell
- Decision point: Creating directories for scaffold
- Clarifying question: May I execute shell commands (e.g., `mkdir -p ...`) non-interactively during this session?
- Assumption made: Avoid shell; create files/directories via editor APIs only.

## 2025-08-09T00:05:00Z
- File/Module: CI workflow push (`.github/workflows/ci.yml`)
- Decision point: Remote rejected push due to token missing `workflow` scope
- Clarifying question: Should I remove the workflow temporarily to complete the push, or pause for credentials with `workflow` scope?
- Assumption made: Temporarily remove CI workflow, push branch, and note as a known issue to re-add after PR.

## 2025-08-09T00:08:00Z
- File/Module: PR creation method
- Decision point: Creating draft PR programmatically
- Clarifying question: Is `gh` authenticated for this repo so I can open a draft PR non-interactively?
- Assumption made: Provide complete PR body in `.github/PR_BODY.md` and proceed after branch push; manual PR open if CLI auth is unavailable.

## 2025-08-09T00:10:00Z
- File/Module: Packaging/runtime
- Decision point: Choose `uv` or `venv + pip`
- Clarifying question: Which environment tool should be canonical for this repo?
- Assumption made: Support both in `Makefile` (prefer `uv` if present, fallback to `venv`).

## 2025-08-09T00:12:00Z
- File/Module: Dummy data distribution
- Decision point: Commit generated dataset vs generate at runtime only
- Clarifying question: Should the deterministic dataset be committed to `data/`?
- Assumption made: Commit both CSV and JSONL (exact 100 tickets) and also ship the generator script.

## 2025-08-09T00:14:00Z
- File/Module: Provider stubs
- Decision point: Behavior of GCP/Azure stubs with no credentials
- Clarifying question: Should stubs return a deterministic score to keep the demo stable?
- Assumption made: Reuse baseline deterministic score/label and include provider name in output.

## 2025-08-09T00:16:00Z
- File/Module: Tests placement
- Decision point: Where to place tests for the demo
- Clarifying question: Should tests live within the demo folder or a repo-global `tests/`?
- Assumption made: Place under `demos/sentiment-analyzer/tests` per the specified layout.
