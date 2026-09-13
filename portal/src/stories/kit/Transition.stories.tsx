import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BearProvider, Button, Flex, Motion, Transition, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Transition> = {
  title: 'Components/Transition',
  component: Transition,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Transition from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Transition anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { Motion },
  args: {
    show: true,
    duration: 0,
    delay: 0,
    unmountOnHide: false,
  },
  argTypes: {
    show: { control: 'boolean' },
    unmountOnHide: { control: 'boolean' },
    onEnter: { action: 'onEnter' },
    onEntered: { action: 'onEntered' },
    onLeave: { action: 'onLeave' },
    onLeft: { action: 'onLeft' },
  },
};

export default meta;

type Story = StoryObj<typeof Transition>;

export const Basic: Story = {
  render: (args) => <Transition {...args} />,
};

export const Scale: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <Flex direction="column" gap={2}>
        <Button variant="outline" onClick={() => setShow((value) => !value)}>{show ? 'Hide' : 'Show'}</Button>
        <Transition show={show} name="scale" duration={400}>
          <Typography>Scale in</Typography>
        </Transition>
      </Flex>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4}>
        <Transition show name="fade">
          <Typography>First</Typography>
        </Transition>
        <Transition show name="slide-up">
          <Typography>Second, same provider</Typography>
        </Transition>
      </Flex>
    </BearProvider>
  ),
};
