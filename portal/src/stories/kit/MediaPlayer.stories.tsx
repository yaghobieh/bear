import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    src: '/bear.svg',
    autoPlay: false,
    loop: false,
    muted: false,
    nativeControls: false,
    width: 320,
    height: 240,
    centerOverlay: false,
    sticky: false,
    stickySize: 0,
    airPlay: false,
  },
  argTypes: {
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    muted: { control: 'boolean' },
    nativeControls: { control: 'boolean' },
    accentColor: { control: 'color' },
    centerOverlay: { control: 'boolean' },
    sticky: { control: 'boolean' },
    airPlay: { control: 'boolean' },
    onTrackChange: { action: 'onTrackChange' },
  },
};

export default meta;

type Story = StoryObj<typeof MediaPlayer>;

const SAMPLE_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export const Basic: Story = {
  render: (args) => <MediaPlayer {...args} />,
};

export const CenterOverlay: Story = {
  render: () => (
    <MediaPlayer src={SAMPLE_SRC} muted centerOverlay size="sm" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <MediaPlayer src={SAMPLE_SRC} size="sm" />
        <MediaPlayer src={SAMPLE_SRC} muted size="sm" />
      </Flex>
    </BearProvider>
  ),
};
