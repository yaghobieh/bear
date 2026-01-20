import { useState, useCallback } from 'react';

interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
}

/**
 * Hook for managing open/close state (modals, dropdowns, etc.)
 * 
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDisclosure();
 * 
 * return (
 *   <>
 *     <Button onClick={open}>Open Modal</Button>
 *     <Modal isOpen={isOpen} onClose={close}>
 *       Content
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const useDisclosure = (defaultIsOpen = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
};

