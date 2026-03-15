import type { CountdownTime } from './CountdownTimer.types';
import { MS_PER_SECOND, MS_PER_MINUTE, MS_PER_HOUR, MS_PER_DAY, PAD_LENGTH } from './CountdownTimer.const';

export const pad = (n: number): string => String(n).padStart(PAD_LENGTH, '0');

export const calcRemaining = (target: number, now: number): CountdownTime => {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / MS_PER_DAY),
    hours: Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND),
    totalSeconds: Math.floor(diff / MS_PER_SECOND),
    isComplete: diff <= 0,
  };
};
