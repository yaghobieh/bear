/**
 * Content Icons - Files, folders, documents
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// File
export const FileIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></Icon>
);

export const FileTextIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></Icon>
);

export const FilePlusIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></Icon>
);

export const FileMinusIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></Icon>
);

export const FileCheckIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="9 15 11 17 15 13" /></Icon>
);

export const FileXIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9.5" y1="12.5" x2="14.5" y2="17.5" /><line x1="14.5" y1="12.5" x2="9.5" y2="17.5" /></Icon>
);

export const FilesIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" /></Icon>
);

export const FileCodeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="9 13 11 15 9 17" /><polyline points="15 13 13 15 15 17" /></Icon>
);

// Folder
export const FolderIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></Icon>
);

export const FolderOpenIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1" /><path d="M6 10l-2 9h18l-2-9" /></Icon>
);

export const FolderPlusIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></Icon>
);

export const FolderMinusIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="9" y1="14" x2="15" y2="14" /></Icon>
);

export const FolderCheckIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><polyline points="9 14 11 16 15 12" /></Icon>
);

// Document types
export const ArticleIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></Icon>
);

export const DescriptionIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Icon>
);

export const NoteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" /><path d="M15 3v6h6" /></Icon>
);

export const NoteAddIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" /><path d="M15 3v6h6" /><line x1="12" y1="13" x2="12" y2="17" /><line x1="10" y1="15" x2="14" y2="15" /></Icon>
);

// Clipboard
export const ClipboardIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></Icon>
);

export const ClipboardTextIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /></Icon>
);

export const ClipboardCheckIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><polyline points="9 14 11 16 15 12" /></Icon>
);

// Image
export const ImageIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>
);

export const ImageAddIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M16 3v6" /><path d="M13 6h6" /></Icon>
);

export const ImageSearchIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 8V6a2 2 0 0 1 2-2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><circle cx="11.5" cy="11.5" r="4.5" /><line x1="21" y1="21" x2="14.8" y2="14.8" /></Icon>
);

export const BrokenImageIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 3v18h18" /><path d="M21 21v-9l-4-4-4 4" /><path d="M3 21l12-12" /></Icon>
);

// Photo
export const PhotoIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>
);

export const PhotoLibraryIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="7" y="7" width="14" height="14" rx="2" ry="2" /><path d="M3 5a2 2 0 0 1 2-2h12" /><circle cx="12" cy="12" r="2" /></Icon>
);

export const PhotoCameraIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>
);

// Attachment
export const AttachmentIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></Icon>
);

export const AttachFileIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></Icon>
);

// Book
export const BookIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></Icon>
);

export const BookOpenIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></Icon>
);

export const BookmarkIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Icon>
);

// Inbox/Archive
export const InboxIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></Icon>
);

export const ArchiveIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></Icon>
);

// Database/Storage
export const DatabaseIcon: IconComponent = (props) => (
  <Icon {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></Icon>
);

export const StorageIcon: IconComponent = (props) => (
  <Icon {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></Icon>
);

export const CloudIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></Icon>
);

export const CloudOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

// Tag/Label
export const TagIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>
);

export const TagsIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" /><path d="M6 9.01V9" /><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" /></Icon>
);

export const LabelIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>
);

// Table/Grid
export const TableIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></Icon>
);

export const TableChartIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="3" x2="9" y2="21" /></Icon>
);

// Code
export const CodeIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></Icon>
);

export const CodeBlockIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><polyline points="9 8 5 12 9 16" /><polyline points="15 8 19 12 15 16" /></Icon>
);

export const TerminalIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></Icon>
);

// Hash/Number
export const HashIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></Icon>
);

export const NumbersIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></Icon>
);

// Quote
export const FormatQuoteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" /></Icon>
);

