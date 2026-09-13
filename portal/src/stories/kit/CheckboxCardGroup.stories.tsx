import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, CheckboxCard, CheckboxCardGroup, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CheckboxCardGroup> = {
  title: 'Components/CheckboxCard/CheckboxCardGroup',
  component: CheckboxCardGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CheckboxCardGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    value: ['email'],
    gap: 2,
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCardGroup>;

export const Basic: Story = {
  render: (args) => (
    <CheckboxCardGroup {...args}>
      <CheckboxCard value="email" label="Email" />
      <CheckboxCard value="sms" label="SMS" />
    </CheckboxCardGroup>
  ),
};
