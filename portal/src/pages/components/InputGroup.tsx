import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { InputGroup, Input, Select, ResizableTextarea, Card } from '@forgedevstack/bear';

const InputGroupPage: FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">InputGroup</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Form field wrapper providing consistent label, description, helper text, and error layout for any input-like child.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { InputGroup } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Wraps an Input with label and helper text."
        code={`<InputGroup
  label="Full Name"
  helperText="Enter your first and last name"
>
  <Input placeholder="John Doe" fullWidth />
</InputGroup>`}
      >
        <div className="max-w-sm mx-auto">
          <InputGroup
            label="Full Name"
            helperText="Enter your first and last name"
            fullWidth
          >
            <Input
              placeholder="John Doe"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Description"
        description="Add a description between label and input for extra context."
        code={`<InputGroup
  label="Bio"
  description="A brief description about yourself shown on your profile."
  helperText="Keep it under 200 characters"
>
  <ResizableTextarea placeholder="Tell us about yourself..." />
</InputGroup>`}
      >
        <div className="max-w-sm mx-auto">
          <InputGroup
            label="Bio"
            description="A brief description about yourself shown on your profile."
            helperText="Keep it under 200 characters"
            fullWidth
          >
            <ResizableTextarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </InputGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Required Field"
        description="Shows a red asterisk next to the label."
        code={`<InputGroup label="Email" required>
  <Input type="email" placeholder="you@example.com" fullWidth />
</InputGroup>`}
      >
        <div className="max-w-sm mx-auto">
          <InputGroup label="Email" required fullWidth>
            <Input type="email" placeholder="you@example.com" fullWidth />
          </InputGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Error State"
        description="The error prop overrides helperText with red styling."
        code={`<InputGroup
  label="Username"
  error="Username is already taken"
  required
>
  <Input placeholder="johndoe" fullWidth />
</InputGroup>`}
      >
        <div className="max-w-sm mx-auto">
          <InputGroup
            label="Username"
            error="Username is already taken"
            required
            fullWidth
          >
            <Input placeholder="johndoe" fullWidth />
          </InputGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Select"
        description="Works with any input-like component, not just Input."
        code={`<InputGroup
  label="Country"
  description="Where are you based?"
>
  <Select
    options={[
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
    ]}
    placeholder="Select a country"
  />
</InputGroup>`}
      >
        <div className="max-w-sm mx-auto">
          <InputGroup
            label="Country"
            description="Where are you based?"
            fullWidth
          >
            <Select
              options={[
                { label: 'United States', value: 'us' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Germany', value: 'de' },
                { label: 'France', value: 'fr' },
                { label: 'Japan', value: 'jp' },
              ]}
              placeholder="Select a country"
            />
          </InputGroup>
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
                <td className="p-3 font-mono text-pink-500">label</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Group label text</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">description</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Description between label and input</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">error</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Error message (overrides helperText)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">helperText</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Helper text below input</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">required</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Shows red asterisk next to label</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">fullWidth</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Whether group takes full width</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-500">htmlFor</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Links label to input by ID</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default InputGroupPage;
