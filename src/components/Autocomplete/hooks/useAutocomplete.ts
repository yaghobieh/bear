import { useEffect, useRef, useState } from 'react';
import { BOOLEAN_FALSE, NEGATIVE_ONE, ONE, ZERO } from '@const';
import { useClickOutsideMultiple, useFixedAnchorPosition } from '@hooks';
import { defaultFilter } from '../Autocomplete.utils';
import type { AutocompleteOption, AutocompleteProps } from '../Autocomplete.types';

type UseAutocompleteArgs = Pick<
  AutocompleteProps,
  'options' | 'value' | 'onChange' | 'onSelect' | 'disabled' | 'freeSolo' | 'loading' | 'filterOptions'
>;

/**
 * useAutocomplete — open state, highlight, overlay position, and list keyboard navigation.
 */
export const useAutocomplete = (args: UseAutocompleteArgs) => {
  const {
    options,
    value,
    onChange,
    onSelect,
    disabled = BOOLEAN_FALSE,
    freeSolo = BOOLEAN_FALSE,
    loading = BOOLEAN_FALSE,
    filterOptions = defaultFilter,
  } = args;

  const [isOpen, setIsOpen] = useState(BOOLEAN_FALSE);
  const [highlightedIndex, setHighlightedIndex] = useState(NEGATIVE_ONE);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = filterOptions(options, value ?? '');
  const showListPanel = isOpen && !disabled && filteredOptions.length > ZERO;
  const showEmptyPanel = isOpen && !disabled && filteredOptions.length === ZERO && Boolean(value) && !loading;

  const { style: overlayStyle, ready } = useFixedAnchorPosition({
    anchorRef: inputWrapRef,
    open: showListPanel || showEmptyPanel,
    matchWidth: true,
  });

  useClickOutsideMultiple(
    [containerRef, panelRef],
    () => setIsOpen(BOOLEAN_FALSE),
    { enabled: isOpen }
  );

  useEffect(() => {
    setHighlightedIndex(NEGATIVE_ONE);
  }, [value]);

  useEffect(() => {
    if (highlightedIndex < ZERO || !listRef.current) {
      return;
    }
    const item = listRef.current.children[highlightedIndex] as HTMLElement;
    if (item) {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleSelect = (option: AutocompleteOption) => {
    onChange?.(option.label);
    onSelect?.(option);
    setIsOpen(BOOLEAN_FALSE);
    inputRef.current?.blur();
  };

  const highlightNext = () => {
    setHighlightedIndex((prev) =>
      prev < filteredOptions.length - ONE ? prev + ONE : ZERO
    );
  };

  const highlightPrevious = () => {
    setHighlightedIndex((prev) =>
      prev > ZERO ? prev - ONE : filteredOptions.length - ONE
    );
  };

  const confirmHighlight = () => {
    if (highlightedIndex >= ZERO && filteredOptions[highlightedIndex]) {
      handleSelect(filteredOptions[highlightedIndex]);
      return;
    }
    if (freeSolo && value) {
      setIsOpen(BOOLEAN_FALSE);
    }
  };

  return {
    isOpen,
    setIsOpen,
    highlightedIndex,
    containerRef,
    inputWrapRef,
    panelRef,
    inputRef,
    listRef,
    filteredOptions,
    showListPanel,
    showEmptyPanel,
    overlayStyle,
    ready,
    handleSelect,
    highlightNext,
    highlightPrevious,
    confirmHighlight,
  };
};
