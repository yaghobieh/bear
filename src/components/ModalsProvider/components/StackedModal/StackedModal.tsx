import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { Flex } from '../../../Flex';
import { Modal } from '../../../Modal';
import { Typography } from '../../../Typography';
import {
  MODALS_ALWAYS_OPEN,
  MODALS_CANCEL_VARIANT,
  MODALS_CONFIRM_BODY_CLASS,
  MODALS_CONFIRM_FOOTER_CLASS,
  MODALS_DEFAULT_CLOSE_ON_BACKDROP,
  MODALS_DEFAULT_CLOSE_ON_ESCAPE,
  MODALS_DEFAULT_CONFIRM_VARIANT,
  MODALS_DEFAULT_SHOW_CLOSE,
  MODALS_DEFAULT_SIZE,
  MODALS_DESCRIPTION_VARIANT,
  MODALS_FOOTER_GAP,
  MODALS_FOOTER_JUSTIFY,
  MODALS_NESTED_LOCK_BODY_SCROLL,
  MODALS_STACK_ITEM_CLASS,
  MODALS_STACKED_LAYER_CAN_CLOSE,
} from '../../ModalsProvider.const';
import type { StackedModalProps } from '../../ModalsProvider.types';
import { isConfirmEntry, resolveStackedZIndex } from '../../ModalsProvider.utils';

export const StackedModal = (props: StackedModalProps) => {
  const { entry, index, isTop, loading, labels, onDismiss, onConfirm } = props;
  const closeOnBackdrop = isTop
    ? (entry.options.closeOnBackdrop ?? MODALS_DEFAULT_CLOSE_ON_BACKDROP)
    : MODALS_STACKED_LAYER_CAN_CLOSE;
  const closeOnEscape = isTop
    ? (entry.options.closeOnEscape ?? MODALS_DEFAULT_CLOSE_ON_ESCAPE)
    : MODALS_STACKED_LAYER_CAN_CLOSE;

  if (isConfirmEntry(entry)) {
    const confirmLabel = entry.options.confirmText ?? labels.confirm;
    const cancelLabel = entry.options.cancelText ?? labels.cancel;
    const confirmVariant = entry.options.confirmVariant ?? MODALS_DEFAULT_CONFIRM_VARIANT;

    return (
      <Modal
        isOpen={MODALS_ALWAYS_OPEN}
        id={entry.id}
        testId={entry.options.testId}
        title={entry.options.title}
        size={MODALS_DEFAULT_SIZE}
        className={entry.options.className}
        showCloseButton={MODALS_DEFAULT_SHOW_CLOSE}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockBodyScroll={MODALS_NESTED_LOCK_BODY_SCROLL}
        zIndex={resolveStackedZIndex(index)}
        onClose={() => onDismiss(entry.id)}
        footer={
          <Flex className={MODALS_CONFIRM_FOOTER_CLASS} justify={MODALS_FOOTER_JUSTIFY} gap={MODALS_FOOTER_GAP}>
            <Button variant={MODALS_CANCEL_VARIANT} onClick={() => onDismiss(entry.id)} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={() => onConfirm(entry.id)}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </Flex>
        }
      >
        {entry.options.description ? (
          <Typography variant={MODALS_DESCRIPTION_VARIANT} className={MODALS_CONFIRM_BODY_CLASS}>
            {entry.options.description}
          </Typography>
        ) : null}
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={MODALS_ALWAYS_OPEN}
      id={entry.id}
      testId={entry.options.testId}
      title={entry.options.title}
      size={entry.options.size ?? MODALS_DEFAULT_SIZE}
      footer={entry.options.footer}
      className={entry.options.className}
      showCloseButton={entry.options.showCloseButton ?? MODALS_DEFAULT_SHOW_CLOSE}
      closeOnBackdrop={closeOnBackdrop}
      closeOnEscape={closeOnEscape}
      lockBodyScroll={MODALS_NESTED_LOCK_BODY_SCROLL}
      zIndex={resolveStackedZIndex(index)}
      onClose={() => onDismiss(entry.id)}
    >
      <Box className={MODALS_STACK_ITEM_CLASS}>{entry.options.children}</Box>
    </Modal>
  );
};
