import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const CopyButtonPage: FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @forgedevstack/bear');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">CopyButton</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Copy text to clipboard with visual feedback.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { CopyButton } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Copy button with success feedback."
        code={`<CopyButton textToCopy="npm install @forgedevstack/bear" />`}
      >
        <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md">
          <code className="flex-1 text-sm text-gray-700 dark:text-gray-300">npm install @forgedevstack/bear</code>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-colors ${
              copied ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500'
            }`}
          >
            {copied ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            )}
          </button>
        </div>
        {copied && <p className="mt-2 text-sm text-green-600">Copied!</p>}
      </ComponentPreview>

      <ComponentPreview
        title="With Custom Text"
        description="Custom button text."
        code={`<CopyButton textToCopy="..." successText="Copied!">
  Copy Code
</CopyButton>`}
      >
        <button 
          onClick={handleCopy}
          className="px-4 py-2 bg-bear-500 text-white rounded-lg hover:bg-bear-600 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">textToCopy</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text to copy to clipboard</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Copy icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">successText</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Copied!</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text shown after copy</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">timeout</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">2000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Time before resetting (ms)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CopyButtonPage;

