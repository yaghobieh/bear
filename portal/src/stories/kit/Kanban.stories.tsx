import type { Meta, StoryObj } from '@storybook/react';
import { Kanban, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Kanban> = {
  title: 'Components/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Kanban from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Kanban anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Kanban>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Kanban {...args}>
      <Typography>Kanban</Typography>
    </Kanban>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Kanban {...args}>
        <Typography>First</Typography>
      </Kanban>
      <Kanban>
        <Typography>Second</Typography>
      </Kanban>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Kanban anywhere below.</Typography>
        <Kanban {...args}>
          <Typography>First use</Typography>
        </Kanban>
        <Kanban>
          <Typography>Second use</Typography>
        </Kanban>
      </Flex>
    </BearProvider>
  ),
};
