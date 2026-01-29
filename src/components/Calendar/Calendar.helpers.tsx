import { FC } from 'react';

interface HeaderLabelProps {
  month: string;
  year: number;
}

/**
 * Default header label render function
 */
export const DefaultHeaderLabel: FC<HeaderLabelProps> = ({ month, year }) => (
  <span className="font-semibold text-sm select-none">
    {month} {year}
  </span>
);

