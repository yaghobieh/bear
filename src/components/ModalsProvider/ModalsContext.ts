import { createContext } from 'react';
import type { ModalsContextValue } from './ModalsProvider.types';

export const ModalsContext = createContext<ModalsContextValue | null>(null);
