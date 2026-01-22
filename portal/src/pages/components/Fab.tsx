import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const FabPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Floating Action Button</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A floating action button (FAB) represents the primary action of a screen.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Fab } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Standard floating action button."
        code={`<Fab onClick={handleAdd}>
  <PlusIcon />
</Fab>`}
      >
        <div className="flex justify-center gap-4">
          <button className="w-14 h-14 rounded-full bg-bear-500 text-white shadow-lg hover:bg-bear-600 flex items-center justify-center text-2xl transition-all hover:scale-105">
            +
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Extended FAB"
        description="FAB with text label."
        code={`<Fab extended>
  <EditIcon /> Edit
</Fab>

<Fab extended variant="success">
  <CheckIcon /> Save
</Fab>`}
      >
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-5 py-3 rounded-full bg-bear-500 text-white shadow-lg hover:bg-bear-600 flex items-center gap-2 transition-all hover:scale-105">
            <span>✏️</span> Edit
          </button>
          <button className="px-5 py-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 flex items-center gap-2 transition-all hover:scale-105">
            <span>✓</span> Save
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different color variants."
        code={`<Fab variant="primary"><AddIcon /></Fab>
<Fab variant="secondary"><EditIcon /></Fab>
<Fab variant="success"><CheckIcon /></Fab>
<Fab variant="danger"><DeleteIcon /></Fab>`}
      >
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="w-14 h-14 rounded-full bg-bear-500 text-white shadow-lg hover:bg-bear-600 flex items-center justify-center text-xl">+</button>
          <button className="w-14 h-14 rounded-full bg-gray-600 text-white shadow-lg hover:bg-gray-700 flex items-center justify-center text-xl">✏️</button>
          <button className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 flex items-center justify-center text-xl">✓</button>
          <button className="w-14 h-14 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 flex items-center justify-center text-xl">🗑️</button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large FABs."
        code={`<Fab size="sm"><AddIcon /></Fab>
<Fab size="md"><AddIcon /></Fab>
<Fab size="lg"><AddIcon /></Fab>`}
      >
        <div className="flex justify-center items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-bear-500 text-white shadow-lg flex items-center justify-center text-lg">+</button>
          <button className="w-14 h-14 rounded-full bg-bear-500 text-white shadow-lg flex items-center justify-center text-2xl">+</button>
          <button className="w-16 h-16 rounded-full bg-bear-500 text-white shadow-lg flex items-center justify-center text-3xl">+</button>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | danger</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">extended</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show with text label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>bottom-right | bottom-left | top-right | top-left</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">bottom-right</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fixed position</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FabPage;

