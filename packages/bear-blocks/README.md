# @forgedevstack/bear-blocks

Free screen blocks built from Bear Core. `DashboardBlock` is the first one: a title and stat cards. Button, Input, Modal, and the theme stay MIT.

```bash
npm install @forgedevstack/bear @forgedevstack/bear-blocks
```

```tsx
import { DashboardBlock } from '@forgedevstack/bear-blocks';

export const App = () => (
  <DashboardBlock
    stats={[
      { id: 'users', title: 'Users', value: '1.2k' },
      { id: 'pro', title: 'Pro', value: '$9/yr' },
    ]}
  />
);
```
