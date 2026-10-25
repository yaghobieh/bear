import type { Meta, StoryObj } from '@storybook/react';
import { DashboardBlock } from '@forgedevstack/bear-blocks';

const meta: Meta<typeof DashboardBlock> = {
  title: 'Packages/Bear Blocks/DashboardBlock',
  component: DashboardBlock,
  tags: ['autodocs'],
  args: {
    title: 'Dashboard',
    stats: [
      { id: 'core', title: 'Core', value: '$0' },
      { id: 'pro', title: 'Pro', value: '$9/yr' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DashboardBlock>;

export const Free: Story = {};
