import { cn, resolveBearId, useBearId } from '@utils';
import { Button } from '../Button';
import { Typography } from '../Typography';
import type { StatCardProps } from './StatCard.types';
import {
  DEFAULT_STAT_CARD_ACTION_LABEL,
  DEFAULT_STAT_CARD_COLOR,
  STAT_CARD_GRADIENT_END_ALPHA,
  STAT_CARD_GRADIENT_START_ALPHA,
} from './StatCard.const';
import { handleStatCardKeyDown } from './StatCard.utils';

export const StatCard = (props: StatCardProps) => {
  const {
    title,
    value,
    color = DEFAULT_STAT_CARD_COLOR,
    icon,
    onClick,
    className,
    id,
    testId,
    ...htmlProps
  } = props;
  const generatedId = useBearId('StatCard');
  const domId = resolveBearId(id, generatedId);
  const background = `linear-gradient(135deg, ${color}${STAT_CARD_GRADIENT_START_ALPHA}, ${color}${STAT_CARD_GRADIENT_END_ALPHA})`;

  return (
    <div
      id={domId}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn('Bear-StatCard', className)}
      style={{ background }}
      onClick={onClick}
      onKeyDown={(event) => handleStatCardKeyDown(event, onClick)}
      {...htmlProps}
    >
      <div className="Bear-StatCard__decoration" aria-hidden />
      <div className="Bear-StatCard__body">
        <Typography className="Bear-StatCard__title">{title}</Typography>
        <Typography className="Bear-StatCard__value">{value}</Typography>
        {onClick && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="Bear-StatCard__action"
            icon={icon}
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
          >
            {DEFAULT_STAT_CARD_ACTION_LABEL}
          </Button>
        )}
      </div>
    </div>
  );
};
