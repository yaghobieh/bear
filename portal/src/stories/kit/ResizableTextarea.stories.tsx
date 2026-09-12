import type { Meta, StoryObj } from '@storybook/react';
import { ResizableTextarea, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ResizableTextarea> = {
  title: 'Components/ResizableTextarea',
  component: ResizableTextarea,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ResizableTextarea from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ResizableTextarea anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ResizableTextarea>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ResizableTextarea {...args} />
      <ResizableTextarea {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ResizableTextarea anywhere below.</Typography>
        <ResizableTextarea {...args} />
        <ResizableTextarea {...args} />
      </Flex>
    </BearProvider>
  ),
};
