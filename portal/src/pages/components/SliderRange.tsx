import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { SliderRange } from '@forgedevstack/bear';

const SliderRangePage: FC = () => {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">SliderRange</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Dual-thumb range slider for selecting a min–max range.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { SliderRange } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Range slider with two thumbs."
        code={`<SliderRange
  value={[20, 80]}
  onChange={(val) => setRange(val)}
/>`}
      >
        <div className="w-full max-w-md">
          <SliderRange value={range} onChange={setRange} />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Range: {range[0]} – {range[1]}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colors"
        description="Different color variants."
        code={`<SliderRange color="primary" defaultValue={[30, 70]} />
<SliderRange color="success" defaultValue={[20, 60]} />`}
      >
        <div className="w-full max-w-md space-y-6">
          <SliderRange color="primary" defaultValue={[30, 70]} />
          <SliderRange color="success" defaultValue={[20, 60]} />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default SliderRangePage;
