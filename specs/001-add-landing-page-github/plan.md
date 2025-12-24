# Implementation Plan: 001 Add Landing Page — GitHub

Feature spec: `/home/arktis/git/web-monorepo/specs/001-add-landing-page-github/spec.md`
Feature branch: `001-add-landing-page-github`
Generated: 2025-12-22

## Technical Context

- Repository root: `/home/arktis/git/web-monorepo`
- Feature directory: `/home/arktis/git/web-monorepo/specs/001-add-landing-page-github`
- Implementation target: monorepo `apps/web` Next.js app using Preact (`preact/compat`).
- No backend, no persistent data required. Landing page at `/` implemented as a standard Next.js page linking to `https://github.com/ArktisZ10`.

## Constitution Check

Reviewing `.specify/memory/constitution.md` for gating rules (Spec-Driven Work, Test-First Development, CI requirements).

- Spec present: `/home/arktis/git/web-monorepo/specs/001-add-landing-page-github/spec.md` ✅
- Plan being created (this document) ✅
- Tests: The constitution requires tests before implementation. For this simple static landing page we will add a minimal integration test (Playwright) that fails before implementation and passes after. Tests and tooling will use ESM modules (author test files as ESM and set `"type": "module"` in `apps/web/package.json`). We will add a minimal Playwright integration test that fails before implementation and passes after. Note: a minimal `apps/web/package.json` scaffold must be created first so devDependencies and scripts can be installed and executed (see Tasks ordering / dependencies).
- Dependencies: Any introduced npm deps must be approved and scanned per constitution. We'll add `next` and `preact` and keep them minimal.

Gate evaluation:
- Gate: "Tests MUST be written before implementation" — We will create an automated integration test file as the first implementation commit (test fails), then implement the page and make the test pass in a subsequent commit. This satisfies the constitution gate.

Tooling & CI matrix (decision)
 - **Integration test runner**: `Playwright` (headless by default). If CI constraints later require a different runner, update `plan.md` with a justification.
 - **Browsers (CI matrix)**: Chromium, Firefox, WebKit (run headless in CI); target Node.js `18` and `20` in runners where applicable.
 - **Test script**: add `test:e2e` npm script to `apps/web/package.json` that runs the integration tests with Playwright.

 - **Node runtime**: Target the repository's latest Node LTS in CI and local development. Use the latest LTS in the CI matrix and document the specific version in the repo's `engines` field if desired.
 - **Modules**: Use ESM for app and tests; add `"type": "module"` to `apps/web/package.json` and author sources/tests with `import`/`export` syntax.
 - **Terminology**: This plan uses the term `integration tests` (rather than `E2E`) and `no-JavaScript` when referring to running pages with JavaScript disabled. Use these terms consistently in related artifacts (`spec.md`, `tasks.md`).
 
Vercel Hosting
 - **Target**: Deploy the `apps/web` Next.js app to Vercel for preview and production hosting. Vercel preview URLs are the recommended targets for integration-test validation because they run the production build.
- **Setup steps**: Connect the GitHub repository to Vercel, enable Preview Deployments for pull requests, and configure environment variables/secrets if needed.
 - **CI strategy**: Prefer running integration tests against the Vercel preview URL for PRs. Use CI to either (a) run Playwright against a preview URL (provided by Vercel integration or returned by a Vercel action), or (b) build and serve the site in CI and run Playwright against the served URL. Integration tests read `BASE_URL` to target the deployed preview or local server.
- **Secrets**: If using a Vercel action in CI, add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to repository secrets. Alternatively rely on Vercel's native GitHub integration and query the Vercel API for the preview URL in CI.
- **Recommendation**: Use preview deployments as the canonical verification target for PRs so tests run against the real build. Keep local dev server for fast local iteration.

Ordering note: The project scaffold (`apps/web/package.json`) must be created before installing integration-test devDependencies or committing the failing test. Tasks that add test deps or create failing tests will explicitly depend on the scaffold task.

