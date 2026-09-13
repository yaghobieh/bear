import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, RadioCard, RadioCardGroup, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof RadioCardGroup> = {
  title: 'Components/RadioCard/RadioCardGroup',
  component: RadioCardGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RadioCardGroup from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    value: 'pro',
    gap: 2,
    name: 'plan',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioCardGroup>;

export const Basic: Story = {
  render: (args) => (
    <RadioCardGroup {...args}>
      <RadioCard value="free" label="Free" description="For getting started" />
      <RadioCard value="pro" label="Pro" description="For product teams" />
      <RadioCard value="team" label="Team" description="For the whole org" />
    </RadioCardGroup>
  ),
};
