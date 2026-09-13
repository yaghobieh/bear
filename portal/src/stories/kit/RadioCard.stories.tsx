import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, RadioCard, RadioCardGroup } from '@forgedevstack/bear';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RadioCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RadioCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { RadioCardGroup },
  args: {
    checked: false,
    label: 'Label',
    disabled: false,
    variant: 'default',
    size: 'sm',
  },
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outline', 'filled'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof RadioCard>;

export const Basic: Story = {
  render: (args) => <RadioCard {...args} />,
};

export const WithDescription: Story = {
  render: () => (
    <RadioCard
      value="enterprise"
      label="Enterprise"
      description="Custom pricing"
      variant="outline"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <RadioCard value="free" label="Free" description="$0/month — 1 project" />
        <RadioCard value="pro" label="Pro" description="$19/month — unlimited" checked />
      </Flex>
    </BearProvider>
  ),
};
