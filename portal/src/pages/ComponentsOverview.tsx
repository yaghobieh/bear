import { FC, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION, NavItem } from '@/constants/navigation.const';
import { BearIcons } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

interface ComponentEntry {
  label: string;
  path: string;
  badge?: string;
}

interface ComponentCategory {
  title: string;
  groupTitle: string;
  items: ComponentEntry[];
}

function flattenNavItems(items: NavItem[]): ComponentEntry[] {
  const result: ComponentEntry[] = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        result.push({ label: child.label, path: child.path, badge: child.badge });
      }
    } else {
      result.push({ label: item.label, path: item.path, badge: item.badge });
    }
  }
  return result;
}

const CATEGORY_ICONS: Record<string, typeof BearIcons.StarIcon> = {
  Components: BearIcons.LayersIcon,
  Advanced: BearIcons.ZapIcon,
  Charts: BearIcons.BarChartIcon,
  'Component API': BearIcons.CodeIcon,
};

const ComponentsOverview: FC = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  const categories = useMemo((): ComponentCategory[] => {
    const result: ComponentCategory[] = [];
    const groups = NAVIGATION.filter(g =>
      ['Components', 'Advanced', 'Charts', 'Component API'].includes(g.title),
    );

    for (const group of groups) {
      for (const item of group.items) {
        if (item.children && item.children.length > 0) {
          result.push({
            title: item.label,
            groupTitle: group.title,
            items: item.children.map(c => ({ label: c.label, path: c.path, badge: c.badge })),
          });
        } else {
          const miscKey = `${group.title} — Misc`;
          const existing = result.find(r => r.title === miscKey);
          if (existing) {
            existing.items.push({ label: item.label, path: item.path, badge: item.badge });
          } else {
            result.push({
              title: miscKey,
              groupTitle: group.title,
              items: [{ label: item.label, path: item.path, badge: item.badge }],
            });
          }
        }
      }
    }
    return result;
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const target = decodeURIComponent(location.hash.slice(1));
    const el = document.getElementById(`cat-${target}`);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.hash]);

  const totalCount = categories.reduce((sum, c) => sum + c.items.length, 0);

  let lastGroup = '';

  return (
    <div className="fade-in" ref={containerRef}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.componentsOverviewTitle}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {t.componentsOverviewDesc}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-10">
        {t.componentsOverviewNote}
      </p>

      {categories.map((cat) => {
        const showGroupHeader = cat.groupTitle !== lastGroup;
        lastGroup = cat.groupTitle;
        const IconComp = CATEGORY_ICONS[cat.groupTitle];

        return (
          <div key={cat.title}>
            {showGroupHeader && (
              <div className="flex items-center gap-2 mb-3 mt-8 first:mt-0">
                {IconComp && <IconComp size={18} className="text-pink-500" />}
                <h2 className="text-base font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider">{cat.groupTitle}</h2>
              </div>
            )}
            <section id={`cat-${cat.title}`} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cat.title.replace(` — Misc`, '')}</h3>
                <span className="text-xs text-gray-400">({cat.items.length})</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cat.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group relative flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentsOverview;
