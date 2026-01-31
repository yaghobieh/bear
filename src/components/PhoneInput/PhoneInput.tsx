import { FC, useState, useRef, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { PhoneInputProps, CountryData } from './PhoneInput.types';
import {
  PHONE_INPUT_DEFAULT_TRANSLATIONS,
  PHONE_INPUT_SIZE_CLASSES,
  PHONE_INPUT_VARIANT_CLASSES,
  PHONE_INPUT_DROPDOWN_Z_INDEX,
  COUNTRIES,
  DEFAULT_COUNTRY_CODE,
} from './PhoneInput.const';
import {
  formatPhoneNumber,
  parsePhoneDigits,
  createPhoneValue,
  filterCountries,
  sortCountriesWithPreferred,
  getCountryByCode,
} from './PhoneInput.utils';

/**
 * PhoneInput - International phone number input
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   value={phoneValue}
 *   onChange={setPhoneValue}
 *   defaultCountry="US"
 *   preferredCountries={['US', 'GB', 'CA']}
 * />
 * ```
 */
export const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountry = DEFAULT_COUNTRY_CODE,
  placeholder,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  size = 'md',
  variant = 'default',
  onlyCountries,
  excludeCountries,
  preferredCountries = [],
  searchable = true,
  showFlags = true,
  showDialCode = true,
  className,
  testId,
  translations,
  icon,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const t = useMemo(() => ({
    ...PHONE_INPUT_DEFAULT_TRANSLATIONS,
    ...translations,
  }), [translations]);

  // Filter and sort countries
  const availableCountries = useMemo(() => {
    let countries = [...COUNTRIES];
    
    if (onlyCountries?.length) {
      const onlySet = new Set(onlyCountries.map((c) => c.toUpperCase()));
      countries = countries.filter((c) => onlySet.has(c.code));
    }
    
    if (excludeCountries?.length) {
      const excludeSet = new Set(excludeCountries.map((c) => c.toUpperCase()));
      countries = countries.filter((c) => !excludeSet.has(c.code));
    }
    
    return sortCountriesWithPreferred(countries, preferredCountries);
  }, [onlyCountries, excludeCountries, preferredCountries]);

  // Current selected country
  const selectedCountry = useMemo(() => {
    const code = value?.countryCode || defaultCountry;
    return getCountryByCode(availableCountries, code) || availableCountries[0];
  }, [value?.countryCode, defaultCountry, availableCountries]);

  // Filtered countries for dropdown
  const filteredCountries = useMemo(() => {
    return filterCountries(availableCountries, searchQuery);
  }, [availableCountries, searchQuery]);

  // Initialize input value from value prop
  useEffect(() => {
    if (value?.number !== undefined) {
      const formatted = formatPhoneNumber(value.number, selectedCountry?.format);
      setInputValue(formatted);
    }
  }, [value?.number, selectedCountry?.format]);

  // Calculate dropdown position
  useEffect(() => {
    if (isDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      setDropdownPosition({
        top: rect.bottom + scrollTop + 4,
        left: rect.left + scrollLeft,
      });
    }
  }, [isDropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen, searchable]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if ((target as Element).closest?.('[data-bear-phone-dropdown]')) return;
      setIsDropdownOpen(false);
      setSearchQuery('');
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = useCallback((country: CountryData) => {
    const newValue = createPhoneValue(country, value?.number || inputValue);
    onChange?.(newValue);
    setIsDropdownOpen(false);
    setSearchQuery('');
    inputRef.current?.focus();
  }, [value?.number, inputValue, onChange]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = parsePhoneDigits(e.target.value);
    const formatted = formatPhoneNumber(raw, selectedCountry?.format);
    setInputValue(formatted);
    
    if (selectedCountry) {
      const newValue = createPhoneValue(selectedCountry, raw);
      onChange?.(newValue);
    }
  }, [selectedCountry, onChange]);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-PhoneInput bear-relative', className)}
      data-testid={testId}
    >
      {label && (
        <label className="Bear-PhoneInput__label bear-block bear-text-sm bear-font-medium bear-text-zinc-700 dark:bear-text-zinc-300 bear-mb-1.5">
          {label}
          {required && <span className="bear-text-red-500 bear-ml-0.5">*</span>}
        </label>
      )}

      <div className={cn(
        'Bear-PhoneInput__wrapper bear-flex bear-items-center bear-rounded-lg bear-border bear-transition-colors',
        PHONE_INPUT_VARIANT_CLASSES[variant],
        error ? 'bear-border-red-500' : 'focus-within:bear-border-pink-500',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed'
      )}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={cn(
            'Bear-PhoneInput__country-trigger bear-flex bear-items-center bear-gap-1 bear-border-r bear-border-zinc-300 dark:bear-border-zinc-600 bear-shrink-0 bear-text-gray-900 dark:bear-text-white',
            PHONE_INPUT_SIZE_CLASSES[size]
          )}
        >
          {showFlags && selectedCountry && (
            <span className="Bear-PhoneInput__flag bear-text-lg">{selectedCountry.flag}</span>
          )}
          {showDialCode && selectedCountry && (
            <span className="Bear-PhoneInput__dial-code bear-text-gray-600 dark:bear-text-zinc-400">{selectedCountry.dialCode}</span>
          )}
          {icon ?? (
            <svg
              className={cn(
                'Bear-PhoneInput__chevron bear-w-4 bear-h-4 bear-text-gray-500 dark:bear-text-zinc-400 bear-transition-transform',
                isDropdownOpen && 'bear-rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        <input
          ref={inputRef}
          type="tel"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder || t.placeholder}
          disabled={disabled}
          className={cn(
            'Bear-PhoneInput__input bear-flex-1 bear-bg-transparent bear-border-0 bear-outline-none bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-400 dark:placeholder:bear-text-zinc-500',
            PHONE_INPUT_SIZE_CLASSES[size]
          )}
        />
      </div>

      {error && <p className="Bear-PhoneInput__error bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {helperText && !error && <p className="Bear-PhoneInput__helper bear-mt-1 bear-text-xs bear-text-zinc-500 dark:bear-text-zinc-400">{helperText}</p>}

      {isDropdownOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-bear-phone-dropdown
          className="Bear-PhoneInput__dropdown bear-fixed bear-w-64 bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-overflow-hidden"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: PHONE_INPUT_DROPDOWN_Z_INDEX }}
        >
          {searchable && (
            <div className="Bear-PhoneInput__search bear-p-2 bear-border-b bear-border-zinc-200 dark:bear-border-zinc-700">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchCountry}
                className="bear-w-full bear-px-3 bear-py-2 bear-bg-gray-50 dark:bear-bg-zinc-700 bear-border bear-border-zinc-200 dark:bear-border-zinc-600 bear-rounded bear-text-sm bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-400 dark:placeholder:bear-text-zinc-500 bear-outline-none focus:bear-border-pink-500"
              />
            </div>
          )}

          <div className="Bear-PhoneInput__country-list bear-max-h-60 bear-overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="bear-px-3 bear-py-4 bear-text-center bear-text-sm bear-text-gray-500 dark:bear-text-zinc-500">
                {t.noResults}
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    'Bear-PhoneInput__country-option bear-w-full bear-flex bear-items-center bear-gap-3 bear-px-3 bear-py-2 bear-text-left bear-text-sm bear-transition-colors',
                    selectedCountry?.code === country.code
                      ? 'bear-bg-pink-500/20 bear-text-pink-600 dark:bear-text-pink-400'
                      : 'bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700'
                  )}
                >
                  {showFlags && (
                    <span className="Bear-PhoneInput__country-flag bear-text-lg">{country.flag}</span>
                  )}
                  <span className="Bear-PhoneInput__country-name bear-flex-1">{country.name}</span>
                  <span className="Bear-PhoneInput__country-dial bear-text-gray-500 dark:bear-text-zinc-500">{country.dialCode}</span>
                </button>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
