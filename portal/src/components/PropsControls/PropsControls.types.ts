export type PropControlType = 'boolean' | 'string' | 'number' | 'select';

export interface PropControlOption {
  value: string | number | boolean;
  label: string;
}

export interface EditablePropConfig {
  type: PropControlType;
  default: string | number | boolean;
  options?: PropControlOption[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export type EditablePropsConfig = Record<string, EditablePropConfig>;

export type LiveProps = Record<string, string | number | boolean>;
