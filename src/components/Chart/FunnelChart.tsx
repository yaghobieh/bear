import { ONE } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import type { CSSProperties } from 'react';
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
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('FunnelChart');
  const domId = resolveBearId(id, generatedId);
  const maxValue = Math.max(...data.map((item) => item.value), ONE);
  const rootStyle = { '--Bear-Chart-height': `${height}px` } as CSSProperties;

  return (
    <Flex
      id={domId}
      data-testid={testId}
      direction="column"
      gap={1}
      justify="center"
      className={cn('Bear-Chart Bear-Chart--funnel', className)}
      style={rootStyle}
      {...rest}
    >
      {data.map((item, index) => {
        const widthPct = Math.max((item.value / maxValue) * CHART.VIEWBOX, CHART.FUNNEL_MIN_WIDTH);
        const stepStyle = {
          '--Bear-Chart-size': `${widthPct}%`,
          '--Bear-Chart-step-height': `${CHART.VIEWBOX / Math.max(data.length, ONE) / 2}%`,
          '--Bear-Chart-color': getChartColor(index, item.color || color),
        } as CSSProperties;
        return (
          <Flex key={item.label} direction="column" align="center" gap={1} className="bear-w-full">
            <Box
              className={cn('Bear-Chart__funnel-step bear-rounded-md', animated && 'animate-grow-right')}
              style={stepStyle}
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
