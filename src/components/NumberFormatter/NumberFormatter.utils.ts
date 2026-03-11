import type { NumberFormatterProps } from './NumberFormatter.types';
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from './NumberFormatter.const';

export const buildFormatter = (props: NumberFormatterProps): Intl.NumberFormat => {
  const {
    formatStyle = 'decimal', locale = DEFAULT_LOCALE,
    currency = DEFAULT_CURRENCY, currencyDisplay,
    unit, unitDisplay, notation,
    minimumFractionDigits, maximumFractionDigits, signDisplay,
  } = props;

  const options: Intl.NumberFormatOptions = { signDisplay };

  if (formatStyle === 'currency') {
    options.style = 'currency';
    options.currency = currency;
    if (currencyDisplay) options.currencyDisplay = currencyDisplay;
  } else if (formatStyle === 'percent') {
    options.style = 'percent';
  } else if (formatStyle === 'compact') {
    options.notation = 'compact';
  } else if (formatStyle === 'unit' && unit) {
    options.style = 'unit';
    options.unit = unit;
    if (unitDisplay) options.unitDisplay = unitDisplay;
  }

  if (notation && formatStyle !== 'compact') options.notation = notation;
  if (minimumFractionDigits !== undefined) options.minimumFractionDigits = minimumFractionDigits;
  if (maximumFractionDigits !== undefined) options.maximumFractionDigits = maximumFractionDigits;

  return new Intl.NumberFormat(locale, options);
};
