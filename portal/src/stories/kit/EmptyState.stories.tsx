import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, BearProvider, Button, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'EmptyState from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse EmptyState anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    size: 'sm',
    variant: 'default',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'card'] },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  render: (args) => <EmptyState {...args} />,
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      action={<Button>Create project</Button>}
      preset="empty"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <EmptyState title="First" description="Empty inbox" preset="inbox" />
        <EmptyState title="Reuse" description="No search hits" preset="search" />
      </Flex>
    </BearProvider>
  ),
};
