# Gemini Video Generation Prompt — Bear UI 1.2.4

## Prompt

Create a short, fast-paced developer product video (60–90 seconds) for **Bear UI 1.2.4**, an open-source React component library.

**Visual style:**
- Dark background (`#0f0f11`), light terminal/code overlay
- Pink/rose accent color (`#f43f5e`) for highlights, call-outs, and Bear UI branding
- Clean sans-serif typography (Inter or similar)
- Minimal, modern — no stock footage, no live actors
- Code and UI elements only

---

**Scene 1 — Hook (0–8s)**

Text appears line by line on screen, typed terminal style:

```
git commit -m "fix: update sidebar"
```

Pause. Then a red banner animates in:

```
❌ Pre-commit checks FAILED
   ✗ Playwright E2E — 1 console error found
   → Sidebar.tsx:331 — value prop without onChange
```

Subtitle below: *"Caught before it shipped."*

---

**Scene 2 — Problem (8–20s)**

Split screen:
- Left: a component library portal with dozens of pages listed (accordion, alert, badge, button...)
- Right: a developer icon frantically clicking through pages manually, checkmarks appearing slowly one by one

Voiceover text overlay:
*"100+ components. Checking them by hand. Every release."*

Then a big X appears across the right panel.

---

**Scene 3 — Solution (20–45s)**

Terminal window fills the screen. Lines appear in sequence:

```
Bear Pre-Commit Quality Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
► Step 1/4 — ESLint            ✓
► Step 2/4 — TypeScript        ✓
► Step 3/4 — Unit Tests        ○ (skipped)
► Step 4/4 — Playwright E2E
```

Then a browser window zooms in — headless Chromium, fast-forwarded:
- Pages flicking through one by one at speed (15 pages/second)
- Green ✓ checks appearing beside each route name

Overlay text:
*"275 tests. Render. Click. Dark mode. Every commit."*

Final line in terminal:
```
✅ All checks passed. Committing.
```

---

**Scene 4 — Report (45–60s)**

A markdown file opens on screen (`Sanity/sanity-release-1.2.4.md`):

```markdown
# Bear Portal Sanity Report — release/1.2.4

Overall Status: ✅ PASSED

| Suite        | Passed | Failed | Total |
|--------------|--------|--------|-------|
| Page Render  |  135   |   0    |  135  |
| Interactions |  119   |   0    |  119  |
| Dark Mode    |   21   |   0    |   21  |
```

Overlay text: *"A record of every test, committed with the code."*

---

**Scene 5 — CTA (60–75s)**

Bear UI logo appears (bear paw icon, pink/rose tone).

Text:
```
Bear UI 1.2.4
Open source React component library

npm install @forgedevstack/bear
github.com/yaghobieh/bear
```

Background: slow pan over the Bear portal homepage rendered in the browser.

Fade to black.

---

## Technical notes for generation

- No voiceover required — text overlays carry the narrative
- Terminal font: JetBrains Mono or Fira Code
- Transition style: instant cuts, no crossfades (matches developer aesthetic)
- Color palette: `#0f0f11` bg, `#f43f5e` accent, `#e2e8f0` text, `#22c55e` success green, `#ef4444` error red
- Duration: 60–75 seconds preferred, 90 seconds max
- Format: 16:9, 1080p minimum
- Optional: subtle typing sound effects for terminal scenes
