import { useState } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, INFO, STATIC } from '@const';
import { Box } from '../Box';
import { CloseButton } from '../CloseButton';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { cn, getBearLiveRegionProps, resolveBearId, useBearId } from '@utils';
import {
  BANNER_DEFAULT_ICON_MAP,
  BANNER_DEFAULT_TRANSLATIONS,
  BANNER_POSITION_CLASSES,
  BANNER_SEVERITY_CLASSES,
} from './Banner.const';
import type { BannerProps } from './Banner.types';

export const Banner = (props: BannerProps) => {
  const {
    severity = INFO,
    title,
    children,
    action,
    icon = BOOLEAN_TRUE,
    dismissible = BOOLEAN_FALSE,
    onDismiss,
    open,
    position = STATIC,
    fullWidth = BOOLEAN_TRUE,
    translations,
    className,
    id,
    testId,
    ...rest
  } = props;

  const [internalOpen, setInternalOpen] = useState(BOOLEAN_TRUE);
  const isOpen = open ?? internalOpen;
  const generatedId = useBearId('Banner');
  const domId = resolveBearId(id, generatedId);
  const dismissLabel = translations?.dismissLabel ?? BANNER_DEFAULT_TRANSLATIONS.dismissLabel;
  const liveRegionProps = getBearLiveRegionProps(severity);

  if (!isOpen) {
    return null;
  }

  const handleDismiss = () => {
    if (open === undefined) {
      setInternalOpen(BOOLEAN_FALSE);
    }
    onDismiss?.();
  };

  const renderIcon = () => {
    if (icon === BOOLEAN_FALSE) {
      return null;
    }
    if (icon !== BOOLEAN_TRUE) {
      return icon;
    }
    const IconComponent = BANNER_DEFAULT_ICON_MAP[severity];
    return <IconComponent />;
  };

  const iconNode = renderIcon();

  return (
    <Flex
      {...rest}
      {...liveRegionProps}
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-Banner bear-items-center bear-gap-3 bear-px-4 bear-py-3 bear-border-b bear-border-[var(--bear-border-default)]',
        BANNER_SEVERITY_CLASSES[severity],
        BANNER_POSITION_CLASSES[position],
        fullWidth && 'bear-w-full',
        className
      )}
    >
      {iconNode && (
        <Box as="span" className="Bear-Banner__icon bear-flex-shrink-0 bear-w-5 bear-h-5">
          {iconNode}
        </Box>
      )}
      <Box className="Bear-Banner__content bear-flex-1 bear-min-w-0 bear-text-sm">
        {title && (
          <Typography weight="semibold" className="Bear-Banner__title bear-mb-0.5">
            {title}
          </Typography>
        )}
        {children && (
          <Typography className="Bear-Banner__message">
            {children}
          </Typography>
        )}
      </Box>
      {action && <Box className="Bear-Banner__action bear-flex-shrink-0">{action}</Box>}
      {dismissible && (
        <Box className="Bear-Banner__dismiss bear-flex-shrink-0">
          <CloseButton size="sm" onClick={handleDismiss} aria-label={dismissLabel} />
        </Box>
      )}
    </Flex>
  );
};
