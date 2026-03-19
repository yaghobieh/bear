import { useState, useCallback, useRef } from 'react';
import type { BiometricStatus, UseBiometricOptions, UseBiometricReturn } from './Biometric.types';

export const useBiometric = (options: UseBiometricOptions = {}): UseBiometricReturn => {
  const {
    scanDuration = 2000,
    successDuration = 1500,
    onSuccess,
    onError,
  } = options;

  const [status, setStatus] = useState<BiometricStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setStatus('idle');
  }, [cleanup]);

  const scan = useCallback(() => {
    if (status === 'scanning') return;
    cleanup();
    setStatus('scanning');

    timerRef.current = setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setStatus('success');
        onSuccess?.();
        timerRef.current = setTimeout(() => setStatus('idle'), successDuration);
      } else {
        setStatus('error');
        onError?.();
        timerRef.current = setTimeout(() => setStatus('idle'), successDuration);
      }
    }, scanDuration);
  }, [status, cleanup, scanDuration, successDuration, onSuccess, onError]);

  return { status, scan, reset };
};
