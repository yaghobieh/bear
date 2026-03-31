import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { ThemeIcon, Card, BearIcons } from '@forgedevstack/bear';

const ThemeIconPage: FC = () => (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ThemeIcon</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      Render an icon inside a themed circle or square with consistent sizing, color, and optional gradient background.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
      <CodeBlock code={`import { ThemeIcon } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
    </section>

    <ComponentPreview
      title="Variants"
      description="Built-in color variants match the global theme."
      code={`<ThemeIcon variant="primary"><BearIcons.StarIcon size={18} /></ThemeIcon>
<ThemeIcon variant="success"><BearIcons.CheckIcon size={18} /></ThemeIcon>
<ThemeIcon variant="danger"><BearIcons.AlertTriangleIcon size={18} /></ThemeIcon>
<ThemeIcon variant="info"><BearIcons.InfoIcon size={18} /></ThemeIcon>`}
    >
      <div className="flex items-center gap-4 justify-center">
        <ThemeIcon variant="primary"><BearIcons.StarIcon size={18} /></ThemeIcon>
        <ThemeIcon variant="success"><BearIcons.CheckIcon size={18} /></ThemeIcon>
        <ThemeIcon variant="danger"><BearIcons.AlertTriangleIcon size={18} /></ThemeIcon>
        <ThemeIcon variant="info"><BearIcons.InfoIcon size={18} /></ThemeIcon>
        <ThemeIcon variant="ghost"><BearIcons.SettingsIcon size={18} /></ThemeIcon>
        <ThemeIcon variant="outline"><BearIcons.EditIcon size={18} /></ThemeIcon>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Sizes"
      description="Available in xs through xl, or pass a pixel number."
      code={`<ThemeIcon size="xs"><BearIcons.HeartIcon size={10} /></ThemeIcon>
<ThemeIcon size="sm"><BearIcons.HeartIcon size={14} /></ThemeIcon>
<ThemeIcon size="md"><BearIcons.HeartIcon size={18} /></ThemeIcon>
<ThemeIcon size="lg"><BearIcons.HeartIcon size={22} /></ThemeIcon>
<ThemeIcon size="xl"><BearIcons.HeartIcon size={28} /></ThemeIcon>`}
    >
      <div className="flex items-center gap-4 justify-center">
        <ThemeIcon size="xs"><BearIcons.HeartIcon size={10} /></ThemeIcon>
        <ThemeIcon size="sm"><BearIcons.HeartIcon size={14} /></ThemeIcon>
        <ThemeIcon size="md"><BearIcons.HeartIcon size={18} /></ThemeIcon>
        <ThemeIcon size="lg"><BearIcons.HeartIcon size={22} /></ThemeIcon>
        <ThemeIcon size="xl"><BearIcons.HeartIcon size={28} /></ThemeIcon>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Radius"
      description="Control corner rounding from square to fully circular."
      code={`<ThemeIcon radius="sm">…</ThemeIcon>
<ThemeIcon radius="lg">…</ThemeIcon>
<ThemeIcon radius="full">…</ThemeIcon>`}
    >
      <div className="flex items-center gap-4 justify-center">
        <ThemeIcon radius="sm"><BearIcons.StarIcon size={18} /></ThemeIcon>
        <ThemeIcon radius="lg"><BearIcons.StarIcon size={18} /></ThemeIcon>
        <ThemeIcon radius="full"><BearIcons.StarIcon size={18} /></ThemeIcon>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Gradient"
      description="Pass a gradient prop for vibrant backgrounds."
      code={`<ThemeIcon gradient={{ from: '#ec4899', to: '#8b5cf6' }} size="lg" radius="full">
  <BearIcons.ZapIcon size={22} />
</ThemeIcon>`}
    >
      <div className="flex items-center gap-4 justify-center">
        <ThemeIcon gradient={{ from: '#ec4899', to: '#8b5cf6' }} size="lg" radius="full">
          <BearIcons.ZapIcon size={22} />
        </ThemeIcon>
        <ThemeIcon gradient={{ from: '#06b6d4', to: '#3b82f6' }} size="lg" radius="full">
          <BearIcons.GlobeIcon size={22} />
        </ThemeIcon>
        <ThemeIcon gradient={{ from: '#f59e0b', to: '#ef4444' }} size="lg" radius="full">
          <BearIcons.ZapIcon size={22} />
        </ThemeIcon>
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
              <td className="p-3 font-mono text-pink-500">children</td>
              <td className="p-3 font-mono">ReactNode</td>
              <td className="p-3">—</td>
              <td className="p-3">Icon element to render</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">variant</td>
              <td className="p-3 font-mono">BearVariant</td>
              <td className="p-3">"primary"</td>
              <td className="p-3">Color variant</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">size</td>
              <td className="p-3 font-mono">BearSize | number</td>
              <td className="p-3">"md"</td>
              <td className="p-3">Wrapper dimensions</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-mono text-pink-500">radius</td>
              <td className="p-3 font-mono">"sm" | "md" | "lg" | "xl" | "full"</td>
              <td className="p-3">"md"</td>
              <td className="p-3">Border radius</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-pink-500">gradient</td>
              <td className="p-3 font-mono">{'{ from, to, deg? }'}</td>
              <td className="p-3">—</td>
              <td className="p-3">Gradient background</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  </div>
);

export default ThemeIconPage;
