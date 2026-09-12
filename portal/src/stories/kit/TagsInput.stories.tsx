import type { Meta, StoryObj } from '@storybook/react';
import { TagsInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof TagsInput> = {
  title: 'Components/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TagsInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TagsInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TagsInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <TagsInput {...args} />
      <TagsInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse TagsInput anywhere below.</Typography>
        <TagsInput {...args} />
        <TagsInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
