import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Kanban } from '@forgedevstack/bear';
import type { KanbanColumn } from '@forgedevstack/bear';

const INITIAL_COLUMNS: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Task 1', description: 'Description' }, { id: '2', title: 'Task 2' }] },
  { id: 'doing', title: 'In Progress', cards: [{ id: '3', title: 'Task 3' }] },
  { id: 'done', title: 'Done', cards: [{ id: '4', title: 'Task 4', meta: 'Completed' }] },
];

const KanbanPage: FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kanban</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Kanban board with draggable cards. Drag cards between columns.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Kanban } from '@forgedevstack/bear';

const columns = [
  { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Task 1' }] },
  { id: 'done', title: 'Done', cards: [] },
];

<Kanban columns={columns} onColumnsChange={setColumns} />`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Drag cards between columns."
        code={`<Kanban columns={columns} onColumnsChange={setColumns} />`}
      >
        <div className="w-full overflow-x-auto">
          <Kanban columns={columns} onColumnsChange={setColumns} />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default KanbanPage;
