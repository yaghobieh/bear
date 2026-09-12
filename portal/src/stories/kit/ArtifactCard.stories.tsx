import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactCard, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ArtifactCard> = {
  title: 'Components/ArtifactCard',
  component: ArtifactCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ArtifactCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ArtifactCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArtifactCard>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ArtifactCard {...args}>
      <Typography>ArtifactCard</Typography>
    </ArtifactCard>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ArtifactCard {...args}>
        <Typography>First</Typography>
      </ArtifactCard>
      <ArtifactCard>
        <Typography>Second</Typography>
      </ArtifactCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ArtifactCard anywhere below.</Typography>
        <ArtifactCard {...args}>
          <Typography>First use</Typography>
        </ArtifactCard>
        <ArtifactCard>
          <Typography>Second use</Typography>
        </ArtifactCard>
      </Flex>
    </BearProvider>
  ),
};
