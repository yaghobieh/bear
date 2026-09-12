import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'OTPInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse OTPInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OTPInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <OTPInput {...args} />
      <OTPInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse OTPInput anywhere below.</Typography>
        <OTPInput {...args} />
        <OTPInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
