import { TYPE_STRING, UNIT_PX, ZERO } from '@const';
import type { ResizableTextareaProps } from './ResizableTextarea.types';

const isTextValue = (value: unknown): value is string => {
  return typeof value === TYPE_STRING;
};

export const getTextareaLength = (props: ResizableTextareaProps): number => {
  const { value, defaultValue } = props;
  if (isTextValue(value)) {
    return value.length;
  }
  if (isTextValue(defaultValue)) {
    return defaultValue.length;
  }
  return ZERO;
};

export const applyTextareaHeight = (
  element: HTMLTextAreaElement | null,
  height: number,
  minHeight: number,
  maxHeight: number,
  resizable: boolean
) => {
  if (!element) {
    return;
  }
  if (resizable) {
    element.style.minHeight = `${minHeight}${UNIT_PX}`;
    element.style.height = `${height}${UNIT_PX}`;
  }
  if (maxHeight > ZERO) {
    element.style.maxHeight = `${maxHeight}${UNIT_PX}`;
  }
};
