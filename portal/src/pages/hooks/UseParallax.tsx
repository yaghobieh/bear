import { useParallax, Card } from '@forgedevstack/bear';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UseParallaxPage() {
  const parallaxSlow = useParallax<HTMLDivElement>({ speed: 0.3 });
  const parallaxNormal = useParallax<HTMLDivElement>({ speed: 0.5 });
  const parallaxFast = useParallax<HTMLDivElement>({ speed: 0.8 });
  const parallaxReverse = useParallax<HTMLDivElement>({ speed: -0.3 });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useParallax</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating parallax scrolling effects with customizable speed.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const parallax = useParallax<HTMLDivElement>({
  speed: 0.5,
  direction: 'vertical',
});

<div ref={parallax.ref} style={parallax.style}>
  Parallax content
</div>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Different Speeds (scroll to see effect)
        </h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50">
          <div className="grid grid-cols-4 gap-4 min-h-[150px]">
            <Card className="p-4" ref={parallaxSlow.ref} style={parallaxSlow.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">0.3x Speed</p>
            </Card>
            <Card className="p-4" ref={parallaxNormal.ref} style={parallaxNormal.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">0.5x Speed</p>
            </Card>
            <Card className="p-4" ref={parallaxFast.ref} style={parallaxFast.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">0.8x Speed</p>
            </Card>
            <Card className="p-4" ref={parallaxReverse.ref} style={parallaxReverse.style}>
              <p className="text-gray-600 dark:text-slate-400 text-center">-0.3x (Reverse)</p>
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
                <td className="py-3 px-4 font-mono text-sm">speed</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">0.5</td>
                <td className="py-3 px-4">Speed multiplier (negative for reverse)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">direction</td>
                <td className="py-3 px-4 font-mono text-sm">'vertical' | 'horizontal'</td>
                <td className="py-3 px-4 font-mono text-sm">'vertical'</td>
                <td className="py-3 px-4">Parallax direction</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">disableOnMobile</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Disable on mobile devices</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
