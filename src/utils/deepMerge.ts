/**
 * Deep merge utility for theme objects
 */

type DeepObject = Record<string, unknown>;

const isObject = (item: unknown): item is DeepObject => {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
};

/**
 * Deep merge two objects
 */
export const deepMerge = <T extends DeepObject>(
  target: T,
  source: Partial<T>
): T => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof typeof source];
      const targetValue = target[key as keyof typeof target];

      if (isObject(sourceValue) && isObject(targetValue)) {
        (output as DeepObject)[key] = deepMerge(
          targetValue as DeepObject,
          sourceValue as DeepObject
        );
      } else if (sourceValue !== undefined) {
        (output as DeepObject)[key] = sourceValue;
      }
    });
  }

  return output;
};

