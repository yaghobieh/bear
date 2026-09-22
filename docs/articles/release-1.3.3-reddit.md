# Reddit-friendly post: Bear UI (use this for r/reactjs)

**Repo (put this first in your actual Reddit post):** https://github.com/yaghobieh/bear

---

**Suggested titles (pick one):**

- Open-source React UI kit we actually use: one provider, optional icons, typed overlays — repo inside
- What we put in our React component library (forms, overlays, charts, chat) and why those choices
- MIT React + TypeScript UI kit: theme, density, optional icons, Storybook — source in the post

---

**Suggested post body (whole-kit idea, repo first):**

Repo: https://github.com/yaghobieh/bear
Docs: https://bearui.com
npm: `@forgedevstack/bear` **1.3.3** (MIT)

We maintain a React + TypeScript UI kit for our own apps. The goal is one install that covers the boring chrome **and** the parts we kept rewriting: overlays, dates, charts, and now an AI chat surface. Sharing the idea and the inventory so you can judge the API, not a landing page.

**Why we built it this way**

- **One `BearProvider`.** Mode (`light` / `dark` / `system`), density, direction (RTL), `reducedMotion`, and default props live in one place. Components read that instead of each app inventing a theme wrapper.
- **Types are the docs.** Props are TypeScript-first. Public roots get a stable `useBearId` (`Bear-Button-…`) so tests and labels do not fight generated ids.
- **CSS you own.** Shipped `styles.css` plus BEM (`Bear-*`). AeroCraft utilities for layout. You are not locked into a CSS-in-JS runtime.
- **Icons are optional.** Default `npm install @forgedevstack/bear` includes `@forgedevstack/bear-icons`. Skip them with `--omit=optional` (Yarn `--ignore-optional`, pnpm `--no-optional`). Select chrome does not import the icon package, so that install still works.
- **Overlays share one positioner.** Select, DatePicker, Menu, Drawer, etc. use the same open/close effects and a shared fixed-anchor hook so menus do not jump to `0,0` on first paint.
- **No extra animation library.** Motion and transitions are first-party. Charts animate with scale, not `height`/`width` that freeze at zero.

**What is in the box**

Layout: `Flex`, `Grid`, `Container`, `AppShell`, `ResizablePanel`, `ScrollArea`.

Forms: `Input`, `Select`, `MultiSelect`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DatePicker`, `DateRangePicker`, `TimePicker`, `OTPInput`, `PhoneInput`, `FileUpload`, `Form` / `FormField` / `FormControl`.

Overlays: `Modal`, `Drawer` (`temporary` | `persistent` | `permanent`), `Popover`, `Tooltip`, `Menu`, `Dropdown`, `AlertDialog`, `CommandPalette`, `Spotlight`.

Data / media: `DataTable`, `TreeView`, `Carousel`, `RichEditor`, `CodeEditor`, `Chart` (bar, line, pie, radar, funnel), `Gauge`, `Sparkline`, `Heatmap`.

App chrome: `AppBar`, `Sidebar`, `Tabs`, `Stepper`, `Breadcrumbs`, `Toast`, `EmptyState` presets, skeletons (`FormSkeleton`, `TableSkeleton`).

Chat kit (1.3.3): `PromptComposer`, `StreamingMessage`, `ThinkingBlock`, `PromptSuggestions`, `MessageActions`, `CitationList`, `ApprovalCard`, `ModelSelect`, `ContextMeter`, `Chat` / `FloatingChat` (stick-to-bottom only when you are already at the bottom; live region for tokens).

**How you start**

```tsx
import { BearProvider, Button, Flex } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export function App() {
  return (
    <BearProvider colorScheme="system">
      <Flex gap={2}>
        <Button>Primary</Button>
      </Flex>
    </BearProvider>
  );
}
```

Docs pages open **Storybook** at `/storybook/` (same Vercel deploy) and **CodeSandbox** for that component. There is no fake in-portal sandbox.

If you care about API shape — density inheritance, overlay effects, optional icons, or the chat split (`isLoading` vs `isTyping`) — the code is in the repo. We would rather debate those choices than collect signups.

---

**First comment after posting:**

Storybook: https://bearui.com/storybook/
Install without icons: `npm i @forgedevstack/bear --omit=optional`
Changelog is in the repo under 1.3.3. Happy to walk through `BearProvider`, `useBearId`, or the overlay positioner if that is the interesting part.

---

**Before you post:**

1. Put the repo link at the very top of the post body.
2. Comment on other r/reactjs threads first so this is not the only activity on the account.
3. Reply to technical questions in the thread.
4. Read r/reactjs self-promo / show-your-work rules before submitting.
