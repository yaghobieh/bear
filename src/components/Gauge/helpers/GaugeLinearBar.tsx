import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { Typography } from '../../Typography';
import type { GaugeLinearBarProps } from '../Gauge.types';
import { GAUGE_ANIMATION_EASING, GAUGE_LINEAR_TRACK_HEIGHT } from '../Gauge.const';

export const GaugeLinearBar = (props: GaugeLinearBarProps) => {
  const { percentage, color, trackColor, gradient, animated, fillDurationMs, showLabel, label } = props;

  return (
    <Flex direction="column" gap={2} className="Bear-Gauge Bear-Gauge--linear bear-w-full">
      <Box
        className="Bear-Gauge__linear-track bear-w-full bear-overflow-hidden bear-rounded-full"
        style={{
          height: GAUGE_LINEAR_TRACK_HEIGHT,
          backgroundColor: trackColor ?? 'var(--bear-border-default)',
        }}
      >
        <Box
          className="Bear-Gauge__linear-fill bear-h-full bear-rounded-full"
          style={{
            width: `${percentage}%`,
            background: gradient ? `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})` : color,
            transitionProperty: animated ? 'width' : undefined,
            transitionDuration: animated ? `${fillDurationMs}ms` : undefined,
            transitionTimingFunction: animated ? GAUGE_ANIMATION_EASING : undefined,
          }}
        />
      </Box>
      {showLabel && (label || (
        <Typography variant="caption" color="muted">
          {Math.round(percentage)}%
        </Typography>
      ))}
    </Flex>
  );
};
