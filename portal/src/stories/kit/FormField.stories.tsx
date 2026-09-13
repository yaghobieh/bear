import type { Meta, StoryObj } from '@storybook/react';
import { FormField, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FormField from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FormField anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    size: 'sm',
    fullWidth: false,
    required: false,
    variant: 'outlined',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Basic: Story = {
  render: (args) => <FormField {...args} />,
};

export const WithError: Story = {
  render: () => (
    <FormField label="Email" error="Invalid email address" placeholder="you@example.com" required />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <FormField label="Name" placeholder="First field" />
        <FormField label="Email" placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
