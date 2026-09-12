import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Backdrop from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Backdrop anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Backdrop {...args}>
      <Typography>Backdrop</Typography>
    </Backdrop>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Backdrop {...args}>
        <Typography>First</Typography>
      </Backdrop>
      <Backdrop>
        <Typography>Second</Typography>
      </Backdrop>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Backdrop anywhere below.</Typography>
        <Backdrop {...args}>
          <Typography>First use</Typography>
        </Backdrop>
        <Backdrop>
          <Typography>Second use</Typography>
        </Backdrop>
      </Flex>
    </BearProvider>
  ),
};
