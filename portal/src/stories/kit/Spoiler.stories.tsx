import type { Meta, StoryObj } from '@storybook/react';
import { Spoiler, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Spoiler> = {
  title: 'Components/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Spoiler from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Spoiler anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spoiler>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Spoiler {...args}>
      <Typography>Spoiler</Typography>
    </Spoiler>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Spoiler {...args}>
        <Typography>First</Typography>
      </Spoiler>
      <Spoiler>
        <Typography>Second</Typography>
      </Spoiler>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Spoiler anywhere below.</Typography>
        <Spoiler {...args}>
          <Typography>First use</Typography>
        </Spoiler>
        <Spoiler>
          <Typography>Second use</Typography>
        </Spoiler>
      </Flex>
    </BearProvider>
  ),
};
