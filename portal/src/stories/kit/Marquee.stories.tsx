import type { Meta, StoryObj } from '@storybook/react';
import { Marquee, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof Marquee>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Marquee {...args}>
      <Typography>Marquee</Typography>
    </Marquee>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Marquee {...args}>
        <Typography>First</Typography>
      </Marquee>
      <Marquee>
        <Typography>Second</Typography>
      </Marquee>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Marquee anywhere below.</Typography>
        <Marquee {...args}>
          <Typography>First use</Typography>
        </Marquee>
        <Marquee>
          <Typography>Second use</Typography>
        </Marquee>
      </Flex>
    </BearProvider>
  ),
};
