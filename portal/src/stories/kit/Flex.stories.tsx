import type { Meta, StoryObj } from '@storybook/react';
import { Flex, BearProvider, Button, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Flex from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Flex anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    inline: false,
  },
  argTypes: {
    inline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Basic: Story = {
  render: (args) => <Flex {...args} />,
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Typography>Stacked</Typography>
      <Button size="sm">Action</Button>
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Button size="sm">A</Button>
      <Button size="sm">B</Button>
      <Button size="sm">C</Button>
      <Button size="sm">D</Button>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Flex gap={2}>
          <Button>Row one</Button>
          <Button variant="outline">Same provider</Button>
        </Flex>
        <Flex gap={2}>
          <Button variant="ghost">Reused Flex</Button>
          <Button>Second instance</Button>
        </Flex>
      </Flex>
    </BearProvider>
  ),
};
