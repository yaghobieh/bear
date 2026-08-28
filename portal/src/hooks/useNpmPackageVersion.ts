import { useEffect, useState } from 'react';
import { BEAR_VERSION } from '@/constants/navigation.const';
import { NPM_REGISTRY_LATEST_URL } from '@/constants/npm.const';
import type { NpmLatestResponse, UseNpmPackageVersionResult } from './useNpmPackageVersion.types';
import { pickDisplayVersion } from './useNpmPackageVersion.utils';

let cachedVersion: string | null = null;

const readVersion = (payload: NpmLatestResponse): string | null => {
  if (typeof payload.version === 'string' && payload.version.length > 0) {
    return payload.version;
  }
  return null;
};

export const useNpmPackageVersion = (): UseNpmPackageVersionResult => {
  const [version, setVersion] = useState(cachedVersion ?? BEAR_VERSION);
  const [loading, setLoading] = useState(!cachedVersion);

  useEffect(() => {
    if (cachedVersion) {
      setVersion(cachedVersion);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(NPM_REGISTRY_LATEST_URL);
        if (!response.ok) {
          return;
        }
        const payload = (await response.json()) as NpmLatestResponse;
        const npmVersion = readVersion(payload);
        if (!cancelled) {
          const next = pickDisplayVersion(BEAR_VERSION, npmVersion);
          cachedVersion = next;
          setVersion(next);
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

  return { version, loading };
};
