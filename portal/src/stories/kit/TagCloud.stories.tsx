import type { Meta, StoryObj } from '@storybook/react';
import { TagCloud, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TagCloud> = {
  title: 'Components/TagCloud',
  component: TagCloud,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TagCloud from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TagCloud anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TagCloud>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <TagCloud {...args}>
      <Typography>TagCloud</Typography>
    </TagCloud>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <TagCloud {...args}>
        <Typography>First</Typography>
      </TagCloud>
      <TagCloud>
        <Typography>Second</Typography>
      </TagCloud>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TagCloud anywhere below.</Typography>
        <TagCloud {...args}>
          <Typography>First use</Typography>
        </TagCloud>
        <TagCloud>
          <Typography>Second use</Typography>
        </TagCloud>
      </Flex>
    </BearProvider>
  ),
};
