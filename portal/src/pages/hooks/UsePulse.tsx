import { usePulse, Button, Card } from '@forgedevstack/bear';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UsePulsePage() {
  const pulse = usePulse<HTMLDivElement>({ scale: 1.05, autoStart: false });
  const pulseSmall = usePulse<HTMLDivElement>({ scale: 1.02, duration: 500, autoStart: false });
  const pulseLarge = usePulse<HTMLDivElement>({ scale: 1.15, duration: 1500, autoStart: false });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">usePulse</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating pulsing scale animations to draw attention to elements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const pulse = usePulse<HTMLDivElement>({
  scale: 1.05,
  duration: 1000,
});

<div ref={pulse.ref} style={pulse.style}>
  Pulsing content
</div>

// Controls
<button onClick={pulse.start}>Start</button>
<button onClick={pulse.pulse}>Pulse once</button>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Button onClick={pulse.toggle}>
              {pulse.isActive ? 'Stop' : 'Start'} Normal
            </Button>
            <Button variant="outline" onClick={pulseSmall.toggle}>
              {pulseSmall.isActive ? 'Stop' : 'Start'} Small
            </Button>
            <Button variant="outline" onClick={pulseLarge.toggle}>
              {pulseLarge.isActive ? 'Stop' : 'Start'} Large
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 min-h-[150px]">
            <Card className="p-4" ref={pulse.ref} style={pulse.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Normal (1.05x)</p>
            </Card>
            <Card className="p-4" ref={pulseSmall.ref} style={pulseSmall.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Small (1.02x)</p>
            </Card>
            <Card className="p-4" ref={pulseLarge.ref} style={pulseLarge.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Large (1.15x)</p>
            </Card>
          </div>
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
                <td className="py-3 px-4 font-mono text-sm">scale</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">1.05</td>
                <td className="py-3 px-4">Max scale factor</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">duration</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">1000</td>
                <td className="py-3 px-4">Duration per pulse in ms</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">count</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">0</td>
                <td className="py-3 px-4">Number of pulses (0 = infinite)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">autoStart</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4">Start on mount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
