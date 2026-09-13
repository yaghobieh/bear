import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, Input, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'InputGroup from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse InputGroup anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    required: false,
    fullWidth: false,
  },
  argTypes: {
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Basic: Story = {
  render: (args) => (
    <InputGroup {...args} label="Full Name" helperText="Enter your first and last name" fullWidth>
      <Input placeholder="John Doe" fullWidth />
    </InputGroup>
  ),
};

export const Required: Story = {
  render: () => (
    <InputGroup
      label="Email"
      description="Used for account recovery."
      required
      fullWidth
    >
      <Input type="email" placeholder="you@example.com" fullWidth />
    </InputGroup>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <InputGroup label="First" fullWidth>
          <Input placeholder="First group" fullWidth />
        </InputGroup>
        <InputGroup label="Reuse" fullWidth>
          <Input placeholder="Same provider" fullWidth />
        </InputGroup>
      </Flex>
    </BearProvider>
  ),
};
