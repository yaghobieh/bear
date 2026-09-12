import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

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
        component: 'Hover Card from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse HoverCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Basic: Story = {
  render: () => (
    <HoverCard cardContent={<Typography>Profile, docs, and actions.</Typography>}>
      <Button variant="outline">Hover me</Button>
    </HoverCard>
  ),
};

export const Sides: Story = {
  render: () => (
    <Flex gap={3}>
      <HoverCard side="top" cardContent={<Typography>Top card</Typography>}>
        <Button size="sm">Top</Button>
      </HoverCard>
      <HoverCard side="bottom" cardContent={<Typography>Bottom card</Typography>}>
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
