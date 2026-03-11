import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { SplitButton } from '@forgedevstack/bear';

const SAVE_OPTIONS = [
  { id: 'draft', label: 'Save as draft', onClick: () => alert('Saved as draft') },
  { id: 'template', label: 'Save as template', onClick: () => alert('Saved as template') },
  { id: 'copy', label: 'Save a copy', onClick: () => alert('Copy saved') },
];

const EXPORT_OPTIONS = [
  { id: 'csv', label: 'Export as CSV', onClick: () => alert('Exported CSV') },
  { id: 'pdf', label: 'Export as PDF', onClick: () => alert('Exported PDF') },
  { id: 'xlsx', label: 'Export as Excel', onClick: () => alert('Exported Excel') },
];

const DELETE_OPTIONS = [
  { id: 'archive', label: 'Archive instead', onClick: () => alert('Archived') },
  { id: 'permanent', label: 'Delete permanently', danger: true, onClick: () => alert('Permanently deleted') },
];

const SplitButtonPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        SplitButton
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">
          New
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Button with a dropdown arrow for secondary actions. Click the main area for the primary action, or the arrow to see alternatives.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { SplitButton } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Primary action with dropdown alternatives. Click the arrow."
        code={`<SplitButton
  label="Save"
  options={[
    { id: 'draft', label: 'Save as draft', onClick: () => {} },
    { id: 'template', label: 'Save as template', onClick: () => {} },
  ]}
  onClick={() => alert('Saved!')}
/>`}
      >
        <SplitButton
          label="Save"
          options={SAVE_OPTIONS}
          onClick={() => alert('Saved!')}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Primary, secondary, outline, and danger variants."
        code={`<SplitButton variant="primary" label="Primary" ... />
<SplitButton variant="secondary" label="Secondary" ... />
<SplitButton variant="outline" label="Outline" ... />
<SplitButton variant="danger" label="Delete" ... />`}
      >
        <div className="flex flex-wrap gap-3">
          <SplitButton variant="primary" label="Primary" options={SAVE_OPTIONS} onClick={() => alert('Primary')} />
          <SplitButton variant="secondary" label="Secondary" options={SAVE_OPTIONS} onClick={() => alert('Secondary')} />
          <SplitButton variant="outline" label="Outline" options={SAVE_OPTIONS} onClick={() => alert('Outline')} />
          <SplitButton variant="danger" label="Delete" options={DELETE_OPTIONS} onClick={() => alert('Deleted')} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Small, medium, and large button sizes."
        code={`<SplitButton size="sm" label="Small" ... />
<SplitButton size="md" label="Medium" ... />
<SplitButton size="lg" label="Large" ... />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <SplitButton size="sm" label="Small" options={SAVE_OPTIONS} onClick={() => {}} />
          <SplitButton size="md" label="Medium" options={SAVE_OPTIONS} onClick={() => {}} />
          <SplitButton size="lg" label="Large" options={SAVE_OPTIONS} onClick={() => {}} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Icon & Export"
        description="Icon on the main button with export-style actions."
        code={`<SplitButton
  label="Export"
  icon={<DownloadIcon />}
  options={exportOptions}
  onClick={() => alert('Default export')}
/>`}
      >
        <SplitButton
          label="Export"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          }
          options={EXPORT_OPTIONS}
          onClick={() => alert('Default export')}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Loading & Disabled"
        description="Loading spinner and disabled state."
        code={`<SplitButton label="Saving..." loading ... />
<SplitButton label="Disabled" disabled ... />`}
      >
        <div className="flex flex-wrap gap-3">
          <SplitButton label="Saving..." loading options={SAVE_OPTIONS} onClick={() => {}} />
          <SplitButton label="Disabled" disabled options={SAVE_OPTIONS} onClick={() => {}} />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700 text-gray-700 dark:text-zinc-300">
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">label</td><td className="px-4 py-2">string</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Main button label</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">icon</td><td className="px-4 py-2">ReactNode</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Icon for main button</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">options</td><td className="px-4 py-2">SplitButtonOption[]</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Dropdown actions</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">variant</td><td className="px-4 py-2">'primary' | 'secondary' | 'outline' | 'danger'</td><td className="px-4 py-2">'primary'</td><td className="px-4 py-2">Button variant</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">size</td><td className="px-4 py-2">'sm' | 'md' | 'lg'</td><td className="px-4 py-2">'md'</td><td className="px-4 py-2">Button size</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">disabled</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td><td className="px-4 py-2">Disable button</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">loading</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">false</td><td className="px-4 py-2">Show loading spinner</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">onClick</td><td className="px-4 py-2">() =&gt; void</td><td className="px-4 py-2">—</td><td className="px-4 py-2">Primary action handler</td></tr>
              <tr><td className="px-4 py-2 font-mono text-xs text-bear-600">dropdownAlign</td><td className="px-4 py-2">'left' | 'right'</td><td className="px-4 py-2">'left'</td><td className="px-4 py-2">Dropdown alignment</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SplitButtonPage;
