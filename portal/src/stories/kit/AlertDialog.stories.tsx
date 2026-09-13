import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertDialog, Button, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AlertDialog anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isOpen: false,
    title: 'Title',
    description: 'Helper text',
    loading: false,
    loadingText: 'Loading',
    closeOnBackdrop: false,
    closeOnEscape: false,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    onConfirm: { action: 'onConfirm' },
    loading: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.isOpen));
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <AlertDialog {...args} isOpen={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete project</Button>
        <AlertDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Delete project?"
          description="This will permanently delete the project and all its data."
          confirmText="Delete"
          confirmVariant="danger"
        />
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
          <AlertDialog
            isOpen={first}
            onClose={() => setFirst(false)}
            onConfirm={() => setFirst(false)}
            title="First"
            description="First alert"
          />
          <AlertDialog
            isOpen={second}
            onClose={() => setSecond(false)}
            onConfirm={() => setSecond(false)}
            title="Reuse"
            description="Second alert, same provider"
          />
        </Flex>
      </BearProvider>
    );
  },
};
