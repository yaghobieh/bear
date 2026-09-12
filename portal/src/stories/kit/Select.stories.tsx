import type { Meta, StoryObj } from '@storybook/react';
import { Select, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Select from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Select anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export const Basic: Story = {
  render: () => <Select options={OPTIONS} placeholder="Pick a stack" />,
};

export const WithLabel: Story = {
  render: () => <Select options={OPTIONS} label="Framework" placeholder="Choose one" fullWidth />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Select options={OPTIONS} placeholder="First select" />
        <Select options={OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
