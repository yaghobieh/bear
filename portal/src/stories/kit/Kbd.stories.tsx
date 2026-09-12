import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Kbd from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Kbd anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Kbd {...args}>
      <Typography>Kbd</Typography>
    </Kbd>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Kbd {...args}>
        <Typography>First</Typography>
      </Kbd>
      <Kbd>
        <Typography>Second</Typography>
      </Kbd>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Kbd anywhere below.</Typography>
        <Kbd {...args}>
          <Typography>First use</Typography>
        </Kbd>
        <Kbd>
          <Typography>Second use</Typography>
        </Kbd>
      </Flex>
    </BearProvider>
  ),
};
