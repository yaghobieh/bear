import type { Meta, StoryObj } from '@storybook/react';
import { BearGrid } from '@forgedevstack/bear-grid';

const ROWS = [
  { name: 'Ada', team: 'Core', plan: 'Free' },
  { name: 'Lin', team: 'Core', plan: 'Free' },
  { name: 'Sam', team: 'Grid', plan: 'Pro' },
];

const meta: Meta<typeof BearGrid> = {
  title: 'Packages/Bear Grid/BearGrid',
  component: BearGrid,
  tags: ['autodocs'],
  args: {
    data: ROWS,
    groupBy: 'team',
    excelExport: true,
    licenseKey: '',
    columns: [
      { key: 'name', header: 'Name', sortable: true, pinned: 'left' },
      { key: 'team', header: 'Team' },
      { key: 'plan', header: 'Plan' },
    ],
    rowKey: (row: { name: string }) => row.name,
  },
};

export default meta;
type Story = StoryObj<typeof BearGrid>;

export const Watermark: Story = {};

export const Licensed: Story = {
  args: { licenseKey: 'bear_pro_AB12_CD34_EF56_GH78' },
};
