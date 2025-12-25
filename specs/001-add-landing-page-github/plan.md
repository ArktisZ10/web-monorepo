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
 
GitHub Pages Hosting
- **Target**: Deploy the `apps/web` Next.js app as a static site to GitHub Pages. For a simple single-page landing site this is sufficient and avoids early coupling to Vercel. Because the site is static, we'll use `next export` (or another static export strategy) to produce an `out/` directory suitable for Pages.
- **Setup steps**: Ensure the Next.js app uses only static features (no server-side rendering or API routes) so `next export` is supported. Configure a GitHub Pages deployment action (e.g. `peaceiris/actions-gh-pages`) to publish the `out/` directory from a branch (or use `gh-pages` deployment). Document the deployment configuration in the repository's docs.
- **CI strategy**: GitHub Pages does not provide per-PR preview URLs like Vercel by default. Prefer one of the following CI approaches for PR verification:
   - (Preferred) Build and serve the production export in the CI job, run Playwright integration tests against the served `BASE_URL` (this matches the existing `.github/workflows/web.yml` approach). This keeps tests deterministic and under CI control.
   - (Optional) Deploy a preview to a branch-specific Pages site (or to a preview subdomain) using an action, then run integration tests against that preview URL. This is more involved and requires managing preview deployments and cleanup.
- **Secrets**: If using a deployment action that needs authentication, add `ACTIONS_DEPLOY_KEY` or `GITHUB_TOKEN` with the minimal permissions required. Document required secrets and branch protection rules.
- **Recommendation**: Use GitHub Pages for now for simplicity. Run integration tests against the CI-served production export for PR validation. Revisit Vercel later if you want automatic preview URLs, built-in CDN, or serverless features.

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
