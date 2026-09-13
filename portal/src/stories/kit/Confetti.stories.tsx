import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Confetti, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Confetti> = {
  title: 'Components/Confetti',
  component: Confetti,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Confetti from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Confetti anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    active: false,
    count: 0,
    duration: 0,
    originX: 0,
    originY: 0,
    spread: 0,
    velocity: 0,
    gravity: 0,
    autoHide: false,
  },
  argTypes: {
    active: { control: 'boolean' },
    colors: { control: 'color' },
    autoHide: { control: 'boolean' },
    onComplete: { action: 'onComplete' },
  },
};

export default meta;

type Story = StoryObj<typeof Confetti>;

const FireDemo = () => {
  const [active, setActive] = useState(false);
  return (
    <Flex direction="column" gap={3}>
      <Button onClick={() => setActive(true)}>Celebrate</Button>
      <Confetti active={active} onComplete={() => setActive(false)} />
    </Flex>
  );
};

const GoldDemo = () => {
  const [active, setActive] = useState(false);
  return (
    <Flex direction="column" gap={3}>
      <Button variant="secondary" onClick={() => setActive(true)}>
        Golden celebration
      </Button>
      <Confetti
        active={active}
        colors={['#FFD700', '#FFA500', '#FF8C00', '#FF6347']}
        onComplete={() => setActive(false)}
      />
    </Flex>
  );
};

export const Basic: Story = {
  render: (args) => <Confetti {...args} />,
};

export const CustomColors: Story = {
  render: () => <GoldDemo />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Confetti anywhere below.</Typography>
        <FireDemo />
        <GoldDemo />
      </Flex>
    </BearProvider>
  ),
};