## Phase 0 — Research & Clarifications

Artifacts:
- `/home/arktis/git/web-monorepo/specs/001-add-landing-page-github/research.md` — Decision record: Next.js + Preact, static landing page. ✅

Open clarifications resolved in research.md:
- External link behavior: open in new tab with `rel="noopener noreferrer"` ✅

Phase 0 complete.

## Phase 1 — Design & Contracts

Artifacts already generated (this feature is small):

API / Contracts: none required for v1 (static page). If a contact form or repo-list is later requested, create OpenAPI under `contracts/`.
API / Contracts: none required for v1 (landing page). If a contact form or repo-list is later requested, create OpenAPI under `contracts/`.
Agent context update:
- Run `/home/arktis/git/web-monorepo/.specify/scripts/bash/update-agent-context.sh copilot` to add Next.js + Preact notes to agent context. Task included below.
## Implementation Tasks (Phase 1 -> Phase 2)

Top-level plan: implement minimal Next.js app in `apps/web` with Preact aliases, add a failing integration test, implement landing page to satisfy the test, commit, and provide quickstart.

Tasks (ordered):

1. Create project scaffold under `apps/web`
   - Files to create:
     - `apps/web/package.json` (scripts: `dev`, `build`, `start`)
     - `apps/web/next.config.js` (webpack aliases to `preact/compat`)
     - `apps/web/pages/index.jsx` (landing page)
     - `apps/web/pages/_app.jsx` (global styles import)
     - `apps/web/styles/global.css` (basic styles)
   - Commit: `chore: scaffold apps/web (failing integration-test placeholder)`

2. Add integration test (fail-first) — simple test that asserts the GitHub link is present and opens target URL
   - Location: `apps/web/tests/e2e/landing.spec.js`
   - Test framework: choose lightweight runner (Playwright recommended) — add `devDependencies` and npm script `test:e2e` for integration tests.
   - Commit: `test(e2e): add failing integration test for landing page`

3. Implement landing page so test passes
   - Ensure anchor has `href="https://github.com/ArktisZ10"`, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label` as specified in spec.
   - Commit: `feat(web): add landing page with GitHub button — passes integration tests`

4. Add README and quickstart (link to `spec.md` and `quickstart.md`)
   - Commit: `docs: add quickstart for apps/web`

5. Run linting/tests and update plan with any remaining tasks

Optional (P2)
- Add simple unit tests for components
- Add CI job for `apps/web` to run build and integration tests

## Files to be committed (suggested commit split)

- `specs/001-add-landing-page-github/plan.md` (this file)
- `apps/web/package.json`
- `apps/web/next.config.js`
- `apps/web/pages/index.jsx`
- `apps/web/pages/_app.jsx`
- `apps/web/styles/global.css`
`apps/web/tests/e2e/landing.spec.js`

## Agent Context Update (Phase 1 step)

Run:
```
.specify/scripts/bash/update-agent-context.sh copilot
```

This will add Next.js + Preact to the copilot agent context file and preserve any manual content between markers.

## Gates & Acceptance

- Gate 1 (Spec): `spec.md` present and approved ✅
 - Gate 2 (Tests): Failing integration test committed before implementation ✅ (task included)
 - Gate 3 (CI): Build + integration tests pass locally and in CI before merging — include CI task if repo has pipeline.

## Branch & Deliverables

- Branch: `001-add-landing-page-github`
 - Deliverables after Phase 1: `apps/web` scaffold, passing integration test, `quickstart.md`, and updated agent context.

## Next actions (what I'll do if you approve)

1. Create `apps/web/styles/global.css` and finish scaffold (apply files from Tasks #1).  
2. Add integration test (Task #2) and commit failing test.  
3. Implement landing page (Task #3) and run integration tests.  
4. Run `.specify/scripts/bash/update-agent-context.sh copilot` and commit the agent context update.  
5. Push branch or open a PR if you want.

---

Plan created by Copilot on branch `001-add-landing-page-github`.
