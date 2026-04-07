import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { OTPInput } from '@forgedevstack/bear';

const OTPInputPage: FC = () => {
  const [otp, setOtp] = useState('');
  const [finished, setFinished] = useState<string | null>(null);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">OTPInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        One-time password input with automatic focus management.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { OTPInput } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="6-digit OTP with circular cells and mobile-friendly wrap."
        allowOverflow
        code={`const [otp, setOtp] = useState('');

<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  variant="circle"
  stackOnNarrow
  onFinish={(code) => console.log('done', code)}
/>`}
      >
        <div className="w-full max-w-sm mx-auto">
          <OTPInput
            length={6}
            value={otp}
            onChange={(v) => {
              setOtp(v);
              setFinished(null);
            }}
            variant="circle"
            stackOnNarrow
            onFinish={(code) => setFinished(code)}
          />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Entered: {otp || '—'}
            {finished ? ` · Finished: ${finished}` : ''}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="4-Digit PIN"
        description="Shorter code with boxed style."
        allowOverflow
        code={`<OTPInput length={4} variant="boxed" />`}
      >
        <div className="w-full max-w-xs mx-auto">
          <OTPInput length={4} variant="boxed" stackOnNarrow />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">length</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">6</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of cells</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(otp: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Value updates</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onComplete</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(otp: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">All digits filled</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onFinish</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(otp: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">—</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alias of onComplete</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boxed | outline | underline | circle</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">boxed</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Cell shape</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">stackOnNarrow</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">3-column grid on small screens</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">cancelAutoJump</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Do not focus next cell on input</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable input</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">autoFocus</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Focus first cell</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OTPInputPage;
