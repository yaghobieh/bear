import type { FC } from 'react';
import { DashboardBlock } from '@forgedevstack/bear-blocks';

export const BlocksPreview: FC = () => (
  <DashboardBlock
    stats={[
      { id: 'core', title: 'Core', value: '$0' },
      { id: 'pro', title: 'Pro', value: '$9/yr' },
      { id: 'flutter', title: 'Flutter', value: 'Free' },
    ]}
  />
);
