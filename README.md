<p align="center">
  <img src="portal/public/bear-icon.svg" width="100" height="110" alt="Bear UI Mascot - Lotso Bear" />
</p>

<h1 align="center">@forgedevstack/bear</h1>

<p align="center">
  <strong>The Foundation for your React UI.</strong><br />
  190+ accessible, customizable React components with TypeScript, AeroCraft CSS tokens, responsive hooks, and signature Lotso bear aesthetics.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@forgedevstack/bear"><img src="https://img.shields.io/npm/v/@forgedevstack/bear.svg?color=db2777" alt="npm version" /></a>
  <a href="https://github.com/yaghobieh/bear/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/components-190+-db2777.svg" alt="Components: 190+" />
  <img src="https://img.shields.io/badge/icons-550+-purple.svg" alt="Icons: 550+" />
  <img src="https://img.shields.io/badge/hooks-25+-blue.svg" alt="Hooks: 25+" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178c6.svg" alt="TypeScript Strict" />
  <a href="https://bearui.com"><img src="https://img.shields.io/badge/docs-bearui.com-db2777.svg" alt="Docs Portal" /></a>
</p>

---

## 🌟 Highlights & What's New in v1.3.4

- 🔘 **ToggleGroup & ToggleGroupItem**: Modern segmented controls supporting single (`type="single"`) and multiple (`type="multiple"`) selections with full WAI-ARIA roving tabindex keyboard navigation.
- 🎯 **Standardized `useFocusTrap`**: Centralized, robust focus trap & focus restore across all overlay components (`Modal`, `Drawer`, `AlertDialog`, `CommandPalette`, `BottomSheet`).
- 🎬 **Overlay Motion Parity**: Unified `openEffect`, `closeEffect`, and compound `effect={{ open, close }}` across `Modal`, `Menu`, `Popover`, `Tooltip`, and `HoverCard`.
- 📐 **Density Parity**: First-class support for `compact`, `normal`, and `comfortable` densities across `Select`, `ChipGroup`, and `AppBar`.
- 🐻 **Lotso Bear Visual Identity**: High-fidelity mascot vectors, dark/light theme integration, and brand new `@bear-icons` (`BearIcon`, `LotsoIcon`, `BearFaceIcon`, `PawIcon`).
- 🤖 **AI Chat Primitives**: Complete streaming chat suite including `PromptComposer`, `StreamingMessage`, `ThinkingBlock`, `PromptSuggestions`, `ToolCall`, and `ContextMeter`.

---

## 📦 Installation

```bash
# Recommended default installation (includes components, themes & icons)
npm install @forgedevstack/bear

# Or with your preferred package manager
pnpm add @forgedevstack/bear
yarn add @forgedevstack/bear
bun add @forgedevstack/bear
```

### Quick Scaffolding with Forge CLI

```bash
npx @forgedevstack/bear init
```

### Lightweight Install (Without Icons)

If you only need core components and wish to omit the icon library, pass the optional omission flag:

```bash
# npm
npm install @forgedevstack/bear --omit=optional

# pnpm
pnpm add @forgedevstack/bear --no-optional

# yarn
yarn add @forgedevstack/bear --ignore-optional
```

### Standalone Icons

```bash
npm install @forgedevstack/bear-icons
```

---

## 🚀 Quick Start

### 1. Import Compiled CSS

Include Bear's compiled stylesheet once in your application entry file (`main.tsx`, `App.tsx`, or `index.css`):

```tsx
import '@forgedevstack/bear/styles.css';
```

### 2. Wrap with BearProvider & Start Building

```tsx
import React, { useState } from 'react';
import {
  BearProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  ToggleGroup,
  ToggleGroupItem,
  Typography,
} from '@forgedevstack/bear';

export function App() {
  const [alignment, setAlignment] = useState('center');

  return (
    <BearProvider>
      <Card className="max-w-md mx-auto p-6 shadow-xl">
        <CardHeader>
          <Typography variant="h4">Bear UI 1.3.4</Typography>
        </CardHeader>
        <CardBody className="space-y-4">
          <Typography variant="body1">
            Choose your layout alignment:
          </Typography>

          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(val) => val && setAlignment(val)}
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>

          <Button variant="primary" fullWidth>
            Confirm Selection ({alignment})
          </Button>
        </CardBody>
      </Card>
    </BearProvider>
  );
}
```

