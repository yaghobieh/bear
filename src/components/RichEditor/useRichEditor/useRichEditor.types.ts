import type { ClipboardEvent, RefObject } from 'react';
import type { RichEditorProps, ToolbarOption } from '../RichEditor.types';

export interface UseRichEditorOptions {
  value?: RichEditorProps['value'];
  defaultValue: string;
  onChange?: RichEditorProps['onChange'];
  disabled: boolean;
  readOnly: boolean;
  toolbar: NonNullable<RichEditorProps['toolbar']>;
  allowImagePaste: boolean;
  showCharCount: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
}

export interface UseRichEditorReturn {
  editorRef: RefObject<HTMLDivElement>;
  isMobile: boolean;
  activeToolbar: NonNullable<RichEditorProps['toolbar']>;
  activeFormats: Set<string>;
  currentBlock: string;
  charCount: number;
  textColorValue: string;
  highlightColorValue: string;
  recentTextColors: string[];
  recentHighlightColors: string[];
  updateActiveFormats: () => void;
  handleInput: () => void;
  handleFormat: (format: ToolbarOption) => void;
  handleHeadingChange: (value: string) => void;
  handleLink: () => void;
  handleTextColor: (color: string) => void;
  handleHighlightColor: (color: string) => void;
  handleApplyLastTextColor: (color: string) => void;
  handleApplyLastHighlightColor: (color: string) => void;
  handlePaste: (event: ClipboardEvent<HTMLDivElement>) => Promise<void>;
  handleImageUpload: () => void;
  handleInsertSignature: (dataUrl: string) => void;
  execAlign: (command: string) => void;
}
