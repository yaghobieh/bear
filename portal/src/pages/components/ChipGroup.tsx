import { FC } from 'react';
import { Avatar, Chip, ChipGroup } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const ChipGroupPage: FC = () => (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ChipGroup</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      Layout helper for avatar chips and tag sets with optional overflow count.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
      <CodeBlock
        code={`import { Chip, ChipGroup, Avatar } from '@forgedevstack/bear';`}
        language="tsx"
        showLineNumbers={false}
      />
    </section>

    <ComponentPreview
      title="Avatar chips"
      description="Group chips with avatars and show +N when capped."
      code={`<ChipGroup max={3}>
  <Chip avatar={<Avatar initials="A" size="xs" />}>Ada</Chip>
  <Chip avatar={<Avatar initials="B" size="xs" />}>Bea</Chip>
  <Chip avatar={<Avatar initials="C" size="xs" />}>Cam</Chip>
  <Chip avatar={<Avatar initials="D" size="xs" />}>Dee</Chip>
</ChipGroup>`}
    >
      <ChipGroup max={3}>
        <Chip avatar={<Avatar initials="A" size="xs" />}>Ada</Chip>
        <Chip avatar={<Avatar initials="B" size="xs" />}>Bea</Chip>
        <Chip avatar={<Avatar initials="C" size="xs" />}>Cam</Chip>
        <Chip avatar={<Avatar initials="D" size="xs" />}>Dee</Chip>
      </ChipGroup>
    </ComponentPreview>

    <PropsTable
      title="Props"
      rows={[
        { name: 'max', type: 'number', description: 'Visible chip count before +N overflow' },
        { name: 'spacing', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Gap between chips' },
        { name: 'children', type: 'ReactNode', default: 'Required', description: 'Chip elements' },
      ]}
    />
  </div>
);

export default ChipGroupPage;
