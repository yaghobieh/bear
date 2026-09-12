import { UNIT_PX } from '@const';
import { CHAT_HEIGHT_VAR, CHAT_STICK_THRESHOLD } from './Chat.const';

export const resolveChatHeightVar = (height: number | string) => {
  const value = typeof height === 'number' ? `${height}${UNIT_PX}` : height;
  return { [CHAT_HEIGHT_VAR]: value } as Record<string, string>;
};

export const isChatScrollerAtBottom = (scroller: HTMLElement) => {
  const distance = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
  return distance <= CHAT_STICK_THRESHOLD;
};
