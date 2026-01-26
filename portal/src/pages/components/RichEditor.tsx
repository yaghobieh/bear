import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { RichEditor } from '@forgedevstack/bear';

const RichEditorPage: FC = () => {
  const [value1, setValue1] = useState('<p>Start editing...</p>');
  const [value2, setValue2] = useState('');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RichEditor</h1>
        <KilnLink path="/rich-editor" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A WYSIWYG rich text editor with formatting toolbar. Supports bold, italic, headings, lists, and more.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { RichEditor } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="A rich text editor with full toolbar."
        code={`const [value, setValue] = useState('<p>Start editing...</p>');

<RichEditor
  value={value}
  onChange={setValue}
  placeholder="Start typing..."
/>`}
      >
        <RichEditor
          value={value1}
          onChange={setValue1}
          placeholder="Start typing..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Custom Height"
        description="Control the editor's minimum and maximum height."
        code={`<RichEditor
  value={value}
  onChange={setValue}
  minHeight={200}
  maxHeight={400}
/>`}
      >
        <RichEditor
          value={value2}
          onChange={setValue2}
          minHeight={200}
          maxHeight={400}
          placeholder="Write something..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Custom Toolbar"
        description="Customize which formatting options appear in the toolbar."
        code={`<RichEditor
  toolbar={['bold', 'italic', 'underline', 'divider', 'bulletList', 'orderedList']}
/>`}
      >
        <RichEditor
          toolbar={['bold', 'italic', 'underline', 'divider', 'bulletList', 'orderedList']}
          placeholder="Simple toolbar..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disable editing when needed."
        code={`<RichEditor
  value="<p>This content is <strong>read-only</strong>.</p>"
  disabled
/>`}
      >
        <RichEditor
          value="<p>This content is <strong>read-only</strong>.</p>"
          disabled
        />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled HTML content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultValue</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">''</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initial HTML content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when content changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">placeholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'Start typing...'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the editor</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">readOnly</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Read-only mode</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">minHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">150</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum height</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum height</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">toolbar</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ToolbarOption[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">all options</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Toolbar buttons to show</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Toolbar Options</h2>
        <div className="flex flex-wrap gap-2">
          {['bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'heading3', 'bulletList', 'orderedList', 'blockquote', 'code', 'link', 'divider'].map((option) => (
            <span key={option} className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono">
              '{option}'
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RichEditorPage;

