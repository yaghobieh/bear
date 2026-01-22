import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const BottomNavigationPage: FC = () => {
  const [active, setActive] = useState(0);
  const items = [
    { icon: '🏠', label: 'Home' },
    { icon: '🔍', label: 'Search' },
    { icon: '❤️', label: 'Favorites' },
    { icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">BottomNavigation</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Mobile-friendly bottom navigation bar for app-like experiences.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { BottomNavigation } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple bottom navigation with icons and labels."
        code={`<BottomNavigation 
  items={[
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <SearchIcon />, label: 'Search' },
    { icon: <FavoriteIcon />, label: 'Favorites' },
    { icon: <ProfileIcon />, label: 'Profile' },
  ]}
  activeItem={active}
  onItemClick={setActive}
/>`}
      >
        <div className="w-full max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">Content Area</span>
          </div>
          <div className="flex justify-around bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                  active === i ? 'text-bear-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Icon Only"
        description="Compact version with icons only."
        code={`<BottomNavigation showLabels={false} items={[...]} />`}
      >
        <div className="w-full max-w-xs mx-auto bg-white dark:bg-gray-900 rounded-full shadow-lg px-4 py-2">
          <div className="flex justify-around">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`p-2 rounded-full transition-all ${
                  active === i ? 'bg-bear-100 dark:bg-bear-900 text-bear-500 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
              </button>
            ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">items</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BottomNavigationItem[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Navigation items</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeItem</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Active item index</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onItemClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(index: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when item is clicked</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showLabels</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show text labels</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BottomNavigationPage;

