export function formatCurrency(value: number | undefined, locale: string, decimals: number): string {
  if (value == null) return '';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function parseCurrency(raw: string): number | undefined {
  const cleaned = raw.replace(/[^\d.,-]/g, '').replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? undefined : num;
}
