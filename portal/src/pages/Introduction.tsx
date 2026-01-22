import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const FeatureCard: FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Introduction: FC = () => {
  return (
    <div className="fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-400 text-sm font-medium mb-6">
          <span>🎉</span>
          <span>v0.1.0 Released</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Build beautiful React apps<br />
          <span className="text-bear-500">with Bear UI</span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          A comprehensive React component library with 50+ customizable components,
          built with Tailwind CSS and full TypeScript support.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/installation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bear-500 hover:bg-bear-600 text-white font-medium transition-colors"
          >
            Get Started
            <ArrowRightIcon />
          </Link>
          <a
            href="https://github.com/forgedevstack/bear"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="mb-16">
        <CodeBlock
          code="npm install @forgedevstack/bear"
          language="bash"
          showLineNumbers={false}
        />
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Bear UI?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎨"
            title="Beautiful Design"
            description="Carefully crafted components with a modern, clean aesthetic that looks great out of the box."
          />
          <FeatureCard
            icon="🔧"
            title="Fully Customizable"
            description="Theme everything with CSS variables and Tailwind utilities. Make it yours."
          />
          <FeatureCard
            icon="📱"
            title="Responsive"
            description="Mobile-first components that work beautifully on all screen sizes."
          />
          <FeatureCard
            icon="♿"
            title="Accessible"
            description="Built with WAI-ARIA guidelines. Keyboard navigation and screen reader support."
          />
          <FeatureCard
            icon="📦"
            title="Tree-shakeable"
            description="Import only what you need. Optimized bundle size with ES modules."
          />
          <FeatureCard
            icon="🔷"
            title="TypeScript First"
            description="Full TypeScript support with comprehensive type definitions."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          50+ Components
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            'Button', 'Card', 'Modal', 'Drawer', 'Tooltip', 'Badge', 'Avatar',
            'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Rating',
            'Tabs', 'Accordion', 'Menu', 'Dropdown', 'Alert', 'Progress',
            'Spinner', 'DataTable', 'Carousel', 'List', 'Typography',
            'Divider', 'Paper', 'Grid', 'Flex', 'Container', 'SpeedDial',
            'TransferList', 'MultiSelect', 'Autocomplete', 'FAB', 'Link',
          ].map((component) => (
            <span
              key={component}
              className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {component}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Example
        </h2>
        <CodeBlock
          code={`import { BearProvider, Button, Card } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

function App() {
  return (
    <BearProvider>
      <Card className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Welcome to Bear UI</h2>
        <p className="text-gray-600 mb-4">
          Beautiful components for your React app.
        </p>
        <Button variant="primary">
          Get Started
        </Button>
      </Card>
    </BearProvider>
  );
}`}
          language="tsx"
          title="App.tsx"
        />
      </div>
    </div>
  );
};

export default Introduction;

