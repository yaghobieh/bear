import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

// Rating implementation for portal
const Rating: FC<{
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
}> = ({ value = 0, max = 5, size = 'md', readOnly, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;

  const sizeClasses = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          className={`${sizeClasses[size]} transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          onClick={() => !readOnly && onChange?.(i + 1)}
          onMouseEnter={() => !readOnly && setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(null)}
        >
          <span style={{ color: i < displayValue ? '#ec4899' : '#4b5563' }}>★</span>
        </button>
      ))}
    </div>
  );
};

const RatingPage: FC = () => {
  const [rating, setRating] = useState(3);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Rating</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Star rating component for capturing user feedback and displaying scores.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Rating } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Interactive star rating with click support."
        code={`const [rating, setRating] = useState(3);

<Rating value={rating} onChange={setRating} />
<p>Current rating: {rating}/5</p>`}
      >
        <div className="flex flex-col items-center gap-4">
          <Rating value={rating} onChange={setRating} />
          <p className="text-gray-600 dark:text-gray-400">Current rating: {rating}/5</p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Rating is available in three sizes."
        code={`<Rating size="sm" value={3} />
<Rating size="md" value={4} />
<Rating size="lg" value={5} />`}
      >
        <div className="flex flex-col items-center gap-4">
          <Rating size="sm" value={3} readOnly />
          <Rating size="md" value={4} readOnly />
          <Rating size="lg" value={5} readOnly />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Read Only"
        description="Display-only ratings without interaction."
        code={`<Rating value={4} readOnly />`}
      >
        <Rating value={4} readOnly />
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current rating value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">max</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">5</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum rating value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the stars</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">readOnly</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable interaction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">precision</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>0.5 | 1</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow half stars</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when rating changes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RatingPage;

