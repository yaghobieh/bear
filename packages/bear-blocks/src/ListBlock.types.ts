export interface ListBlockItem {
  id: string;
  title: string;
  detail?: string;
}

export interface ListBlockProps {
  id?: string;
  testId?: string;
  title?: string;
  items: ListBlockItem[];
}
