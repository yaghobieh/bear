import type { AccordionItemProps } from './AccordionItem.types';
import { BOOLEAN_FALSE } from '@const';
import { cn } from '@utils';
import { Box } from '../../../Box';
import { Typography } from '../../../Typography';
import { ChevronDownIcon } from '../../../Icon';
import { useAccordion } from '../../hooks';
import { isAccordionItemOpen } from './AccordionItem.utils';

export const AccordionItem = (props: AccordionItemProps) => {
  const {
    id,
    title,
    children,
    disabled = BOOLEAN_FALSE,
    icon,
    className,
  } = props;

  const { openItems, toggleItem } = useAccordion();
  const isOpen = isAccordionItemOpen(openItems, id);

  return (
    <Box className={cn('Bear-Accordion__item bear-bg-white dark:bear-bg-zinc-900', className)}>
      <button
        type="button"
        onClick={() => !disabled && toggleItem(id)}
        disabled={disabled}
        className={cn(
          'Bear-Accordion__trigger bear-w-full bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-text-left bear-font-medium bear-text-gray-900 dark:bear-text-white hover:bear-bg-gray-50 dark:hover:bear-bg-zinc-800 bear-transition-colors',
          disabled && 'Bear-Accordion__trigger--disabled bear-opacity-50 bear-cursor-not-allowed'
        )}
        aria-expanded={isOpen}
      >
        <Typography className="Bear-Accordion__title">{title}</Typography>
        <Box className="Bear-Accordion__icon">
          {icon || (
            <ChevronDownIcon
              className={cn(
                'bear-w-5 bear-h-5 bear-text-gray-500 dark:bear-text-gray-400 bear-transition-transform bear-duration-200',
                isOpen && 'bear-rotate-180'
              )}
            />
          )}
        </Box>
      </button>
      <Box
        className={cn(
          'Bear-Accordion__content-wrapper',
          'bear-overflow-hidden bear-transition-all bear-duration-200',
          isOpen ? 'Bear-Accordion__content-wrapper--open bear-max-h-96' : 'bear-max-h-0'
        )}
      >
        <Box className="Bear-Accordion__content bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-300 bear-bg-gray-50 dark:bear-bg-zinc-800/50">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
