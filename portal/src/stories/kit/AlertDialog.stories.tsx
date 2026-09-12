import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AlertDialog from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AlertDialog anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <AlertDialog {...args}>
      <Typography>AlertDialog</Typography>
    </AlertDialog>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <AlertDialog {...args}>
        <Typography>First</Typography>
      </AlertDialog>
      <AlertDialog>
        <Typography>Second</Typography>
      </AlertDialog>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse AlertDialog anywhere below.</Typography>
        <AlertDialog {...args}>
          <Typography>First use</Typography>
        </AlertDialog>
        <AlertDialog>
          <Typography>Second use</Typography>
        </AlertDialog>
      </Flex>
    </BearProvider>
  ),
};
