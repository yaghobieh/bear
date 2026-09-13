import type { Meta, StoryObj } from '@storybook/react';
import { TransferList, BearProvider, Flex } from '@forgedevstack/bear';
import type { TransferListItem } from '@forgedevstack/bear';

const meta: Meta<typeof TransferList> = {
  title: 'Components/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TransferList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TransferList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    searchable: false,
    showCount: true,
    showCheckboxes: true,
    maxHeight: 240,
    disabled: false,
  },
  argTypes: {
    searchable: { control: 'boolean' },
    showCount: { control: 'boolean' },
    showCheckboxes: { control: 'boolean' },
    onChange: { action: 'onChange' },
    onMoveRight: { action: 'onMoveRight' },
    onMoveLeft: { action: 'onMoveLeft' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TransferList>;

const LEFT_ITEMS: TransferListItem[] = [
  { id: '1', label: 'Ada', secondary: 'Engineer' },
  { id: '2', label: 'Grace', secondary: 'Lead' },
  { id: '3', label: 'Alan', secondary: 'Research' },
];

const RIGHT_ITEMS: TransferListItem[] = [
  { id: '4', label: 'Linus', secondary: 'Kernel' },
];

export const Basic: Story = {
  args: {
    leftItems: LEFT_ITEMS,
    rightItems: RIGHT_ITEMS,
  },
  render: (args) => <TransferList {...args} />,
};

export const Searchable: Story = {
  render: () => (
    <TransferList
      leftItems={LEFT_ITEMS}
      rightItems={RIGHT_ITEMS}
      leftTitle="Available"
      rightTitle="Selected"
      searchable
      showCount
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TransferList leftItems={LEFT_ITEMS} rightItems={RIGHT_ITEMS} />
        <TransferList leftItems={LEFT_ITEMS} rightItems={RIGHT_ITEMS} searchable />
      </Flex>
    </BearProvider>
  ),
};
