import { FC } from 'react';
import { Card, Typography } from '@forgedevstack/bear';
import type { BentoCardProps } from './BentoCard.types';
import { BENTO_CARD_BASE_CLASS, BENTO_CARD_LABEL_CLASS, BENTO_CARD_BODY_CLASS, EMPTY_STRING } from './BentoCard.const';

export const BentoCard: FC<BentoCardProps> = (props) => {
  const { title, children, className = EMPTY_STRING } = props;

  return (
    <Card className={`${BENTO_CARD_BASE_CLASS} ${className}`} padding="md">
      <Typography variant="body2" className={BENTO_CARD_LABEL_CLASS}>
        {title}
      </Typography>
      <div className={BENTO_CARD_BODY_CLASS}>{children}</div>
    </Card>
  );
};
