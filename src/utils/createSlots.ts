import { createContext, useContext, Children, isValidElement, createElement, FC, ReactNode } from 'react';

/**
 * Slot definition
 */
export interface SlotDefinition {
  /** Required slot */
  required?: boolean;
  /** Allow multiple children in this slot */
  multiple?: boolean;
}

/**
 * Slot component type
 */
export type SlotComponent<P = object> = FC<P & { children?: ReactNode }>;

/**
 * Context value for slot management
 */
export interface SlotContextValue {
  registerSlot: (name: string, content: ReactNode) => void;
  getSlot: (name: string) => ReactNode | null;
}

/**
 * Creates a composable slot-based component pattern
 *
 * @description
 * Allows building components with named sub-components (slots)
 * that can be composed in any order. Similar to Radix UI patterns.
 *
 * @example
 * ```tsx
 * const { Root, Slot, useSlots } = createSlots('Dialog', {
 *   trigger: {},
 *   title: {},
 *   content: { required: true },
 *   footer: {},
 * });
 *
 * // Create compound component
 * const Dialog = Object.assign(Root, {
 *   Trigger: Slot('trigger'),
 *   Title: Slot('title'),
 *   Content: Slot('content'),
 *   Footer: Slot('footer'),
 * });
 *
 * // Usage
 * <Dialog>
 *   <Dialog.Trigger>Open</Dialog.Trigger>
 *   <Dialog.Title>Hello</Dialog.Title>
 *   <Dialog.Content>Body</Dialog.Content>
 *   <Dialog.Footer>Actions</Dialog.Footer>
 * </Dialog>
 * ```
 */
export function createSlots<T extends Record<string, SlotDefinition>>(
  displayName: string,
  slots: T
) {
  type SlotName = keyof T & string;

  const SlotContext = createContext<SlotContextValue | null>(null);

  /**
   * Hook to access slot contents from within the Root component
   */
  function useSlots(): Record<SlotName, ReactNode | null> {
    const ctx = useContext(SlotContext);
    if (!ctx) {
      throw new Error(`useSlots must be used within ${displayName}`);
    }
    const result = {} as Record<SlotName, ReactNode | null>;
    for (const name of Object.keys(slots) as SlotName[]) {
      result[name] = ctx.getSlot(name);
    }
    return result;
  }

  // Internal marker for slot components
  const SLOT_MARKER = Symbol(`${displayName}Slot`);

  interface SlotProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    __slotName?: string;
    __slotMarker?: symbol;
  }

  /**
   * Creates a named slot component
   */
  function Slot(name: SlotName): FC<{ children?: ReactNode; className?: string; style?: React.CSSProperties }> {
    const SlotComp: FC<SlotProps> = ({ children, className, style }) => {
      return createElement('div', {
        className,
        style,
        'data-slot': name,
        children,
      });
    };
    SlotComp.displayName = `${displayName}.${String(name)}`;
    // Mark as a slot
    (SlotComp as any).__slotName = name;
    (SlotComp as any).__slotMarker = SLOT_MARKER;
    return SlotComp;
  }

  /**
   * Root container that collects and distributes slots
   */
  const Root: FC<{ children?: ReactNode; className?: string; style?: React.CSSProperties }> = ({
    children,
    className,
    style,
  }) => {
    const slotContents = new Map<string, ReactNode>();

    // Collect slot contents from children
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const type = child.type as any;
        if (type?.__slotMarker === SLOT_MARKER && type?.__slotName) {
          const name = type.__slotName as SlotName;
          if (slots[name]?.multiple) {
            const existing = slotContents.get(name as string);
            slotContents.set(
              name as string,
              existing
                ? createElement('fragment', null, existing, child)
                : child
            );
          } else {
            slotContents.set(name as string, child);
          }
        }
      }
    });

    const ctxValue: SlotContextValue = {
      registerSlot: (name, content) => slotContents.set(name as string, content),
      getSlot: (name) => slotContents.get(name as string) ?? null,
    };

    return createElement(
      SlotContext.Provider,
      { value: ctxValue },
      createElement('div', { className, style, 'data-component': displayName }, children)
    );
  };

  Root.displayName = displayName;

  return {
    Root,
    Slot,
    useSlots,
    SlotContext,
  };
}
