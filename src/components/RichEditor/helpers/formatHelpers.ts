import type { ToolbarOption } from '../RichEditor.types';

/**
 * Execute a document command for rich text editing
 */
export const execCommand = (command: string, value?: string): boolean => {
  return document.execCommand(command, false, value);
};

/**
 * Query the state of a document command
 */
export const queryCommandState = (command: string): boolean => {
  return document.queryCommandState(command);
};

/**
 * Query the value of a document command
 */
export const queryCommandValue = (command: string): string => {
  return document.queryCommandValue(command);
};

/**
 * Get current block format (p, h1, h2, etc.)
 */
export const getCurrentBlockFormat = (): string => {
  const value = queryCommandValue('formatBlock');
  return value.toLowerCase().replace(/[<>]/g, '');
};

/**
 * Apply a format command based on toolbar option
 */
export const applyFormat = (format: ToolbarOption, editorRef?: React.RefObject<HTMLDivElement>): boolean => {
  editorRef?.current?.focus();

  switch (format) {
    case 'bold':
      return execCommand('bold');
    case 'italic':
      return execCommand('italic');
    case 'underline':
      return execCommand('underline');
    case 'strikethrough':
      return execCommand('strikeThrough');
    case 'heading1':
      return execCommand('formatBlock', 'h1');
    case 'heading2':
      return execCommand('formatBlock', 'h2');
    case 'heading3':
      return execCommand('formatBlock', 'h3');
    case 'heading4':
      return execCommand('formatBlock', 'h4');
    case 'heading5':
      return execCommand('formatBlock', 'h5');
    case 'paragraph':
      return execCommand('formatBlock', 'p');
    case 'bulletList':
      return execCommand('insertUnorderedList');
    case 'orderedList':
      return execCommand('insertOrderedList');
    case 'blockquote':
      return execCommand('formatBlock', 'blockquote');
    case 'code':
      return execCommand('formatBlock', 'pre');
    default:
      return false;
  }
};

/**
 * Insert a link at current selection
 */
export const insertLink = (url: string): boolean => {
  if (!url) return false;
  
  // Ensure URL has protocol
  const formattedUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
    ? url
    : `https://${url}`;
  
  return execCommand('createLink', formattedUrl);
};

/**
 * Remove link from current selection
 */
export const removeLink = (): boolean => {
  return execCommand('unlink');
};

/**
 * Set text color
 */
export const setTextColor = (color: string): boolean => {
  if (!color) {
    return execCommand('removeFormat');
  }
  return execCommand('foreColor', color);
};

/**
 * Set background/highlight color
 */
export const setHighlightColor = (color: string): boolean => {
  if (!color) {
    return execCommand('removeFormat');
  }
  return execCommand('hiliteColor', color);
};

/**
 * Get active formats from current selection
 */
export const getActiveFormats = (): Set<string> => {
  const formats = new Set<string>();
  
  if (queryCommandState('bold')) formats.add('bold');
  if (queryCommandState('italic')) formats.add('italic');
  if (queryCommandState('underline')) formats.add('underline');
  if (queryCommandState('strikeThrough')) formats.add('strikethrough');
  if (queryCommandState('insertUnorderedList')) formats.add('bulletList');
  if (queryCommandState('insertOrderedList')) formats.add('orderedList');
  
  return formats;
};

/**
 * Insert HTML at current cursor position
 */
export const insertHTML = (html: string): boolean => {
  return execCommand('insertHTML', html);
};

/**
 * Insert image at current cursor position
 */
export const insertImage = (src: string, alt?: string): boolean => {
  const imgHtml = `<img src="${src}" alt="${alt || ''}" style="max-width: 100%; height: auto;" />`;
  return insertHTML(imgHtml);
};

/**
 * Convert file to base64 data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Handle paste event to process images
 */
export const handlePasteImages = async (event: ClipboardEvent): Promise<string[]> => {
  const items = event.clipboardData?.items;
  if (!items) return [];

  const images: string[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        const dataUrl = await fileToDataUrl(file);
        images.push(dataUrl);
      }
    }
  }

  return images;
};

