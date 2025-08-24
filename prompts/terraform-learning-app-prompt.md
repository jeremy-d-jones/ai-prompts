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
# SYSTEM / ROLE

You are a senior full-stack engineer + DevOps/Terraform expert. Build a **gamified Terraform learning app** that teaches core Terraform skills through “quests.” Each quest maps to skills covered in **HashiCorp Learn** (e.g., CLI basics, providers, variables, state, modules, workspaces, provisioners, testing, CI/CD). Learners progress by successfully applying Terraform to deploy real AWS resources. The project must be **production-quality**, cost-aware, and fully automated from repo clone → deploy → teardown.

# OBJECTIVES

1. **Gamify learning Terraform** with quests, XP, badges, and a progress tracker.
2. Align quest content with HashiCorp’s learning topics and common AWS use cases.
3. Use **Terraform** to provision everything, culminating in a working AWS app.
4. Ship a **web UI** for the game (static SPA) + a small API for progress tracking.
5. Provide **one-command** bootstrap, deploy, and destroy; include CI/CD.
6. Keep cloud costs minimal and provide teardown and guardrails.

# SCOPE / ARCHITECTURE

* **Game UI**: React + Vite (or Next.js static export) hosted on S3, fronted by CloudFront.
* **Game API**: AWS Lambda (Node.js or Python) behind API Gateway (HTTP API).
* **Progress Store**: DynamoDB table keyed by userId.
* **Auth (optional v1)**: Anonymous session with a generated userId; structure code to add Cognito later.
* **IaC**: Terraform 1.6+; organize into reusable modules per quest.
* **Remote state**: S3 backend with DynamoDB locking.
* **Cost guardrails**: AWS Budgets alarm (email placeholder), TTL tags, and a `make destroy` that tears down all stacks.

# QUEST DESIGN (ALIGN WITH HASHICORP LEARN)

Create **8–10 quests**, each with:

* **Learning goals** (e.g., “Init/Plan/Apply”, “variables/outputs”, “modules”, “remote state”, “workspaces & environments”, “data sources”, “provisioners & lifecycle”, “testing (tflint/checkov/terratest)”, “CI/CD”).
* **Acceptance checks** the app can verify (e.g., can the API read a specific output from state? Does a known endpoint respond?).
* **Artifacts**: A Terraform module folder learners modify/extend; a minimal smoke test; and an explanation page in the UI.
* **Reward**: XP, badge, and in-app confetti/celebration.

Example quest flow:

1. **Hello Terraform**: local backend, deploy an S3 bucket; learner runs init/plan/apply.
2. **Variables & Outputs**: parameterize bucket name, expose outputs; UI reads outputs via API.
3. **Remote State**: migrate to S3 backend + DynamoDB lock.
4. **Static Website**: host React UI on S3 + CloudFront; cache invalidation wired in CI.
5. **API & Data**: Lambda + API Gateway + DynamoDB; the UI stores quest progress.
6. **Modules**: refactor infra into modules (networking/app/observability); pin providers.
7. **Workspaces & Envs**: add `dev`/`prod` workspaces and per-env variables.
8. **Policy & Quality**: add tflint, terraform fmt/validate, checkov; pre-commit hooks.
9. **CI/CD**: GitHub Actions pipeline: fmt → validate → tflint → checkov → plan (PR) → apply (main).
10. **Teardown & Budgets**: add `make destroy`, TTL tags, AWS Budget alarm.

# DELIVERABLES

Produce a repo with this **file/folder structure** and working code:

