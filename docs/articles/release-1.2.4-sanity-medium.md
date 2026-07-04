# How I'm Preventing Most of the Bugs Before They Ship

*Bear UI 1.2.4 — automated sanity checks on every commit*

Repository: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)

---

If you maintain a UI component library, you know the release ritual. Open the browser, click through component pages, toggle dark mode, open DevTools, check the console, repeat. Every release. Every component. By hand.

I did this for every Bear UI release until 1.2.4. Then I automated it.

---

## The gap between "it builds" and "it works"

A successful `npm run build` doesn't tell you whether:

- The `/components/switch` page renders without a console error
- Dark mode correctly applies the `.dark` class after a localStorage write
- Clicking the first interactive element inside a demo preview throws a JS exception
- A new `Sidebar` refactor quietly broke a controlled `<select>` prop

These are not compilation errors. They are runtime behaviors. And they only show up when someone actually loads the page.

Bear UI's portal has over 100 component pages, each with a live playground. Manually checking all of them is not scalable.

---

## What 1.2.4 adds: a pre-commit sanity gate

Every `git commit` now runs a four-step quality gate before allowing the commit through.

```
Step 1 — ESLint        code review structural gates (G1–G10)
Step 2 — TypeScript    tsc --noEmit, zero tolerance
Step 3 — Vitest        unit tests
Step 4 — Playwright    275 automated browser tests
→ Output: Sanity/sanity-release-1.2.4.md
```

If any step fails, the commit is blocked. The developer sees a clear summary of what failed and where.

---

## The three Playwright suites

### Render sanity — 135 tests

Every route in the portal is visited headlessly. The suite checks:

1. HTTP response is not 4xx/5xx
2. `body` is visible
3. `.doc-preview` playground container exists on component pages
4. `PropsTable` column headers exist on component pages
5. **Zero `console.error` calls**

The console check is the most powerful assertion. React logs prop errors, broken context usage, and missing event handlers as `console.error`. They don't break rendering visually, but they reveal real implementation issues.

```typescript
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});

// after navigation:
expect(consoleErrors).toHaveLength(0);
```

### Interaction checks — 119 tests

Each component page is clicked. For components without a specific interaction definition, the test finds the first `button` or `[role="button"]` inside the demo stage and clicks it.

For key components, an explicit interaction map defines the exact selector, action, and expected outcome:

```typescript
'/components/select': [
  {
    selector: '.doc-preview__stage .Bear-Select__trigger',
    action: 'click',
    expectVisible: '.Bear-Select__dropdown',
  },
],
```

The test only asserts no JavaScript crash occurred after the interaction. No logic correctness — just stability.

### Dark mode — 21 tests

Ten representative routes are tested in both light and dark modes. The test sets `localStorage` directly and reloads, then checks the `html` element for the `.dark` class:

```typescript
await page.evaluate(() => {
  localStorage.setItem('bear-portal-theme', 'dark');
});
await page.reload({ waitUntil: 'networkidle' });

expect(
  await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  )
).toBe(true);
```

A final test verifies the theme persists when navigating between routes — not just when staying on one page.

---

## The code review gates

The ESLint step enforces 10 structural rules from the Bear code review checklist:

| Gate | Rule |
|------|------|
| G1 | No magic strings or numbers shared across 2+ places |
| G3 | No HTML comments inside JSX render |
| G4 | No bare `<>` fragments when structure is needed |
| G7 | One component per `.tsx` file |
| G10 | Every folder has a `*.const.ts` and `*.types.ts` |

The remaining gates (G2, G5, G6, G8, G9) are still manual code review items but are documented in the sanity report as `🔍 Manual` — so nothing is forgotten, just not yet automated.

---

## The report

After every run, a markdown file is generated at `Sanity/sanity-release-{version}.md` and committed with the code:

```markdown
# Bear Portal Sanity Report — release/1.2.4

**Date:** 2026-06-14
**Branch:** release/1.2.4
**Overall Status:** ✅ PASSED

## Playwright Sanity Results

| Suite        | Passed | Failed | Total |
|--------------|--------|--------|-------|
| Page Render  |   135  |    0   |  135  |
| Interactions |   119  |    0   |  119  |
| Dark Mode    |    21  |    0   |   21  |
```

Every release now ships with a traceable record of what was tested and what passed.

---

## First run, first real bug

On the very first run — before the suite was even considered stable — all 275 tests failed.

The Playwright console check caught a React error on every single page:

> `Warning: You provided a value prop to a form field without an onChange handler.`
> at `Sidebar.tsx:331`

The `Sidebar` component had a `<select value={activeGroup}>` without an `onChange` handler. It rendered correctly. No visual symptoms. But React logged the error on every page load because the Sidebar is global layout.

Without the suite, this would have shipped. With it, it was caught immediately.

---

## Technical setup notes

The setup uses:

- **Husky** — pre-commit hook runner
- **@playwright/test** — headless Chromium via Playwright's built-in `webServer` config option (auto-starts and stops the portal dev server)
- **generate-report.mjs** — a Node.js script that reads the Playwright JSON output and combines it with ESLint and TypeScript results into the final markdown

The one non-obvious fix: the project uses `"type": "module"` in `package.json`, but Playwright's TypeScript loader needs CommonJS semantics on Node 18.16. The solution is a separate `e2e/package.json` with `"type": "commonjs"` — Node respects the nearest `package.json` for module resolution, so the e2e subtree runs as CJS while the rest of the project stays ESM.

---

## What's next

The remaining manual gates are the natural candidates for custom ESLint rules. G5 (Bear primitives only — no raw `div`/`span` in portal pages) and G9 (all strings via i18n) are well-scoped and could be lint rules in LintForge's next release.

Once those land, the full code review gate runs with zero human involvement on every commit.

---

Bear UI 1.2.4:

```bash
npm install @forgedevstack/bear
```

Repo: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)
