import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Breadcrumbs } from '@forgedevstack/bear';

const longItems = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Category', href: '#' },
  { label: 'Subcategory', href: '#' },
  { label: 'Detail', href: '#' },
  { label: 'Current' },
];

const BreadcrumbsPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Breadcrumbs</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Navigation hierarchy with optional collapse (⋯ menu) and per-item dropdowns.
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
        description="Links and current page."
        allowOverflow
        code={`<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Item' },
]} />`}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Item' },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Collapse with ⋯ (maxItems + breakpoints)"
        description="When items exceed the resolved threshold, middle segments move into a dropdown. maxItems can be a number or { mobile, tablet, desktop, custom } like TabList."
        allowOverflow
        code={`<Breadcrumbs
  maxItems={4}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={1}
  items={longTrail}
/>`}
      >
        <Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={1} items={longItems} />
      </ComponentPreview>

      <ComponentPreview
        title="Item with dropdownItems"
        description="Middle crumb opens a menu; supports onClick per entry."
        allowOverflow
        code={`<Breadcrumbs items={[
  { label: 'Docs', href: '#' },
  {
    label: 'Components',
    dropdownItems: [
      { key: 'a', label: 'Buttons', onClick: () => {} },
      { key: 'b', label: 'Forms', onClick: () => {} },
    ],
  },
  { label: 'Breadcrumb' },
]} />`}
      >
        <Breadcrumbs
          items={[
            { label: 'Docs', href: '#' },
            {
              label: 'Components',
              dropdownItems: [
                { key: 'btn', label: 'Buttons', onClick: () => undefined },
                { key: 'form', label: 'Forms', onClick: () => undefined },
              ],
            },
            { label: 'Breadcrumb' },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Custom separator"
        description="separator prop."
        allowOverflow
        code={`<Breadcrumbs separator="›" items={[...]} />`}
      >
        <Breadcrumbs
          separator={<span className="text-zinc-500 mx-2">›</span>}
          items={[
            { label: 'Home', href: '#' },
            { label: 'Settings' },
          ]}
        />
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">BreadcrumbsProps</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BreadcrumbItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Trail segments</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxItems</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | breakpoint map</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Collapse when <code className="text-xs">items.length</code> exceeds resolved threshold</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">itemsBeforeCollapse</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Leading crumbs to keep visible</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">itemsAfterCollapse</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Trailing crumbs to keep visible</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">separator</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Between items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showHomeIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon on first item</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">BreadcrumbItem</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Field</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Required text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">href</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Renders anchor when not last</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button behavior when no href</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Leading icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">dropdownItems</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BreadcrumbDropdownItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Turns crumb into Dropdown trigger (not on last)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <code className="text-xs">BreadcrumbDropdownItem</code>: <code className="text-xs">key</code>, <code className="text-xs">label</code>, <code className="text-xs">onClick?</code>, <code className="text-xs">disabled?</code>.
        </p>
      </section>
    </div>
  );
};

export default BreadcrumbsPage;
