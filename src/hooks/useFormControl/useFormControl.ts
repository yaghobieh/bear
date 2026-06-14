import { useContext } from 'react';
import { FormControlContext } from '../../components/FormControl/FormControl.context';
import type { FormControlContextValue } from '../../components/FormControl/FormControl.types';

export const useFormControl = (): FormControlContextValue | null => {
  return useContext(FormControlContext);
};
