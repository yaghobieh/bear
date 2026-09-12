import type { ReactNode } from 'react';

export interface CatalogEntry {
  label: string;
  path: string;
  badge?: string;
  category: string;
  groupTitle: string;
}

export interface CatalogCardProps {
  entry: CatalogEntry;
  preview: ReactNode;
}

export type CatalogPreviewMap = Record<string, ReactNode>;
