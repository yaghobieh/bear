import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof VirtualList> = {
  title: 'Components/VirtualList',
  component: VirtualList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'VirtualList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse VirtualList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VirtualList>;

type Row = { id: number; label: string };

const ITEMS: Row[] = Array.from({ length: 80 }, (_, index) => ({
  id: index,
  label: `Row ${index + 1}`,
}));

const ITEM_HEIGHT = 40;
const LIST_HEIGHT = 240;

export const Basic: Story = {
  args: {
    items: ITEMS,
    itemHeight: ITEM_HEIGHT,
    height: LIST_HEIGHT,
  },
  render: (args) => (
    <VirtualList
      {...args}
      renderItem={(item: Row) => <Typography>{item.label}</Typography>}
      keyExtractor={(item: Row) => item.id}
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <VirtualList
      items={ITEMS}
      itemHeight={28}
      height={180}
      renderItem={(item: Row) => <Typography variant="caption">{item.label}</Typography>}
      keyExtractor={(item: Row) => item.id}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <VirtualList
          items={ITEMS}
          itemHeight={ITEM_HEIGHT}
          height={LIST_HEIGHT}
          renderItem={(item: Row) => <Typography>{item.label}</Typography>}
          keyExtractor={(item: Row) => item.id}
        />
        <VirtualList
          items={ITEMS.slice(0, 20)}
          itemHeight={28}
          height={160}
          renderItem={(item: Row) => <Typography variant="caption">{item.label}</Typography>}
          keyExtractor={(item: Row) => item.id}
        />
      </Flex>
    </BearProvider>
  ),
};
