import { FC } from 'react';
import { cn, useBearId } from '@utils';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import type { GaugeProps } from './Gauge.types';
import {
  GAUGE_DEFAULT_ARC_ANGLE,
  GAUGE_DEFAULT_COLOR,
  GAUGE_DEFAULT_FILL_DURATION_MS,
  GAUGE_DEFAULT_MAX,
  GAUGE_DEFAULT_MIN,
  GAUGE_DEFAULT_SIZE,
  GAUGE_DEFAULT_STROKE_WIDTH,
} from './Gauge.const';
import { useGauge } from './hooks/useGauge';
import { GaugeArcSvg } from './helpers/GaugeArcSvg';

export const Gauge: FC<GaugeProps> = (props) => {
  const {
    value,
    min = GAUGE_DEFAULT_MIN,
    max = GAUGE_DEFAULT_MAX,
    size = GAUGE_DEFAULT_SIZE,
    strokeWidth = GAUGE_DEFAULT_STROKE_WIDTH,
    color = GAUGE_DEFAULT_COLOR,
    trackColor,
    showLabel = true,
    label,
    animated = true,
    fillDurationMs = GAUGE_DEFAULT_FILL_DURATION_MS,
    arcAngle = GAUGE_DEFAULT_ARC_ANGLE,
    gradient,
    className,
    ...rest
  } = props;

  const gradientId = useBearId('Gauge', 'gradient');
  const gauge = useGauge({
    value,
    min,
    max,
    strokeWidth,
    arcAngle,
    animated,
    fillDurationMs,
  });

  return (
    <Flex
      align="center"
      justify="center"
      className={cn('bear-relative bear-inline-flex', className)}
      style={{ width: size, height: size }}
      {...rest}
    >
      <GaugeArcSvg
        radius={gauge.radius}
        strokeWidth={strokeWidth}
        circumference={gauge.circumference}
        dashOffset={gauge.dashOffset}
        startAngle={gauge.startAngle}
        color={color}
        trackColor={trackColor}
        gradientId={gradient ? gradientId : undefined}
        gradient={gradient}
        animated={gauge.animated}
        fillDurationMs={gauge.fillDurationMs}
      />

      {showLabel && (
        <Flex
          align="center"
          justify="center"
          className="bear-absolute bear-inset-0"
        >
          {label || (
            <Typography variant="h4" className="bear-text-[var(--bear-text-primary)]">
              {Math.round(gauge.percentage)}%
            </Typography>
          )}
        </Flex>
      )}
    </Flex>
  );
};
