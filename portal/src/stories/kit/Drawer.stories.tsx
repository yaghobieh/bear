import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Drawer, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Drawer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isOpen: false,
    title: 'Title',
    size: 'sm',
    showCloseButton: true,
    closeOnBackdrop: false,
    closeOnEscape: false,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    showCloseButton: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>Open</Button>
        <Drawer {...args} onClose={() => updateArgs({ isOpen: false })}>
          <Typography>Change title and size in Controls, then open again.</Typography>
        </Drawer>
      </>
    );
  },
};

export const Left: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Left drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Left" side="left" size="sm">
          <Typography>Anchored to the left.</Typography>
        </Drawer>
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
          <Drawer isOpen={first} onClose={() => setFirst(false)} title="First">
            <Typography>First drawer</Typography>
          </Drawer>
          <Drawer isOpen={second} onClose={() => setSecond(false)} title="Reuse" side="left">
            <Typography>Second drawer, same provider</Typography>
          </Drawer>
        </Flex>
      </BearProvider>
    );
  },
};
