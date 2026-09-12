import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SplitButton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SplitButton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <SplitButton {...args}>
      <Typography>SplitButton</Typography>
    </SplitButton>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <SplitButton {...args}>
        <Typography>First</Typography>
      </SplitButton>
      <SplitButton>
        <Typography>Second</Typography>
      </SplitButton>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SplitButton anywhere below.</Typography>
        <SplitButton {...args}>
          <Typography>First use</Typography>
        </SplitButton>
        <SplitButton>
          <Typography>Second use</Typography>
        </SplitButton>
      </Flex>
    </BearProvider>
  ),
};
