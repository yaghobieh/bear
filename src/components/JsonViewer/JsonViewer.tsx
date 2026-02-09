import { FC, useState, useMemo, useCallback } from 'react';
import { cn } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { BearIcons } from '../Icon';
import type { JsonViewerProps, JsonNodeProps } from './JsonViewer.types';
import { DEFAULT_EXPAND_DEPTH, DEFAULT_THEME, DARK_THEME } from './JsonViewer.const';

/**
 * JsonNode - Renders a single JSON node
 */
const JsonNode: FC<JsonNodeProps> = ({
  name,
  value,
  path,
  depth,
  defaultExpandDepth,
  showDataTypes,
  showArrayIndices,
  onValueClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < defaultExpandDepth);
  const { mode } = useBear();
  const theme = mode === 'dark' ? DARK_THEME : DEFAULT_THEME;

  const type = useMemo(() => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }, [value]);

  const isExpandable = type === 'object' || type === 'array';
  const isEmpty = isExpandable && Object.keys(value as object).length === 0;

  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleValueClick = useCallback(() => {
    onValueClick?.(path, value);
  }, [path, value, onValueClick]);

  const renderValue = () => {
    switch (type) {
      case 'string':
        return (
          <span 
            style={{ color: theme.string }} 
            className="cursor-pointer hover:underline"
            onClick={handleValueClick}
          >
            "{value as string}"
          </span>
        );
      case 'number':
        return (
          <span 
            style={{ color: theme.number }}
            className="cursor-pointer hover:underline"
            onClick={handleValueClick}
          >
            {String(value)}
          </span>
        );
      case 'boolean':
        return (
          <span 
            style={{ color: theme.boolean }}
            className="cursor-pointer hover:underline"
            onClick={handleValueClick}
          >
            {String(value)}
          </span>
        );
      case 'null':
        return (
          <span 
            style={{ color: theme.null }}
            className="cursor-pointer hover:underline"
            onClick={handleValueClick}
          >
            null
          </span>
        );
      default:
        return null;
    }
  };

  const renderTypeLabel = () => {
    if (!showDataTypes) return null;
    
    const label = type === 'array' 
      ? `Array(${(value as unknown[]).length})` 
      : type === 'object' 
        ? `Object` 
        : type;

    return (
      <span className="text-[10px] opacity-50 ml-1">
        {label}
      </span>
    );
  };

  if (!isExpandable) {
    return (
      <div className="flex items-center gap-1 py-0.5">
        <span className="w-4" /> {/* Indent spacer */}
        {(showArrayIndices || typeof name === 'string') && (
          <>
            <span style={{ color: theme.key }}>
              {typeof name === 'string' ? `"${name}"` : name}
            </span>
            <span style={{ color: theme.punctuation }}>:</span>
          </>
        )}
        {renderValue()}
        {renderTypeLabel()}
      </div>
    );
  }

  const entries = Object.entries(value as object);
  const openBracket = type === 'array' ? '[' : '{';
  const closeBracket = type === 'array' ? ']' : '}';

  return (
    <div className="py-0.5">
      <div 
        className="flex items-center gap-1 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 -mx-1"
        onClick={handleToggle}
      >
        <span className="w-4 flex items-center justify-center text-gray-400">
          {isEmpty ? null : isExpanded ? (
            <BearIcons.ChevronDownIcon size={12} />
          ) : (
            <BearIcons.ChevronRightIcon size={12} />
          )}
        </span>
        {(showArrayIndices || typeof name === 'string') && name !== '' && (
          <>
            <span style={{ color: theme.key }}>
              {typeof name === 'string' ? `"${name}"` : name}
            </span>
            <span style={{ color: theme.punctuation }}>:</span>
          </>
        )}
        <span style={{ color: theme.bracket }}>{openBracket}</span>
        {!isExpanded && !isEmpty && (
          <span className="text-gray-400 text-xs">...</span>
        )}
        {(!isExpanded || isEmpty) && (
          <span style={{ color: theme.bracket }}>{closeBracket}</span>
        )}
        {renderTypeLabel()}
      </div>
      
      {isExpanded && !isEmpty && (
        <div className="ml-4 border-l border-gray-200 dark:border-gray-700 pl-2">
          {entries.map(([key, val], index) => (
            <JsonNode
              key={key}
              name={type === 'array' ? index : key}
              value={val}
              path={[...path, key]}
              depth={depth + 1}
              defaultExpandDepth={defaultExpandDepth}
              showDataTypes={showDataTypes}
              showArrayIndices={showArrayIndices}
              onValueClick={onValueClick}
            />
          ))}
        </div>
      )}
      
      {isExpanded && !isEmpty && (
        <div className="flex items-center">
          <span className="w-4" />
          <span style={{ color: theme.bracket }}>{closeBracket}</span>
        </div>
      )}
    </div>
  );
};

/**
 * JsonViewer - Pretty-print and explore JSON data
 * 
 * @example
 * ```tsx
 * <JsonViewer 
 *   data={{ name: 'John', age: 30, active: true }}
 *   defaultExpandDepth={3}
 *   showDataTypes
 *   showCopyButton
 * />
 * ```
 */
export const JsonViewer: FC<JsonViewerProps> = ({
  data,
  defaultExpandDepth = DEFAULT_EXPAND_DEPTH,
  showDataTypes = false,
  showArrayIndices = true,
  showCopyButton = true,
  rootName = 'root',
  onValueClick,
  onCopy,
  className,
  testId,
}) => {
  const { mode } = useBear();
  const theme = mode === 'dark' ? DARK_THEME : DEFAULT_THEME;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      onCopy?.(data);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [data, onCopy]);

  return (
    <div 
      className={cn(
        'Bear-JsonViewer',
        'rounded-lg overflow-hidden font-mono text-sm',
        className
      )}
      style={{ backgroundColor: theme.background }}
      data-testid={testId}
    >
      {/* Header */}
      {showCopyButton && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <Typography variant="caption" className="opacity-60">
            JSON
          </Typography>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="!py-1 !px-2 !text-xs"
          >
            {copied ? (
              <>
                <BearIcons.CheckIcon size={12} className="mr-1" />
                Copied!
              </>
            ) : (
              <>
                <BearIcons.CopyIcon size={12} className="mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Content */}
      <div className="p-3 overflow-x-auto">
        <JsonNode
          name={rootName || ''}
          value={data}
          path={[]}
          depth={0}
          defaultExpandDepth={defaultExpandDepth}
          showDataTypes={showDataTypes}
          showArrayIndices={showArrayIndices}
          onValueClick={onValueClick}
        />
      </div>
    </div>
  );
};

export default JsonViewer;
