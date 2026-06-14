import { useBear } from '../context/BearProvider';
import type { BearDefaultPropsMap } from '../types/component.types';

export const useBearDefaultProps = <T extends Record<string, unknown>>(
  componentKey: keyof BearDefaultPropsMap,
  props: T,
): T => {
  const { defaultProps } = useBear();
  const defaults = defaultProps[componentKey];
  if (!defaults) {
    return props;
  }
  return { ...defaults, ...props } as T;
};
