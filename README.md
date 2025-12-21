# Web Monorepo

Repository for web projects and shared tooling.

## Purpose

This monorepo stores multiple web projects and repository-level tooling, templates, and agent definitions used to scaffold and manage work.

## Speckit / Specify

- `/.specify/`: Templates and runtime memory for the speckit/specify workflow.
	- `/.specify/templates/` contains templates used to generate `spec.md`, `plan.md`, `tasks.md`, checklists, and agent files.
	- `/.specify/memory/constitution.md` is intentionally tracked (authoritative project constitution). Other runtime memory files are ignored by `.gitignore`.
- Generated artifacts such as `spec.md`, `plan.md`, `tasks.md`, `research.md`, `data-model.md`, and `quickstart.md` are treated as generated outputs and are excluded via `.gitignore`.
