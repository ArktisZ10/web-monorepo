# Tasks — 001 Add Landing Page (GitHub)

Phase 0: Initial project config

- [ ] T001 Create `apps/web/package.json` with `dev`, `build`, and `start` scripts (`apps/web/package.json`)

Phase 1: Foundational / Test harness

	(depends-on: T001)
	(depends-on: T001)
- [ ] T019 [US1] Verify no-JavaScript behavior: confirm the GitHub anchor works when JS is disabled (manual or automated headless test) (maps-to: FR-005) (`apps/web/tests/nojs.md`)
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
