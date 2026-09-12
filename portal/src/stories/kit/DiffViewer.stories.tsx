import type { Meta, StoryObj } from '@storybook/react';
import { DiffViewer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof DiffViewer> = {
  title: 'Components/DiffViewer',
  component: DiffViewer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DiffViewer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DiffViewer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiffViewer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <DiffViewer {...args}>
      <Typography>DiffViewer</Typography>
    </DiffViewer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <DiffViewer {...args}>
        <Typography>First</Typography>
      </DiffViewer>
      <DiffViewer>
        <Typography>Second</Typography>
      </DiffViewer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse DiffViewer anywhere below.</Typography>
        <DiffViewer {...args}>
          <Typography>First use</Typography>
        </DiffViewer>
        <DiffViewer>
          <Typography>Second use</Typography>
        </DiffViewer>
      </Flex>
    </BearProvider>
  ),
};
