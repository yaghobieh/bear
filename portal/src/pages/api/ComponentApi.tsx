import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CodeBlock, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { TABS_EXAMPLE } from './ComponentApi.tabs-example';

interface ApiDoc {
  title: string;
  description: string;
  importLine: string;
  commonProps: Array<{ name: string; type: string; note: string }>;
  exampleCode?: string;
}

const API_DOCS: Record<string, ApiDoc> = {
  input: {
    title: 'Input API',
    description: 'Single-line text input with validation, addons (leftAddon/rightAddon), and InputProps.startAdornment/endAdornment for start/end slots. Supports character counter and inline validation.',
    importLine: "import { Input, Button, BearIcons } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'label', type: 'string', note: 'Optional field label.' },
      { name: 'InputProps', type: '{ startAdornment?, endAdornment? }', note: 'Start/end slots (ReactNode); takes precedence over leftAddon/rightAddon.' },
      { name: 'leftAddon', type: 'ReactNode', note: 'Left addon (legacy).' },
      { name: 'rightAddon', type: 'ReactNode', note: 'Right addon (legacy).' },
      { name: 'error', type: 'string', note: 'Error message and error styles.' },
      { name: 'success', type: 'string', note: 'Success state helper text.' },
      { name: 'showCharCount', type: 'boolean', note: 'Shows live char counter.' },
    ],
    exampleCode: `<Input
  placeholder="input search text"
  InputProps={{
    startAdornment: <span className="bear-text-gray-500 dark:bear-text-gray-400">https://</span>,
    endAdornment: (
      <Button variant="ghost" iconOnly size="sm">
        <BearIcons.SearchIcon size={18} />
      </Button>
    ),
  }}
/>`,
  },
  'text-field': {
    title: 'TextField API',
    description: 'TextField is an alias of Input. Use the same props; supports InputProps.startAdornment and endAdornment for start/end slots.',
    importLine: "import { TextField, Button, BearIcons } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'InputProps', type: '{ startAdornment?, endAdornment? }', note: 'Start/end slots (ReactNode).' },
      { name: 'label', type: 'string', note: 'Optional field label.' },
      { name: 'placeholder', type: 'string', note: 'Placeholder text.' },
      { name: 'validation', type: 'ValidationRule', note: 'Inline validation (same as Form).' },
    ],
    exampleCode: `<TextField
  placeholder="input search text"
  InputProps={{
    startAdornment: <span className="bear-text-gray-500 dark:bear-text-gray-400">https://</span>,
    endAdornment: (
      <Button variant="ghost" iconOnly size="sm">
        <BearIcons.SearchIcon size={18} />
      </Button>
    ),
  }}
/>`,
  },
  'form-field': {
    title: 'FormField API',
    description: 'Floating-label field with outlined or filled variant.',
    importLine: "import { FormField } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'label', type: 'string', note: 'Floating label text.' },
      { name: 'variant', type: "'outlined' | 'filled'", note: 'Visual variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", note: 'Input size presets.' },
      { name: 'required', type: 'boolean', note: 'Adds required asterisk.' },
    ],
  },
  'password-input': {
    title: 'PasswordInput API',
    description: 'Password input wrapper with visibility toggle and optional caps indicator.',
    importLine: "import { PasswordInput } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'visible', type: 'boolean', note: 'Controlled visibility mode.' },
      { name: 'showShiftIndicator', type: 'boolean', note: 'Shows Caps indicator.' },
      { name: 'visibleIcon', type: 'ReactNode', note: 'Custom visible-state icon.' },
      { name: 'hiddenIcon', type: 'ReactNode', note: 'Custom hidden-state icon.' },
    ],
  },
  button: {
    title: 'Button API',
    description: 'Action button with variants, loading states, and icon support.',
    importLine: "import { Button } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'variant', type: 'ButtonVariant', note: 'Visual style variant.' },
      { name: 'loading', type: 'boolean', note: 'Shows spinner and disables click.' },
      { name: 'loadingText', type: 'string', note: 'Text shown while loading.' },
      { name: 'leftIcon', type: 'ReactNode', note: 'Icon before label.' },
    ],
  },
  tabs: {
    title: 'Tabs API',
    description: 'Tabbed interface with TabList, Tab, and TabPanel. Use maxVisibleTabs to limit visible tabs and show the rest in a "..." overflow dropdown (selected tab moves to first). Use wrap so tabs wrap to the next line without breakpoints.',
    importLine: "import { Tabs, TabList, Tab, TabPanel } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'Tabs.value', type: 'string', note: 'Controlled active tab id.' },
      { name: 'Tabs.defaultTab', type: 'string', note: 'Initial active tab id (uncontrolled).' },
      { name: 'Tabs.onChange', type: '(tabId: string) => void', note: 'Called when tab changes.' },
      { name: 'Tabs.variant', type: "'line' | 'pills' | 'enclosed'", note: 'Visual variant.' },
      { name: 'TabList.maxVisibleTabs', type: 'number', note: 'Max tabs to show; rest go in "..." dropdown. Selected tab shown first.' },
      { name: 'TabList.wrap', type: 'boolean', note: 'Allow tabs to wrap to next line (no breakpoints).' },
      { name: 'Tab.id', type: 'string', note: 'Unique tab id (matches TabPanel tabId).' },
      { name: 'Tab.disabled', type: 'boolean', note: 'Disable this tab.' },
      { name: 'TabPanel.tabId', type: 'string', note: 'Tab id this panel belongs to.' },
    ],
    exampleCode: TABS_EXAMPLE,
  },
};

