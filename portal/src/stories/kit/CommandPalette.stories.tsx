import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandPalette, Button, BearProvider, Flex } from '@forgedevstack/bear';

const COMMANDS = [
  { id: 'new-file', label: 'New File', shortcut: 'Ctrl+N', category: 'File', onSelect: () => undefined },
  { id: 'open', label: 'Open File', shortcut: 'Ctrl+O', category: 'File', onSelect: () => undefined },
  { id: 'save', label: 'Save', shortcut: 'Ctrl+S', category: 'File', onSelect: () => undefined },
  { id: 'search', label: 'Search', shortcut: 'Ctrl+K', category: 'Edit', onSelect: () => undefined },
  { id: 'settings', label: 'Settings', shortcut: 'Ctrl+,', category: 'Edit', onSelect: () => undefined },
  { id: 'theme', label: 'Toggle Theme', category: 'View', onSelect: () => undefined },
];

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CommandPalette anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    open: false,
    placeholder: 'Type here',
    showRecent: true,
    maxRecent: 100,
    groupByCategory: false,
  },
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    showRecent: { control: 'boolean' },
    onRecentChange: { action: 'onRecentChange' },
    groupByCategory: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CommandPalette>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.open));
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <CommandPalette {...args} open={open} onOpenChange={() => setOpen(false)} />
      </>
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Grouped palette</Button>
        <CommandPalette
          commands={COMMANDS.map((command) => ({ ...command, onSelect: () => setOpen(false) }))}
          open={open}
          onOpenChange={setOpen}
          groupByCategory
          showRecent
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
          <CommandPalette
            commands={COMMANDS.map((command) => ({ ...command, onSelect: () => setFirst(false) }))}
            open={first}
            onOpenChange={setFirst}
          />
          <CommandPalette
            commands={COMMANDS.map((command) => ({ ...command, onSelect: () => setSecond(false) }))}
            open={second}
            onOpenChange={setSecond}
            groupByCategory
          />
        </Flex>
      </BearProvider>
    );
  },
};
