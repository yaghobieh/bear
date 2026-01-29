import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Box } from '@forgedevstack/bear';

const BoxPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Box</h1>
        <KilnLink path="/box" />
        <LinesOfCode lines={45} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The most fundamental layout component. A flexible container that can render as any HTML element.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Box } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="A simple box with padding and background color."
        code={`<Box className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
  Hello World
</Box>`}
      >
        <Box className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white">
          Hello World
        </Box>
      </ComponentPreview>

      <ComponentPreview
        title="As different elements"
        description="Box can render as different HTML elements using the 'as' prop."
        code={`<Box as="section" className="p-4 border rounded-lg">
  I'm a section element
</Box>
<Box as="article" className="p-4 border rounded-lg">
  I'm an article element
</Box>`}
      >
        <div className="space-y-4">
          <Box as="section" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">
            I'm a section element
          </Box>
          <Box as="article" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">
            I'm an article element
          </Box>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Styling"
        description="Apply any Tailwind classes for styling."
        code={`<Box className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg">
  Gradient box with shadow
</Box>`}
      >
        <Box className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg">
          Gradient box with shadow
        </Box>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">as</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>React.ElementType</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'div'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">The HTML element to render</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Content to render inside</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BoxPage;

