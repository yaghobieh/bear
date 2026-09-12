import type { Meta, StoryObj } from '@storybook/react';
import { Slider, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Slider from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Slider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Slider {...args} />
      <Slider {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Slider anywhere below.</Typography>
        <Slider {...args} />
        <Slider {...args} />
      </Flex>
    </BearProvider>
  ),
};
