import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PhoneInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PhoneInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <PhoneInput {...args} />
      <PhoneInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PhoneInput anywhere below.</Typography>
        <PhoneInput {...args} />
        <PhoneInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
