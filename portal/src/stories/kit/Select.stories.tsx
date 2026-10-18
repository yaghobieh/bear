import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
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
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
    value: 'react',
    placeholder: 'Choose one',
    label: 'Framework',
    disabled: false,
    required: false,
    size: 'md',
    fullWidth: false,
    displayEmpty: false,
    native: false,
    openEffect: 'fold',
    closeEffect: 'fold',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    displayEmpty: { control: 'boolean' },
    native: { control: 'boolean' },
    openEffect: { control: 'select', options: ['none', 'fade', 'slide-down', 'scale', 'fold', 'elastic', 'reveal', 'expand'] },
    closeEffect: { control: 'select', options: ['none', 'fade', 'slide-down', 'scale', 'fold', 'elastic', 'reveal', 'expand'] },
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
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <Select {...args} openEffect={args.openEffect} closeEffect={args.closeEffect} onChange={(value) => updateArgs({ value })} />;
  },
};

export const Fold: Story = {
  args: {
    openEffect: 'fold',
    closeEffect: 'fold',
  },
  parameters: {
    docs: {
      description: {
        story: 'The menu opens with fold and closes with fold. Fold is the default for both.',
      },
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Select
        {...args}
        openEffect="fold"
        closeEffect="fold"
        onChange={(value) => updateArgs({ value })}
      />
    );
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <Select {...args} fullWidth onChange={(value) => updateArgs({ value })} />;
  },
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
