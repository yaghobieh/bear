import { useContext } from 'react';
import { ACCORDION_ITEM_CONTEXT_ERROR } from '@const';
import { AccordionContext } from '../Accordion.context';
import type { AccordionContextValue } from '../Accordion.types';

export const useAccordion = (): AccordionContextValue => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(ACCORDION_ITEM_CONTEXT_ERROR);
  }
  return context;
};
