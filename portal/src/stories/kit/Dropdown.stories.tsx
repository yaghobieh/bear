import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Dropdown, Button, BearProvider, Flex } from '@forgedevstack/bear';

const MENU_ITEMS = [
  { key: 'edit', label: 'Edit', onClick: () => undefined },
  { key: 'duplicate', label: 'Duplicate', onClick: () => undefined },
  { key: 'delete', label: 'Delete', danger: true, onClick: () => undefined },
];

const TEAM_ITEMS = [
  { key: 'eng', label: 'Engineering' },
  { key: 'design', label: 'Design' },
  { key: 'pm', label: 'Product' },
  { key: 'qa', label: 'QA' },
  { key: 'devops', label: 'DevOps' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Dropdown anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    items: MENU_ITEMS,
    open: false,
    defaultOpen: false,
    placement: 'bottom-start',
    offset: 8,
    matchWidth: false,
    minWidth: 180,
    maxHeight: 240,
    closeOnSelect: true,
    closeOnClickOutside: true,
    disabled: false,
    searchable: false,
    loading: false,
    loadingText: 'Loading',
    multiSelect: false,
    virtualized: false,
  },
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'bottom', 'top-start', 'top-end', 'top', 'left', 'right'] },
    matchWidth: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    searchable: { control: 'boolean' },
    loading: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
    onSelectionChange: { action: 'onSelectionChange' },
    virtualized: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Dropdown
        {...args}
        trigger={<Button>Open menu</Button>}
        onOpenChange={(open) => updateArgs({ open })}
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown
        trigger={<Button variant="outline">Team</Button>}
        items={TEAM_ITEMS}
        open={open}
        onOpenChange={setOpen}
        searchable
        searchPlaceholder="Filter teams"
      />
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
          <Dropdown
            trigger={<Button>First</Button>}
            items={MENU_ITEMS}
            open={first}
            onOpenChange={setFirst}
          />
          <Dropdown
            trigger={<Button variant="outline">Reuse</Button>}
            items={TEAM_ITEMS}
            open={second}
            onOpenChange={setSecond}
          />
        </Flex>
      </BearProvider>
    );
  },
};
