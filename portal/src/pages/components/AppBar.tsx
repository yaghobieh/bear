import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const AppBarPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AppBar</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Top navigation bar for applications with support for fixed and sticky positioning.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { AppBar } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple app bar with title and actions."
        code={`<AppBar>
  <h1>My App</h1>
  <nav>...</nav>
</AppBar>`}
      >
        <div className="w-full bg-bear-600 text-white px-4 py-3 flex items-center justify-between rounded-lg">
          <h1 className="text-lg font-semibold">My Application</h1>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80">Home</a>
            <a href="#" className="hover:opacity-80">About</a>
            <a href="#" className="hover:opacity-80">Contact</a>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Search"
        description="Include a search input in the app bar."
        code={`<AppBar>
  <Logo />
  <SearchInput />
  <UserMenu />
</AppBar>`}
      >
        <div className="w-full bg-white dark:bg-gray-800 shadow-md px-4 py-2 flex items-center justify-between rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bear-500 rounded-lg" />
            <span className="font-semibold text-gray-900 dark:text-white">Brand</span>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Color Variants"
        description="Different color schemes for the app bar."
        code={`<AppBar color="primary">...</AppBar>
<AppBar color="transparent">...</AppBar>`}
      >
        <div className="space-y-4">
          <div className="w-full bg-bear-600 text-white px-4 py-3 flex items-center justify-between rounded-lg">
            <span className="font-semibold">Primary</span>
          </div>
          <div className="w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between rounded-lg">
            <span className="font-semibold">Dark</span>
          </div>
          <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between rounded-lg">
            <span className="font-semibold text-gray-900 dark:text-white">Light</span>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">App bar content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>fixed | sticky | static</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">sticky</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Positioning behavior</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | transparent | default</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color scheme</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AppBarPage;

