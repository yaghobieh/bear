import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyInput, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    value: 42,
    decimals: 0,
    allowNegative: true,
    max: 100,
    min: 0,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    allowNegative: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CurrencyInput>;

export const Basic: Story = {
  render: (args) => <CurrencyInput {...args} />,
};

export const Euro: Story = {
  render: () => <CurrencyInput value={89.5} currency="EUR" locale="de-DE" label="Price" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <CurrencyInput value={40} currency="USD" label="First amount" />
        <CurrencyInput value={99} currency="GBP" label="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
