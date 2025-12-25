# Tasks — 001 Add Landing Page (GitHub)

Feature: Add a single landing page at `/` linking to `https://github.com/ArktisZ10`.
Feature directory: `/home/arktis/git/web-monorepo/specs/001-add-landing-page-github`

Phase 1: Setup (project initialization)

- [x] T001 Verify and update `apps/web/package.json` with `dev`, `build`, and `start` scripts; ensure `"type": "module"` for ESM and engines target latest LTS (e.g. `"engines": { "node": ">=18" }`). Do NOT commit new dependency versions before running a vulnerability scan. (`apps/web/package.json`)
 - [ ] T001a Run dependency vulnerability scan for proposed package manifests (e.g., `npm audit` or the approved scanner) and fail fast on any High/Critical findings; document results and remediation plan if needed. This MUST run before committing or merging dependency changes. (depends-on: T001)
 - [ ] T001b Add CI vulnerability enforcement: add a CI step that runs `npm audit --audit-level=high` (or approved scanner) and fails the job/PR on any High/Critical findings; update `.github/workflows/web.yml` accordingly. This MUST run after `npm ci` in CI and before running tests. (depends-on: T001a) (`.github/workflows/web.yml`)
- [ ] T002 Create `apps/web/next.config.js` with Preact/compat webpack aliases (`apps/web/next.config.js`)
- [x] T003 Create app wrapper `apps/web/pages/_app.jsx` that imports global styles (`apps/web/pages/_app.jsx`)
- [x] T004 Create skeleton landing page placeholder `apps/web/pages/index.jsx` (minimal placeholder content) (`apps/web/pages/index.jsx`)
- [x] T005 Create global stylesheet `apps/web/styles/global.css` (`apps/web/styles/global.css`)

Phase 2: Foundational (blocking prerequisites)

 - [x] T006 [P] Add Playwright devDependency, set `test:integration` npm script in `apps/web/package.json`, and run `npx playwright install` to install browsers (depends-on: T001, T001a) (`apps/web/package.json`) — these are the integration tests referenced in the plan.
- [ ] T007 [P] Add CI workflow to build and serve the site, install Playwright browsers, and run Playwright against `BASE_URL` across Chromium/Firefox/WebKit (headless) (suggested path: `.github/workflows/web.yml`) (depends-on: T006) (`.github/workflows/web.yml`)
- [ ] T008 [P] Add agent-context update step: run `.specify/scripts/bash/update-agent-context.sh copilot` and commit generated agent instructions to `.github/agents/copilot-instructions.md` (depends-on: T001) (`.github/agents/copilot-instructions.md`)

Phase 3: User Story 1 — Find GitHub account (Priority: P1)

- [ ] T009 [US1] Create failing integration test `apps/web/tests/integration/landing.spec.js` (ESM) that asserts the GitHub link exists and has correct attributes (`href`, `target`, `rel`, `aria-label`) (depends-on: T006) (`apps/web/tests/integration/landing.spec.js`)
- [x] T010 [US1] Implement landing page content in `apps/web/pages/index.jsx`, add a prominent GitHub button linking to `https://github.com/ArktisZ10` (maps-to: FR-001, FR-002, FR-006) (depends-on: T009) (`apps/web/pages/index.jsx`)
- [ ] T011 [US1] Ensure the GitHub anchor uses `target="_blank"` and `rel="noopener noreferrer"`, and includes `aria-label="Open GitHub profile for ArktisZ10"` (verify and update `apps/web/pages/index.jsx`) (depends-on: T010) (`apps/web/pages/index.jsx`)
- [ ] T012 [US1] Run integration tests and update code until `apps/web/tests/integration/landing.spec.js` passes (commands: `cd apps/web && npm run test:integration`) (depends-on: T009,T010) (no file path)
- [ ] T013 [US1] Add automated no-JavaScript verification `apps/web/tests/integration/no-javascript.spec.mjs` that loads the page with JavaScript disabled and verifies the anchor works (depends-on: T009) (`apps/web/tests/integration/no-javascript.spec.mjs`) — part of the integration test suite.

