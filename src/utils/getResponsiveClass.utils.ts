import type { ResponsiveProp } from '../types';

export const getResponsiveClass = <T extends string | number>(
  value: ResponsiveProp<T> | undefined,
  classes: Record<string, string>
): string => {
  if (value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    const result: string[] = [];
    if (value.base !== undefined) {
      result.push(classes[value.base as unknown as string]);
    }
    return result.join(' ');
  }

  return classes[value as unknown as string] || '';
};
