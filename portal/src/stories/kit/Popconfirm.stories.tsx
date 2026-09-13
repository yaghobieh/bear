import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popconfirm, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Popconfirm> = {
  title: 'Components/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Popconfirm anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    disabled: false,
    variant: 'default',
  },
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onCancel: { action: 'onCancel' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'danger'] },
  },
};

export default meta;

type Story = StoryObj<typeof Popconfirm>;

export const Basic: Story = {
  render: (args) => <Popconfirm {...args} />,
};

export const Danger: Story = {
  render: () => {
    const [confirmed, setConfirmed] = useState(false);
    return (
      <Flex direction="column" gap={2}>
        <Popconfirm
          title="Delete this item?"
          description="This cannot be undone."
          variant="danger"
          confirmText="Delete"
          onConfirm={() => setConfirmed(true)}
        >
          <Button variant="danger">Delete</Button>
        </Popconfirm>
        {confirmed ? <Typography>Deleted</Typography> : null}
      </Flex>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Popconfirm title="First" onConfirm={() => undefined}>
          <Button>First</Button>
        </Popconfirm>
        <Popconfirm title="Reuse" variant="danger" onConfirm={() => undefined}>
          <Button variant="outline">Reuse</Button>
        </Popconfirm>
      </Flex>
    </BearProvider>
  ),
};
