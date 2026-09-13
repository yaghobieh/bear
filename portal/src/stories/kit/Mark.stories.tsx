import type { Meta, StoryObj } from '@storybook/react';
import { Mark, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Mark> = {
  title: 'Components/Mark',
  component: Mark,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Mark from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Mark anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Highlighted',
    color: 'default',
  },
  argTypes: {
    color: { control: 'select', options: ['default', 'pink', 'blue', 'green', 'red'] },
  },
};

export default meta;

type Story = StoryObj<typeof Mark>;

export const Basic: Story = {
  render: (args) => <Mark {...args} />,
};

export const Colors: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Mark color="pink">Pink</Mark>
      <Mark color="blue">Blue</Mark>
      <Mark color="green">Green</Mark>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Mark>First</Mark>
        <Mark color="red">Reuse</Mark>
      </Flex>
    </BearProvider>
  ),
};
