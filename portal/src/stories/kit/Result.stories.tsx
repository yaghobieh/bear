import type { Meta, StoryObj } from '@storybook/react';
import { Result, BearProvider, Button, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Result> = {
  title: 'Components/Result',
  component: Result,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Result from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Result anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Result>;

export const Basic: Story = {
  render: (args) => <Result {...args} />,
};

export const NotFound: Story = {
  render: () => (
    <Result
      status="404"
      title="Page not found"
      subtitle="The page you are looking for does not exist."
      extra={<Button>Go home</Button>}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Result status="info" title="First" subtitle="Queued" />
        <Result status="error" title="Reuse" subtitle="Try again" extra={<Button variant="outline">Retry</Button>} />
      </Flex>
    </BearProvider>
  ),
};
