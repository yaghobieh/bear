import type { FC } from 'react';
import { RATING_STAR_STATE_EMPTY } from '@const';
import { StarBorderIcon, StarHalfIcon, StarIcon as BearStarIcon } from '../../../Icon';
import type { IconProps } from '../../../Icon/Icon.types';
import type { RatingStarIconProps, RatingStarState } from '../../Rating.types';

const STAR_ICON_BY_STATE: Record<RatingStarState, FC<Omit<IconProps, 'children'>>> = {
  filled: BearStarIcon,
  half: StarHalfIcon,
  empty: StarBorderIcon,
};

export const StarIcon = (props: RatingStarIconProps) => {
  const { size, state, color, emptyColor } = props;
  const IconComponent = STAR_ICON_BY_STATE[state];
  const iconColor = state === RATING_STAR_STATE_EMPTY ? emptyColor : color;

  return (
    <div className="Bear-Rating__star-icon">
      <IconComponent size={size} color={iconColor} />
    </div>
  );
};
