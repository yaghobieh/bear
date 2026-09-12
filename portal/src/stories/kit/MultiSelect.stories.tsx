import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MultiSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MultiSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <MultiSelect {...args}>
      <Typography>MultiSelect</Typography>
    </MultiSelect>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <MultiSelect {...args}>
        <Typography>First</Typography>
      </MultiSelect>
      <MultiSelect>
        <Typography>Second</Typography>
      </MultiSelect>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse MultiSelect anywhere below.</Typography>
        <MultiSelect {...args}>
          <Typography>First use</Typography>
        </MultiSelect>
        <MultiSelect>
          <Typography>Second use</Typography>
        </MultiSelect>
      </Flex>
    </BearProvider>
  ),
};
