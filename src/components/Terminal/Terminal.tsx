import { FC, useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import { Spinner } from '../Spinner';
import type { TerminalProps, TerminalLine } from './Terminal.types';
import { TERMINAL_DEFAULTS, LINE_TYPE_COLORS, TERMINAL_THEMES } from './Terminal.const';

/**
 * Terminal - Console/terminal emulator component
 * 
 * @example
 * ```tsx
 * const [lines, setLines] = useState<TerminalLine[]>([
 *   { id: '1', type: 'output', content: 'Welcome to Bear Terminal!' },
 * ]);
 * 
 * <Terminal
 *   lines={lines}
 *   onCommand={(cmd) => {
 *     setLines([
 *       ...lines,
 *       { id: Date.now().toString(), type: 'input', content: cmd },
 *       { id: (Date.now() + 1).toString(), type: 'output', content: `Executed: ${cmd}` },
 *     ]);
 *   }}
 *   user="bear"
 *   host="forge"
 * />
 * ```
 */
export const Terminal: FC<TerminalProps> = ({
  lines,
  onCommand,
  cwd = TERMINAL_DEFAULTS.CWD,
  user = TERMINAL_DEFAULTS.USER,
  host = TERMINAL_DEFAULTS.HOST,
  prompt: customPrompt,
  title = TERMINAL_DEFAULTS.TITLE,
  showHeader = true,
  showLineNumbers = false,
  showTimestamps = false,
  readOnly = false,
  height = TERMINAL_DEFAULTS.HEIGHT,
  theme = 'dark',
  history: externalHistory,
  onHistoryChange,
  autoScroll = true,
  className,
  testId,
  isLoading = false,
}) => {
  const colors = TERMINAL_THEMES[theme];
  const [inputValue, setInputValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [internalHistory, setInternalHistory] = useState<string[]>([]);
  
  const history = externalHistory ?? internalHistory;
  const setHistory = onHistoryChange ?? setInternalHistory;
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, autoScroll]);

  // Focus input on click
  const handleContainerClick = useCallback(() => {
    if (!readOnly) {
      inputRef.current?.focus();
    }
  }, [readOnly]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim() && onCommand) {
      onCommand(inputValue.trim());
      setHistory([...history, inputValue.trim()]);
      setHistoryIndex(-1);
      setInputValue('');
    }
  }, [inputValue, onCommand, history, setHistory]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(history[newIndex]);
        }
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      setInputValue('');
      setHistoryIndex(-1);
    }
  }, [handleSubmit, history, historyIndex]);

  const renderPrompt = () => {
    if (customPrompt) return customPrompt;
    return (
      <>
        <span style={{ color: colors.prompt }}>{user}@{host}</span>
        <span className="opacity-50">:</span>
        <span className="text-blue-400">{cwd}</span>
        <span className="opacity-50">$</span>
      </>
    );
  };

  const renderLine = (line: TerminalLine, index: number) => {
    const lineColor = LINE_TYPE_COLORS[line.type];
    
    return (
      <div 
        key={line.id} 
        className="flex gap-2 py-0.5 hover:bg-white/5"
      >
        {showLineNumbers && (
          <span className="opacity-30 w-8 text-right select-none">
            {index + 1}
          </span>
        )}
        {showTimestamps && line.timestamp && (
          <span className="opacity-30 select-none">
            [{line.timestamp.toLocaleTimeString()}]
          </span>
        )}
        {line.type === 'input' ? (
          <div className="flex gap-2">
            <span className="flex gap-1 select-none">
              {line.prefix || renderPrompt()}
            </span>
            <span>{line.content}</span>
          </div>
        ) : (
          <span style={{ color: lineColor }}>{line.content}</span>
        )}
      </div>
    );
  };

  return (
    <div 
      className={cn(
        'Bear-Terminal',
        'rounded-lg overflow-hidden font-mono text-sm',
        className
      )}
      style={{ 
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      data-testid={testId}
      onClick={handleContainerClick}
    >
      {/* Header */}
      {showHeader && (
        <div 
          className="flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: colors.header, borderBottom: `1px solid ${colors.border}` }}
        >
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          <Typography variant="caption" className="flex-1 text-center opacity-60">
            {title}
          </Typography>
          
          <div className="w-14" /> {/* Spacer for symmetry */}
        </div>
      )}
      
      {/* Content */}
      <div 
        ref={scrollRef}
        className="overflow-y-auto p-4"
        style={{ height: showHeader ? 'calc(100% - 40px)' : '100%' }}
      >
        {/* Lines */}
        {lines.map((line, index) => renderLine(line, index))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 py-0.5">
            <Spinner size="sm" />
            <span className="opacity-50">Processing...</span>
          </div>
        )}
        
        {/* Input line */}
        {!readOnly && (
          <div className="flex gap-2 py-0.5">
            <span className="flex gap-1 select-none">
              {renderPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-current"
              style={{ color: 'inherit' }}
              autoComplete="off"
              spellCheck={false}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
