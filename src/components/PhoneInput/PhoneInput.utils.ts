import { CountryData, PhoneValue } from './PhoneInput.types';

/**
 * Format phone number according to country format
 */
export const formatPhoneNumber = (number: string, format?: string): string => {
  if (!format) return number;
  
  const digits = number.replace(/\D/g, '');
  let result = '';
  let digitIndex = 0;
  
  for (const char of format) {
    if (digitIndex >= digits.length) break;
    
    if (char === '#') {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
};

/**
 * Parse raw phone input to digits only
 */
export const parsePhoneDigits = (input: string): string => {
  return input.replace(/\D/g, '');
};

/**
 * Create phone value object
 */
export const createPhoneValue = (
  country: CountryData,
  rawNumber: string
): PhoneValue => {
  const formattedNumber = formatPhoneNumber(rawNumber, country.format);
  return {
    countryCode: country.code,
    dialCode: country.dialCode,
    number: rawNumber,
    formattedNumber: `${country.dialCode} ${formattedNumber}`,
    rawNumber: parsePhoneDigits(rawNumber),
  };
};

/**
 * Filter countries by search query
 */
export const filterCountries = (
  countries: CountryData[],
  query: string
): CountryData[] => {
  if (!query.trim()) return countries;
  
  const lower = query.toLowerCase();
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(lower) ||
      country.code.toLowerCase().includes(lower) ||
      country.dialCode.includes(query)
  );
};

/**
 * Sort countries with preferred countries first
 */
export const sortCountriesWithPreferred = (
  countries: CountryData[],
  preferred: string[]
): CountryData[] => {
  if (preferred.length === 0) return countries;
  
  const preferredSet = new Set(preferred.map((c) => c.toUpperCase()));
  const preferredCountries = countries.filter((c) => preferredSet.has(c.code));
  const otherCountries = countries.filter((c) => !preferredSet.has(c.code));
  
  // Sort preferred countries by the order in the preferred array
  preferredCountries.sort(
    (a, b) => preferred.indexOf(a.code) - preferred.indexOf(b.code)
  );
  
  return [...preferredCountries, ...otherCountries];
};

/**
 * Get country by code
 */
export const getCountryByCode = (
  countries: CountryData[],
  code: string
): CountryData | undefined => {
  return countries.find((c) => c.code.toUpperCase() === code.toUpperCase());
};
