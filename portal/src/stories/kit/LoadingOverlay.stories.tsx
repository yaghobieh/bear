import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoadingOverlay, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse LoadingOverlay anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    visible: false,
    overlayOpacity: 0,
    overlayBlur: 0,
    zIndex: 0,
    loaderSize: 'sm',
    label: 'Label',
  },
  argTypes: {
    visible: { control: 'boolean' },
    loaderSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.visible));
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <LoadingOverlay {...args} visible={open} />
      </>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <Flex direction="column" gap={2}>
        <Button variant="outline" onClick={() => setVisible((value) => !value)}>
          {visible ? 'Hide' : 'Show'} labeled
        </Button>
        <LoadingOverlay visible={visible} label="Saving..." loaderSize="lg">
          <Typography>Form fields stay underneath.</Typography>
        </LoadingOverlay>
      </Flex>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    return (
      <BearProvider>
        <Flex direction="column" gap={3}>
          <Flex gap={2}>
            <Button onClick={() => setFirst((value) => !value)}>First</Button>
            <Button variant="outline" onClick={() => setSecond((value) => !value)}>Reuse</Button>
          </Flex>
          <LoadingOverlay visible={first}>
            <Typography>First overlay</Typography>
          </LoadingOverlay>
          <LoadingOverlay visible={second} label="Loading">
            <Typography>Second overlay, same provider</Typography>
          </LoadingOverlay>
        </Flex>
      </BearProvider>
    );
  },
};
