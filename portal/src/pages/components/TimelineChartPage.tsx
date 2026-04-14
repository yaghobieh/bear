import React from 'react';
import { Typography, CardCompound as Card, TimelineChart } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const ITEMS = [
  { label: 'Research', start: 0, end: 25 },
  { label: 'Design', start: 15, end: 45 },
  { label: 'Development', start: 35, end: 80 },
  { label: 'Testing', start: 60, end: 90 },
  { label: 'Launch', start: 85, end: 100 },
];

const MONTHS = [
  { label: 'Q1 Planning', start: 1, end: 3, color: '#8b5cf6' },
  { label: 'Q2 Build', start: 3, end: 6, color: '#3b82f6' },
  { label: 'Q3 Beta', start: 6, end: 9, color: '#10b981' },
  { label: 'Q4 Release', start: 9, end: 12, color: '#ec4899' },
];

const PROPS = [
  { name: 'items', type: 'TimelineChartItem[]', description: 'Items to display (required)' },
  { name: 'min', type: 'number', description: 'Minimum axis value (auto-detected if omitted)' },
  { name: 'max', type: 'number', description: 'Maximum axis value (auto-detected if omitted)' },
  { name: 'barHeight', type: 'number', default: '28', description: 'Height of each bar in px' },
  { name: 'barGap', type: 'number', default: '6', description: 'Gap between bars in px' },
  { name: 'showAxis', type: 'boolean', default: 'true', description: 'Show axis tick labels' },
  { name: 'axisTicks', type: 'number', default: '6', description: 'Number of axis ticks' },
  { name: 'formatTick', type: '(value: number) => string', description: 'Custom tick label formatter' },
  { name: 'onItemClick', type: '(item, index) => void', description: 'Callback when a bar is clicked' },
];

const ITEM_PROPS = [
  { name: 'label', type: 'string', description: 'Row label (required)' },
  { name: 'start', type: 'number', description: 'Start value (required)' },
  { name: 'end', type: 'number', description: 'End value (required)' },
  { name: 'color', type: 'string', description: 'Bar color' },
  { name: 'tooltip', type: 'string', description: 'Custom tooltip text' },
  { name: 'icon', type: 'ReactNode', description: 'Optional icon' },
];

const TimelineChartPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">TimelineChart</Typography>
          <LinesOfCode lines={89} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.timelineChartDesc}
        </Typography>
      </div>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.projectSchedule}</Typography>} />
        <Card.Body>
          <TimelineChart items={ITEMS} min={0} max={100} formatTick={(v) => `${v}%`} />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.quarterlyRoadmap}</Typography>} />
        <Card.Body>
          <TimelineChart items={MONTHS} min={1} max={12} formatTick={(v) => `Month ${Math.round(v)}`} barHeight={32} />
        </Card.Body>
      </Card>

      <PropsTable title="TimelineChart Props" rows={PROPS} />
      <PropsTable title="TimelineChartItem" rows={ITEM_PROPS} showDefault={false} />
    </div>
  );
};

export default TimelineChartPage;
