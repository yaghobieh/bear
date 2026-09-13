import type { Meta, StoryObj } from '@storybook/react';
import { SwitchGroup } from '@forgedevstack/bear';

const OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const meta: Meta<typeof SwitchGroup> = {
  title: 'Components/Switch/SwitchGroup',
  component: SwitchGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SwitchGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    value: 'weekly',
    options: OPTIONS,
    disabled: false,
    orientation: 'horizontal',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof SwitchGroup>;

export const Basic: Story = {
  render: (args) => <SwitchGroup {...args} />,
};
