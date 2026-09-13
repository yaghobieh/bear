import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Popover anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    trigger: 'click',
    open: false,
    arrow: false,
    closeOnClickOutside: false,
    closeOnEscape: false,
    offset: 0,
  },
  argTypes: {
    trigger: { control: 'select', options: ['click', 'hover'] },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    arrow: { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: (args) => <Popover {...args} />,
};

export const Hover: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        trigger="hover"
        placement="top"
        open={open}
        onOpenChange={setOpen}
        content={<Typography>Hover details.</Typography>}
      >
        <Button variant="outline">Hover me</Button>
      </Popover>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    return (
      <BearProvider>
        <Flex gap={2}>
          <Popover
            open={first}
            onOpenChange={setFirst}
            content={<Typography>First popover</Typography>}
          >
            <Button>First</Button>
          </Popover>
          <Popover
            open={second}
            onOpenChange={setSecond}
            placement="bottom-end"
            content={<Typography>Second popover, same provider</Typography>}
          >
            <Button variant="outline">Reuse</Button>
          </Popover>
        </Flex>
      </BearProvider>
    );
  },
};
