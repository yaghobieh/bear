import { FC, useCallback } from 'react';
import { cn } from '@utils';
import type { BiometricProps, BiometricStatus } from './Biometric.types';
import { BiometricIcon } from './BiometricIcon';
import { useBiometric } from './useBiometric';

const sizeMap = { sm: 48, md: 72, lg: 96, xl: 128 };

const rippleSizeMap = { sm: 80, md: 120, lg: 160, xl: 200 };

const statusColorClasses: Record<BiometricStatus, string> = {
  idle: 'bear-text-gray-500 dark:bear-text-gray-400',
  scanning: 'bear-text-bear-500 dark:bear-text-bear-400',
  success: 'bear-text-green-500 dark:bear-text-green-400',
  error: 'bear-text-red-500 dark:bear-text-red-400',
};

const ringColorMap: Record<BiometricStatus, string> = {
  idle: 'var(--bear-border-default)',
  scanning: 'var(--bear-primary-500, #ec4899)',
  success: 'var(--bear-success-500, #22c55e)',
  error: 'var(--bear-danger-500, #ef4444)',
};

export const Biometric: FC<BiometricProps> = ({
  type = 'fingerprint',
  size = 'md',
  status: controlledStatus,
  label,
  successLabel = 'Verified',
  errorLabel = 'Try again',
  scanningLabel = 'Scanning...',
  onScan,
  onSuccess,
  onError,
  disabled = false,
  animated = true,
  className,
  testId,
}) => {
  const { status: internalStatus, scan } = useBiometric({
    onSuccess,
    onError,
  });

  const status = controlledStatus ?? internalStatus;
  const iconSize = sizeMap[size];
  const rippleSize = rippleSizeMap[size];

  const statusLabel =
    status === 'scanning' ? scanningLabel
    : status === 'success' ? successLabel
    : status === 'error' ? errorLabel
    : label;

  const handleClick = useCallback(() => {
    if (disabled || status === 'scanning') return;
    onScan?.();
    if (controlledStatus === undefined) scan();
  }, [disabled, status, onScan, controlledStatus, scan]);

  return (
    <div
      className={cn('Bear-Biometric bear-flex bear-flex-col bear-items-center bear-gap-3', className)}
      data-testid={testId}
      data-status={status}
      data-type={type}
    >
      <button
        type="button"
        disabled={disabled || status === 'scanning'}
        onClick={handleClick}
        className={cn(
          'Bear-Biometric__trigger bear-relative bear-flex bear-items-center bear-justify-center bear-rounded-full bear-border-0 bear-cursor-pointer bear-outline-none',
          'bear-transition-all bear-duration-300',
          'focus-visible:bear-ring-2 focus-visible:bear-ring-bear-500 focus-visible:bear-ring-offset-2',
          statusColorClasses[status],
          disabled && 'bear-opacity-40 bear-cursor-not-allowed'
        )}
        style={{
          width: rippleSize,
          height: rippleSize,
          backgroundColor: 'var(--bear-bg-secondary)',
        }}
        aria-label={statusLabel ?? 'Authenticate'}
      >
        {animated && status === 'scanning' && (
          <>
            <span
              className="bear-absolute bear-inset-0 bear-rounded-full bear-animate-ping bear-opacity-20"
              style={{ backgroundColor: ringColorMap[status] }}
            />
            <span
              className="bear-absolute bear-inset-2 bear-rounded-full bear-animate-ping bear-opacity-10"
              style={{ backgroundColor: ringColorMap[status], animationDelay: '0.3s' }}
            />
          </>
        )}

        <span
          className={cn(
            'bear-absolute bear-inset-0 bear-rounded-full bear-border-2 bear-transition-colors bear-duration-300',
            status === 'scanning' && animated && 'bear-animate-spin'
          )}
          style={{
            borderColor: ringColorMap[status],
            borderStyle: status === 'scanning' ? 'dashed' : 'solid',
            animationDuration: status === 'scanning' ? '3s' : undefined,
          }}
        />

        {animated && status === 'success' && (
          <span
            className="bear-absolute bear-inset-0 bear-rounded-full bear-opacity-10"
            style={{ backgroundColor: ringColorMap.success }}
          />
        )}

        <BiometricIcon type={type} size={iconSize} status={status} animated={animated} />
      </button>

      {statusLabel && (
        <span
          className={cn(
            'Bear-Biometric__label bear-text-sm bear-font-medium bear-transition-colors bear-duration-300',
            statusColorClasses[status]
          )}
        >
          {statusLabel}
        </span>
      )}
    </div>
  );
};
