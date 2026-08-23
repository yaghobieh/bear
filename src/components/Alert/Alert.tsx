import { useState } from 'react';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  INFO,
  LABEL_CLOSE_ALERT,
  VARIANT_FILLED,
  VARIANT_GHOST,
  VARIANT_OUTLINED,
  VARIANT_STANDARD,
} from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { BearIcons, CloseIcon, InfoIcon } from '../Icon';
import { Typography } from '../Typography';
import type { AlertProps } from './Alert.types';
import { ALERT_SEVERITY_COLORS, ALERT_VARIANT_CLASSES } from './Alert.const';

export const Alert = (props: AlertProps) => {
  const {
    severity = INFO,
    variant = VARIANT_STANDARD,
    title,
    icon = BOOLEAN_TRUE,
    action,
    closable = BOOLEAN_FALSE,
    onClose,
    children,
    className,
    testId,
    ...rest
  } = props;

  const [visible, setVisible] = useState(BOOLEAN_TRUE);

  if (!visible) {
    return null;
  }

  const isFilled = variant === VARIANT_FILLED;
  const colors = ALERT_SEVERITY_COLORS[severity];

  const handleClose = () => {
    setVisible(BOOLEAN_FALSE);
    onClose?.();
  };

  const renderIcon = () => {
    if (icon === BOOLEAN_FALSE) {
      return null;
    }
    if (icon !== BOOLEAN_TRUE) {
      return icon;
    }
    if (severity === INFO) {
      return <InfoIcon />;
    }
    if (severity === 'success') {
      return <BearIcons.CheckCircleIcon />;
    }
    if (severity === 'warning') {
      return <BearIcons.WarningIcon />;
    }
    return <BearIcons.ErrorIcon />;
  };

  const renderedIcon = renderIcon();

  return (
    <Flex
      role="alert"
      aria-live="polite"
      className={cn(
        'Bear-Alert bear-items-start bear-gap-3 bear-p-4 bear-rounded-lg',
        ALERT_VARIANT_CLASSES[variant](severity),
        className
      )}
      style={{
        backgroundColor: isFilled ? undefined : colors.bg,
        borderColor: variant === VARIANT_OUTLINED ? colors.border : undefined,
        color: isFilled ? undefined : colors.text,
      }}
      data-testid={testId}
      {...rest}
    >
      {renderedIcon && (
        <Box
          as="span"
          className="Bear-Alert__icon bear-flex-shrink-0 bear-mt-0.5"
          style={{ color: isFilled ? 'currentColor' : colors.icon }}
        >
          {renderedIcon}
        </Box>
      )}

      <Box className="Bear-Alert__content bear-flex-1 bear-min-w-0">
        {title && (
          <Typography weight="semibold" className="Bear-Alert__title bear-mb-1">
            {title}
          </Typography>
        )}
        {children && (
          <Typography className="Bear-Alert__message bear-text-sm">
            {children}
          </Typography>
        )}
      </Box>

      {action && (
        <Box className="Bear-Alert__action bear-flex-shrink-0">
          {action}
        </Box>
      )}

      {closable && (
        <Button
          variant={VARIANT_GHOST}
          onClick={handleClose}
          className="Bear-Alert__close bear-flex-shrink-0 bear-p-1"
          aria-label={LABEL_CLOSE_ALERT}
        >
          <CloseIcon />
        </Button>
      )}
    </Flex>
  );
};

export default Alert;
