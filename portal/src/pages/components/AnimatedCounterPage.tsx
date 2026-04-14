import React from 'react';
import { Typography, CardCompound as Card, AnimatedCounter } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'value', type: 'number', description: 'Target value to count to (required)' },
  { name: 'from', type: 'number', default: '0', description: 'Starting value' },
  { name: 'duration', type: 'number', default: '2000', description: 'Animation duration in ms' },
  { name: 'decimals', type: 'number', default: '0', description: 'Decimal places' },
  { name: 'prefix', type: 'string', description: "Prefix string (e.g. '$')" },
  { name: 'suffix', type: 'string', description: "Suffix string (e.g. '%')" },
  { name: 'separator', type: 'string', default: "','", description: 'Thousand separator' },
  { name: 'easing', type: "'linear' | 'easeOut' | 'easeInOut'", default: "'easeOut'", description: 'Easing function' },
  { name: 'animateOnView', type: 'boolean', default: 'true', description: 'Start animation when element enters viewport' },
  { name: 'typographyProps', type: 'Partial<TypographyProps>', description: 'Typography wrapper props' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  value: { type: 'number', default: 12345, min: 0, max: 999999 },
  from: { type: 'number', default: 0, min: 0, max: 999999 },
  duration: { type: 'number', default: 2000, min: 200, max: 10000 },
  decimals: { type: 'number', default: 0, min: 0, max: 4 },
  prefix: { type: 'string', default: '', placeholder: '$' },
  suffix: { type: 'string', default: '', placeholder: '%' },
  easing: { type: 'select', default: 'easeOut', options: [
    { value: 'linear', label: 'Linear' },
    { value: 'easeOut', label: 'Ease Out' },
    { value: 'easeInOut', label: 'Ease In Out' },
  ]},
};

const AnimatedCounterPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">AnimatedCounter</Typography>
          <LinesOfCode lines={72} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.animatedCounterDesc}
        </Typography>
      </div>

      <ComponentPreview
        title={t.playground}
        description="Adjust value, duration, prefix/suffix, and easing to see the counter animate live."
        code={`<AnimatedCounter value={12345} easing="easeOut" duration={2000} />`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => (
          <div className="text-center py-4">
            <AnimatedCounter
              value={Number(props.value)}
              from={Number(props.from)}
              duration={Number(props.duration)}
              decimals={Number(props.decimals)}
              prefix={String(props.prefix)}
              suffix={String(props.suffix)}
              easing={props.easing as 'linear' | 'easeOut' | 'easeInOut'}
              animateOnView={false}
            />
          </div>
        )}
      />

      <Card>
        <Card.Header title={<Typography variant="h5">{t.basic}</Typography>} />
        <Card.Body>
          <div className="flex gap-12 flex-wrap">
            <div className="text-center">
              <AnimatedCounter value={1234} />
              <Typography variant="caption" className="block mt-1 text-gray-500">Default</Typography>
            </div>
            <div className="text-center">
              <AnimatedCounter value={99.9} decimals={1} suffix="%" />
              <Typography variant="caption" className="block mt-1 text-gray-500">Percentage</Typography>
            </div>
            <div className="text-center">
              <AnimatedCounter value={50000} prefix="$" />
              <Typography variant="caption" className="block mt-1 text-gray-500">Currency</Typography>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.easing}</Typography>} />
        <Card.Body>
          <div className="flex gap-12 flex-wrap">
            {(['linear', 'easeOut', 'easeInOut'] as const).map((e) => (
              <div key={e} className="text-center">
                <AnimatedCounter value={10000} easing={e} duration={3000} />
                <Typography variant="caption" className="block mt-1 text-gray-500">{e}</Typography>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      <PropsTable title="AnimatedCounter Props" rows={PROPS} />
    </div>
  );
};

export default AnimatedCounterPage;
