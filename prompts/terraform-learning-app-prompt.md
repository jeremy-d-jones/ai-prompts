---
description: 'Interactive Terraform learning platform with gamified quests and real AWS resource deployment'
mode: 'prompt'
tags: ['terraform', 'aws', 'iac', 'learning', 'gamification', 'react', 'typescript', 'lambda', 'dynamodb', 'cloudfront', 'devops']
difficulty: 'advanced'
author: 'Jeremy D. Jones'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['Terraform basics', 'AWS fundamentals', 'React', 'TypeScript', 'Node.js', 'DevOps concepts']
estimatedTime: '45-90 minutes'
useCase: 'Building an interactive learning platform for infrastructure as code'
---

## HEADER

* **name:** terraform-learning-app
* **version:** 1.0.0
* **status:** stable
* **owner:** Jeremy D. Jones
* **created:** 2025-01-XX
* **updated:** 2025-01-XX
* **tags:** terraform, aws, iac, learning, gamification, react, typescript, lambda, dynamodb, cloudfront, devops
* **summary:** Gamified Terraform learning platform that teaches core skills through interactive quests with real AWS resource deployment

---

## INTERFACES

### Inputs
* **learning_objectives** (array) — Core Terraform skills to teach: CLI basics, providers, variables, state, modules, workspaces, provisioners, testing, CI/CD
* **quest_design** (json) — Quest structure with learning goals, acceptance checks, artifacts, rewards
* **aws_resources** (array) — AWS services to deploy: S3, CloudFront, Lambda, API Gateway, DynamoDB
* **deployment_target** (enum) — Local development, staging, production
* **cost_controls** (json) — Budget limits, TTL tags, teardown procedures

### Outputs
* **Interactive learning platform** — Web UI with quests, progress tracking, XP system
* **Terraform modules** — Reusable infrastructure code for each quest
* **CI/CD pipeline** — Automated testing and deployment workflow
* **Documentation** — Comprehensive setup and usage guides

### Assumptions
* User has AWS account with appropriate permissions
* User has basic understanding of Terraform and AWS concepts
* Learning platform should be production-quality and cost-aware
* Gamification elements enhance learning engagement

### Non-goals
* Teaching basic AWS concepts (prerequisites)
* Providing advanced Terraform enterprise features
* Supporting multiple cloud providers beyond AWS
* Creating a full-featured learning management system

---

## BLOCKS

### [block]
**block_id:** system-mission
**role:** system
**purpose:** Define the senior engineer's mission and expertise
**content:**
```
You are a senior full-stack engineer + DevOps/Terraform expert. Build a gamified Terraform learning app that teaches core Terraform skills through "quests." Each quest maps to skills covered in HashiCorp Learn (e.g., CLI basics, providers, variables, state, modules, workspaces, provisioners, testing, CI/CD). Learners progress by successfully applying Terraform to deploy real AWS resources. The project must be production-quality, cost-aware, and fully automated from repo clone → deploy → teardown.
```

### [block]
**block_id:** learning-objectives
**role:** developer
**purpose:** Define core learning objectives and quest structure
**content:**
```
Learning Objectives:
1. Gamify learning Terraform with quests, XP, badges, and progress tracker
2. Align quest content with HashiCorp's learning topics and common AWS use cases
3. Use Terraform to provision everything, culminating in a working AWS app
4. Ship a web UI for the game (static SPA) + a small API for progress tracking
5. Provide one-command bootstrap, deploy, and destroy; include CI/CD
6. Keep cloud costs minimal and provide teardown and guardrails
```

### [block]
**block_id:** architecture-overview
**role:** developer
**purpose:** Define the system architecture and technology stack
**content:**
```
Architecture Overview:
- Game UI: React + Vite (or Next.js static export) hosted on S3, fronted by CloudFront
- Game API: AWS Lambda (Node.js or Python) behind API Gateway (HTTP API)
- Progress Store: DynamoDB table keyed by userId
- Auth (optional v1): Anonymous session with a generated userId; structure code to add Cognito later
- IaC: Terraform 1.6+; organize into reusable modules per quest
- Remote state: S3 backend with DynamoDB locking
- Cost guardrails: AWS Budgets alarm (email placeholder), TTL tags, and a `make destroy` that tears down all stacks
```

