import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DateRangePicker } from '@forgedevstack/bear';
import type { DateRange } from '@forgedevstack/bear';

const DateRangePickerPage: FC = () => {
  const [range1, setRange1] = useState<DateRange>({ start: null, end: null });
  const [range2, setRange2] = useState<DateRange>({ start: null, end: null });
  const [range3, setRange3] = useState<DateRange>({ start: null, end: null });
  const [range4, setRange4] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        DateRangePicker
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">
          New
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Two-calendar range picker with presets for selecting start and end dates.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { DateRangePicker } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Click to open a two-calendar range selector."
        code={`const [range, setRange] = useState({ start: null, end: null });

<DateRangePicker value={range} onChange={setRange} />`}
      >
        <div className="w-full max-w-md">
          <DateRangePicker value={range1} onChange={setRange1} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label & Presets"
        description="Label, helper text, and preset quick-select ranges."
        code={`<DateRangePicker
  label="Booking period"
  helperText="Select your check-in and check-out dates"
  value={range}
  onChange={setRange}
  showPresets
/>`}
      >
        <div className="w-full max-w-md">
          <DateRangePicker
            label="Booking period"
            helperText="Select your check-in and check-out dates"
            value={range2}
            onChange={setRange2}
            showPresets
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large trigger sizes."
        code={`<DateRangePicker size="sm" ... />
<DateRangePicker size="md" ... />
<DateRangePicker size="lg" ... />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-md">
          <DateRangePicker value={range3} onChange={setRange3} size="sm" placeholder="Small" />
          <DateRangePicker value={range3} onChange={setRange3} size="md" placeholder="Medium (default)" />
          <DateRangePicker value={range3} onChange={setRange3} size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled & Error"
        description="Disabled state and error validation."
        code={`<DateRangePicker disabled placeholder="Disabled" />
<DateRangePicker error="End date must be after start date" />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-md">
          <DateRangePicker value={{ start: null, end: null }} disabled placeholder="Disabled" />
          <DateRangePicker value={range4} onChange={setRange4} error="End date must be after start date" />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700 text-gray-700 dark:text-zinc-300">
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">value</td><td className="px-4 py-2">DateRange</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Selected date range</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">onChange</td><td className="px-4 py-2">(range) =&gt; void</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Callback on range change</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">label</td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Label above input</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">placeholder</td><td className="px-4 py-2">string</td><td className="px-4 py-2">'Select date range'</td><td className="px-4 py-2">Placeholder text</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">disabled</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td><td className="px-4 py-2">Disable the picker</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">clearable</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">true</td><td className="px-4 py-2">Show clear button</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">showPresets</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">true</td><td className="px-4 py-2">Show preset range panel</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">presets</td><td className="px-4 py-2">DateRangePreset[]</td><td className="px-4 py-2">built-in</td><td className="px-4 py-2">Custom presets</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">minDate</td><td className="px-4 py-2">Date</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Min selectable date</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">maxDate</td><td className="px-4 py-2">Date</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Max selectable date</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">size</td><td className="px-4 py-2">'sm' | 'md' | 'lg'</td><td className="px-4 py-2">'md'</td><td className="px-4 py-2">Input size</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">error</td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Error message</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">helperText</td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Helper text below input</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DateRangePickerPage;
