import {
  BLOCK_BLOCKQUOTE,
  BLOCK_H1,
  BLOCK_H2,
  BLOCK_H3,
  BLOCK_H4,
  BLOCK_H5,
  BLOCK_PARAGRAPH,
  BLOCK_PRE,
  BOOLEAN_FALSE,
  COMMAND_BOLD,
  COMMAND_CREATE_LINK,
  COMMAND_FORE_COLOR,
  COMMAND_FORMAT_BLOCK,
  COMMAND_HILITE_COLOR,
  COMMAND_INSERT_HTML,
  COMMAND_INSERT_ORDERED_LIST,
  COMMAND_INSERT_UNORDERED_LIST,
  COMMAND_ITALIC,
  COMMAND_REMOVE_FORMAT,
  COMMAND_STRIKE_THROUGH,
  COMMAND_UNDERLINE,
  COMMAND_UNLINK,
  EMPTY_STRING,
  TOOLBAR_ITEM_BOLD,
  TOOLBAR_ITEM_BULLET_LIST,
  TOOLBAR_ITEM_ITALIC,
  TOOLBAR_ITEM_ORDERED_LIST,
  TOOLBAR_ITEM_STRIKETHROUGH,
  TOOLBAR_ITEM_UNDERLINE,
} from '@const';
import type { ToolbarOption } from '../RichEditor.types';

export const execCommand = (command: string, value?: string): boolean => {
  return document.execCommand(command, BOOLEAN_FALSE, value);
};

export const queryCommandState = (command: string): boolean => {
  return document.queryCommandState(command);
};

export const queryCommandValue = (command: string): string => {
  return document.queryCommandValue(command);
};

export const getCurrentBlockFormat = (): string => {
  const value = queryCommandValue(COMMAND_FORMAT_BLOCK);
  return value.toLowerCase().replace(/[<>]/g, EMPTY_STRING);
};

const FORMAT_COMMAND_MAP: Partial<Record<ToolbarOption, { command: string; value?: string }>> = {
  bold: { command: COMMAND_BOLD },
  italic: { command: COMMAND_ITALIC },
  underline: { command: COMMAND_UNDERLINE },
  strikethrough: { command: COMMAND_STRIKE_THROUGH },
  heading1: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_H1 },
  heading2: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_H2 },
  heading3: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_H3 },
  heading4: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_H4 },
  heading5: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_H5 },
  paragraph: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_PARAGRAPH },
  bulletList: { command: COMMAND_INSERT_UNORDERED_LIST },
  orderedList: { command: COMMAND_INSERT_ORDERED_LIST },
  blockquote: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_BLOCKQUOTE },
  code: { command: COMMAND_FORMAT_BLOCK, value: BLOCK_PRE },
};

export const applyFormat = (format: ToolbarOption, editorRef?: React.RefObject<HTMLDivElement>): boolean => {
  editorRef?.current?.focus();
  const config = FORMAT_COMMAND_MAP[format];
  if (!config) {
    return BOOLEAN_FALSE;
  }
  return execCommand(config.command, config.value);
};

const PROTOCOL_HTTP = 'http://';
const PROTOCOL_HTTPS = 'https://';
const PROTOCOL_MAILTO = 'mailto:';

export const insertLink = (url: string): boolean => {
  if (!url) {
    return BOOLEAN_FALSE;
  }
  const hasProtocol =
    url.startsWith(PROTOCOL_HTTP) || url.startsWith(PROTOCOL_HTTPS) || url.startsWith(PROTOCOL_MAILTO);
  const formattedUrl = hasProtocol ? url : `${PROTOCOL_HTTPS}${url}`;
  return execCommand(COMMAND_CREATE_LINK, formattedUrl);
};

export const removeLink = (): boolean => {
  return execCommand(COMMAND_UNLINK);
};

export const setTextColor = (color: string): boolean => {
  if (!color) {
    return execCommand(COMMAND_REMOVE_FORMAT);
  }
  return execCommand(COMMAND_FORE_COLOR, color);
};

export const setHighlightColor = (color: string): boolean => {
  if (!color) {
    return execCommand(COMMAND_REMOVE_FORMAT);
  }
  return execCommand(COMMAND_HILITE_COLOR, color);
};

const ACTIVE_FORMAT_COMMANDS = [
  { command: COMMAND_BOLD, format: TOOLBAR_ITEM_BOLD },
  { command: COMMAND_ITALIC, format: TOOLBAR_ITEM_ITALIC },
  { command: COMMAND_UNDERLINE, format: TOOLBAR_ITEM_UNDERLINE },
  { command: COMMAND_STRIKE_THROUGH, format: TOOLBAR_ITEM_STRIKETHROUGH },
  { command: COMMAND_INSERT_UNORDERED_LIST, format: TOOLBAR_ITEM_BULLET_LIST },
  { command: COMMAND_INSERT_ORDERED_LIST, format: TOOLBAR_ITEM_ORDERED_LIST },
] as const;

export const getActiveFormats = (): Set<string> => {
  const formats = new Set<string>();
  ACTIVE_FORMAT_COMMANDS.forEach(({ command, format }) => {
    if (queryCommandState(command)) {
      formats.add(format);
    }
  });
  return formats;
};

export const insertHTML = (html: string): boolean => {
  return execCommand(COMMAND_INSERT_HTML, html);
};

export const insertImage = (src: string, alt?: string): boolean => {
  const imgHtml = `<img src="${src}" alt="${alt || EMPTY_STRING}" />`;
  return insertHTML(imgHtml);
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const handlePasteImages = async (event: ClipboardEvent): Promise<string[]> => {
  const items = event.clipboardData?.items;
  if (!items) {
    return [];
  }

  const images: string[] = [];
  const imagePrefix = 'image/';
  const itemList = Array.from(items);

  for (const item of itemList) {
    if (item.type.startsWith(imagePrefix)) {
      const file = item.getAsFile();
      if (file) {
        const dataUrl = await fileToDataUrl(file);
        images.push(dataUrl);
      }
    }
  }

  return images;
};
