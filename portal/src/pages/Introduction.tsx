import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { GITHUB_URL } from '@/constants/navigation.const';
import { GridTable, ColumnDefinition } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import { BearIcons, CheckIcon, XIcon } from '@forgedevstack/bear';

// Use Bear icons
const ArrowRightIcon = BearIcons.ArrowRightIcon;
const PaletteIcon = BearIcons.PaletteIcon;
const WrenchIcon = BearIcons.WrenchIcon;
const SmartphoneIcon = BearIcons.SmartphoneIcon;
const PackageIcon = BearIcons.PackageIcon;
const TypeScriptIcon = BearIcons.TypeScriptIcon;
const AccessibilityIcon = BearIcons.AccessibilityIcon;

const FeatureCard: FC<{ title: string; description: string; icon: ReactNode }> = ({ title, description, icon }) => (
  <div className="p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
    <div className="mb-3 md:mb-4 text-pink-500">{icon}</div>
    <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">{title}</h3>
    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">{description}</p>
  </div>
);

// Comparison table data
interface ComparisonRow {
  id: number;
  feature: string;
  bearUI: boolean | 'soon' | 'partial';
  others: boolean | 'soon' | 'partial';
  [key: string]: unknown;
}

const comparisonData: ComparisonRow[] = [
  { id: 1, feature: 'Zero Config Tailwind', bearUI: true, others: false },
  { id: 2, feature: 'Built-in Dark Mode', bearUI: true, others: 'partial' },
  { id: 3, feature: '50+ Components', bearUI: true, others: true },
  { id: 4, feature: 'TypeScript First', bearUI: true, others: 'partial' },
  { id: 5, feature: 'Custom Icon Library (300+)', bearUI: true, others: false },
  { id: 6, feature: 'Animation Hooks', bearUI: true, others: false },
  { id: 7, feature: 'Charts & Graphs', bearUI: true, others: 'partial' },
  { id: 8, feature: 'RichText Editor', bearUI: true, others: false },
  { id: 9, feature: 'Signature Pad', bearUI: true, others: false },
  { id: 10, feature: 'MCP Integration', bearUI: 'soon', others: false },
];

const renderStatus = (value: unknown) => {
  if (value === true) return <CheckIcon size={18} className="text-green-500" />;
  if (value === 'soon') return <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Soon</span>;
  if (value === 'partial') return <span className="text-xs text-gray-400">Partial</span>;
  return <XIcon size={18} className="text-gray-300 dark:text-gray-600" />;
};

