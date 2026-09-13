import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ActiveBar, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ActiveBar> = {
  title: 'Components/ActiveBar',
  component: ActiveBar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ActiveBar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ActiveBar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    items: [
      { id: 'home', label: 'Home' },
      { id: 'docs', label: 'Docs' },
      { id: 'api', label: 'API' },
    ],
    activeId: 'home',
    fullWidth: false,
    animated: true,
  },
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    fullWidth: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ActiveBar>;

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'docs', label: 'Docs' },
  { id: 'api', label: 'API' },
];

export const Basic: Story = {
  render: (args) => <ActiveBar {...args} />,
};

export const Underline: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('docs');
    return (
      <ActiveBar
        variant="underline"
        items={ITEMS}
        activeId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState('home');
    const [second, setSecond] = useState('api');
    return (
      <BearProvider>
        <Flex direction="column" gap={4}>
          <ActiveBar items={ITEMS} activeId={first} onItemClick={(item) => setFirst(item.id)} />
          <ActiveBar variant="underline" items={ITEMS} activeId={second} onItemClick={(item) => setSecond(item.id)} />
        </Flex>
      </BearProvider>
    );
  },
};
