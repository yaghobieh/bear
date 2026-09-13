import type { Meta, StoryObj } from '@storybook/react';
import { SpeedDial, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const ACTIONS = [
  { label: 'Edit', icon: <Typography>E</Typography>, onClick: () => undefined },
  { label: 'Share', icon: <Typography>S</Typography>, onClick: () => undefined },
  { label: 'Delete', icon: <Typography>D</Typography>, onClick: () => undefined },
];

const meta: Meta<typeof SpeedDial> = {
  title: 'Components/SpeedDial',
  component: SpeedDial,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SpeedDial from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SpeedDial anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    position: 'bottom-right',
    fixed: false,
    openOnHover: false,
    open: false,
    showLabels: true,
  },
  argTypes: {
    position: { control: 'select', options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'] },
    fixed: { control: 'boolean' },
    openOnHover: { control: 'boolean' },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    showLabels: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof SpeedDial>;

export const Basic: Story = {
  render: (args) => <SpeedDial {...args} />,
};

export const Left: Story = {
  render: () => <SpeedDial actions={ACTIONS} direction="left" fixed={false} showLabels size="sm" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={8}>
        <SpeedDial actions={ACTIONS} fixed={false} />
        <SpeedDial actions={ACTIONS} direction="right" fixed={false} showLabels />
      </Flex>
    </BearProvider>
  ),
};
