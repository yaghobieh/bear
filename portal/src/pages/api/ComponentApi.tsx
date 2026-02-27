import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CodeBlock, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

interface ApiDoc {
  title: string;
  description: string;
  importLine: string;
  commonProps: Array<{ name: string; type: string; note: string }>;
}

const API_DOCS: Record<string, ApiDoc> = {
  input: {
    title: 'Input API',
    description: 'Single-line text input with validation, addons, and character counter support.',
    importLine: "import { Input } from '@forgedevstack/bear';",
    commonProps: [
      { name: 'label', type: 'string', note: 'Optional field label.' },
      { name: 'error', type: 'string', note: 'Error message and error styles.' },
      { name: 'success', type: 'string', note: 'Success state helper text.' },
      { name: 'showCharCount', type: 'boolean', note: 'Shows live char counter.' },
    ],
  },
  'form-field': {
    title: 'FormField API',
    description: 'Floating-label field similar to MUI TextField style.',
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

