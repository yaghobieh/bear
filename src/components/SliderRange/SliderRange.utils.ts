export const stepValue = (raw: number, min: number, max: number, step: number) => {
  const v = Math.round(raw / step) * step;
  return Math.max(min, Math.min(max, v));
};
