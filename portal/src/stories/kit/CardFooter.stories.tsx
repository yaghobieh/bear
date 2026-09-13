import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Card, CardFooter, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CardFooter> = {
  title: 'Components/Card/CardFooter',
  component: CardFooter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CardFooter from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    divider: false,
  },
  argTypes: {
    divider: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CardFooter>;

export const Basic: Story = {
  render: (args) => (
    <Card padding="md">
      <CardFooter {...args} />
    </Card>
  ),
};
