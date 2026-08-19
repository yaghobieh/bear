import { useContext } from 'react';
import { ModalsContext } from '../ModalsContext';
import { MODALS_MISSING_PROVIDER_ERROR } from '../ModalsProvider.const';
import type { ModalsContextValue } from '../ModalsProvider.types';

export const useModals = (): ModalsContextValue => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error(MODALS_MISSING_PROVIDER_ERROR);
  }
  return context;
};