const comparisonColumns: ColumnDefinition<ComparisonRow>[] = [
  { 
    id: 'feature', 
    accessor: 'feature',
    header: 'Feature',
    width: 220,
  },
  { 
    id: 'bearUI', 
    accessor: 'bearUI',
    header: 'Bear UI',
    align: 'center',
    width: 120,
    render: renderStatus,
    headerClassName: 'text-pink-500 font-bold',
  },
  { 
    id: 'others', 
    accessor: 'others',
    header: 'Others',
    align: 'center',
    width: 120,
    render: renderStatus,
  },
];

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
          <span>v1.0.4 - Charts & Effects!</span>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard
            icon={<PaletteIcon />}
            title="Beautiful Design"
            description="Carefully crafted components with a modern, clean aesthetic."
          />
          <FeatureCard
            icon={<WrenchIcon />}
            title="Customizable"
            description="Theme everything with CSS variables and Tailwind utilities."
          />
          <FeatureCard
            icon={<SmartphoneIcon />}
            title="Responsive"
            description="Mobile-first components that work on all screen sizes."
          />
          <FeatureCard
            icon={<AccessibilityIcon />}
            title="Accessible"
            description="Built with WAI-ARIA guidelines. Keyboard & screen reader support."
          />
          <FeatureCard
            icon={<PackageIcon />}
            title="Tree-shakeable"
            description="Import only what you need. Optimized bundle size."
          />
          <FeatureCard
            icon={<TypeScriptIcon />}
            title="TypeScript"
            description="Full TypeScript support with comprehensive types."
          />
        </div>
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          How We Compare
        </h2>
        <div className="grid-table-wrapper">
          <GridTable<ComparisonRow>
            data={comparisonData}
            columns={comparisonColumns}
            getRowId={(row) => row.id}
            showPagination={false}
          />
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Table powered by{' '}
          <a 
            href="https://www.npmjs.com/package/@forgedevstack/grid-table" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            @forgedevstack/grid-table
          </a>
        </p>
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
          <ComponentExample
            title="Charts"
            description="Bar, Line, Pie, Gauge"
            path="/components/chart"
            preview={
              <div className="flex items-end gap-1 h-8">
                <div className="w-3 h-4 bg-pink-500 rounded-t" />
                <div className="w-3 h-6 bg-purple-500 rounded-t" />
                <div className="w-3 h-5 bg-blue-500 rounded-t" />
                <div className="w-3 h-8 bg-emerald-500 rounded-t" />
                <div className="w-3 h-3 bg-amber-500 rounded-t" />
              </div>
            }
          />
          <ComponentExample
            title="useSlide"
            description="Slide animations"
            path="/hooks/use-slide"
            preview={
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span className="text-[10px]">Effect</span>
              </div>
            }
          />
          <ComponentExample
            title="useFloat"
            description="Floating animations"
            path="/hooks/use-float"
            preview={
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
                </svg>
                <span className="text-[10px]">Effect</span>
              </div>
            }
          />
          <ComponentExample
            title="RichEditor"
            description="WYSIWYG text editor"
            path="/components/rich-editor"
            preview={
              <div className="w-28 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 p-1">
                <div className="flex gap-0.5 mb-1 pb-1 border-b border-gray-200 dark:border-gray-600">
                  <span className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded text-[6px] flex items-center justify-center font-bold">B</span>
                  <span className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded text-[6px] flex items-center justify-center italic">I</span>
                  <span className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded text-[6px] flex items-center justify-center underline">U</span>
                </div>
                <div className="text-[6px] text-gray-500">Edit text...</div>
              </div>
            }
          />
          <ComponentExample
            title="SignPad"
            description="Signature capture"
            path="/components/sign-pad"
            preview={
              <div className="w-24 h-12 bg-white dark:bg-gray-700 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/>
                </svg>
              </div>
            }
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          50+ Components
        </h2>
        
        {/* Lines of code indicator */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-6 bg-pink-500 rounded-sm" />
              <div className="w-1.5 h-4 bg-pink-400 rounded-sm" />
              <div className="w-1.5 h-5 bg-pink-500 rounded-sm" />
              <div className="w-1.5 h-3 bg-pink-400 rounded-sm" />
            </div>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              <span className="text-pink-500 font-bold">+12k</span> lines
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-sm" />
              <div className="w-1.5 h-6 bg-emerald-400 rounded-sm" />
              <div className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
              <div className="w-1.5 h-5 bg-emerald-400 rounded-sm" />
            </div>
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
              <span className="text-emerald-500 font-bold">+50</span> components
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            'Button', 'Card', 'Modal', 'Drawer', 'Tooltip', 'Badge', 'Avatar',
            'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Rating',
            'Tabs', 'Accordion', 'Menu', 'Dropdown', 'Alert', 'Progress',
            'Spinner', 'DataTable', 'Carousel', 'List', 'Typography',
            'Divider', 'Paper', 'Grid', 'Flex', 'Container', 'SpeedDial',
            'TransferList', 'MultiSelect', 'Autocomplete', 'FAB', 'Link',
            'RichEditor', 'SignPad', 'Chart', 'Gauge', 'Sparkline',
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

      {/* Hooks Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Powerful Hooks
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Utility and animation hooks for common patterns
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'useClipboard', desc: 'Copy to clipboard', path: '/hooks/use-clipboard' },
            { name: 'useDebounce', desc: 'Debounce values & callbacks', path: '/hooks/use-debounce' },
            { name: 'useThrottle', desc: 'Throttle values & callbacks', path: '/hooks/use-throttle' },
            { name: 'useLocalStorage', desc: 'Persist state', path: '/hooks/use-local-storage' },
            { name: 'useKeyPress', desc: 'Keyboard shortcuts', path: '/hooks/use-key-press' },
            { name: 'useIntersectionObserver', desc: 'Viewport detection', path: '/hooks/use-intersection-observer' },
            { name: 'useSlide', desc: 'Slide animations', path: '/hooks/use-slide' },
            { name: 'useBounce', desc: 'Bounce effects', path: '/hooks/use-bounce' },
            { name: 'useFloat', desc: 'Floating animation', path: '/hooks/use-float' },
          ].map((hook) => (
            <Link
              key={hook.name}
              to={hook.path}
              className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-pink-500 dark:hover:border-pink-500 transition-all"
            >
              <code className="text-sm font-mono text-pink-600 dark:text-pink-400 group-hover:text-pink-500">{hook.name}</code>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hook.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link 
            to="/hooks" 
            className="inline-flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 hover:underline"
          >
            View all hooks <ArrowRightIcon size={14} />
          </Link>
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

