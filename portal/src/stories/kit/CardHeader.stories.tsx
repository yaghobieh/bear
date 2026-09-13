import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Card, CardHeader, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/Card/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CardHeader from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardHeader>;

export const Basic: Story = {
  render: (args) => (
    <Card padding="md">
      <CardHeader {...args} />
    </Card>
  ),
};
