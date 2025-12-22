# Tasks — 001 Add Landing Page (GitHub)

Phase 0: Initial project config

 - [ ] T001 Create `apps/web/package.json` with `dev`, `build`, and `start` scripts; set `"type": "module"` for ESM and record Node engines to target latest LTS (e.g. `"engines": { "node": ">=18" }`) (`apps/web/package.json`)

Phase 1: Foundational / Test harness
 - [ ] T006 [P] Add Playwright devDependency, set `test:e2e` npm script, and run `npx playwright install` (ensure Playwright is installed under Node LTS and supports ESM); update `apps/web/package.json` (depends-on: T001) (`apps/web/package.json`)
 - [ ] T007 [US1] Create failing E2E test `apps/web/tests/e2e/landing.spec.js` (ESM) that asserts the GitHub link exists and has correct attributes (depends-on: T001) (`apps/web/tests/e2e/landing.spec.js`)
 - [ ] T008 [P] Add CI job `.github/workflows/web.yml` to run Node LTS and Playwright across Chromium/Firefox/WebKit (headless) and document Node version in workflow (depends-on: T006) (`.github/workflows/web.yml`)
 - [ ] T019 [US1] Verify no-JavaScript behavior: confirm the GitHub anchor works when JavaScript is disabled (manual or automated headless test; automated test located at `apps/web/tests/e2e/no-javascript.spec.mjs`) (maps-to: FR-005) (`apps/web/tests/no-javascript.md`)
 - [ ] T009 Update agent context (copilot) with plan/tech notes by running `.specify/scripts/bash/update-agent-context.sh copilot` and commit the resulting file (`.github/agents/copilot-instructions.md`)
- [ ] T003 [P] Create app wrapper `apps/web/pages/_app.jsx` that imports global styles (`apps/web/pages/_app.jsx`)
- [ ] T004 [P] Create skeleton landing page `apps/web/pages/index.jsx` (initial placeholder content) (`apps/web/pages/index.jsx`)
- [ ] T005 [P] Create global stylesheet `apps/web/styles/global.css` (`apps/web/styles/global.css`)

Phase 3: User Story 1 — Find GitHub account (Priority: P1)

- [ ] T010 [US1] Implement landing page content in `apps/web/pages/index.jsx` including a prominent GitHub button linking to `https://github.com/ArktisZ10` (`apps/web/pages/index.jsx`) (maps-to: FR-001, FR-002, FR-006)
- [ ] T011 [US1] Ensure the GitHub anchor uses `target="_blank"` and `rel="noopener noreferrer"`, and includes `aria-label="Open GitHub profile for ArktisZ10"` (`apps/web/pages/index.jsx`) (maps-to: FR-002, FR-003, FR-007)
- [ ] T012 [US1] Run E2E tests and update code until `apps/web/tests/e2e/landing.spec.js` passes (commands: `cd apps/web && npm run test:e2e`) (no file path)

Phase 4: User Story 2 — Simple shareable page (Priority: P2)

- [ ] T013 [US2] Add shareable metadata (title, description, canonical, Open Graph) to the landing page `apps/web/pages/index.jsx` (`apps/web/pages/index.jsx`)
- [ ] T014 [US2] Verify the page URL is copyable and loads on another device (manual test; document results in `specs/001-add-landing-page-github/quickstart.md`)

Phase 5: User Story 3 — Accessibility & Mobile (Priority: P3)

- [ ] T015 [US3] Ensure responsive styling and mobile layout in `apps/web/styles/global.css` (`apps/web/styles/global.css`)
- [ ] T016 [US3] Run accessibility checks (keyboard navigation, screen reader) and document any fixes in `specs/001-add-landing-page-github/accessibility-audit.md` (`specs/001-add-landing-page-github/accessibility-audit.md`)

Final Phase: Polish & Cross-cutting

- [ ] T017 [P] Add `apps/web/README.md` with quickstart and link to feature spec (`apps/web/README.md`)
- [ ] T018 Commit all changes on branch `001-add-landing-page-github` and open a Pull Request to `main` (`git push` + GitHub PR) (no file path)

Dependencies

- US1 depends on Phase 2 (E2E test harness) to satisfy the repository constitution (test-first requirement).  
- US2/US3 are independent and can proceed in parallel after the scaffolding tasks (T003–T005) are complete.

Parallel execution examples

- While `T006` (installing E2E deps) and `T007` (creating failing test) should be sequential (test-first), the following can run in parallel: `T003`, `T004`, `T005` (file creation); `T013` and `T015` (meta + styles) can be done by separate engineers concurrently.

Independent test criteria (per user story)

- US1: Automated E2E test `apps/web/tests/e2e/landing.spec.js` passes, asserting link presence, `href`, `target`, `rel`, and `aria-label`.  
- US2: Manual verification that opening the page URL on another device results in the same landing page and functioning GitHub link; document in `quickstart.md`.  
- US3: Keyboard-only navigation reaches the GitHub button (Enter/Space activates it) and screen reader announces the accessible name; record checks in `accessibility-audit.md`.

Implementation strategy

- MVP-first: deliver US1 first (single page with working GitHub button), then add share/meta (US2), then accessibility polish (US3).  
- Test-first for US1: commit failing E2E test, then implement page to pass tests (satisfies constitution).  
- Keep the scaffold minimal and avoid adding extraneous dependencies.

Files referenced above are exact paths relative to repository root. If you'd like, I can now scaffold any missing files, or revert the previously scaffolded `apps/web` files. Which should I do next?
