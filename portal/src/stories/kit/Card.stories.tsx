import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Card, CardBody, CardFooter, CardHeader, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Card from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Card anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { CardHeader, CardBody, CardFooter },
  args: {
    variant: 'elevated',
    interactive: false,
    radius: 'sm',
  },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled', 'ghost'] },
    interactive: { control: 'boolean' },
    radius: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'none'] },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} padding="md">
      <Typography variant="h6">Card</Typography>
      <Typography color="muted">Real Bear Card with children.</Typography>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" padding="sm">
      <Typography>Outlined card</Typography>
    </Card>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <Card padding="sm"><Typography>First card</Typography></Card>
        <Card padding="sm"><Typography>Reused card</Typography></Card>
      </Flex>
    </BearProvider>
  ),
};
