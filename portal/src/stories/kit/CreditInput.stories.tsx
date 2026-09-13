import type { Meta, StoryObj } from '@storybook/react';
import { CreditInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof CreditInput> = {
  title: 'Components/CreditInput',
  component: CreditInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CreditInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CreditInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    showName: true,
    disabled: false,
    required: false,
    label: 'Label',
    helperText: 'Helper text',
    validateOnInput: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    showName: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    validateOnInput: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CreditInput>;

export const Basic: Story = {
  render: (args) => <CreditInput {...args} />,
};

export const Split: Story = {
  render: () => (
    <CreditInput
      mode="split"
      showName
      label="Checkout"
      helperText="Name, number, expiry, and CVC"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <CreditInput label="Primary card" />
        <CreditInput label="Reuse" size="sm" variant="outline" />
      </Flex>
    </BearProvider>
  ),
};
