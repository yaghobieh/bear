import type { FC } from 'react';
import { DashboardBlock, ListBlock } from '@forgedevstack/bear-blocks';
import { Flex } from '@forgedevstack/bear';

export const BlocksPreview: FC = () => (
  <Flex direction="column" gap={4}>
    <DashboardBlock
      stats={[
        { id: 'core', title: 'Core', value: '$0' },
        { id: 'pro', title: 'Pro', value: '$9/yr' },
        { id: 'flutter', title: 'Flutter', value: 'Free' },
      ]}
    />
    <ListBlock
      items={[
        { id: 'core', title: 'Core', detail: 'Free components' },
        { id: 'blocks', title: 'Blocks', detail: 'Dashboard and list screens' },
      ]}
    />
  </Flex>
);
