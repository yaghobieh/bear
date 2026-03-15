import { FC, useState, useCallback } from 'react';

const COPY_RESET_MS = 2000;

interface CopyImportProps {
  componentName: string;
  packageName?: string;
}

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CopyImport: FC<CopyImportProps> = ({ componentName, packageName = '@forgedevstack/bear' }) => {
  const [copied, setCopied] = useState(false);
  const importStatement = `import { ${componentName} } from '${packageName}';`;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(importStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_RESET_MS);
  }, [importStatement]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md border transition-all
        border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700
        bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400
        hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
      title={copied ? 'Copied!' : `Copy: ${importStatement}`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : 'Copy import'}
    </button>
  );
};

export default CopyImport;
