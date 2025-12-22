No-JavaScript Verification

Purpose
- Documented manual steps and an automated Playwright approach to verify the GitHub anchor works when JavaScript is disabled (maps to FR-005 / T019).

Manual check
1. Start the dev server: `npm run dev` in `apps/web`.
2. Open browser settings and disable JavaScript (browser-specific).
3. Navigate to `http://localhost:3000/`.
4. Verify the GitHub link is visible as a native anchor (`<a href="https://github.com/ArktisZ10">`) and that clicking the link navigates to the external GitHub profile.

Automated Playwright approach (ESM)
Create `apps/web/tests/e2e/no-javascript.spec.mjs` with the following content:
```mjs
import { test, expect } from '@playwright/test';

test('no-JavaScript: GitHub link works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  const link = page.locator('a[href="https://github.com/ArktisZ10"]');
  await expect(link).toHaveCount(1);
  await context.close();
});
```

Notes
- Playwright's `javaScriptEnabled` option is used to emulate no-JavaScript contexts for automation. If your environment doesn't support it, run the manual steps above.
