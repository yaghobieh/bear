import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContextMenu, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const ITEMS = [
  { id: 'copy', label: 'Copy', onClick: () => undefined },
  { id: 'paste', label: 'Paste', onClick: () => undefined },
  { id: 'cut', label: 'Cut', onClick: () => undefined },
];

const NESTED_ITEMS = [
  {
    id: 'new',
    label: 'New',
    children: [
      { id: 'file', label: 'File', onClick: () => undefined },
      { id: 'folder', label: 'Folder', onClick: () => undefined },
    ],
  },
  { id: 'open', label: 'Open', onClick: () => undefined },
];

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ContextMenu anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    items: ITEMS,
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Basic: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <Button>Right-click me</Button>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ContextMenu items={NESTED_ITEMS} onOpenChange={setOpen}>
        <Button variant="outline">{open ? 'Menu open' : 'Right-click for submenu'}</Button>
      </ContextMenu>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <ContextMenu items={ITEMS}>
          <Button>First</Button>
        </ContextMenu>
        <ContextMenu items={NESTED_ITEMS}>
          <Button variant="outline">Reuse</Button>
        </ContextMenu>
      </Flex>
    </BearProvider>
  ),
};
