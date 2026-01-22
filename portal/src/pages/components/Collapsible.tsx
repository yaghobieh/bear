import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const CollapsiblePage: FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Collapsible</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Expandable/collapsible content section with smooth animation.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Collapsible } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple collapsible section."
        code={`<Collapsible 
  trigger={<Button>Toggle Content</Button>}
  isOpen={open}
  onToggle={() => setOpen(!open)}
>
  <p>Hidden content here...</p>
</Collapsible>`}
      >
        <div className="w-full max-w-md">
          <button 
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-left"
          >
            <span className="font-medium text-gray-900 dark:text-white">Click to toggle</span>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                This is the collapsible content. It smoothly animates in and out when toggled.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multiple Sections"
        description="Use multiple collapsibles for FAQ-style layouts."
        code={`{sections.map(section => (
  <Collapsible key={section.id} trigger={section.title}>
    {section.content}
  </Collapsible>
))}`}
      >
        <div className="w-full max-w-md space-y-2">
          {[
            { title: 'What is Bear UI?', content: 'Bear UI is a React component library.' },
            { title: 'How do I install it?', content: 'npm install @forgedevstack/bear' },
            { title: 'Is it customizable?', content: 'Yes, all components support theming.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-800 text-left">
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">trigger</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Element that toggles collapse</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Collapsible content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">isOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled open state</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onToggle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when toggled</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CollapsiblePage;

