import type { Meta, StoryObj } from '@storybook/react';
import { GlowCard, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    children: 'Glow card',
    glowIntensity: 0,
    followMouse: false,
    borderRadius: 0,
    disabled: false,
    borderWidth: 320,
  },
  argTypes: {
    glowColor: { control: 'color' },
    followMouse: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof GlowCard>;

export const Basic: Story = {
  render: (args) => <GlowCard {...args} />,
};

export const Spotlight: Story = {
  render: () => (
    <GlowCard effect="spotlight" followMouse glowColor="#3b82f6">
      <Typography>Spotlight follows the pointer.</Typography>
    </GlowCard>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4} wrap="wrap">
        <GlowCard>
          <Typography>First use</Typography>
        </GlowCard>
        <GlowCard effect="pulse">
          <Typography>Reuse</Typography>
        </GlowCard>
      </Flex>
    </BearProvider>
  ),
};
