import { forwardRef, useState } from 'react';
import { CodeBlockProps } from './CodeBlock.types';

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(({
  code,
  language = 'typescript',
  showLineNumbers = true,
  title,
  copyable = true,
  maxHeight,
  theme = 'dark',
  className = '',
  ...props
}, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  const themeClasses = theme === 'dark'
    ? 'bg-gray-900 text-gray-100'
    : 'bg-gray-50 text-gray-900 border border-gray-200';

  return (
    <div className={`bear-code-block rounded-lg overflow-hidden ${themeClasses} ${className}`.trim()}>
      {(title || copyable) && (
        <div className={`flex items-center justify-between px-4 py-2 ${theme === 'dark' ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'}`}>
          <div className="flex items-center gap-2">
            {title && (
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {title}
              </span>
            )}
            {language && (
              <span className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                {language}
              </span>
            )}
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className={`p-1.5 rounded transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                  : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              }`}
              title={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        className="overflow-x-auto p-4"
        style={{ maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined }}
        {...props}
      >
        <code className="text-sm font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className={`select-none w-8 flex-shrink-0 text-right pr-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {i + 1}
                </span>
              )}
              <span className="flex-1">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

