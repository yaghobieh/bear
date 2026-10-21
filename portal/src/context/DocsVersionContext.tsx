import { createContext, useContext, useMemo, useState, type FC, type ReactNode } from 'react';
import { CHANGELOG_ENTRIES, type ChangelogEntry } from '@/constants/changelog.const';
import { BEAR_VERSION } from '@/constants/navigation.const';

const STORAGE_KEY = 'bear-docs-version';

interface DocsVersionValue {
  version: string;
  setVersion: (version: string) => void;
  notes: ChangelogEntry[];
  isCurrent: boolean;
}

const DocsVersionContext = createContext<DocsVersionValue | null>(null);

const readStoredVersion = (): string => {
  if (typeof window === 'undefined') return BEAR_VERSION;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && stored.length > 0 ? stored : BEAR_VERSION;
};

export const DocsVersionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [version, setVersionState] = useState(readStoredVersion);

  const value = useMemo<DocsVersionValue>(() => {
    const notes = CHANGELOG_ENTRIES.filter((entry) => entry.version === version || entry.version.startsWith(`${version}.`));
    return {
      version,
      notes,
      isCurrent: version === BEAR_VERSION,
      setVersion: (next) => {
        setVersionState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
    };
  }, [version]);

  return <DocsVersionContext.Provider value={value}>{children}</DocsVersionContext.Provider>;
};

export const useDocsVersion = (): DocsVersionValue => {
  const value = useContext(DocsVersionContext);
  if (!value) {
    return {
      version: BEAR_VERSION,
      notes: CHANGELOG_ENTRIES.filter((entry) => entry.version === BEAR_VERSION),
      isCurrent: true,
      setVersion: () => undefined,
    };
  }
  return value;
};
