import { createContext } from 'react';
import type { FormControlContextValue } from './FormControl.types';

export const FormControlContext = createContext<FormControlContextValue | null>(null);
