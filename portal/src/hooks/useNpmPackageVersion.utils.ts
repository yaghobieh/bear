import { VERSION_SEGMENT_SEPARATOR } from './useNpmPackageVersion.const';

const parseVersion = (version: string): number[] =>
  version.split(VERSION_SEGMENT_SEPARATOR).map((segment) => {
    const value = Number(segment);
    return Number.isFinite(value) ? value : 0;
  });

export const pickDisplayVersion = (localVersion: string, npmVersion: string | null): string => {
  if (!npmVersion) {
    return localVersion;
  }

  const localParts = parseVersion(localVersion);
  const npmParts = parseVersion(npmVersion);
  const length = Math.max(localParts.length, npmParts.length);

  for (let index = 0; index < length; index += 1) {
    const localPart = localParts[index] ?? 0;
    const npmPart = npmParts[index] ?? 0;
    if (localPart > npmPart) {
      return localVersion;
    }
    if (npmPart > localPart) {
      return npmVersion;
    }
  }

  return npmVersion;
};
