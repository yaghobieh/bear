import type { ReactNode } from 'react';
import type { CatalogEntry } from '../ComponentsOverview.types';

export interface CatalogCardProps {
  entry: CatalogEntry;
  preview: ReactNode;
}
