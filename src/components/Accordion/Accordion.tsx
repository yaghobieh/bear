import { FC, useState, createContext, useContext } from 'react';
import { cn } from '@utils';
import type { AccordionContextValue, AccordionProps, AccordionItemProps } from './Accordion.types';
import {
  ACCORDION_ROOT_CLASSES,
  ACCORDION_ITEM_CLASSES,
  ACCORDION_TRIGGER_CLASSES,
  ACCORDION_TRIGGER_DISABLED_CLASSES,
  ACCORDION_CONTENT_CLASSES,
} from './Accordion.const';

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
export const Accordion: FC<AccordionProps> = (props) => {
  const {
    children,
    allowMultiple = false,
    defaultOpen = [],
    className,
    testId,
    id,
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
        id={id}
        className={cn('Bear-Accordion', ACCORDION_ROOT_CLASSES, className)}
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
export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    id,
    title,
    children,
    disabled = false,
    icon,
    className,
  } = props;

  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  
  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);
  
  return (
    <div className={cn('Bear-Accordion__item', ACCORDION_ITEM_CLASSES, className)}>
      <button
        onClick={() => !disabled && toggleItem(id)}
        disabled={disabled}
        className={cn(
          'Bear-Accordion__trigger',
          ACCORDION_TRIGGER_CLASSES,
          disabled && `Bear-Accordion__trigger--disabled ${ACCORDION_TRIGGER_DISABLED_CLASSES}`
        )}
        aria-expanded={isOpen}
      >
        <span className="Bear-Accordion__title">{title}</span>
        <span className="Bear-Accordion__icon">
          {icon || (
            <svg
              className={cn(
                'bear-w-5 bear-h-5 bear-text-gray-500 dark:bear-text-gray-400 bear-transition-transform bear-duration-200',
                isOpen && 'bear-rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      <div
        className={cn(
          'Bear-Accordion__content-wrapper',
          'bear-overflow-hidden bear-transition-all bear-duration-200',
          isOpen ? 'Bear-Accordion__content-wrapper--open bear-max-h-96' : 'bear-max-h-0'
        )}
      >
        <div className={cn('Bear-Accordion__content', ACCORDION_CONTENT_CLASSES)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
