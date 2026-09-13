import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { BottomSheet, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BottomSheet anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isOpen: false,
    title: 'Title',
    showCloseButton: true,
    closeOnBackdrop: false,
    closeOnEscape: false,
    showHandle: true,
    enableScroll: false,
    isSticky: false,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    showCloseButton: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showHandle: { control: 'boolean' },
    enableScroll: { control: 'boolean' },
    isSticky: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>Open</Button>
        <BottomSheet {...args} onClose={() => updateArgs({ isOpen: false })}>
          <Typography>Change title in Controls, then open again.</Typography>
        </BottomSheet>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Large sheet</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large" size="lg">
          <Typography>Taller sheet with more room.</Typography>
        </BottomSheet>
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
          <BottomSheet isOpen={first} onClose={() => setFirst(false)} title="First">
            <Typography>First sheet</Typography>
          </BottomSheet>
          <BottomSheet isOpen={second} onClose={() => setSecond(false)} title="Reuse" size="sm">
            <Typography>Second sheet, same provider</Typography>
          </BottomSheet>
        </Flex>
      </BearProvider>
    );
  },
};
