import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {
  BLOCK_PARAGRAPH,
  COLOR_BLACK,
  COLOR_HIGHLIGHT_YELLOW,
  COLOR_TYPE_HIGHLIGHT,
  COLOR_TYPE_TEXT,
  COMMAND_FORMAT_BLOCK,
  EMPTY_STRING,
  ONE_HUNDRED_FIFTY,
  SIX,
  TYPE_NUMBER,
  UNIT_PX,
  ZERO,
} from '@const';
import {
  execCommand,
  fileToDataUrl,
  getActiveFormats,
  insertImage,
  insertLink,
  queryCommandValue,
  setHighlightColor,
  setTextColor,
} from '../helpers';
import {
  IMAGE_MIME_PREFIX,
  INPUT_ACCEPT_IMAGE,
  INPUT_TYPE_FILE,
  PROMPT_ENTER_URL,
  RICH_EDITOR_BUTTON_CONFIG,
  RICH_EDITOR_MOBILE_BREAKPOINT,
  RICH_EDITOR_MOBILE_TOOLBAR,
  URL_HTTPS_PREFIX,
} from '../RichEditor.const';
import type { ToolbarOption } from '../RichEditor.types';
import type { UseRichEditorOptions, UseRichEditorReturn } from './useRichEditor.types';

const applyEditorSize = (
  element: HTMLDivElement | null,
  minHeight?: string | number,
  maxHeight?: string | number
) => {
  if (!element) {
    return;
  }
  const resolvedMin = minHeight ?? ONE_HUNDRED_FIFTY;
  element.style.minHeight =
    typeof resolvedMin === TYPE_NUMBER ? `${resolvedMin}${UNIT_PX}` : String(resolvedMin);
  if (maxHeight) {
    element.style.maxHeight =
      typeof maxHeight === TYPE_NUMBER ? `${maxHeight}${UNIT_PX}` : String(maxHeight);
    element.style.overflowY = 'auto';
  }
};

export const useRichEditor = (options: UseRichEditorOptions): UseRichEditorReturn => {
  const {
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
  } = options;

  const editorRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(`(max-width: ${RICH_EDITOR_MOBILE_BREAKPOINT}${UNIT_PX})`);
  const activeToolbar = isMobile ? RICH_EDITOR_MOBILE_TOOLBAR : toolbar;
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentBlock, setCurrentBlock] = useState(BLOCK_PARAGRAPH);
  const [charCount, setCharCount] = useState(ZERO);
  const [textColorValue, setTextColorValue] = useState(COLOR_BLACK);
  const [highlightColorValue, setHighlightColorValue] = useState(COLOR_HIGHLIGHT_YELLOW);
  const [recentTextColors, setRecentTextColors] = useState<string[]>([]);
  const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);

  applyEditorSize(editorRef.current, minHeight, maxHeight);

  useEffect(() => {
    if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && defaultValue && !value) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, []);

  const updateActiveFormats = () => {
    setActiveFormats(getActiveFormats());
    const block = queryCommandValue(COMMAND_FORMAT_BLOCK);
    if (block) {
      setCurrentBlock(block.toLowerCase().replace(/[<>]/g, EMPTY_STRING));
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML);
      if (showCharCount) {
        setCharCount(editorRef.current.textContent?.length ?? ZERO);
      }
    }
    updateActiveFormats();
  };

  const handleFormat = (format: ToolbarOption) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    const config = RICH_EDITOR_BUTTON_CONFIG[format as keyof typeof RICH_EDITOR_BUTTON_CONFIG];
    if (!config) {
      return;
    }
    const configValue = 'value' in config ? config.value : undefined;
    execCommand(config.command, configValue);
    updateActiveFormats();
    handleInput();
  };

  const handleHeadingChange = (nextValue: string) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    execCommand(COMMAND_FORMAT_BLOCK, nextValue);
    setCurrentBlock(nextValue);
    handleInput();
  };

  const handleLink = () => {
    if (disabled || readOnly) {
      return;
    }
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString().length > ZERO;
    const url = prompt(PROMPT_ENTER_URL, hasSelection ? EMPTY_STRING : URL_HTTPS_PREFIX);
    if (url) {
      editorRef.current?.focus();
      insertLink(url);
      handleInput();
    }
  };

  const addToRecentColors = (color: string, type: typeof COLOR_TYPE_TEXT | typeof COLOR_TYPE_HIGHLIGHT) => {
    if (!color) {
      return;
    }
    const setter = type === COLOR_TYPE_TEXT ? setRecentTextColors : setRecentHighlightColors;
    setter((previous) => {
      const filtered = previous.filter((entry) => entry !== color);
      return [color, ...filtered].slice(ZERO, SIX);
    });
  };

  const handleTextColor = (color: string) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    setTextColor(color);
    setTextColorValue(color);
    addToRecentColors(color, COLOR_TYPE_TEXT);
    handleInput();
  };

  const handleHighlightColor = (color: string) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    setHighlightColor(color);
    setHighlightColorValue(color);
    addToRecentColors(color, COLOR_TYPE_HIGHLIGHT);
    handleInput();
  };

  const handleApplyLastTextColor = (color: string) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    setTextColor(color);
    handleInput();
  };

  const handleApplyLastHighlightColor = (color: string) => {
    if (disabled || readOnly) {
      return;
    }
    editorRef.current?.focus();
    setHighlightColor(color);
    handleInput();
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    if (!allowImagePaste) {
      return;
    }
    const items = event.clipboardData?.items;
    if (!items) {
      return;
    }
    const itemList = Array.from(items);
    for (const item of itemList) {
      if (item.type.startsWith(IMAGE_MIME_PREFIX)) {
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
  };

  const handleImageUpload = () => {
    if (disabled || readOnly) {
      return;
    }
    const input = document.createElement('input');
    input.type = INPUT_TYPE_FILE;
    input.accept = INPUT_ACCEPT_IMAGE;
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[ZERO];
      if (file) {
        const dataUrl = await fileToDataUrl(file);
        editorRef.current?.focus();
        insertImage(dataUrl);
        handleInput();
      }
    };
    input.click();
  };

  const execAlign = (command: string) => {
    editorRef.current?.focus();
    execCommand(command);
    handleInput();
  };

  return {
    editorRef,
    isMobile,
    activeToolbar,
    activeFormats,
    currentBlock,
    charCount,
    textColorValue,
    highlightColorValue,
    recentTextColors,
    recentHighlightColors,
    updateActiveFormats,
    handleInput,
    handleFormat,
    handleHeadingChange,
    handleLink,
    handleTextColor,
    handleHighlightColor,
    handleApplyLastTextColor,
    handleApplyLastHighlightColor,
    handlePaste,
    handleImageUpload,
    execAlign,
  };
};
