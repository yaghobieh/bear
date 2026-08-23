import { Typography } from '../Typography';
import {
  BLOCK_BLOCKQUOTE,
  BLOCK_H1,
  BLOCK_H2,
  BLOCK_H3,
  BLOCK_H4,
  BLOCK_H5,
  BLOCK_H6,
  BLOCK_PARAGRAPH,
  BLOCK_PRE,
  COMMAND_BOLD,
  COMMAND_CREATE_LINK,
  COMMAND_FORE_COLOR,
  COMMAND_FORMAT_BLOCK,
  COMMAND_HILITE_COLOR,
  COMMAND_INDENT,
  COMMAND_INSERT_ORDERED_LIST,
  COMMAND_INSERT_UNORDERED_LIST,
  COMMAND_ITALIC,
  COMMAND_JUSTIFY_CENTER,
  COMMAND_JUSTIFY_FULL,
  COMMAND_JUSTIFY_LEFT,
  COMMAND_JUSTIFY_RIGHT,
  COMMAND_OUTDENT,
  COMMAND_REMOVE_FORMAT,
  COMMAND_STRIKE_THROUGH,
  COMMAND_UNDERLINE,
  SIX_HUNDRED_FORTY,
} from '@const';
import type { ToolbarOption, DropdownOption } from './RichEditor.types';

// Default toolbar configuration - Compact with "more" for additional options
export const RICH_EDITOR_DEFAULT_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'textColor',
  'highlightColor',
  'divider',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'divider',
  'bulletList',
  'orderedList',
  'divider',
  'indent',
  'outdent',
  'divider',
  'blockquote',
  'code',
  'link',
  'image',
  'signature',
  'divider',
  'clearFormat',
];

// Compact toolbar with more button for additional options
export const RICH_EDITOR_COMPACT_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'textColor',
  'highlightColor',
  'divider',
  'bulletList',
  'orderedList',
  'divider',
  'link',
  'image',
  'signature',
  'divider',
  'more',
];

// Mobile toolbar: minimal (paragraph, bold, italic, strike) + more for all options
export const RICH_EDITOR_MOBILE_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'strikethrough',
  'divider',
  'more',
];

// Items shown in "more" menu on mobile
export const RICH_EDITOR_MOBILE_MORE_ITEMS: ToolbarOption[] = [
  'underline',
  'textColor',
  'highlightColor',
  'divider',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'divider',
  'bulletList',
  'orderedList',
  'divider',
  'indent',
  'outdent',
  'divider',
  'blockquote',
  'code',
  'link',
  'image',
  'signature',
  'divider',
  'clearFormat',
];

export const RICH_EDITOR_MOBILE_BREAKPOINT = SIX_HUNDRED_FORTY;

// Simple toolbar configuration
export const RICH_EDITOR_SIMPLE_TOOLBAR: ToolbarOption[] = [
  'bold',
  'italic',
  'underline',
  'divider',
  'bulletList',
  'orderedList',
];

export const RICH_EDITOR_HEADING_OPTIONS: DropdownOption[] = [
  { value: BLOCK_PARAGRAPH, label: 'Paragraph', preview: <Typography variant="body2">Normal text</Typography> },
  { value: BLOCK_H1, label: 'Heading 1', preview: <Typography variant="h1">Heading 1</Typography> },
  { value: BLOCK_H2, label: 'Heading 2', preview: <Typography variant="h2">Heading 2</Typography> },
  { value: BLOCK_H3, label: 'Heading 3', preview: <Typography variant="h3">Heading 3</Typography> },
  { value: BLOCK_H4, label: 'Heading 4', preview: <Typography variant="h4">Heading 4</Typography> },
  { value: BLOCK_H5, label: 'Heading 5', preview: <Typography variant="h5">Heading 5</Typography> },
  { value: BLOCK_H6, label: 'Heading 6', preview: <Typography variant="h6">Heading 6</Typography> },
];

