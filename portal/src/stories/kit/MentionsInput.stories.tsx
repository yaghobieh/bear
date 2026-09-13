import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MentionsInput, BearProvider, Flex } from '@forgedevstack/bear';
import type { MentionOption } from '@forgedevstack/bear';

const meta: Meta<typeof MentionsInput> = {
  title: 'Components/MentionsInput',
  component: MentionsInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MentionsInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MentionsInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    placeholder: 'Type here',
    disabled: false,
    maxSuggestions: 100,
    size: 'sm',
    fullWidth: false,
    multiline: false,
    rows: 0,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onMentionSelect: { action: 'onMentionSelect' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    multiline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof MentionsInput>;

const OPTIONS: MentionOption[] = [
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'bob', label: 'Bob Smith' },
  { value: 'carol', label: 'Carol Williams' },
];

export const Basic: Story = {
  args: {
    options: OPTIONS,
    placeholder: 'Type @ to mention...',
  },
  render: (args) => <MentionsInput {...args} />,
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <MentionsInput
        multiline
        rows={3}
        value={value}
        onChange={(next) => setValue(next)}
        options={OPTIONS}
        placeholder="Write a message, @mention teammates..."
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <MentionsInput options={OPTIONS} placeholder="First mention field" />
        <MentionsInput options={OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
