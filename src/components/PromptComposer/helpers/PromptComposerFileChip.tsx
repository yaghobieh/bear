import { Chip } from '../../Chip';
import type { PromptComposerFileChipProps } from '../PromptComposer.types';

export const PromptComposerFileChip = (props: PromptComposerFileChipProps) => {
  const { file, disabled, onRemove } = props;

  return (
    <Chip
      size="sm"
      variant="soft"
      disabled={disabled}
      onDelete={onRemove ? () => onRemove(file) : undefined}
    >
      {file.name}
    </Chip>
  );
};
