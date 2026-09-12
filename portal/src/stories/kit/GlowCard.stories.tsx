import type { Meta, StoryObj } from '@storybook/react';
import { GlowCard, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof GlowCard> = {
  title: 'Components/GlowCard',
  component: GlowCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'GlowCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse GlowCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GlowCard>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <GlowCard {...args}>
      <Typography>GlowCard</Typography>
    </GlowCard>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <GlowCard {...args}>
        <Typography>First</Typography>
      </GlowCard>
      <GlowCard>
        <Typography>Second</Typography>
      </GlowCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse GlowCard anywhere below.</Typography>
        <GlowCard {...args}>
          <Typography>First use</Typography>
        </GlowCard>
        <GlowCard>
          <Typography>Second use</Typography>
        </GlowCard>
      </Flex>
    </BearProvider>
  ),
};
