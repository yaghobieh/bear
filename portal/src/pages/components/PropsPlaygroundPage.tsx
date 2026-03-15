import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsPlayground, Button, Badge } from '@forgedevstack/bear';

const PropsPlaygroundPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PropsPlayground</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={210} />
        <CopyImport componentName="PropsPlayground" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Self-contained live props editor with preview. Define a config, pass a render function, and get an interactive playground for any component.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { PropsPlayground } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Button playground"
        description="A full props playground for the Button component."
        code={`<PropsPlayground
  config={{
    variant: {
      type: 'select',
      default: 'primary',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'outline', label: 'Outline' },
        { value: 'ghost', label: 'Ghost' },
      ],
    },
    disabled: { type: 'boolean', default: false },
    label: { type: 'string', default: 'Click me' },
  }}
  render={(props) => (
    <Button
      variant={props.variant as string}
      disabled={props.disabled === true}
    >
      {String(props.label)}
    </Button>
  )}
/>`}
      >
        <PropsPlayground
          config={{
            variant: {
              type: 'select',
              default: 'primary',
              options: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' },
              ],
            },
            disabled: { type: 'boolean', default: false },
            label: { type: 'string', default: 'Click me', placeholder: 'Button text' },
          }}
          render={(props) => (
            <div className="flex justify-center">
              <Button
                variant={props.variant as string}
                disabled={props.disabled === true}
              >
                {String(props.label)}
              </Button>
            </div>
          )}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Badge playground"
        description="Multiple control types working together: select, boolean, and string."
        code={`<PropsPlayground
  config={{
    variant: { type: 'select', default: 'primary', options: [...] },
    size: { type: 'select', default: 'md', options: [...] },
    pill: { type: 'boolean', default: false },
    dot: { type: 'boolean', default: false },
    content: { type: 'string', default: 'Badge' },
  }}
  render={(props) => (
    <Badge variant={...} size={...} pill={...} dot={...}>
      {String(props.content)}
    </Badge>
  )}
/>`}
      >
        <PropsPlayground
          columns={3}
          config={{
            variant: {
              type: 'select',
              default: 'primary',
              options: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'success', label: 'Success' },
                { value: 'danger', label: 'Danger' },
                { value: 'info', label: 'Info' },
              ],
            },
            size: {
              type: 'select',
              default: 'md',
              options: [
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
              ],
            },
            pill: { type: 'boolean', default: false },
            dot: { type: 'boolean', default: false },
            content: { type: 'string', default: 'Badge', placeholder: 'Badge text' },
          }}
          render={(props) => (
            <div className="flex justify-center">
              <Badge
                variant={props.variant as 'primary' | 'secondary' | 'success' | 'danger' | 'info'}
                size={props.size as 'sm' | 'md' | 'lg'}
                pill={props.pill === true}
                dot={props.dot === true}
              >
                {String(props.content)}
              </Badge>
            </div>
          )}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Collapsed by default"
        description="Start with controls hidden."
        code={`<PropsPlayground defaultCollapsed config={...} render={...} />`}
      >
        <PropsPlayground
          defaultCollapsed
          title="Expand to edit"
          config={{
            text: { type: 'string', default: 'Hello Bear!', placeholder: 'Type something' },
          }}
          render={(props) => (
            <p className="text-center text-lg text-zinc-200 font-medium">{String(props.text)}</p>
          )}
        />
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
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">config</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>PropsConfig</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controls configuration (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">render</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(values) =&gt; ReactNode</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Render function receiving current values (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">title</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Props</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Header title</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">size</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>BearSize</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Component size</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">columns</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>1 | 2 | 3 | 4</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">3</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Grid columns for controls</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">defaultCollapsed</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Start with controls hidden</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">showReset</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show reset button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PropsPlaygroundPage;
