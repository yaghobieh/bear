import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

// Lotso Bear SVG for demo
const LotsoDemo = () => (
  <svg width={100} height={100} viewBox="0 0 100 100" fill="none" className="animate-bounce">
    <ellipse cx="50" cy="72" rx="26" ry="20" fill="#db2777" />
    <ellipse cx="50" cy="73" rx="16" ry="12" fill="#fde68a" />
    <ellipse cx="32" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="32" cy="89" rx="8" ry="6" fill="#fde68a" />
    <ellipse cx="68" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="68" cy="89" rx="8" ry="6" fill="#fde68a" />
    <ellipse cx="24" cy="68" rx="8" ry="12" fill="#db2777" transform="rotate(-15 24 68)" />
    <ellipse cx="76" cy="68" rx="8" ry="12" fill="#db2777" transform="rotate(15 76 68)" />
    <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />
    <ellipse cx="28" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="28" cy="16" rx="6" ry="6" fill="#fcd34d" />
    <ellipse cx="72" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="72" cy="16" rx="6" ry="6" fill="#fcd34d" />
    <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />
    <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />
    <path d="M32 24 Q38 21 44 25" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M68 24 Q62 21 56 25" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    <ellipse cx="38" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="39" cy="33" rx="4" ry="5" fill="#78350f" />
    <ellipse cx="40" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="37" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
    <ellipse cx="62" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="61" cy="33" rx="4" ry="5" fill="#78350f" />
    <ellipse cx="60" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="63" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
    <path d="M44 48 Q50 52 56 48" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="30" cy="42" rx="4" ry="3" fill="#f472b6" opacity="0.5" />
    <ellipse cx="70" cy="42" rx="4" ry="3" fill="#f472b6" opacity="0.5" />
  </svg>
);

const BearLoaderPage: FC = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">BearLoader</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Animated Lotso bear loading indicator for your application.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { BearLoader } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Animated bouncing bear loader."
        code={`<BearLoader />`}
      >
        <div className="flex justify-center py-8">
          <LotsoDemo />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Text"
        description="Loader with loading message."
        code={`<BearLoader text="Loading your content..." />`}
      >
        <div className="flex flex-col items-center gap-4 py-8">
          <LotsoDemo />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your content...</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different loader sizes."
        code={`<BearLoader size="sm" />
<BearLoader size="md" />
<BearLoader size="lg" />
<BearLoader size="xl" />`}
      >
        <div className="flex items-end justify-center gap-8 py-8">
          <div className="text-center">
            <svg width={60} height={60} viewBox="0 0 100 100" fill="none" className="animate-bounce">
              <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />
              <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />
              <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />
            </svg>
            <span className="text-xs text-gray-500 mt-2 block">sm</span>
          </div>
          <div className="text-center">
            <svg width={80} height={80} viewBox="0 0 100 100" fill="none" className="animate-bounce">
              <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />
              <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />
              <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />
            </svg>
            <span className="text-xs text-gray-500 mt-2 block">md</span>
          </div>
          <div className="text-center">
            <svg width={100} height={100} viewBox="0 0 100 100" fill="none" className="animate-bounce">
              <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />
              <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />
              <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />
            </svg>
            <span className="text-xs text-gray-500 mt-2 block">lg</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Fullscreen"
        description="Full-screen loading overlay."
        code={`<BearLoader fullscreen duration={3000} onComplete={() => setLoading(false)} />`}
      >
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => {
              setShowFullscreen(true);
              setTimeout(() => setShowFullscreen(false), 2000);
            }}
            className="px-4 py-2 bg-bear-500 text-white rounded-lg hover:bg-bear-600"
          >
            Show Fullscreen Loader (2s)
          </button>
        </div>

        {showFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <LotsoDemo />
              <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
              <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-bear-500 rounded-full animate-pulse w-2/3" />
              </div>
            </div>
          </div>
        )}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the loader</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">text</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Loading text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fullscreen</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show as fullscreen overlay</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">duration</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto-complete duration (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onComplete</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when loading completes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BearLoaderPage;

