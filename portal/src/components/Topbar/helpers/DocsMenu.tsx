import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { NAVIGATION } from '@/constants/navigation.const';
import { DOCS_MENU_CHILD_LIMIT } from '../Topbar.const';

interface DocsMenuProps {
  label: string;
  onNavigate: () => void;
}

const componentGroup = NAVIGATION.find((group) => group.title === 'Components');
const DOC_SECTIONS = (componentGroup?.items ?? []).filter((item) => (item.children?.length ?? 0) > 0);

export const DocsMenu: FC<DocsMenuProps> = (props) => {
  const { label, onNavigate } = props;

  return (
    <div
      className="Bear-Topbar__products"
      role="menu"
      aria-label={label}
    >
      <div className="Bear-Topbar__docs-grid">
        {DOC_SECTIONS.map((section) => (
          <div key={section.path}>
            <Link to={section.path} onClick={onNavigate} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              {section.label}
            </Link>
            <ul className="space-y-1">
              {section.children?.slice(0, DOCS_MENU_CHILD_LIMIT).map((child) => (
                <li key={child.path}>
                  <Link
                    to={child.path}
                    role="menuitem"
                    onClick={onNavigate}
                    className="block rounded-md px-2 py-1 text-sm text-gray-700 transition-colors duration-200 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-200 dark:hover:bg-pink-950/30 dark:hover:text-pink-400"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/components" onClick={onNavigate} className="mt-3 block border-t border-gray-100 px-2 pt-3 text-sm font-semibold text-pink-600 dark:border-gray-800 dark:text-pink-400">
        <Typography variant="body2" className="font-semibold text-pink-600 dark:text-pink-400">All components</Typography>
      </Link>
    </div>
  );
};
