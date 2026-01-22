import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const DatePickerPage: FC = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DatePicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Allow users to select dates with an intuitive calendar interface.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { DatePicker } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple date picker with single date selection."
        code={`<DatePicker value={date} onChange={setDate} />`}
      >
        <div className="w-full max-w-xs">
          <input
            type="date"
            value={date?.toISOString().split('T')[0] || ''}
            onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bear-500 focus:border-bear-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different visual styles for the date picker."
        code={`<DatePicker variant="outlined" />
<DatePicker variant="filled" />
<DatePicker variant="standard" />`}
      >
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="Outlined" />
          <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Filled" />
          <input type="date" className="w-full px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 dark:bg-transparent dark:text-white" placeholder="Standard" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Min/Max Dates"
        description="Restrict date selection to a specific range."
        code={`<DatePicker minDate={new Date()} maxDate={new Date('2025-12-31')} />`}
      >
        <div className="w-full max-w-xs">
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            max="2025-12-31"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bear-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-2 text-sm text-gray-500">Only future dates until end of 2025</p>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date | null</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">null</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected date</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(date: Date | null) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when date changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>outlined | filled | standard</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">outlined</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">minDate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum selectable date</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxDate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum selectable date</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the picker</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">mode</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>single | range</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">single</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selection mode</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DatePickerPage;

