import { createContext } from 'react';
import type { ToggleGroupContextValue } from './ToggleGroup.types';

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);
