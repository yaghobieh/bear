import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Modal, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Modal anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    isOpen: false,
    title: 'Title',
    showCloseButton: true,
    closeOnBackdrop: false,
    closeOnEscape: false,
    disableEscapeKeyDown: false,
    hideBackdrop: false,
    keepMounted: false,
    lockBodyScroll: false,
    zIndex: 0,
    cancelPreventScroll: false,
    isCancelBackgroundClick: false,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    showCloseButton: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    disableEscapeKeyDown: { control: 'boolean' },
    hideBackdrop: { control: 'boolean' },
    keepMounted: { control: 'boolean' },
    lockBodyScroll: { control: 'boolean' },
    cancelPreventScroll: { control: 'boolean' },
    isCancelBackgroundClick: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>Open</Button>
        <Modal {...args} onClose={() => updateArgs({ isOpen: false })}>
          <Typography>Change title and size in Controls.</Typography>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Large modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large" size="lg">
          <Typography>Wider dialog.</Typography>
        </Modal>
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
          <Modal isOpen={first} onClose={() => setFirst(false)} title="First">
            <Typography>First modal</Typography>
          </Modal>
          <Modal isOpen={second} onClose={() => setSecond(false)} title="Reuse">
            <Typography>Second modal, same provider</Typography>
          </Modal>
        </Flex>
      </BearProvider>
    );
  },
};
