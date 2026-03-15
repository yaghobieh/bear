import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

const A11Y_COMPONENTS = [
  { component: 'Modal / AlertDialog', features: 'Focus trap, Escape to close, aria-modal, role="dialog", aria-labelledby' },
  { component: 'Popconfirm', features: 'Focus trap, Escape to close, aria-describedby' },
  { component: 'Tooltip', features: 'aria-describedby, keyboard trigger, auto-dismiss' },
  { component: 'Tabs', features: 'role="tablist/tab/tabpanel", arrow key navigation, aria-selected' },
  { component: 'Accordion', features: 'aria-expanded, aria-controls, Enter/Space toggle' },
  { component: 'Menu / Dropdown', features: 'role="menu/menuitem", arrow key nav, type-ahead search' },
  { component: 'Select / MultiSelect', features: 'role="listbox/option", aria-selected, keyboard selection' },
  { component: 'Switch', features: 'role="switch", aria-checked, keyboard toggle' },
  { component: 'Slider', features: 'role="slider", aria-valuemin/max/now, arrow keys' },
  { component: 'Toast', features: 'role="alert" or aria-live="polite", auto-dismiss' },
  { component: 'Spinner / Progress', features: 'role="progressbar", aria-valuenow, aria-label' },
  { component: 'Result', features: 'role="status", appropriate heading hierarchy' },
];

const AccessibilityPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Accessibility</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Bear UI follows WAI-ARIA best practices. Components include ARIA attributes, keyboard navigation, focus management, and color contrast guidelines out of the box.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Keyboard Navigation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          All interactive components are keyboard-accessible. Common patterns:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
          <li><strong>Tab / Shift+Tab</strong> — Move focus between interactive elements.</li>
          <li><strong>Enter / Space</strong> — Activate buttons, toggles, checkboxes, radio buttons.</li>
          <li><strong>Arrow keys</strong> — Navigate within Tabs, Menu, Select, Slider, and Accordion.</li>
          <li><strong>Escape</strong> — Close Modal, Drawer, Popconfirm, Dropdown, Tooltip.</li>
          <li><strong>Home / End</strong> — Jump to first/last item in lists and tab panels.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Focus Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Overlay components (Modal, Drawer, AlertDialog, Popconfirm) trap focus inside while open and restore focus to the trigger element on close. Focus rings are visible by default.
        </p>
        <CodeBlock code={`// Focus is automatically trapped inside Modal
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Input label="Name" autoFocus />
  <Button onClick={save}>Save</Button>
</Modal>`} language="tsx" showLineNumbers={false} />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ARIA Attributes</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Every component renders appropriate ARIA attributes. Here is a reference of what each component provides:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Component</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Accessibility Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {A11Y_COMPONENTS.map((row) => (
                <tr key={row.component}>
                  <td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400 text-xs">{row.component}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Contrast</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bear UI colors meet WCAG 2.1 AA contrast ratios for both light and dark themes. When using custom colors via BearProvider, verify contrast using tools like the WebAIM contrast checker.
        </p>
        <CodeBlock code={`// Good: pink-600 on white = 4.5:1 contrast (AA pass)
<Button variant="primary">Submit</Button>

// Custom: verify your colors meet 4.5:1 ratio
<BearProvider theme={{ colors: { primary: '#6366f1' } }}>
  <Button>Custom</Button>
</BearProvider>`} language="tsx" showLineNumbers={false} />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Screen Reader Support</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Components that change content dynamically (Toast, Result, LoadingOverlay) use <code className="text-pink-600 dark:text-pink-400">aria-live</code> regions so screen readers announce updates. Icon-only buttons use <code className="text-pink-600 dark:text-pink-400">aria-label</code> for accessible names.
        </p>
        <CodeBlock code={`// ActionIcon with accessible label
<ActionIcon aria-label="Delete item" variant="outline" color="error">
  <TrashIcon />
</ActionIcon>

// Toast uses aria-live
<ToastProvider>
  {/* Toasts are announced by screen readers */}
</ToastProvider>`} language="tsx" showLineNumbers={false} />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Testing Accessibility</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We recommend testing with:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li><strong>Keyboard-only navigation</strong> — Tab through your app without a mouse.</li>
          <li><strong>Screen readers</strong> — VoiceOver (macOS), NVDA (Windows), or Orca (Linux).</li>
          <li><strong>axe DevTools</strong> — Browser extension for automated ARIA and contrast checks.</li>
          <li><strong>Lighthouse</strong> — Built into Chrome DevTools for accessibility audits.</li>
        </ul>
      </section>
    </div>
  );
};

export default AccessibilityPage;
