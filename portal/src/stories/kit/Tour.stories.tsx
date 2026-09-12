import type { Meta, StoryObj } from '@storybook/react';
import { Tour, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Tour from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Tour anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tour>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Tour {...args}>
      <Typography>Tour</Typography>
    </Tour>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Tour {...args}>
        <Typography>First</Typography>
      </Tour>
      <Tour>
        <Typography>Second</Typography>
      </Tour>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Tour anywhere below.</Typography>
        <Tour {...args}>
          <Typography>First use</Typography>
        </Tour>
        <Tour>
          <Typography>Second use</Typography>
        </Tour>
      </Flex>
    </BearProvider>
  ),
};
