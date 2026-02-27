# Bear UI 1.1.2 and the ForgeStack Ecosystem: A Practical Update

Teams don’t usually struggle because they lack components.  
They struggle because component behavior, theming, docs, and setup flow are inconsistent.

That is the problem we targeted with **Bear UI 1.1.2** and the latest ForgeStack ecosystem updates.

---

## Bear UI 1.1.2: What changed

This release introduces new building blocks:

- **FormField** with TextField-style interactions
- **AspectRatio**
- **PasswordInput**
- **AlertDialog**
- **InputGroup**

It also improves existing components:

- `Input`: clear action, success state, accessibility improvements
- `Button`: loading text support and better loading semantics
- `ResizableTextarea` and `RichEditor`: improved field consistency and counter behavior

Together, these changes reduce custom glue code in forms and interaction-heavy screens.

---

## Form behavior that feels familiar

One specific focus was making field behavior match developer expectations:

- label starts inside the input
- label moves to the top on focus or typed value
- consistent visual behavior across outlined/filled/standard styles

This matters because tiny mismatches in field UX are surprisingly expensive over time.

---

## Better theming through BearProvider

A major part of this release is practical theming.

Instead of one-off CSS overrides, you can now configure component style behavior globally through `BearProvider` for field-level components, including `FormField` and `Input`.

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

This gives teams one source of truth for visual consistency.

---

## Portal improvements: less noise, faster discovery

The docs portal got major UX updates:

- clearer navigation structure
- richer theming/customization docs
- improved component API documentation flow
- better topbar actions (search trigger, settings, updates, cookies)
- store section rebuilt with template discovery in mind

Search is now intentionally aligned around a command-style entry point (`⌘K` / `Ctrl+K`) rather than duplicating similar search controls.

---

## ForgeStack ecosystem snapshot

The release also reflects broader ecosystem momentum:

- **Kiln**: publishing and integration direction is being streamlined
- **Crucible**: evolving as part of core workflow tooling
- **ForgeStack CLI**: stronger template-first onboarding via:

```bash
npx create-forge my-app --template react
```

This is central to the vision: fast setup with sane defaults, then deep customization when needed.

---

## Final thought

`1.1.2` is not a flashy one-feature release.  
It is an engineering quality release.

It improves how components behave, how teams theme them, and how developers navigate the ecosystem from docs to setup.

If you are building React products with Tailwind + TypeScript, this update is designed to remove friction where it actually appears.

---

## Links

- Bear UI docs: https://bearui.com
- npm package: https://www.npmjs.com/package/@forgedevstack/bear

