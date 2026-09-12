import type { Meta, StoryObj } from '@storybook/react';
import { Cascader, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Cascader> = {
  title: 'Components/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Cascader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Cascader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cascader>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Cascader {...args}>
      <Typography>Cascader</Typography>
    </Cascader>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Cascader {...args}>
        <Typography>First</Typography>
      </Cascader>
      <Cascader>
        <Typography>Second</Typography>
      </Cascader>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Cascader anywhere below.</Typography>
        <Cascader {...args}>
          <Typography>First use</Typography>
        </Cascader>
        <Cascader>
          <Typography>Second use</Typography>
        </Cascader>
      </Flex>
    </BearProvider>
  ),
};
