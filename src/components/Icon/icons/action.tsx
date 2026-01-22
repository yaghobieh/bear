/**
 * Action Icons - Interactive action icons
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// Add/Remove
export const AddIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>
);

export const AddCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></Icon>
);

export const AddBoxIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></Icon>
);

export const RemoveIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="5" y1="12" x2="19" y2="12" /></Icon>
);

export const RemoveCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></Icon>
);

export const DeleteIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></Icon>
);

export const DeleteForeverIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Icon>
);

// Search
export const SearchIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>
);

export const SearchOffIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="4" y1="4" x2="20" y2="20" /></Icon>
);

export const FindReplaceIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M11 8v6l4 2" /></Icon>
);

// Settings/Config
export const SettingsIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></Icon>
);

export const TuneIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></Icon>
);

export const FilterIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></Icon>
);

export const FilterListIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="9" y1="18" x2="15" y2="18" /></Icon>
);

export const SortIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="9" y2="18" /></Icon>
);

// Edit
export const EditIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></Icon>
);

export const EditNoteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></Icon>
);

export const CreateIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></Icon>
);

// Save/Download/Upload
export const SaveIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></Icon>
);

export const SaveAltIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>
);

export const DownloadIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>
);

export const UploadIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></Icon>
);

export const CloudDownloadIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" /></Icon>
);

export const CloudUploadIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></Icon>
);

// Copy/Paste
export const CopyIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>
);

export const ContentCopyIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>
);

export const ContentPasteIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></Icon>
);

export const ContentCutIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></Icon>
);

// Undo/Redo
export const UndoIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></Icon>
);

export const RedoIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></Icon>
);

// Refresh/Sync
export const RefreshIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></Icon>
);

export const SyncIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></Icon>
);

export const CachedIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></Icon>
);

// Power
export const PowerIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /></Icon>
);

export const PowerOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /><line x1="4" y1="4" x2="20" y2="20" /></Icon>
);

// Visibility
export const VisibilityIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Icon>
);

export const VisibilityOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

// Lock
export const LockIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>
);

export const LockOpenIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></Icon>
);

export const KeyIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></Icon>
);

// User
export const PersonIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>
);

export const PersonAddIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></Icon>
);

export const PersonRemoveIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="11" /></Icon>
);

export const GroupIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>
);

export const GroupAddIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="11" /><line x1="20" y1="8" x2="20" y2="14" /></Icon>
);

// Zoom
export const ZoomInIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></Icon>
);

export const ZoomOutIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></Icon>
);

// Print
export const PrintIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></Icon>
);

// Build/Tools
export const BuildIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></Icon>
);

export const HandymanIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></Icon>
);

// More
export const MoreHorizIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Icon>
);

export const MoreVertIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></Icon>
);

// Fullscreen
export const FullscreenIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></Icon>
);

export const FullscreenExitIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /></Icon>
);

// Favorite
export const FavoriteIcon: IconComponent = (props) => (
  <Icon {...props} fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></Icon>
);

export const FavoriteBorderIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Icon>
);

// Star
export const StarIcon: IconComponent = (props) => (
  <Icon {...props} fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>
);

export const StarBorderIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>
);

export const StarHalfIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" fill="currentColor" /><path d="M12 2L8.91 8.26 2 9.27l5 4.87-1.18 6.88L12 17.77" /></Icon>
);

// Bookmark
export const BookmarkIcon: IconComponent = (props) => (
  <Icon {...props} fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Icon>
);

export const BookmarkBorderIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Icon>
);

export const BookmarkAddIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /><line x1="12" y1="7" x2="12" y2="13" /><line x1="9" y1="10" x2="15" y2="10" /></Icon>
);

// Share
export const ShareIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></Icon>
);

export const OpenInNewIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></Icon>
);

export const LaunchIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></Icon>
);

// Link
export const LinkIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Icon>
);

export const LinkOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

// Archive
export const ArchiveIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></Icon>
);

export const UnarchiveIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><polyline points="10 14 12 12 14 14" /><line x1="12" y1="12" x2="12" y2="18" /></Icon>
);

// Help
export const HelpIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const HelpOutlineIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

// Logout/Login
export const LogoutIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></Icon>
);

export const LoginIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></Icon>
);

// Send
export const SendIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></Icon>
);

// Flash/Bolt
export const FlashOnIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>
);

export const FlashOffIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

// Shopping
export const ShoppingCartIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></Icon>
);

export const ShoppingBagIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></Icon>
);

export const AddShoppingCartIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /><line x1="12" y1="9" x2="12" y2="15" /><line x1="9" y1="12" x2="15" y2="12" /></Icon>
);

// Drag
export const DragHandleIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></Icon>
);

export const DragIndicatorIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="8" cy="6" r="1.5" /><circle cx="16" cy="6" r="1.5" /><circle cx="8" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" /><circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" /></Icon>
);

