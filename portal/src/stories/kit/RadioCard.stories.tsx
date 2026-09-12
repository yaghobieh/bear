import type { Meta, StoryObj } from '@storybook/react';
import { RadioCard, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'RadioCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RadioCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioCard>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <RadioCard {...args}>
      <Typography>RadioCard</Typography>
    </RadioCard>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <RadioCard {...args}>
        <Typography>First</Typography>
      </RadioCard>
      <RadioCard>
        <Typography>Second</Typography>
      </RadioCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse RadioCard anywhere below.</Typography>
        <RadioCard {...args}>
          <Typography>First use</Typography>
        </RadioCard>
        <RadioCard>
          <Typography>Second use</Typography>
        </RadioCard>
      </Flex>
    </BearProvider>
  ),
};
