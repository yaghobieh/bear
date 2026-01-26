import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { GITHUB_URL } from '@/constants/navigation.const';

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

interface ComponentExampleProps {
  title: string;
  description: string;
  path: string;
  preview: React.ReactNode;
}

const ComponentExample: FC<ComponentExampleProps> = ({ title, description, path, preview }) => (
  <Link
    to={path}
    className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/10 transition-all"
  >
    <div className="h-24 mb-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
      {preview}
    </div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-pink-500 transition-colors">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
  </Link>
);

const Introduction: FC = () => {
  return (
    <div className="fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-medium mb-6">
          <span>🎉</span>
          <span>v1.0.3 Released</span>
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
            href={GITHUB_URL}
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Popular Components
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Click any component to explore docs and examples
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <ComponentExample
            title="Button"
            description="Versatile button with variants"
            path="/components/button"
            preview={
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-pink-500 text-white text-xs rounded-lg">Primary</span>
                <span className="px-3 py-1.5 border border-gray-300 text-gray-700 dark:text-gray-300 text-xs rounded-lg">Outline</span>
              </div>
            }
          />
          <ComponentExample
            title="Card"
            description="Container for content"
            path="/components/card"
            preview={
              <div className="w-20 h-14 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600" />
            }
          />
          <ComponentExample
            title="Modal"
            description="Dialog overlay"
            path="/components/modal"
            preview={
              <div className="relative w-24 h-16 bg-gray-900/20 dark:bg-white/10 rounded">
                <div className="absolute inset-2 bg-white dark:bg-gray-700 rounded shadow-lg" />
              </div>
            }
          />
          <ComponentExample
            title="Calendar"
            description="Date selection"
            path="/components/calendar"
            preview={
              <div className="grid grid-cols-7 gap-0.5 text-[6px] text-gray-600 dark:text-gray-400">
                {Array.from({ length: 28 }, (_, i) => (
                  <span key={i} className={`w-3 h-3 flex items-center justify-center rounded ${i === 14 ? 'bg-pink-500 text-white' : ''}`}>
                    {i + 1}
                  </span>
                ))}
              </div>
            }
          />
          <ComponentExample
            title="Input"
            description="Text input field"
            path="/components/input"
            preview={
              <div className="w-28 h-7 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 px-2 flex items-center">
                <span className="text-[8px] text-gray-400">Type here...</span>
              </div>
            }
          />
          <ComponentExample
            title="Toast"
            description="Notification messages"
            path="/components/toast"
            preview={
              <div className="w-24 h-8 bg-green-500 text-white text-[8px] rounded-lg flex items-center justify-center gap-1">
                <span>✓</span> Success!
              </div>
            }
          />
          <ComponentExample
            title="Tabs"
            description="Tabbed navigation"
            path="/components/tabs"
            preview={
              <div className="flex gap-1">
                <span className="px-2 py-1 text-[8px] bg-pink-500 text-white rounded-t">Tab 1</span>
                <span className="px-2 py-1 text-[8px] text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-t">Tab 2</span>
              </div>
            }
          />
          <ComponentExample
            title="Icons"
            description="300+ icon set"
            path="/icons"
            preview={
              <div className="flex gap-2 text-gray-600 dark:text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v10"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
            }
          />
        </div>

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

