import { FC, type ReactNode } from 'react';
import { Chat } from '@forgedevstack/bear-x-ai';
import { Kanban } from '@forgedevstack/kanban';
import type { ProductId } from '../ProductPage.types';
import { PRODUCT_CHAT_MESSAGES, PRODUCT_KANBAN_COLUMNS } from '../ProductPage.const';
import { CalendarPreview } from './CalendarPreview';
import { ChartsGallery } from './ChartsGallery';
import { CodeGallery } from './CodeGallery';
import { MapPreview } from './MapPreview';

interface ProductPreviewProps {
  productId: ProductId;
}

const PREVIEW_BY_PRODUCT: Record<ProductId, () => ReactNode> = {
  charts: () => <ChartsGallery />,
  ai: () => <Chat messages={PRODUCT_CHAT_MESSAGES} onSend={() => undefined} height={280} />,
  code: () => <CodeGallery />,
  map: () => <MapPreview />,
  kanban: () => <Kanban columns={PRODUCT_KANBAN_COLUMNS} />,
  calendar: () => <CalendarPreview />,
};

export const ProductPreview: FC<ProductPreviewProps> = (props) => {
  const renderPreview = PREVIEW_BY_PRODUCT[props.productId];
  return renderPreview();
};
