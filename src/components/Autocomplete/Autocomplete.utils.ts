import type { AutocompleteOption } from './Autocomplete.types';

export const defaultFilter = (options: AutocompleteOption[], inputValue: string) => {
  const lower = inputValue.toLowerCase();
  return options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(lower) ||
      opt.value.toLowerCase().includes(lower) ||
      opt.description?.toLowerCase().includes(lower)
  );
};