const fallbackDoc = (slug: string): ApiDoc => ({
  title: `${slug} API`,
  description:
    'This API page is generated from a common template. Detailed prop tables for this component are being expanded.',
  importLine: "import { ComponentName } from '@forgedevstack/bear';",
  commonProps: [
    { name: 'className', type: 'string', note: 'Custom CSS classes.' },
    { name: 'style', type: 'CSSProperties', note: 'Inline style overrides.' },
    { name: 'children', type: 'ReactNode', note: 'Component content.' },
  ],
});

const ComponentApi: FC = () => {
  const { slug = '' } = useParams();
  const doc = API_DOCS[slug] ?? fallbackDoc(slug);
  const { language } = usePortalLanguage();

  return (
    <div className="fade-in">
      <Typography variant="h3" className="mb-3 font-bold text-gray-900 dark:text-white">
        {doc.title}
      </Typography>
      <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
        {doc.description}
      </Typography>

      <Card variant="outlined" className="mb-8">
        <CardBody>
          <Typography variant="h5" className="mb-3 font-semibold">
            Import
          </Typography>
          <CodeBlock code={doc.importLine} language="tsx" showLineNumbers={false} />
        </CardBody>
      </Card>

      {doc.exampleCode != null && (
        <Card variant="outlined" className="mb-8">
          <CardBody>
            <Typography variant="h5" className="mb-3 font-semibold">
              Example
            </Typography>
            <CodeBlock code={doc.exampleCode.trim()} language="tsx" showLineNumbers={false} />
          </CardBody>
        </Card>
      )}

      <Card variant="outlined" className="mb-8">
        <CardBody>
          <Typography variant="h5" className="mb-4 font-semibold">
            {language === 'es' ? 'Props Comunes' : 'Common Props'}
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {language === 'es' ? 'Descripción' : 'Description'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {doc.commonProps.map((prop) => (
                  <tr key={prop.name}>
                    <td className="px-4 py-3 font-mono text-xs">{prop.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">{prop.type}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{prop.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
        {language === 'es'
          ? 'La referencia completa de props por componente se seguirá ampliando.'
          : 'Detailed per-component prop references will continue expanding.'}
      </Typography>
    </div>
  );
};

export default ComponentApi;