### [block]
**block_id:** quest-design
**role:** developer
**purpose:** Define comprehensive quest design and progression
**content:**
```
Quest Design (8-10 quests):
1. Hello Terraform: local backend, deploy an S3 bucket; learner runs init/plan/apply
2. Variables & Outputs: parameterize bucket name, expose outputs; UI reads outputs via API
3. Remote State: migrate to S3 backend + DynamoDB lock
4. Static Website: host React UI on S3 + CloudFront; cache invalidation wired in CI
5. API & Data: Lambda + API Gateway + DynamoDB; the UI stores quest progress
6. Modules: refactor infra into modules (networking/app/observability); pin providers
7. Workspaces & Envs: add dev/prod workspaces and per-env variables
8. Policy & Quality: add tflint, terraform fmt/validate, checkov; pre-commit hooks
9. CI/CD: GitHub Actions pipeline: fmt → validate → tflint → checkov → plan (PR) → apply (main)
10. Teardown & Budgets: add `make destroy`, TTL tags, AWS Budget alarm

Each quest includes:
- Learning goals aligned with HashiCorp Learn
- Acceptance checks the app can verify
- Artifacts: Terraform module folder, smoke test, explanation page
- Reward: XP, badge, and in-app celebration
```

### [block]
**block_id:** project-structure
**role:** developer
**purpose:** Define complete project file structure and organization
**content:**
```
Project Structure:
terraform-quest/
  README.md
  LICENSE
  Makefile
  .gitignore
  .pre-commit-config.yaml
  .tflint.hcl
  .checkov.yaml
  .github/
    workflows/
      ci.yml
      deploy.yml
  app/
    web/               # React (Vite) app
      index.html
      src/
        main.tsx
        App.tsx
        components/
          QuestCard.tsx
          ProgressBar.tsx
          Badge.tsx
        pages/
          Home.tsx
          Quest.tsx
          About.tsx
        api/client.ts   # calls API Gateway
        styles.css
      package.json
      vite.config.ts
    api/
      src/
        handler.ts      # or handler.py
      package.json
      tsconfig.json
  infra/
    globals/
      backend/          # S3 + DynamoDB for remote state (bootstrap)
      budget/           # AWS Budgets + notifications
    envs/
      dev/
        main.tf
        variables.tf
        outputs.tf
        terraform.tfvars.example
      prod/
        main.tf
        variables.tf
        outputs.tf
    modules/
      website/          # S3 static hosting + CloudFront + OAI
      api/              # Lambda + API Gateway + IAM
      data/             # DynamoDB (progress table)
      observability/    # CW logs/metrics, alarms
      iam/              # principle of least privilege policies/roles
  quests/
    01-hello-terraform/
      README.md
      main.tf
      variables.tf
      outputs.tf
      tests/smoke.sh
    02-variables-outputs/
      ...
    03-remote-state/
      ...
    04-static-website/
      ...
    05-api-dynamodb/
      ...
    06-modules/
      ...
    07-workspaces/
      ...
    08-policy-quality/
      ...
    09-cicd/
      ...
    10-teardown-budgets/
      ...
  tests/
    terratest/          # optional Go tests
  scripts/
    bootstrap-backend.sh
    build-ui.sh
    invalidate-cache.sh
    seed-demo-content.sh
```

### [block]
**block_id:** implementation-details
**role:** developer
**purpose:** Define detailed implementation requirements and standards
**content:**
```
Implementation Details:
Terraform Standards:
- Use provider `aws ~> 5.x`; pin providers & module versions
- Enforce `terraform fmt`, `terraform validate`, `tflint`, `checkov` in CI and pre-commit
- Remote state: create backend stack (`infra/globals/backend`) first via `make bootstrap`
- Tag all resources with `Project=TerraformQuest, Owner=<placeholder>, TTL=true`

Security/IAM:
- Minimal IAM policies for Lambda and CI (OIDC with GitHub Actions)
- Never hardcode secrets; use SSM Parameter Store for API config

CI/CD (GitHub Actions):
- `ci.yml` for PRs: setup Terraform, fmt, validate, tflint, checkov, plan as artifact/comment
- `deploy.yml` on main: apply infra, build UI, upload to S3, invalidate CloudFront
- Use OIDC to assume a role (`TerraformQuestGitHubRole`) with least privilege

Game Mechanics:
- `quests.json` in `app/web` defines quest list, XP values, and completion criteria
- API exposes `/progress/{userId}` GET/PUT; stores XP, badges, completedQuestIds in DynamoDB
- Completion criteria verified by API lambdas (reading expected outputs from state, hitting provisioned endpoints)

Cost Controls:
- Keep to free/low-cost tiers; warn in README which resources incur costs
- Provide `make destroy` and document how to confirm teardown
```

