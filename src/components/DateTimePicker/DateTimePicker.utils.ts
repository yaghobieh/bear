const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

export function formatDate(d: Date | null, format: string = DEFAULT_DATE_FORMAT): string {
  if (!d) return '';
  const day = d.getDate().toString().padStart(2, '0');
  const mon = (d.getMonth() + 1).toString().padStart(2, '0');
  const yr = d.getFullYear().toString();
  return format.replace('DD', day).replace('MM', mon).replace('YYYY', yr);
}

export function formatTime(d: Date, fmt: '12h' | '24h'): string {
  const h = d.getHours();
  const m = d.getMinutes();
  if (fmt === '24h') return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  const p = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${p}`;
}
