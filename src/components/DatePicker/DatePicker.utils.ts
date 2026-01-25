const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

export function formatDate(date: Date | null, format: string = DEFAULT_DATE_FORMAT): string {
  if (!date) return '';
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString();
  return format.replace('DD', d).replace('MM', m).replace('YYYY', y);
}
