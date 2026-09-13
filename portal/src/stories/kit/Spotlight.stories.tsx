import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Spotlight, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const ACTIONS = [
  { id: '1', label: 'Home', description: 'Go to homepage', group: 'Navigation', onTrigger: () => undefined },
  { id: '2', label: 'Settings', description: 'Open settings', group: 'Navigation', onTrigger: () => undefined },
  { id: '3', label: 'Profile', description: 'View your profile', group: 'Navigation', onTrigger: () => undefined },
  { id: '4', label: 'Toggle Dark Mode', description: 'Switch theme', group: 'Actions', onTrigger: () => undefined },
  { id: '5', label: 'Search Users', description: 'Find users by name', group: 'Actions', keywords: ['find', 'people'], onTrigger: () => undefined },
];

const meta: Meta<typeof Spotlight> = {
  title: 'Components/Spotlight',
  component: Spotlight,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Spotlight from @forgedevstack/bear. Open from the button or the open control. Type to filter actions.',
      },
    },
  },
  args: {
    actions: ACTIONS,
    open: false,
    placeholder: 'Search commands',
    shortcutMod: true,
    highlightMatches: true,
    limit: 8,
  },
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    shortcutMod: { control: 'boolean' },
    highlightMatches: { control: 'boolean' },
    limit: { control: { type: 'number', min: 1, max: 20 } },
  },
};

export default meta;

type Story = StoryObj<typeof Spotlight>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Flex direction="column" gap={3}>
        <Typography>Click Open command palette, or turn open on in Controls.</Typography>
        <Button onClick={() => updateArgs({ open: true })}>Open command palette</Button>
        <Spotlight
          {...args}
          actions={ACTIONS.map((action) => ({
            ...action,
            onTrigger: () => updateArgs({ open: false }),
          }))}
          onOpenChange={(open) => updateArgs({ open })}
        />
      </Flex>
    );
  },
};

export const Highlighted: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Highlight matches</Button>
        <Spotlight
          actions={ACTIONS.map((action) => ({ ...action, onTrigger: () => setOpen(false) }))}
          open={open}
          onOpenChange={setOpen}
          highlightMatches
          placeholder="Search actions"
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
          <Spotlight
            actions={ACTIONS.map((action) => ({ ...action, onTrigger: () => setFirst(false) }))}
            open={first}
            onOpenChange={setFirst}
          />
          <Spotlight
            actions={ACTIONS.map((action) => ({ ...action, onTrigger: () => setSecond(false) }))}
            open={second}
            onOpenChange={setSecond}
            highlightMatches
          />
        </Flex>
      </BearProvider>
    );
  },
};
