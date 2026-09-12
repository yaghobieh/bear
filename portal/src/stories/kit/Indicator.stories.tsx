import type { Meta, StoryObj } from '@storybook/react';
import { Indicator, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Indicator from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Indicator anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Indicator>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Indicator {...args}>
      <Typography>Indicator</Typography>
    </Indicator>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Indicator {...args}>
        <Typography>First</Typography>
      </Indicator>
      <Indicator>
        <Typography>Second</Typography>
      </Indicator>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Indicator anywhere below.</Typography>
        <Indicator {...args}>
          <Typography>First use</Typography>
        </Indicator>
        <Indicator>
          <Typography>Second use</Typography>
        </Indicator>
      </Flex>
    </BearProvider>
  ),
};
