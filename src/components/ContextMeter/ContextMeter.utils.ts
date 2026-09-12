import { ZERO } from '@const';
import {
  CONTEXT_METER_DANGER_PERCENT,
  CONTEXT_METER_PERCENT_CAP,
  CONTEXT_METER_WARN_PERCENT,
} from './ContextMeter.const';

export const resolveContextMeterPercent = (used: number, max: number) => {
  if (max <= ZERO) {
    return ZERO;
  }
  const next = (used / max) * CONTEXT_METER_PERCENT_CAP;
  if (next < ZERO) {
    return ZERO;
  }
  if (next > CONTEXT_METER_PERCENT_CAP) {
    return CONTEXT_METER_PERCENT_CAP;
  }
  return next;
};

export const resolveContextMeterTone = (percent: number) => {
  if (percent >= CONTEXT_METER_DANGER_PERCENT) {
    return 'danger';
  }
  if (percent >= CONTEXT_METER_WARN_PERCENT) {
    return 'warn';
  }
  return 'ok';
};
