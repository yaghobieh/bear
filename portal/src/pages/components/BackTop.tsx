import React from 'react';
import { Typography, CardCompound as Card, Button, BackTop, ChevronUpIcon } from '@forgedevstack/bear';

const BackTopPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h2" className="mb-2">BackTop</Typography>
        <Typography variant="body1" color="secondary">
          A button that scrolls to the top of the page when clicked. Appears after scrolling past a threshold.
        </Typography>
      </div>

      {/* BackTop component - appears after scrolling */}
      <BackTop visibleAt={100} />

      {/* Variants */}
      <Card>
        <Card.Header title={<Typography variant="h5">Variants</Typography>} />
        <Card.Body>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Primary</Typography>
              <div className="relative w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <Button variant="primary" size="sm" className="rounded-full w-11 h-11 p-0">
                  <ChevronUpIcon />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Secondary</Typography>
              <div className="relative w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <Button variant="secondary" size="sm" className="rounded-full w-11 h-11 p-0">
                  <ChevronUpIcon />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Ghost</Typography>
              <div className="relative w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <Button variant="ghost" size="sm" className="rounded-full w-11 h-11 p-0">
                  <ChevronUpIcon />
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Sizes */}
      <Card>
        <Card.Header title={<Typography variant="h5">Sizes</Typography>} />
        <Card.Body>
          <div className="flex gap-6 items-end flex-wrap">
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Small (36px)</Typography>
              <div className="w-9 h-9 rounded-full bg-[var(--bear-primary-500)] flex items-center justify-center text-white shadow-lg">
                <ChevronUpIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Medium (44px)</Typography>
              <div className="w-11 h-11 rounded-full bg-[var(--bear-primary-500)] flex items-center justify-center text-white shadow-lg">
                <ChevronUpIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="block mb-2">Large (52px)</Typography>
              <div className="w-[52px] h-[52px] rounded-full bg-[var(--bear-primary-500)] flex items-center justify-center text-white shadow-lg">
                <ChevronUpIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Usage Examples */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`// Basic usage - appears after 400px scroll
<BackTop />

// Custom threshold - appears after 100px scroll
<BackTop visibleAt={100} />

// Custom position
<BackTop bottom={60} right={20} />

// Different variant
<BackTop variant="secondary" />

// Custom content
<BackTop>
  <span className="text-xs font-bold">TOP</span>
</BackTop>

// Target a specific scroll container
<BackTop target={() => document.getElementById('my-container')} />`}
          </pre>
        </Card.Body>
      </Card>

      {/* Props Table */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">bottom</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number | string</td>
                  <td className="py-3 px-4 font-mono text-xs">40</td>
                  <td className="py-3 px-4">Distance from bottom of viewport</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">right</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number | string</td>
                  <td className="py-3 px-4 font-mono text-xs">40</td>
                  <td className="py-3 px-4">Distance from right of viewport</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">visibleAt</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">400</td>
                  <td className="py-3 px-4">Scroll distance before button appears</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">duration</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">300</td>
                  <td className="py-3 px-4">Scroll animation duration in ms</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">size</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">'sm' | 'md' | 'lg'</td>
                  <td className="py-3 px-4 font-mono text-xs">'md'</td>
                  <td className="py-3 px-4">Button size</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">variant</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">'primary' | 'secondary' | 'ghost'</td>
                  <td className="py-3 px-4 font-mono text-xs">'primary'</td>
                  <td className="py-3 px-4">Button style variant</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">animated</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Enable show/hide animations</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">target</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; HTMLElement</td>
                  <td className="py-3 px-4 font-mono text-xs">window</td>
                  <td className="py-3 px-4">Scroll container element</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onClick</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Click callback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Extra content to enable scrolling */}
      <Card>
        <Card.Header title={<Typography variant="h5">Scroll Test Area</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            This section adds more content to the page to enable scrolling for testing the BackTop component.
          </Typography>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <Typography variant="body2">
                  Section {i} - Keep scrolling to see the BackTop button appear in the bottom-right corner!
                </Typography>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BackTopPage;
