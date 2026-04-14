import React from 'react';
import { Typography, CardCompound as Card, TagCloud } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const TAGS = [
  { text: 'React', value: 100 },
  { text: 'TypeScript', value: 85 },
  { text: 'Tailwind', value: 75 },
  { text: 'Bear UI', value: 90 },
  { text: 'ForgeStack', value: 80 },
  { text: 'Vite', value: 60 },
  { text: 'Node.js', value: 55 },
  { text: 'GraphQL', value: 40 },
  { text: 'REST', value: 50 },
  { text: 'Docker', value: 45 },
  { text: 'AWS', value: 35 },
  { text: 'CI/CD', value: 25 },
  { text: 'Redux', value: 65 },
  { text: 'Next.js', value: 70 },
  { text: 'Prisma', value: 38 },
];

const PROPS = [
  { name: 'tags', type: 'TagCloudItem[]', description: 'Tags with text and weight value (required)' },
  { name: 'minFontSize', type: 'number', default: '12', description: 'Minimum font size in px' },
  { name: 'maxFontSize', type: 'number', default: '40', description: 'Maximum font size in px' },
  { name: 'colors', type: 'string[]', default: "['#ec4899',…]", description: 'Color palette (cycled through)' },
  { name: 'layout', type: "'flow' | 'circle'", default: "'flow'", description: 'Layout mode' },
  { name: 'mobileCompact', type: 'boolean', default: 'false', description: 'Collapse to horizontal scrollable list on mobile' },
  { name: 'onTagClick', type: '(tag: TagCloudItem) => void', description: 'Callback when a tag is clicked' },
];

const ITEM_PROPS = [
  { name: 'text', type: 'string', description: 'Display text (required)' },
  { name: 'value', type: 'number', description: 'Weight / importance value (required)' },
  { name: 'color', type: 'string', description: 'Override color for this tag' },
  { name: 'href', type: 'string', description: 'URL — renders as a link' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  layout: { type: 'select', default: 'flow', options: [
    { value: 'flow', label: 'Flow' },
    { value: 'circle', label: 'Circle' },
  ]},
  minFontSize: { type: 'number', default: 12, min: 8, max: 24 },
  maxFontSize: { type: 'number', default: 40, min: 20, max: 80 },
  mobileCompact: { type: 'boolean', default: false },
};

const TagCloudPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">TagCloud</Typography>
          <LinesOfCode lines={90} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.tagCloudDesc}
        </Typography>
      </div>

      <ComponentPreview
        title={t.playground}
        description="Switch between flow and circle layout, adjust font sizes, and toggle mobile compact mode."
        code={`<TagCloud tags={tags} layout="flow" minFontSize={12} maxFontSize={40} />`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => (
          <TagCloud
            tags={TAGS}
            layout={props.layout as 'flow' | 'circle'}
            minFontSize={Number(props.minFontSize)}
            maxFontSize={Number(props.maxFontSize)}
            mobileCompact={props.mobileCompact as boolean}
          />
        )}
      />

      <Card>
        <Card.Header title={<Typography variant="h5">{t.flowLayout}</Typography>} />
        <Card.Body>
          <TagCloud tags={TAGS} />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.circleLayout}</Typography>} />
        <Card.Body>
          <div className="max-w-md mx-auto">
            <TagCloud tags={TAGS.slice(0, 10)} layout="circle" />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.mobileCompact}</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-3 text-gray-500">
            On small screens, tags collapse into a horizontal scrollable strip.
            Resize your browser to see the effect.
          </Typography>
          <TagCloud tags={TAGS} mobileCompact />
        </Card.Body>
      </Card>

      <PropsTable title="TagCloud Props" rows={PROPS} />
      <PropsTable title="TagCloudItem" rows={ITEM_PROPS} showDefault={false} />
    </div>
  );
};

export default TagCloudPage;
