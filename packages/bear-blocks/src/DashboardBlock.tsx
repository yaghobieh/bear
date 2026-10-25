import { Flex } from '../../../src/components/Flex';
import { StatCard } from '../../../src/components/StatCard';
import { Typography } from '../../../src/components/Typography';
import { resolveBearId } from '../../../src/utils/generateBearId.utils';
import { useBearId } from '../../../src/utils/useBearId';
import { DASHBOARD_NOTE, DASHBOARD_TITLE } from './DashboardBlock.const';
import type { DashboardBlockProps } from './DashboardBlock.types';

export const DashboardBlock = ({ id, testId, title = DASHBOARD_TITLE, stats }: DashboardBlockProps) => {
  const generatedId = useBearId('DashboardBlock');
  const blockId = resolveBearId(id, generatedId);

  return (
    <Flex id={blockId} data-testid={testId} direction="column" gap={4} className="Bear-DashboardBlock">
      <Typography variant="h4">{title}</Typography>
      <Flex gap={3} wrap="wrap">
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} />
        ))}
      </Flex>
      <Typography variant="body2">{DASHBOARD_NOTE}</Typography>
    </Flex>
  );
};
