import type { Meta, StoryObj } from '@storybook/react';
import { Heatmap, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Heatmap> = {
  title: 'Components/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Heatmap from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Heatmap anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heatmap>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <Heatmap {...args} />
      <Heatmap {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Heatmap anywhere below.</Typography>
        <Heatmap {...args} />
        <Heatmap {...args} />
      </Flex>
    </BearProvider>
  ),
};
