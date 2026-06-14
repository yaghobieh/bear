import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { FormControlContext } from './FormControl.context';
import type { FormControlProps, FormControlContextValue } from './FormControl.types';
import {
  FORM_CONTROL_ERROR_CLASS,
  FORM_CONTROL_HELPER_CLASS,
  FORM_CONTROL_LABEL_CLASS,
  FORM_CONTROL_REQUIRED_MARK,
  FORM_CONTROL_ROOT_CLASS,
} from './FormControl.const';

export const FormControl = (props: FormControlProps) => {
  const {
    label,
    helperText,
    error = false,
    disabled = false,
    required = false,
    fullWidth = false,
    className,
    children,
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('FormControl');
  const domId = resolveBearId(id, generatedId);
  const labelId = label ? `${domId}-label` : undefined;
  const helperId = helperText ? `${domId}-helper` : undefined;

  const contextValue: FormControlContextValue = {
    disabled,
    error,
    required,
    labelId,
    helperId,
  };

  return (
    <FormControlContext.Provider value={contextValue}>
      <Flex
        id={domId}
        data-testid={testId}
        direction="column"
        gap={2}
        className={cn(
          FORM_CONTROL_ROOT_CLASS,
          fullWidth && 'bear-w-full',
          disabled && 'bear-opacity-60 bear-pointer-events-none',
          className
        )}
        {...rest}
      >
        {label && (
          <Typography
            component="label"
            id={labelId}
            variant="body2"
            className={cn(
              FORM_CONTROL_LABEL_CLASS,
              'bear-font-medium bear-text-[var(--bear-text-secondary)]'
            )}
          >
            {label}
            {required && (
              <Box
                as="span"
                className="bear-text-red-500 bear-ml-0.5"
                aria-hidden="true"
              >
                {FORM_CONTROL_REQUIRED_MARK}
              </Box>
            )}
          </Typography>
        )}
        {children}
        {helperText && (
          <Typography
            component="p"
            id={helperId}
            variant="body2"
            className={cn(
              FORM_CONTROL_HELPER_CLASS,
              error ? cn(FORM_CONTROL_ERROR_CLASS, 'bear-text-red-500') : 'bear-text-[var(--bear-text-muted)]'
            )}
          >
            {helperText}
          </Typography>
        )}
      </Flex>
    </FormControlContext.Provider>
  );
};
