import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const BreadcrumbsPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Breadcrumbs</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Show navigation hierarchy and help users understand their location within an application.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Breadcrumbs } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple breadcrumb navigation."
        code={`<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Item' }
]} />`}
      >
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="text-bear-600 hover:underline">Home</a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-bear-600 hover:underline">Products</a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-bear-600 hover:underline">Category</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 dark:text-gray-400">Item</span>
        </nav>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Separator"
        description="Use a custom separator between items."
        code={`<Breadcrumbs separator=">" items={[...]} />`}
      >
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="text-bear-600 hover:underline">Home</a>
          <span className="text-gray-400">›</span>
          <a href="#" className="text-bear-600 hover:underline">Products</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-500 dark:text-gray-400">Current</span>
        </nav>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Include icons in breadcrumb items."
        code={`<Breadcrumbs items={[
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> }
]} />`}
      >
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="flex items-center gap-1 text-bear-600 hover:underline">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
            Home
          </a>
          <span className="text-gray-400">/</span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
            Settings
          </span>
        </nav>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BreadcrumbItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of breadcrumb items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">separator</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">/</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom separator between items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxItems</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max items to show before collapsing</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">renderItem</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(item) =&gt; ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom item renderer</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BreadcrumbsPage;

