import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const Installation: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Installation
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Get started with Bear UI in your React project.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Requirements
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>React 18.0 or later</li>
          <li>Node.js 18.0 or later</li>
          <li>Tailwind CSS 3.0 or later (optional, for customization)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Install the package
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Install Bear UI using your preferred package manager:
        </p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">npm</p>
            <CodeBlock code="npm install @forgedevstack/bear" language="bash" showLineNumbers={false} />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">yarn</p>
            <CodeBlock code="yarn add @forgedevstack/bear" language="bash" showLineNumbers={false} />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">pnpm</p>
            <CodeBlock code="pnpm add @forgedevstack/bear" language="bash" showLineNumbers={false} />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic Setup
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
              1. Import the styles
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Import the Bear UI stylesheet in your main entry file:
            </p>
            <CodeBlock
              code={`// main.tsx or App.tsx
import '@forgedevstack/bear/styles.css';`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
              2. Wrap your app with BearProvider
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              The BearProvider enables theming and context for all Bear components:
            </p>
            <CodeBlock
              code={`import { BearProvider } from '@forgedevstack/bear';

function App() {
  return (
    <BearProvider>
    </BearProvider>
  );
}`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
              3. Start using components
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Import and use Bear UI components in your application:
            </p>
            <CodeBlock
              code={`import { Button, Card, Badge } from '@forgedevstack/bear';

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Badge variant="success">New</Badge>
        Welcome!
      </Card.Header>
      <Card.Body>
        <p>This is a Bear UI card component.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Learn More</Button>
      </Card.Footer>
    </Card>
  );
}`}
              language="tsx"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tailwind CSS Integration (Optional)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI works out of the box with bundled styles. If you want to customize using Tailwind, 
          add the Bear UI source files to your Tailwind config:
        </p>
        <CodeBlock
          code={`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@forgedevstack/bear/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};`}
          language="javascript"
          title="tailwind.config.js"
        />
      </section>

      <section className="p-6 rounded-xl bg-bear-50 dark:bg-bear-900/20 border border-bear-200 dark:border-bear-800">
        <h2 className="text-lg font-semibold text-bear-800 dark:text-bear-200 mb-2">
          Next Steps
        </h2>
        <ul className="space-y-2 text-bear-700 dark:text-bear-300">
          <li>• Learn about <a href="/theming" className="underline hover:no-underline">Theming</a></li>
          <li>• Explore <a href="/components/button" className="underline hover:no-underline">Components</a></li>
          <li>• Browse the <a href="/icons" className="underline hover:no-underline">Icon Library</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Installation;

