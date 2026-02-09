import React, { useState } from 'react';
import { Typography, CardCompound as Card, JsonViewer, Input } from '@forgedevstack/bear';

const sampleData = {
  name: "Bear UI",
  version: "1.0.9",
  description: "Modern React UI library",
  features: ["TypeScript", "Tailwind CSS", "Dark Mode", "Accessibility"],
  stats: {
    components: 80,
    hooks: 25,
    downloads: 15000,
  },
  isActive: true,
  lastUpdated: null,
};

const JsonViewerPage: React.FC = () => {
  const [customJson, setCustomJson] = useState(JSON.stringify(sampleData, null, 2));
  const [parsedJson, setParsedJson] = useState(sampleData);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    setCustomJson(value);
    try {
      setParsedJson(JSON.parse(value));
      setParseError(null);
    } catch (e) {
      setParseError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">JsonViewer</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Pretty-print and explore JSON data with expandable/collapsible nodes.
        </Typography>
      </div>

      {/* Basic Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Basic Usage</Typography>} />
        <Card.Body>
          <JsonViewer data={sampleData} />
        </Card.Body>
      </Card>

      {/* With Options */}
      <Card>
        <Card.Header title={<Typography variant="h5">With Data Types</Typography>} />
        <Card.Body>
          <JsonViewer data={sampleData} showDataTypes defaultExpandDepth={3} />
        </Card.Body>
      </Card>

      {/* Interactive Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Interactive Demo</Typography>} />
        <Card.Body>
          <div className="space-y-4">
            <textarea
              value={customJson}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="w-full h-40 p-3 font-mono text-sm border rounded-lg bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
              placeholder="Enter JSON here..."
            />
            {parseError && (
              <Typography variant="caption" className="text-red-500">{parseError}</Typography>
            )}
            {!parseError && (
              <JsonViewer data={parsedJson} showCopyButton />
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { JsonViewer } from '@forgedevstack/bear';

// Basic
<JsonViewer data={myObject} />

// With options
<JsonViewer 
  data={myObject}
  defaultExpandDepth={3}
  showDataTypes
  showCopyButton
  onValueClick={(path, value) => console.log(path, value)}
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
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">data</td>
                  <td className="py-3 px-4 font-mono text-xs">unknown</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">JSON data to display</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">defaultExpandDepth</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4 font-mono text-xs">2</td>
                  <td className="py-3 px-4">Levels to expand by default</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showDataTypes</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">Show data type labels</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showCopyButton</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show copy to clipboard button</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onValueClick</td>
                  <td className="py-3 px-4 font-mono text-xs">(path, value) =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Callback when value is clicked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JsonViewerPage;
