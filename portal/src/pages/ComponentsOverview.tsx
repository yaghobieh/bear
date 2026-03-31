import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION, NavItem } from '@/constants/navigation.const';
import { BearIcons } from '@forgedevstack/bear';

interface ComponentEntry {
  label: string;
  path: string;
  badge?: string;
}

interface ComponentCategory {
  title: string;
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
};

const ComponentsOverview: FC = () => {
  const categories = useMemo((): ComponentCategory[] => {
    const groups = NAVIGATION.filter(g =>
      ['Components', 'Advanced', 'Charts'].includes(g.title),
    );
    return groups.map(g => ({
      title: g.title,
      items: flattenNavItems(g.items),
    }));
  }, []);

  const totalCount = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Components</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Browse all {totalCount} components in the Bear UI library. Click any card to view docs and live examples.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-10">
        Every component ships with TypeScript types, dark mode support, and Tailwind CSS styling.
      </p>

      {categories.map((cat) => {
        const IconComp = CATEGORY_ICONS[cat.title];
        return (
          <section key={cat.title} className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              {IconComp && <IconComp size={20} className="text-pink-500" />}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{cat.title}</h2>
              <span className="text-xs text-gray-400 ml-1">({cat.items.length})</span>
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
        );
      })}
    </div>
  );
};

export default ComponentsOverview;
