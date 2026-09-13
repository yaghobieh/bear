import type { Meta, StoryObj } from '@storybook/react';
import { Input, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Input from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Input anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@forge.dev',
    helperText: 'Helper text',
    size: 'sm',
    fullWidth: false,
    clearable: false,
    showCharCount: true,
    charCountMax: 100,
    validateOnBlur: false,
    validateOnChange: false,
    loading: false,
    copyable: false,
    floatingLabel: false,
    required: false,
    multiline: false,
    rows: 0,
    minRows: 0,
    maxRows: 100,
    readOnly: false,
    variant: 'outline',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    clearable: { control: 'boolean' },
    onClear: { action: 'onClear' },
    showCharCount: { control: 'boolean' },
    validateOnBlur: { control: 'boolean' },
    validateOnChange: { control: 'boolean' },
    loading: { control: 'boolean' },
    copyable: { control: 'boolean' },
    onCopy: { action: 'onCopy' },
    floatingLabel: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  render: (args) => <Input {...args} />,
};

export const WithLabel: Story = {
  render: (args) => <Input {...args} fullWidth />,
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Input placeholder="First input" />
        <Input placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
