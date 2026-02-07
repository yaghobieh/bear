import type { ToolbarOption, DropdownOption } from './RichEditor.types';

// Default height settings
export const RICH_EDITOR_MIN_HEIGHT = 150;

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
  'divider',
  'clearFormat',
];

// Breakpoint for mobile toolbar (px)
export const RICH_EDITOR_MOBILE_BREAKPOINT = 640;

// Simple toolbar configuration
export const RICH_EDITOR_SIMPLE_TOOLBAR: ToolbarOption[] = [
  'bold',
  'italic',
  'underline',
  'divider',
  'bulletList',
  'orderedList',
];

// CSS class constants - Light mode first, then dark mode overrides
// Using standard Tailwind classes for better portal compatibility
export const RICH_EDITOR_ROOT_CLASSES = 'Bear-RichEditor rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm';

export const RICH_EDITOR_TOOLBAR_CLASSES = 'flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 overflow-x-auto overflow-y-hidden';

export const RICH_EDITOR_CONTENT_CLASSES = 'p-4 outline-none max-w-none text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-900 min-h-[100px]';

export const RICH_EDITOR_DIVIDER_CLASSES = 'w-px h-5 bg-gray-300 dark:bg-zinc-600 mx-1';

export const RICH_EDITOR_BUTTON_BASE_CLASSES = 'p-1.5 rounded transition-colors';

export const RICH_EDITOR_BUTTON_ACTIVE_CLASSES = 'bg-pink-500 text-white';

export const RICH_EDITOR_BUTTON_INACTIVE_CLASSES = 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700';

export const RICH_EDITOR_BUTTON_DISABLED_CLASSES = 'opacity-50 cursor-not-allowed';

// Color picker z-index for proper layering
export const RICH_EDITOR_COLOR_PICKER_Z_INDEX = 9999;

// Heading dropdown options - H1-H6 and body text variants
export const RICH_EDITOR_HEADING_OPTIONS: DropdownOption[] = [
  { value: 'p', label: 'Paragraph', preview: <span className="bear-text-sm bear-font-normal">Normal text</span> },
  { value: 'h1', label: 'Heading 1', preview: <span className="bear-text-2xl bear-font-bold">Heading 1</span> },
  { value: 'h2', label: 'Heading 2', preview: <span className="bear-text-xl bear-font-bold">Heading 2</span> },
  { value: 'h3', label: 'Heading 3', preview: <span className="bear-text-lg bear-font-semibold">Heading 3</span> },
  { value: 'h4', label: 'Heading 4', preview: <span className="bear-text-base bear-font-semibold">Heading 4</span> },
  { value: 'h5', label: 'Heading 5', preview: <span className="bear-text-sm bear-font-semibold">Heading 5</span> },
  { value: 'h6', label: 'Heading 6', preview: <span className="bear-text-xs bear-font-semibold bear-uppercase">Heading 6</span> },
];

// Toolbar button configurations
export const RICH_EDITOR_BUTTON_CONFIG = {
  bold: { title: 'Bold (Ctrl+B)', command: 'bold' },
  italic: { title: 'Italic (Ctrl+I)', command: 'italic' },
  underline: { title: 'Underline (Ctrl+U)', command: 'underline' },
  strikethrough: { title: 'Strikethrough', command: 'strikeThrough' },
  heading1: { title: 'Heading 1', command: 'formatBlock', value: 'h1' },
  heading2: { title: 'Heading 2', command: 'formatBlock', value: 'h2' },
  heading3: { title: 'Heading 3', command: 'formatBlock', value: 'h3' },
  heading4: { title: 'Heading 4', command: 'formatBlock', value: 'h4' },
  heading5: { title: 'Heading 5', command: 'formatBlock', value: 'h5' },
  heading6: { title: 'Heading 6', command: 'formatBlock', value: 'h6' },
  paragraph: { title: 'Paragraph', command: 'formatBlock', value: 'p' },
  bulletList: { title: 'Bullet List', command: 'insertUnorderedList' },
  orderedList: { title: 'Numbered List', command: 'insertOrderedList' },
  blockquote: { title: 'Quote', command: 'formatBlock', value: 'blockquote' },
  code: { title: 'Code Block', command: 'formatBlock', value: 'pre' },
  link: { title: 'Insert Link', command: 'createLink' },
  image: { title: 'Insert Image', command: 'insertImage' },
  textColor: { title: 'Text Color', command: 'foreColor' },
  highlightColor: { title: 'Highlight Color', command: 'hiliteColor' },
  alignLeft: { title: 'Align Left', command: 'justifyLeft' },
  alignCenter: { title: 'Align Center', command: 'justifyCenter' },
  alignRight: { title: 'Align Right', command: 'justifyRight' },
  alignJustify: { title: 'Justify', command: 'justifyFull' },
  indent: { title: 'Increase Indent', command: 'indent' },
  outdent: { title: 'Decrease Indent', command: 'outdent' },
  clearFormat: { title: 'Clear Formatting', command: 'removeFormat' },
  table: { title: 'Insert Table', command: 'insertTable' },
} as const;

