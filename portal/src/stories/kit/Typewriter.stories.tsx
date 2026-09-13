import type { Meta, StoryObj } from '@storybook/react';
import { Typewriter, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Typewriter> = {
  title: 'Components/Typewriter',
  component: Typewriter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Typewriter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Typewriter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    text: 'Hello Bear',
    speed: 0,
    startDelay: 0,
    deleteDelay: 0,
    deleteSpeed: 0,
    loop: false,
    cursor: false,
    cursorBlinkSpeed: 0,
    as: 'span',
  },
  argTypes: {
    loop: { control: 'boolean' },
    cursor: { control: 'boolean' },
    onComplete: { action: 'onComplete' },
    onWordComplete: { action: 'onWordComplete' },
    as: { control: 'select', options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] },
  },
};

export default meta;

type Story = StoryObj<typeof Typewriter>;

export const Basic: Story = {
  render: (args) => <Typewriter {...args} />,
};

export const LoopingWords: Story = {
  render: () => (
    <Flex gap={1} align="center">
      <Typography>I love</Typography>
      <Typewriter text={['React', 'TypeScript', 'Bear UI']} loop cursor />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typewriter text="First use" cursor />
        <Typewriter text="Reuse below the same provider" cursor />
      </Flex>
    </BearProvider>
  ),
};
