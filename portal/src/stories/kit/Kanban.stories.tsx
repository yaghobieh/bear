import type { Meta, StoryObj } from '@storybook/react';
import { Kanban, BearProvider, Flex } from '@forgedevstack/bear';
import type { KanbanColumn } from '@forgedevstack/bear';

const meta: Meta<typeof Kanban> = {
  title: 'Components/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Kanban from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Kanban anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    disabled: false,
  },
  argTypes: {
    onColumnsChange: { action: 'onColumnsChange' },
    onCardMove: { action: 'onCardMove' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Kanban>;

const COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Task 1', description: 'Description' },
      { id: '2', title: 'Task 2' },
    ],
  },
  { id: 'doing', title: 'In Progress', cards: [{ id: '3', title: 'Task 3' }] },
  { id: 'done', title: 'Done', cards: [{ id: '4', title: 'Task 4', meta: 'Completed' }] },
];

export const Basic: Story = {
  args: {
    columns: COLUMNS,
  },
  render: (args) => <Kanban {...args} />,
};

export const Disabled: Story = {
  render: () => <Kanban columns={COLUMNS} disabled />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Kanban columns={COLUMNS} />
        <Kanban columns={COLUMNS} disabled />
      </Flex>
    </BearProvider>
  ),
};
