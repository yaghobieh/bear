import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Button, Flex, Menu, MenuItem, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MenuItem from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    disabled: false,
    selected: false,
    divider: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    divider: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
      <>
        <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open</Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          <MenuItem {...args} />
        </Menu>
      </>
    );
  },
};
