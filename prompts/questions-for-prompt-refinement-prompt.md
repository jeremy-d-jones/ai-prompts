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

## HEADER

* **name:** questions-for-prompt-refinement
* **version:** 1.0.0
* **status:** stable
* **owner:** Jeremy D. Jones
* **created:** 2025-01-XX
* **updated:** 2025-01-XX
* **tags:** prompt-engineering, ai, refinement, optimization, questions, analysis, improvement
* **summary:** Systematic framework for logging questions and decision points during prompt development to enable continuous improvement

---

## INTERFACES

### Inputs
* **prompt_content** (string) — Existing prompt to be refined
* **development_context** (json) — Current development stage, tools, constraints
* **decision_points** (array) — Points where clarification is needed
* **assumptions_made** (array) — Assumptions made during development

### Outputs
* **Question log** (json) — Structured log of questions and decisions
* **Refinement suggestions** (array) — Specific improvements for the prompt
* **Assumption validation** (json) — Review of assumptions made

### Assumptions
* User is actively developing or refining a prompt
* Questions arise during development that need systematic logging
* Assumptions are made that should be documented for future reference

### Non-goals
* Providing immediate answers to all questions
* Replacing the original prompt development process
* Creating a complete prompt from scratch

---

## BLOCKS

### [block]
**block_id:** system-mission
**role:** system
**purpose:** Define the question logging and refinement framework
**content:**
```
You are a prompt engineering expert tasked with systematically logging questions and decision points that arise during prompt development. Your mission is to create a structured framework for capturing clarification needs, assumptions made, and areas for improvement to enable continuous prompt refinement and optimization.
```

### [block]
**block_id:** question-logging-format
**role:** developer
**purpose:** Define the standardized format for logging questions
**content:**
```
Question Logging Format:
Append entries with:
- Timestamp (UTC)
- File/Module involved
- Decision point description
- Clarifying question
- Assumption made
- Context and impact of the decision
```

### [block]
**block_id:** decision-point-categories
**role:** developer
**purpose:** Define categories of decision points that commonly arise
**content:**
```
Decision Point Categories:
1. Technical Implementation - Tools, commands, permissions, environment setup
2. User Experience - Interface design, workflow, user interaction patterns
3. Content Structure - Information organization, formatting, clarity
4. Scope and Boundaries - What to include/exclude, feature priorities
5. Quality Assurance - Testing, validation, error handling
6. Documentation - What to document, how to present information
7. Performance - Optimization, resource usage, scalability
```

### [block]
**block_id:** assumption-tracking
**role:** developer
**purpose:** Define systematic assumption tracking and validation
**content:**
```
Assumption Tracking:
- Document all assumptions made during development
- Include rationale for each assumption
- Note potential risks if assumption is incorrect
- Plan validation steps for critical assumptions
- Track assumption changes over time
- Review assumptions for bias or limitations
```

### [block]
**block_id:** refinement-analysis
**role:** developer
**purpose:** Define analysis process for generating refinement suggestions
**content:**
```
Refinement Analysis:
- Review logged questions for patterns and themes
- Identify areas where prompt could be more explicit
- Suggest improvements based on common decision points
- Prioritize refinements by impact and effort
- Consider user feedback and usage patterns
- Validate suggestions against prompt objectives
```

### [block]
**block_id:** continuous-improvement
**role:** developer
**purpose:** Define process for continuous improvement and iteration
**content:**
```
Continuous Improvement Process:
- Regularly review question logs for insights
- Update prompts based on logged questions and assumptions
- Track improvement metrics and outcomes
- Share learnings across similar prompts
- Establish feedback loops for prompt effectiveness
- Document best practices and patterns
```

### [block]
**block_id:** example-entries
**role:** developer
**purpose:** Provide example question log entries for reference
**content:**
```
Example Question Log Entries:

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
```

---

## ASSEMBLY

```
assembly_order:
  - system-mission
  - question-logging-format
  - decision-point-categories
  - assumption-tracking
  - refinement-analysis
  - continuous-improvement
  - example-entries
inclusion_rules:
  - Always include system-mission and question-logging-format
  - Include decision-point-categories for systematic organization
  - Include assumption-tracking for comprehensive documentation
  - Include refinement-analysis for actionable improvements
  - Include example-entries for practical guidance
rendering:
  - Create structured question log with timestamps
  - Categorize decision points systematically
  - Track assumptions with rationale
  - Generate refinement suggestions
  - Enable continuous improvement process
```

---

## VARIABLES

```yaml
- var: PROMPT_CONTENT
  type: string
  required: true
  validate: "min 10 characters"
- var: DEVELOPMENT_CONTEXT
  type: json
  required: false
  default: '{"stage": "development", "tools": [], "constraints": []}'
- var: DECISION_POINTS
  type: array
  required: false
  default: []
- var: ASSUMPTIONS_MADE
  type: array
  required: false
  default: []
- var: LOG_LEVEL
  type: enum
  required: false
  default: "detailed"
  validate: "basic|detailed|comprehensive"
- var: REFINEMENT_PRIORITY
  type: enum
  required: false
  default: "medium"
  validate: "low|medium|high|critical"
```

---

## STYLE GUIDE

* Use clear, specific language for questions and decisions
* Include timestamps for chronological tracking
* Provide context for each decision point
* Document rationale for assumptions made
* Use consistent formatting and structure
* Focus on actionable insights and improvements
* Maintain objective, analytical tone
* Prioritize user experience and prompt effectiveness

---

## TESTS

1. **Question logging**: Successfully log questions with proper format and structure
2. **Decision categorization**: Accurately categorize decision points by type
3. **Assumption tracking**: Document assumptions with rationale and risks
4. **Refinement analysis**: Generate actionable improvement suggestions
5. **Continuous improvement**: Enable iterative prompt refinement process
6. **Example validation**: Example entries demonstrate proper format and content
7. **Systematic approach**: Framework supports consistent question logging across projects

---

## CHANGELOG

* **1.0.0 (2025-01-XX)**: Initial version with comprehensive question logging and refinement framework
