import { FC, useRef, useState, useCallback, useEffect } from 'react';
import { RichEditorProps, ToolbarButtonProps, ToolbarOption } from './RichEditor.types';
import { DEFAULT_TOOLBAR, execCommand, queryCommandState } from './RichEditor.utils';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  BulletListIcon,
  OrderedListIcon,
  BlockquoteIcon,
  CodeIcon,
  LinkIcon,
} from './RichEditor.icons';

const ToolbarButton: FC<ToolbarButtonProps> = ({ icon, title, active, onClick, disabled }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`
      p-1.5 rounded transition-colors
      ${active 
        ? 'bg-pink-500 text-white' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon}
  </button>
);

export const RichEditor: FC<RichEditorProps> = ({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  readOnly = false,
  minHeight = 150,
  maxHeight,
  toolbar = DEFAULT_TOOLBAR as ToolbarOption[],
  className = '',
  ...props
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && defaultValue && !value) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, []);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    if (queryCommandState('bold')) formats.add('bold');
    if (queryCommandState('italic')) formats.add('italic');
    if (queryCommandState('underline')) formats.add('underline');
    if (queryCommandState('strikeThrough')) formats.add('strikethrough');
    if (queryCommandState('insertUnorderedList')) formats.add('bulletList');
    if (queryCommandState('insertOrderedList')) formats.add('orderedList');
    setActiveFormats(formats);
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const handleFormat = useCallback((format: ToolbarOption) => {
    if (disabled || readOnly) return;

    editorRef.current?.focus();

    switch (format) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'strikethrough':
        execCommand('strikeThrough');
        break;
      case 'heading1':
        execCommand('formatBlock', '<h1>');
        break;
      case 'heading2':
        execCommand('formatBlock', '<h2>');
        break;
      case 'heading3':
        execCommand('formatBlock', '<h3>');
        break;
      case 'bulletList':
        execCommand('insertUnorderedList');
        break;
      case 'orderedList':
        execCommand('insertOrderedList');
        break;
      case 'blockquote':
        execCommand('formatBlock', '<blockquote>');
        break;
      case 'code':
        execCommand('formatBlock', '<pre>');
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
        break;
    }

    updateActiveFormats();
    handleInput();
  }, [disabled, readOnly, updateActiveFormats, handleInput]);

  const renderToolbarItem = (item: ToolbarOption, index: number) => {
    if (item === 'divider') {
      return <div key={`divider-${index}`} className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />;
    }

    const icons: Record<string, { icon: JSX.Element; title: string }> = {
      bold: { icon: <BoldIcon />, title: 'Bold' },
      italic: { icon: <ItalicIcon />, title: 'Italic' },
      underline: { icon: <UnderlineIcon />, title: 'Underline' },
      strikethrough: { icon: <StrikethroughIcon />, title: 'Strikethrough' },
      heading1: { icon: <Heading1Icon />, title: 'Heading 1' },
      heading2: { icon: <Heading2Icon />, title: 'Heading 2' },
      bulletList: { icon: <BulletListIcon />, title: 'Bullet List' },
      orderedList: { icon: <OrderedListIcon />, title: 'Numbered List' },
      blockquote: { icon: <BlockquoteIcon />, title: 'Quote' },
      code: { icon: <CodeIcon />, title: 'Code Block' },
      link: { icon: <LinkIcon />, title: 'Insert Link' },
    };

    const config = icons[item];
    if (!config) return null;

    return (
      <ToolbarButton
        key={item}
        icon={config.icon}
        title={config.title}
        active={activeFormats.has(item)}
        onClick={() => handleFormat(item)}
        disabled={disabled || readOnly}
      />
    );
  };

  return (
    <div
      className={`bear-rich-editor rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-900 ${className}`}
      {...props}
    >
      {toolbar.length > 0 && (
        <div className="bear-rich-editor-toolbar flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {toolbar.map((item, index) => renderToolbarItem(item, index))}
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onSelect={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        data-placeholder={placeholder}
        className={`
          bear-rich-editor-content p-3 outline-none prose prose-sm dark:prose-invert max-w-none
          text-gray-900 dark:text-white
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
          maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
          overflowY: maxHeight ? 'auto' : undefined,
        }}
      />
    </div>
  );
};

export default RichEditor;

