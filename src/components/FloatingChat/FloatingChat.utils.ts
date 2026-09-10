import { UNIT_PX } from '@const';
import {
  CHAT_WINDOW_SIZE,
  FLOATING_CHAT_BOTTOM_VAR,
  FLOATING_CHAT_HEIGHT_VAR,
  FLOATING_CHAT_SIDE_VAR,
  FLOATING_CHAT_WIDTH_VAR,
} from './FloatingChat.const';

export const resolveFloatingChatVars = (bottom: number, side: number) =>
  ({
    [FLOATING_CHAT_BOTTOM_VAR]: `${bottom}${UNIT_PX}`,
    [FLOATING_CHAT_SIDE_VAR]: `${side}${UNIT_PX}`,
    [FLOATING_CHAT_WIDTH_VAR]: `${CHAT_WINDOW_SIZE.width}${UNIT_PX}`,
    [FLOATING_CHAT_HEIGHT_VAR]: `${CHAT_WINDOW_SIZE.height}${UNIT_PX}`,
  }) as Record<string, string>;

export const resolveFloatingChatBadge = (count: number, max: number) => {
  if (count > max) {
    return `${max}+`;
  }
  return String(count);
};
