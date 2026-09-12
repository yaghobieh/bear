import type { Meta, StoryObj } from '@storybook/react';
import { Mark, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Mark> = {
  title: 'Components/Mark',
  component: Mark,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Mark from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Mark anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Mark>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Mark {...args}>
      <Typography>Mark</Typography>
    </Mark>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Mark {...args}>
        <Typography>First</Typography>
      </Mark>
      <Mark>
        <Typography>Second</Typography>
      </Mark>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Mark anywhere below.</Typography>
        <Mark {...args}>
          <Typography>First use</Typography>
        </Mark>
        <Mark>
          <Typography>Second use</Typography>
        </Mark>
      </Flex>
    </BearProvider>
  ),
};
