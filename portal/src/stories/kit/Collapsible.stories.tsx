import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Collapsible from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Collapsible anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Collapsible {...args}>
      <Typography>Collapsible</Typography>
    </Collapsible>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Collapsible {...args}>
        <Typography>First</Typography>
      </Collapsible>
      <Collapsible>
        <Typography>Second</Typography>
      </Collapsible>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Collapsible anywhere below.</Typography>
        <Collapsible {...args}>
          <Typography>First use</Typography>
        </Collapsible>
        <Collapsible>
          <Typography>Second use</Typography>
        </Collapsible>
      </Flex>
    </BearProvider>
  ),
};
