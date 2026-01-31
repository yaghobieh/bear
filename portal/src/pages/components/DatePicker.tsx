import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DatePicker } from '@forgedevstack/bear';

const DatePickerPage: FC = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DatePicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Select dates with our Calendar component. Opens centered above other content.
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
        description="Opens our Calendar on click."
        code={`<DatePicker value={date} onChange={setDate} />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <DatePicker value={date} onChange={setDate} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Different visual styles."
        code={`<DatePicker variant="default" />
<DatePicker variant="filled" />
<DatePicker variant="outline" />`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <DatePicker variant="default" />
          <DatePicker variant="filled" />
          <DatePicker variant="outline" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Min/Max Dates"
        allowOverflow
        description="Restrict date selection to a specific range."
        code={`<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(new Date().getFullYear(), 11, 31)}
/>`}
      >
        <div className="w-full max-w-xs">
          <DatePicker
            value={date}
            onChange={setDate}
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Only future dates until end of year</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Icon"
        allowOverflow
        description="Replace the calendar icon with a custom one."
        code={`<DatePicker value={date} onChange={setDate} icon={<CustomIcon />} />`}
      >
        <div className="w-full max-w-xs">
          <DatePicker
            value={date}
            onChange={setDate}
            icon={<span className="text-pink-500">📅</span>}
          />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon to replace default calendar</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the picker</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DatePickerPage;