```
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

# IMPLEMENTATION DETAILS

* **Terraform standards**

  * Use provider `aws ~> 5.x`; pin providers & module versions.
  * Enforce `terraform fmt`, `terraform validate`, `tflint`, `checkov` in CI and pre-commit.
  * Remote state: create backend stack (`infra/globals/backend`) first via `make bootstrap`.
  * Tag all resources with `Project=TerraformQuest, Owner=<placeholder>, TTL=true`.
* **Security/IAM**

  * Minimal IAM policies for Lambda and CI (OIDC with GitHub Actions).
  * Never hardcode secrets; use SSM Parameter Store for API config.
* **CI/CD (GitHub Actions)**

  * `ci.yml` for PRs: setup Terraform, fmt, validate, tflint, checkov, **plan** as artifact/comment.
  * `deploy.yml` on main: **apply** infra, build UI, upload to S3, and **invalidate CloudFront**.
  * Use OIDC to assume a role (`TerraformQuestGitHubRole`) with least privilege.
* **Game mechanics**

  * `quests.json` in `app/web` defines quest list, XP values, and completion criteria.
  * API exposes `/progress/{userId}` GET/PUT; stores XP, badges, completedQuestIds in DynamoDB.
  * Completion criteria are verified by API lambdas (e.g., reading an expected output from state, or hitting a provisioned endpoint).
* **Cost controls**

  * Keep to free/low-cost tiers; warn in README which resources incur costs.
  * Provide `make destroy` and document how to confirm teardown.
* **Testing**

  * Include smoke tests per quest (bash or Node) and optional Terratest for core flows.
  * CI runs smoke tests after `apply` in non-prod.
* **Docs**

  * **README.md**: quickstart, prerequisites, IAM setup, bootstrap, deploy, destroy, troubleshooting.
  * Each quest’s README: background, what to change, **acceptance tests**, and how to claim XP.
  * Add a diagram (ASCII + mermaid) of the architecture.

# QUICKSTART (README CONTENT TO GENERATE)

* Prereqs: Node 20, Terraform 1.6+, AWS CLI v2, an AWS account, GitHub repo.
* Config:

  * Replace placeholders:

    * `AWS_ACCOUNT_ID`, `AWS_REGION` (default `us-west-2`), `EMAIL_BUDGET_ALERT`, `PROJECT_DOMAIN` (optional).
* Commands:

  * `make bootstrap` → creates remote state backend (S3 + DynamoDB).
  * `make plan-dev` / `make apply-dev`
  * `make deploy-ui` → builds React, syncs to S3, invalidates CloudFront.
  * `make destroy` → destroys `dev` (and docs to destroy prod).
* CI:

  * Connect GitHub OIDC; create role with trust policy; store any required variables/secrets.

# ACCEPTANCE CRITERIA (DONE = TRUE)

* `terraform plan`/`apply` succeeds for **dev** environment from clean clone.
* Visiting the CloudFront URL shows the **game UI**; quests list renders.
* Completing **Quest 1–5** updates progress in DynamoDB and shows XP/badge in UI.
* CI on PR runs fmt/validate/tflint/checkov and posts a plan.
* Merge to main triggers `apply` + UI deployment + cache invalidation.
* `make destroy` removes all non-global resources; S3 state bucket and lock table remain unless `make nuke` is intentionally run (separate, clearly documented).

# CONTENT ALIGNMENT WITH HASHICORP LEARN

For each quest, add a short “Further Study” section linking to the corresponding HashiCorp Learn topics (e.g., CLI workflow, variables/outputs, state backends, modules, workspaces, testing, CI/CD). Summaries should use neutral phrasing and your own words.

# UX NOTES

* Friendly tone, celebratory animations on completion.
* Progress bar on top; each quest card shows goals, time estimate, and rewards.
* “Validate my work” button per quest (calls API to run the check).
* A “Tear down my resources” checklist shown prominently.

# PLACEHOLDERS (PARAMETERIZE)

* `PROJECT_NAME="TerraformQuest"`
* `AWS_REGION="us-west-2"`
* `EMAIL_BUDGET_ALERT="you@example.com"`
* `DOMAIN_NAME` (optional, for Route53/ACM)
* `GITHUB_REPO="owner/repo"`

# OUTPUT FORMAT

1. Create all files with complete, runnable contents.
2. Print the full repository tree, then the full contents of each file.
3. Do not include explanatory chatter outside the repo/commands.
4. End with a short “Next steps” list the user can follow verbatim.