import { useId, useMemo } from 'react';
import { formatBearId } from './generateBearId.utils';

export const useBearId = (componentName: string, suffix?: string): string => {
  const reactId = useId();
  return useMemo(() => {
    const baseId = formatBearId(componentName, reactId);
    if (!suffix) {
      return baseId;
    }
    const cleanedSuffix = suffix.replace(/[^a-zA-Z0-9_]/g, '');
    return cleanedSuffix ? `${baseId}_${cleanedSuffix}` : baseId;
  }, [componentName, reactId, suffix]);
};
