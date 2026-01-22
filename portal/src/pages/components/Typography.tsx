import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TypographyPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Typography</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Typography component for consistent text styling across your application. Fully customizable through the BearProvider theme.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Typography } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Variants"
        description="Different text styles for hierarchy."
        code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="body1">Body text 1</Typography>
<Typography variant="body2">Body text 2</Typography>
<Typography variant="caption">Caption text</Typography>
<Typography variant="overline">OVERLINE</Typography>`}
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Heading 2</h2>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Heading 3</h3>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Heading 4</h4>
          <p className="text-base text-gray-700 dark:text-gray-300">Body text 1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Body text 2</p>
          <span className="text-xs text-gray-500 block">Caption text</span>
          <span className="text-xs uppercase tracking-widest text-gray-500 block">OVERLINE</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Text with semantic colors."
        code={`<Typography color="primary">Primary text</Typography>
<Typography color="secondary">Secondary text</Typography>
<Typography color="success">Success text</Typography>
<Typography color="error">Error text</Typography>
<Typography color="warning">Warning text</Typography>`}
      >
        <div className="flex flex-wrap gap-4">
          <span className="text-bear-500">Primary text</span>
          <span className="text-gray-500">Secondary text</span>
          <span className="text-green-500">Success text</span>
          <span className="text-red-500">Error text</span>
          <span className="text-yellow-500">Warning text</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Element"
        description="Render as a different HTML element."
        code={`<Typography variant="h1" as="div">H1 styled div</Typography>
<Typography variant="body1" as="span">Body styled span</Typography>`}
      >
        <div className="space-y-2">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">H1 styled div</div>
          <span className="text-base text-gray-700 dark:text-gray-300">Body styled span</span>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎨 Customizing with BearProvider</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Typography fonts can be customized globally through the BearProvider theme configuration.
          The Typography component automatically uses fonts defined in your theme.
        </p>
        
        <CodeBlock 
          code={`import { BearProvider } from '@forgedevstack/bear';

// Customize typography fonts globally
function App() {
  return (
    <BearProvider
      theme={{
        fonts: {
          heading: '"Playfair Display", serif',
          body: '"Inter", sans-serif',
          mono: '"Fira Code", monospace',
        },
        // You can also customize colors
        colors: {
          primary: '#db2777',
          secondary: '#8b5cf6',
        },
      }}
    >
      <YourApp />
    </BearProvider>
  );
}`} 
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Font Properties</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Property</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Applied to</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">fonts.heading</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">h1, h2, h3, h4, h5, h6</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">System font stack</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">fonts.body</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">body1, body2, caption, overline</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">System font stack</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">fonts.mono</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Code, pre elements</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Monospace stack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ComponentPreview
        title="Font Weight"
        description="Control text weight."
        code={`<Typography weight="light">Light (300)</Typography>
<Typography weight="normal">Normal (400)</Typography>
<Typography weight="medium">Medium (500)</Typography>
<Typography weight="semibold">Semibold (600)</Typography>
<Typography weight="bold">Bold (700)</Typography>`}
      >
        <div className="space-y-2">
          <p className="font-light text-gray-700 dark:text-gray-300">Light (300)</p>
          <p className="font-normal text-gray-700 dark:text-gray-300">Normal (400)</p>
          <p className="font-medium text-gray-700 dark:text-gray-300">Medium (500)</p>
          <p className="font-semibold text-gray-700 dark:text-gray-300">Semibold (600)</p>
          <p className="font-bold text-gray-700 dark:text-gray-300">Bold (700)</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Truncation"
        description="Handle overflow text."
        code={`<Typography truncate>
  This is a very long text that will be truncated...
</Typography>

<Typography lineClamp={2}>
  This text will be limited to 2 lines and then
  show an ellipsis if it overflows.
</Typography>`}
      >
        <div className="space-y-4 max-w-xs">
          <p className="truncate text-gray-700 dark:text-gray-300">
            This is a very long text that will be truncated when it exceeds the container width and shows ellipsis
          </p>
          <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
            This text will be limited to 2 lines and then show an ellipsis if it overflows. 
            This is additional content that will be hidden after the second line ends.
          </p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | caption | overline</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">body1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text style variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | error | warning</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">inherit</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">as</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ElementType</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">HTML element to render</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">weight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>light | normal | medium | semibold | bold</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Font weight</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">align</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>left | center | right</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">left</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text alignment</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">truncate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Truncate with ellipsis</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">lineClamp</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Limit lines shown</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TypographyPage;
