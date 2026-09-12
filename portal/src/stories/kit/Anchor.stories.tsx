import type { Meta, StoryObj } from '@storybook/react';
import { Anchor, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Anchor> = {
  title: 'Components/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Anchor from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Anchor anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Anchor>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Anchor {...args}>
      <Typography>Anchor</Typography>
    </Anchor>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Anchor {...args}>
        <Typography>First</Typography>
      </Anchor>
      <Anchor>
        <Typography>Second</Typography>
      </Anchor>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Anchor anywhere below.</Typography>
        <Anchor {...args}>
          <Typography>First use</Typography>
        </Anchor>
        <Anchor>
          <Typography>Second use</Typography>
        </Anchor>
      </Flex>
    </BearProvider>
  ),
};