// Toolbar button configurations
export const RICH_EDITOR_BUTTON_CONFIG = {
  bold: { title: 'Bold (Ctrl+B)', command: COMMAND_BOLD },
  italic: { title: 'Italic (Ctrl+I)', command: COMMAND_ITALIC },
  underline: { title: 'Underline (Ctrl+U)', command: COMMAND_UNDERLINE },
  strikethrough: { title: 'Strikethrough', command: COMMAND_STRIKE_THROUGH },
  heading1: { title: 'Heading 1', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H1 },
  heading2: { title: 'Heading 2', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H2 },
  heading3: { title: 'Heading 3', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H3 },
  heading4: { title: 'Heading 4', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H4 },
  heading5: { title: 'Heading 5', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H5 },
  heading6: { title: 'Heading 6', command: COMMAND_FORMAT_BLOCK, value: BLOCK_H6 },
  paragraph: { title: 'Paragraph', command: COMMAND_FORMAT_BLOCK, value: BLOCK_PARAGRAPH },
  bulletList: { title: 'Bullet List', command: COMMAND_INSERT_UNORDERED_LIST },
  orderedList: { title: 'Numbered List', command: COMMAND_INSERT_ORDERED_LIST },
  blockquote: { title: 'Quote', command: COMMAND_FORMAT_BLOCK, value: BLOCK_BLOCKQUOTE },
  code: { title: 'Code Block', command: COMMAND_FORMAT_BLOCK, value: BLOCK_PRE },
  link: { title: 'Insert Link', command: COMMAND_CREATE_LINK },
  image: { title: 'Insert Image', command: 'insertImage' },
  textColor: { title: 'Text Color', command: COMMAND_FORE_COLOR },
  highlightColor: { title: 'Highlight Color', command: COMMAND_HILITE_COLOR },
  alignLeft: { title: 'Align Left', command: COMMAND_JUSTIFY_LEFT },
  alignCenter: { title: 'Align Center', command: COMMAND_JUSTIFY_CENTER },
  alignRight: { title: 'Align Right', command: COMMAND_JUSTIFY_RIGHT },
  alignJustify: { title: 'Justify', command: COMMAND_JUSTIFY_FULL },
  indent: { title: 'Increase Indent', command: COMMAND_INDENT },
  outdent: { title: 'Decrease Indent', command: COMMAND_OUTDENT },
  clearFormat: { title: 'Clear Formatting', command: COMMAND_REMOVE_FORMAT },
  table: { title: 'Insert Table', command: 'insertTable' },
} as const;

export const FORMAT_BLOCK_MAP: Record<string, string> = {
  heading1: BLOCK_H1,
  heading2: BLOCK_H2,
  heading3: BLOCK_H3,
  heading4: BLOCK_H4,
  heading5: BLOCK_H5,
  heading6: BLOCK_H6,
  paragraph: BLOCK_PARAGRAPH,
  blockquote: BLOCK_BLOCKQUOTE,
  code: BLOCK_PRE,
};

export const RICH_EDITOR_DESKTOP_MORE_ITEMS: ToolbarOption[] = [
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'indent',
  'outdent',
  'blockquote',
  'code',
  'clearFormat',
];

export const TITLE_TEXT_STYLE = 'Text Style';
export const TITLE_TEXT_COLOR = 'Text Color';
export const TITLE_HIGHLIGHT_COLOR = 'Highlight Color';
export const TITLE_INSERT_LINK = 'Insert Link';
export const TITLE_INSERT_IMAGE = 'Insert Image';
export const TITLE_INSERT_SIGNATURE = 'Insert signature';
export const TITLE_MORE_OPTIONS = 'More options';
export const TITLE_CANCEL = 'Cancel';
export const TITLE_INSERT = 'Insert';
export const TITLE_ALIGN_LEFT = 'Align Left';
export const TITLE_ALIGN_CENTER = 'Align Center';
export const TITLE_ALIGN_RIGHT = 'Align Right';
export const TITLE_JUSTIFY = 'Justify';
export const TITLE_INCREASE_INDENT = 'Increase Indent';
export const TITLE_DECREASE_INDENT = 'Decrease Indent';
export const TITLE_CLEAR_FORMATTING = 'Clear Formatting';
export const PROMPT_ENTER_URL = 'Enter URL:';
export const URL_HTTPS_PREFIX = 'https://';
export const INPUT_TYPE_FILE = 'file';
export const INPUT_ACCEPT_IMAGE = 'image/*';
export const IMAGE_MIME_PREFIX = 'image/';

// Color palette for text and highlight colors
export const RICH_EDITOR_COLORS = [
  // Row 1: Grayscale
  '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff',
  // Row 2: Reds
  '#991b1b', '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2',
  // Row 3: Oranges
  '#9a3412', '#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa',
  // Row 4: Yellows
  '#854d0e', '#ca8a04', '#eab308', '#facc15', '#fde047', '#fef08a',
  // Row 5: Greens
  '#166534', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0',
  // Row 6: Blues
  '#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe',
  // Row 7: Purples
  '#6b21a8', '#9333ea', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff',
  // Row 8: Pinks
  '#9d174d', '#db2777', '#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8',
];
