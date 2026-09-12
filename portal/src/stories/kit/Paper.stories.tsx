import type { Meta, StoryObj } from '@storybook/react';
import { Paper, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Paper from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Paper anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Paper>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Paper {...args}>
      <Typography>Paper</Typography>
    </Paper>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Paper {...args}>
        <Typography>First</Typography>
      </Paper>
      <Paper>
        <Typography>Second</Typography>
      </Paper>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Paper anywhere below.</Typography>
        <Paper {...args}>
          <Typography>First use</Typography>
        </Paper>
        <Paper>
          <Typography>Second use</Typography>
        </Paper>
      </Flex>
    </BearProvider>
  ),
};
