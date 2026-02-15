import { useState } from 'react';
import { NavigableSelect, Typography, Card, CardBody } from '@forgedevstack/bear';
import type { NavigableSelectOption } from '@forgedevstack/bear';

const FRUIT_OPTIONS: NavigableSelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const COUNTRY_OPTIONS: NavigableSelectOption[] = [
  { value: 'us', label: 'United States', group: 'Americas' },
  { value: 'ca', label: 'Canada', group: 'Americas' },
  { value: 'br', label: 'Brazil', group: 'Americas' },
  { value: 'uk', label: 'United Kingdom', group: 'Europe' },
  { value: 'de', label: 'Germany', group: 'Europe' },
  { value: 'fr', label: 'France', group: 'Europe' },
  { value: 'jp', label: 'Japan', group: 'Asia' },
  { value: 'kr', label: 'South Korea', group: 'Asia' },
  { value: 'in', label: 'India', group: 'Asia' },
];

const DISABLED_OPTIONS: NavigableSelectOption[] = [
  { value: 'opt1', label: 'Available' },
  { value: 'opt2', label: 'Also available' },
  { value: 'opt3', label: 'Disabled option', disabled: true },
  { value: 'opt4', label: 'Another available' },
  { value: 'opt5', label: 'Also disabled', disabled: true },
];

