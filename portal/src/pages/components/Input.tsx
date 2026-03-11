import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Input, BearIcons } from '@forgedevstack/bear';

const InputPage: FC = () => {
  const [value, setValue] = useState('');
  const [capVal, setCapVal] = useState('');
  const [upperVal, setUpperVal] = useState('');
  const [lowerVal, setLowerVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [sentenceVal, setSentenceVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [nameVal, setNameVal] = useState('');
  const [urlVal, setUrlVal] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Input</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Text input field with changeable icons (leftAddon/rightAddon), validation states, auto-formatting, and inline validation.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Input } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Simple text input with placeholder."
        code={`<Input placeholder="Enter your name..." />`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format — Capitalize"
        description="First letter of the value is automatically capitalized on every keystroke."
        code={`<Input
  autoFormat="capitalize"
  label="First name"
  placeholder="john → John"
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="capitalize"
            label="First name"
            placeholder="john → John"
            value={capVal}
            onChange={(e) => setCapVal(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format — Uppercase"
        description="All characters are converted to uppercase."
        code={`<Input
  autoFormat="uppercase"
  label="Country code"
  placeholder="us → US"
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="uppercase"
            label="Country code"
            placeholder="us → US"
            value={upperVal}
            onChange={(e) => setUpperVal(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format — Lowercase"
        description="All characters are converted to lowercase."
        code={`<Input
  autoFormat="lowercase"
  label="Username"
  placeholder="JohnDoe → johndoe"
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="lowercase"
            label="Username"
            placeholder="JohnDoe → johndoe"
            value={lowerVal}
            onChange={(e) => setLowerVal(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format — Title Case"
        description="First letter of every word is capitalized."
        code={`<Input
  autoFormat="titleCase"
  label="Full name"
  placeholder="john doe → John Doe"
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="titleCase"
            label="Full name"
            placeholder="john doe → John Doe"
            value={titleVal}
            onChange={(e) => setTitleVal(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format — Sentence Case"
        description="First letter of the sentence is capitalized, rest lowercase."
        code={`<Input
  autoFormat="sentenceCase"
  label="Bio"
  placeholder="hello WORLD → Hello world"
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="sentenceCase"
            label="Bio"
            placeholder="hello WORLD → Hello world"
            value={sentenceVal}
            onChange={(e) => setSentenceVal(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Inline Validation — Required + Email"
        description="Shows an error on blur when the field is empty or not a valid email. Uses the same ValidationRule as Bear's Form component."
        code={`<Input
  label="Email"
  placeholder="you@example.com"
  validation={{ required: 'Email is required', email: 'Enter a valid email' }}
  validateOnBlur
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            label="Email"
            placeholder="you@example.com"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            validation={{ required: 'Email is required', email: 'Enter a valid email' }}
            validateOnBlur
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Inline Validation — Min Length (on change)"
        description="Validates in real-time as you type. Shows error when fewer than 3 characters."
        code={`<Input
  label="Display name"
  placeholder="At least 3 chars"
  validation={{ minLength: { value: 3, message: 'Must be at least 3 characters' } }}
  validateOnChange
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            label="Display name"
            placeholder="At least 3 chars"
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            validation={{ minLength: { value: 3, message: 'Must be at least 3 characters' } }}
            validateOnChange
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Inline Validation — Pattern"
        description="Regex pattern validation. Requires a URL starting with https://."
        code={`<Input
  label="Website"
  placeholder="https://..."
  validation={{
    pattern: { value: /^https:\\/\\//, message: 'Must start with https://' }
  }}
  validateOnBlur
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            label="Website"
            placeholder="https://..."
            value={urlVal}
            onChange={(e) => setUrlVal(e.target.value)}
            validation={{ pattern: { value: /^https:\/\//, message: 'Must start with https://' } }}
            validateOnBlur
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Auto Format + Validation Combined"
        description="Auto-capitalize + required validation together."
        code={`<Input
  autoFormat="capitalize"
  label="City"
  placeholder="Enter city name"
  validation={{ required: 'City is required' }}
  validateOnBlur
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            autoFormat="capitalize"
            label="City"
            placeholder="Enter city name"
            validation={{ required: 'City is required' }}
            validateOnBlur
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icons (Changeable)"
        description="Use leftAddon and rightAddon for custom icons. Icons are fully changeable."
        code={`<Input leftAddon={<BearIcons.SearchIcon size={18} />} placeholder="Search..." />
<Input rightAddon={<BearIcons.CalendarIcon size={18} />} placeholder="With calendar" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Input
            leftAddon={<BearIcons.SearchIcon size={18} />}
            placeholder="Search..."
          />
          <Input
            rightAddon={<BearIcons.CalendarIcon size={18} />}
            placeholder="With calendar icon"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large inputs."
        code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Error, success, helper text, and disabled."
        code={`<Input error="This field is required" placeholder="Error" />
<Input success="Looks good!" placeholder="Success" />
<Input helperText="We'll never share your email." placeholder="With helper" />
<Input disabled placeholder="Disabled" />`}
      >
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Input error="This field is required" placeholder="Error" />
          <Input success="Looks good!" placeholder="Success" />
          <Input helperText="We'll never share your email." placeholder="With helper" />
          <Input disabled placeholder="Disabled" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Clearable + Character Count"
        description="Show a clear button and live character count."
        code={`<Input
  clearable
  showCharCount
  charCountMax={50}
  placeholder="Type something..."
/>`}
      >
        <div className="max-w-xs mx-auto">
          <Input
            clearable
            showCharCount
            charCountMax={50}
            placeholder="Type something..."
          />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Input size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">error</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Error message (also sets error border)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">success</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Success message (green helper text)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">helperText</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Helper text below input</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">leftAddon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Left icon/addon (changeable)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rightAddon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Right icon/addon (changeable)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">clearable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show clear (X) button when input has value</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showCharCount</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show live character count</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">charCountMax</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max chars for counter display</td></tr>
              <tr className="bg-green-50 dark:bg-green-900/20"><td className="px-4 py-3 font-mono text-bear-600">autoFormat</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>capitalize | uppercase | lowercase | titleCase | sentenceCase | none</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto-format text on every change using Anvil string utils</td></tr>
              <tr className="bg-green-50 dark:bg-green-900/20"><td className="px-4 py-3 font-mono text-bear-600">validation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ValidationRule</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Inline validation rules (same as Form's ValidationRule)</td></tr>
              <tr className="bg-green-50 dark:bg-green-900/20"><td className="px-4 py-3 font-mono text-bear-600">validateOnBlur</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true (when validation set)</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Run validation when input loses focus</td></tr>
              <tr className="bg-green-50 dark:bg-green-900/20"><td className="px-4 py-3 font-mono text-bear-600">validateOnChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Run validation on every keystroke</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fullWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Stretch to full container width</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disabled state</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ValidationRule Shape</h2>
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`type ValidationRule = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
  email?: boolean | string;
};`}
        />
      </section>
    </div>
  );
};

export default InputPage;
