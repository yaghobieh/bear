import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { CreditInput } from '@forgedevstack/bear';
import type { CreditCardValue } from '@forgedevstack/bear';

const CreditInputPage: FC = () => {
  const [card, setCard] = useState<Partial<CreditCardValue>>({});

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">CreditInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Credit card input with auto-formatting, card type detection, and Luhn validation.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { CreditInput } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic (Single Line)"
        description="Compact single-line layout."
        code={`<CreditInput value={card} onChange={setCard} />`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <CreditInput value={card} onChange={setCard} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Split Mode"
        description="Separate fields for card number, expiry, CVV."
        code={`<CreditInput
  value={card}
  onChange={setCard}
  mode="split"
  showName
/>`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <CreditInput value={card} onChange={setCard} mode="split" showName />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Credit input with label."
        code={`<CreditInput
  label="Card details"
  value={card}
  onChange={setCard}
/>`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <CreditInput label="Card details" value={card} onChange={setCard} />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CreditCardValue</code></td><td>Card value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value) =&gt; void</code></td><td>Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">mode</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&apos;single&apos; | &apos;split&apos;</code></td><td>Layout mode</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showName</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Show cardholder name</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CreditInputPage;
