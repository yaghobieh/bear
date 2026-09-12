import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof MediaPlayer> = {
  title: 'Components/MediaPlayer',
  component: MediaPlayer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MediaPlayer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MediaPlayer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaPlayer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <MediaPlayer {...args}>
      <Typography>MediaPlayer</Typography>
    </MediaPlayer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <MediaPlayer {...args}>
        <Typography>First</Typography>
      </MediaPlayer>
      <MediaPlayer>
        <Typography>Second</Typography>
      </MediaPlayer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse MediaPlayer anywhere below.</Typography>
        <MediaPlayer {...args}>
          <Typography>First use</Typography>
        </MediaPlayer>
        <MediaPlayer>
          <Typography>Second use</Typography>
        </MediaPlayer>
      </Flex>
    </BearProvider>
  ),
};
