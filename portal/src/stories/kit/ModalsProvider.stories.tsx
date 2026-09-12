import type { Meta, StoryObj } from '@storybook/react';
import { ModalsProvider, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ModalsProvider> = {
  title: 'Components/ModalsProvider',
  component: ModalsProvider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ModalsProvider from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ModalsProvider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalsProvider>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ModalsProvider {...args}>
      <Typography>ModalsProvider</Typography>
    </ModalsProvider>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ModalsProvider {...args}>
        <Typography>First</Typography>
      </ModalsProvider>
      <ModalsProvider>
        <Typography>Second</Typography>
      </ModalsProvider>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ModalsProvider anywhere below.</Typography>
        <ModalsProvider {...args}>
          <Typography>First use</Typography>
        </ModalsProvider>
        <ModalsProvider>
          <Typography>Second use</Typography>
        </ModalsProvider>
      </Flex>
    </BearProvider>
  ),
};
