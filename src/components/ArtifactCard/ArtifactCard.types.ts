import type { ReactNode } from 'react';

export type ArtifactCardKind = 'code' | 'doc' | 'preview';

export interface ArtifactCardTranslations {
  openLabel: string;
}

export interface ArtifactCardProps {
  id?: string;
  testId?: string;
  title: string;
  kind?: ArtifactCardKind;
  children?: ReactNode;
  onOpen?: () => void;
  translations?: Partial<ArtifactCardTranslations>;
  className?: string;
}
