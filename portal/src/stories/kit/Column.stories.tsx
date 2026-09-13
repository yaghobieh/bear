import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Column, Columns, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Column> = {
  title: 'Components/Columns/Column',
  component: Column,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Column from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    span: 'avoid',
  },
  argTypes: {
    span: { control: 'select', options: ['avoid', 'auto'] },
  },
};

export default meta;

type Story = StoryObj<typeof Column>;

export const Basic: Story = {
  render: (args) => <Column {...args} />,
};
