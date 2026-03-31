import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '@/constants/navigation.const';

const SEPARATOR_CLASS = 'text-gray-300 dark:text-gray-600 mx-1.5';
const LINK_CLASS = 'text-xs text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors';
const CURRENT_CLASS = 'text-xs text-gray-700 dark:text-gray-200 font-medium';

const GROUP_PATH_MAP: Record<string, string> = {
  Components: '/components',
  Advanced: '/components',
  Charts: '/components',
};

interface BreadcrumbSegment {
  label: string;
  path?: string;
}

export const PageBreadcrumbs: FC = () => {
  const { pathname } = useLocation();

  const segments = useMemo((): BreadcrumbSegment[] => {
    const result: BreadcrumbSegment[] = [{ label: 'Home', path: '/' }];

    for (const group of NAVIGATION) {
      for (const item of group.items) {
        if (item.path === pathname) {
          result.push({ label: group.title, path: GROUP_PATH_MAP[group.title] });
          result.push({ label: item.label });
          return result;
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.path === pathname) {
              result.push({ label: group.title, path: GROUP_PATH_MAP[group.title] });
              result.push({ label: item.label, path: item.path });
              result.push({ label: child.label });
              return result;
            }
          }
        }
      }
    }

    const parts = pathname.split('/').filter(Boolean);
    parts.forEach((part) => {
      result.push({ label: part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) });
    });
    return result;
  }, [pathname]);

  if (segments.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap">
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          return (
            <li key={i} className="flex items-center">
              {i > 0 && <span className={SEPARATOR_CLASS}>/</span>}
              {isLast || !seg.path ? (
                <span className={isLast ? CURRENT_CLASS : LINK_CLASS}>{seg.label}</span>
              ) : (
                <Link to={seg.path} className={LINK_CLASS}>{seg.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumbs;
