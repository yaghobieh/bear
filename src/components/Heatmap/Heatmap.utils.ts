import { DAYS_IN_WEEK } from './Heatmap.const';

export function getWeeks(start: Date, end: Date): Date[][] {
  const weeks: Date[][] = [];
  const curr = new Date(start);
  curr.setDate(curr.getDate() - curr.getDay());
  while (curr <= end) {
    const week: Date[] = [];
    for (let d = 0; d < DAYS_IN_WEEK; d++) {
      week.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export function toKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}
