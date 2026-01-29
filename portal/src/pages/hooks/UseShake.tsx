import { useShake, Button, Card, Input } from '@forgedevstack/bear';
import { useState } from 'react';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UseShakePage() {
  const [inputValue, setInputValue] = useState('');
  const shake = useShake<HTMLDivElement>({ intensity: 10, duration: 500 });
  const shakeLight = useShake<HTMLDivElement>({ intensity: 5, duration: 300 });
  const shakeIntense = useShake<HTMLDivElement>({ intensity: 20, duration: 700 });
  const inputShake = useShake<HTMLDivElement>({ intensity: 8, duration: 400 });

  const handleValidate = () => {
    if (!inputValue) {
      inputShake.shake();
    }
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useShake</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating shake animations, perfect for error feedback.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const shake = useShake<HTMLDivElement>({
  intensity: 10,
  duration: 500,
});

<div ref={shake.ref} style={shake.style}>
  Shake me!
</div>

<button onClick={shake.shake}>Shake</button>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Button onClick={shake.shake}>Shake Normal</Button>
            <Button variant="outline" onClick={shakeLight.shake}>Shake Light</Button>
            <Button variant="outline" onClick={shakeIntense.shake}>Shake Intense</Button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <Card className="p-4" ref={shake.ref} style={shake.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Normal</p>
            </Card>
            <Card className="p-4" ref={shakeLight.ref} style={shakeLight.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Light</p>
            </Card>
            <Card className="p-4" ref={shakeIntense.ref} style={shakeIntense.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Intense</p>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Error Feedback Example</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <div className="flex gap-4 items-end max-w-md">
            <div className="flex-1" ref={inputShake.ref} style={inputShake.style}>
              <Input
                placeholder="Enter something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <Button onClick={handleValidate}>Validate</Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
            Click validate without entering anything to see the shake effect
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Option</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Type</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Default</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-slate-400">
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">intensity</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">10</td>
                <td className="py-3 px-4">Shake intensity in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">duration</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">500</td>
                <td className="py-3 px-4">Duration in ms</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">count</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">5</td>
                <td className="py-3 px-4">Number of shakes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
