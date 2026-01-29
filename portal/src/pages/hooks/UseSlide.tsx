import { useSlide, Button, Card } from '@forgedevstack/bear';
import { BearCodeBlock } from '../../components/CodeBlock';

export default function UseSlidePage() {
  const slideLeft = useSlide<HTMLDivElement>({
    direction: 'left',
    distance: 100,
    duration: 600,
    triggerOnMount: false,
  });

  const slideRight = useSlide<HTMLDivElement>({
    direction: 'right',
    distance: 100,
    duration: 600,
    triggerOnMount: false,
  });

  const slideUp = useSlide<HTMLDivElement>({
    direction: 'up',
    distance: 50,
    duration: 600,
    triggerOnMount: false,
  });

  const slideDown = useSlide<HTMLDivElement>({
    direction: 'down',
    distance: 50,
    duration: 600,
    triggerOnMount: false,
  });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useSlide</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          A hook for creating slide-in animations with customizable direction and distance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <BearCodeBlock
          language="tsx"
          code={`const slide = useSlide<HTMLDivElement>({
  direction: 'left',
  distance: 100,
  duration: 600,
});

<div ref={slide.ref} style={slide.style}>
  Content slides in from left
</div>`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Slide Directions</h2>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Button onClick={() => { slideLeft.reset(); setTimeout(slideLeft.trigger, 50); }}>
              Slide from Left
            </Button>
            <Button onClick={() => { slideRight.reset(); setTimeout(slideRight.trigger, 50); }}>
              Slide from Right
            </Button>
            <Button onClick={() => { slideUp.reset(); setTimeout(slideUp.trigger, 50); }}>
              Slide from Bottom
            </Button>
            <Button onClick={() => { slideDown.reset(); setTimeout(slideDown.trigger, 50); }}>
              Slide from Top
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 min-h-[200px]">
            <Card className="p-4" ref={slideLeft.ref} style={slideLeft.style}>
              <p className="text-gray-600 dark:text-slate-400">Slides from left</p>
            </Card>
            <Card className="p-4" ref={slideRight.ref} style={slideRight.style}>
              <p className="text-gray-600 dark:text-slate-400">Slides from right</p>
            </Card>
            <Card className="p-4" ref={slideUp.ref} style={slideUp.style}>
              <p className="text-gray-600 dark:text-slate-400">Slides from bottom</p>
            </Card>
            <Card className="p-4" ref={slideDown.ref} style={slideDown.style}>
              <p className="text-gray-600 dark:text-slate-400">Slides from top</p>
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
                <td className="py-3 px-4 font-mono text-sm">direction</td>
                <td className="py-3 px-4 font-mono text-sm">'left' | 'right' | 'up' | 'down'</td>
                <td className="py-3 px-4 font-mono text-sm">'left'</td>
                <td className="py-3 px-4">Slide direction</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">distance</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">50</td>
                <td className="py-3 px-4">Distance in pixels</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">duration</td>
                <td className="py-3 px-4 font-mono text-sm">number</td>
                <td className="py-3 px-4 font-mono text-sm">500</td>
                <td className="py-3 px-4">Duration in ms</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">triggerOnMount</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">true</td>
                <td className="py-3 px-4">Trigger animation on mount</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">triggerOnView</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4 font-mono text-sm">false</td>
                <td className="py-3 px-4">Trigger when in viewport</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Return Value</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Property</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Type</th>
                <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-slate-400">
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">ref</td>
                <td className="py-3 px-4 font-mono text-sm">RefObject</td>
                <td className="py-3 px-4">Ref to attach to element</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">style</td>
                <td className="py-3 px-4 font-mono text-sm">CSSProperties</td>
                <td className="py-3 px-4">Style object to apply</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">isActive</td>
                <td className="py-3 px-4 font-mono text-sm">boolean</td>
                <td className="py-3 px-4">Whether animation is active</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">trigger</td>
                <td className="py-3 px-4 font-mono text-sm">() =&gt; void</td>
                <td className="py-3 px-4">Trigger animation</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-3 px-4 font-mono text-sm">reset</td>
                <td className="py-3 px-4 font-mono text-sm">() =&gt; void</td>
                <td className="py-3 px-4">Reset to initial state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
