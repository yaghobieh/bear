import { useState } from 'react';
import { GradientText, type GradientPreset } from '@forgedevstack/bear';

const PRESETS: GradientPreset[] = ['primary', 'sunset', 'ocean', 'forest', 'fire', 'purple', 'neon', 'candy', 'aurora', 'midnight'];

export default function GradientTextPage() {
  const [preset, setPreset] = useState<GradientPreset>('sunset');
  const [animate, setAnimate] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">GradientText</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Text with gradient colors. 10 built-in presets, custom colors, animation, and full theme integration.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Preset: <select value={preset} onChange={(e) => setPreset(e.target.value as GradientPreset)} className="ml-2 px-2 py-1 rounded border dark:bg-gray-800 dark:border-gray-700">
                {PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} /> Animate
            </label>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <GradientText preset={preset} animate={animate} as="h1" weight="extrabold" className="text-5xl">
              Bear UI
            </GradientText>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Presets</h2>
          <div className="grid grid-cols-2 gap-4">
            {PRESETS.map((p) => (
              <div key={p} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                <GradientText preset={p} as="h3" weight="bold" className="text-2xl">
                  {p}
                </GradientText>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Custom Colors</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-4">
            <GradientText colors={['#ff0000', '#0000ff']} as="h2" className="text-3xl">Red to Blue</GradientText>
            <GradientText colors={['#fbbf24', '#f97316', '#ef4444', '#ec4899']} animate as="h2" className="text-3xl">Animated Custom</GradientText>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Directions</h2>
          <div className="grid grid-cols-2 gap-4">
            {(['to-r', 'to-b', 'to-br', 'to-tr'] as const).map((dir) => (
              <div key={dir} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                <GradientText preset="ocean" direction={dir} as="h3" className="text-xl">
                  {dir}
                </GradientText>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { GradientText } from '@forgedevstack/bear';

// Preset
<GradientText preset="sunset" as="h1">Beautiful Text</GradientText>

// Custom colors
<GradientText colors={['#ff0000', '#00ff00', '#0000ff']}>
  Rainbow
</GradientText>

// Animated
<GradientText preset="neon" animate animationSpeed={3}>
  Animated Gradient
</GradientText>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
