import { useState } from 'react';
import { Marquee } from '@forgedevstack/bear';

const LOGOS = ['React', 'TypeScript', 'Vite', 'Bear UI', 'ForgeStack', 'Tailwind', 'Node.js', 'Express'];

export default function MarqueePage() {
  const [speed, setSpeed] = useState(50);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [gradient, setGradient] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Marquee</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Infinite scrolling content with smooth animation. Perfect for logos, testimonials, and news tickers.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Speed: <input type="range" min="20" max="150" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="ml-2 w-24" /> {speed}px/s
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input type="checkbox" checked={pauseOnHover} onChange={(e) => setPauseOnHover(e.target.checked)} /> Pause on Hover
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input type="checkbox" checked={gradient} onChange={(e) => setGradient(e.target.checked)} /> Gradient Edges
            </label>
          </div>

          <Marquee speed={speed} pauseOnHover={pauseOnHover} gradient={gradient} gap={32}>
            {LOGOS.map((logo) => (
              <div key={logo} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{logo}</span>
              </div>
            ))}
          </Marquee>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reverse Direction</h2>
          <Marquee direction="right" speed={40} gap={24}>
            {['Masonry', 'Dock', 'Spotlight', 'Typewriter', 'Countdown', 'GradientText'].map((name) => (
              <span key={name} className="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm font-medium">
                {name}
              </span>
            ))}
          </Marquee>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Marquee } from '@forgedevstack/bear';

<Marquee speed={60} pauseOnHover gradient>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Marquee>

// Reverse direction
<Marquee direction="right" speed={40}>
  {logos.map(logo => <Logo key={logo.id} />)}
</Marquee>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
