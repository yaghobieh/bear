import type { Meta, StoryObj } from '@storybook/react';
import { Kanban } from '@forgedevstack/kanban';
import type { KanbanColumn } from '@forgedevstack/kanban';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [{ id: '1', title: 'Package story', description: 'Rendered from @forgedevstack/kanban' }],
  },
  { id: 'doing', title: 'In Progress', cards: [{ id: '2', title: 'Portal link' }] },
  { id: 'done', title: 'Done', cards: [{ id: '3', title: 'Core export kept' }] },
];

const meta: Meta<typeof Kanban> = {
  title: 'Packages/Kanban/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Kanban from @forgedevstack/kanban. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Kanban>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/kanban</Typography>
        <Kanban columns={COLUMNS} />
      </Flex>
    </BearProvider>
  ),
};
