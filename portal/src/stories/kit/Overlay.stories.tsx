import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Overlay, Button, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Overlay anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    visible: false,
    opacity: 0,
    color: '#EA0A8E',
    blur: 0,
    zIndex: 0,
    fixed: false,
  },
  argTypes: {
    visible: { control: 'boolean' },
    color: { control: 'color' },
    fixed: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.visible));
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Overlay {...args} visible={open} onClick={() => setOpen(false)} />
      </>
    );
  },
};

export const Blur: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setVisible(true)}>Blur overlay</Button>
        <Overlay visible={visible} fixed blur={4} opacity={0.4} onClick={() => setVisible(false)} />
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
          <Overlay visible={first} fixed onClick={() => setFirst(false)} />
          <Overlay visible={second} fixed blur={4} opacity={0.4} onClick={() => setSecond(false)} />
        </Flex>
      </BearProvider>
    );
  },
};
