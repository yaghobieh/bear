import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactCard, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    title: 'Title',
  },
  argTypes: {
    onOpen: { action: 'onOpen' },
  },
};

export default meta;

type Story = StoryObj<typeof ArtifactCard>;

export const Basic: Story = {
  render: (args) => <ArtifactCard {...args} />,
};

export const Document: Story = {
  render: () => (
    <ArtifactCard title="Release notes" kind="doc" onOpen={() => undefined}>
      <Typography>Chart grow animation and the component catalog.</Typography>
    </ArtifactCard>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ArtifactCard title="composer.tsx" kind="code">
          <Typography variant="code">{'<PromptComposer onSubmit={send} />'}</Typography>
        </ArtifactCard>
        <ArtifactCard title="preview.html" kind="preview">
          <Typography>Same provider</Typography>
        </ArtifactCard>
      </Flex>
    </BearProvider>
  ),
};
