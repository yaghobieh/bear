import React, { useState } from 'react';
import { Typography, CardCompound as Card, DiffViewer, Button } from '@forgedevstack/bear';

const oldCode = `function greet(name) {
  console.log("Hello " + name);
  return true;
}`;

const newCode = `function greet(name, greeting = "Hello") {
  console.log(greeting + " " + name);
  console.log("Welcome!");
  return true;
}`;

const DiffViewerPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">DiffViewer</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Compare and visualize text/code differences with split or unified view.
        </Typography>
      </div>

      {/* View Mode Toggle */}
      <Card>
        <Card.Header title={<Typography variant="h5">View Modes</Typography>} />
        <Card.Body>
          <div className="flex gap-2 mb-4">
            <Button 
              variant={viewMode === 'split' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('split')}
            >
              Split View
            </Button>
            <Button 
              variant={viewMode === 'unified' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('unified')}
            >
              Unified View
            </Button>
          </div>
          <DiffViewer 
            oldValue={oldCode}
            newValue={newCode}
            viewMode={viewMode}
            showStats
            showLineNumbers
          />
        </Card.Body>
      </Card>

      {/* Split View */}
      <Card>
        <Card.Header title={<Typography variant="h5">Split View (Default)</Typography>} />
        <Card.Body>
          <DiffViewer 
            oldValue={oldCode}
            newValue={newCode}
            viewMode="split"
            oldTitle="Before"
            newTitle="After"
          />
        </Card.Body>
      </Card>

      {/* Unified View */}
      <Card>
        <Card.Header title={<Typography variant="h5">Unified View</Typography>} />
        <Card.Body>
          <DiffViewer 
            oldValue={oldCode}
            newValue={newCode}
            viewMode="unified"
            showStats
          />
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { DiffViewer } from '@forgedevstack/bear';

<DiffViewer 
  oldValue="const x = 1;"
  newValue="const x = 2;"
  viewMode="split"       // or "unified"
  showLineNumbers
  showStats
  oldTitle="Original"
  newTitle="Modified"
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Props */}
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
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">oldValue</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Original text</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">newValue</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Modified text</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">viewMode</td>
                  <td className="py-3 px-4 font-mono text-xs">'split' | 'unified'</td>
                  <td className="py-3 px-4 font-mono text-xs">'split'</td>
                  <td className="py-3 px-4">Display mode</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showLineNumbers</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show line numbers</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showStats</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show additions/deletions count</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DiffViewerPage;
