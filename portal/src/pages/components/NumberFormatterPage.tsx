import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const NumberFormatterPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">NumberFormatter</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Locale-aware number formatting with support for currency, percent, compact notation, and animation.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { NumberFormatter } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Currency"
        description="Format numbers as currency with locale support."
        code={`<NumberFormatter value={1234.56} formatStyle="currency" currency="USD" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">$1,234.56</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">€999.99</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">£2,500.00</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Percent"
        description="Format numbers as percentages."
        code={`<NumberFormatter value={0.75} formatStyle="percent" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">75%</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">33.33%</span>
          <span className="text-lg font-medium text-emerald-600">+12.5%</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Compact"
        description="Compact notation for large numbers (1.2K, 1.5M)."
        code={`<NumberFormatter value={1234567} formatStyle="compact" notation="compact" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">1.2M</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">50K</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">2.3B</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Animation"
        description="Animated number transitions when value changes."
        code={`<NumberFormatter value={count} animated animationDuration={500} />`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">1,234</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">(animated on change)</span>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Locale"
        description="Format numbers for different locales."
        code={`<NumberFormatter value={1234.56} locale="de-DE" formatStyle="currency" currency="EUR" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">1.234,56 €</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">1 234,56 €</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number to format</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">formatStyle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&#39;decimal&#39; | &#39;currency&#39; | &#39;percent&#39; | &#39;compact&#39; | &#39;unit&#39;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">decimal</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Format style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">locale</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Locale for formatting</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">currency</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Currency code (e.g. USD)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">currencyDisplay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">How to display currency</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">unit</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Unit for unit format</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">unitDisplay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">How to display unit</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">notation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Notation (e.g. compact)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">minimumFractionDigits</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum decimal places</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maximumFractionDigits</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum decimal places</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">signDisplay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Sign display (auto, always, etc.)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">prefix</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Prefix string</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">suffix</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Suffix string</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Animate value changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animationDuration</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Animation duration in ms</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default NumberFormatterPage;
