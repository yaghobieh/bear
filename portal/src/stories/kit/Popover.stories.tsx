import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Popover from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Popover anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <Typography>Popover</Typography>
    </Popover>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Popover {...args}>
        <Typography>First</Typography>
      </Popover>
      <Popover>
        <Typography>Second</Typography>
      </Popover>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Popover anywhere below.</Typography>
        <Popover {...args}>
          <Typography>First use</Typography>
        </Popover>
        <Popover>
          <Typography>Second use</Typography>
        </Popover>
      </Flex>
    </BearProvider>
  ),
};
