import type { Meta, StoryObj } from '@storybook/react';
import { Descriptions, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Descriptions> = {
  title: 'Components/Descriptions',
  component: Descriptions,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Descriptions from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Descriptions anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Descriptions>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Descriptions {...args}>
      <Typography>Descriptions</Typography>
    </Descriptions>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Descriptions {...args}>
        <Typography>First</Typography>
      </Descriptions>
      <Descriptions>
        <Typography>Second</Typography>
      </Descriptions>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Descriptions anywhere below.</Typography>
        <Descriptions {...args}>
          <Typography>First use</Typography>
        </Descriptions>
        <Descriptions>
          <Typography>Second use</Typography>
        </Descriptions>
      </Flex>
    </BearProvider>
  ),
};
