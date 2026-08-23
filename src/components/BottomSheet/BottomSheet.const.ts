import { SIZE_LG, SIZE_MD, SIZE_SM } from '@const';
import type { BottomSheetSize } from './BottomSheet.types';

export const BOTTOM_SHEET_SIZE_CLASSES: Record<BottomSheetSize, string> = {
  [SIZE_SM]: 'bear-max-h-[40%]',
  [SIZE_MD]: 'bear-max-h-[60%]',
  [SIZE_LG]: 'bear-max-h-[80%]',
  full: 'bear-max-h-[95%]',
};
