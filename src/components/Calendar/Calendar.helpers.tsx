import { FC } from 'react';

interface HeaderLabelProps {
  month: string;
  year: number;
}

/**
 * Default header label render function
 */
export const DefaultHeaderLabel: FC<HeaderLabelProps> = ({ month, year }) => (
  <span className="Bear-Calendar__header-label bear-font-semibold bear-text-sm bear-select-none bear-text-zinc-900 dark:bear-text-zinc-100">
    {month} {year}
  </span>
);

