import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const EmptyStatePage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">EmptyState</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display a placeholder when content is unavailable or empty.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { EmptyState } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple empty state with message."
        code={`<EmptyState title="No data found" description="Try adjusting your filters" />`}
      >
        <div className="w-full p-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No data found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search criteria</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Action"
        description="Include a call-to-action button."
        code={`<EmptyState 
  title="No projects yet" 
  description="Get started by creating your first project"
  action={<Button>Create Project</Button>}
/>`}
      >
        <div className="w-full p-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first project</p>
          <button className="px-4 py-2 bg-bear-500 text-white rounded-lg hover:bg-bear-600">
            Create Project
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Icon"
        description="Use a custom illustration or icon."
        code={`<EmptyState 
  icon={<SearchIcon />}
  title="No results" 
  description="We couldn't find anything matching your search"
/>`}
      >
        <div className="w-full p-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <svg className="w-16 h-16 mx-auto text-bear-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results</h3>
          <p className="text-gray-500 dark:text-gray-400">We couldn't find anything matching your search</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Main heading</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">description</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Descriptive text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon or illustration</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">action</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Action button or link</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmptyStatePage;

