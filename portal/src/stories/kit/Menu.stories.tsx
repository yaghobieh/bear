import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Menu, MenuItem, MenuDivider, Button, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Menu anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { MenuItem, MenuDivider },
  args: {
    open: false,
    position: 'bottom-start',
    minWidth: 320,
    maxHeight: 240,
  },
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    position: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
      <>
        <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open menu</Button>
        <Menu {...args} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
        </Menu>
      </>
    );
  },
};

export const WithDivider: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
      <>
        <Button variant="outline" onClick={(event) => setAnchorEl(event.currentTarget)}>Account</Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} position="bottom-end">
          <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Duplicate</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState<HTMLElement | null>(null);
    const [second, setSecond] = useState<HTMLElement | null>(null);
    return (
      <BearProvider>
        <Flex gap={2}>
          <Button onClick={(event) => setFirst(event.currentTarget)}>First</Button>
          <Button variant="outline" onClick={(event) => setSecond(event.currentTarget)}>Reuse</Button>
          <Menu open={Boolean(first)} anchorEl={first} onClose={() => setFirst(null)}>
            <MenuItem onClick={() => setFirst(null)}>First item</MenuItem>
          </Menu>
          <Menu open={Boolean(second)} anchorEl={second} onClose={() => setSecond(null)}>
            <MenuItem onClick={() => setSecond(null)}>Reuse item</MenuItem>
          </Menu>
        </Flex>
      </BearProvider>
    );
  },
};
