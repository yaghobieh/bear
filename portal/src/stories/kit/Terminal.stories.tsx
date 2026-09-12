import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Terminal> = {
  title: 'Components/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Terminal from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Terminal anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Terminal>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Terminal {...args}>
      <Typography>Terminal</Typography>
    </Terminal>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Terminal {...args}>
        <Typography>First</Typography>
      </Terminal>
      <Terminal>
        <Typography>Second</Typography>
      </Terminal>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Terminal anywhere below.</Typography>
        <Terminal {...args}>
          <Typography>First use</Typography>
        </Terminal>
        <Terminal>
          <Typography>Second use</Typography>
        </Terminal>
      </Flex>
    </BearProvider>
  ),
};
