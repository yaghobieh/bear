import type { Meta, StoryObj } from '@storybook/react';
import { SliderRange, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof SliderRange> = {
  title: 'Components/SliderRange',
  component: SliderRange,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SliderRange from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SliderRange anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SliderRange>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <SliderRange {...args} />
      <SliderRange {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SliderRange anywhere below.</Typography>
        <SliderRange {...args} />
        <SliderRange {...args} />
      </Flex>
    </BearProvider>
  ),
};
