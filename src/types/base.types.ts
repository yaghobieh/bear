export interface BearBaseProps {
  id?: string;
  testId?: string;
}

export type WithBearBaseProps<T> = T & BearBaseProps;
