import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavigableSelect, BearProvider, Flex } from '@forgedevstack/bear';
import type { NavigableSelectOption } from '@forgedevstack/bear';

const meta: Meta<typeof NavigableSelect> = {
  title: 'Components/NavigableSelect',
  component: NavigableSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'NavigableSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse NavigableSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    multiple: false,
    searchable: false,
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    fullWidth: false,
    maxVisible: 100,
    maxSelections: 100,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof NavigableSelect>;

const FRUIT_OPTIONS: NavigableSelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const COUNTRY_OPTIONS: NavigableSelectOption[] = [
  { value: 'us', label: 'United States', group: 'Americas' },
  { value: 'ca', label: 'Canada', group: 'Americas' },
  { value: 'uk', label: 'United Kingdom', group: 'Europe' },
  { value: 'de', label: 'Germany', group: 'Europe' },
];

export const Basic: Story = {
  args: {
    options: FRUIT_OPTIONS,
  },
  render: (args) => <NavigableSelect {...args} />,
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>('');
    return (
      <NavigableSelect
        options={COUNTRY_OPTIONS}
        value={value}
        onChange={setValue}
        searchable
        label="Country"
        placeholder="Search countries..."
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <NavigableSelect options={FRUIT_OPTIONS} placeholder="First select" />
        <NavigableSelect options={COUNTRY_OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
