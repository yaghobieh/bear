import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const TimelinePage: FC = () => {
  const events = [
    { time: '10:00 AM', title: 'Project Started', description: 'Initial project setup and planning' },
    { time: '2:00 PM', title: 'Design Review', description: 'Team reviewed UI/UX designs' },
    { time: '4:30 PM', title: 'Development Begin', description: 'Started coding the main features' },
    { time: '6:00 PM', title: 'First Milestone', description: 'Completed core functionality' },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Timeline</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display events in chronological order with a visual timeline.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Timeline } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Vertical timeline with events."
        code={`<Timeline items={[
  { time: '10:00 AM', title: 'Project Started', description: '...' },
  { time: '2:00 PM', title: 'Design Review', description: '...' },
  ...
]} />`}
      >
        <div className="w-full max-w-md">
          {events.map((event, i) => (
            <div key={i} className="flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-bear-500" />
                {i < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />}
              </div>
              <div className="flex-1 pb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">{event.time}</span>
                <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Alternate Sides"
        description="Timeline items alternating left and right."
        code={`<Timeline align="alternate" items={[...]} />`}
      >
        <div className="w-full max-w-2xl">
          {events.map((event, i) => (
            <div key={i} className={`flex gap-4 pb-8 last:pb-0 ${i % 2 === 1 ? 'flex-row-reverse text-right' : ''}`}>
              <div className={`flex-1 ${i % 2 === 1 ? 'text-right' : ''}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400">{event.time}</span>
                <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-bear-500" />
                {i < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />}
              </div>
              <div className="flex-1" />
            </div>
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>TimelineItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Timeline events</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>vertical | horizontal</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">vertical</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Layout direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">align</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>left | right | alternate</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">left</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Content alignment</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TimelinePage;