// Format block mappings
export const FORMAT_BLOCK_MAP: Record<string, string> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
  blockquote: 'blockquote',
  code: 'pre',
};

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

// Content styles for proper heading/list rendering
export const RICH_EDITOR_CONTENT_STYLES = `
  .Bear-RichEditor__content {
    line-height: 1.6;
  }
  .Bear-RichEditor__content h1 { 
    font-size: 2rem; 
    font-weight: bold; 
    margin: 0.67em 0; 
    line-height: 1.2;
  }
  .Bear-RichEditor__content h2 { 
    font-size: 1.5rem; 
    font-weight: bold; 
    margin: 0.83em 0; 
    line-height: 1.3;
  }
  .Bear-RichEditor__content h3 { 
    font-size: 1.25rem; 
    font-weight: 600; 
    margin: 1em 0; 
    line-height: 1.4;
  }
  .Bear-RichEditor__content h4 { 
    font-size: 1.125rem; 
    font-weight: 600; 
    margin: 1.33em 0;
  }
  .Bear-RichEditor__content h5 { 
    font-size: 1rem; 
    font-weight: 600; 
    margin: 1.67em 0;
  }
  .Bear-RichEditor__content h6 { 
    font-size: 0.875rem; 
    font-weight: 600; 
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 2em 0;
  }
  .Bear-RichEditor__content p { 
    margin: 0.5em 0; 
  }
  .Bear-RichEditor__content ul { 
    list-style-type: disc !important; 
    padding-left: 1.5em !important; 
    margin: 0.5em 0 !important; 
    display: block !important;
  }
  .Bear-RichEditor__content ol { 
    list-style-type: decimal !important; 
    padding-left: 1.5em !important; 
    margin: 0.5em 0 !important;
    display: block !important;
  }
  .Bear-RichEditor__content li { 
    margin: 0.25em 0 !important;
    display: list-item !important;
  }
  .Bear-RichEditor__content blockquote { 
    border-left: 4px solid #ec4899; 
    padding-left: 1em; 
    margin: 1em 0; 
    color: #6b7280; 
    font-style: italic;
    background: rgba(236, 72, 153, 0.05);
    padding: 0.5em 1em;
    border-radius: 0 0.375rem 0.375rem 0;
  }
  .Bear-RichEditor__content pre { 
    background: #f3f4f6; 
    color: #374151;
    padding: 1em; 
    border-radius: 0.5rem; 
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; 
    font-size: 0.875em;
    overflow-x: auto; 
    margin: 1em 0;
    white-space: pre-wrap;
    word-break: break-word;
    border: 1px solid #e5e7eb;
  }
  .Bear-RichEditor__content code {
    background: #f3f4f6;
    color: #374151;
    padding: 0.125em 0.25em;
    border-radius: 0.25rem;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    font-size: 0.875em;
  }
  .Bear-RichEditor__content a { 
    color: #ec4899; 
    text-decoration: underline;
    cursor: pointer;
  }
  .Bear-RichEditor__content a:hover {
    color: #db2777;
  }
  .Bear-RichEditor__content img { 
    max-width: 100%; 
    height: auto; 
    border-radius: 0.5rem; 
    margin: 1em 0;
    display: block;
  }
  .Bear-RichEditor__content table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  .Bear-RichEditor__content th,
  .Bear-RichEditor__content td {
    border: 1px solid #d1d5db;
    padding: 0.5em;
    text-align: left;
  }
  .Bear-RichEditor__content th {
    background: #f3f4f6;
    font-weight: 600;
  }
  /* Dark mode styles */
  .dark .Bear-RichEditor__content pre {
    background: #1f2937;
    color: #e5e7eb;
    border-color: #374151;
  }
  .dark .Bear-RichEditor__content code {
    background: #374151;
    color: #e5e7eb;
  }
  .dark .Bear-RichEditor__content blockquote {
    color: #9ca3af;
    background: rgba(236, 72, 153, 0.1);
  }
  .dark .Bear-RichEditor__content th {
    background: #374151;
  }
  .dark .Bear-RichEditor__content th,
  .dark .Bear-RichEditor__content td {
    border-color: #4b5563;
  }
`;
