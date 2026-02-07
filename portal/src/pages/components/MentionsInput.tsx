import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { MentionsInput } from '@forgedevstack/bear';

const MENTION_OPTIONS = [
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'bob', label: 'Bob Smith' },
  { value: 'carol', label: 'Carol Williams' },
];

const MentionsInputPage: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">MentionsInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Input with @mention suggestions. Type @ to trigger the suggestions dropdown.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { MentionsInput } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Type @ to see mention suggestions."
        code={`<MentionsInput
  value={value}
  onChange={(v) => setValue(v)}
  options={[
    { value: 'alice', label: 'Alice Johnson' },
    { value: 'bob', label: 'Bob Smith' },
  ]}
  placeholder="Type @ to mention..."
/>`}
      >
        <div className="w-full max-w-md">
          <MentionsInput
            value={value}
            onChange={(v) => setValue(v)}
            options={MENTION_OPTIONS}
            placeholder="Type @ to mention..."
          />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default MentionsInputPage;
