import type { Meta, StoryObj } from '@storybook/react';
import { SpeedDial, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof SpeedDial> = {
  title: 'Components/SpeedDial',
  component: SpeedDial,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SpeedDial from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SpeedDial anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpeedDial>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <SpeedDial {...args}>
      <Typography>SpeedDial</Typography>
    </SpeedDial>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <SpeedDial {...args}>
        <Typography>First</Typography>
      </SpeedDial>
      <SpeedDial>
        <Typography>Second</Typography>
      </SpeedDial>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SpeedDial anywhere below.</Typography>
        <SpeedDial {...args}>
          <Typography>First use</Typography>
        </SpeedDial>
        <SpeedDial>
          <Typography>Second use</Typography>
        </SpeedDial>
      </Flex>
    </BearProvider>
  ),
};
