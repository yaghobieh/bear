import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Card, CardBody, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CardBody> = {
  title: 'Components/Card/CardBody',
  component: CardBody,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CardBody from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardBody>;

export const Basic: Story = {
  render: (args) => (
    <Card padding="md">
      <CardBody {...args} />
    </Card>
  ),
};
