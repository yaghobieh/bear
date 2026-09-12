import type { Meta, StoryObj } from '@storybook/react';
import { Alert, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Feedback from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Alert anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    children: 'Heads up from Bear',
    severity: 'info',
  },
};

export const Severities: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Alert severity="success">Saved</Alert>
      <Alert severity="warning">Check this</Alert>
      <Alert severity="error">Failed</Alert>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Alert severity="info">First use</Alert>
        <Alert severity="success">Reuse below the same provider</Alert>
      </Flex>
    </BearProvider>
  ),
};
