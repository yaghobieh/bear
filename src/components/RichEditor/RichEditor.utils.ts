export const DEFAULT_TOOLBAR: string[] = [
  'bold',
  'italic',
  'underline',
  'divider',
  'heading1',
  'heading2',
  'divider',
  'bulletList',
  'orderedList',
  'divider',
  'blockquote',
  'code',
  'link',
];

export const execCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value);
};

export const queryCommandState = (command: string): boolean => {
  return document.queryCommandState(command);
};

