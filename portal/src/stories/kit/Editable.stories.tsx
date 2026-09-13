import type { Meta, StoryObj } from '@storybook/react';
import { Editable, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Editable.Root> = {
  title: 'Components/Editable',
  component: Editable.Root,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Editable from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Editable anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    placeholder: 'Type here',
    isDisabled: false,
    startWithEditView: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onEditSubmit: { action: 'onEditSubmit' },
    onCancel: { action: 'onCancel' },
    isDisabled: { control: 'boolean' },
    startWithEditView: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Editable.Root>;

export const Basic: Story = {
  render: (args) => (
    <Editable.Root {...args}>
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  ),
};

export const Textarea: Story = {
  render: () => (
    <Editable.Root defaultValue="Longer inline copy that edits as a textarea.">
      <Editable.Preview />
      <Editable.Input asTextarea />
    </Editable.Root>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Editable anywhere below.</Typography>
        <Editable.Root defaultValue="First use">
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
        <Editable.Root defaultValue="Reuse" isDisabled>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Flex>
    </BearProvider>
  ),
};
