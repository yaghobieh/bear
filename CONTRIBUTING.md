# Contributing to Bear UI

Thank you for your interest in contributing to Bear UI! This guide covers the workflow, coding rules, and how to add new components.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yaghobieh/bear.git
cd bear

# Install dependencies
npm install

# Build the library
npm run build

# Run the portal (documentation site)
cd portal
npm install
npm run dev
```

## Project Structure

```
bear/
├── src/
│   ├── components/        # All Bear components
│   │   ├── Button/
│   │   │   ├── Button.types.ts     # TypeScript interfaces
│   │   │   ├── Button.const.ts     # Constants (classes, sizes, etc.)
│   │   │   ├── Button.tsx          # Component implementation
│   │   │   └── index.ts           # Exports
│   │   └── index.ts               # Barrel exports for all components
│   ├── context/           # BearProvider, theme
│   ├── hooks/             # Custom hooks
│   ├── styles/            # CSS files
│   └── utils/             # Shared utilities (cn, deepMerge, etc.)
├── portal/                # Documentation site (Vite + React)
│   ├── src/
│   │   ├── pages/         # Doc pages (one per component)
│   │   ├── components/    # Portal-specific components
│   │   └── constants/     # Navigation, i18n, etc.
├── articles/              # Blog articles for dev.to, Medium, LinkedIn
├── CHANGELOG.md
└── package.json
```

## Adding a New Component

Every component follows the same 4-file pattern:

### 1. Types (`ComponentName.types.ts`)

```typescript
import type { HTMLAttributes, ReactNode } from 'react';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  testId?: string;
}
```

### 2. Constants (`ComponentName.const.ts`)

```typescript
export const ROOT_CLASS = 'Bear-ComponentName';

export const SIZE_CLASSES: Record<string, string> = {
  sm: 'bear-p-2 bear-text-sm',
  md: 'bear-p-3 bear-text-base',
  lg: 'bear-p-4 bear-text-lg',
};
```

All Tailwind classes MUST use `dark:` variants for dark mode.

### 3. Component (`ComponentName.tsx`)

```typescript
import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { ComponentNameProps } from './ComponentName.types';
import { ROOT_CLASS, SIZE_CLASSES } from './ComponentName.const';

export const ComponentName: FC<ComponentNameProps> = (props) => {
  const { variant = 'default', size = 'md', children, className, testId, ...rest } = props;

  return (
    <div className={cn(ROOT_CLASS, SIZE_CLASSES[size], className)} data-testid={testId} {...rest}>
      <Typography variant="body2">{children}</Typography>
    </div>
  );
};

export default ComponentName;
```

### 4. Index (`index.ts`)

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

### 5. Register in barrel export

Add to `src/components/index.ts`:

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

## Coding Rules

- **No inline styles** — Use Tailwind classes or CSS variables.
- **No magic numbers** — All values (sizes, padding, colors) go in `.const.ts`.
- **No code comments** that just narrate what the code does — Only explain non-obvious intent.
- **Types in `.types.ts`** — Never define interfaces inline.
- **Constants in `.const.ts`** — Strings, class maps, default values.
- **Use `cn()` from `@utils`** for class merging.
- **Dark mode** — Every visual class must have a `dark:` variant.
- **Typography** — Use the `Typography` component for text, not raw HTML tags.
- **`testId` prop** — Every component must accept `testId?: string`.
- **Default export** — Every `.tsx` file exports the component as `default` in addition to named export.

## Portal Documentation

For every new component, create a portal page:

```
portal/src/pages/components/ComponentNamePage.tsx
```

Follow the existing pattern: title with `LinesOfCode` badge, `ComponentPreview` sections with live examples, `CodeBlock` for import statement.

Then add:
1. Lazy import in `portal/src/App.tsx`
2. `<Route>` in the routes section
3. Nav entry in `portal/src/constants/navigation.const.ts`

### Live props (interactive playground)

To let users change component props in real time, add a `ComponentPreview` with `editableProps` and `render`:

- **editableProps**: config object. Each key is a prop name; value is `{ type: 'boolean' | 'string' | 'number' | 'select', default: ..., options?: [{ value, label }], placeholder?, min?, max? }`.
- **render**: `(props: LiveProps) => ReactNode` — receives current prop values; return the component with those props.

Example: see Button, ActionIcon, Fieldset, Popconfirm, and Result pages. Any component page can add a "Live props" preview the same way.

## Building

```bash
# Library build
npm run build

# Portal build (Vercel)
cd portal && npm run build
```

Both must pass cleanly before submitting changes.

## Versioning

We follow semver. Version updates go in:
- `package.json`
- `portal/package.json`
- `portal/src/constants/navigation.const.ts` (BEAR_VERSION + VERSIONS array)
- `CHANGELOG.md`
- `portal/src/pages/Introduction.tsx`
- `portal/src/components/Topbar/Topbar.tsx`
