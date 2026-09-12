import type { Meta, StoryObj } from '@storybook/react';
import { Grid, BearProvider, Card, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Grid from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Grid anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  render: () => (
    <Grid cols={3} gap={3}>
      <Card padding="sm"><Typography>One</Typography></Card>
      <Card padding="sm"><Typography>Two</Typography></Card>
      <Card padding="sm"><Typography>Three</Typography></Card>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid cols={2} gap={4}>
      <Card padding="sm"><Typography>Left</Typography></Card>
      <Card padding="sm"><Typography>Right</Typography></Card>
    </Grid>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Grid cols={3} gap={2}>
          <Card padding="sm"><Typography>A</Typography></Card>
          <Card padding="sm"><Typography>B</Typography></Card>
          <Card padding="sm"><Typography>C</Typography></Card>
        </Grid>
        <Grid cols={2} gap={2}>
          <Card padding="sm"><Typography>Reuse</Typography></Card>
          <Card padding="sm"><Typography>Again</Typography></Card>
        </Grid>
      </Flex>
    </BearProvider>
  ),
};
