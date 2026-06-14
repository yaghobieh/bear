export type ComparisonStatus = boolean | 'soon' | 'partial';

export interface ComparisonRow {
  id: number;
  feature: string;
  bearUI: ComparisonStatus;
  others: ComparisonStatus;
  [key: string]: unknown;
}
