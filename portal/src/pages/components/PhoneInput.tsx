import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PhoneInput } from '@forgedevstack/bear';
import type { PhoneValue } from '@forgedevstack/bear';

const PhoneInputPage: FC = () => {
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PhoneInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        International phone number input with country selector, flags, and auto-formatting.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { PhoneInput } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Phone input with country selector."
        code={`<PhoneInput value={phone} onChange={setPhone} />`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <PhoneInput value={phone} onChange={setPhone} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Label"
        description="Phone input with label and default country."
        code={`<PhoneInput
  label="Phone Number"
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
  preferredCountries={['US', 'GB', 'CA']}
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <PhoneInput
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            defaultCountry="US"
            preferredCountries={['US', 'GB', 'CA']}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different sizes."
        code={`<PhoneInput value={phone} onChange={setPhone} size="sm" />
<PhoneInput value={phone} onChange={setPhone} size="md" />
<PhoneInput value={phone} onChange={setPhone} size="lg" />`}
        allowOverflow
      >
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <PhoneInput value={phone} onChange={setPhone} size="sm" />
          <PhoneInput value={phone} onChange={setPhone} size="md" />
          <PhoneInput value={phone} onChange={setPhone} size="lg" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Only Specific Countries"
        description="Restrict to US and Canada."
        code={`<PhoneInput
  value={phone}
  onChange={setPhone}
  onlyCountries={['US', 'CA']}
/>`}
        allowOverflow
      >
        <div className="max-w-xs w-full">
          <PhoneInput value={phone} onChange={setPhone} onlyCountries={['US', 'CA']} />
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>PhoneValue</code></td><td>-</td><td>Phone value object</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(value: PhoneValue) =&gt; void</code></td><td>-</td><td>Change handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">defaultCountry</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td>US</td><td>Default country code</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">preferredCountries</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td>[]</td><td>Countries shown at top</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onlyCountries</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string[]</code></td><td>-</td><td>Restrict to these countries</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">searchable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>true</td><td>Enable country search</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showFlags</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>true</td><td>Show country flags</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PhoneInputPage;
