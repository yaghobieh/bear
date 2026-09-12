import type { Meta, StoryObj } from '@storybook/react';
import { CreditInput, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CreditInput> = {
  title: 'Components/CreditInput',
  component: CreditInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CreditInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CreditInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CreditInput>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <CreditInput {...args} />
      <CreditInput {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CreditInput anywhere below.</Typography>
        <CreditInput {...args} />
        <CreditInput {...args} />
      </Flex>
    </BearProvider>
  ),
};
