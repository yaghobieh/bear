import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Backdrop, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Backdrop anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    open: false,
    invisible: false,
    blur: false,
    nested: false,
    zIndex: 0,
    transitionDuration: 0,
    keepMounted: false,
  },
  argTypes: {
    open: { control: 'boolean' },
    invisible: { control: 'boolean' },
    blur: { control: 'boolean' },
    nested: { control: 'boolean' },
    keepMounted: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.open));
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Backdrop {...args} open={open} onClick={() => setOpen(false)} />
      </>
    );
  },
};

export const Blur: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Blur backdrop</Button>
        <Backdrop open={open} blur onClick={() => setOpen(false)}>
          <Typography>Blurred scrim</Typography>
        </Backdrop>
      </>
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
          <Button onClick={() => setFirst(true)}>First</Button>
          <Button variant="outline" onClick={() => setSecond(true)}>Reuse</Button>
          <Backdrop open={first} onClick={() => setFirst(false)}>
            <Typography>First backdrop</Typography>
          </Backdrop>
          <Backdrop open={second} blur onClick={() => setSecond(false)}>
            <Typography>Second backdrop, same provider</Typography>
          </Backdrop>
        </Flex>
      </BearProvider>
    );
  },
};
