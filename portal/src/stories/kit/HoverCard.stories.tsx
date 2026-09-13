import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, Avatar, Badge, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'HoverCard from @forgedevstack/bear. Hover the button to see a profile card. Change side, align, and arrow in Controls.',
      },
    },
  },
  args: {
    side: 'bottom',
    align: 'center',
    openDelay: 200,
    closeDelay: 120,
    arrow: true,
  },
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    arrow: { control: 'boolean' },
    openDelay: { control: { type: 'number', min: 0, max: 1000 } },
    closeDelay: { control: { type: 'number', min: 0, max: 1000 } },
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

const PROFILE_CARD = (
  <Flex direction="column" gap={2}>
    <Flex align="center" gap={2}>
      <Avatar initials="AL" size="md" status="online" />
      <Flex direction="column" gap={1}>
        <Typography variant="subtitle2">Ada Lovelace</Typography>
        <Typography variant="caption">Engineer · London</Typography>
      </Flex>
    </Flex>
    <Typography variant="caption">Wrote the first algorithm intended for a machine. Change side in Controls.</Typography>
    <Badge variant="success">Online</Badge>
  </Flex>
);

export const Basic: Story = {
  render: (args) => (
    <Flex justify="center" style={{ padding: 48 }}>
      <HoverCard {...args} cardContent={PROFILE_CARD}>
        <Button>Hover for profile</Button>
      </HoverCard>
    </Flex>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <Flex gap={3}>
      <HoverCard {...args} side="top" cardContent={<Typography>Top card</Typography>}>
        <Button size="sm">Top</Button>
      </HoverCard>
      <HoverCard {...args} side="bottom" cardContent={<Typography>Bottom card</Typography>}>
        <Button size="sm">Bottom</Button>
      </HoverCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <HoverCard cardContent={<Typography>First hover</Typography>}>
          <Button>One</Button>
        </HoverCard>
        <HoverCard cardContent={<Typography>Reused hover</Typography>}>
          <Button variant="outline">Two</Button>
        </HoverCard>
      </Flex>
    </BearProvider>
  ),
};
