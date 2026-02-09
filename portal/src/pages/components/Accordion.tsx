import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Accordion, AccordionItem } from '@forgedevstack/bear';

const AccordionPage: FC = () => {
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
  <AccordionItem id="1" title="What is Bear UI?">
    Bear UI is a modern React component library...
  </AccordionItem>
  <AccordionItem id="2" title="How do I install it?">
    Install via npm: npm install @forgedevstack/bear
  </AccordionItem>
  <AccordionItem id="3" title="Is it free to use?">
    Yes! Bear UI is completely free and open source.
  </AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto">
          <Accordion>
            <AccordionItem id="faq-1" title="What is Bear UI?">
              Bear UI is a modern React component library with beautiful, accessible components.
            </AccordionItem>
            <AccordionItem id="faq-2" title="How do I install it?">
              Install via npm: npm install @forgedevstack/bear
            </AccordionItem>
            <AccordionItem id="faq-3" title="Is it free to use?">
              Yes! Bear UI is completely free and open source under the MIT license.
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Allow Multiple"
        description="Multiple sections can be open simultaneously."
        code={`<Accordion allowMultiple>
  <AccordionItem id="1" title="Features">...</AccordionItem>
  <AccordionItem id="2" title="Pricing">...</AccordionItem>
  <AccordionItem id="3" title="Support">...</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto">
          <Accordion allowMultiple>
            <AccordionItem id="multi-1" title="Features">
              Multiple sections can be expanded at the same time.
            </AccordionItem>
            <AccordionItem id="multi-2" title="Pricing">
              This is great for FAQs where users want to compare.
            </AccordionItem>
            <AccordionItem id="multi-3" title="Support">
              Click multiple headers to see them all open.
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons"
        description="Accordion items with custom icons."
        code={`<Accordion>
  <AccordionItem id="1" icon={<span>⚙️</span>} title="Settings">
    Configure your preferences
  </AccordionItem>
  <AccordionItem id="2" icon={<span>🔒</span>} title="Security">
    Manage security settings
  </AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto">
          <Accordion>
            <AccordionItem id="icon-1" icon={<span>⚙️</span>} title="Settings">
              Configure your preferences and application settings.
            </AccordionItem>
            <AccordionItem id="icon-2" icon={<span>🔒</span>} title="Security">
              Manage your security settings and privacy options.
            </AccordionItem>
            <AccordionItem id="icon-3" icon={<span>🔔</span>} title="Notifications">
              Control notification preferences and alerts.
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Default Open"
        description="Start with specific items expanded."
        code={`<Accordion defaultOpen={['item-1']}>
  <AccordionItem id="item-1" title="Open by default">...</AccordionItem>
  <AccordionItem id="item-2" title="Closed by default">...</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto">
          <Accordion defaultOpen={['default-1']}>
            <AccordionItem id="default-1" title="Open by default">
              This item starts expanded.
            </AccordionItem>
            <AccordionItem id="default-2" title="Closed by default">
              This item starts collapsed.
            </AccordionItem>
            <AccordionItem id="default-3" title="Also closed">
              This item also starts collapsed.
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled Items"
        description="Some items can be disabled."
        code={`<Accordion>
  <AccordionItem id="1" title="Enabled Item">...</AccordionItem>
  <AccordionItem id="2" title="Disabled Item" disabled>...</AccordionItem>
</Accordion>`}
      >
        <div className="max-w-md mx-auto">
          <Accordion>
            <AccordionItem id="disabled-1" title="Enabled Item">
              This item can be expanded and collapsed normally.
            </AccordionItem>
            <AccordionItem id="disabled-2" title="Disabled Item" disabled>
              This item cannot be expanded.
            </AccordionItem>
          </Accordion>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">allowMultiple</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow multiple items open</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultOpen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">IDs of initially open items</td></tr>
            </tbody>
          </table>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">AccordionItem Props</h3>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">id</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unique identifier</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable item</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AccordionPage;
