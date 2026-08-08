import { FC } from 'react';
import { cn, resolveBearId, useBearId } from '@utils';
import type { StatCardProps } from './StatCard.types';
import {
  DEFAULT_STAT_CARD_ACTION_LABEL,
  DEFAULT_STAT_CARD_COLOR,
  STAT_CARD_ACTION_CLASS,
  STAT_CARD_BASE_CLASSES,
  STAT_CARD_BODY_CLASS,
  STAT_CARD_DECORATION_CLASS,
  STAT_CARD_GRADIENT_END_ALPHA,
  STAT_CARD_GRADIENT_START_ALPHA,
  STAT_CARD_ROOT_CLASS,
  STAT_CARD_TITLE_CLASS,
  STAT_CARD_VALUE_CLASS,
} from './StatCard.const';

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  color = DEFAULT_STAT_CARD_COLOR,
  icon,
  onClick,
  className,
  id,
  testId,
  ...props
}) => {
  const generatedId = useBearId('StatCard');
  const domId = resolveBearId(id, generatedId);
  const background = `linear-gradient(135deg, ${color}${STAT_CARD_GRADIENT_START_ALPHA}, ${color}${STAT_CARD_GRADIENT_END_ALPHA})`;

  return (
    <div
      id={domId}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(STAT_CARD_ROOT_CLASS, STAT_CARD_BASE_CLASSES, className)}
      style={{ background }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      <div className={STAT_CARD_DECORATION_CLASS} aria-hidden />
      <div className={STAT_CARD_BODY_CLASS}>
        <p className={STAT_CARD_TITLE_CLASS}>{title}</p>
        <p className={STAT_CARD_VALUE_CLASS}>{value}</p>
        {onClick && (
          <button type="button" className={STAT_CARD_ACTION_CLASS}>
            {icon}
            {DEFAULT_STAT_CARD_ACTION_LABEL}
          </button>
        )}
      </div>
    </div>
  );
};
