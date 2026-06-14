import React, { FC, ReactNode, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { HomeBentoGrid } from '@/components/HomeBentoGrid';
import { GITHUB_URL, BEAR_VERSION } from '@/constants/navigation.const';
import { BearIcons, CheckIcon, Badge } from '@forgedevstack/bear';

const ComparisonSection = lazy(() => import('@/components/ComparisonSection/ComparisonSection'));

const ArrowRightIcon = BearIcons.ArrowRightIcon;

const HERO_TITLE = 'The Foundation for your React UI';
const HERO_DESCRIPTION = '100+ accessible, customizable React components with TypeScript, AeroCraft CSS, responsive hooks, and a powerful theming system. Start here, then make it your own.';
const INSTALL_CMD = 'npm install @forgedevstack/bear';
const VERSION_LABEL = `Introducing Bear v${BEAR_VERSION}`;

const STATS = [
  { value: '100+', label: 'Components', color: 'text-pink-500' },
  { value: '550+', label: 'Icons', color: 'text-purple-500' },
  { value: '25+', label: 'Hooks', color: 'text-blue-500' },
  { value: '15k+', label: 'Lines of code', color: 'text-emerald-500' },
];

const FEATURES: { icon: ReactNode; title: string; description: string; path?: string }[] = [
  { icon: <BearIcons.PaletteIcon size={22} />, title: 'Beautiful by Default', description: 'Every component is carefully designed with consistent spacing, typography, and color. Dark mode built in.', path: '/theming' },
  { icon: <BearIcons.WrenchIcon size={22} />, title: 'bearStyled', description: 'Create pre-configured variants of any component — lock in borderRadius, borders, colors — and reuse everywhere. Like styled-components, but for Bear.', path: '/hooks' },
  { icon: <BearIcons.SmartphoneIcon size={22} />, title: 'Responsive System', description: 'useMediaQuery with provider-driven breakpoint overrides. Override xl to 2500px, add xxl — all components react automatically.', path: '/hooks/use-media-query' },
  { icon: <BearIcons.AccessibilityIcon size={22} />, title: 'Accessible', description: 'WAI-ARIA patterns, keyboard navigation, screen reader support, and focus management built into every component.', path: '/guides/accessibility' },
  { icon: <BearIcons.PackageIcon size={22} />, title: 'Tree-shakeable & Modular', description: 'Import only what you need. Use @BearInclude for modular CSS, or import individual style modules for minimal bundle.', path: '/guides/minimize-bundle' },
  { icon: <BearIcons.TypeScriptIcon size={22} />, title: 'TypeScript First', description: 'Full type safety with generics, discriminated unions, and comprehensive types. IntelliSense works perfectly.', path: '/typescript' },
];

const THEME_BULLETS = [
  "Color scales auto-generated from a single hex — pass 'blue' and get 50–950 shades",
  "Runtime custom variants — addVariant('brand', ...) and use immediately",
  'CSS variables for all tokens — integrate with any styling approach',
  "Breakpoint overrides via provider — xl: '2500px', add custom keys",
];

const COMPONENT_TAGS = [
  'Button', 'Card', 'Modal', 'Drawer', 'Tooltip', 'Badge', 'Avatar', 'Input', 'Select', 'Checkbox',
  'Radio', 'Switch', 'Rating', 'Tabs', 'Accordion', 'Menu', 'Dropdown', 'Alert', 'Progress', 'Spinner',
  'DataTable', 'Carousel', 'List', 'Typography', 'Divider', 'Paper', 'Grid', 'Flex', 'Container',
  'SpeedDial', 'TransferList', 'MultiSelect', 'Autocomplete', 'FAB', 'Link', 'RichEditor', 'SignPad',
  'Kanban', 'EmojiPicker', 'Chart', 'Gauge', 'Sparkline', 'DatePicker', 'DateRangePicker', 'TimePicker',
  'Calendar', 'TreeSelect', 'SplitButton', 'ImageGallery', 'ContextMenu', 'CodeEditor', 'Cropper',
  'Map', 'Terminal', 'Chat', 'FloatingChat', 'JsonViewer', 'DiffViewer', 'Masonry', 'Marquee',
  'Typewriter', 'Dock', 'Spotlight', 'AlertDialog', 'ThemeIcon', 'CloseButton', 'Overlay', 'Portal',
  'AnimatedCounter', 'GlowCard', 'MediaPlayer', 'Heatmap', 'TagCloud', 'CurrencyInput', 'TimelineChart', 'ImageAnnotation',
];

const HOOKS = [
  { name: 'useMediaQuery', desc: 'Breakpoint keys + provider overrides', path: '/hooks/use-media-query' },
  { name: 'useResponsive', desc: 'Responsive prop values', path: '/hooks/use-media-query' },
  { name: 'useClipboard', desc: 'Copy with status', path: '/hooks/use-clipboard' },
  { name: 'useDebounce', desc: 'Debounce values & callbacks', path: '/hooks/use-debounce' },
  { name: 'useLocalStorage', desc: 'Persist state', path: '/hooks/use-local-storage' },
  { name: 'useKeyPress', desc: 'Keyboard shortcuts', path: '/hooks/use-key-press' },
  { name: 'useSlide', desc: 'Slide animations', path: '/hooks/use-slide' },
  { name: 'useBounce', desc: 'Bounce effect', path: '/hooks/use-bounce' },
  { name: 'useDragDrop', desc: 'HTML5 drag and drop', path: '/hooks/use-drag-drop' },
  { name: 'useOnline', desc: 'Network status', path: '/hooks/use-online' },
  { name: 'useIdle', desc: 'User activity detection', path: '/hooks/use-idle' },
  { name: 'useLongPress', desc: 'Long press gesture', path: '/hooks/use-long-press' },
];

const ECOSYSTEM = [
  { emoji: '🐻', name: 'Bear UI', desc: '100+ React components, hooks, icons' },
  { emoji: '🔨', name: 'Anvil', desc: 'Utility library — array, object, string helpers' },
  { emoji: '📊', name: 'GridTable', desc: 'Powerful data grid with sort, filter, paginate' },
  { emoji: '🎠', name: 'Rail', desc: 'Carousel engine with effects, video, story mode' },
];

const StatBadge: FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-3xl md:text-4xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
  </div>
);

