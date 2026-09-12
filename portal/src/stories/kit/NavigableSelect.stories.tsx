import type { Meta, StoryObj } from '@storybook/react';
import { NavigableSelect, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof NavigableSelect> = {
  title: 'Components/NavigableSelect',
  component: NavigableSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NavigableSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NavigableSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigableSelect>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <NavigableSelect {...args}>
      <Typography>NavigableSelect</Typography>
    </NavigableSelect>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <NavigableSelect {...args}>
        <Typography>First</Typography>
      </NavigableSelect>
      <NavigableSelect>
        <Typography>Second</Typography>
      </NavigableSelect>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse NavigableSelect anywhere below.</Typography>
        <NavigableSelect {...args}>
          <Typography>First use</Typography>
        </NavigableSelect>
        <NavigableSelect>
          <Typography>Second use</Typography>
        </NavigableSelect>
      </Flex>
    </BearProvider>
  ),
};
