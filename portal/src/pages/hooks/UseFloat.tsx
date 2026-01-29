import { useFloat, Card } from '@forgedevstack/bear';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UseFloatPage() {
  const floatVertical = useFloat<HTMLDivElement>({
    direction: 'vertical',
    distance: 15,
    duration: 2000,
  });

  const floatHorizontal = useFloat<HTMLDivElement>({
    direction: 'horizontal',
    distance: 15,
    duration: 2000,
  });

  const floatDiagonal = useFloat<HTMLDivElement>({
    direction: 'diagonal',
    distance: 10,
    duration: 3000,
  });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useFloat</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating smooth floating animations in different directions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const float = useFloat<HTMLDivElement>({
  direction: 'vertical',
  distance: 15,
  duration: 2000,
});

<div ref={float.ref} style={float.style}>
  Floating content
</div>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Float Directions</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <div className="grid grid-cols-3 gap-8 min-h-[200px]">
            <div className="flex flex-col items-center gap-4">
              <Card className="p-4 w-full" ref={floatVertical.ref} style={floatVertical.style}>
                <p className="text-gray-600 dark:text-slate-400 text-center">Vertical</p>
              </Card>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Card className="p-4 w-full" ref={floatHorizontal.ref} style={floatHorizontal.style}>
                <p className="text-gray-600 dark:text-slate-400 text-center">Horizontal</p>
              </Card>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Card className="p-4 w-full" ref={floatDiagonal.ref} style={floatDiagonal.style}>
                <p className="text-gray-600 dark:text-slate-400 text-center">Diagonal</p>
              </Card>
            </div>
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
                <td className="py-3 px-4 font-mono text-sm">direction</td>
                <td className="py-3 px-4 font-mono text-sm">'vertical' | 'horizontal' | 'diagonal'</td>
                <td className="py-3 px-4 font-mono text-sm">'vertical'</td>
                <td className="py-3 px-4">Float direction</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">distance</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">10</td>
                <td className="py-3 px-4">Float distance in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">duration</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">3000</td>
                <td className="py-3 px-4">Duration in ms</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">autoStart</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Start animation on mount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
