import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSelect, BearProvider, Flex } from '@forgedevstack/bear';
import type { MultiSelectOption } from '@forgedevstack/bear';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'MultiSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse MultiSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: ['react'],
    defaultValue: ['react'],
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    maxSelections: 100,
    searchable: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const OPTIONS: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const TEAM_OPTIONS: MultiSelectOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];

export const Basic: Story = {
  args: {
    options: OPTIONS,
  },
  render: (args) => <MultiSelect {...args} />,
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['react']);
    return (
      <MultiSelect
        options={OPTIONS}
        value={value}
        onChange={setValue}
        label="Stack"
        searchable
        placeholder="Search frameworks..."
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <MultiSelect options={OPTIONS} placeholder="First multi-select" />
        <MultiSelect options={TEAM_OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
