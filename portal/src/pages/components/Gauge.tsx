import { Gauge } from '@forgedevstack/bear';
import { LinesOfCode } from '../../components/LinesOfCode';

export default function GaugePage() {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gauge</h1>
          <LinesOfCode lines={160} />
        </div>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A circular gauge component for displaying progress or metrics.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Gauge</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex gap-8 flex-wrap">
          <Gauge value={25} />
          <Gauge value={50} />
          <Gauge value={75} />
          <Gauge value={100} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">With Gradient</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex gap-8 flex-wrap">
          <Gauge value={65} gradient={['#ec4899', '#8b5cf6']} />
          <Gauge value={82} gradient={['#10b981', '#3b82f6']} />
          <Gauge value={45} gradient={['#f59e0b', '#ef4444']} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Different Arc Angles</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex gap-8 flex-wrap">
          <div className="text-center">
            <Gauge value={75} arcAngle={180} />
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">180°</p>
          </div>
          <div className="text-center">
            <Gauge value={75} arcAngle={270} />
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">270° (default)</p>
          </div>
          <div className="text-center">
            <Gauge value={75} arcAngle={360} />
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">360°</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Custom Labels</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex gap-8 flex-wrap">
          <Gauge
            value={750}
            min={0}
            max={1000}
            label={
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">750</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Credits</div>
              </div>
            }
          />
          <Gauge
            value={88}
            color="#10b981"
            label={
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-500">A+</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Grade</div>
              </div>
            }
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Different Sizes</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex gap-8 items-center flex-wrap">
          <Gauge value={65} size={80} />
          <Gauge value={65} size={120} />
          <Gauge value={65} size={160} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Prop</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Type</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Default</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-slate-400">
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">value</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4">Current value</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">min</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">0</td>
                <td className="py-3 px-4">Minimum value</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">max</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">100</td>
                <td className="py-3 px-4">Maximum value</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">size</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">120</td>
                <td className="py-3 px-4">Size in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">arcAngle</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">270</td>
                <td className="py-3 px-4">Arc angle in degrees</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">gradient</td>
                <td className="py-3 px-4 font-mono text-sm">[string, string]</td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4">Gradient colors [start, end]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

