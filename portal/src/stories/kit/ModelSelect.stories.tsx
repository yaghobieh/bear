import type { Meta, StoryObj } from '@storybook/react';
import { ModelSelect, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ModelSelect> = {
  title: 'Components/ModelSelect',
  component: ModelSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ModelSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ModelSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModelSelect>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ModelSelect {...args}>
      <Typography>ModelSelect</Typography>
    </ModelSelect>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ModelSelect {...args}>
        <Typography>First</Typography>
      </ModelSelect>
      <ModelSelect>
        <Typography>Second</Typography>
      </ModelSelect>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ModelSelect anywhere below.</Typography>
        <ModelSelect {...args}>
          <Typography>First use</Typography>
        </ModelSelect>
        <ModelSelect>
          <Typography>Second use</Typography>
        </ModelSelect>
      </Flex>
    </BearProvider>
  ),
};
