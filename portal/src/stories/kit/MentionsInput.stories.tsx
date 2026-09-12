import type { Meta, StoryObj } from '@storybook/react';
import { MentionsInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof MentionsInput> = {
  title: 'Components/MentionsInput',
  component: MentionsInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MentionsInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MentionsInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MentionsInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <MentionsInput {...args} />
      <MentionsInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse MentionsInput anywhere below.</Typography>
        <MentionsInput {...args} />
        <MentionsInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
