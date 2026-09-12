import type { Meta, StoryObj } from '@storybook/react';
import { Em, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Em> = {
  title: 'Components/Em',
  component: Em,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Em from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Em anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Em>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Em {...args}>
      <Typography>Em</Typography>
    </Em>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Em {...args}>
        <Typography>First</Typography>
      </Em>
      <Em>
        <Typography>Second</Typography>
      </Em>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Em anywhere below.</Typography>
        <Em {...args}>
          <Typography>First use</Typography>
        </Em>
        <Em>
          <Typography>Second use</Typography>
        </Em>
      </Flex>
    </BearProvider>
  ),
};
