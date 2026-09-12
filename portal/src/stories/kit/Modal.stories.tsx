import type { Meta, StoryObj } from '@storybook/react';
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
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Bear modal">
          <Typography>Real modal body. Close and open again to reuse it.</Typography>
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
