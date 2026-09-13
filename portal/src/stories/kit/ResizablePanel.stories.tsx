import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanel, BearProvider, Flex, Paper, Typography } from '@forgedevstack/bear';

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
  args: {
    direction: 'horizontal',
    defaultSize: 40,
    minSize: 0,
    maxSize: 100,
  },
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    onResize: { action: 'onResize' },
  },
};

export default meta;

type Story = StoryObj<typeof ResizablePanel>;

const FirstPane = (
  <Paper padding="md">
    <Typography>First pane</Typography>
  </Paper>
);

const SecondPane = (
  <Paper padding="md">
    <Typography>Second pane</Typography>
  </Paper>
);

export const Basic: Story = {
  render: (args) => <ResizablePanel {...args} />,
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanel
      className="bear-h-80"
      direction="vertical"
      first={<Typography>Top pane</Typography>}
      second={<Typography>Bottom pane</Typography>}
      defaultSize={35}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ResizablePanel anywhere below.</Typography>
        <ResizablePanel className="bear-h-80" first={FirstPane} second={SecondPane} />
        <ResizablePanel
          className="bear-h-80"
          first={<Typography>Reuse left</Typography>}
          second={<Typography>Reuse right</Typography>}
        />
      </Flex>
    </BearProvider>
  ),
};
