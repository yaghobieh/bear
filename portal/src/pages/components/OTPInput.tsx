import { FC, useState, useRef } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const OTPInputPage: FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

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
        description="6-digit OTP input with auto-focus."
        code={`<OTPInput length={6} value={otp} onChange={setOtp} />`}
      >
        <div className="flex gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-bear-500 focus:ring-2 focus:ring-bear-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">Entered: {otp.join('') || '-'}</p>
      </ComponentPreview>

      <ComponentPreview
        title="4-Digit"
        description="Shorter OTP for PIN codes."
        code={`<OTPInput length={4} />`}
      >
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-bear-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">length</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">6</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of input fields</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current OTP value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(otp: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when OTP changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the input</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">autoFocus</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto focus first field</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OTPInputPage;

