import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DateTimePicker, TimePicker } from '@forgedevstack/bear';

const DateTimePickerPage: FC = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DateTimePicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Date + time picker that uses the Calendar component for date selection and time controls for hour/minute.
        DatePicker and TimePicker (mode=&quot;datetime&quot;) also use the same Calendar.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { DateTimePicker } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Date and time selection using Calendar + time controls."
        code={`<DateTimePicker value={value} onChange={setValue} />`}
      >
        <div className="w-full max-w-xs">
          <DateTimePicker value={value} onChange={setValue} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="TimePicker mode='datetime'"
        description="TimePicker with mode='datetime' uses Calendar + time (same as DateTimePicker)."
        code={`<TimePicker mode="datetime" value={value} onChange={(v) => setValue(v instanceof Date ? v : null)} />`}
      >
        <div className="w-full max-w-xs">
          <TimePicker
            mode="datetime"
            value={value}
            onChange={(v: Date | string | null) => setValue(v instanceof Date ? v : null)}
            placeholder="Select date and time"
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date | null</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected date and time</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(date: Date | null) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">When date/time changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">slots</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CalendarSlots</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Calendar slot overrides</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">timeFormat</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'12h' | '24h'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Time display format</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DateTimePickerPage;
