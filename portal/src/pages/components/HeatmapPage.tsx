import React, { useMemo } from 'react';
import { Typography, CardCompound as Card, Heatmap } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'data', type: 'HeatmapCell[]', description: 'Data points with date (YYYY-MM-DD) and value (required)' },
  { name: 'startDate', type: 'string', description: 'Start date (defaults to 1 year ago)' },
  { name: 'endDate', type: 'string', description: 'End date (defaults to today)' },
  { name: 'colorScale', type: 'string[]', default: "['#161b22',…,'#39d353']", description: 'Color scale from low to high' },
  { name: 'cellSize', type: 'number', default: '12', description: 'Cell size in px' },
  { name: 'cellGap', type: 'number', default: '3', description: 'Gap between cells in px' },
  { name: 'showDayLabels', type: 'boolean', default: 'true', description: 'Show day-of-week labels' },
  { name: 'showMonthLabels', type: 'boolean', default: 'true', description: 'Show month labels' },
  { name: 'emptyColor', type: 'string', default: "'#ebedf0'", description: 'Empty cell color' },
  { name: 'tooltipFormat', type: '(cell: HeatmapCell) => string', description: 'Custom tooltip text formatter' },
  { name: 'onCellClick', type: '(cell: HeatmapCell) => void', description: 'Callback when a cell is clicked' },
  { name: 'renderTooltip', type: '(cell: HeatmapCell) => ReactNode', description: 'Render custom hover popover per cell' },
];

function generateData() {
  const data = [];
  const now = new Date();
  for (let d = 365; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    if (Math.random() > 0.3) {
      data.push({
        date: date.toISOString().slice(0, 10),
        value: Math.floor(Math.random() * 12),
      });
    }
  }
  return data;
}

const HeatmapPage: React.FC = () => {
  const data = useMemo(generateData, []);
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">Heatmap</Typography>
          <LinesOfCode lines={140} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.heatmapDesc}
        </Typography>
      </div>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.contributionGraph}</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <Heatmap data={data} cellSize={11} cellGap={2} />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.customColors}</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <Heatmap
              data={data}
              colorScale={['#fef2f2', '#fca5a5', '#ef4444', '#b91c1c', '#7f1d1d']}
              cellSize={14}
              cellGap={3}
            />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.withHoverTooltip}</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <Heatmap
              data={data}
              cellSize={13}
              cellGap={2}
              renderTooltip={(cell) => (
                <div className="text-xs">
                  <div className="font-semibold text-white">{cell.date}</div>
                  <div className="text-gray-300">{cell.value} contributions</div>
                </div>
              )}
            />
          </div>
        </Card.Body>
      </Card>

      <PropsTable title="Heatmap Props" rows={PROPS} />
    </div>
  );
};

export default HeatmapPage;
