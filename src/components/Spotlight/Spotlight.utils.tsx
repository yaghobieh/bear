import type { SpotlightAction } from './Spotlight.types';

export const matchAction = (action: SpotlightAction, query: string): boolean => {
  const q = query.toLowerCase();
  if (action.label.toLowerCase().includes(q)) return true;
  if (action.description?.toLowerCase().includes(q)) return true;
  if (action.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
};

export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="Bear-Spotlight__highlight bear-bg-yellow-200 dark:bear-bg-yellow-800 bear-text-inherit bear-rounded-sm bear-px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
};
