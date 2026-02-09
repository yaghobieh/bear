import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { AppBar, Button, Avatar, Typography } from '@forgedevstack/bear';

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
          code={`import { AppBar, Typography } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Simple app bar with Typography for text."
        code={`<AppBar
  leftContent={<Typography variant="h6" color="#fff">My App</Typography>}
  rightContent={<Button variant="ghost">Login</Button>}
/>`}
      >
        <div className="w-full">
          <AppBar
            leftContent={<Typography variant="h6" color="#fff">My App</Typography>}
            rightContent={<Button variant="ghost" size="sm">Login</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Navigation"
        description="App bar with center navigation."
        code={`<AppBar
  leftContent={<Typography variant="h6" color="#fff">My App</Typography>}
  centerContent={
    <nav className="flex gap-4">
      <Typography color="#fff" variant="body2">Home</Typography>
      <Typography color="#fff" variant="body2">Products</Typography>
    </nav>
  }
  rightContent={<Button>Get Started</Button>}
/>`}
      >
        <div className="w-full">
          <AppBar
            leftContent={<Typography variant="h6" color="#fff" weight="bold">My App</Typography>}
            centerContent={
              <nav className="flex gap-6">
                <Typography color="rgba(255,255,255,0.8)" variant="body2" className="hover:text-white cursor-pointer transition-colors">Home</Typography>
                <Typography color="rgba(255,255,255,0.8)" variant="body2" className="hover:text-white cursor-pointer transition-colors">Products</Typography>
                <Typography color="rgba(255,255,255,0.8)" variant="body2" className="hover:text-white cursor-pointer transition-colors">About</Typography>
              </nav>
            }
            rightContent={<Button size="sm">Get Started</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Avatar"
        description="App bar with user profile."
        code={`<AppBar
  leftContent={<Typography variant="h6" color="#fff">Dashboard</Typography>}
  rightContent={<Avatar src="/avatar.jpg" size="sm" />}
/>`}
      >
        <div className="w-full">
          <AppBar
            leftContent={<Typography variant="h6" color="#fff" weight="bold">Dashboard</Typography>}
            rightContent={<Avatar src="https://i.pravatar.cc/100?img=3" size="sm" />}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Default Color (Light)"
        description="Light colored app bar for light themes."
        code={`<AppBar color="default">
  ...
</AppBar>`}
      >
        <div className="w-full">
          <AppBar
            color="default"
            leftContent={<Typography variant="h6" weight="bold">Light AppBar</Typography>}
            rightContent={<Button size="sm" variant="outline">Action</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Dark Color"
        description="Dark colored app bar."
        code={`<AppBar color="dark">
  ...
</AppBar>`}
      >
        <div className="w-full">
          <AppBar
            color="dark"
            leftContent={<Typography variant="h6" color="#fff" weight="bold">Dark AppBar</Typography>}
            rightContent={<Button size="sm">Action</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Transparent Variant"
        description="Transparent app bar for hero sections."
        code={`<AppBar variant="transparent" color="default">
  ...
</AppBar>`}
      >
        <div className="w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-1">
          <AppBar
            variant="transparent"
            color="default"
            leftContent={<Typography variant="h6" color="#fff" weight="bold">Brand</Typography>}
            centerContent={
              <nav className="flex gap-6">
                <Typography color="rgba(255,255,255,0.9)" variant="body2">Features</Typography>
                <Typography color="rgba(255,255,255,0.9)" variant="body2">Pricing</Typography>
              </nav>
            }
            rightContent={<Button variant="outline" size="sm">Sign In</Button>}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">position</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>fixed | sticky | static | relative</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">sticky</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Position type</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>default | transparent | blur</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">default</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>default | primary | dark</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Color scheme</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">elevation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show shadow</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">leftContent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Left section content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">centerContent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Center section content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rightContent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Right section content</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AppBarPage;
