import { FC, useRef, useCallback, useState } from 'react';
import { cn } from '@utils';
import { BearIcons } from '../Icon';
import { Popover } from '../Popover';
import { Input } from '../Input';
import type { ImageAnnotationProps, Annotation } from './ImageAnnotation.types';
import { DEFAULT_PIN_COLOR, DEFAULT_PIN_SIZE, PIN_ICON_RATIO } from './ImageAnnotation.const';

let nextId = 1;

function renderEditPopover(
  editText: string,
  setEditText: (v: string) => void,
  saveEdit: () => void,
  cancelEdit: () => void,
) {
  return (
    <div className="Bear-ImageAnnotation__edit min-w-[160px]">
      <Input
        autoFocus
        size="sm"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit(); }}
        placeholder="Add note..."
      />
    </div>
  );
}

function renderLabelPopover(
  ann: Annotation,
  editable: boolean,
  deleteAnnotation: (id: string) => void,
  customContent?: React.ReactNode,
) {
  return (
    <div className="Bear-ImageAnnotation__label text-xs text-gray-700 dark:text-gray-200 whitespace-nowrap flex items-center gap-1">
      {customContent ?? ann.text}
      {editable && (
        <button
          type="button"
          className="text-red-400 hover:text-red-600 ml-1"
          onClick={(e) => { e.stopPropagation(); deleteAnnotation(ann.id); }}
        >
          <BearIcons.XIcon size={12} />
        </button>
      )}
    </div>
  );
}

export const ImageAnnotation: FC<ImageAnnotationProps> = ({
  src,
  alt = '',
  annotations,
  onChange,
  editable = true,
  pinColor = DEFAULT_PIN_COLOR,
  pinSize = DEFAULT_PIN_SIZE,
  renderPopover,
  testId,
  className,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!editable || !onChange || !containerRef.current) return;
      if ((e.target as HTMLElement).closest('.Bear-ImageAnnotation__pin')) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = `ann-${nextId++}`;
      const newAnn: Annotation = { id, x, y, text: '' };
      onChange([...annotations, newAnn]);
      setEditing(id);
      setEditText('');
    },
    [editable, onChange, annotations]
  );

  const saveEdit = useCallback(() => {
    if (!editing || !onChange) return;
    if (editText.trim()) {
      onChange(annotations.map((a) => (a.id === editing ? { ...a, text: editText } : a)));
    } else {
      onChange(annotations.filter((a) => a.id !== editing));
    }
    setEditing(null);
  }, [editing, editText, onChange, annotations]);

  const cancelEdit = useCallback(() => setEditing(null), []);

  const deleteAnnotation = useCallback(
    (id: string) => {
      onChange?.(annotations.filter((a) => a.id !== id));
      if (editing === id) setEditing(null);
    },
    [onChange, annotations, editing]
  );

  return (
    <div
      ref={containerRef}
      className={cn('Bear-ImageAnnotation relative inline-block select-none', editable && 'cursor-crosshair', className)}
      onClick={handleClick}
      data-testid={testId}
      {...rest}
    >
      <img src={src} alt={alt} className="w-full h-auto block rounded-lg" draggable={false} />

      {annotations.map((ann) => {
        const isEditing = editing === ann.id;
        const hasLabel = Boolean(ann.text);
        const customPopoverContent = renderPopover?.(ann);

        const popoverContent = isEditing
          ? renderEditPopover(editText, setEditText, saveEdit, cancelEdit)
          : hasLabel
            ? renderLabelPopover(ann, editable, deleteAnnotation, customPopoverContent)
            : null;

        return (
          <div
            key={ann.id}
            className="Bear-ImageAnnotation__pin absolute transform -translate-x-1/2 -translate-y-full z-10"
            style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
          >
            <Popover
              content={popoverContent}
              trigger={isEditing ? 'click' : 'hover'}
              placement="top"
              open={isEditing || undefined}
              arrow={false}
            >
              <div
                className="Bear-ImageAnnotation__marker flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110"
                style={{ width: pinSize, height: pinSize, backgroundColor: ann.color ?? pinColor }}
              >
                <BearIcons.MapPinIcon size={pinSize * PIN_ICON_RATIO} className="text-white" />
              </div>
            </Popover>
          </div>
        );
      })}
    </div>
  );
};
