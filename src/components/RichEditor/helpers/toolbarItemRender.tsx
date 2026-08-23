import type { ReactNode } from 'react';
import {
  COMMAND_INDENT,
  COMMAND_JUSTIFY_CENTER,
  COMMAND_JUSTIFY_FULL,
  COMMAND_JUSTIFY_LEFT,
  COMMAND_JUSTIFY_RIGHT,
  COMMAND_OUTDENT,
  COMMAND_REMOVE_FORMAT,
  SIXTEEN,
  TOOLBAR_ITEM_ALIGN_CENTER,
  TOOLBAR_ITEM_ALIGN_JUSTIFY,
  TOOLBAR_ITEM_ALIGN_LEFT,
  TOOLBAR_ITEM_ALIGN_RIGHT,
  TOOLBAR_ITEM_CLEAR_FORMAT,
  TOOLBAR_ITEM_DIVIDER,
  TOOLBAR_ITEM_HEADING_DROPDOWN,
  TOOLBAR_ITEM_HIGHLIGHT_COLOR,
  TOOLBAR_ITEM_IMAGE,
  TOOLBAR_ITEM_INDENT,
  TOOLBAR_ITEM_LINK,
  TOOLBAR_ITEM_MORE,
  TOOLBAR_ITEM_OUTDENT,
  TOOLBAR_ITEM_SIGNATURE,
  TOOLBAR_ITEM_TEXT_COLOR,
} from '@const';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  FormatClearIcon,
  IndentDecreaseIcon,
  IndentIncreaseIcon,
  InsertLinkIcon,
  InsertPhotoIcon,
  TextIcon,
} from '../../Icon/icons/editor';
import { ToolbarButton, ToolbarColorPicker, ToolbarDropdown, ToolbarMore, ToolbarSignature } from '../components';
import {
  RICH_EDITOR_BUTTON_CONFIG,
  RICH_EDITOR_DESKTOP_MORE_ITEMS,
  RICH_EDITOR_HEADING_OPTIONS,
  RICH_EDITOR_MOBILE_MORE_ITEMS,
  TITLE_ALIGN_CENTER,
  TITLE_ALIGN_LEFT,
  TITLE_ALIGN_RIGHT,
  TITLE_CLEAR_FORMATTING,
  TITLE_DECREASE_INDENT,
  TITLE_HIGHLIGHT_COLOR,
  TITLE_INCREASE_INDENT,
  TITLE_INSERT_IMAGE,
  TITLE_INSERT_LINK,
  TITLE_INSERT_SIGNATURE,
  TITLE_JUSTIFY,
  TITLE_TEXT_COLOR,
  TITLE_TEXT_STYLE,
} from '../RichEditor.const';
import type { ToolbarOption } from '../RichEditor.types';
import type { UseRichEditorReturn } from '../useRichEditor';
import { RICH_EDITOR_ICONS } from './IconRender';

export interface ToolbarRenderContext extends UseRichEditorReturn {
  disabled: boolean;
  readOnly: boolean;
}

