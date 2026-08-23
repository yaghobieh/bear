import type { ReactNode } from 'react';
import { TWO, ZERO } from '@const';
import { Typography } from '../Typography';
import type { RingProgressSection } from './RingProgress.types';

export const getRingTotal = (sections: RingProgressSection[]): number => {
  return sections.reduce((sum, section) => sum + section.value, ZERO);
};

export const getRingMetrics = (size: number, thickness: number) => {
  const radius = (size - thickness) / TWO;
  const circumference = TWO * Math.PI * radius;
  const center = size / TWO;
  return { radius, circumference, center };
};

export const renderRingLabel = (label: ReactNode) => {
  if (typeof label === 'string') {
    return (
      <Typography variant="body2" color="secondary">
        {label}
      </Typography>
    );
  }
  return label;
};

export const getRingSegmentLength = (
  value: number,
  total: number,
  circumference: number
): number => {
  if (total <= ZERO) {
    return ZERO;
  }
  return (value / total) * circumference;
};

export const STROKE_LINECAP_ROUND = 'round';
export const STROKE_LINECAP_BUTT = 'butt';
export const FILL_NONE = 'none';
