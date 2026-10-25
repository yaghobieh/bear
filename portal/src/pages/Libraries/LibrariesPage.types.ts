export type BearLibraryKind = 'x' | 'library' | 'flutter' | 'pro';

export interface BearLibraryCard {
  id: string;
  name: string;
  kind: BearLibraryKind;
  summaryKey: string;
  install: string;
  components: string[];
}
