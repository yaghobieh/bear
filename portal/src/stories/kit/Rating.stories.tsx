import type { Meta, StoryObj } from '@storybook/react';
import { Rating, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Rating from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Rating anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: 42,
    defaultValue: 42,
    max: 100,
    allowHalf: true,
    allowClear: true,
    disabled: false,
    readOnly: false,
    color: '#EA0A8E',
    showValue: true,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    allowHalf: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    color: { control: 'color' },
    emptyColor: { control: 'color' },
    showValue: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Basic: Story = {
  render: (args) => <Rating {...args} />,
};

export const Large: Story = {
  render: () => <Rating defaultValue={4} size="lg" showValue allowHalf />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Rating value={3} />
        <Rating defaultValue={5} size="sm" />
      </Flex>
    </BearProvider>
  ),
};
