import { FC, useState, useCallback } from 'react';
import { Button, Typography } from '@forgedevstack/bear';

/**
 * Configurable labels for internationalization
 */
export interface BearCodeBlockLabels {
  copy?: string;
  copied?: string;
}

export interface BearCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  testId?: string;
  id?: string;
  /** Custom labels for i18n support */
  labels?: BearCodeBlockLabels;
}

const DEFAULT_LABELS: Required<BearCodeBlockLabels> = {
  copy: 'Copy',
  copied: 'Copied!',
};

const BearCodeBlockCopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const BearCodeBlockCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const BearCodeBlock: FC<BearCodeBlockProps> = (props) => {
  const {
    code,
    language = 'tsx',
    title,
    showLineNumbers = true,
    testId,
    id,
    labels = {},
  } = props;

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split('\n');

  return (
    <div
      id={id}
      data-testid={testId}
      className="Bear-CodeBlock rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700"
    >
      <div className="Bear-CodeBlock-header flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="Bear-CodeBlock-meta flex items-center gap-2">
          <Typography variant="caption" className="Bear-CodeBlock-language px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-medium">
            {title || language}
          </Typography>
        </div>
        
        <button
          onClick={handleCopy}
          aria-label={copied ? mergedLabels.copied : mergedLabels.copy}
          className="Bear-CodeBlock-copy-button flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors"
        >
          {copied ? <BearCodeBlockCheckIcon /> : <BearCodeBlockCopyIcon />}
          <Typography component="span" variant="caption">{copied ? mergedLabels.copied : mergedLabels.copy}</Typography>
        </button>
      </div>

      <div className="Bear-CodeBlock-content overflow-x-auto bg-zinc-50 dark:bg-zinc-900">
        <pre className="Bear-CodeBlock-pre p-4 text-sm leading-relaxed font-mono m-0">
          <code className="Bear-CodeBlock-code">
            {lines.map((line, index) => (
              <div key={index} className="Bear-CodeBlock-line flex">
                {showLineNumbers && (
                  <span className="Bear-CodeBlock-line-number select-none text-zinc-400 dark:text-zinc-600 w-8 text-right pr-4 flex-shrink-0 font-mono text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="Bear-CodeBlock-line-content text-zinc-800 dark:text-zinc-200 font-mono text-sm">
                  {line || ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// Keep backward compatibility
export const CodeBlock = BearCodeBlock;
export default BearCodeBlock;
