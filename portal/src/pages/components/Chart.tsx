import { Chart, BarChart, LineChart, PieChart } from '@forgedevstack/bear';
import { KilnLink } from '../../components/KilnLink';
import { LinesOfCode } from '../../components/LinesOfCode';

const sampleData = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 48 },
  { label: 'Jun', value: 75 },
];

export default function ChartPage() {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chart</h1>
          <KilnLink path="/chart" />
          <LinesOfCode lines={220} />
        </div>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A flexible charting component supporting bar, line, area, pie, and donut charts.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bar Chart</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <Chart type="bar" data={sampleData} height={200} showLabels showValues />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Line Chart</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <Chart type="line" data={sampleData} height={200} showLabels />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Area Chart</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <Chart type="area" data={sampleData} height={200} showLabels />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pie Chart</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <Chart type="pie" data={sampleData} height={200} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Donut Chart</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <Chart type="donut" data={sampleData} height={200} />
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
                <td className="py-3 px-4 font-mono text-sm">type</td>
                <td className="py-3 px-4 font-mono text-sm">'bar' | 'line' | 'area' | 'pie' | 'donut'</td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4">Chart type</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">data</td>
                <td className="py-3 px-4 font-mono text-sm">ChartDataPoint[]</td>
                <td className="py-3 px-4 font-mono text-sm">-</td>
                <td className="py-3 px-4">Data points with label and value</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">height</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">200</td>
                <td className="py-3 px-4">Chart height in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">animated</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Enable animations</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">showLabels</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Show data labels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">showValues</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4">Show data values</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

