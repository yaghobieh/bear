const SECONDS_PER_MINUTE = 60;
const PAD_LENGTH = 2;

export function formatTime(s: number): string {
  const m = Math.floor(s / SECONDS_PER_MINUTE);
  const sec = Math.floor(s % SECONDS_PER_MINUTE);
  return `${m}:${sec.toString().padStart(PAD_LENGTH, '0')}`;
}
