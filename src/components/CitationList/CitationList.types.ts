export interface CitationItem {
  id: string;
  title: string;
  href?: string;
  excerpt?: string;
}

export interface CitationListProps {
  id?: string;
  testId?: string;
  citations: CitationItem[];
  className?: string;
}

export interface CitationListTitleProps {
  citation: CitationItem;
}
