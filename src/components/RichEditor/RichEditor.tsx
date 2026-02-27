import { FC, useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@utils';
import type { RichEditorProps, ToolbarOption } from './RichEditor.types';
import {
  execCommand,
  queryCommandValue,
  getActiveFormats,
  insertLink,
  setTextColor,
  setHighlightColor,
  insertImage,
  fileToDataUrl,
} from './helpers';
import {
  RICH_EDITOR_MIN_HEIGHT,
  RICH_EDITOR_DEFAULT_TOOLBAR,
  RICH_EDITOR_MOBILE_TOOLBAR,
  RICH_EDITOR_MOBILE_MORE_ITEMS,
  RICH_EDITOR_MOBILE_BREAKPOINT,
  RICH_EDITOR_ROOT_CLASSES,
  RICH_EDITOR_TOOLBAR_CLASSES,
  RICH_EDITOR_CONTENT_CLASSES,
  RICH_EDITOR_DIVIDER_CLASSES,
  RICH_EDITOR_BUTTON_CONFIG,
  RICH_EDITOR_HEADING_OPTIONS,
  RICH_EDITOR_CONTENT_STYLES,
} from './RichEditor.const';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ToolbarButton, ToolbarDropdown, ToolbarColorPicker, ToolbarMore } from './components';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListBulletIcon,
  ListNumberedIcon,
  QuoteIcon,
  CodeIcon,
  InsertLinkIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  InsertPhotoIcon,
  IndentIncreaseIcon,
  IndentDecreaseIcon,
  FormatClearIcon,
  TableIcon,
  TextIcon,
} from '../Icon/icons/editor';

const MAX_RECENT_COLORS = 6;

/**
 * RichEditor - WYSIWYG rich text editor with formatting toolbar
 * 
 * @example
 * ```tsx
 * const [value, setValue] = useState('<p>Start editing...</p>');
 * 
 * <RichEditor
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Start typing..."
 * />
 * ```
 */
