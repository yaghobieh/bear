import { FC, useRef, useState, useCallback, useMemo, KeyboardEvent, ChangeEvent } from 'react';
import { cn } from '@utils';
import type { CodeEditorProps } from './CodeEditor.types';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_TAB_SIZE,
  GUTTER_WIDTH,
  LINE_HEIGHT,
  DARK_THEME,
  LIGHT_THEME,
  AUTO_CLOSE_PAIRS,
} from './CodeEditor.const';
import { tokenizeLine } from './CodeEditor.utils';

/**
 * CodeEditor - Syntax-highlighted code editor with line numbers
 *
 * @description
 * Zero-dependency code editor with syntax highlighting for multiple
 * languages, line numbers, auto-indent, bracket pairing, and theming.
 *
 * @example
 * ```tsx
 * <CodeEditor
 *   value={code}
 *   onChange={setCode}
 *   language="typescript"
 *   theme="dark"
 *   showLineNumbers
 *   height={400}
 * />
 * ```
 */
export const CodeEditor: FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'typescript',
  theme = 'dark',
  customTheme,
  placeholder = 'Start typing...',
  showLineNumbers = true,
  showGutter = true,
  highlightActiveLine = true,
  readOnly = false,
  fontSize = DEFAULT_FONT_SIZE,
  fontFamily = DEFAULT_FONT_FAMILY,
  tabSize = DEFAULT_TAB_SIZE,
  autoIndent = true,
  autoCloseBrackets = true,
  wordWrap = false,
  minHeight,
  maxHeight,
  height,
  className,
  style,
  testId,
  onFocus,
  onBlur,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const baseTheme = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const editorTheme = useMemo(
    () => ({
      ...baseTheme,
      ...customTheme,
      tokens: { ...baseTheme.tokens, ...customTheme?.tokens },
    }),
    [theme, customTheme]
  );

  const lines = useMemo(() => value.split('\n'), [value]);

  // Tokenize all lines
  const highlightedLines = useMemo(
    () => lines.map((line) => tokenizeLine(line, language)),
    [lines, language]
  );

  // Track active line from cursor
  const updateActiveLine = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const before = ta.value.substring(0, ta.selectionStart);
    setActiveLine(before.split('\n').length - 1);
  }, []);

  // Handle key press for auto-indent and bracket closing
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;
      const ta = textareaRef.current;
      if (!ta) return;

      const { selectionStart, selectionEnd } = ta;

      // Tab key
      if (e.key === 'Tab') {
        e.preventDefault();
        const spaces = ' '.repeat(tabSize);
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionEnd);
        const newValue = before + spaces + after;
        onChange?.(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = selectionStart + tabSize;
        });
        return;
      }

      // Enter key - auto-indent
      if (e.key === 'Enter' && autoIndent) {
        e.preventDefault();
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionEnd);
        const currentLine = before.split('\n').pop() ?? '';
        const indent = currentLine.match(/^\s*/)?.[0] ?? '';
        const lastChar = before.trim().slice(-1);
        const extraIndent = ['{', '(', '[', ':'].includes(lastChar) ? ' '.repeat(tabSize) : '';
        const newValue = before + '\n' + indent + extraIndent + after;
        onChange?.(newValue);
        requestAnimationFrame(() => {
          const pos = selectionStart + 1 + indent.length + extraIndent.length;
          ta.selectionStart = ta.selectionEnd = pos;
        });
        return;
      }

      // Auto-close brackets
      if (autoCloseBrackets && AUTO_CLOSE_PAIRS[e.key]) {
        e.preventDefault();
        const closing = AUTO_CLOSE_PAIRS[e.key];
        const before = value.substring(0, selectionStart);
        const selected = value.substring(selectionStart, selectionEnd);
        const after = value.substring(selectionEnd);

        if (selected) {
          const newValue = before + e.key + selected + closing + after;
          onChange?.(newValue);
          requestAnimationFrame(() => {
            ta.selectionStart = selectionStart + 1;
            ta.selectionEnd = selectionEnd + 1;
          });
        } else {
          const newValue = before + e.key + closing + after;
          onChange?.(newValue);
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = selectionStart + 1;
          });
        }
        return;
      }
    },
    [value, onChange, readOnly, tabSize, autoIndent, autoCloseBrackets]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (readOnly) return;
      onChange?.(e.target.value);
    },
    [onChange, readOnly]
  );

  const handleScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    setScrollTop(ta.scrollTop);
    setScrollLeft(ta.scrollLeft);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const lineHeightPx = fontSize * LINE_HEIGHT;

  return (
    <div
      className={cn(
        'bear-relative bear-overflow-hidden bear-rounded-lg bear-font-mono',
        'bear-border',
        isFocused ? 'bear-ring-2 bear-ring-offset-1' : '',
        className
      )}
      style={{
        background: editorTheme.background,
        borderColor: editorTheme.gutterBorder,
        fontFamily,
        fontSize,
        lineHeight: LINE_HEIGHT,
        minHeight,
        maxHeight,
        height,
        '--bear-editor-ring': 'var(--bear-primary-500)',
        ...style,
      } as React.CSSProperties}
      data-testid={testId}
    >
      <div className="bear-relative bear-flex bear-h-full">
        {/* Line numbers gutter */}
        {showGutter && showLineNumbers && (
          <div
            className="bear-flex-shrink-0 bear-select-none bear-text-right bear-pr-3 bear-overflow-hidden"
            style={{
              width: GUTTER_WIDTH,
              background: editorTheme.gutterBackground,
              borderRight: `1px solid ${editorTheme.gutterBorder}`,
              paddingTop: 12,
              transform: `translateY(-${scrollTop}px)`,
            }}
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div
                key={i}
                style={{
                  height: lineHeightPx,
                  color:
                    i === activeLine
                      ? editorTheme.lineNumberActive
                      : editorTheme.lineNumber,
                  fontWeight: i === activeLine ? 600 : 400,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code area */}
        <div className="bear-relative bear-flex-1 bear-overflow-hidden">
          {/* Syntax highlight overlay */}
          <div
            className="bear-absolute bear-inset-0 bear-pointer-events-none bear-overflow-hidden"
            style={{
              padding: 12,
              paddingLeft: showGutter && !showLineNumbers ? 12 : 16,
              transform: `translate(-${scrollLeft}px, -${scrollTop}px)`,
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: wordWrap ? 'break-all' : 'normal',
            }}
            aria-hidden="true"
          >
            {highlightedLines.map((tokens, lineIdx) => (
              <div
                key={lineIdx}
                style={{
                  height: lineHeightPx,
                  background:
                    highlightActiveLine && lineIdx === activeLine && isFocused
                      ? editorTheme.selection
                      : 'transparent',
                }}
              >
                {tokens.map((token, tokenIdx) => (
                  <span
                    key={tokenIdx}
                    style={{
                      color: editorTheme.tokens[token.type] ?? editorTheme.foreground,
                    }}
                  >
                    {token.value}
                  </span>
                ))}
                {tokens.length === 0 && '\u00A0'}
              </div>
            ))}
          </div>

          {/* Actual textarea (transparent, handles input) */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={updateActiveLine}
            onKeyUp={updateActiveLine}
            readOnly={readOnly}
            placeholder={!value ? placeholder : undefined}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="bear-w-full bear-h-full bear-resize-none bear-outline-none"
            style={{
              padding: 12,
              paddingLeft: showGutter && !showLineNumbers ? 12 : 16,
              background: 'transparent',
              color: 'transparent',
              caretColor: editorTheme.cursor,
              fontFamily,
              fontSize,
              lineHeight: LINE_HEIGHT,
              tabSize,
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: wordWrap ? 'break-all' : 'normal',
              minHeight: minHeight ?? 100,
              maxHeight,
              height: height ?? 'auto',
            }}
          />
        </div>
      </div>

      {/* Language badge */}
      <div
        className="bear-absolute bear-bottom-2 bear-right-3 bear-text-xs bear-font-medium bear-px-2 bear-py-0.5 bear-rounded bear-select-none"
        style={{
          color: editorTheme.lineNumber,
          background: editorTheme.gutterBackground,
        }}
      >
        {language}
      </div>
    </div>
  );
};
