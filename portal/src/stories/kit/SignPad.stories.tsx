import type { Meta, StoryObj } from '@storybook/react';
import { SignPad, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof SignPad> = {
  title: 'Components/SignPad',
  component: SignPad,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SignPad from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SignPad anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignPad>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <SignPad {...args}>
      <Typography>SignPad</Typography>
    </SignPad>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <SignPad {...args}>
        <Typography>First</Typography>
      </SignPad>
      <SignPad>
        <Typography>Second</Typography>
      </SignPad>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SignPad anywhere below.</Typography>
        <SignPad {...args}>
          <Typography>First use</Typography>
        </SignPad>
        <SignPad>
          <Typography>Second use</Typography>
        </SignPad>
      </Flex>
    </BearProvider>
  ),
};
