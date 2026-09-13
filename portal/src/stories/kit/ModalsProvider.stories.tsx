import type { Meta, StoryObj } from '@storybook/react';
import { ModalsProvider, useModals, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ModalsProvider> = {
  title: 'Components/ModalsProvider',
  component: ModalsProvider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ModalsProvider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ModalsProvider>;

const OpenModalTrigger = () => {
  const { open, close } = useModals();
  return (
    <Button
      onClick={() =>
        open({
          title: 'Bear modal',
          children: <Typography>Real modal body. Close and open again to reuse it.</Typography>,
          footer: <Button onClick={() => close()}>Close</Button>,
        })
      }
    >
      Open modal
    </Button>
  );
};

const ConfirmTrigger = () => {
  const { confirm } = useModals();
  return (
    <Button
      variant="outline"
      onClick={() => {
        void confirm({
          title: 'Delete project?',
          description: 'This cannot be undone.',
          confirmText: 'Delete',
          confirmVariant: 'danger',
        });
      }}
    >
      Confirm
    </Button>
  );
};

const FirstTrigger = () => {
  const { open, close } = useModals();
  return (
    <Button
      onClick={() =>
        open({
          title: 'First',
          children: <Typography>First modal</Typography>,
          footer: <Button onClick={() => close()}>Close</Button>,
        })
      }
    >
      First
    </Button>
  );
};

const ReuseTrigger = () => {
  const { open, close } = useModals();
  return (
    <Button
      variant="outline"
      onClick={() =>
        open({
          title: 'Reuse',
          children: <Typography>Second modal, same provider</Typography>,
          footer: <Button onClick={() => close()}>Close</Button>,
        })
      }
    >
      Reuse
    </Button>
  );
};

export const Basic: Story = {
  render: (args) => (
    <ModalsProvider {...args}>
      <OpenModalTrigger />
    </ModalsProvider>
  ),
};

export const Confirm: Story = {
  render: () => (
    <ModalsProvider>
      <ConfirmTrigger />
    </ModalsProvider>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <ModalsProvider>
          <FirstTrigger />
        </ModalsProvider>
        <ModalsProvider>
          <ReuseTrigger />
        </ModalsProvider>
      </Flex>
    </BearProvider>
  ),
};
