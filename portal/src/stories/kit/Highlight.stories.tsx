import type { Meta, StoryObj } from '@storybook/react';
import { Highlight, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Highlight> = {
  title: 'Components/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Highlight from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Highlight anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Highlight {...args}>
      <Typography>Highlight</Typography>
    </Highlight>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Highlight {...args}>
        <Typography>First</Typography>
      </Highlight>
      <Highlight>
        <Typography>Second</Typography>
      </Highlight>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Highlight anywhere below.</Typography>
        <Highlight {...args}>
          <Typography>First use</Typography>
        </Highlight>
        <Highlight>
          <Typography>Second use</Typography>
        </Highlight>
      </Flex>
    </BearProvider>
  ),
};