### [block]
**block_id:** testing-strategy
**role:** developer
**purpose:** Define comprehensive testing approach
**content:**
```
Testing Strategy:
- Include smoke tests per quest (bash or Node) and optional Terratest for core flows
- CI runs smoke tests after `apply` in non-prod
- Unit tests for game logic and API functions
- Integration tests for complete quest workflows
- E2E tests for web interface functionality
- Performance tests for large infrastructure deployments
- Security tests for IAM policies and access controls
```

### [block]
**block_id:** documentation-requirements
**role:** developer
**purpose:** Define comprehensive documentation requirements
**content:**
```
Documentation Requirements:
- README.md: quickstart, prerequisites, IAM setup, bootstrap, deploy, destroy, troubleshooting
- Each quest's README: background, what to change, acceptance tests, and how to claim XP
- Add a diagram (ASCII + mermaid) of the architecture
- API documentation with OpenAPI/Swagger
- User guide for the learning platform
- Developer guide for extending quests
- Troubleshooting guide for common issues
```

### [block]
**block_id:** acceptance-criteria
**role:** developer
**purpose:** Define clear acceptance criteria for project completion
**content:**
```
Acceptance Criteria:
- `terraform plan`/`apply` succeeds for dev environment from clean clone
- Visiting the CloudFront URL shows the game UI; quests list renders
- Completing Quest 1–5 updates progress in DynamoDB and shows XP/badge in UI
- CI on PR runs fmt/validate/tflint/checkov and posts a plan
- Merge to main triggers apply + UI deployment + cache invalidation
- `make destroy` removes all non-global resources; S3 state bucket and lock table remain unless `make nuke` is intentionally run
```

---

## ASSEMBLY

```
assembly_order:
  - system-mission
  - learning-objectives
  - architecture-overview
  - quest-design
  - project-structure
  - implementation-details
  - testing-strategy
  - documentation-requirements
  - acceptance-criteria
inclusion_rules:
  - Always include system-mission and learning-objectives
  - Include quest-design for comprehensive learning progression
  - Include project-structure for complete implementation
  - Include implementation-details for production-quality standards
  - Include acceptance-criteria for clear success metrics
rendering:
  - Generate complete project structure with all files
  - Implement all quests with proper Terraform modules
  - Create comprehensive documentation
  - Set up CI/CD pipeline
  - Configure cost controls and security
```

---

## VARIABLES

```yaml
- var: LEARNING_OBJECTIVES
  type: array
  required: true
  default: ["cli_basics", "providers", "variables", "state", "modules", "workspaces", "provisioners", "testing", "cicd"]
  validate: "cli_basics|providers|variables|state|modules|workspaces|provisioners|testing|cicd"
- var: AWS_REGION
  type: string
  required: false
  default: "us-west-2"
  validate: "us-east-1|us-west-2|eu-west-1|ap-southeast-1"
- var: PROJECT_NAME
  type: string
  required: false
  default: "TerraformQuest"
  validate: ".{3,20}"
- var: EMAIL_BUDGET_ALERT
  type: string
  required: true
  validate: "email"
- var: DOMAIN_NAME
  type: string
  required: false
  validate: "domain"
- var: GITHUB_REPO
  type: string
  required: true
  validate: "owner/repo"
- var: DEPLOYMENT_TARGET
  type: enum
  required: false
  default: "dev"
  validate: "dev|staging|prod"
- var: COST_LIMIT
  type: number
  required: false
  default: 50
  validate: "1-1000"
```

---

## STYLE GUIDE

* Use clear, technical language with specific implementation details
* Include code examples and configuration snippets
* Structure information hierarchically with clear sections
* Use consistent formatting for commands, file paths, and variables
* Include error handling and edge case considerations
* Maintain professional, production-ready tone
* Focus on learning outcomes and practical application
* Emphasize cost awareness and security best practices

---

## TESTS

1. **Quest completion**: Successfully complete all quests and earn XP/badges
2. **Infrastructure deployment**: Terraform applies successfully for all environments
3. **Web interface**: Game UI functions correctly with quest progression
4. **API functionality**: Progress tracking and quest validation work properly
5. **CI/CD pipeline**: Automated testing and deployment workflow functions
6. **Cost controls**: Budget limits and teardown procedures work correctly
7. **Security**: IAM policies and access controls are properly configured

---

## CHANGELOG

* **1.0.0 (2025-01-XX)**: Initial version with comprehensive gamified Terraform learning platform