import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Radio, RadioGroup, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RadioGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    name: 'plan',
    value: 'pro',
    direction: 'row',
    disabled: false,
    gap: 2,
    label: 'Plan',
    error: false,
    helperText: 'Helper text',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    direction: { control: 'select', options: ['row', 'column'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  ),
};
