---
description: 'AI agent development briefs and specifications for building intelligent systems'
mode: 'prompt'
tags: ['ai', 'agent', 'development', 'specification', 'brief', 'intelligent-systems', 'automation', 'cursor']
difficulty: 'advanced'
author: 'Jeremy D. Jones'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['AI concepts', 'System design', 'Programming fundamentals', 'Cursor IDE']
estimatedTime: '20-40 minutes'
useCase: 'Creating specifications for AI agent development projects'
---
Cursor Agent Brief — Non-Interactive Build (Stop After First PR)
Repo & Branch Scope
	•	Repository: jeremy-d-jones/ohh-thats-fresh
	•	You may only modify files in this repo.
	•	All work on dev. If dev doesn’t exist, create it from main. Never force-push.
	•	Do not merge. Stop after opening a PR from dev → main.
Non-Interactive Mode with Permissions and Auth Preflight
	•	Do not ask for permission or input after kickoff. Pick sensible defaults.
	•	If an option is unclear, choose the simplest, most portable approach.
	•	Before performing any file or directory operation, verify that the local environment grants permissions for the intended action:
	◦	For each planned write/create/delete, check if the target path exists and is writable.
	◦	If permissions are insufficient, log the issue in the PR “Known Issues” section and continue with the remaining tasks where possible.
	•	Before executing shell or Git commands, ensure:
	◦	Shell commands required for this build (git, python, make, mkdir, rm, gh) are pre-authorized to run non-interactively.
	◦	Git/GitHub authentication is configured for the local environment.
	▪	For pushes, SSH key or HTTPS credential helper is configured.
	▪	For creating/updating workflow files, token has workflow scope.
	▪	For PR creation, gh is installed and gh auth status is valid, or a PAT with repo scope is available.
	◦	If these conditions are not met, log the missing capability in the PR “Known Issues” section and output exact manual commands for the user to run.
	•	Provide an allowlist for permitted shell commands to avoid unexpected prompts.
Security Scan Integration Placeholder
	•	In the codebase (e.g., in CI configuration or a dedicated /security directory), include a clearly marked placeholder indicating where enterprise-grade security scanning tools would be integrated.
	•	This placeholder must:
	◦	Reference common enterprise scanning categories: SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), SCA (Software Composition Analysis), and container image scanning.
	◦	Note that the integration is not functional in this demo, but the structure is ready for a drop-in CLI/API invocation from tools like Checkmarx, Snyk, Veracode, Prisma Cloud, or similar.
	◦	Document expected input/output formats for interoperability (SARIF for code analysis results, CycloneDX for SBOMs, SPDX for license compliance) so future integration is plug-and-play.
	◦	Provide an example Makefile target and CI job stub (commented out) showing how the scan would be invoked and how results would be parsed or published.
	◦	Include notes on where authentication/configuration for the tool would be provided (e.g., via secure CI secrets, not committed to the repo).
Dependency Vetting
	•	Before adding or installing any external packages, perform a dependency verification process:
	1	Source Verification — ensure the package is from the official PyPI registry.
	2	Popularity & Maintenance — check download counts, recent release activity, and maintainer history.
	3	License Review — confirm the license is acceptable for use in a public demo.
	4	Security Check — search for known vulnerabilities (e.g., using pip audit or safety check).
	5	Logging — record all vetted dependencies, the verification date, and findings in a DEPENDENCY_AUDIT.md file in the repo root.
	•	Only proceed with adding the dependency if it passes all checks; otherwise, log the reason for rejection in DEPENDENCY_AUDIT.md and choose an alternative.
Question Logging (Non-Blocking)
	•	If, during implementation, you encounter a point where human clarification could improve the build:
	◦	Do not pause for input. Make a reasonable assumption and continue.
	◦	Add the question and context to a QUESTIONS_FOR_PROMPT_REFINEMENT.md file in the repo root.
	◦	Each entry should include:
	1	Timestamp (UTC)
	2	File/Module involved
	3	Brief description of the decision point
	4	The clarifying question
	5	What assumption you made
	◦	Append new entries instead of overwriting the file.
	•	Mention in the PR body that QUESTIONS_FOR_PROMPT_REFINEMENT.md contains logged questions.
Objective
Create a self-contained Support Ticket Sentiment Analyzer demo suitable for Freshdesk/Freshservice-style workflows.
Tech & Tooling
	•	Python 3.11+
	•	uv or venv + pip
	•	ruff linting
	•	pytest testing
	•	GitHub Actions for CI
	•	No outbound network calls by default; providers stubbed
	•	.env.example for secrets
Deliverables & Layout
/data/
  tickets_dummy_100.csv
  tickets_dummy_100.jsonl
