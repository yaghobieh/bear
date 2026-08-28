import { ONE } from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import type { FunnelChartProps } from './Chart.types';
import { CHART } from './Chart.const';
import { getChartColor } from './Chart.utils';

export const FunnelChart = (props: FunnelChartProps) => {
  const {
    data,
    height = CHART.DEFAULT_HEIGHT,
    showLabels = true,
    showValues = true,
    animated = true,
    color,
    className,
    ...rest
  } = props;

  const maxValue = Math.max(...data.map((item) => item.value), ONE);

  return (
    <Flex
      direction="column"
      gap={1}
      justify="center"
      className={cn('Bear-Chart Bear-Chart--funnel bear-w-full', className)}
      style={{ height }}
      {...rest}
    >
      {data.map((item, index) => {
        const widthPct = Math.max((item.value / maxValue) * CHART.VIEWBOX, CHART.FUNNEL_MIN_WIDTH);
        const barColor = getChartColor(index, item.color || color);
        return (
          <Flex key={item.label} direction="column" align="center" gap={1} className="bear-w-full">
            <Box
              className={cn(
                'Bear-Chart__funnel-step bear-rounded-md',
                animated && 'animate-grow-right'
              )}
              style={{
                width: `${widthPct}%`,
                height: `${CHART.VIEWBOX / Math.max(data.length, ONE) / 2}%`,
                minHeight: CHART.FUNNEL_MIN_WIDTH,
                backgroundColor: barColor,
              }}
            />
            {showLabels && (
              <Typography variant="caption" color="muted">
                {item.label}
                {showValues ? ` · ${item.value}` : ''}
              </Typography>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};
