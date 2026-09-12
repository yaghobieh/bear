import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Checkbox from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Checkbox anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: 'Subscribe',
  },
};

export const States: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Checkbox label="First" />
        <Checkbox label="Reuse" defaultChecked />
      </Flex>
    </BearProvider>
  ),
};
