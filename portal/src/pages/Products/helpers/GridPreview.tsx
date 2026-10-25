import type { FC } from 'react';
import { BearGrid } from '@forgedevstack/bear-grid';
import { useBearProLicense } from '@/hooks/useBearProLicense';

const ROWS = [
  { name: 'Ada', team: 'Core', plan: 'Free' },
  { name: 'Lin', team: 'Core', plan: 'Free' },
  { name: 'Sam', team: 'Grid', plan: 'Pro' },
];

export const GridPreview: FC = () => {
  const { licenseKey } = useBearProLicense();

  return (
    <BearGrid
      licenseKey={licenseKey}
      groupBy="team"
      excelExport
      columns={[
        { key: 'name', header: 'Name', sortable: true, pinned: 'left' },
        { key: 'team', header: 'Team' },
        { key: 'plan', header: 'Plan' },
      ]}
      data={ROWS}
      rowKey={(row) => row.name}
    />
  );
};
