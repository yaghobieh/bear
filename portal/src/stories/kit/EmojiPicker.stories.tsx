import type { Meta, StoryObj } from '@storybook/react';
import { EmojiPicker, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof EmojiPicker>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <EmojiPicker {...args}>
      <Typography>EmojiPicker</Typography>
    </EmojiPicker>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <EmojiPicker {...args}>
        <Typography>First</Typography>
      </EmojiPicker>
      <EmojiPicker>
        <Typography>Second</Typography>
      </EmojiPicker>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse EmojiPicker anywhere below.</Typography>
        <EmojiPicker {...args}>
          <Typography>First use</Typography>
        </EmojiPicker>
        <EmojiPicker>
          <Typography>Second use</Typography>
        </EmojiPicker>
      </Flex>
    </BearProvider>
  ),
};
