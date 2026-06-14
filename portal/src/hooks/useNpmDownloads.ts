import { useEffect, useState } from 'react';

const NPM_PACKAGE = '@forgedevstack/bear';
const NPM_DOWNLOADS_URL = `https://api.npmjs.org/downloads/point/last-month/${NPM_PACKAGE}`;
const FALLBACK_DOWNLOADS = 0;

const formatDownloads = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}k`;
  }
  return String(count);
};

export interface UseNpmDownloadsResult {
  downloads: number;
  formatted: string;
  loading: boolean;
}

export const useNpmDownloads = (): UseNpmDownloadsResult => {
  const [downloads, setDownloads] = useState(FALLBACK_DOWNLOADS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(NPM_DOWNLOADS_URL);
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { downloads?: number };
        if (!cancelled && typeof data.downloads === 'number') {
          setDownloads(data.downloads);
        }
      } catch {
        if (!cancelled) {
          setDownloads(FALLBACK_DOWNLOADS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    downloads,
    formatted: loading ? '…' : formatDownloads(downloads),
    loading,
  };
};
