import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TimePickerPage: FC = () => {
  const [time, setTime] = useState('12:00');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TimePicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Allow users to select time values with an intuitive interface.
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
        title="Basic"
        description="Simple time picker."
        code={`<TimePicker value={time} onChange={setTime} />`}
      >
        <div className="w-full max-w-xs">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bear-500 focus:border-bear-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="12-Hour Format"
        description="Time picker with AM/PM selection."
        code={`<TimePicker use12HourFormat />`}
      >
        <div className="flex gap-2 items-center">
          <input
            type="time"
            className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Seconds"
        description="Include seconds in time selection."
        code={`<TimePicker showSeconds />`}
      >
        <div className="w-full max-w-xs">
          <input
            type="time"
            step="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bear-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Selected time (HH:mm format)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(time: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when time changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>outlined | filled | standard</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">outlined</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showSeconds</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show seconds selector</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">use12HourFormat</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Use 12-hour format with AM/PM</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the picker</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TimePickerPage;

