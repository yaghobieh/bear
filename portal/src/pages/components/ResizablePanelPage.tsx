import { useState } from 'react';
import { ResizablePanel } from '@forgedevstack/bear';

export default function ResizablePanelPage() {
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ResizablePanel</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Two-pane resizable layout with a draggable divider. Supports horizontal and vertical directions; respects min/max size and dark/light theme.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input
                type="radio"
                name="dir"
                checked={direction === 'horizontal'}
                onChange={() => setDirection('horizontal')}
              />{' '}
              Horizontal
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input
                type="radio"
                name="dir"
                checked={direction === 'vertical'}
                onChange={() => setDirection('vertical')}
              />{' '}
              Vertical
            </label>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" style={{ height: 320 }}>
            <ResizablePanel
              direction={direction}
              first={
                <div className="p-4 h-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  First pane
                </div>
              }
              second={
                <div className="p-4 h-full bg-white dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  Second pane
                </div>
              }
              defaultSize={40}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { ResizablePanel } from '@forgedevstack/bear';

<ResizablePanel
  first={<Sidebar />}
  second={<Main />}
  direction="horizontal"
  defaultSize={30}
  minSize={10}
  maxSize={90}
  onResize={(size) => console.log(size)}
/>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
