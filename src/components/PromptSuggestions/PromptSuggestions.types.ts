export interface PromptSuggestionItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface PromptSuggestionsProps {
  id?: string;
  testId?: string;
  suggestions: PromptSuggestionItem[];
  onSelect?: (id: string) => void;
  className?: string;
}
