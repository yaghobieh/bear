import { PhoneInputTranslations, CountryData } from './PhoneInput.types';

/**
 * Default translations
 */
export const PHONE_INPUT_DEFAULT_TRANSLATIONS: PhoneInputTranslations = {
  placeholder: 'Phone number',
  searchCountry: 'Search country...',
  noResults: 'No countries found',
};

/**
 * Size classes
 */
export const PHONE_INPUT_SIZE_CLASSES = {
  sm: 'bear-py-1.5 bear-px-3 bear-text-sm',
  md: 'bear-py-2 bear-px-4 bear-text-sm',
  lg: 'bear-py-2.5 bear-px-5 bear-text-base',
} as const;

/**
 * Variant classes (light/dark)
 */
export const PHONE_INPUT_VARIANT_CLASSES = {
  default: 'bear-bg-white dark:bear-bg-zinc-800 bear-border-zinc-300 dark:bear-border-zinc-600',
  filled: 'bear-bg-zinc-100 dark:bear-bg-zinc-700 bear-border-transparent',
  outline: 'bear-bg-transparent bear-border-zinc-300 dark:bear-border-zinc-500',
} as const;

/**
 * Dropdown z-index
 */
export const PHONE_INPUT_DROPDOWN_Z_INDEX = 10000;

/**
 * Common countries data
 */
export const COUNTRIES: CountryData[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', format: '(###) ###-####' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', format: '#### ### ####' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', format: '(###) ###-####' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', format: '#### ### ###' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', format: '#### #######' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', format: '## ## ## ## ##' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', format: '### ### ####' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', format: '### ## ## ##' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', format: '## ### ####' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', format: '### ## ## ##' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', format: '## ### ## ##' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', format: '### #######' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', format: '##-### ## ##' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', format: '### ## ###' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', format: '## ## ## ##' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', format: '## ### ####' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', format: '### ### ###' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', format: '### ### ###' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', format: '## ### ####' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', format: '### ### ####' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', format: '### ### ###' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', format: '## ### ####' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', format: '### ### ###' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬', format: '### ### ###' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷', format: '## ### ####' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰', format: '### ### ###' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮', format: '## ### ###' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹', format: '### #####' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻', format: '## ### ###' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', format: '### ####' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', format: '##-####-####' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', format: '##-####-####' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', format: '### #### ####' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', format: '##### #####' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', format: '#### ####' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', format: '#### ####' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼', format: '### ### ###' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', format: '## ### ####' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', format: '##-### ####' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', format: '### ### ####' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', format: '### ### ####' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', format: '### ### ####' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', format: '### ###-##-##' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', format: '## ### ## ##' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', format: '### ### ## ##' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', format: '##-###-####' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', format: '## ### ####' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', format: '## ### ####' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', format: '### ### ####' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', format: '## ### ####' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', format: '### ### ####' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', format: '### ### ###' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', format: '(##) #####-####' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', format: '## #### ####' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', format: '## ####-####' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', format: '### ### ####' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', format: '# #### ####' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', format: '### ### ###' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', format: '### ### ####' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', format: '## ### ####' },
];

/**
 * Default country code
 */
export const DEFAULT_COUNTRY_CODE = 'US';
