import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Button, Flex, Menu, MenuDivider, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof MenuDivider> = {
  title: 'Components/Menu/MenuDivider',
  component: MenuDivider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MenuDivider from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MenuDivider>;

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
      <>
        <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open</Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          <MenuDivider {...args} />
        </Menu>
      </>
    );
  },
};
