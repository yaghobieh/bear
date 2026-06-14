import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '@/constants/navigation.const';
import { formatDocTitleFromPath } from '@/utils/formatDocTitle.utils';
import type { BreadcrumbSegment } from './PageBreadcrumbs.types';
import {
  BREADCRUMB_HOME_LABEL,
  BREADCRUMB_HOME_PATH,
  GROUP_PATH_MAP,
  SEPARATOR_CLASS,
  LINK_CLASS,
  CURRENT_CLASS,
} from './PageBreadcrumbs.const';
import { getSegmentLabel } from './PageBreadcrumbs.utils';

export const PageBreadcrumbs: FC = () => {
  const { pathname } = useLocation();

  const segments = useMemo((): BreadcrumbSegment[] => {
    const result: BreadcrumbSegment[] = [{ label: BREADCRUMB_HOME_LABEL, path: BREADCRUMB_HOME_PATH }];

    for (const group of NAVIGATION) {
      for (const item of group.items) {
        if (item.path === pathname) {
          result.push({ label: group.title, path: GROUP_PATH_MAP[group.title] });
          result.push({ label: getSegmentLabel(item.path, item.label) });
          return result;
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.path === pathname) {
              result.push({ label: group.title, path: GROUP_PATH_MAP[group.title] });
              const categoryHash = encodeURIComponent(item.label);
              result.push({ label: item.label, path: `/components#${categoryHash}` });
              result.push({ label: getSegmentLabel(child.path, child.label) });
              return result;
            }
          }
        }
      }
    }

    const parts = pathname.split('/').filter(Boolean);
    parts.forEach((part, index) => {
      const partialPath = `/${parts.slice(0, index + 1).join('/')}`;
      result.push({ label: getSegmentLabel(partialPath, formatDocTitleFromPath(part)) });
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
