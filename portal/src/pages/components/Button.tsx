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

      <ComponentPreview
        title="Spotlight Effect"
        description="Add a mouse-follow spotlight hover effect for premium interactions. The spotlight follows the cursor position."
        code={`// Basic spotlight
<Button spotlight>Hover me!</Button>

// Custom spotlight color and size
<Button 
  spotlight 
  spotlightColor="rgba(255, 255, 255, 0.25)" 
  spotlightSize={150}
>
  Custom Spotlight
</Button>

// Works with all variants
<Button variant="secondary" spotlight>Secondary</Button>
<Button variant="danger" spotlight>Danger</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button spotlight>Hover me!</Button>
          <Button spotlight spotlightColor="rgba(255, 255, 255, 0.25)" spotlightSize={150}>
            Custom Spotlight
          </Button>
          <Button variant="secondary" spotlight>Secondary</Button>
          <Button variant="danger" spotlight>Danger</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Variants"
        description="Create your own button variants via BearProvider's customVariants prop. Define brand colors once, use everywhere!"
        code={`// In your app's BearProvider
<BearProvider
  customVariants={{
    brand: { bg: '#ec4899', bgHover: '#db2777', text: '#ffffff' },
    ocean: { bg: '#0ea5e9', bgHover: '#0284c7', text: '#ffffff' },
    forest: { bg: '#22c55e', bgHover: '#16a34a', text: '#ffffff' },
    sunset: { bg: '#f97316', bgHover: '#ea580c', text: '#ffffff' },
  }}
>
  <App />
</BearProvider>

// Then use anywhere in your app!
<Button variant="brand">Brand</Button>
<Button variant="ocean">Ocean</Button>
<Button variant="forest">Forest</Button>
<Button variant="sunset">Sunset</Button>

// Add variants at runtime with useBearVariants hook
const { addVariant } = useBearVariants();
addVariant('custom', { bg: '#8b5cf6', text: '#fff' });`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="brand">Brand</Button>
          <Button variant="ocean">Ocean</Button>
          <Button variant="forest">Forest</Button>
          <Button variant="sunset">Sunset</Button>
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
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">spotlight</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable mouse-follow spotlight hover effect</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">spotlightColor</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>string</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">rgba(255,255,255,0.35)</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color of the spotlight effect</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">spotlightSize</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>number</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">150</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the spotlight in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">leftIcon</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>ReactNode</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon to show before text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">rightIcon</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>ReactNode</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon to show after text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;

