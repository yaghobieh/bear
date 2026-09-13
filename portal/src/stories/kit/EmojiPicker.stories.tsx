import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmojiPicker, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof EmojiPicker> = {
  title: 'Components/EmojiPicker',
  component: EmojiPicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'EmojiPicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse EmojiPicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    size: 'sm',
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof EmojiPicker>;

const SelectDemo = () => {
  const [emoji, setEmoji] = useState('');
  return (
    <Flex direction="column" gap={3}>
      <EmojiPicker onSelect={setEmoji} />
      <Typography>{emoji ? `Selected ${emoji}` : 'Pick an emoji'}</Typography>
    </Flex>
  );
};

export const Basic: Story = {
  render: (args) => <EmojiPicker {...args} />,
};

export const WithSelection: Story = {
  render: () => <SelectDemo />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse EmojiPicker anywhere below.</Typography>
        <EmojiPicker />
        <EmojiPicker size="sm" />
      </Flex>
    </BearProvider>
  ),
};
