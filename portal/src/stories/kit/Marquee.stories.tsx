import type { Meta, StoryObj } from '@storybook/react';
import { Marquee, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Marquee> = {
  title: 'Components/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Marquee from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Marquee anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    speed: 0,
    pauseOnHover: false,
    pauseOnClick: false,
    play: false,
    loop: 0,
    gradient: false,
    gradientWidth: 320,
    gap: 2,
  },
  argTypes: {
    pauseOnHover: { control: 'boolean' },
    pauseOnClick: { control: 'boolean' },
    play: { control: 'boolean' },
    gradient: { control: 'boolean' },
    gradientColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Marquee>;

export const Basic: Story = {
  render: (args) => <Marquee {...args} />,
};

export const Reverse: Story = {
  render: () => (
    <Marquee direction="right" pauseOnHover>
      <Typography>Hover to pause this reverse marquee.</Typography>
    </Marquee>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Marquee>
          <Typography>First use</Typography>
        </Marquee>
        <Marquee direction="right">
          <Typography>Reuse</Typography>
        </Marquee>
      </Flex>
    </BearProvider>
  ),
};