Phase 4: User Story 2 — Simple shareable page (Priority: P2)

- [ ] T014 [US2] Add shareable metadata (title, description, canonical, Open Graph) to the landing page `apps/web/pages/index.jsx` (depends-on: T010) (`apps/web/pages/index.jsx`)
- [ ] T015 [US2] Verify the page URL is copyable and loads on another device (manual test; document results in `specs/001-add-landing-page-github/quickstart.md`) (`specs/001-add-landing-page-github/quickstart.md`)

Phase 5: User Story 3 — Accessibility & Mobile (Priority: P3)

- [ ] T016 [US3] Ensure responsive styling and mobile layout in `apps/web/styles/global.css` (depends-on: T005) (`apps/web/styles/global.css`)
- [ ] T017 [US3] Run accessibility checks (keyboard navigation, screen reader) and document any fixes in `specs/001-add-landing-page-github/accessibility-audit.md` (depends-on: T010,T011) (`specs/001-add-landing-page-github/accessibility-audit.md`)

Final Phase: Polish & Cross-cutting Concerns

- [ ] T018 [P] Add `apps/web/README.md` with quickstart (how to run, `npm run test:integration`) and link to `spec.md` (`apps/web/README.md`)
 - [x] T019 [P][INFRA] Consolidated: CI dependency/security scan is enforced by `T001b` and the workflow's `npm audit --audit-level=high` step; no separate T019 action required. (depends-on: T007) (`.github/workflows/web.yml`)
- [ ] T020 [INFRA] Commit all changes on branch `001-add-landing-page-github` and open a Pull Request to `main` (process task — `git push` + GitHub PR) (no file path)
 - [ ] T021 [P] (Optional) Configure GitHub Pages hosting: ensure the Next.js app is compatible with `next export` (static-only features), add a Pages deployment action (e.g. `peaceiris/actions-gh-pages` or `gh-pages`) to publish the `out/` directory, and document the Pages configuration and any required secrets (optional, depends-on: T010) (no file path)


Dependencies (story completion order)

- T001 -> T006 -> T009 -> T010 -> T011 -> T012
- T001 -> T008 (agent-context can run after scaffold)
- T006 -> T007 -> T019
- Optional preview/deploy: T010 -> T021

Parallel execution examples

- While `T006` (installing integration-test deps) and `T009` (creating failing test) must be sequentially ordered (T006 before T009), the following tasks are parallelizable: `T002`, `T003`, `T004`, `T005` (file creation) — these modify different files and can be done concurrently. `T014` (metadata) and `T016` (styles) can be done by different engineers in parallel after `T010`.

Independent test criteria (per user story)

- **US1**: Automated integration test `apps/web/tests/integration/landing.spec.js` (T009) must fail before implementation; after T010/T011 the test must pass in the CI matrix (Playwright across Chromium/Firefox/WebKit). No-JS verification `apps/web/tests/integration/no-javascript.spec.mjs` (T013) must also pass.
- **US2**: Manual verification documented in `specs/.../quickstart.md` (T015) showing the URL loads on another device.
- **US3**: Accessibility audit `specs/.../accessibility-audit.md` (T017) shows keyboard focusability and accessible name for the GitHub link.

Success Criteria → Task mapping

 - SC-001 (Automated integration tests pass across browsers) → T009, T012, T007
- SC-002 (Click/navigation verification) → T009, T012
- SC-003 (Accessibility) → T011, T017
- SC-004 (Responsive checks) → T016, T015

Implementation strategy

- MVP-first: deliver US1 first (T009–T012). Commit failing tests (T009) before implementation (T010) to meet the constitution. Keep changes minimal and iterate.
- CI-first: ensure `.github/workflows/web.yml` (T007) builds and serves a production build before running Playwright; include a dependency scan (T019).

Format validation

- All tasks use the required checklist format: `- [ ] T### [P?] [US?] Description (file path)`.
- Setup/foundational/final tasks have NO `[US]` story labels; user-story phases include `[US#]` labels.