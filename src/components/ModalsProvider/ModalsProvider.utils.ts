import {
  MODALS_BASE_Z_INDEX,
  MODALS_KIND_CONFIRM,
  MODALS_KIND_MODAL,
  MODALS_STACK_EMPTY,
  MODALS_TOP_OFFSET,
  MODALS_Z_INDEX_STEP,
} from './ModalsProvider.const';
import type {
  ConfirmModalOptions,
  ModalStackConfirmEntry,
  ModalStackEntry,
  ModalStackModalEntry,
  OpenModalOptions,
} from './ModalsProvider.types';

export const createModalEntry = (id: string, options: OpenModalOptions): ModalStackModalEntry => ({
  kind: MODALS_KIND_MODAL,
  id,
  options,
});

export const createConfirmEntry = (
  id: string,
  options: ConfirmModalOptions,
): ModalStackConfirmEntry => ({
  kind: MODALS_KIND_CONFIRM,
  id,
  options,
});

export const isConfirmEntry = (entry: ModalStackEntry): entry is ModalStackConfirmEntry =>
  entry.kind === MODALS_KIND_CONFIRM;

export const resolveStackTargetId = (stack: ModalStackEntry[], id?: string): string | undefined => {
  if (id) {
    return id;
  }
  if (stack.length === MODALS_STACK_EMPTY) {
    return undefined;
  }
  return stack[stack.length - MODALS_TOP_OFFSET].id;
};

export const removeStackEntry = (stack: ModalStackEntry[], id: string): ModalStackEntry[] =>
  stack.filter((entry) => entry.id !== id);

export const resolveStackedZIndex = (index: number): number =>
  MODALS_BASE_Z_INDEX + index * MODALS_Z_INDEX_STEP;

export const isTopStackIndex = (index: number, stackLength: number): boolean =>
  index === stackLength - MODALS_TOP_OFFSET;
