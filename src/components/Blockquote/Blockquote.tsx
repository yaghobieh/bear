import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { BlockquoteProps } from './Blockquote.types';
import {
  BORDER_COLOR_MAP,
  ICON_COLOR_MAP,
  ROOT_CLASS,
  CITE_CLASS,
} from './Blockquote.const';

const DEFAULT_QUOTE_ICON = (
  <svg
    className="bear-w-6 bear-h-6 bear-flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export const Blockquote: FC<BlockquoteProps> = ({
  cite,
  icon,
  color = 'default',
  children,
  className,
  testId,
  ...rest
}) => {
  const borderClass = BORDER_COLOR_MAP[color];
  const iconClass = ICON_COLOR_MAP[color];

  return (
    <blockquote
      className={cn(ROOT_CLASS, borderClass, className)}
      data-testid={testId}
      cite={cite}
      {...rest}
    >
      <div className="bear-flex bear-gap-3">
        <span className={iconClass}>{icon ?? DEFAULT_QUOTE_ICON}</span>
        <div className="bear-flex-1 bear-min-w-0">
          <Typography variant="body1" component="span">
            {children}
          </Typography>
          {cite && (
            <Typography
              variant="caption"
              color="secondary"
              component="cite"
              className={cn(CITE_CLASS, 'bear-block')}
            >
              — {cite}
            </Typography>
          )}
        </div>
      </div>
    </blockquote>
  );
};

export default Blockquote;
