import { forwardRef, useState } from 'react';
import { cn } from '@utils';
import { CodeBlockProps } from './CodeBlock.types';
import { Typography } from '../Typography';

// CSS class constants
const CODEBLOCK_ROOT_CLASSES = 'Bear-CodeBlock bear-rounded-lg bear-overflow-hidden';
const CODEBLOCK_ROOT_LIGHT = 'bear-bg-white bear-text-gray-900 bear-border bear-border-gray-200';
const CODEBLOCK_ROOT_DARK = 'bear-bg-zinc-900 bear-text-gray-100';
const CODEBLOCK_ROOT_AUTO = 'bear-bg-white dark:bear-bg-zinc-900 bear-text-gray-900 dark:bear-text-gray-100 bear-border bear-border-gray-200 dark:bear-border-zinc-700';

const CODEBLOCK_HEADER_CLASSES = 'Bear-CodeBlock__header bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-2';
const CODEBLOCK_HEADER_LIGHT = 'bear-bg-gray-50 bear-border-b bear-border-gray-200';
const CODEBLOCK_HEADER_DARK = 'bear-bg-zinc-800 bear-border-b bear-border-zinc-700';
const CODEBLOCK_HEADER_AUTO = 'bear-bg-gray-50 dark:bear-bg-zinc-800 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700';

const CODEBLOCK_LANGUAGE_CLASSES = 'Bear-CodeBlock__language bear-text-xs bear-px-2 bear-py-0.5 bear-rounded';
const CODEBLOCK_LANGUAGE_LIGHT = 'bear-bg-gray-200 bear-text-gray-600';
const CODEBLOCK_LANGUAGE_DARK = 'bear-bg-zinc-700 bear-text-zinc-400';
const CODEBLOCK_LANGUAGE_AUTO = 'bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-gray-600 dark:bear-text-zinc-400';

const CODEBLOCK_COPY_CLASSES = 'Bear-CodeBlock__copy bear-p-1.5 bear-rounded bear-transition-colors';
const CODEBLOCK_COPY_LIGHT = 'hover:bear-bg-gray-200 bear-text-gray-500 hover:bear-text-gray-700';
const CODEBLOCK_COPY_DARK = 'hover:bear-bg-zinc-700 bear-text-zinc-400 hover:bear-text-zinc-200';
const CODEBLOCK_COPY_AUTO = 'hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700 bear-text-gray-500 dark:bear-text-zinc-400 hover:bear-text-gray-700 dark:hover:bear-text-zinc-200';

const CODEBLOCK_PRE_CLASSES = 'Bear-CodeBlock__pre bear-overflow-x-auto bear-p-4 bear-m-0';

const CODEBLOCK_CODE_CLASSES = 'Bear-CodeBlock__code bear-text-sm bear-font-mono';

const CODEBLOCK_LINE_CLASSES = 'Bear-CodeBlock__line bear-flex';

const CODEBLOCK_LINE_NUMBER_CLASSES = 'Bear-CodeBlock__line-number bear-select-none bear-w-8 bear-flex-shrink-0 bear-text-right bear-pr-4';
const CODEBLOCK_LINE_NUMBER_LIGHT = 'bear-text-gray-400';
const CODEBLOCK_LINE_NUMBER_DARK = 'bear-text-zinc-600';
const CODEBLOCK_LINE_NUMBER_AUTO = 'bear-text-gray-400 dark:bear-text-zinc-600';

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(({
  code,
  language = 'typescript',
  showLineNumbers = true,
  title,
  copyable = true,
  maxHeight,
  theme = 'auto',
  className = '',
  testId,
  id,
  ...props
}, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  const getRootClasses = () => {
    if (theme === 'light') return CODEBLOCK_ROOT_LIGHT;
    if (theme === 'dark') return CODEBLOCK_ROOT_DARK;
    return CODEBLOCK_ROOT_AUTO;
  };

  const getHeaderClasses = () => {
    if (theme === 'light') return CODEBLOCK_HEADER_LIGHT;
    if (theme === 'dark') return CODEBLOCK_HEADER_DARK;
    return CODEBLOCK_HEADER_AUTO;
  };

  const getLanguageClasses = () => {
    if (theme === 'light') return CODEBLOCK_LANGUAGE_LIGHT;
    if (theme === 'dark') return CODEBLOCK_LANGUAGE_DARK;
    return CODEBLOCK_LANGUAGE_AUTO;
  };

  const getCopyClasses = () => {
    if (theme === 'light') return CODEBLOCK_COPY_LIGHT;
    if (theme === 'dark') return CODEBLOCK_COPY_DARK;
    return CODEBLOCK_COPY_AUTO;
  };

  const getLineNumberClasses = () => {
    if (theme === 'light') return CODEBLOCK_LINE_NUMBER_LIGHT;
    if (theme === 'dark') return CODEBLOCK_LINE_NUMBER_DARK;
    return CODEBLOCK_LINE_NUMBER_AUTO;
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={cn(CODEBLOCK_ROOT_CLASSES, getRootClasses(), className)}
    >
      {(title || copyable) && (
        <div className={cn(CODEBLOCK_HEADER_CLASSES, getHeaderClasses())}>
          <div className="bear-flex bear-items-center bear-gap-2">
            {title && (
              <Typography variant="caption" className="Bear-CodeBlock__title bear-font-medium">
                {title}
              </Typography>
            )}
            {language && (
              <span className={cn(CODEBLOCK_LANGUAGE_CLASSES, getLanguageClasses())}>
                {language}
              </span>
            )}
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className={cn(CODEBLOCK_COPY_CLASSES, getCopyClasses())}
              title={copied ? 'Copied!' : 'Copy code'}
              aria-label={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}

      <pre
        ref={ref}
        className={CODEBLOCK_PRE_CLASSES}
        style={{ maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined }}
        {...props}
      >
        <code className={CODEBLOCK_CODE_CLASSES}>
          {lines.map((line, i) => (
            <div key={i} className={CODEBLOCK_LINE_CLASSES}>
              {showLineNumbers && (
                <span className={cn(CODEBLOCK_LINE_NUMBER_CLASSES, getLineNumberClasses())}>
                  {i + 1}
                </span>
              )}
              <span className="Bear-CodeBlock__line-content bear-flex-1">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

