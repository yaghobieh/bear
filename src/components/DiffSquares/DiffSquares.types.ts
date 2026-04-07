import type { HTMLAttributes, ReactNode } from 'react';
import type { TypographyProps } from '../Typography/Typography.types';

export type DiffCubeFill = 'full' | 'empty' | 'half' | 'striped';

export interface DiffCube {
  fill?: DiffCubeFill;
  color?: string;
  secondaryColor?: string;
  gradient?: string;
  ariaLabel?: string;
}

export interface DiffSquaresProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  additionsText?: ReactNode;
  deletionsText?: ReactNode;
  cubeCount?: number;
  cubes?: DiffCube[];
  additionColor?: string;
  deletionColor?: string;
  gap?: number;
  summaryTypographyProps?: Partial<TypographyProps>;
  onCubeClick?: (cube: DiffCube, index: number) => void;
  onCubeHover?: (cube: DiffCube | null, index: number | null) => void;
  testId?: string;
}
