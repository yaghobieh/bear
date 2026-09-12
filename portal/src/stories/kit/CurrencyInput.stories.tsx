import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CurrencyInput> = {
  title: 'Components/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CurrencyInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CurrencyInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CurrencyInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <CurrencyInput {...args} />
      <CurrencyInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CurrencyInput anywhere below.</Typography>
        <CurrencyInput {...args} />
        <CurrencyInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
