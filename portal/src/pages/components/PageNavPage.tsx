import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PageNav } from '@forgedevstack/bear';

const PageNavPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PageNav</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={95} />
        <CopyImport componentName="PageNav" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Previous / Next page navigation for documentation, wizards, and multi-step flows.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { PageNav } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Default"
        description="Basic prev/next navigation with chevron icons."
        code={`<PageNav
  prev={{ label: 'Button', href: '/components/button' }}
  next={{ label: 'Input', href: '/components/input' }}
/>`}
      >
        <PageNav
          prev={{ label: 'Button', onClick: () => {} }}
          next={{ label: 'Input', onClick: () => {} }}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Outlined variant"
        description="Bordered cards for stronger visual separation."
        code={`<PageNav
  variant="outlined"
  prev={{ label: 'Installation', href: '/installation' }}
  next={{ label: 'Theming', href: '/theming' }}
/>`}
      >
        <PageNav
          variant="outlined"
          prev={{ label: 'Installation', onClick: () => {} }}
          next={{ label: 'Theming', onClick: () => {} }}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Filled variant"
        description="Subtle filled background for a softer look."
        code={`<PageNav
  variant="filled"
  prev={{ label: 'Getting Started', href: '/' }}
  next={{ label: 'Components', href: '/components' }}
/>`}
      >
        <PageNav
          variant="filled"
          prev={{ label: 'Getting Started', onClick: () => {} }}
          next={{ label: 'Components', onClick: () => {} }}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Available in all BearSize values."
        code={`<PageNav size="sm" prev={{ label: 'Prev' }} next={{ label: 'Next' }} />
<PageNav size="md" prev={{ label: 'Prev' }} next={{ label: 'Next' }} />
<PageNav size="lg" prev={{ label: 'Prev' }} next={{ label: 'Next' }} />`}
      >
        <div className="flex flex-col gap-6">
          <PageNav size="sm" prev={{ label: 'Small prev', onClick: () => {} }} next={{ label: 'Small next', onClick: () => {} }} />
          <PageNav size="md" prev={{ label: 'Medium prev', onClick: () => {} }} next={{ label: 'Medium next', onClick: () => {} }} />
          <PageNav size="lg" prev={{ label: 'Large prev', onClick: () => {} }} next={{ label: 'Large next', onClick: () => {} }} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Single direction"
        description="Only show prev or next when at the start or end of a sequence."
        code={`<PageNav next={{ label: 'Getting Started', href: '/' }} />
<PageNav prev={{ label: 'Last Page', href: '/end' }} />`}
      >
        <div className="flex flex-col gap-6">
          <PageNav next={{ label: 'Getting Started', onClick: () => {} }} />
          <PageNav prev={{ label: 'Last Page', onClick: () => {} }} />
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
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">prev</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>PageNavItem</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Previous page link</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">next</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>PageNavItem</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Next page link</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">size</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BearSize</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Component size</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">variant</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>default | outlined | filled</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">default</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">className</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">PageNavItem</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Property</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">label</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Display text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">href</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Link URL (renders &lt;a&gt;)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">onClick</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Click handler (renders &lt;button&gt;)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">icon</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon (replaces chevron)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PageNavPage;
