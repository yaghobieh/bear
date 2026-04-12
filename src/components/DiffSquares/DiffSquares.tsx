import { FC, useMemo } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { DiffSquaresProps, DiffCube } from './DiffSquares.types';
import { DIFF_SQUARES_DEFAULT_COUNT, DIFF_SQUARES_CUBE_CLASS, DIFF_SQUARES_GAP } from './DiffSquares.const';
import { getDiffCubeStyle } from './DiffSquares.utils';

export const DiffSquares: FC<DiffSquaresProps> = ({
  additionsText,
  deletionsText,
  cubeCount = DIFF_SQUARES_DEFAULT_COUNT,
  cubes,
  additionColor = 'var(--bear-colors-success-500, #22c55e)',
  deletionColor = 'var(--bear-colors-danger-500, #ef4444)',
  gap = DIFF_SQUARES_GAP,
  summaryTypographyProps,
  onCubeClick,
  onCubeHover,
  className,
  testId,
  ...rest
}) => {
  const list = useMemo((): DiffCube[] => {
    if (cubes?.length) return cubes;
    return Array.from({ length: cubeCount }, () => ({ fill: 'full' as const }));
  }, [cubes, cubeCount]);

  const summaryProps = {
    variant: 'body2' as const,
    component: 'span' as const,
    ...summaryTypographyProps,
    className: cn(
      'bear-flex bear-shrink-0 bear-items-baseline bear-gap-1.5 bear-font-mono bear-font-semibold',
      summaryTypographyProps?.className
    ),
  };

  return (
    <div
      className={cn('Bear-DiffSquares bear-inline-flex bear-min-w-0 bear-max-w-full bear-items-center bear-gap-2', className)}
      data-testid={testId}
      {...rest}
    >
      {(additionsText != null || deletionsText != null) && (
        <Typography {...summaryProps}>
          {additionsText != null && (
            <span style={{ color: additionColor }}>{additionsText}</span>
          )}
          {deletionsText != null && (
            <span style={{ color: deletionColor }}>{deletionsText}</span>
          )}
        </Typography>
      )}
      <span
        className="bear-inline-flex bear-items-center bear-flex-shrink-0"
        style={{ gap }}
        role="img"
        aria-label="Change density"
      >
        {list.map((cube, i) => (
          <span
            key={i}
            className={DIFF_SQUARES_CUBE_CLASS}
            style={getDiffCubeStyle(cube, additionColor, deletionColor)}
            aria-hidden={!cube?.ariaLabel}
            title={cube?.ariaLabel}
            onMouseEnter={() => onCubeHover?.(cube, i)}
            onMouseLeave={() => onCubeHover?.(null, null)}
            onClick={() => onCubeClick?.(cube, i)}
          />
        ))}
      </span>
    </div>
  );
};
