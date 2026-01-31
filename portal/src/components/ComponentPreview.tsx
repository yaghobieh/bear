import { FC, ReactNode, useState, useCallback } from 'react';
import { CodeBlock } from './CodeBlock';

interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  language?: string;
  defaultShowCode?: boolean;
  /** When true, allows overflow (e.g. for dropdowns that need to extend outside). Default false. */
  allowOverflow?: boolean;
}

// Icons
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export const ComponentPreview: FC<ComponentPreviewProps> = ({
  title,
  description,
  code,
  children,
  language = 'tsx',
  defaultShowCode = false,
  allowOverflow = false,
}) => {
  const [showCode, setShowCode] = useState(defaultShowCode);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={allowOverflow ? 'mb-8 rounded-xl border border-gray-200 dark:border-gray-700' : 'mb-8 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'}>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      <div className="p-8 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
        <div className="w-full">{children}</div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CodeIcon />
            {showCode ? 'Hide code' : 'View code'}
          </button>

          {showCode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                title={expanded ? 'Collapse' : 'Expand'}
              >
                {expanded ? <CollapseIcon /> : <ExpandIcon />}
                <span className="hidden sm:inline">{expanded ? 'Collapse' : 'Expand'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {copied ? (
                  <>
                    <CheckIcon />
                    <span className="text-green-600 dark:text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    <span className="hidden sm:inline">Copy code</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {showCode && (
          <div 
            className={`border-t border-gray-200 dark:border-gray-700 transition-all ${
              expanded ? 'max-h-none' : 'max-h-80 overflow-y-auto'
            }`}
          >
            <CodeBlock code={code} language={language} showLineNumbers />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;
