import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NumberInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NumberInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: 42,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    label: 'Label',
    helperText: 'Helper text',
    placeholder: 'Type here',
    size: 'sm',
    variant: 'default',
    showButtons: true,
    buttonPosition: 'sides',
    precision: 0,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'filled', 'outline'] },
    showButtons: { control: 'boolean' },
    buttonPosition: { control: 'select', options: ['sides', 'right'] },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Basic: Story = {
  render: (args) => <NumberInput {...args} />,
};

export const RightButtons: Story = {
  render: () => (
    <NumberInput value={4} label="Seats" showButtons buttonPosition="right" min={1} max={12} variant="filled" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <NumberInput value={8} label="First count" />
        <NumberInput value={24} label="Reuse" size="sm" variant="outline" />
      </Flex>
    </BearProvider>
  ),
};
