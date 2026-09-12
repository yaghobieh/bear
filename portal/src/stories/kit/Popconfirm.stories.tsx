import type { Meta, StoryObj } from '@storybook/react';
import { Popconfirm, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Popconfirm> = {
  title: 'Components/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Popconfirm from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Popconfirm anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popconfirm>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Popconfirm {...args}>
      <Typography>Popconfirm</Typography>
    </Popconfirm>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Popconfirm {...args}>
        <Typography>First</Typography>
      </Popconfirm>
      <Popconfirm>
        <Typography>Second</Typography>
      </Popconfirm>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Popconfirm anywhere below.</Typography>
        <Popconfirm {...args}>
          <Typography>First use</Typography>
        </Popconfirm>
        <Popconfirm>
          <Typography>Second use</Typography>
        </Popconfirm>
      </Flex>
    </BearProvider>
  ),
};
