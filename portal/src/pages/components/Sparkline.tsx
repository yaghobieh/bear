import { Sparkline } from '@forgedevstack/bear';
import { KilnLink } from '../../components/KilnLink';
import { LinesOfCode } from '../../components/LinesOfCode';

const generateRandomData = (count: number) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 100));

export default function SparklinePage() {
  const data1 = [10, 25, 18, 35, 28, 45, 38, 60, 52, 75];
  const data2 = [50, 42, 55, 38, 45, 35, 48, 30, 42, 25];
  const data3 = [20, 35, 28, 42, 55, 48, 62, 70, 65, 80];

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sparkline</h1>
          <KilnLink path="/sparkline" />
          <LinesOfCode lines={75} />
        </div>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A compact inline chart for displaying data trends in a small space.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Sparkline</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex items-center gap-4">
          <span className="text-gray-600 dark:text-slate-400">Revenue</span>
          <Sparkline data={data1} width={120} height={32} />
          <span className="text-green-500 font-medium">+12%</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">With Fill</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex items-center gap-4">
          <span className="text-gray-600 dark:text-slate-400">Users</span>
          <Sparkline data={data3} width={120} height={32} fill color="#10b981" />
          <span className="text-emerald-500 font-medium">+28%</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">With Extremes</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex items-center gap-4">
          <span className="text-gray-600 dark:text-slate-400">Bounce Rate</span>
          <Sparkline data={data2} width={120} height={32} showExtremes color="#f59e0b" />
          <span className="text-red-500 font-medium">-5%</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Different Sizes</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-slate-400 w-16">Small</span>
            <Sparkline data={data1} width={80} height={24} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-slate-400 w-16">Medium</span>
            <Sparkline data={data1} width={120} height={32} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-slate-400 w-16">Large</span>
            <Sparkline data={data1} width={200} height={48} />
          </div>
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
                <td className="py-3 px-4 font-mono text-sm">data</td>
                <td className="py-3 px-4 font-mono text-sm">number[]</td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4">Array of numeric values</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">width</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">100</td>
                <td className="py-3 px-4">Width in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">height</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">32</td>
                <td className="py-3 px-4">Height in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">fill</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4">Fill area under line</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">showExtremes</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4">Show min/max indicators</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">color</td>
                <td className="py-3 px-4 font-mono text-sm">string</td>
                <td className="py-3 px-4 font-mono text-sm">#ec4899</td>
                <td className="py-3 px-4">Line color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

