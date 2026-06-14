import { FC, useState } from 'react';
import { Kanban } from '@forgedevstack/bear';
import type { KanbanColumn } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';

const INITIAL_COLUMNS: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Task 1', description: 'Description' }, { id: '2', title: 'Task 2' }] },
  { id: 'doing', title: 'In Progress', cards: [{ id: '3', title: 'Task 3' }] },
  { id: 'done', title: 'Done', cards: [{ id: '4', title: 'Task 4', meta: 'Completed' }] },
];

const KANBAN_PROPS = [
  { name: 'columns', type: 'KanbanColumn[]', description: 'Board columns with nested cards' },
  { name: 'onColumnsChange', type: '(columns: KanbanColumn[]) => void', description: 'Called after drag reorder' },
  { name: 'onCardMove', type: '(cardId, fromColumnId, toColumnId, fromIndex, toIndex) => void', description: 'Fine-grained move callback' },
  { name: 'renderCard', type: '(card, columnId) => ReactNode', description: 'Custom card renderer' },
  { name: 'renderColumnHeader', type: '(column) => ReactNode', description: 'Custom column header renderer' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable drag interactions' },
  { name: 'className', type: 'string', description: 'Additional root classes' },
  { name: 'id', type: 'string', description: 'Bear_kanban_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid on the board' },
];

const KanbanPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS);

  return (
    <DocPage title="Kanban" description={t.kanbanDesc} componentName="Kanban">
      <ComponentPreview
        title={t.basic}
        description="Drag cards between columns."
        code={`<Kanban columns={columns} onColumnsChange={setColumns} />`}
      >
        <div className="w-full overflow-x-auto">
          <Kanban columns={columns} onColumnsChange={setColumns} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title={t.disabledBoard}
        description="Read-only Kanban with drag disabled."
        code={`<Kanban columns={columns} onColumnsChange={setColumns} disabled />`}
      >
        <div className="w-full overflow-x-auto opacity-80">
          <Kanban columns={columns} onColumnsChange={setColumns} disabled />
        </div>
      </ComponentPreview>

      <PropsTable title={t.props} rows={KANBAN_PROPS} />
    </DocPage>
  );
};

export default KanbanPage;
