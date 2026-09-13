import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, Input, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Fieldset> = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Fieldset from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Fieldset anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    variant: 'default',
    radius: 'sm',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'unstyled'] },
    radius: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Basic: Story = {
  render: (args) => (
    <Fieldset {...args} legend="Account" description="Sign-in details">
      <Flex direction="column" gap={2}>
        <Input label="Email" placeholder="you@forge.dev" />
        <Input label="Password" type="password" />
      </Flex>
    </Fieldset>
  ),
};

export const Filled: Story = {
  render: () => (
    <Fieldset legend="Profile" variant="filled" radius="lg">
      <Input label="Display name" placeholder="Ada" />
    </Fieldset>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Fieldset legend="First">
          <Input placeholder="First fieldset" />
        </Fieldset>
        <Fieldset legend="Reuse">
          <Input placeholder="Same provider" />
        </Fieldset>
      </Flex>
    </BearProvider>
  ),
};
