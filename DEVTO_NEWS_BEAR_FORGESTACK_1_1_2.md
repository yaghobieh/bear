# Bear UI 1.1.2 + ForgeStack Ecosystem Update (Kiln, Crucible, CLI)

**Tags (dev.to):** `react` `typescript` `tailwindcss` `opensource` `webdev` `ui` `frontend`

---

The ForgeStack ecosystem just got a major quality pass, and **Bear UI 1.1.2** is the center of it.

This update is not only about new components — it also improves docs, theming control, release flow, and the developer experience across tools like **Kiln**, **Crucible**, and the ForgeStack **CLI**.

---

## What’s New in Bear UI 1.1.2

### New components

- **FormField** (TextField-style behavior)
  - `outlined`, `filled`, and `standard`
  - label starts inside, floats on focus/value
- **AspectRatio**
  - clean media/layout ratio container
- **PasswordInput**
  - visibility toggle
  - shift/caps indicator option
  - custom icon props
- **AlertDialog**
  - confirmation flows with a11y defaults
- **InputGroup**
  - grouped field labels, helper/error structure

### Existing component upgrades

- **Input**
  - `clearable`, `onClear`, `success`, `aria-invalid`
  - character counter support
- **Button**
  - `loadingText`, `aria-busy`
  - icon size consistency fixes
- **ResizableTextarea / RichEditor**
  - improved counter/label/error behavior

---

## Theming Improvements (Big One)

A key goal was making components truly themeable through `BearProvider`.

Now you can centrally override styles (like border, color, font size) for more field-level components, including `FormField` and `Input`, instead of styling each usage manually.

Example:

```tsx
<BearProvider
  components={{
    FormField: {
      input: { borderColor: '#ec4899', fontSize: '15px' },
      label: { color: '#ec4899' },
      outlined: { borderColor: '#f472b6' },
    },
    Input: {
      input: { borderColor: '#ec4899' },
      label: { color: '#ec4899' },
    },
  }}
>
  <App />
</BearProvider>
```

---

## Portal Updates (bearui.com)

- Reworked nav structure
- New **Theming & Customization** documentation sections
- Better **Store** presentation (MUI-inspired structure, no payment flow)
- Improved topbar UX:
  - command-palette style search trigger (`⌘K` / `Ctrl+K`)
  - release/notification updates
  - settings and cookie preferences
- Added Spanish-ready UI strings foundation for key sections

---

## ForgeStack Ecosystem News

### Kiln

Kiln direction is being refined around publishing workflow and better integration patterns with the broader stack.

### Crucible

Crucible continues to evolve as part of the ecosystem roadmap, with focus on practical developer workflows and interoperability.

### ForgeStack CLI

Template flow is expanding and becoming more visible in the portal:

```bash
npx create-forge my-app --template react
```

This is the fastest way to bootstrap with Bear + ForgeStack conventions.

---

## Why this release matters

`1.1.2` is a “developer quality” release:

- better component behavior parity with familiar UI patterns
- cleaner theming system
- stronger docs and discoverability
- tighter ecosystem story (Bear + CLI + tools)

If you already use Bear, this release removes friction.  
If you are new, it makes the first-run experience much smoother.

---

## Links

- Bear UI docs: https://bearui.com
- Bear npm: https://www.npmjs.com/package/@forgedevstack/bear

