import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { LinesOfCode } from '@/components/LinesOfCode';
import { SignPad, Card } from '@forgedevstack/bear';

const SignPadPage: FC = () => {
  const [basicSignature, setBasicSignature] = useState<string | null>(null);
  const [styledSignature, setStyledSignature] = useState<string | null>(null);
  const [formSignature, setFormSignature] = useState<string | null>(null);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SignPad</h1>
        <LinesOfCode lines={250} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Digital signature capture component with touch and mouse support. Perfect for forms, contracts, and documents.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { SignPad } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple signature pad with clear button."
        code={`const [signature, setSignature] = useState<string | null>(null);

<SignPad
  onChange={setSignature}
  placeholder="Sign here"

/>`}
      >
        <div className="space-y-4">
          <SignPad
            onChange={setBasicSignature}
            placeholder="Sign here"
          />
          {basicSignature && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Signature captured ({basicSignature.length.toLocaleString()} bytes)
            </p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Dimensions"
        description="Control the size of the signature area."
        code={`<SignPad
  width={600}
  height={150}
  placeholder="Sign on the line"
/>`}
      >
        <SignPad
          width={600}
          height={150}
          placeholder="Sign on the line"
        />
      </ComponentPreview>

      <ComponentPreview
        title="Custom Styling"
        description="Customize stroke color, width, and background."
        code={`<SignPad
  strokeColor="#ec4899"
  strokeWidth={3}
  backgroundColor="#fdf2f8"
  placeholder="Sign with style"
/>`}
      >
        <SignPad
          onChange={setStyledSignature}
          strokeColor="#ec4899"
          strokeWidth={3}
          backgroundColor="#fdf2f8"
          placeholder="Sign with style"
        />
      </ComponentPreview>

      <ComponentPreview
        title="With Save Button"
        description="Add a save button for explicit confirmation."
        code={`<SignPad
  showSave
  clearText="Reset"
  saveText="Confirm Signature"
/>`}
      >
        <SignPad
          showSave
          clearText="Reset"
          saveText="Confirm Signature"
        />
      </ComponentPreview>

      <ComponentPreview
        title="In a Form"
        description="Use the signature pad as part of a form."
        code={`<form>
  <label>Customer Signature</label>
  <SignPad onChange={setSignature} />
  <Button type="submit">Submit</Button>
</form>`}
      >
        <Card className="p-4">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Customer Name
              </label>
              <input 
                type="text" 
                placeholder="Enter name..." 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Signature
              </label>
              <SignPad
                onChange={setFormSignature}
                width={350}
                height={120}
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={!formSignature}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Agreement
              </button>
            </div>
          </form>
        </Card>
      </ComponentPreview>

      <ComponentPreview
        title="Read-Only"
        description="Display a captured signature without editing."
        code={`<SignPad readOnly />`}
      >
        <SignPad readOnly placeholder="Signature captured" />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled state - no interaction allowed."
        code={`<SignPad disabled />`}
      >
        <SignPad disabled placeholder="Signing disabled" />
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
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(signature: string | null) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called with base64 image data when signature changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">width</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">400</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Width of the canvas</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">height</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">200</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Height of the canvas</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">strokeColor</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'#000000'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color of the signature stroke</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">strokeWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">2</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Width of the signature stroke</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">backgroundColor</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'transparent'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Background color of the canvas</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">placeholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'Sign here'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder text when empty</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Completely disables the pad</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">readOnly</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allows viewing but not signing</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">showClear</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show clear button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">showSave</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show save button</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">outputFormat</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">'image/png' | 'image/jpeg' | 'image/webp'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'image/png'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Output image format</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Getting the Signature</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The signature is returned as a base64-encoded data URL. You can use it directly as an image source or send it to your server.
        </p>
        <CodeBlock
          code={`const [signature, setSignature] = useState<string | null>(null);

<SignPad onChange={setSignature} />

// Display the signature
{signature && <img src={signature} alt="Signature" />}

// Send to server
const handleSubmit = async () => {
  await fetch('/api/signature', {
    method: 'POST',
    body: JSON.stringify({ signature }),
  });
};`}
          language="tsx"
          title="Usage Example"
        />
      </section>
    </div>
  );
};

export default SignPadPage;

