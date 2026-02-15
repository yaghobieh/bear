import { CountdownTimer } from '@forgedevstack/bear';

export default function CountdownTimerPage() {
  const nextYear = new Date(new Date().getFullYear() + 1, 0, 1);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CountdownTimer</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Visual countdown with multiple variants and sizes. Perfect for launches, events, and promotions.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Default</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CountdownTimer targetDate={nextYear} size="lg" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Variant</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CountdownTimer targetDate={nextYear} variant="card" size="lg" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Flip Variant</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CountdownTimer targetDate={nextYear} variant="flip" size="lg" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Minimal</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CountdownTimer targetDate={nextYear} variant="minimal" size="md" showLabels={false} separator=":" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sizes</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size}>
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">{size}</span>
                <CountdownTimer targetDate={nextYear} size={size} variant="card" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Duration (60s countdown)</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CountdownTimer duration={60} variant="card" showDays={false} showHours={false} onComplete={() => alert('Time is up!')} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { CountdownTimer } from '@forgedevstack/bear';

// Count to date
<CountdownTimer targetDate="2026-12-31" variant="card" size="lg" />

// Duration countdown
<CountdownTimer duration={3600} onComplete={() => alert('Done!')} />

// Custom renderer
<CountdownTimer
  targetDate="2026-12-31"
  render={(time) => <span>{time.days}d {time.hours}h {time.minutes}m</span>}
/>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
