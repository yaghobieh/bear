import type { Meta, StoryObj } from '@storybook/react';
import { Descriptions, BearProvider, Flex } from '@forgedevstack/bear';
import type { DescriptionItem } from '@forgedevstack/bear';

const meta: Meta<typeof Descriptions> = {
  title: 'Components/Descriptions',
  component: Descriptions,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Descriptions from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Descriptions anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    bordered: false,
    size: 'sm',
    layout: 'horizontal',
    labelWidth: 320,
  },
  argTypes: {
    bordered: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    layout: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof Descriptions>;

const ITEMS: DescriptionItem[] = [
  { label: 'Name', value: 'Ada Lovelace' },
  { label: 'Email', value: 'ada@forge.dev' },
  { label: 'Role', value: 'Engineer' },
  { label: 'Status', value: 'Active' },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => <Descriptions {...args} />,
};

export const Bordered: Story = {
  render: () => (
    <Descriptions title="Order Details" items={ITEMS} bordered layout="vertical" columns={2} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Descriptions items={ITEMS} />
        <Descriptions items={ITEMS} bordered />
      </Flex>
    </BearProvider>
  ),
};
