import { FC, useState, useRef, useEffect } from 'react';
import { CollapsibleProps } from './Collapsible.types';
import { cn } from '@utils';

export const Collapsible: FC<CollapsibleProps> = ({
  children,
  trigger,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  animationDuration = 200,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight);
      const timer = setTimeout(() => setHeight(undefined), animationDuration);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current?.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isOpen, animationDuration]);

  const handleToggle = () => {
    if (disabled) return;
    const newOpen = !isOpen;
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <div className={className}>
      <div
        onClick={handleToggle}
        className={cn(
          'bear-cursor-pointer',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          triggerClassName
        )}
      >
        {trigger}
      </div>
      <div
        ref={contentRef}
        className={cn('bear-overflow-hidden bear-transition-all', contentClassName)}
        style={{
          height: height !== undefined ? height : 'auto',
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

