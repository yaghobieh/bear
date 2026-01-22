import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ImagePage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Image</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Enhanced image component with lazy loading, fallback, and fit options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Image } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple image display."
        code={`<Image src="/photo.jpg" alt="Description" />`}
      >
        <div className="w-64 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
          </svg>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Object Fit Options"
        description="Control how the image fills its container."
        code={`<Image fit="cover" ... />
<Image fit="contain" ... />
<Image fit="fill" ... />`}
      >
        <div className="flex gap-4 flex-wrap">
          {['cover', 'contain', 'fill'].map((fit) => (
            <div key={fit} className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                <span className="text-xs text-gray-500 font-mono">{fit}</span>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">{fit}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Fallback"
        description="Show fallback when image fails to load."
        code={`<Image src="/broken.jpg" fallbackSrc="/placeholder.jpg" />`}
      >
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
            <svg className="w-8 h-8 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs text-gray-400">Fallback</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">src</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Image source URL</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">alt</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alt text for accessibility</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fallbackSrc</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fallback image on error</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">lazy</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable lazy loading</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fit</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>cover | contain | fill</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">cover</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Object-fit property</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">width</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Image width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">height</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Image height</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ImagePage;

