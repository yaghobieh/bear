import { forwardRef } from 'react';
import { cn } from '@utils';
import type { EmberSize } from '../../types';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';
import {
  CARD_PADDING_CLASSES,
  CARD_RADIUS_CLASSES,
  CARD_VARIANT_CLASSES,
  CARD_INTERACTIVE_CLASSES,
  CARD_HEADER_CLASSES,
  CARD_TITLE_CLASSES,
  CARD_SUBTITLE_CLASSES,
  CARD_BODY_CLASSES,
  CARD_FOOTER_CLASSES,
  CARD_FOOTER_DIVIDER_CLASSES,
} from './Card.const';

/**
 * Card component for containing content
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <Card.Header title="Card Title" subtitle="Subtitle" />
 *   <Card.Body>Content goes here</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      variant = 'elevated',
      padding = 'none',
      interactive = false,
      radius = 'lg',
      className,
      children,
      testId,
      id,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'Bear-Card',
          `Bear-Card--${variant}`,
          'bear-overflow-hidden',
          CARD_VARIANT_CLASSES[variant],
          CARD_PADDING_CLASSES[padding as EmberSize | 'none'],
          CARD_RADIUS_CLASSES[radius as keyof typeof CARD_RADIUS_CLASSES],
          interactive && `Bear-Card--interactive ${CARD_INTERACTIVE_CLASSES}`,
          className
        )}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const { title, subtitle, action, className, children, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn('Bear-Card__header', CARD_HEADER_CLASSES, className)}
        {...rest}
      >
        <div className="Bear-Card__header-content bear-flex-1 bear-min-w-0">
          {title && (
            <h3 className={cn('Bear-Card__title', CARD_TITLE_CLASSES)}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={cn('Bear-Card__subtitle', CARD_SUBTITLE_CLASSES)}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="Bear-Card__header-action bear-ml-4 bear-shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Body
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn('Bear-Card__body', CARD_BODY_CLASSES, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const { divider = true, className, children, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'Bear-Card__footer',
          CARD_FOOTER_CLASSES,
          divider && CARD_FOOTER_DIVIDER_CLASSES,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Compound component pattern
export const CardCompound = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export default Card;
