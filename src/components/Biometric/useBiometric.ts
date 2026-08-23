import { useState, useCallback, useRef } from 'react';
import {
  ANIMATED_COUNTER_DURATION,
  FIFTEEN_HUNDRED,
  STATUS_ERROR,
  STATUS_IDLE,
  STATUS_SCANNING,
  STATUS_SUCCESS,
  TENTH,
  TWO,
} from '@const';
import type { BiometricStatus, UseBiometricOptions, UseBiometricReturn } from './Biometric.types';

export const useBiometric = (options: UseBiometricOptions = {}): UseBiometricReturn => {
  const {
    scanDuration = ANIMATED_COUNTER_DURATION,
    successDuration = FIFTEEN_HUNDRED,
    onSuccess,
    onError,
  } = options;

  const [status, setStatus] = useState<BiometricStatus>(STATUS_IDLE);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setStatus(STATUS_IDLE);
  }, [cleanup]);

  const scan = useCallback(() => {
    if (status === STATUS_SCANNING) {
      return;
    }
    cleanup();
    setStatus(STATUS_SCANNING);

    timerRef.current = setTimeout(() => {
      const isSuccess = Math.random() > TENTH * TWO;
      if (isSuccess) {
        setStatus(STATUS_SUCCESS);
        onSuccess?.();
        timerRef.current = setTimeout(() => setStatus(STATUS_IDLE), successDuration);
      } else {
        setStatus(STATUS_ERROR);
        onError?.();
        timerRef.current = setTimeout(() => setStatus(STATUS_IDLE), successDuration);
      }
    }, scanDuration);
  }, [status, cleanup, scanDuration, successDuration, onSuccess, onError]);

  return { status, scan, reset };
};
