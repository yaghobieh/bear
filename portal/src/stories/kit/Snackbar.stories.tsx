import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Snackbar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Snackbar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Snackbar {...args}>
      <Typography>Snackbar</Typography>
    </Snackbar>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Snackbar {...args}>
        <Typography>First</Typography>
      </Snackbar>
      <Snackbar>
        <Typography>Second</Typography>
      </Snackbar>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Snackbar anywhere below.</Typography>
        <Snackbar {...args}>
          <Typography>First use</Typography>
        </Snackbar>
        <Snackbar>
          <Typography>Second use</Typography>
        </Snackbar>
      </Flex>
    </BearProvider>
  ),
};
