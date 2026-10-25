export interface DashboardStat {
  id: string;
  title: string;
  value: string;
}

export interface DashboardBlockProps {
  id?: string;
  testId?: string;
  title?: string;
  stats: DashboardStat[];
}
