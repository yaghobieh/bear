import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanel, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ResizablePanel> = {
  title: 'Components/ResizablePanel',
  component: ResizablePanel,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ResizablePanel from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ResizablePanel anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ResizablePanel>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ResizablePanel {...args}>
      <Typography>ResizablePanel</Typography>
    </ResizablePanel>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ResizablePanel {...args}>
        <Typography>First</Typography>
      </ResizablePanel>
      <ResizablePanel>
        <Typography>Second</Typography>
      </ResizablePanel>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ResizablePanel anywhere below.</Typography>
        <ResizablePanel {...args}>
          <Typography>First use</Typography>
        </ResizablePanel>
        <ResizablePanel>
          <Typography>Second use</Typography>
        </ResizablePanel>
      </Flex>
    </BearProvider>
  ),
};
