import { useState } from 'react';
import { ResizableTextarea } from '@forgedevstack/bear';

export default function ResizableTextareaPage() {
  const [value, setValue] = useState('Drag the handle at the bottom-right to resize.');
  const [resizable, setResizable] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ResizableTextarea</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Textarea with optional resizable height via a drag handle. Min/max height configurable; works in light and dark mode.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input
                type="checkbox"
                checked={resizable}
                onChange={(e) => setResizable(e.target.checked)}
              />{' '}
              Resizable
            </label>
          </div>
          <ResizableTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here..."
            resizable={resizable}
            minHeight={80}
            maxHeight={300}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { ResizableTextarea } from '@forgedevstack/bear';

<ResizableTextarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Description..."
  minHeight={80}
  maxHeight={400}
  resizable={true}
/>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
