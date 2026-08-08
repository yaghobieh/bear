import { FC, useState, type ReactNode } from 'react';
import type { BannerProps, BannerSeverity } from './Banner.types';
import {
  BANNER_ACTION_CLASS,
  BANNER_BASE_CLASSES,
  BANNER_CONTENT_CLASS,
  BANNER_DEFAULT_DISMISSIBLE,
  BANNER_DEFAULT_FULL_WIDTH,
  BANNER_DEFAULT_OPEN,
  BANNER_DEFAULT_POSITION,
  BANNER_DEFAULT_SEVERITY,
  BANNER_DEFAULT_SHOW_ICON,
  BANNER_DEFAULT_TRANSLATIONS,
  BANNER_DISMISS_CLASS,
  BANNER_FULL_WIDTH_CLASS,
  BANNER_ICON_CLASS,
  BANNER_MESSAGE_CLASS,
  BANNER_POSITION_CLASSES,
  BANNER_ROOT_CLASS,
  BANNER_SEVERITY_CLASSES,
  BANNER_TITLE_CLASS,
} from './Banner.const';
import {
  BannerErrorSvg,
  BannerInfoSvg,
  BannerSuccessSvg,
  BannerWarningSvg,
} from './helpers';
import { CloseButton } from '../CloseButton';
import { cn, getBearLiveRegionProps, resolveBearId, useBearId } from '@utils';

const DEFAULT_ICONS: Record<BannerSeverity, ReactNode> = {
  info: <BannerInfoSvg />,
  success: <BannerSuccessSvg />,
  warning: <BannerWarningSvg />,
  error: <BannerErrorSvg />,
};

export const Banner: FC<BannerProps> = (props) => {
  const {
    severity = BANNER_DEFAULT_SEVERITY,
    title,
    children,
    action,
    icon = BANNER_DEFAULT_SHOW_ICON,
    dismissible = BANNER_DEFAULT_DISMISSIBLE,
    onDismiss,
    open,
    position = BANNER_DEFAULT_POSITION,
    fullWidth = BANNER_DEFAULT_FULL_WIDTH,
    translations,
    className,
    id,
    testId,
    ...rest
  } = props;

  const [internalOpen, setInternalOpen] = useState(BANNER_DEFAULT_OPEN);
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
      setInternalOpen(false);
    }
    onDismiss?.();
  };

  const renderIcon = () => {
    if (icon === false) {
      return null;
    }
    if (icon !== true) {
      return icon;
    }
    return DEFAULT_ICONS[severity];
  };

  const iconNode = renderIcon();

  return (
    <div
      {...rest}
      {...liveRegionProps}
      id={domId}
      data-testid={testId}
      className={cn(
        BANNER_ROOT_CLASS,
        BANNER_BASE_CLASSES,
        BANNER_SEVERITY_CLASSES[severity],
        BANNER_POSITION_CLASSES[position],
        fullWidth && BANNER_FULL_WIDTH_CLASS,
        className
      )}
    >
      {iconNode && <span className={BANNER_ICON_CLASS}>{iconNode}</span>}
      <div className={BANNER_CONTENT_CLASS}>
        {title && <div className={BANNER_TITLE_CLASS}>{title}</div>}
        {children && <div className={BANNER_MESSAGE_CLASS}>{children}</div>}
      </div>
      {action && <div className={BANNER_ACTION_CLASS}>{action}</div>}
      {dismissible && (
        <div className={BANNER_DISMISS_CLASS}>
          <CloseButton size="sm" onClick={handleDismiss} aria-label={dismissLabel} />
        </div>
      )}
    </div>
  );
};
