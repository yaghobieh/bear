import { FC } from 'react';
import { CodeBlock as PortalCodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { CodeBlock } from '@forgedevstack/bear';

const CodeBlockPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CodeBlock</h1>
        <LinesOfCode lines={120} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display code with syntax highlighting and optional line numbers.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <PortalCodeBlock
          code={`import { CodeBlock } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple code block with syntax highlighting."
        code={`<CodeBlock
  code={\`const greeting = 'Hello, World!';\nconsole.log(greeting);\`}
  language="javascript"
/>`}
      >
        <CodeBlock
          code={`const greeting = 'Hello, World!';
console.log(greeting);`}
          language="javascript"
        />
      </ComponentPreview>

      <ComponentPreview
        title="With Title"
        description="Add a title to indicate the filename."
        code={`<CodeBlock
  code={\`import { Button } from '@forgedevstack/bear';\n\nfunction App() {\n  return <Button>Click me</Button>;\n}\`}
  language="tsx"
  title="App.tsx"
/>`}
      >
        <CodeBlock
          code={`import { Button } from '@forgedevstack/bear';

function App() {
  return <Button>Click me</Button>;
}`}
          language="tsx"
          title="App.tsx"
        />
      </ComponentPreview>

      <ComponentPreview
        title="Without Line Numbers"
        description="Hide line numbers for simpler display."
        code={`<CodeBlock
  code={\`npm install @forgedevstack/bear\`}
  language="bash"
  showLineNumbers={false}
/>`}
      >
        <CodeBlock
          code={`npm install @forgedevstack/bear`}
          language="bash"
          showLineNumbers={false}
        />
      </ComponentPreview>

      <ComponentPreview
        title="TypeScript Example"
        description="Full syntax highlighting for TypeScript."
        code={`<CodeBlock
  code={\`interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst getUser = async (id: number): Promise<User> => {\n  const response = await fetch(\\\`/api/users/\\\${id}\\\`);\n  return response.json();\n};\`}
  language="typescript"
  title="types.ts"
/>`}
      >
        <CodeBlock
          code={`interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`}
          language="typescript"
          title="types.ts"
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">code</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Code content to display</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">language</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Language for syntax highlighting</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showLineNumbers</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show line numbers</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">title</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Optional file title/header</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CodeBlockPage;

