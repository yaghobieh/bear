import { FC, useState } from 'react';
import { Button, Dropdown } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';

const MENU_ITEMS = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'delete', label: 'Delete', danger: true },
];

const TEAM_ITEMS = [
  { key: 'eng', label: 'Engineering' },
  { key: 'design', label: 'Design' },
  { key: 'pm', label: 'Product' },
  { key: 'qa', label: 'QA' },
  { key: 'devops', label: 'DevOps' },
];

const TAG_ITEMS = [
  { key: 'react', label: 'React' },
  { key: 'ts', label: 'TypeScript' },
  { key: 'node', label: 'Node.js' },
  { key: 'vite', label: 'Vite' },
];

const ACCOUNT_ITEMS = [
  { key: 'profile', label: 'Profile', description: 'View and edit your profile' },
  { key: 'settings', label: 'Settings', description: 'App preferences' },
  { key: 'logout', label: 'Log out', danger: true },
];

const DropdownPage: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['react', 'ts']);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dropdown</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A dropdown menu for displaying a list of options.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Dropdown } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Usage"
        description="Open the menu as a card from a trigger button."
        code={`<Dropdown
  trigger={<Button>Options</Button>}
  items={[
    { key: 'edit', label: 'Edit' },
    { key: 'duplicate', label: 'Duplicate' },
    { key: 'delete', label: 'Delete', danger: true },
  ]}
/>`}
        allowOverflow
      >
        <Dropdown trigger={<Button>Options</Button>} items={MENU_ITEMS} />
      </ComponentPreview>

      <ComponentPreview
        title="Open and close effects"
        description="Pick motion independently: none, fade, slide-down, or scale."
        code={`<Dropdown trigger={<Button>Fade</Button>} openEffect="fade" closeEffect="fade" items={items} />
<Dropdown trigger={<Button>Slide</Button>} openEffect="slide-down" closeEffect="slide-down" items={items} />
<Dropdown trigger={<Button>Scale</Button>} openEffect="scale" closeEffect="scale" items={items} />
<Dropdown trigger={<Button>None</Button>} openEffect="none" closeEffect="none" items={items} />
<Dropdown
  trigger={<Button>Mixed</Button>}
  effect={{ open: 'scale', close: 'fade' }}
  items={items}
/>`}
        allowOverflow
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Dropdown trigger={<Button>Fade</Button>} openEffect="fade" closeEffect="fade" items={MENU_ITEMS} />
          <Dropdown trigger={<Button>Slide</Button>} openEffect="slide-down" closeEffect="slide-down" items={MENU_ITEMS} />
          <Dropdown trigger={<Button>Scale</Button>} openEffect="scale" closeEffect="scale" items={MENU_ITEMS} />
          <Dropdown trigger={<Button>None</Button>} openEffect="none" closeEffect="none" items={MENU_ITEMS} />
          <Dropdown trigger={<Button>Mixed</Button>} effect={{ open: 'scale', close: 'fade' }} items={MENU_ITEMS} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Searchable"
        description="Enable search/filter within dropdown items."
        code={`<Dropdown
  trigger={<Button>Select Team</Button>}
  searchable
  searchPlaceholder="Filter teams..."
  items={teamItems}
/>`}
        allowOverflow
      >
        <Dropdown
          trigger={<Button>Select Team</Button>}
          searchable
          searchPlaceholder="Filter teams..."
          items={TEAM_ITEMS}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Multi-Select"
        description="Toggle multiple items on click. Selected keys are tracked via onSelectionChange."
        code={`<Dropdown
  trigger={<Button>Tags</Button>}
  multiSelect
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
  items={tagItems}
/>`}
        allowOverflow
      >
        <Dropdown
          trigger={<Button>Tags</Button>}
          multiSelect
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          items={TAG_ITEMS}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Loading & Empty States"
        description="Show a loading spinner during async fetch, and custom empty text when no items match."
        code={`<Dropdown trigger={<Button>Async</Button>} loading loadingText="Fetching options..." items={[]} />
<Dropdown trigger={<Button>Search</Button>} searchable emptyText="No results found" items={[]} />`}
        allowOverflow
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Dropdown trigger={<Button>Async</Button>} loading loadingText="Fetching options..." items={[]} />
          <Dropdown trigger={<Button>Search</Button>} searchable emptyText="No results found" items={[]} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Header, Footer & Item Descriptions"
        description="Add a header/footer to the dropdown and descriptions to items."
        code={`<Dropdown
  trigger={<Button>Account</Button>}
  header={<div>ACCOUNT</div>}
  footer={<div>v1.3.1</div>}
  items={accountItems}
/>`}
        allowOverflow
      >
        <Dropdown
          trigger={<Button>Account</Button>}
          header={<div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide">Account</div>}
          footer={<div className="px-3 py-2 text-xs">v1.3.1</div>}
          items={ACCOUNT_ITEMS}
        />
      </ComponentPreview>

      <PropsTable
        title="Props"
        rows={[
          { name: 'trigger', type: 'ReactNode', default: 'Required', description: 'Trigger element' },
          { name: 'items', type: 'DropdownItem[]', default: 'Required', description: 'Menu items' },
          { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top' | ...", default: 'bottom-start', description: 'Menu position relative to trigger' },
          { name: 'open', type: 'boolean', description: 'Controlled open state' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: 'Size variant' },
          { name: 'matchWidth', type: 'boolean', default: 'false', description: 'Match trigger width' },
          { name: 'maxHeight', type: 'number', description: 'Max height before scroll' },
          { name: 'closeOnSelect', type: 'boolean', default: 'true', description: 'Close on item click' },
          { name: 'openEffect', type: "'none' | 'fade' | 'slide-down' | 'scale'", default: 'slide-down', description: 'Menu open animation' },
          { name: 'closeEffect', type: "'none' | 'fade' | 'slide-down' | 'scale'", default: 'same as openEffect', description: 'Menu close animation' },
          { name: 'effect', type: '{ open?: OverlayMotionEffect; close?: OverlayMotionEffect }', description: 'Open and close motion in one prop' },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search/filter input' },
          { name: 'searchPlaceholder', type: 'string', description: 'Placeholder for search input' },
          { name: 'filterFn', type: '(item, query) => boolean', description: 'Custom filter function' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner inside dropdown' },
          { name: 'emptyText', type: 'string', description: 'Text shown when no items match' },
          { name: 'renderItem', type: '(item, index) => ReactNode', description: 'Custom item renderer' },
          { name: 'multiSelect', type: 'boolean', default: 'false', description: 'Enable multi-select mode' },
          { name: 'selectedKeys', type: 'string[]', description: 'Controlled selected keys (multiSelect)' },
          { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Callback when selection changes' },
          { name: 'header', type: 'ReactNode', description: 'Header content above items' },
          { name: 'footer', type: 'ReactNode', description: 'Footer content below items' },
          { name: 'virtualized', type: 'boolean', default: 'false', description: 'Virtual scrolling for large lists' },
        ]}
      />
    </div>
  );
};

export default DropdownPage;
