import { COMPONENT_NAME_MODEL_SELECT } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Select } from '../Select';
import { MODEL_SELECT_DEFAULT_PLACEHOLDER } from './ModelSelect.const';
import type { ModelSelectProps } from './ModelSelect.types';

export const ModelSelect = (props: ModelSelectProps) => {
  const {
    id,
    testId,
    models,
    value,
    onChange,
    label,
    placeholder = MODEL_SELECT_DEFAULT_PLACEHOLDER,
    disabled,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_MODEL_SELECT);
  const domId = resolveBearId(id, generatedId);
  const options = models.map((model) => ({
    value: model.id,
    label: model.label,
    disabled: model.disabled,
  }));

  return (
    <Box id={domId} data-testid={testId} className={cn('Bear-ModelSelect', className)}>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        size="sm"
      />
    </Box>
  );
};
