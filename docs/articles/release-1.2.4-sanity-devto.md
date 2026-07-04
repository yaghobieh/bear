# How I'm Preventing Most of the Bugs Before They Ship — Bear UI 1.2.4

Repository: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)

Most bugs in a component library don't come from bad logic. They come from a component page crashing silently, a dark-mode toggle being forgotten on one surface, or a refactor that quietly broke `onChange` wiring three files away.

Bear UI 1.2.4 ships a full automated sanity layer that catches those before a single line of source code is committed.

---

## The problem with "it worked on my machine"

Bear has over 100 components and a full documentation portal. Every release I was manually clicking through pages, toggling dark mode, and checking the console — the same ritual every time, for every component.

It was slow, inconsistent, and easy to forget. So I automated it.

---

## What the sanity layer does

Every `git commit` now triggers a 4-step gate before the commit is allowed through:

```
Step 1 — ESLint  (code review gates G1–G10)
Step 2 — TypeScript  (tsc --noEmit)
Step 3 — Vitest  (unit tests)
Step 4 — Playwright  (275 e2e tests)
→ Generates: Sanity/sanity-release-1.2.4.md
```

If any step fails, the commit is blocked with a clear summary and the report is updated.

---

## The three Playwright suites

### 1. Render sanity (135 tests)

Every page in the portal — from `/` to `/components/watermark` — is visited headlessly. The test asserts:

- Page returns a non-400 response
- `body` is visible
- `.doc-preview` playground exists on component pages
- `PropsTable` headers are present on component pages
- **Zero console errors**

That last check is the most valuable. It catches React prop warnings, missing `onChange` handlers, broken imports — things that render visually but scream in the DevTools console.

```ts
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
// after page load:
expect(consoleErrors).toHaveLength(0);
```

### 2. Interaction checks (119 tests)

Every component page gets clicked. Each test finds the first interactive Bear element inside the demo preview and clicks it. For key components, a specific interaction map defines the exact selector and expected state:

```ts
'/components/switch': [
  { selector: '.doc-preview__stage .Bear-Switch', action: 'click' },
],
'/components/select': [
  { selector: '.Bear-Select__trigger', action: 'click',
    expectVisible: '.Bear-Select__dropdown' },
],
```

The test only asserts that no JavaScript error is thrown after interaction. No crash = pass.

### 3. Dark mode (21 tests)

A sample of 10 representative routes are tested in both modes:

```ts
await page.evaluate(() => {
  localStorage.setItem('bear-portal-theme', 'dark');
});
await page.reload();
const dark = await page.evaluate(() =>
  document.documentElement.classList.contains('dark')
);
expect(dark).toBe(true);
```

An extra test verifies the theme persists across navigation — not just within a single page reload.

---

## The code review gates

The ESLint step enforces 10 structural gates defined in the Bear code review skill:

| Gate | Rule |
|------|------|
| G1 | No magic strings or numbers |
| G3 | No HTML comments in JSX |
| G4 | No bare `<>` for layout |
| G7 | One component per `.tsx` file |
| G10 | 1 const + 1 types file per folder |

Gates that can't be automated yet (G2, G5, G6, G8, G9) are flagged as `🔍 Manual` in the report and stay in the structured code review checklist.

---

## The sanity report

Every run generates a markdown file at `Sanity/sanity-release-{version}.md`:

```markdown
# Bear Portal Sanity Report — release/1.2.4

**Overall Status:** ✅ PASSED

## Code Review Gates
| Gate | Rule          | Status |
|------|---------------|--------|
| G1   | No magic strings | ✅  |
| G3   | No HTML comments | ✅  |

## Playwright Sanity Results
| Suite        | Passed | Failed | Total |
|--------------|--------|--------|-------|
| Page Render  |   135  |    0   |  135  |
| Interactions |   119  |    0   |  119  |
| Dark Mode    |    21  |    0   |   21  |
```

The file is committed alongside source changes so every release has a traceable record of what passed.

---

## It already found a real bug

On the first run, all 275 tests failed — the Playwright suite caught a `console.error` from React on every page:

> `Warning: You provided a value prop to a form field without an onChange handler...`
> at `Sidebar.tsx:331`

The `Sidebar` component had a `<select value={...}>` with no `onChange`. It rendered fine visually. Zero user-facing symptoms. But the hook was in the global layout, so React logged the error on every single page.

The suite caught it before the branch was merged.

---

## Setting it up

The full setup uses:

- **Husky** for the pre-commit hook
- **@playwright/test** for e2e (runs Chromium headlessly)
- **Playwright webServer** option to auto-start/stop the portal dev server during tests
- A Node.js report generator script (`generate-report.mjs`) that reads the Playwright JSON output and combines it with ESLint and TypeScript results

```bash
npm run sanity   # run the full check at any time without committing
```

The Playwright config uses a `.cjs` extension to work around the `"type": "module"` in the project's `package.json`, with a separate `e2e/package.json` setting `"type": "commonjs"` so TypeScript spec files are loaded correctly on Node 18.

---

## What's next

The remaining manual gates (G2, G5, G8, G9) are good candidates for custom ESLint rules in [LintForge](https://www.npmjs.com/package/@forgedevstack/lintforge). Once those are automated, the entire Bear code review can run without a human in the loop.

---

Bear UI 1.2.4 is available now:

```bash
npm install @forgedevstack/bear
```

Repo and full code: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)
