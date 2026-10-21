import type { PortalCopyKey } from '@/components/Topbar/Topbar.types';

export const HOME_AI_FIELD_ID = 'bear-home-ai';
export const HOME_AI_CHAT_HEIGHT = 420;
export const HOME_AI_GIF_ID = 'gif';

export const HOME_AI_GIF_PROMPT = `Create a seamless 4-second looping GIF, 960 by 540, 12 frames per second.
Dark product UI on #09090b with a pink accent #ec4899.
Three cards slide up and lock into one row: a button, an alert, and a small bar chart.
A soft glow pulses once around the row, then the motion returns to the first frame with no jump.
Flat vector style. The only word is Bear. No watermark, no camera move, no extra text.`;
export const HOME_SIDE_RATING = 4;
export const HOME_SIDE_PROGRESS = 68;

export const HOME_PRODUCTS: { path: string; nameKey: PortalCopyKey; descKey: PortalCopyKey }[] = [
  { path: '/components', nameKey: 'productCoreName', descKey: 'productCoreDesc' },
  { path: '/products/charts', nameKey: 'productChartsName', descKey: 'productChartsDesc' },
  { path: '/products/map', nameKey: 'productMapName', descKey: 'productMapDesc' },
  { path: '/products/calendar', nameKey: 'productCalendarName', descKey: 'productCalendarDesc' },
  { path: '/products/ink', nameKey: 'productInkName', descKey: 'productInkDesc' },
  { path: '/products/kanban', nameKey: 'productKanbanName', descKey: 'productKanbanDesc' },
  { path: '/templates', nameKey: 'productTemplatesName', descKey: 'productTemplatesDesc' },
  { path: '/products/ai', nameKey: 'productAiName', descKey: 'productAiDesc' },
];
