import type { PropsConfig, PropValues } from './PropsPlayground.types';

export function getDefaults(config: PropsConfig): PropValues {
  const out: PropValues = {};
  for (const [key, spec] of Object.entries(config)) {
    out[key] = spec.default;
  }
  return out;
}
