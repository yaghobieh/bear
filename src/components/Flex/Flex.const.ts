import type { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexWrap } from './Flex.types';

export const FLEX_DIRECTION_CLASSES: Record<FlexDirection, string> = {
  row: 'bear-flex-row',
  'row-reverse': 'bear-flex-row-reverse',
  column: 'bear-flex-col',
  'column-reverse': 'bear-flex-col-reverse',
};

export const FLEX_WRAP_CLASSES: Record<FlexWrap, string> = {
  nowrap: 'bear-flex-nowrap',
  wrap: 'bear-flex-wrap',
  'wrap-reverse': 'bear-flex-wrap-reverse',
};

export const FLEX_ALIGN_CLASSES: Record<FlexAlign, string> = {
  start: 'bear-items-start',
  center: 'bear-items-center',
  end: 'bear-items-end',
  stretch: 'bear-items-stretch',
  baseline: 'bear-items-baseline',
};

export const FLEX_JUSTIFY_CLASSES: Record<FlexJustify, string> = {
  start: 'bear-justify-start',
  center: 'bear-justify-center',
  end: 'bear-justify-end',
  between: 'bear-justify-between',
  around: 'bear-justify-around',
  evenly: 'bear-justify-evenly',
};

export const FLEX_GAP_CLASSES: Record<FlexGap, string> = {
  0: 'bear-gap-0',
  1: 'bear-gap-1',
  2: 'bear-gap-2',
  3: 'bear-gap-3',
  4: 'bear-gap-4',
  5: 'bear-gap-5',
  6: 'bear-gap-6',
  8: 'bear-gap-8',
  10: 'bear-gap-10',
  12: 'bear-gap-12',
  16: 'bear-gap-16',
};
