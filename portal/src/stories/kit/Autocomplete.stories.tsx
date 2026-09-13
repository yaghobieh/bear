import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, BearProvider, Flex } from '@forgedevstack/bear';
import type { AutocompleteOption } from '@forgedevstack/bear';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Autocomplete from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Autocomplete anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    freeSolo: false,
    loading: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onSelect: { action: 'onSelect' },
    disabled: { control: 'boolean' },
    freeSolo: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

const FRUIT_OPTIONS: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const COUNTRY_OPTIONS: AutocompleteOption[] = [
  { value: 'us', label: 'United States', description: '+1' },
  { value: 'uk', label: 'United Kingdom', description: '+44' },
  { value: 'de', label: 'Germany', description: '+49' },
];

export const Basic: Story = {
  args: {
    options: FRUIT_OPTIONS,
    placeholder: 'Search fruits...',
  },
  render: (args) => <Autocomplete {...args} />,
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Autocomplete
        options={COUNTRY_OPTIONS}
        value={value}
        onChange={setValue}
        label="Country"
        placeholder="Select country..."
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Autocomplete options={FRUIT_OPTIONS} placeholder="First autocomplete" />
        <Autocomplete options={COUNTRY_OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
