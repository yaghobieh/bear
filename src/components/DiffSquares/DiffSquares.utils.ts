import type { CSSProperties } from 'react';
import type { DiffCube } from './DiffSquares.types';

export function getDiffCubeStyle(
  cube: DiffCube | undefined,
  additionFallback: string,
  deletionFallback: string
): CSSProperties {
  const fill = cube?.fill ?? 'full';
  const primary = cube?.color ?? additionFallback;
  const secondary = cube?.secondaryColor ?? deletionFallback;
  if (cube?.gradient) {
    return { background: cube.gradient };
  }
  if (fill === 'empty') {
    return {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 0 0 1px ${primary}55`,
    };
  }
  if (fill === 'half') {
    return { background: `linear-gradient(90deg, ${primary} 50%, ${secondary} 50%)` };
  }
  if (fill === 'striped') {
    return {
      background: `repeating-linear-gradient(135deg, ${primary}, ${primary} 2px, ${secondary} 2px, ${secondary} 4px)`,
    };
  }
  return { backgroundColor: primary };
}
