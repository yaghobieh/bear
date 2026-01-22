import { FC, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import type { TransferListProps, TransferListItem } from './TransferList.types';

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const DoubleChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 18 12 12 6 6" />
    <polyline points="12 18 18 12 12 6" />
  </svg>
);

const DoubleChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 18 12 12 18 6" />
    <polyline points="12 18 6 12 12 6" />
  </svg>
);

/**
 * TransferList - Two-panel list for transferring items between collections
 * 
 * @example
 * ```tsx
 * const [left, setLeft] = useState([{ id: 1, label: 'Item 1' }]);
 * const [right, setRight] = useState([]);
 * 
 * <TransferList
 *   leftItems={left}
 *   rightItems={right}
 *   leftTitle="Available"
 *   rightTitle="Selected"
 *   onChange={(l, r) => { setLeft(l); setRight(r); }}
 * />
 * ```
 */
export const TransferList: FC<TransferListProps> = ({
  leftItems,
  rightItems,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  searchable = true,
  leftSearchPlaceholder = 'Search...',
  rightSearchPlaceholder = 'Search...',
  showCount = true,
  showCheckboxes = true,
  maxHeight = 300,
  onChange,
  onMoveRight,
  onMoveLeft,
  disabled = false,
  className,
  testId,
  ...props
}) => {
  const [leftChecked, setLeftChecked] = useState<Set<string | number>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string | number>>(new Set());
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  // Filter items based on search
  const filteredLeft = useMemo(() => 
    leftItems.filter(item => 
      item.label.toLowerCase().includes(leftSearch.toLowerCase())
    ),
  [leftItems, leftSearch]);

  const filteredRight = useMemo(() => 
    rightItems.filter(item => 
      item.label.toLowerCase().includes(rightSearch.toLowerCase())
    ),
  [rightItems, rightSearch]);

  // Toggle item selection
  const toggleLeft = useCallback((id: string | number) => {
    setLeftChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleRight = useCallback((id: string | number) => {
    setRightChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Move selected items to right
  const moveRight = useCallback(() => {
    const itemsToMove = leftItems.filter(item => leftChecked.has(item.id) && !item.disabled);
    const newLeft = leftItems.filter(item => !leftChecked.has(item.id));
    const newRight = [...rightItems, ...itemsToMove];
    
    setLeftChecked(new Set());
    onChange?.(newLeft, newRight);
    onMoveRight?.(itemsToMove);
  }, [leftItems, rightItems, leftChecked, onChange, onMoveRight]);

  // Move all items to right
  const moveAllRight = useCallback(() => {
    const itemsToMove = leftItems.filter(item => !item.disabled);
    const newRight = [...rightItems, ...itemsToMove];
    
    setLeftChecked(new Set());
    onChange?.([], newRight);
    onMoveRight?.(itemsToMove);
  }, [leftItems, rightItems, onChange, onMoveRight]);

  // Move selected items to left
  const moveLeft = useCallback(() => {
    const itemsToMove = rightItems.filter(item => rightChecked.has(item.id) && !item.disabled);
    const newRight = rightItems.filter(item => !rightChecked.has(item.id));
    const newLeft = [...leftItems, ...itemsToMove];
    
    setRightChecked(new Set());
    onChange?.(newLeft, newRight);
    onMoveLeft?.(itemsToMove);
  }, [leftItems, rightItems, rightChecked, onChange, onMoveLeft]);

  // Move all items to left
  const moveAllLeft = useCallback(() => {
    const itemsToMove = rightItems.filter(item => !item.disabled);
    const newLeft = [...leftItems, ...itemsToMove];
    
    setRightChecked(new Set());
    onChange?.(newLeft, []);
    onMoveLeft?.(itemsToMove);
  }, [leftItems, rightItems, onChange, onMoveLeft]);

  const renderPanel = (
    items: TransferListItem[],
    filteredItems: TransferListItem[],
    checked: Set<string | number>,
    toggleFn: (id: string | number) => void,
    title: string,
    search: string,
    setSearch: (value: string) => void,
    placeholder: string
  ) => (
    <div className="ember-flex-1 ember-min-w-0 ember-border ember-border-gray-200 dark:ember-border-gray-700 ember-rounded-lg ember-overflow-hidden">
      <div className="ember-px-4 ember-py-3 ember-bg-gray-50 dark:ember-bg-gray-800/50 ember-border-b ember-border-gray-200 dark:ember-border-gray-700">
        <div className="ember-flex ember-items-center ember-justify-between">
          <span className="ember-font-medium ember-text-gray-900 dark:ember-text-gray-100">
            {title}
          </span>
          {showCount && (
            <span className="ember-text-sm ember-text-gray-500 dark:ember-text-gray-400">
              {checked.size}/{items.length}
            </span>
          )}
        </div>
        
        {searchable && (
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            size="sm"
            className="ember-mt-2"
            disabled={disabled}
          />
        )}
      </div>

      <div 
        className="ember-overflow-y-auto"
        style={{ maxHeight }}
      >
        {filteredItems.length === 0 ? (
          <div className="ember-px-4 ember-py-8 ember-text-center ember-text-gray-500 dark:ember-text-gray-400 ember-text-sm">
            {search ? 'No items match your search' : 'No items'}
          </div>
        ) : (
          <ul className="ember-list-none ember-m-0 ember-p-0">
            {filteredItems.map(item => (
              <li
                key={item.id}
                className={cn(
                  'ember-flex ember-items-center ember-gap-3 ember-px-4 ember-py-2',
                  'ember-border-b ember-border-gray-100 dark:ember-border-gray-800 last:ember-border-b-0',
                  !item.disabled && !disabled && 'hover:ember-bg-gray-50 dark:hover:ember-bg-gray-800/30 ember-cursor-pointer',
                  item.disabled && 'ember-opacity-50 ember-cursor-not-allowed'
                )}
                onClick={() => !item.disabled && !disabled && toggleFn(item.id)}
              >
                {showCheckboxes && (
                  <Checkbox
                    checked={checked.has(item.id)}
                    onChange={() => toggleFn(item.id)}
                    disabled={item.disabled || disabled}
                    size="sm"
                  />
                )}
                
                {item.icon && (
                  <span className="ember-flex-shrink-0 ember-text-gray-500">
                    {item.icon}
                  </span>
                )}
                
                <div className="ember-flex-1 ember-min-w-0">
                  <div className="ember-text-sm ember-text-gray-900 dark:ember-text-gray-100 ember-truncate">
                    {item.label}
                  </div>
                  {item.secondary && (
                    <div className="ember-text-xs ember-text-gray-500 dark:ember-text-gray-400 ember-truncate">
                      {item.secondary}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const hasLeftChecked = leftChecked.size > 0;
  const hasRightChecked = rightChecked.size > 0;
  const hasLeftItems = leftItems.some(item => !item.disabled);
  const hasRightItems = rightItems.some(item => !item.disabled);

  return (
    <div
      className={cn(
        'ember-flex ember-items-stretch ember-gap-4',
        disabled && 'ember-opacity-60 ember-pointer-events-none',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {renderPanel(
        leftItems,
        filteredLeft,
        leftChecked,
        toggleLeft,
        leftTitle,
        leftSearch,
        setLeftSearch,
        leftSearchPlaceholder
      )}

      <div className="ember-flex ember-flex-col ember-justify-center ember-gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={moveAllRight}
          disabled={disabled || !hasLeftItems}
          aria-label="Move all to right"
          className="ember-px-2"
        >
          <DoubleChevronRightIcon />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={moveRight}
          disabled={disabled || !hasLeftChecked}
          aria-label="Move selected to right"
          className="ember-px-2"
        >
          <ChevronRightIcon />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={moveLeft}
          disabled={disabled || !hasRightChecked}
          aria-label="Move selected to left"
          className="ember-px-2"
        >
          <ChevronLeftIcon />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={moveAllLeft}
          disabled={disabled || !hasRightItems}
          aria-label="Move all to left"
          className="ember-px-2"
        >
          <DoubleChevronLeftIcon />
        </Button>
      </div>

      {renderPanel(
        rightItems,
        filteredRight,
        rightChecked,
        toggleRight,
        rightTitle,
        rightSearch,
        setRightSearch,
        rightSearchPlaceholder
      )}
    </div>
  );
};

export default TransferList;

