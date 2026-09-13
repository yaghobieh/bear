import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Snackbar, Button, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Snackbar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    open: false,
    message: 'Saved',
    description: 'Helper text',
    autoHideDuration: 0,
    offsetX: 0,
    offsetY: 0,
    progress: 0,
    countdownProgress: false,
    showCloseButton: true,
    closeOnClickOutside: false,
  },
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    progressColor: { control: 'color' },
    countdownProgress: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <>
        <Button onClick={() => updateArgs({ open: true })}>Open</Button>
        <Snackbar {...args} onClose={() => updateArgs({ open: false })} />
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Success snackbar</Button>
        <Snackbar
          open={open}
          message="Published"
          description="The page is live."
          severity="success"
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          <Snackbar open={first} message="First snackbar" onClose={() => setFirst(false)} />
          <Snackbar
            open={second}
            message="Second snackbar"
            severity="info"
            onClose={() => setSecond(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          />
        </Flex>
      </BearProvider>
    );
  },
};
