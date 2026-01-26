import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { Editable } from '@forgedevstack/bear';

const EditablePage: FC = () => {
  const [value1, setValue1] = useState('Click to edit');
  const [value2, setValue2] = useState('John Doe');
  const [value3, setValue3] = useState('This is a longer text that can be edited inline.');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editable</h1>
        <KilnLink path="/editable" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Inline editable text component. Click to edit, with keyboard support for submit and cancel.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Editable } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Click on the text to start editing. Press Enter to save, Escape to cancel."
        code={`const [value, setValue] = useState('Click to edit');

<Editable.Root defaultValue={value} onChange={setValue}>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>`}
      >
        <Editable.Root defaultValue={value1} onChange={setValue1}>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </ComponentPreview>

      <ComponentPreview
        title="With Submit Handler"
        description="Execute a callback when the value is submitted."
        code={`<Editable.Root 
  value={name} 
  onChange={setName}
  onSubmit={(value) => console.log('Saved:', value)}
>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>`}
      >
        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-400">Name:</span>
          <Editable.Root 
            defaultValue={value2} 
            onChange={setValue2}
            onEditSubmit={(value) => alert(`Saved: ${value}`)}
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Textarea"
        description="Use textarea for multi-line editing."
        code={`<Editable.Root value={bio} onChange={setBio}>
  <Editable.Preview />
  <Editable.Input as="textarea" />
</Editable.Root>`}
      >
        <Editable.Root defaultValue={value3} onChange={setValue3}>
          <Editable.Preview />
          <Editable.Input asTextarea />
        </Editable.Root>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disable editing when needed."
        code={`<Editable.Root value="Cannot edit this" isDisabled>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>`}
      >
        <Editable.Root defaultValue="Cannot edit this" isDisabled>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Component</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">Editable.Root</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Container that manages state and context</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">Editable.Preview</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Displays the current value (clickable to edit)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">Editable.Input</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input field shown during editing</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Root Props</h2>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called on every change</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onSubmit</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when submitted</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onCancel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called on cancel</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">isDisabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable editing</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">startWithEditView</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Start in edit mode</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EditablePage;