export const RichEditor: FC<RichEditorProps> = (props) => {
  const {
    value,
    defaultValue = '',
    onChange,
    placeholder = 'Start typing...',
    disabled = false,
    readOnly = false,
    minHeight = RICH_EDITOR_MIN_HEIGHT,
    maxHeight,
    toolbar = RICH_EDITOR_DEFAULT_TOOLBAR,
    className = '',
    testId,
    id,
    allowImagePaste = true,
    showCharCount = false,
    charCountMax,
    ...rest
  } = props;

  const editorRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(`(max-width: ${RICH_EDITOR_MOBILE_BREAKPOINT}px)`);
  const activeToolbar = isMobile ? RICH_EDITOR_MOBILE_TOOLBAR : toolbar;
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentBlock, setCurrentBlock] = useState<string>('p');
  const [charCount, setCharCount] = useState(0);
  const [textColorValue, setTextColorValue] = useState<string>('#000000');
  const [highlightColorValue, setHighlightColorValue] = useState<string>('#fef08a');
  const [recentTextColors, setRecentTextColors] = useState<string[]>([]);
  const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);

  // Inject styles for content
  useEffect(() => {
    const styleId = 'bear-rich-editor-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = RICH_EDITOR_CONTENT_STYLES;
      document.head.appendChild(style);
    }
  }, []);

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
    setActiveFormats(getActiveFormats());
    
    // Get current block format
    const block = queryCommandValue('formatBlock');
    if (block) {
      setCurrentBlock(block.toLowerCase().replace(/[<>]/g, ''));
    }
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      if (onChange) onChange(editorRef.current.innerHTML);
      if (showCharCount) setCharCount(editorRef.current.textContent?.length ?? 0);
    }
    updateActiveFormats();
  }, [onChange, updateActiveFormats, showCharCount]);

  const handleFormat = useCallback((format: ToolbarOption) => {
    if (disabled || readOnly) return;

    editorRef.current?.focus();

    const config = RICH_EDITOR_BUTTON_CONFIG[format as keyof typeof RICH_EDITOR_BUTTON_CONFIG];
    if (!config) return;

    const configValue = 'value' in config ? config.value : undefined;
    if (configValue) {
      execCommand(config.command, configValue);
    } else {
      execCommand(config.command);
    }

    updateActiveFormats();
    handleInput();
  }, [disabled, readOnly, updateActiveFormats, handleInput]);

  const handleHeadingChange = useCallback((value: string) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
    execCommand('formatBlock', value);
    setCurrentBlock(value);
    handleInput();
  }, [disabled, readOnly, handleInput]);

  const handleLink = useCallback(() => {
    if (disabled || readOnly) return;
    
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().length > 0;
    
    const url = prompt('Enter URL:', hasSelection ? '' : 'https://');
    if (url) {
      editorRef.current?.focus();
      insertLink(url);
      handleInput();
    }
  }, [disabled, readOnly, handleInput]);

  const addToRecentColors = useCallback((color: string, type: 'text' | 'highlight') => {
    if (!color) return;
    
    const setter = type === 'text' ? setRecentTextColors : setRecentHighlightColors;
    setter((prev) => {
      const filtered = prev.filter((c) => c !== color);
      return [color, ...filtered].slice(0, MAX_RECENT_COLORS);
    });
  }, []);

  const handleTextColor = useCallback((color: string) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
    setTextColor(color);
    setTextColorValue(color);
    addToRecentColors(color, 'text');
    handleInput();
  }, [disabled, readOnly, handleInput, addToRecentColors]);

  const handleHighlightColor = useCallback((color: string) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
    setHighlightColor(color);
    setHighlightColorValue(color);
    addToRecentColors(color, 'highlight');
    handleInput();
  }, [disabled, readOnly, handleInput, addToRecentColors]);

  const handleApplyLastTextColor = useCallback((color: string) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
    setTextColor(color);
    handleInput();
  }, [disabled, readOnly, handleInput]);

  const handleApplyLastHighlightColor = useCallback((color: string) => {
    if (disabled || readOnly) return;
    editorRef.current?.focus();
    setHighlightColor(color);
    handleInput();
  }, [disabled, readOnly, handleInput]);

  const handlePaste = useCallback(async (event: React.ClipboardEvent) => {
    if (!allowImagePaste) return;

    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const dataUrl = await fileToDataUrl(file);
          insertImage(dataUrl);
          handleInput();
        }
        return;
      }
    }
  }, [allowImagePaste, handleInput]);

  const handleImageUpload = useCallback(() => {
    if (disabled || readOnly) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const dataUrl = await fileToDataUrl(file);
        editorRef.current?.focus();
        insertImage(dataUrl);
        handleInput();
      }
    };
    input.click();
  }, [disabled, readOnly, handleInput]);

  const icons: Record<string, JSX.Element> = {
    bold: <BoldIcon size={16} />,
    italic: <ItalicIcon size={16} />,
    underline: <UnderlineIcon size={16} />,
    strikethrough: <StrikethroughIcon size={16} />,
    heading1: <Heading1Icon size={16} />,
    heading2: <Heading2Icon size={16} />,
    heading3: <Heading3Icon size={16} />,
    bulletList: <ListBulletIcon size={16} />,
    orderedList: <ListNumberedIcon size={16} />,
    blockquote: <QuoteIcon size={16} />,
    code: <CodeIcon size={16} />,
    link: <InsertLinkIcon size={16} />,
    alignLeft: <AlignLeftIcon size={16} />,
    alignCenter: <AlignCenterIcon size={16} />,
    alignRight: <AlignRightIcon size={16} />,
    alignJustify: <AlignJustifyIcon size={16} />,
    image: <InsertPhotoIcon size={16} />,
    indent: <IndentIncreaseIcon size={16} />,
    outdent: <IndentDecreaseIcon size={16} />,
    clearFormat: <FormatClearIcon size={16} />,
    table: <TableIcon size={16} />,
  };

  const renderToolbarItem = (item: ToolbarOption, index: number) => {
    if (item === 'divider') {
      return <div key={`divider-${index}`} className={cn('Bear-RichEditor__divider', RICH_EDITOR_DIVIDER_CLASSES)} />;
    }

    if (item === 'headingDropdown') {
      return (
        <ToolbarDropdown
          key="heading-dropdown"
          options={RICH_EDITOR_HEADING_OPTIONS}
          value={currentBlock}
          onChange={handleHeadingChange}
          title="Text Style"
          disabled={disabled || readOnly}
          icon={<TextIcon size={16} />}
        />
      );
    }

    if (item === 'textColor') {
      return (
        <ToolbarColorPicker
          key="text-color"
          value={textColorValue}
          onChange={handleTextColor}
          title="Text Color"
          disabled={disabled || readOnly}
          type="text"
          recentColors={recentTextColors}
          onApplyLast={handleApplyLastTextColor}
        />
      );
    }

    if (item === 'highlightColor') {
      return (
        <ToolbarColorPicker
          key="highlight-color"
          value={highlightColorValue}
          onChange={handleHighlightColor}
          title="Highlight Color"
          disabled={disabled || readOnly}
          type="highlight"
          recentColors={recentHighlightColors}
          onApplyLast={handleApplyLastHighlightColor}
        />
      );
    }

    if (item === 'link') {
      return (
        <ToolbarButton
          key="link"
          icon={<InsertLinkIcon size={16} />}
          title="Insert Link"
          onClick={handleLink}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'image') {
      return (
        <ToolbarButton
          key="image"
          icon={<InsertPhotoIcon size={16} />}
          title="Insert Image"
          onClick={handleImageUpload}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'alignLeft') {
      return (
        <ToolbarButton
          key="alignLeft"
          icon={<AlignLeftIcon size={16} />}
          title="Align Left"
          onClick={() => { editorRef.current?.focus(); execCommand('justifyLeft'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'alignCenter') {
      return (
        <ToolbarButton
          key="alignCenter"
          icon={<AlignCenterIcon size={16} />}
          title="Align Center"
          onClick={() => { editorRef.current?.focus(); execCommand('justifyCenter'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'alignRight') {
      return (
        <ToolbarButton
          key="alignRight"
          icon={<AlignRightIcon size={16} />}
          title="Align Right"
          onClick={() => { editorRef.current?.focus(); execCommand('justifyRight'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'alignJustify') {
      return (
        <ToolbarButton
          key="alignJustify"
          icon={<AlignJustifyIcon size={16} />}
          title="Justify"
          onClick={() => { editorRef.current?.focus(); execCommand('justifyFull'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'indent') {
      return (
        <ToolbarButton
          key="indent"
          icon={<IndentIncreaseIcon size={16} />}
          title="Increase Indent"
          onClick={() => { editorRef.current?.focus(); execCommand('indent'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'outdent') {
      return (
        <ToolbarButton
          key="outdent"
          icon={<IndentDecreaseIcon size={16} />}
          title="Decrease Indent"
          onClick={() => { editorRef.current?.focus(); execCommand('outdent'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'clearFormat') {
      return (
        <ToolbarButton
          key="clearFormat"
          icon={<FormatClearIcon size={16} />}
          title="Clear Formatting"
          onClick={() => { editorRef.current?.focus(); execCommand('removeFormat'); handleInput(); }}
          disabled={disabled || readOnly}
        />
      );
    }

    if (item === 'more') {
      const moreItems: ToolbarOption[] = isMobile ? RICH_EDITOR_MOBILE_MORE_ITEMS : [
        'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
        'indent', 'outdent', 'blockquote', 'code', 'clearFormat',
      ];
      return (
        <ToolbarMore key="more" disabled={disabled || readOnly} isMobile={isMobile}>
          {moreItems.map((moreItem, idx) => renderToolbarItem(moreItem, idx + 1000))}
        </ToolbarMore>
      );
    }

    const config = RICH_EDITOR_BUTTON_CONFIG[item as keyof typeof RICH_EDITOR_BUTTON_CONFIG];
    const icon = icons[item];
    if (!config || !icon) return null;

    return (
      <ToolbarButton
        key={item}
        icon={icon}
        title={config.title}
        active={activeFormats.has(item)}
        onClick={() => handleFormat(item)}
        disabled={disabled || readOnly}
      />
    );
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={cn(
        'Bear-RichEditor',
        RICH_EDITOR_ROOT_CLASSES,
        disabled && 'Bear-RichEditor--disabled',
        readOnly && 'Bear-RichEditor--readonly',
        className
      )}
      {...rest}
    >
      {activeToolbar.length > 0 && (
        <div className={cn('Bear-RichEditor__toolbar', RICH_EDITOR_TOOLBAR_CLASSES)}>
          {activeToolbar.map((item, index) => renderToolbarItem(item, index))}
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onSelect={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className={cn(
          'Bear-RichEditor__content',
          RICH_EDITOR_CONTENT_CLASSES,
          '[&:empty]:before:bear-content-[attr(data-placeholder)] [&:empty]:before:bear-text-gray-400 [&:empty]:before:bear-pointer-events-none',
          disabled && 'Bear-RichEditor__content--disabled bear-opacity-50 bear-cursor-not-allowed'
        )}
        style={{
          minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
          maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
          overflowY: maxHeight ? 'auto' : undefined,
        }}
      />

      {showCharCount && charCountMax != null && (
        <div
          className={cn(
            'Bear-RichEditor__char-count bear-text-xs bear-tabular-nums bear-px-3 bear-py-1.5 bear-text-right bear-border-t bear-border-gray-200 dark:bear-border-gray-700',
            charCount > charCountMax ? 'bear-text-red-500' : 'bear-text-gray-400 dark:bear-text-gray-500'
          )}
        >
          {charCount}/{charCountMax}
        </div>
      )}
    </div>
  );
};

export default RichEditor;
