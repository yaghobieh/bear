import { COMPONENT_NAME_PROMPT_SUGGESTIONS } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Chip } from '../Chip';
import { Flex } from '../Flex';
import type { PromptSuggestionsProps } from './PromptSuggestions.types';

export const PromptSuggestions = (props: PromptSuggestionsProps) => {
  const { id, testId, suggestions, onSelect, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_PROMPT_SUGGESTIONS);
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex
      id={domId}
      testId={testId}
      className={cn('Bear-PromptSuggestions', className)}
      wrap="wrap"
      gap={2}
    >
      {suggestions.map((suggestion) => (
        <Chip
          key={suggestion.id}
          size="sm"
          variant="outlined"
          color="primary"
          disabled={suggestion.disabled}
          onClick={() => onSelect?.(suggestion.id)}
        >
          {suggestion.label}
        </Chip>
      ))}
    </Flex>
  );
};
