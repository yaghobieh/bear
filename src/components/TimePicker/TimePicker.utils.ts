export function formatTime(
  h: number,
  m: number,
  p: 'AM' | 'PM',
  format: '12h' | '24h'
): string {
  const minStr = m.toString().padStart(2, '0');
  if (format === '12h') {
    const hourStr = h.toString().padStart(2, '0');
    return `${hourStr}:${minStr} ${p}`;
  }
  /** 24h: h is already 0–23 from picker; format HH:mm */
  return `${h.toString().padStart(2, '0')}:${minStr}`;
}
