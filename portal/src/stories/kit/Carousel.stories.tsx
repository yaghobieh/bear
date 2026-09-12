import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Carousel from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Carousel anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Carousel {...args}>
      <Typography>Carousel</Typography>
    </Carousel>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Carousel {...args}>
        <Typography>First</Typography>
      </Carousel>
      <Carousel>
        <Typography>Second</Typography>
      </Carousel>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Carousel anywhere below.</Typography>
        <Carousel {...args}>
          <Typography>First use</Typography>
        </Carousel>
        <Carousel>
          <Typography>Second use</Typography>
        </Carousel>
      </Flex>
    </BearProvider>
  ),
};