const FeatureCard: FC<{ title: string; description: string; icon: ReactNode; path?: string }> = ({ title, description, icon, path }) => {
  const inner = (
    <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/5 transition-all h-full">
      <div className="mb-4 w-11 h-11 rounded-lg bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
  return path ? <Link to={path}>{inner}</Link> : inner;
};

const ComponentCard: FC<{ title: string; desc: string; path: string; preview: React.ReactNode }> = ({ title, desc, path, preview }) => (
  <Link to={path} className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/5 transition-all">
    <div className="h-20 mb-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">{preview}</div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5 group-hover:text-pink-500 transition-colors">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
  </Link>
);

const Introduction: FC = () => {
  return (
    <div className="fade-in overflow-x-hidden">
      <section className="text-center pt-12 md:pt-20 pb-10 md:pb-14">
        <Link
          to="/whats-new"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-pink-300 dark:hover:border-pink-800 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-8"
        >
          {VERSION_LABEL}
          <ArrowRightIcon size={12} />
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-[1.1] tracking-tight max-w-3xl mx-auto">
          {HERO_TITLE}
        </h1>

        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {HERO_DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            to="/installation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Get Started
            <ArrowRightIcon size={16} />
          </Link>
          <Link
            to="/components"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 font-medium text-sm transition-colors"
          >
            Explore Components
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Built by{' '}
          <a href="https://github.com/yaghobieh" className="text-pink-600 dark:text-pink-400 hover:underline">
            John Yaghobieh
          </a>
          {' · '}
          Part of ForgeStack
        </p>
      </section>

      <HomeBentoGrid />

      {/* Stats */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
          {STATS.map((s) => <StatBadge key={s.label} {...s} />)}
      </div>
      </section>

      {/* Why Bear */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Why developers choose Bear UI</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">From design system foundations to advanced components — everything works together.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* Theming & Customization */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div>
            <Badge variant="primary" className="mb-4">Theming</Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Fully customizable theme system</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Override colors, spacing, typography, breakpoints, and shadows through the provider.
              Create custom color variants at runtime. Light and dark mode toggle with one function call.
            </p>
            <div className="space-y-3">
              {THEME_BULLETS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{b}</p>
              </div>
                ))}
              </div>
              </div>
          <div>
            <CodeBlock
              code={`import { BearProvider, useMediaQuery } from '@forgedevstack/bear';

<BearProvider
  theme={{
    colors: { primary: 'indigo' },
    breakpoints: { xl: '2500px', xxl: '3000px' },
  }}
  customVariants={{
    brand: { bg: '#6366f1', bgHover: '#4f46e5', text: '#fff' },
  }}
  customTypography={{
    display: { fontSize: '4rem', fontWeight: 800 },
  }}
>
  <Button variant="brand">Brand Button</Button>
  <Typography variant="display">Large text</Typography>
</BearProvider>`}
              language="tsx"
              title="Theming"
            />
              </div>
              </div>
      </section>

      {/* bearStyled */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="order-2 md:order-1">
            <CodeBlock
              code={`import { bearStyled, Button, Card } from '@forgedevstack/bear';

const RoundedButton = bearStyled(Button, {
  defaultProps: { variant: 'primary', size: 'lg' },
  style: { borderRadius: 10, borderLeft: '3px solid red' },
  className: 'uppercase',
});

const BrandCard = bearStyled(Card, {
  style: { borderRadius: 16, border: '2px solid #ec4899' },
  className: 'shadow-lg',
});

<RoundedButton onClick={save}>Save</RoundedButton>
<BrandCard className="p-6">Content</BrandCard>`}
              language="tsx"
              title="bearStyled"
            />
              </div>
          <div className="order-1 md:order-2">
            <Badge variant="secondary" className="mb-4">New in 1.2</Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">bearStyled — your component variants</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Take any Bear component, lock in default props and custom CSS (borderRadius, borders, shadows, anything),
              and export a new component that you reuse everywhere. All original behavior and props are preserved.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Works with every Bear component — Button, Card, Input, Badge, anything</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Merges className, style, and defaultProps — consumer overrides take precedence</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Named displayName for React DevTools — easy to trace in your component tree</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Components */}
      <section className="mb-14 md:mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Popular Components</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Click any card to explore docs, live examples, and API reference</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <ComponentCard title="Button" desc="10+ variants, loading, icons" path="/components/button"
            preview={<div className="flex gap-2"><span className="px-3 py-1.5 bg-pink-500 text-white text-xs rounded-lg">Primary</span><span className="px-3 py-1.5 border border-gray-300 text-gray-600 dark:text-gray-300 text-xs rounded-lg">Outline</span></div>} />
          <ComponentCard title="Modal" desc="Dialog with transitions" path="/components/modal"
            preview={<div className="relative w-24 h-14 bg-gray-900/20 dark:bg-white/10 rounded"><div className="absolute inset-2 bg-white dark:bg-gray-700 rounded shadow-lg" /></div>} />
          <ComponentCard title="DataTable" desc="Sort, filter, paginate" path="/components/data-table"
            preview={<div className="w-28 space-y-1"><div className="h-3 bg-pink-200 dark:bg-pink-800 rounded" /><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" /><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" /></div>} />
          <ComponentCard title="Charts" desc="Bar, Line, Pie, Gauge" path="/components/chart"
            preview={<div className="flex items-end gap-1 h-8"><div className="w-3 h-4 bg-pink-500 rounded-t" /><div className="w-3 h-6 bg-purple-500 rounded-t" /><div className="w-3 h-5 bg-blue-500 rounded-t" /><div className="w-3 h-8 bg-emerald-500 rounded-t" /></div>} />
          <ComponentCard title="RichEditor" desc="WYSIWYG text editor" path="/components/rich-editor"
            preview={<div className="w-28 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 p-1"><div className="flex gap-0.5 mb-1 pb-1 border-b border-gray-200 dark:border-gray-600"><span className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded text-[6px] flex items-center justify-center font-bold">B</span><span className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded text-[6px] flex items-center justify-center italic">I</span></div><div className="text-[6px] text-gray-500">Edit text...</div></div>} />
          <ComponentCard title="Kanban" desc="Drag-and-drop board" path="/components/kanban"
            preview={<div className="flex gap-2 w-full px-2"><div className="flex-1 rounded bg-gray-100 dark:bg-gray-700 p-1 space-y-1"><div className="h-3 bg-white dark:bg-gray-600 rounded" /><div className="h-3 bg-white dark:bg-gray-600 rounded" /></div><div className="flex-1 rounded bg-gray-100 dark:bg-gray-700 p-1"><div className="h-3 bg-white dark:bg-gray-600 rounded" /></div></div>} />
          <ComponentCard title="Calendar" desc="Date picker" path="/components/calendar"
            preview={<div className="grid grid-cols-7 gap-0.5 text-[6px] text-gray-500">{Array.from({ length: 21 }, (_, i) => (<span key={i} className={`w-3 h-3 flex items-center justify-center rounded ${i === 10 ? 'bg-pink-500 text-white' : ''}`}>{i + 1}</span>))}</div>} />
          <ComponentCard title="Icons" desc="550+ SVG icons" path="/icons"
            preview={<div className="flex gap-2 text-gray-500 dark:text-gray-400"><BearIcons.HomeIcon size={16} /><BearIcons.SearchIcon size={16} /><BearIcons.HeartIcon size={16} /><BearIcons.SettingsIcon size={16} /></div>} />
          <ComponentCard title="GlowCard" desc="4 glow effects, mouse tracking" path="/components/glow-card"
            preview={<div className="w-20 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/40 shadow-lg shadow-pink-500/10" />} />
          <ComponentCard title="Stepper" desc="Multi-step, windowed, responsive" path="/components/stepper"
            preview={<div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-pink-500 text-white text-[7px] flex items-center justify-center">1</div><div className="w-6 h-px bg-pink-400" /><div className="w-4 h-4 rounded-full bg-pink-500 text-white text-[7px] flex items-center justify-center">2</div><div className="w-6 h-px bg-gray-300" /><div className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 text-[7px] flex items-center justify-center">3</div></div>} />
          <ComponentCard title="DiffViewer" desc="Side-by-side code diff" path="/components/diff-viewer"
            preview={<div className="w-24 space-y-0.5 text-[6px] font-mono"><div className="flex"><span className="text-green-500">+</span><span className="text-gray-500 ml-0.5">added line</span></div><div className="flex"><span className="text-red-500">-</span><span className="text-gray-500 ml-0.5">removed</span></div></div>} />
          <ComponentCard title="Heatmap" desc="Contribution graph" path="/components/heatmap"
            preview={<div className="flex gap-0.5">{[2, 5, 8, 3, 9, 1, 7].map((v, i) => <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: `rgba(236, 72, 153, ${v / 10})` }} />)}</div>} />
        </div>
        <div className="text-center">
          <Link to="/components" className="inline-flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 hover:underline font-medium">
            View all 100+ components <ArrowRightIcon size={14} />
          </Link>
      </div>
      </section>

      {/* Hooks */}
      <section className="mb-14 md:mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Powerful Hooks</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Responsive, animation, network, gesture, and utility hooks</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {HOOKS.map((h) => (
            <Link key={h.name} to={h.path} className="group p-3 rounded-lg border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40 hover:border-pink-400 dark:hover:border-pink-500 transition-all">
              <code className="text-sm font-mono text-pink-600 dark:text-pink-400 group-hover:text-pink-500">{h.name}</code>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{h.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/hooks" className="inline-flex items-center gap-1 text-sm text-pink-600 dark:text-pink-400 hover:underline font-medium">View all hooks <ArrowRightIcon size={14} /></Link>
        </div>
      </section>

      <Suspense fallback={<div className="mb-20 text-center text-sm text-gray-400">Loading comparison…</div>}>
        <ComparisonSection />
      </Suspense>

      {/* Quick Example */}
      <section className="mb-14 md:mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Get started in 30 seconds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">1. Install</p>
            <CodeBlock code={INSTALL_CMD} language="bash" showLineNumbers={false} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">2. Use</p>
        <CodeBlock
          code={`import { BearProvider, Button, Card } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

    <BearProvider>
  <Card className="p-6">
    <Button variant="primary">Hello Bear</Button>
      </Card>
</BearProvider>`}
          language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Modular CSS */}
      <section className="mb-14 md:mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Modular Styles</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">Import all styles at once, or pick individual modules for minimal bundle size.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <CodeBlock code={`/* All styles at once */\n@BearIncludeAll;\n\n/* Or pick modules */\n@BearInclude 'base';\n@BearInclude 'buttons';\n@BearInclude 'effects';`} language="css" title="styles.css" showLineNumbers={false} />
          <CodeBlock code={`// postcss.config.js\nimport { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';\nimport config from './aerocraft.config.js';\n\nexport default {\n  plugins: [aerocraftPlugin(config)],\n};`} language="javascript" title="postcss.config.js" showLineNumbers={false} />
        </div>
      </section>

      {/* All Components Tags */}
      <section className="mb-14 md:mb-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">100+ Components</h2>
        <div className="flex flex-wrap gap-1.5 justify-center max-w-4xl mx-auto">
          {COMPONENT_TAGS.map((c) => (
            <span key={c} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{c}</span>
          ))}
        </div>
      </section>

      {/* Ecosystem */}
      <section className="mb-14 md:mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Part of the ForgeStack ecosystem</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">Bear UI is one piece of a larger toolkit designed for modern React development.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {ECOSYSTEM.map((e) => (
            <div key={e.name} className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40">
              <div className="text-2xl mb-2">{e.emoji}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{e.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-12 text-center py-16 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 border border-pink-200/50 dark:border-pink-800/30">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to build?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Start with the installation guide or dive straight into the component docs.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/installation" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-colors shadow-lg shadow-pink-500/20">
            Get Started <ArrowRightIcon size={16} />
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 font-semibold transition-colors">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
