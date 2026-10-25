export type ProductId = 'flutter' | 'grid' | 'blocks' | 'charts' | 'ai' | 'code' | 'map' | 'kanban' | 'calendar' | 'ink';

export interface ProductDocLink {
  label: string;
  path: string;
}

export interface ProductPageData {
  id: ProductId;
  packageName: string;
  install: string;
  docLinks: ProductDocLink[];
}
