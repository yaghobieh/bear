export type ProductId = 'charts' | 'ai' | 'code' | 'map' | 'kanban' | 'calendar';

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
