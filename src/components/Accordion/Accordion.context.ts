import { createContext } from 'react';
import type { AccordionContextValue } from './Accordion.types';

export const AccordionContext = createContext<AccordionContextValue | null>(null);
