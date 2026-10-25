# @forgedevstack/bear-grid

Sort, sticky header, and the everyday table stay on `DataTable` in `@forgedevstack/bear` (MIT).

This package adds column pin, row grouping, and an Excel-compatible CSV export. Those three show a Bear Pro watermark until you pass a license key from the pricing page. The intro price is $9 a year.

```bash
npm install @forgedevstack/bear @forgedevstack/bear-grid
```

```tsx
import { BearGrid } from '@forgedevstack/bear-grid';

<BearGrid
  licenseKey={process.env.BEAR_PRO_LICENSE_KEY}
  excelExport
  groupBy="team"
  columns={[
    { key: 'name', header: 'Name', sortable: true, pinned: 'left' },
    { key: 'team', header: 'Team' },
  ]}
  data={rows}
  rowKey={(row) => String(row.name)}
/>
```
