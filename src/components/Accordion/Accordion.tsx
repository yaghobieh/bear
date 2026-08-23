import { useState } from 'react';
import { BOOLEAN_FALSE } from '@const';
import { cn } from '@utils';
import { AccordionContext } from './Accordion.context';
import type { AccordionProps } from './Accordion.types';

export const Accordion = (props: AccordionProps) => {
  const {
    children,
    allowMultiple = BOOLEAN_FALSE,
    defaultOpen = [],
    className,
    testId,
  } = props;

  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((item) => item !== itemId);
      }
      if (allowMultiple) {
        return [...prev, itemId];
      }
      return [itemId];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div
        className={cn(
          'Bear-Accordion bear-divide-y bear-divide-gray-200 dark:bear-divide-gray-700 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-overflow-hidden',
          className
        )}
        data-testid={testId}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
