import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { TimePicker } from '@forgedevstack/bear';

const TimePickerPage: FC = () => {
  const [time, setTime] = useState<string | null>('12:00 PM');
  const [time24, setTime24] = useState<string | null>('14:30');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TimePicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Select time with columns (scrollable hours/minutes/AM-PM) or dial (clock face). Use dropdownVariant and dropdownVariantBreakpoint for responsive layout.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { TimePicker } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic (Columns)"
        description="Scrollable columns for hours, minutes, AM/PM."
        code={`<TimePicker value={time} onChange={setTime} />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker value={time ?? undefined} onChange={setTime} format="12h" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Dial Variant"
        description="Clock face for hour selection."
        code={`<TimePicker value={time} onChange={setTime} dropdownVariant="dial" />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker value={time ?? undefined} onChange={setTime} format="12h" dropdownVariant="dial" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto (Responsive)"
        description="Dial on wide screens, columns on narrow. Use dropdownVariantBreakpoint to change breakpoint."
        code={`<TimePicker value={time} onChange={setTime} dropdownVariant="auto" dropdownVariantBreakpoint={768} />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker value={time ?? undefined} onChange={setTime} format="12h" dropdownVariant="auto" dropdownVariantBreakpoint={768} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="24-Hour Format"
        description="24h format (columns only; dial is 12h)."
        code={`<TimePicker value={time24} onChange={setTime24} format="24h" />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker value={time24 ?? undefined} onChange={setTime24} format="24h" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Icon"
        description="Replace the clock icon with a custom one."
        code={`<TimePicker value={time} onChange={setTime} icon={<CustomIcon />} />`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker value={time ?? undefined} onChange={setTime} icon={<span className="text-pink-500">🕐</span>} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Translations"
        description="Replace SELECT TIME, CANCEL, OK, Hour, Minute, Period via translations prop."
        code={`<TimePicker
  value={time}
  onChange={setTime}
  translations={{
    selectTime: 'CHOOSE TIME',
    hour: 'Hrs',
    minute: 'Min',
    period: 'AM/PM',
    cancel: 'Cancel',
    ok: 'Confirm',
  }}
/>`}
        allowOverflow
      >
        <div className="w-full max-w-xs">
          <TimePicker
            value={time ?? undefined}
            onChange={setTime}
            translations={{
              selectTime: 'CHOOSE TIME',
              hour: 'Hrs',
              minute: 'Min',
              period: 'AM/PM',
              cancel: 'Cancel',
              ok: 'Confirm',
            }}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected time (e.g. &quot;02:30 PM&quot;)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(time: string | null) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when time changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">dropdownVariant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&apos;columns&apos; | &apos;dial&apos; | &apos;auto&apos;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">columns</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Columns, dial, or auto (responsive)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">dropdownVariantBreakpoint</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">768</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Breakpoint (px) for auto variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">format</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&apos;12h&apos; | &apos;24h&apos;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">12h</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Time format</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon to replace default clock</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">translations</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>TimePickerTranslations</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">selectTime, hour, minute, period, cancel, ok</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the picker</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TimePickerPage;

