import { cn } from '@utils';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EMPTY_STRING,
  ONE_HUNDRED_FIFTY,
  PLACEHOLDER_START_TYPING,
  ZERO,
} from '@const';
import type { RichEditorProps } from './RichEditor.types';
import { RICH_EDITOR_DEFAULT_TOOLBAR } from './RichEditor.const';
import { useRichEditor } from './useRichEditor';
import { createToolbarItemRenderer } from './helpers/toolbarItemRender';

export const RichEditor = (props: RichEditorProps) => {
  const {
    value,
    defaultValue = EMPTY_STRING,
    onChange,
    placeholder = PLACEHOLDER_START_TYPING,
    disabled = BOOLEAN_FALSE,
    readOnly = BOOLEAN_FALSE,
    minHeight = ONE_HUNDRED_FIFTY,
    maxHeight,
    toolbar = RICH_EDITOR_DEFAULT_TOOLBAR,
    className = EMPTY_STRING,
    testId,
    allowImagePaste = BOOLEAN_TRUE,
    showCharCount = BOOLEAN_FALSE,
    charCountMax,
    ...rest
  } = props;

  const editor = useRichEditor({
    value,
    defaultValue,
    onChange,
    disabled,
    readOnly,
    toolbar,
    allowImagePaste,
    showCharCount,
    minHeight,
    maxHeight,
  });

  const renderToolbarItem = createToolbarItemRenderer({ ...editor, disabled, readOnly });

  return (
    <div
      data-testid={testId}
      className={cn(
        'Bear-RichEditor rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm',
        disabled && 'Bear-RichEditor--disabled',
        readOnly && 'Bear-RichEditor--readonly',
        className
      )}
      {...rest}
    >
      {editor.activeToolbar.length > ZERO && (
        <div className="Bear-RichEditor__toolbar flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 overflow-x-auto overflow-y-hidden">
          {editor.activeToolbar.map((item, index) => renderToolbarItem(item, index))}
        </div>
      )}

      <div
        ref={editor.editorRef}
        contentEditable={!disabled && !readOnly}
        onInput={editor.handleInput}
        onSelect={editor.updateActiveFormats}
        onKeyUp={editor.updateActiveFormats}
        onMouseUp={editor.updateActiveFormats}
        onPaste={editor.handlePaste}
        data-placeholder={placeholder}
        className={cn(
          'Bear-RichEditor__content p-4 outline-none max-w-none text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-900 min-h-[100px]',
          '[&:empty]:before:bear-content-[attr(data-placeholder)] [&:empty]:before:bear-text-gray-400 [&:empty]:before:bear-pointer-events-none',
          disabled && 'Bear-RichEditor__content--disabled bear-opacity-50 bear-cursor-not-allowed'
        )}
      />

      {showCharCount && charCountMax != null && (
        <div
          className={cn(
            'Bear-RichEditor__char-count bear-text-xs bear-tabular-nums bear-px-3 bear-py-1.5 bear-text-right bear-border-t bear-border-gray-200 dark:bear-border-gray-700',
            editor.charCount > charCountMax ? 'bear-text-red-500' : 'bear-text-gray-400 dark:bear-text-gray-500'
          )}
        >
          {editor.charCount}/{charCountMax}
        </div>
      )}
    </div>
  );
};
