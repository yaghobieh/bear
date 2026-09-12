export const resolveAiChatSuggestionLabel = (
  suggestions: { id: string; label: string }[],
  id: string
) => suggestions.find((item) => item.id === id)?.label ?? id;