/demos/sentiment-analyzer/
  README.md
  cli.py
  src/
    __init__.py
    loader.py
    baseline.py
    providers.py
    rules.py
    pipeline.py
  tests/
    test_baseline.py
    test_rules.py
/docs/
  ARCHITECTURE.md
  SECURITY_NOTES.md
/scripts/
  generate_dummy_tickets.py
/security/
  SCAN_PLACEHOLDER.md
.github/
  pull_request_template.md
  workflows/ci.yml
.gitignore
.editorconfig
CHANGELOG.md
CONTRIBUTING.md
README.md
.env.example
Makefile
Dummy Data
	•	100 tickets with specified fields
	•	CSV + JSONL format
	•	Fixed seed for reproducibility
Baseline Sentiment Algorithm
	•	<0.5 → negative; else positive
	•	Deterministic with seed 42
Tagging & Prioritization Rules
	•	Negative sentiment bumps priority if <3
	•	Urgent keywords ensure priority ≥3
	•	Always add sentiment tag
Providers (Optional)
	•	GCP and Azure stubs
	•	Enabled only with correct env vars
Secrets & Config
	•	.env.example placeholders
	•	.env in .gitignore
Provider Behavior
	•	Default: baseline
	•	Missing config → fallback unless --strict
Dependencies
	•	Core + optional GCP/Azure extras
	•	Pin versions and produce a lockfile with hashes. If using uv, commit uv.lock.
	•	Export a frozen requirements file with hashes for installers that use pip: uv export --format=requirements-txt --no-dev --hashes -o requirements.txt.
	•	Install in CI with hash-checking: pip install --require-hashes -r requirements.txt.
Dependency Vetting & Supply Chain Controls (Required)
	•	Create /policy/dependency-policy.md defining acceptance rules:
	◦	Prefer stdlib over new deps; add a dep only if justified in an ADR (see below).
	◦	Package must have: recent release (< 18 months), active maintenance (commits/issues), permissive license, no obvious typosquatting, and published wheels for common platforms.
	◦	Disallow packages that execute code at import with side effects unrelated to functionality.
	•	Add /policy/allowlist.yml listing allowed packages and versions.
	•	Add /docs/ADR-0001-dependencies.md recording rationale for each added dependency (why needed, alternatives considered, risk notes).
	•	Implement /scripts/vet_dependencies.py that:
	◦	Fails if a package/version is not in allowlist.yml.
	◦	Warns on packages with low maintenance or suspicious names.
	◦	Prints a table of deps with homepage, license, latest release date.
	•	Generate an SBOM:
	◦	Use CycloneDX for Python: cyclonedx-py -j -o sbom.json (add tool as a dev dependency).
	•	Security scanning:
	◦	Run pip-audit -r requirements.txt and osv-scanner -r . in CI.
	•	Provenance & integrity:
	◦	Prefer packages that publish Sigstore attestations (note in ADR if available).
	◦	Require version pinning and hashes for all installed artifacts.
	•	GitHub settings:
	◦	Enable Dependabot alerts & security updates for the repo.
	•	PR gating:
	◦	CI must fail if vetting/audit/SBOM steps fail or if hashes are missing.
CLI Requirements
	•	Commands: analyze, tagging-rules, healthcheck
	•	Makefile with setup, lint, test, analyze, regen-data
Documentation
	•	Root README, Demo README, ARCHITECTURE.md, SECURITY_NOTES.md, CONTRIBUTING.md, PR template, CHANGELOG.md
	•	/security/SCAN_PLACEHOLDER.md explaining where and how enterprise scanning tools would plug in, including example commands, expected formats, and CI stub.
Tests & CI
	•	Deterministic baseline tests
	•	Keyword rule tests
	•	Dependency safety checks in CI (required):
	◦	Verify uv.lock is present and up to date with pyproject.toml.
	◦	uv export --format=requirements-txt --no-dev --hashes -o requirements.txt
	◦	pip install --require-hashes -r requirements.txt
	◦	pip-audit -r requirements.txt
	◦	osv-scanner -r .
	◦	cyclonedx-py -j -o sbom.json (artifact)
	•	CI triggers on pushes to dev and PRs to main
	•	Include a commented-out CI job for enterprise security scanning to demonstrate readiness for integration.
Commit Style
	•	Small commits with proper prefixes
Final Action (Stop Here)
	•	Open a draft PR from dev → main titled: “Milestone 1 — Sentiment Analyzer Demo (Non-Interactive Build)”
	•	PR must include: summary, usage, distribution example, known issues (including any permissions failures or rejected dependencies), note about QUESTIONS_FOR_PROMPT_REFINEMENT.md, and mention of security/SCAN_PLACEHOLDER.md
	•	Stop after PR is opened
