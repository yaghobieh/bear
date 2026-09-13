import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { InfiniteScroll, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const FIRST_PAGE = [
  'Ada Lovelace',
  'Grace Hopper',
  'Alan Turing',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Katherine Johnson',
  'Dennis Ritchie',
  'Barbara Liskov',
];

const NEXT_PAGES = [
  ['Ken Thompson', 'Radia Perlman', 'Tim Berners-Lee', 'Hedy Lamarr'],
  ['John von Neumann', 'Dorothy Vaughan', 'Guido van Rossum', 'Jean Bartik'],
  ['Claude Shannon', 'Adele Goldberg', 'Bjarne Stroustrup', 'Mary Allen Wilkes'],
];

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Components/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'InfiniteScroll from @forgedevstack/bear. Scroll the list to load more names. Turn manual on in Controls to use the Load more button instead.',
      },
    },
  },
  args: {
    hasMore: true,
    loading: false,
    threshold: 0.8,
    manual: false,
    inverse: false,
    loadMoreLabel: 'Load more',
  },
  argTypes: {
    onLoadMore: { action: 'onLoadMore' },
    hasMore: { control: 'boolean' },
    loading: { control: 'boolean' },
    manual: { control: 'boolean' },
    inverse: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof InfiniteScroll>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    const [items, setItems] = useState(FIRST_PAGE);
    const [page, setPage] = useState(0);

    const loadMore = () => {
      if (args.loading || !args.hasMore) {
        return;
      }
      updateArgs({ loading: true });
      window.setTimeout(() => {
        const next = NEXT_PAGES[page];
        if (next) {
          setItems((current) => [...current, ...next]);
          setPage((current) => current + 1);
          updateArgs({ loading: false, hasMore: page + 1 < NEXT_PAGES.length });
          return;
        }
        updateArgs({ loading: false, hasMore: false });
      }, 400);
    };

    return (
      <InfiniteScroll
        {...args}
        onLoadMore={loadMore}
        endMessage={<Typography>You reached the end of the list.</Typography>}
        style={{ maxHeight: 240, overflowY: 'auto', width: '100%' }}
      >
        <Flex direction="column" gap={2}>
          {items.map((name) => (
            <Typography key={name}>{name}</Typography>
          ))}
        </Flex>
      </InfiniteScroll>
    );
  },
};

export const Manual: Story = {
  args: {
    manual: true,
    hasMore: true,
  },
  render: (args) => {
    const [items, setItems] = useState(FIRST_PAGE);
    return (
      <InfiniteScroll
        {...args}
        onLoadMore={() => setItems((current) => [...current, ...NEXT_PAGES[0]])}
        loadMoreLabel="Load more"
        style={{ maxHeight: 240, overflowY: 'auto', width: '100%' }}
      >
        <Flex direction="column" gap={2}>
          {items.map((name) => (
            <Typography key={name}>{name}</Typography>
          ))}
        </Flex>
      </InfiniteScroll>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <InfiniteScroll onLoadMore={() => undefined} hasMore={false} endMessage={<Typography>First list done</Typography>}>
          <Typography>First list</Typography>
        </InfiniteScroll>
        <InfiniteScroll onLoadMore={() => undefined} hasMore={false} endMessage={<Typography>Done</Typography>}>
          <Typography>Second list</Typography>
        </InfiniteScroll>
      </Flex>
    </BearProvider>
  ),
};
