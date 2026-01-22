import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

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
        description="Avatar with image, initials, or icon."
        code={`<Avatar src="/avatar.jpg" alt="John Doe" />
<Avatar>JD</Avatar>
<Avatar icon={<UserIcon />} />`}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bear-400 to-bear-600 flex items-center justify-center text-white font-medium overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Different avatar sizes."
        code={`<Avatar size="xs">XS</Avatar>
<Avatar size="sm">SM</Avatar>
<Avatar size="md">MD</Avatar>
<Avatar size="lg">LG</Avatar>
<Avatar size="xl">XL</Avatar>`}
      >
        <div className="flex items-center justify-center gap-4">
          {[
            { size: 'xs', px: 24 },
            { size: 'sm', px: 32 },
            { size: 'md', px: 40 },
            { size: 'lg', px: 48 },
            { size: 'xl', px: 64 },
          ].map(({ size, px }) => (
            <div key={size} className="text-center">
              <div
                className="rounded-full bg-gradient-to-br from-bear-400 to-bear-600 flex items-center justify-center text-white font-medium mx-auto mb-2"
                style={{ width: px, height: px, fontSize: px * 0.35 }}
              >
                {size.toUpperCase()}
              </div>
              <span className="text-xs text-gray-500">{px}px</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Shapes"
        description="Circular or square avatars."
        code={`<Avatar shape="circle">C</Avatar>
<Avatar shape="rounded">R</Avatar>
<Avatar shape="square">S</Avatar>`}
      >
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-bear-500 flex items-center justify-center text-white font-medium mb-2">C</div>
            <span className="text-xs text-gray-500">circle</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white font-medium mb-2">R</div>
            <span className="text-xs text-gray-500">rounded</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-md bg-blue-500 flex items-center justify-center text-white font-medium mb-2">S</div>
            <span className="text-xs text-gray-500">square</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Status"
        description="Show online/offline status indicator."
        code={`<Avatar status="online">JD</Avatar>
<Avatar status="offline">AB</Avatar>
<Avatar status="busy">CD</Avatar>
<Avatar status="away">EF</Avatar>`}
      >
        <div className="flex items-center justify-center gap-6">
          {[
            { status: 'online', color: 'bg-green-500' },
            { status: 'offline', color: 'bg-gray-400' },
            { status: 'busy', color: 'bg-red-500' },
            { status: 'away', color: 'bg-amber-500' },
          ].map(({ status, color }, i) => (
            <div key={status} className="text-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-medium">
                  {['JD', 'AB', 'CD', 'EF'][i]}
                </div>
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${color} rounded-full border-2 border-white dark:border-gray-900`} />
              </div>
              <span className="text-xs text-gray-500">{status}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Avatar Group"
        description="Display multiple avatars in a group."
        code={`<AvatarGroup max={4}>
  <Avatar>A</Avatar>
  <Avatar>B</Avatar>
  <Avatar>C</Avatar>
  <Avatar>D</Avatar>
  <Avatar>E</Avatar>
</AvatarGroup>`}
      >
        <div className="flex justify-center">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden"
              >
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
              +3
            </div>
          </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>xs | sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Avatar size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">shape</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>circle | rounded | square</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">circle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Avatar shape</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">status</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>online | offline | busy | away</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Status indicator</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon fallback</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AvatarPage;
