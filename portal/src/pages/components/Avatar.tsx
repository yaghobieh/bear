import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Avatar, AvatarGroup } from '@forgedevstack/bear';

const AvatarPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Avatar</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Display user profile pictures, initials, or icons.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Avatar, AvatarGroup } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Avatar with image or initials."
        code={`<Avatar src="/avatar.jpg" alt="John Doe" />
<Avatar initials="JD" />
<Avatar initials="AB" />`}
      >
        <div className="flex items-center justify-center gap-4">
          <Avatar src="https://i.pravatar.cc/100?img=1" alt="User 1" />
          <Avatar initials="JD" />
          <Avatar initials="AB" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Available in multiple sizes."
        code={`<Avatar size="xs" src="..." />
<Avatar size="sm" src="..." />
<Avatar size="md" src="..." />
<Avatar size="lg" src="..." />
<Avatar size="xl" src="..." />
<Avatar size="2xl" src="..." />`}
      >
        <div className="flex items-center justify-center gap-4">
          <Avatar size="xs" src="https://i.pravatar.cc/100?img=2" />
          <Avatar size="sm" src="https://i.pravatar.cc/100?img=3" />
          <Avatar size="md" src="https://i.pravatar.cc/100?img=4" />
          <Avatar size="lg" src="https://i.pravatar.cc/100?img=5" />
          <Avatar size="xl" src="https://i.pravatar.cc/100?img=6" />
          <Avatar size="2xl" src="https://i.pravatar.cc/100?img=7" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Circle, rounded, or square avatars."
        code={`<Avatar variant="circle" src="..." />
<Avatar variant="rounded" src="..." />
<Avatar variant="square" src="..." />`}
      >
        <div className="flex items-center justify-center gap-4">
          <Avatar variant="circle" src="https://i.pravatar.cc/100?img=8" />
          <Avatar variant="rounded" src="https://i.pravatar.cc/100?img=9" />
          <Avatar variant="square" src="https://i.pravatar.cc/100?img=10" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Status"
        description="Show online/offline status."
        code={`<Avatar src="..." status="online" />
<Avatar src="..." status="offline" />
<Avatar src="..." status="away" />
<Avatar src="..." status="busy" />`}
      >
        <div className="flex items-center justify-center gap-4">
          <Avatar src="https://i.pravatar.cc/100?img=11" status="online" />
          <Avatar src="https://i.pravatar.cc/100?img=12" status="offline" />
          <Avatar src="https://i.pravatar.cc/100?img=13" status="away" />
          <Avatar src="https://i.pravatar.cc/100?img=14" status="busy" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Avatar Group"
        description="Display multiple avatars in a stack."
        code={`<AvatarGroup max={3}>
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>`}
      >
        <div className="flex items-center justify-center">
          <AvatarGroup max={3}>
            <Avatar src="https://i.pravatar.cc/100?img=15" />
            <Avatar src="https://i.pravatar.cc/100?img=16" />
            <Avatar src="https://i.pravatar.cc/100?img=17" />
            <Avatar src="https://i.pravatar.cc/100?img=18" />
            <Avatar src="https://i.pravatar.cc/100?img=19" />
          </AvatarGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Border"
        description="Bordered avatars for group display."
        code={`<Avatar src="..." bordered />`}
      >
        <div className="flex items-center justify-center gap-4">
          <Avatar src="https://i.pravatar.cc/100?img=20" bordered />
          <Avatar initials="CD" bordered />
          <Avatar src="https://i.pravatar.cc/100?img=21" bordered />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">src</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Image URL</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">initials</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fallback initials</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>xs | sm | md | lg | xl | 2xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Avatar size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>circle | rounded | square</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">circle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Shape variant</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">status</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>online | offline | away | busy</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Status indicator</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">bordered</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show border</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AvatarPage;
