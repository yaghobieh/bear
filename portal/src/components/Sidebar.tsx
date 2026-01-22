import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION, VERSIONS, BEAR_VERSION, NavGroup } from '@/constants/navigation.const';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  topOffset?: number;
}

const NavGroupComponent: FC<{ group: NavGroup }> = ({ group }) => (
  <div className="mb-6">
    <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
      {group.title}
    </h3>
    <ul className="space-y-0.5">
      {group.items.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-1.5 text-sm rounded-r-lg border-l-2 transition-colors
              ${isActive
                ? 'border-bear-500 bg-bear-50 text-bear-700 dark:bg-bear-900/20 dark:text-bear-400'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50'
              }`
            }
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-bear-100 text-bear-600 dark:bg-bear-900/30 dark:text-bear-400">
                {item.badge}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose, topOffset = 104 }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 w-64 bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          z-50 flex flex-col
          transform transition-transform duration-200
          lg:translate-x-0 lg:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        }}
      >
        <div className="p-4 pb-2 flex-shrink-0">
          <select
            value={BEAR_VERSION}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
              focus:outline-none focus:ring-2 focus:ring-bear-500"
          >
            {VERSIONS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <nav>
            {NAVIGATION.map((group) => (
              <NavGroupComponent key={group.title} group={group} />
            ))}
          </nav>
        </div>
      </aside>

      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