export default function NavigableSelectPage() {
  const [singleValue, setSingleValue] = useState<string | string[]>('');
  const [multiValue, setMultiValue] = useState<string | string[]>([]);
  const [countryValue, setCountryValue] = useState<string | string[]>('');
  const [disabledValue, setDisabledValue] = useState<string | string[]>('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Typography variant="h2" className="mb-2">NavigableSelect</Typography>
        <Typography variant="body1" className="text-[var(--bear-text-secondary)] mb-4">
          Keyboard-navigable select component with arrow key support, search, multi-select, grouped options, and full theme integration.
        </Typography>
        <div className="flex flex-wrap gap-2">
          {['Arrow Keys', 'Search', 'Multi-Select', 'Groups', 'Disabled Items', 'Accessible'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--bear-primary-500)]/10 text-[var(--bear-primary-500)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Single Select */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Single Select</Typography>
          <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
            Basic single-select with keyboard navigation. Use arrow keys to navigate and Enter to select.
          </Typography>
          <div className="max-w-sm">
            <NavigableSelect
              options={FRUIT_OPTIONS}
              value={singleValue}
              onChange={setSingleValue}
              placeholder="Choose a fruit..."
              searchable
            />
          </div>
          <p className="text-xs text-[var(--bear-text-secondary)] mt-2 font-mono">
            Selected: {singleValue || 'none'}
          </p>
        </CardBody>
      </Card>

      {/* Multi Select */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Multi Select</Typography>
          <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
            Select multiple items. Use Space or Enter to toggle selection. Tags display selected items.
          </Typography>
          <div className="max-w-sm">
            <NavigableSelect
              options={FRUIT_OPTIONS}
              value={multiValue}
              onChange={setMultiValue}
              placeholder="Choose fruits..."
              multiple
              searchable
            />
          </div>
          <p className="text-xs text-[var(--bear-text-secondary)] mt-2 font-mono">
            Selected: {Array.isArray(multiValue) ? multiValue.join(', ') || 'none' : multiValue}
          </p>
        </CardBody>
      </Card>

      {/* Grouped Options */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Grouped Options</Typography>
          <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
            Options can be grouped by category. Groups are visually separated with headers.
          </Typography>
          <div className="max-w-sm">
            <NavigableSelect
              options={COUNTRY_OPTIONS}
              value={countryValue}
              onChange={setCountryValue}
              placeholder="Choose a country..."
              searchable
            />
          </div>
          <p className="text-xs text-[var(--bear-text-secondary)] mt-2 font-mono">
            Selected: {countryValue || 'none'}
          </p>
        </CardBody>
      </Card>

      {/* Disabled Options */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Disabled Options</Typography>
          <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
            Individual options can be disabled. Disabled items are skipped during keyboard navigation.
          </Typography>
          <div className="max-w-sm">
            <NavigableSelect
              options={DISABLED_OPTIONS}
              value={disabledValue}
              onChange={setDisabledValue}
              placeholder="Select an option..."
            />
          </div>
        </CardBody>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Keyboard Shortcuts</Typography>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: '↑ / ↓', desc: 'Navigate options' },
              { key: 'Enter', desc: 'Select / toggle option' },
              { key: 'Space', desc: 'Toggle in multi-select' },
              { key: 'Escape', desc: 'Close dropdown' },
              { key: 'Type', desc: 'Search / filter (when searchable)' },
              { key: 'Backspace', desc: 'Remove last tag (multi-select)' },
            ].map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <kbd className="px-2 py-1 rounded bg-[var(--bear-bg-secondary)] border border-[var(--bear-border-primary)] text-xs font-mono text-[var(--bear-text-primary)] min-w-[60px] text-center">
                  {s.key}
                </kbd>
                <span className="text-sm text-[var(--bear-text-secondary)]">{s.desc}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Usage */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Usage</Typography>
          <pre className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { NavigableSelect } from '@forgedevstack/bear';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

// Single select
<NavigableSelect
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Choose..."
  searchable
/>

// Multi select
<NavigableSelect
  options={options}
  value={values}
  onChange={setValues}
  multiple
  searchable
  maxSelections={5}
/>

// Grouped options
const grouped = [
  { value: 'us', label: 'USA', group: 'Americas' },
  { value: 'uk', label: 'UK', group: 'Europe' },
];

<NavigableSelect options={grouped} value={v} onChange={setV} />`}
          </pre>
        </CardBody>
      </Card>

      {/* Props */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-2">Props</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--bear-border-primary)]">
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Prop</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Type</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Default</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Description</th>
                </tr>
              </thead>
              <tbody className="text-[var(--bear-text-secondary)]">
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">options</td><td className="py-2 px-3 font-mono text-xs">NavigableSelectOption[]</td><td className="py-2 px-3 font-mono text-xs">required</td><td className="py-2 px-3">Array of options</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">value</td><td className="py-2 px-3 font-mono text-xs">string | string[]</td><td className="py-2 px-3 font-mono text-xs">required</td><td className="py-2 px-3">Selected value(s)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">onChange</td><td className="py-2 px-3 font-mono text-xs">(v) =&gt; void</td><td className="py-2 px-3 font-mono text-xs">required</td><td className="py-2 px-3">Callback on value change</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">multiple</td><td className="py-2 px-3 font-mono text-xs">boolean</td><td className="py-2 px-3 font-mono text-xs">false</td><td className="py-2 px-3">Enable multi-select</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">searchable</td><td className="py-2 px-3 font-mono text-xs">boolean</td><td className="py-2 px-3 font-mono text-xs">false</td><td className="py-2 px-3">Enable search/filter</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">placeholder</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">"Select..."</td><td className="py-2 px-3">Placeholder text</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">maxSelections</td><td className="py-2 px-3 font-mono text-xs">number</td><td className="py-2 px-3 font-mono text-xs">Infinity</td><td className="py-2 px-3">Max selections (multi)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">disabled</td><td className="py-2 px-3 font-mono text-xs">boolean</td><td className="py-2 px-3 font-mono text-xs">false</td><td className="py-2 px-3">Disable the entire select</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">size</td><td className="py-2 px-3 font-mono text-xs">"sm" | "md" | "lg"</td><td className="py-2 px-3 font-mono text-xs">"md"</td><td className="py-2 px-3">Size variant</td></tr>
                <tr><td className="py-2 px-3 font-mono text-xs">testId</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">-</td><td className="py-2 px-3">Test ID for testing</td></tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
