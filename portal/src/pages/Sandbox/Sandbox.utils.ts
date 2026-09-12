import { CATALOG_PREVIEWS, renderCatalogFallback } from '@/pages/ComponentsOverview/helpers';
import { buildCatalogEntries } from '@/pages/ComponentsOverview/ComponentsOverview.utils';
import { SANDBOX_STARTER_APP } from './Sandbox.const';
import { SANDBOX_RECIPES, SANDBOX_RECIPE_PATHS } from './Sandbox.recipes';
import type { SandboxExample, SandboxExampleGroup } from './Sandbox.types';

const toComponentName = (label: string): string => label.replace(/\s+/g, '');
const TRAILING_SLASH = /\/$/;

export const normalizeSandboxPath = (value: string | null): string | null => {
  if (!value) {
    return null;
  }
  let next = value;
  try {
    next = decodeURIComponent(value);
  } catch {
    next = value;
  }
  const trimmed = next.replace(TRAILING_SLASH, '');
  return trimmed || null;
};

export const buildSandboxApp = (path: string, label: string): string => {
  const mapped = SANDBOX_RECIPE_PATHS[path];
  if (mapped && SANDBOX_RECIPES[mapped]) {
    return SANDBOX_RECIPES[mapped];
  }
  const fallbackName = toComponentName(label);
  return SANDBOX_RECIPES[fallbackName] ?? SANDBOX_STARTER_APP;
};

export const buildSandboxExamples = (): SandboxExample[] => {
  return buildCatalogEntries().map((entry) => {
    return {
      label: entry.label,
      path: entry.path,
      category: entry.category,
      preview: CATALOG_PREVIEWS[entry.path] ?? renderCatalogFallback(entry.label),
      code: buildSandboxApp(entry.path, entry.label),
    };
  });
};

export const groupSandboxExamples = (items: SandboxExample[]): SandboxExampleGroup[] => {
  const groups = new Map<string, SandboxExample[]>();
  for (const item of items) {
    const current = groups.get(item.category) ?? [];
    current.push(item);
    groups.set(item.category, current);
  }
  return Array.from(groups.entries()).map(([category, grouped]) => ({
    category,
    items: grouped,
  }));
};
