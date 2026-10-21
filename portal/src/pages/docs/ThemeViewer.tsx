import { FC, useEffect, useState } from 'react';

const TOKENS = [
  '--bear-primary-500',
  '--bear-primary-600',
  '--bear-secondary-500',
  '--bear-success-500',
  '--bear-warning-500',
  '--bear-danger-500',
  '--bear-info-500',
  '--bear-bg-primary',
  '--bear-bg-secondary',
  '--bear-text-primary',
  '--bear-text-secondary',
  '--bear-border-default',
];

const ThemeViewerPage: FC = () => {
  const [colors, setColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    TOKENS.forEach((token) => {
      next[token] = styles.getPropertyValue(token).trim();
    });
    setColors(next);
  }, []);

  return (
    <article className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Default theme viewer</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        These are the CSS variables currently applied on this page. Switch the portal between light and dark and the swatches follow --bear-bg-primary and --bear-text-primary.
      </p>
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tokens</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {TOKENS.map((token) => (
            <li key={token} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3">
              <span className="h-10 w-10 rounded-md border border-black/10 shrink-0" style={{ background: colors[token] || 'transparent' }} />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">{token}</span>
                <span className="block text-xs text-gray-500">{colors[token] || '…'}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default ThemeViewerPage;