export const createToolbarItemRenderer = (ctx: ToolbarRenderContext) => {
  const isLocked = ctx.disabled || ctx.readOnly;

  const specials: Partial<Record<ToolbarOption, (index: number) => ReactNode>> = {
    [TOOLBAR_ITEM_DIVIDER]: (index) => (
      <div
        key={`${TOOLBAR_ITEM_DIVIDER}-${index}`}
        className="Bear-RichEditor__divider w-px h-5 bg-gray-300 dark:bg-zinc-600 mx-1"
      />
    ),
    [TOOLBAR_ITEM_HEADING_DROPDOWN]: () => (
      <ToolbarDropdown
        key={TOOLBAR_ITEM_HEADING_DROPDOWN}
        options={RICH_EDITOR_HEADING_OPTIONS}
        value={ctx.currentBlock}
        onChange={ctx.handleHeadingChange}
        title={TITLE_TEXT_STYLE}
        disabled={isLocked}
        icon={<TextIcon size={SIXTEEN} />}
      />
    ),
    [TOOLBAR_ITEM_TEXT_COLOR]: () => (
      <ToolbarColorPicker
        key={TOOLBAR_ITEM_TEXT_COLOR}
        value={ctx.textColorValue}
        onChange={ctx.handleTextColor}
        title={TITLE_TEXT_COLOR}
        disabled={isLocked}
        type="text"
        recentColors={ctx.recentTextColors}
        onApplyLast={ctx.handleApplyLastTextColor}
      />
    ),
    [TOOLBAR_ITEM_HIGHLIGHT_COLOR]: () => (
      <ToolbarColorPicker
        key={TOOLBAR_ITEM_HIGHLIGHT_COLOR}
        value={ctx.highlightColorValue}
        onChange={ctx.handleHighlightColor}
        title={TITLE_HIGHLIGHT_COLOR}
        disabled={isLocked}
        type="highlight"
        recentColors={ctx.recentHighlightColors}
        onApplyLast={ctx.handleApplyLastHighlightColor}
      />
    ),
    [TOOLBAR_ITEM_LINK]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_LINK}
        icon={<InsertLinkIcon size={SIXTEEN} />}
        title={TITLE_INSERT_LINK}
        onClick={ctx.handleLink}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_IMAGE]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_IMAGE}
        icon={<InsertPhotoIcon size={SIXTEEN} />}
        title={TITLE_INSERT_IMAGE}
        onClick={ctx.handleImageUpload}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_SIGNATURE]: () => (
      <ToolbarSignature
        key={TOOLBAR_ITEM_SIGNATURE}
        title={TITLE_INSERT_SIGNATURE}
        disabled={isLocked}
        onInsert={ctx.handleInsertSignature}
      />
    ),
    [TOOLBAR_ITEM_ALIGN_LEFT]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_ALIGN_LEFT}
        icon={<AlignLeftIcon size={SIXTEEN} />}
        title={TITLE_ALIGN_LEFT}
        onClick={() => ctx.execAlign(COMMAND_JUSTIFY_LEFT)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_ALIGN_CENTER]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_ALIGN_CENTER}
        icon={<AlignCenterIcon size={SIXTEEN} />}
        title={TITLE_ALIGN_CENTER}
        onClick={() => ctx.execAlign(COMMAND_JUSTIFY_CENTER)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_ALIGN_RIGHT]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_ALIGN_RIGHT}
        icon={<AlignRightIcon size={SIXTEEN} />}
        title={TITLE_ALIGN_RIGHT}
        onClick={() => ctx.execAlign(COMMAND_JUSTIFY_RIGHT)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_ALIGN_JUSTIFY]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_ALIGN_JUSTIFY}
        icon={<AlignJustifyIcon size={SIXTEEN} />}
        title={TITLE_JUSTIFY}
        onClick={() => ctx.execAlign(COMMAND_JUSTIFY_FULL)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_INDENT]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_INDENT}
        icon={<IndentIncreaseIcon size={SIXTEEN} />}
        title={TITLE_INCREASE_INDENT}
        onClick={() => ctx.execAlign(COMMAND_INDENT)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_OUTDENT]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_OUTDENT}
        icon={<IndentDecreaseIcon size={SIXTEEN} />}
        title={TITLE_DECREASE_INDENT}
        onClick={() => ctx.execAlign(COMMAND_OUTDENT)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_CLEAR_FORMAT]: () => (
      <ToolbarButton
        key={TOOLBAR_ITEM_CLEAR_FORMAT}
        icon={<FormatClearIcon size={SIXTEEN} />}
        title={TITLE_CLEAR_FORMATTING}
        onClick={() => ctx.execAlign(COMMAND_REMOVE_FORMAT)}
        disabled={isLocked}
      />
    ),
    [TOOLBAR_ITEM_MORE]: () => {
      const moreItems = ctx.isMobile ? RICH_EDITOR_MOBILE_MORE_ITEMS : RICH_EDITOR_DESKTOP_MORE_ITEMS;
      return (
        <ToolbarMore key={TOOLBAR_ITEM_MORE} disabled={isLocked} isMobile={ctx.isMobile}>
          {moreItems.map((moreItem, index) => renderToolbarItem(moreItem, index))}
        </ToolbarMore>
      );
    },
  };

  const renderToolbarItem = (item: ToolbarOption, index: number): ReactNode => {
    const renderSpecial = specials[item];
    if (renderSpecial) {
      return renderSpecial(index);
    }
    const config = RICH_EDITOR_BUTTON_CONFIG[item as keyof typeof RICH_EDITOR_BUTTON_CONFIG];
    const icon = RICH_EDITOR_ICONS[item];
    if (!config || !icon) {
      return null;
    }
    return (
      <ToolbarButton
        key={item}
        icon={icon}
        title={config.title}
        active={ctx.activeFormats.has(item)}
        onClick={() => ctx.handleFormat(item)}
        disabled={isLocked}
      />
    );
  };

  return renderToolbarItem;
};
