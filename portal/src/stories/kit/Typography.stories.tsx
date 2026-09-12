import type { Meta, StoryObj } from '@storybook/react';
import { Typography, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Typography from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Typography anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Basic: Story = {
  render: () => <Typography variant="h4">Bear UI</Typography>,
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Typography variant="h5">Heading</Typography>
      <Typography>Body copy</Typography>
      <Typography color="muted">Muted</Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Typography variant="h6">First use</Typography>
        <Typography color="muted">Reuse below the same provider</Typography>
      </Flex>
    </BearProvider>
  ),
};
