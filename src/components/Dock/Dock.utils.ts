export const getScale = (
  index: number,
  hoverIndex: number,
  distance: number,
  baseSize: number,
  maxSize: number
): number => {
  if (hoverIndex < 0) return baseSize;
  const diff = Math.abs(index - hoverIndex);
  if (diff > distance) return baseSize;
  const ratio = 1 - diff / (distance + 1);
  return baseSize + (maxSize - baseSize) * ratio;
};
