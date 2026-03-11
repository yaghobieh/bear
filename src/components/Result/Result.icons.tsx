import type { ReactNode } from 'react';
import type { ResultStatus } from './Result.types';

const SVG_VIEWBOX = '0 0 24 24';
const SVG_SIZE = 64;

const svgProps = {
  width: SVG_SIZE,
  height: SVG_SIZE,
  viewBox: SVG_VIEWBOX,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const SuccessIcon = () => (
  <svg {...svgProps}>
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const ErrorIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </svg>
);

const InfoIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const WarningIcon = () => (
  <svg {...svgProps}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
  </svg>
);

const STATUS_SVG_MAP: Partial<Record<ResultStatus, () => JSX.Element>> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

export const getStatusIcon = (status: ResultStatus, textClasses: string): ReactNode => {
  const SvgComponent = STATUS_SVG_MAP[status];
  if (SvgComponent) return <SvgComponent />;
  return <span className={textClasses}>{status.toUpperCase()}</span>;
};
