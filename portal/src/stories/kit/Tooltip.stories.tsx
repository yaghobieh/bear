import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Tooltip from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Tooltip anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Hover me',
    position: 'top',
    placement: 'top',
    delay: 0,
    disabled: false,
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: (args) => <Tooltip {...args} />,
};

export const Positions: Story = {
  render: () => (
    <Flex gap={3}>
      <Tooltip content="Top" position="top"><Button size="sm">Top</Button></Tooltip>
      <Tooltip content="Bottom" position="bottom"><Button size="sm">Bottom</Button></Tooltip>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Tooltip content="First"><Button>One</Button></Tooltip>
        <Tooltip content="Reuse"><Button variant="outline">Two</Button></Tooltip>
      </Flex>
    </BearProvider>
  ),
};
