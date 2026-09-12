import type { Meta, StoryObj } from '@storybook/react';
import { Spotlight, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Spotlight> = {
  title: 'Components/Spotlight',
  component: Spotlight,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Spotlight from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Spotlight anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spotlight>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Spotlight {...args}>
      <Typography>Spotlight</Typography>
    </Spotlight>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Spotlight {...args}>
        <Typography>First</Typography>
      </Spotlight>
      <Spotlight>
        <Typography>Second</Typography>
      </Spotlight>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Spotlight anywhere below.</Typography>
        <Spotlight {...args}>
          <Typography>First use</Typography>
        </Spotlight>
        <Spotlight>
          <Typography>Second use</Typography>
        </Spotlight>
      </Flex>
    </BearProvider>
  ),
};
