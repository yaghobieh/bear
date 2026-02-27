import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Calendar } from '@forgedevstack/bear';

const CalendarPage: FC = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <LinesOfCode lines={180} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Standalone calendar with customizable slots. Use with DatePicker or alone for date display and selection.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Calendar } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Standalone calendar with date selection, Clear and Today buttons (react-calendar style)."
        code={`<Calendar
  viewDate={viewDate}
  onViewChange={setViewDate}
  value={value}
  onSelect={setValue}
  onClear={() => setValue(null)}
  onToday={() => { setValue(new Date()); setViewDate(new Date()); }}
/>`}
      >
        <Calendar
          viewDate={viewDate}
          onViewChange={setViewDate}
          value={value}
          onSelect={setValue}
          onClear={() => setValue(null)}
          onToday={() => { setValue(new Date()); setViewDate(new Date()); }}
          inline
        />
      </ComponentPreview>

      <ComponentPreview
        title="With Min/Max"
        description="Restrict selectable date range."
        code={`<Calendar
  viewDate={viewDate}
  onViewChange={setViewDate}
  value={value}
  onSelect={setValue}
  minDate={new Date()}
  maxDate={new Date(y, 11, 31)}
  onClear={() => setValue(null)}
/>`}
      >
        <Calendar
          viewDate={viewDate}
          onViewChange={setViewDate}
          value={value}
          onSelect={setValue}
          minDate={new Date()}
          maxDate={new Date(new Date().getFullYear(), 11, 31)}
          onClear={() => setValue(null)}
          onToday={() => { setValue(new Date()); setViewDate(new Date()); }}
          inline
        />
      </ComponentPreview>

      <ComponentPreview
        title="Week starts Monday"
        description="firstDayOfWeek and custom weekday labels."
        code={`<Calendar
  firstDayOfWeek={1}
  weekdayLabels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
  ...
/>`}
      >
        <Calendar
          viewDate={viewDate}
          onViewChange={setViewDate}
          value={value}
          onSelect={setValue}
          firstDayOfWeek={1}
          weekdayLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          onClear={() => setValue(null)}
          onToday={() => { setValue(new Date()); setViewDate(new Date()); }}
          inline
        />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">viewDate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Currently viewed month</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date | null</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected date</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onSelect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(date: Date) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">When a date is clicked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onViewChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(date: Date) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">When month navigation changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">slots</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CalendarSlots</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Override header, day, nav, footer, etc.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">minDate / maxDate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Date</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Restrict selectable range</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">firstDayOfWeek</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0=Sun, 1=Mon, etc.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">weekdayLabels</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom weekday headers</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
