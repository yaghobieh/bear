export const getSideClasses = (side: string, align: string): string => {
  const baseClasses: Record<string, string> = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignClasses: Record<string, Record<string, string>> = {
    top: { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' },
    bottom: { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' },
    left: { start: 'top-0', center: 'top-1/2 -translate-y-1/2', end: 'bottom-0' },
    right: { start: 'top-0', center: 'top-1/2 -translate-y-1/2', end: 'bottom-0' },
  };

  return `${baseClasses[side]} ${alignClasses[side][align]}`;
};

export const getArrowClasses = (side: string): string => {
  const arrowClasses: Record<string, string> = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
    left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45',
    right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
  };
  return arrowClasses[side];
};

