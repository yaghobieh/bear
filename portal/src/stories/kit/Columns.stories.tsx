import type { Meta, StoryObj } from '@storybook/react';
import { Columns, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Columns> = {
  title: 'Components/Columns',
  component: Columns,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Columns from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Columns anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Columns>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Columns {...args}>
      <Typography>Columns</Typography>
    </Columns>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Columns {...args}>
        <Typography>First</Typography>
      </Columns>
      <Columns>
        <Typography>Second</Typography>
      </Columns>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Columns anywhere below.</Typography>
        <Columns {...args}>
          <Typography>First use</Typography>
        </Columns>
        <Columns>
          <Typography>Second use</Typography>
        </Columns>
      </Flex>
    </BearProvider>
  ),
};
