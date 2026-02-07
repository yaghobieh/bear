import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { TagsInput } from '@forgedevstack/bear';

const TagsInputPage: FC = () => {
  const [tags, setTags] = useState<string[]>(['react', 'typescript']);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TagsInput</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Input for adding and removing tags. Press Enter or comma to add.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { TagsInput } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Add tags with Enter or comma."
        code={`<TagsInput
  value={tags}
  onChange={setTags}
  placeholder="Add tags..."
/>`}
      >
        <div className="w-full max-w-md">
          <TagsInput value={tags} onChange={setTags} placeholder="Add tags..." />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Max Tags"
        description="Limit the number of tags."
        code={`<TagsInput value={tags} onChange={setTags} maxTags={5} />`}
      >
        <div className="w-full max-w-md">
          <TagsInput value={tags} onChange={setTags} maxTags={5} placeholder="Max 5 tags..." />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default TagsInputPage;
