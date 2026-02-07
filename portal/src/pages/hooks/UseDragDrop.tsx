import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { useDragDrop } from '@forgedevstack/bear';

const UseDragDropPage: FC = () => {
  const [items, setItems] = useState(['A', 'B', 'C', 'D']);

  const { getDragProps, getDropProps, isDragging } = useDragDrop<string>({
    onDrop: (sourceId, targetId, sourceIndex, targetIndex) => {
      const arr = [...items];
      const [removed] = arr.splice(sourceIndex, 1);
      arr.splice(targetIndex, 0, removed);
      setItems(arr);
    },
  });

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useDragDrop</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        HTML5 drag and drop hook. Use getDragProps and getDropProps to make elements draggable and droppable.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { useDragDrop } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Reorderable List"
        description="Drag items to reorder."
        code={`const [items, setItems] = useState(['A', 'B', 'C', 'D']);
const { getDragProps, getDropProps } = useDragDrop({
  onDrop: (sourceId, targetId, sourceIndex, targetIndex) => {
    const arr = [...items];
    const [removed] = arr.splice(sourceIndex, 1);
    arr.splice(targetIndex, 0, removed);
    setItems(arr);
  },
});

return (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={item} {...getDragProps(item, item, i)} {...getDropProps(item, item, i)}>
        {item}
      </div>
    ))}
  </div>
);`}
      >
        <div className="space-y-2 max-w-xs">
          {items.map((item, i) => (
            <div
              key={item}
              {...getDragProps(item, item, i)}
              {...getDropProps(item, item, i)}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing hover:border-bear-500 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </ComponentPreview>
    </div>
  );
};

export default UseDragDropPage;
