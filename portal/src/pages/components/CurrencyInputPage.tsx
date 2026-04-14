import React, { useState } from 'react';
import { Typography, CardCompound as Card, CurrencyInput, BearIcons } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'value', type: 'number', description: 'Current numeric value' },
  { name: 'onChange', type: '(value: number | undefined) => void', description: 'Change handler' },
  { name: 'currency', type: "string | ReactNode", default: "'USD'", description: 'Currency code or custom symbol node' },
  { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale for number formatting' },
  { name: 'decimals', type: 'number', default: '2', description: 'Maximum decimal places' },
  { name: 'allowNegative', type: 'boolean', default: 'false', description: 'Allow negative values' },
  { name: 'max', type: 'number', description: 'Maximum allowed value' },
  { name: 'min', type: 'number', description: 'Minimum allowed value' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size (from Bear Input)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
  { name: 'error', type: 'string', description: 'Error message' },
  { name: 'placeholder', type: 'string', default: "'0.00'", description: 'Placeholder text' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  currency: { type: 'select', default: 'USD', options: [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
  ]},
  size: { type: 'select', default: 'md', options: [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]},
  decimals: { type: 'number', default: 2, min: 0, max: 4 },
  allowNegative: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

const CurrencyInputPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const [usd, setUsd] = useState<number | undefined>(1250.5);
  const [eur, setEur] = useState<number | undefined>(999);
  const [gbp, setGbp] = useState<number | undefined>(undefined);
  const [custom, setCustom] = useState<number | undefined>(420);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">CurrencyInput</Typography>
          <LinesOfCode lines={80} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.currencyInputDesc}
        </Typography>
      </div>

      <ComponentPreview
        title={t.playground}
        description="Change currency, size, and other props live."
        code={`<CurrencyInput value={1250.50} currency="USD" size="md" />`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => (
          <div className="max-w-sm mx-auto">
            <CurrencyInput
              value={1250.5}
              currency={String(props.currency)}
              size={props.size as 'sm' | 'md' | 'lg'}
              decimals={Number(props.decimals)}
              allowNegative={props.allowNegative as boolean}
              disabled={props.disabled as boolean}
              label="Amount"
            />
          </div>
        )}
      />

      <Card>
        <Card.Header title={<Typography variant="h5">{t.currencies}</Typography>} />
        <Card.Body>
          <div className="flex flex-col gap-4 max-w-sm">
            <CurrencyInput value={usd} onChange={setUsd} currency="USD" label="US Dollar" />
            <CurrencyInput value={eur} onChange={setEur} currency="EUR" label="Euro" />
            <CurrencyInput value={gbp} onChange={setGbp} currency="GBP" size="lg" label="British Pound" />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.customIcons}</Typography>} />
        <Card.Body>
          <div className="max-w-sm">
            <CurrencyInput
              value={custom}
              onChange={setCustom}
              currency={<BearIcons.CreditCardIcon size={18} className="text-blue-500" />}
              label="Custom icon"
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.states}</Typography>} />
        <Card.Body>
          <div className="flex flex-col gap-4 max-w-sm">
            <CurrencyInput value={100} disabled label="Disabled" />
            <CurrencyInput value={0} error="Invalid amount" label="With error" />
          </div>
        </Card.Body>
      </Card>

      <PropsTable title="CurrencyInput Props" rows={PROPS} />
    </div>
  );
};

export default CurrencyInputPage;
