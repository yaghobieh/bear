export interface ModelSelectOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ModelSelectProps {
  id?: string;
  testId?: string;
  models: ModelSelectOption[];
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