---

## 🎨 Theming & Lotso Color Palette

Bear UI features a built-in strawberry magenta theme inspired by Lotso Bear, with deep contrast and native dark mode support.

```tsx
import { BearProvider } from '@forgedevstack/bear';

<BearProvider
  colorScheme="system" // 'light' | 'dark' | 'system'
  theme={{
    colors: {
      primary: '#db2777', // Lotso Magenta
      accent: '#fed7aa',  // Strawberry Cream
    },
  }}
>
  <App />
</BearProvider>
```

---

## 🧩 Component Suite (190+ Primitives)

| Category | Key Components |
|---|---|
| **Buttons & Action** | `Button`, `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `FAB`, `SpeedDial`, `CopyButton`, `CloseButton`, `SplitButton`, `ActionIcon` |
| **Forms & Input** | `Input`, `Select`, `MultiSelect`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, `Slider`, `TransferList`, `OTPInput`, `DatePicker`, `TimePicker`, `ColorPicker` |
| **AI & Conversational** | `PromptComposer`, `StreamingMessage`, `ThinkingBlock`, `PromptSuggestions`, `MessageActions`, `ChatError`, `ToolCall`, `CitationList`, `ApprovalCard`, `ContextMeter` |
| **Layout & Grid** | `Container`, `Flex`, `Grid`, `Paper`, `Divider`, `ResizablePanel`, `ScrollArea`, `Masonry`, `Dock` |
| **Overlays & Dialogs** | `Modal`, `Drawer`, `AlertDialog`, `Popover`, `Tooltip`, `HoverCard`, `Menu`, `Dropdown`, `BottomSheet`, `CommandPalette` |
| **Data Display** | `DataTable`, `Chart` (Bar/Line/Pie/Radar/Funnel), `Kanban`, `TreeSelect`, `Calendar`, `Timeline`, `DiffViewer`, `JsonViewer`, `CodeEditor` |
| **Feedback & Status** | `Alert`, `Toast`, `BearLoader`, `Spinner`, `Progress`, `Skeleton`, `EmptyState`, `Badge`, `Rating` |

---

## ⚡ Performance & Comparison

| Feature | Bear UI | Material UI | Shadcn / Radix | Chakra UI |
|---|---|---|---|---|
| **Bundle Size (tree-shaken)** | **~18 kB** | ~85 kB | Modular | ~45 kB |
| **Component Count** | **190+** | ~60 | ~45 | ~35 |
| **Included Icons** | **550+** | Addon | Addon (Lucide) | Addon |
| **AI Chat Primitives** | **Built-in** | No | Community | No |
| **Zero Runtime CSS-in-JS** | **Yes (AeroCraft)**| No (Emotion) | Yes (Tailwind) | No (Emotion) |
| **Density Parity** | **Compact / Normal / Comfortable** | Limited | Manual | Limited |
| **TypeScript Strict** | **100%** | 100% | 100% | 100% |

---

## 🛠️ Testing & Verification

```bash
# Run unit & component build
npm run build

# Portal E2E Smoke Tests
cd portal && npm run test:e2e:smoke

# Full Playwright Suite
cd portal && npm run test:e2e
```

---

## 🤝 Community & Contributing

- **Live Documentation**: [https://bearui.com](https://bearui.com)
- **Storybook**: Run `npm run storybook` in `/portal` or explore [bearui.com/storybook](https://bearui.com/storybook/)
- **Contributing**: Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening pull requests.

## 📄 License

Bear UI is open-source software licensed under the [MIT License](./LICENSE). Built with 💖 by John Yaghobieh & the ForgeStack Team.
