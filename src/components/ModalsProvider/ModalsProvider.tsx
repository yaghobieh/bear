import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { generateBearId, resolveBearId, useBearId } from '@utils';
import { ModalsHost } from './components/ModalsHost';
import { ModalsContext } from './ModalsContext';
import {
  MODALS_CONFIRM_ACCEPTED,
  MODALS_CONFIRM_ID_COMPONENT,
  MODALS_CONFIRM_REJECTED,
  MODALS_DEFAULT_TRANSLATIONS,
  MODALS_ID_COMPONENT,
  MODALS_LOCK_BODY_OVERFLOW,
  MODALS_NULL_LOADING_ID,
  MODALS_OPEN_ID_COMPONENT,
  MODALS_STACK_EMPTY,
  MODALS_UNLOCK_BODY_OVERFLOW,
} from './ModalsProvider.const';
import type {
  ConfirmModalOptions,
  ModalStackEntry,
  ModalsContextValue,
  ModalsProviderProps,
  OpenModalOptions,
} from './ModalsProvider.types';
import {
  createConfirmEntry,
  createModalEntry,
  isConfirmEntry,
  removeStackEntry,
  resolveStackTargetId,
} from './ModalsProvider.utils';

export const ModalsProvider: FC<ModalsProviderProps> = (props) => {
  const { children, translations, id, testId } = props;
  const generatedId = useBearId(MODALS_ID_COMPONENT);
  const domId = resolveBearId(id, generatedId);
  const [stack, setStack] = useState<ModalStackEntry[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(MODALS_NULL_LOADING_ID);
  const stackRef = useRef<ModalStackEntry[]>([]);
  const resolversRef = useRef<Map<string, (value: boolean) => void>>(new Map());
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const labels = { ...MODALS_DEFAULT_TRANSLATIONS, ...translations };

  const commitStack = (next: ModalStackEntry[]) => {
    stackRef.current = next;
    setStack(next);
  };

  const captureFocus = () => {
    if (stackRef.current.length !== MODALS_STACK_EMPTY) {
      return;
    }
    const active = document.activeElement;
    lastFocusRef.current = active instanceof HTMLElement ? active : null;
  };

  const restoreFocus = () => {
    lastFocusRef.current?.focus();
    lastFocusRef.current = null;
  };

  const dismiss = (entryId: string) => {
    const entry = stackRef.current.find((item) => item.id === entryId);
    if (!entry) {
      return;
    }
    if (isConfirmEntry(entry)) {
      entry.options.onCancel?.();
      resolversRef.current.get(entryId)?.(MODALS_CONFIRM_REJECTED);
    } else {
      entry.options.onClose?.();
    }
    resolversRef.current.delete(entryId);
    const next = removeStackEntry(stackRef.current, entryId);
    commitStack(next);
    if (next.length === MODALS_STACK_EMPTY) {
      restoreFocus();
    }
  };

  const confirmEntry = (entryId: string) => {
    const entry = stackRef.current.find((item) => item.id === entryId);
    if (!entry || !isConfirmEntry(entry)) {
      return;
    }
    const finish = () => {
      resolversRef.current.get(entryId)?.(MODALS_CONFIRM_ACCEPTED);
      resolversRef.current.delete(entryId);
      const next = removeStackEntry(stackRef.current, entryId);
      commitStack(next);
      if (next.length === MODALS_STACK_EMPTY) {
        restoreFocus();
      }
    };
    if (!entry.options.onConfirm) {
      finish();
      return;
    }
    setLoadingId(entryId);
    Promise.resolve(entry.options.onConfirm())
      .then(() => {
        setLoadingId(MODALS_NULL_LOADING_ID);
        finish();
      })
      .catch(() => {
        setLoadingId(MODALS_NULL_LOADING_ID);
      });
  };

  const open = (options: OpenModalOptions): string => {
    captureFocus();
    const entryId = options.id ?? generateBearId(MODALS_OPEN_ID_COMPONENT);
    commitStack([...stackRef.current, createModalEntry(entryId, options)]);
    return entryId;
  };

  const confirm = (options: ConfirmModalOptions): Promise<boolean> =>
    new Promise((resolve) => {
      captureFocus();
      const entryId = options.id ?? generateBearId(MODALS_CONFIRM_ID_COMPONENT);
      resolversRef.current.set(entryId, resolve);
      commitStack([...stackRef.current, createConfirmEntry(entryId, options)]);
    });

  const close = (entryId?: string) => {
    const targetId = resolveStackTargetId(stackRef.current, entryId);
    if (!targetId) {
      return;
    }
    dismiss(targetId);
  };

  const closeAll = () => {
    stackRef.current.forEach((entry) => {
      if (isConfirmEntry(entry)) {
        entry.options.onCancel?.();
        resolversRef.current.get(entry.id)?.(MODALS_CONFIRM_REJECTED);
      } else {
        entry.options.onClose?.();
      }
      resolversRef.current.delete(entry.id);
    });
    commitStack([]);
    restoreFocus();
  };

  useEffect(() => {
    if (stack.length === MODALS_STACK_EMPTY) {
      document.body.style.overflow = MODALS_UNLOCK_BODY_OVERFLOW;
      return;
    }
    document.body.style.overflow = MODALS_LOCK_BODY_OVERFLOW;
    return () => {
      document.body.style.overflow = MODALS_UNLOCK_BODY_OVERFLOW;
    };
  }, [stack.length]);

  const contextValue: ModalsContextValue = {
    open,
    confirm,
    close,
    closeAll,
  };

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
      <ModalsHost
        id={domId}
        testId={testId}
        stack={stack}
        loadingId={loadingId}
        labels={labels}
        onDismiss={dismiss}
        onConfirm={confirmEntry}
      />
    </ModalsContext.Provider>
  );
};
