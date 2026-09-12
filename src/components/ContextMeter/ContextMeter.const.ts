import { CONTEXT_METER_DEFAULT_MAX, ONE_HUNDRED, SEVENTY_TWO, NINETY } from '@const';
import type { ContextMeterTranslations } from './ContextMeter.types';

export const CONTEXT_METER_DEFAULT_TRANSLATIONS: ContextMeterTranslations = {
  label: 'Context',
};

export const CONTEXT_METER_MAX_DEFAULT = CONTEXT_METER_DEFAULT_MAX;
export const CONTEXT_METER_WARN_PERCENT = SEVENTY_TWO;
export const CONTEXT_METER_DANGER_PERCENT = NINETY;
export const CONTEXT_METER_PERCENT_CAP = ONE_HUNDRED;
