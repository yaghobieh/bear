import { FC, useState, useCallback } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-bear-100 text-bear-700 dark:bg-bear-900/30 dark:text-bear-400">
            {language}
          </span>
          {title && (
            <span className="text-xs text-gray-500 dark:text-gray-400">{title}</span>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-50 dark:bg-gray-900">
        <pre className="p-4 text-sm leading-relaxed font-mono">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-gray-400 dark:text-gray-600 w-8 text-right pr-4 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span className="text-gray-800 dark:text-gray-200">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;

