import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const AccordionPage: FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Accordion</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Expandable panels for organizing content in collapsible sections.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Accordion, AccordionItem } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple accordion with expandable sections."
        code={`<Accordion>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
  <AccordionItem title="Section 3">Content 3</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto space-y-2">
          {['What is Bear UI?', 'How do I install it?', 'Is it free to use?'].map((title, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                <span className={`text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expanded === i && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {i === 0 && 'Bear UI is a modern React component library with beautiful, accessible components.'}
                    {i === 1 && 'Install via npm: npm install @forgedevstack/bear'}
                    {i === 2 && 'Yes! Bear UI is completely free and open source under the MIT license.'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Allow Multiple"
        description="Multiple sections can be open simultaneously."
        code={`<Accordion allowMultiple>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto space-y-2">
          {[
            { title: 'Features', open: true },
            { title: 'Pricing', open: true },
            { title: 'Support', open: false },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-800">
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                <span className={`text-gray-400 ${item.open ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {item.open && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Multiple sections can be expanded at the same time.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Accordion items with icons."
        code={`<Accordion>
  <AccordionItem icon={<SettingsIcon />} title="Settings">
    Settings content...
  </AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto space-y-2">
          {[
            { icon: '⚙️', title: 'Settings', content: 'Configure your preferences' },
            { icon: '🔒', title: 'Security', content: 'Manage security settings' },
            { icon: '🔔', title: 'Notifications', content: 'Control notification preferences' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button className="w-full px-4 py-3 flex items-center gap-3 bg-white dark:bg-gray-800">
                <span>{item.icon}</span>
                <span className="flex-1 font-medium text-gray-900 dark:text-white text-left">{item.title}</span>
                <span className="text-gray-400">▼</span>
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Flush Variant"
        description="Borderless accordion style."
        code={`<Accordion variant="flush">
  <AccordionItem title="Section 1">Content 1</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto divide-y divide-gray-200 dark:divide-gray-700">
          {['First Section', 'Second Section', 'Third Section'].map((title, i) => (
            <div key={i}>
              <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                <span className="text-gray-400">▼</span>
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled accordion item."
        code={`<Accordion>
  <AccordionItem title="Enabled" />
  <AccordionItem title="Disabled" disabled />
</Accordion>`}
      >
        <div className="max-w-md mx-auto space-y-2">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button className="w-full px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
              <span className="font-medium text-gray-900 dark:text-white">Enabled Item</span>
              <span className="text-gray-400">▼</span>
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden opacity-50 cursor-not-allowed">
            <div className="px-4 py-3 flex items-center justify-between bg-gray-100 dark:bg-gray-800">
              <span className="font-medium text-gray-400">Disabled Item</span>
              <span className="text-gray-300">▼</span>
            </div>
          </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">allowMultiple</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow multiple open</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultExpanded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | number[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initially expanded</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>default | flush</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">default</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Accordion style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(index: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Change handler</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AccordionPage;
