import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Cascader, BearProvider, Flex } from '@forgedevstack/bear';
import type { CascaderOption } from '@forgedevstack/bear';

const meta: Meta<typeof Cascader> = {
  title: 'Components/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Cascader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Cascader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: ['us', 'ca'],
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    loading: false,
    clearable: false,
    showFullPath: true,
    changeOnSelect: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showFullPath: { control: 'boolean' },
    changeOnSelect: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Cascader>;

const OPTIONS: CascaderOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      { value: 'phones', label: 'Phones', children: [{ value: 'iphone', label: 'iPhone' }, { value: 'android', label: 'Android' }] },
      { value: 'laptops', label: 'Laptops', children: [{ value: 'macbook', label: 'MacBook' }, { value: 'windows', label: 'Windows' }] },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      { value: 'men', label: 'Men', children: [{ value: 'shirts', label: 'Shirts' }, { value: 'pants', label: 'Pants' }] },
      { value: 'women', label: 'Women', children: [{ value: 'dresses', label: 'Dresses' }, { value: 'shoes', label: 'Shoes' }] },
    ],
  },
];

export const Basic: Story = {
  args: {
    options: OPTIONS,
  },
  render: (args) => <Cascader {...args} />,
};

export const ExpandOnHover: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Cascader
        options={OPTIONS}
        value={value}
        onChange={setValue}
        expandTrigger="hover"
        showFullPath
        label="Category"
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Cascader options={OPTIONS} placeholder="First cascader" />
        <Cascader options={OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
