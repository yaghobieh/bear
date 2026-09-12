import type { Meta, StoryObj } from '@storybook/react';
import { LoadingOverlay, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'LoadingOverlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse LoadingOverlay anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <LoadingOverlay {...args}>
      <Typography>LoadingOverlay</Typography>
    </LoadingOverlay>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <LoadingOverlay {...args}>
        <Typography>First</Typography>
      </LoadingOverlay>
      <LoadingOverlay>
        <Typography>Second</Typography>
      </LoadingOverlay>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse LoadingOverlay anywhere below.</Typography>
        <LoadingOverlay {...args}>
          <Typography>First use</Typography>
        </LoadingOverlay>
        <LoadingOverlay>
          <Typography>Second use</Typography>
        </LoadingOverlay>
      </Flex>
    </BearProvider>
  ),
};
