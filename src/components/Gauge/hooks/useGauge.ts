import { useLayoutEffect, useMemo, useState } from 'react';
import {
  GAUGE_DEFAULT_ARC_ANGLE,
  GAUGE_DEFAULT_FILL_DURATION_MS,
  GAUGE_DEFAULT_MAX,
  GAUGE_DEFAULT_MIN,
  GAUGE_VIEWBOX_CENTER,
} from '../Gauge.const';
import type { GaugeProps } from '../Gauge.types';

export interface UseGaugeResult {
  percentage: number;
  circumference: number;
  dashOffset: number;
  startAngle: number;
  radius: number;
  fillDurationMs: number;
  animated: boolean;
}

/**
 * Computes arc geometry and animated stroke offset for {@link Gauge}.
 */
export const useGauge = (props: GaugeProps): UseGaugeResult => {
  const {
    value,
    min = GAUGE_DEFAULT_MIN,
    max = GAUGE_DEFAULT_MAX,
    strokeWidth = 10,
    arcAngle = GAUGE_DEFAULT_ARC_ANGLE,
    animated = true,
    fillDurationMs = GAUGE_DEFAULT_FILL_DURATION_MS,
  } = props;

  const { percentage, circumference, offset, startAngle, radius } = useMemo(() => {
    const pct = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    const computedRadius = GAUGE_VIEWBOX_CENTER - strokeWidth / 2;
    const circ = 2 * Math.PI * computedRadius * (arcAngle / 360);
    const off = circ - (pct / 100) * circ;
    const start = 90 + (360 - arcAngle) / 2;

    return {
      percentage: pct,
      circumference: circ,
      offset: off,
      startAngle: start,
      radius: computedRadius,
    };
  }, [value, min, max, arcAngle, strokeWidth]);

  const [dashOffset, setDashOffset] = useState(() => (animated ? circumference : offset));

  useLayoutEffect(() => {
    if (!animated) {
      setDashOffset(offset);
      return;
    }
    setDashOffset(circumference);
    const frameId = requestAnimationFrame(() => setDashOffset(offset));
    return () => cancelAnimationFrame(frameId);
  }, [animated, circumference, offset]);

  return {
    percentage,
    circumference,
    dashOffset,
    startAngle,
    radius,
    fillDurationMs,
    animated,
  };
};
