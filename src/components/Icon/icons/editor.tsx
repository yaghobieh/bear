/**
 * Editor Icons - Text editing and formatting
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// Text formatting
export const BoldIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></Icon>
);

export const ItalicIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></Icon>
);

export const UnderlineIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" /></Icon>
);

export const StrikethroughIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9h.2H21" /><path d="M8.5 15c0 2.1 1.6 3.1 5 3.1 4.3 0 5.6-1.8 5.6-3.1 0-1.5-.9-2.5-2.8-3H3" /><line x1="3" y1="12" x2="21" y2="12" /></Icon>
);

// Alignment
export const AlignLeftIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" /></Icon>
);

export const AlignCenterIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" /></Icon>
);

export const AlignRightIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="7" y2="18" /></Icon>
);

export const AlignJustifyIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="21" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="3" y2="18" /></Icon>
);

// List formatting
export const ListIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></Icon>
);

export const ListBulletIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="3" cy="6" r="1" /><circle cx="3" cy="12" r="1" /><circle cx="3" cy="18" r="1" /></Icon>
);

export const ListNumberedIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></Icon>
);

export const ChecklistIcon: IconComponent = (props) => (
  <Icon {...props}><path d="m3 5 2 2 4-4" /><path d="m3 12 2 2 4-4" /><path d="m3 19 2 2 4-4" /><line x1="11" y1="6" x2="21" y2="6" /><line x1="11" y1="13" x2="21" y2="13" /><line x1="11" y1="20" x2="21" y2="20" /></Icon>
);

// Indent
export const IndentIncreaseIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="3 8 7 12 3 16" /><line x1="21" y1="12" x2="11" y2="12" /><line x1="21" y1="6" x2="11" y2="6" /><line x1="21" y1="18" x2="11" y2="18" /></Icon>
);

export const IndentDecreaseIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 8 3 12 7 16" /><line x1="21" y1="12" x2="11" y2="12" /><line x1="21" y1="6" x2="11" y2="6" /><line x1="21" y1="18" x2="11" y2="18" /></Icon>
);

// Heading
export const TitleIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 4v16" /><path d="M5 12h14" /><path d="M19 4v16" /></Icon>
);

export const TextFieldsIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6 4v16" /><path d="M18 4v16" /><path d="M6 12h12" /></Icon>
);

export const Heading1Icon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path d="M17 10v8" /><path d="M17 10l-3 0" /></Icon>
);

export const Heading2Icon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" /></Icon>
);

export const Heading3Icon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" /><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" /></Icon>
);

// Paragraph
export const ParagraphIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M13 4v16" /><path d="M17 4v16" /><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" /></Icon>
);

// Quote
export const QuoteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" /></Icon>
);

// Link/Unlink
export const InsertLinkIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Icon>
);

export const RemoveLinkIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

// Text size
export const TextIncreaseIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 19h6" /><path d="M7 4v15" /><path d="M11 4h4l4 15" /><path d="M15 19h4" /><path d="M21 8v6" /><path d="M18 11h6" /></Icon>
);

export const TextDecreaseIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 19h6" /><path d="M7 4v15" /><path d="M11 4h4l4 15" /><path d="M15 19h4" /><path d="M18 11h6" /></Icon>
);

// Format
export const FormatColorTextIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 2 4 14h2l1-3h6l1 3h2L11 2z" /><path d="M10 9 8 5h.01L10 9z" /><rect x="2" y="17" width="20" height="4" fill="currentColor" /></Icon>
);

export const FormatColorFillIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M11.67 3.87 9.9 2.1a1 1 0 0 0-1.4 0L2.1 8.5a1 1 0 0 0 0 1.4l7.4 7.4a1 1 0 0 0 1.4 0l6.4-6.4a1 1 0 0 0 0-1.4z" /><path d="M16 14c0 2 2 4 2 4s2-2 2-4-2-4-2-4-2 2-2 4z" /><rect x="2" y="19" width="20" height="3" fill="currentColor" /></Icon>
);

export const HighlightIcon: IconComponent = (props) => (
  <Icon {...props}><path d="m9 11-6 6v3h9l3-3" /><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /></Icon>
);

// Superscript/Subscript
export const SuperscriptIcon: IconComponent = (props) => (
  <Icon {...props}><path d="m4 19 8-8" /><path d="m12 19-8-8" /><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" /></Icon>
);

export const SubscriptIcon: IconComponent = (props) => (
  <Icon {...props}><path d="m4 5 8 8" /><path d="m12 5-8 8" /><path d="M20 19h-4c0-1.5.442-2 1.5-2.5S20 15.334 20 14.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" /></Icon>
);

// Clear formatting
export const FormatClearIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 7h14" /><path d="M9 7v6" /><path d="m14.8 12 2.2 5" /><line x1="4" y1="4" x2="20" y2="20" /></Icon>
);

// Spell check
export const SpellcheckIcon: IconComponent = (props) => (
  <Icon {...props}><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" /></Icon>
);

// Table
export const TableIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" /></Icon>
);

export const TableInsertRowIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M3 14h18" /><path d="M9 8v13" /><path d="M15 8v13" /><path d="M9 2h6" /><path d="M12 2v4" /></Icon>
);

export const TableInsertColumnIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="13" height="18" rx="2" /><path d="M9 3v18" /><path d="M3 9h13" /><path d="M3 15h13" /><path d="M19 9v6" /><path d="M19 12h4" /></Icon>
);

// Code
export const CodeIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></Icon>
);

export const CodeBlockIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><polyline points="9 8 5 12 9 16" /><polyline points="15 8 19 12 15 16" /></Icon>
);

// Emoji
export const EmojiIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></Icon>
);

export const EmojiHappyIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></Icon>
);

export const EmojiSadIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></Icon>
);

// Symbols
export const AtIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></Icon>
);

export const HashtagIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></Icon>
);

// Insert
export const InsertPhotoIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>
);

export const InsertDriveFileIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></Icon>
);

export const InsertChartIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="15" x2="8" y2="9" /><line x1="12" y1="15" x2="12" y2="6" /><line x1="16" y1="15" x2="16" y2="12" /></Icon>
);

// Crop/Rotate
export const CropIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" /><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" /></Icon>
);

export const RotateLeftIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2.5 2v6h6" /><path d="M2.66 15.57a10 10 0 1 0 .57-8.38" /></Icon>
);

export const RotateRightIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21.5 2v6h-6" /><path d="M21.34 15.57a10 10 0 1 1-.57-8.38" /></Icon>
);

export const FlipIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="3" x2="12" y2="21" /><polyline points="18 9 21 12 18 15" /><polyline points="6 9 3 12 6 15" /></Icon>
);

