import { Flex } from '@forgedevstack/bear';
import { CATALOG_PREVIEWS, renderCatalogFallback } from '@/pages/ComponentsOverview/helpers';
import type { CatalogCanvasProps } from './CatalogCanvas.types';

export const CatalogCanvas = (props: CatalogCanvasProps) => {
  const { path, label } = props;
  return <Flex align="center" justify="center">{CATALOG_PREVIEWS[path] ?? renderCatalogFallback(label)}</Flex>;
};
