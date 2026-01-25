const BYTES_PER_KB = 1024;
const SIZE_LABELS = ['Bytes', 'KB', 'MB', 'GB'] as const;

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(BYTES_PER_KB));
  const value = parseFloat((bytes / Math.pow(BYTES_PER_KB, i)).toFixed(2));
  return `${value} ${SIZE_LABELS[i]}`;
}
