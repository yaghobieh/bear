import { useBounce, Button, Card } from '@forgedevstack/bear';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UseBouncePage() {
  const bounce = useBounce<HTMLDivElement>({
    height: 20,
    duration: 600,
    autoStart: false,
  });

  const bounceLow = useBounce<HTMLDivElement>({
    height: 10,
    duration: 400,
    autoStart: false,
  });

  const bounceHigh = useBounce<HTMLDivElement>({
    height: 40,
    duration: 800,
    autoStart: false,
  });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useBounce</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating bouncy animations with customizable height and duration.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const bounce = useBounce<HTMLDivElement>({
  height: 20,
  duration: 600,
});

<div ref={bounce.ref} style={bounce.style}>
  Bouncy content
</div>

// Controls
<button onClick={bounce.start}>Start</button>
<button onClick={bounce.stop}>Stop</button>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Button onClick={bounce.toggle}>
              {bounce.isActive ? 'Stop' : 'Start'} Normal
            </Button>
            <Button variant="outline" onClick={bounceLow.toggle}>
              {bounceLow.isActive ? 'Stop' : 'Start'} Low
            </Button>
            <Button variant="outline" onClick={bounceHigh.toggle}>
              {bounceHigh.isActive ? 'Stop' : 'Start'} High
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 min-h-[150px]">
            <Card className="p-4" ref={bounce.ref} style={bounce.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Normal</p>
            </Card>
            <Card className="p-4" ref={bounceLow.ref} style={bounceLow.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">Low</p>
            </Card>
            <Card className="p-4" ref={bounceHigh.ref} style={bounceHigh.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">High</p>
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
                <td className="py-3 px-4 font-mono text-sm">height</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">20</td>
                <td className="py-3 px-4">Bounce height in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">duration</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">600</td>
                <td className="py-3 px-4">Duration per bounce in ms</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">count</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">0</td>
                <td className="py-3 px-4">Number of bounces (0 = infinite)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">autoStart</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Start on mount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
