<!--
Sync Impact Report
Version change: TEMPLATE -> 0.1.0
Modified principles:
- [PRINCIPLE_1_NAME] -> Spec-Driven Work
- [PRINCIPLE_2_NAME] -> Test-First Development
- [PRINCIPLE_3_NAME] -> Library Ownership & Reuse
- [PRINCIPLE_4_NAME] -> Integration & Release Discipline
- [PRINCIPLE_5_NAME] -> Observability & Simplicity
Added sections:
- Development Workflow (detailed)
Removed sections:
- none
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/spec-template.md ✅ aligned
- .specify/templates/tasks-template.md ✅ aligned
Follow-up TODOs:
- RATIFICATION_DATE: TODO(RATIFICATION_DATE): determine original ratification date
-->

# Web Monorepo Constitution

## Core Principles

### Spec-Driven Work
All work MUST start with a written feature specification (`spec.md`) that decomposes the feature into
prioritized, independently-testable user stories. Each user story MUST specify acceptance criteria and an
independent test that can validate the story end-to-end.

Rationale: Ensures traceability from user need → tests → implementation and enables independent delivery.

### Test-First Development (NON-NEGOTIABLE)
Tests MUST be written before implementation (fail-first). For every user story included in `spec.md`:

- At least one automated test (unit, contract, or integration) MUST be committed and demonstrate failure
	before implementation begins.
- Tests are the primary specification for behavior and MUST pass in CI before merging.

Rationale: Prevents regressions, improves design, and enforces measurable acceptance criteria.

### Library Ownership & Reuse
Shared code SHOULD be packaged as a library or package with a clearly documented public surface and an owner
listed in `CODEOWNERS`. Libraries MUST be self-contained, versioned, and include contract tests for public APIs.

Rationale: Encourages reuse while maintaining clear accountability and compatibility boundaries.

### Integration & Release Discipline
All changes that affect public contracts, APIs, or cross-project behavior MUST include:

- Contract tests and integration tests.
- A semantic versioning plan and, when applicable, a migration plan for breaking changes.
- Release notes documenting user-visible changes and upgrade guidance.

Rationale: Maintain compatibility and reduce consumer surprise during upgrades.

### Observability & Simplicity
Code and services MUST emit structured logs and provide basic metrics or traces for production-facing components.
Design decisions SHOULD favor simplicity and explicitness (YAGNI).

Rationale: Easier debugging and long-term maintainability.

## Additional Constraints
- CI: Every PR MUST pass the project's CI checks: linting, unit tests, contract tests (when applicable), and
	dependency security scans.
- Code Review: All changes MUST be code-reviewed by one or more approvers; P1 changes require at least two
	approvers.
- Dependencies: External dependencies MUST be reviewed for security and licensing before introduction.
- Languages & Tooling: The repository is polyglot; language-specific tooling and code style MUST be declared in
	`plan.md`.

## Development Workflow
- Branching: Use feature branches named `###-feature-name`. PRs MUST reference the `spec.md` and `plan.md` that
	motivated the work.
- PR Requirements: PRs MUST include a link to the feature `spec.md`, tests (failing before implementation), and
	CI green status.
- Merge: Only merge after passing constitution gates, tests, and approvals. Reverts are documented with rationale in
	the PR.
- Ownership: Use `CODEOWNERS` to assign ownership; owners are responsible for approving changes that touch owned
	files.

## Governance
Amendments to this constitution follow this process:

1. Open a PR that updates `.specify/memory/constitution.md` with the proposed changes and a migration plan for
	 affected workflows.
2. The changes MUST be reviewed by a simple
	 majority of maintainers is required.
3. Merge the PR and update the `**Version**` line below using semantic versioning.

Versioning policy:
- MAJOR: Backward-incompatible governance or principle removals/redefinitions.
- MINOR: New principle or material expansion of guidance.
- PATCH: Clarifications, wording fixes, or non-semantic refinements.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): determine original ratification date | **Last Amended**: 2025-12-22
