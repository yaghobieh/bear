import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PasswordInput, Card } from '@forgedevstack/bear';

const PasswordInputPage: FC = () => {
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [pw3, setPw3] = useState('');
  const [pw4, setPw4] = useState('secret123');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PasswordInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Input with built-in visibility toggle for password fields. Wraps the Input component with an eye icon addon.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { PasswordInput } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Password input with show/hide toggle."
        code={`<PasswordInput
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>`}
      >
        <div className="max-w-sm mx-auto space-y-4">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Validation"
        description="Showing error and success states."
        code={`<PasswordInput
  label="Password"
  error="Password must be at least 8 characters"
/>
<PasswordInput
  label="Confirm Password"
  success="Passwords match!"
/>`}
      >
        <div className="max-w-sm mx-auto space-y-4">
          <PasswordInput
            label="Password"
            placeholder="Too short..."
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            error={pw2.length > 0 && pw2.length < 8 ? 'Password must be at least 8 characters' : undefined}
            success={pw2.length >= 8 ? 'Strong password!' : undefined}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Character Count"
        description="Combined with charCount and clearable props (inherited from Input)."
        code={`<PasswordInput
  label="New Password"
  showCharCount
  charCountMax={32}
  clearable
  onClear={() => setPassword('')}
/>`}
      >
        <div className="max-w-sm mx-auto space-y-4">
          <PasswordInput
            label="New Password"
            placeholder="Enter a secure password"
            value={pw3}
            onChange={(e) => setPw3(e.target.value)}
            showCharCount
            charCountMax={32}
            helperText="Use letters, numbers, and symbols"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Available in sm, md, and lg sizes."
        code={`<PasswordInput size="sm" label="Small" />
<PasswordInput size="md" label="Medium" />
<PasswordInput size="lg" label="Large" />`}
      >
        <div className="max-w-sm mx-auto space-y-4">
          <PasswordInput size="sm" label="Small" placeholder="Small password" />
          <PasswordInput size="md" label="Medium" placeholder="Medium password" />
          <PasswordInput size="lg" label="Large" placeholder="Large password" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Hidden Toggle"
        description="Toggle button can be hidden when not needed."
        code={`<PasswordInput
  label="Hidden Toggle"
  hideToggle
/>`}
      >
        <div className="max-w-sm mx-auto">
          <PasswordInput
            label="API Key"
            hideToggle
            value={pw4}
            onChange={(e) => setPw4(e.target.value)}
            helperText="Toggle is hidden — always masked"
          />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <Card className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">visible</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">—</td>
                <td className="p-3">Controlled password visibility</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">onVisibilityChange</td>
                <td className="p-3 font-mono">(visible: boolean) =&gt; void</td>
                <td className="p-3">—</td>
                <td className="p-3">Callback when visibility toggles</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">hideToggle</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Hide the eye icon toggle</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-500">...InputProps</td>
                <td className="p-3 font-mono">InputProps</td>
                <td className="p-3">—</td>
                <td className="p-3">All Input props (label, error, success, clearable, size, etc.)</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default PasswordInputPage;
