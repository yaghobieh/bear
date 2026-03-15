import type { MentionOption } from './MentionsInput.types';

export const defaultFilter = (options: MentionOption[], query: string) => {
  const lower = query.toLowerCase();
  return options.filter(
    (opt) =>
      opt.value.toLowerCase().includes(lower) || String(opt.label).toLowerCase().includes(lower)
  );
};
