import type { Meta, StoryObj } from '@storybook/react';
import { NumberFormatter, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof NumberFormatter> = {
  title: 'Components/NumberFormatter',
  component: NumberFormatter,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NumberFormatter from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NumberFormatter anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: 42,
    currencyDisplay: 'symbol',
    unitDisplay: 'short',
    notation: 'standard',
    minimumFractionDigits: 0,
    maximumFractionDigits: 100,
    signDisplay: 'auto',
    animated: true,
    animationDuration: 0,
  },
  argTypes: {
    currencyDisplay: { control: 'select', options: ['symbol', 'code', 'name', 'narrowSymbol'] },
    unitDisplay: { control: 'select', options: ['short', 'long', 'narrow'] },
    notation: { control: 'select', options: ['standard', 'scientific', 'engineering', 'compact'] },
    signDisplay: { control: 'select', options: ['auto', 'never', 'always', 'exceptZero'] },
    animated: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof NumberFormatter>;

export const Basic: Story = {
  render: (args) => <NumberFormatter {...args} />,
};

export const Currency: Story = {
  render: () => (
    <Flex gap={3} direction="column">
      <Typography>
        <NumberFormatter value={45678} formatStyle="currency" currency="USD" />
      </Typography>
      <Typography>
        <NumberFormatter value={0.184} formatStyle="percent" />
      </Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <NumberFormatter value={1000} />
        <NumberFormatter value={2500} formatStyle="compact" />
      </Flex>
    </BearProvider>
  ),
};
