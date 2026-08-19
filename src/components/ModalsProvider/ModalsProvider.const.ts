import type { BearVariant } from '../../types';
import type { FlexGap, FlexJustify } from '../Flex/Flex.types';
import type { ModalSize } from '../Modal/Modal.types';
import type { TypographyVariant } from '../Typography/Typography.types';
import type { ModalsTranslations } from './ModalsProvider.types';

export const MODALS_ROOT_CLASS = 'Bear-ModalsProvider';
export const MODALS_HOST_CLASS = 'Bear-ModalsProvider__host';
export const MODALS_HOST_CLASSNAME = `${MODALS_ROOT_CLASS} ${MODALS_HOST_CLASS}`;
export const MODALS_STACK_ITEM_CLASS = 'Bear-ModalsProvider__item';
export const MODALS_CONFIRM_BODY_CLASS = 'Bear-ModalsProvider__confirm-body';
export const MODALS_CONFIRM_FOOTER_CLASS = 'Bear-ModalsProvider__confirm-footer';
export const MODALS_FOOTER_JUSTIFY: FlexJustify = 'end';
export const MODALS_FOOTER_GAP: FlexGap = 3;
export const MODALS_DESCRIPTION_VARIANT: TypographyVariant = 'body2';
export const MODALS_CANCEL_VARIANT: BearVariant = 'ghost';
export const MODALS_ALWAYS_OPEN = true;
export const MODALS_NESTED_LOCK_BODY_SCROLL = false;
export const MODALS_STACKED_LAYER_CAN_CLOSE = false;

export const MODALS_KIND_MODAL = 'modal' as const;
export const MODALS_KIND_CONFIRM = 'confirm' as const;

export const MODALS_ID_COMPONENT = 'ModalsProvider';
export const MODALS_OPEN_ID_COMPONENT = 'Modal';
export const MODALS_CONFIRM_ID_COMPONENT = 'Modal';

export const MODALS_STACK_EMPTY = 0;
export const MODALS_TOP_OFFSET = 1;
export const MODALS_BASE_Z_INDEX = 11000;
export const MODALS_Z_INDEX_STEP = 10;

export const MODALS_DEFAULT_SIZE: ModalSize = 'md';
export const MODALS_DEFAULT_SHOW_CLOSE = true;
export const MODALS_DEFAULT_CLOSE_ON_BACKDROP = true;
export const MODALS_DEFAULT_CLOSE_ON_ESCAPE = true;
export const MODALS_DEFAULT_CONFIRM_VARIANT: BearVariant = 'danger';
export const MODALS_CONFIRM_ACCEPTED = true;
export const MODALS_CONFIRM_REJECTED = false;
export const MODALS_LOCK_BODY_OVERFLOW = 'hidden';
export const MODALS_UNLOCK_BODY_OVERFLOW = '';

export const MODALS_DEFAULT_TRANSLATIONS: ModalsTranslations = {
  confirm: 'Confirm',
  cancel: 'Cancel',
};

export const MODALS_MISSING_PROVIDER_ERROR =
  'useModals must be used within a ModalsProvider';

export const MODALS_NULL_LOADING_ID = null;
