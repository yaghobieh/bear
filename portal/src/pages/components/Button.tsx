import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Button } from '@forgedevstack/bear'

const ButtonPage: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Button
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Buttons allow users to take actions with a single click or tap.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Import
        </h2>
        <CodeBlock
          code={`import { Button } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Variants"
        description="Button comes in several variants for different use cases."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Buttons are available in three sizes."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading State"
        description="Show a loading spinner to indicate an action is in progress."
        code={`<Button loading>Loading...</Button>

// With click handler
const [loading, setLoading] = useState(false);

<Button 
  loading={loading} 
  onClick={() => {
    setLoading(true);
    // ... async operation
  }}
>
  Submit
</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button loading>Loading...</Button>
          <Button onClick={handleLoadingClick} loading={loading}>
            {loading ? 'Saving...' : 'Click to save'}
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled buttons prevent user interaction."
        code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Props
        </h2>
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
                <td className="px-4 py-3 font-mono text-bear-600">variant</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>primary | secondary | outline | ghost | danger</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">size</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>sm | md | lg</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">loading</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show loading spinner</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">disabled</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">fullWidth</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Make button full width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;

