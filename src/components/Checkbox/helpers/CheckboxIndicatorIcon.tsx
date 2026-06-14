import { CHECKBOX_INDICATOR_STROKE, CHECKBOX_INDICATOR_VIEWBOX } from '../Checkbox.const';
import type { CheckboxIndicatorIconProps } from './CheckboxIndicatorIcon.types';

export const CheckboxIndicatorIcon = (props: CheckboxIndicatorIconProps) => {
  const { size, indicator, indeterminate = false } = props;
  const strokeProps = {
    fill: 'none' as const,
    stroke: CHECKBOX_INDICATOR_STROKE.color,
    strokeWidth: CHECKBOX_INDICATOR_STROKE.width,
    strokeLinecap: CHECKBOX_INDICATOR_STROKE.linecap,
    strokeLinejoin: CHECKBOX_INDICATOR_STROKE.linejoin,
  };

  if (indeterminate || indicator === 'minus') {
    return (
      <svg width={size} height={size} viewBox={CHECKBOX_INDICATOR_VIEWBOX} {...strokeProps}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    );
  }

  if (indicator === 'x') {
    return (
      <svg width={size} height={size} viewBox={CHECKBOX_INDICATOR_VIEWBOX} {...strokeProps}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={CHECKBOX_INDICATOR_VIEWBOX} {...strokeProps}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};
