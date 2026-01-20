import { FC, useState, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import type { AccordionContextValue, AccordionProps, AccordionItemProps } from './Accordion.types';

const AccordionContext = createContext<AccordionContextValue | null>(null);

/**
 * Accordion - Collapsible content panels
 * 
 * @example
 * ```tsx
 * <Accordion allowMultiple>
 *   <AccordionItem id="1" title="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 *   <AccordionItem id="2" title="Section 2">
 *     Content for section 2
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className,
  testId,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  
  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (allowMultiple) {
        return [...prev, id];
      }
      return [id];
    });
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div
        className={cn('bear-divide-y bear-divide-gray-200 dark:bear-divide-gray-700 bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg bear-overflow-hidden', className)}
        data-testid={testId}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

/**
 * AccordionItem - Individual accordion panel
 */
export const AccordionItem: FC<AccordionItemProps> = ({
  id,
  title,
  children,
  disabled = false,
  icon,
  className,
}) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  
  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);
  
  return (
    <div className={cn('bear-bg-white dark:bear-bg-gray-900', className)}>
      <button
        onClick={() => !disabled && toggleItem(id)}
        disabled={disabled}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3',
          'bear-text-left bear-font-medium bear-text-gray-900 dark:bear-text-white',
          'hover:bear-bg-gray-50 dark:hover:bear-bg-gray-800 bear-transition-colors',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed'
        )}
      >
        <span>{title}</span>
        {icon || (
          <svg
            className={cn(
              'bear-w-5 bear-h-5 bear-text-gray-500 bear-transition-transform bear-duration-200',
              isOpen && 'bear-rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      <div
        className={cn(
          'bear-overflow-hidden bear-transition-all bear-duration-200',
          isOpen ? 'bear-max-h-96' : 'bear-max-h-0'
        )}
      >
        <div className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-300 bear-bg-gray-50 dark:bear-bg-gray-800/50">
          {children}
        </div>
      </div>
    </div>
  );
};

