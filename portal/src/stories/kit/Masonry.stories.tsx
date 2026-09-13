import type { Meta, StoryObj } from '@storybook/react';
import { Masonry, BearProvider, Card, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Masonry> = {
  title: 'Components/Masonry',
  component: Masonry,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Masonry from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Masonry anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    gap: 2,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Masonry>;

export const Basic: Story = {
  render: (args) => <Masonry {...args} />,
};

export const Responsive: Story = {
  render: () => (
    <Masonry columns={{ base: 1, md: 2, lg: 3 }} gap={12}>
      <Card padding="sm"><Typography>Alpha</Typography></Card>
      <Card padding="sm"><Typography>Beta</Typography></Card>
      <Card padding="sm"><Typography>Gamma</Typography></Card>
      <Card padding="sm"><Typography>Delta</Typography></Card>
    </Masonry>
  ),
};

export const TightGap: Story = {
  render: () => (
    <Masonry columns={4} gap={8}>
      <Card padding="sm"><Typography>A</Typography></Card>
      <Card padding="sm"><Typography>B</Typography></Card>
      <Card padding="sm"><Typography>C</Typography></Card>
      <Card padding="sm"><Typography>D</Typography></Card>
    </Masonry>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={6}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Masonry anywhere below.</Typography>
        <Masonry columns={3} gap={16}>
          <Card padding="sm"><Typography>First masonry</Typography></Card>
          <Card padding="sm"><Typography>Same provider</Typography></Card>
          <Card padding="sm"><Typography>Theme tokens apply</Typography></Card>
        </Masonry>
        <Masonry columns={2} gap={8}>
          <Card padding="sm"><Typography>Reused masonry</Typography></Card>
          <Card padding="sm"><Typography>Second instance</Typography></Card>
        </Masonry>
      </Flex>
    </BearProvider>
  ),
};
