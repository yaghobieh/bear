import { FC, useCallback, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION, VERSIONS, BEAR_VERSION, NavGroup } from '@/constants/navigation.const';
import { useIsMobile, BearIcons } from '@forgedevstack/bear';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  topOffset?: number;
}

interface CollapsibleNavGroupProps {
  group: NavGroup;
  onItemClick?: (path: string) => void;
  defaultOpen?: boolean;
}

const CollapsibleNavGroup: FC<CollapsibleNavGroupProps> = ({ group, onItemClick, defaultOpen = true }) => {
  const storageKey = `bear-sidebar-${group.title.toLowerCase().replace(/\s+/g, '-')}`;
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? stored === 'true' : defaultOpen;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(isExpanded));
  }, [isExpanded, storageKey]);

  return (
    <div className="Bear-Sidebar__group mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="Bear-Sidebar__group-header w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group"
      >
        <span className="flex items-center gap-2">
          {group.title}
          {group.items.length > 0 && (
            <span className="text-[10px] font-medium normal-case tracking-normal bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded-full">
              {group.items.length}
            </span>
          )}
        </span>
        <BearIcons.ChevronRightIcon 
          size={14} 
          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-200 ease-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="space-y-0.5 mt-1">
          {group.items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => onItemClick?.(item.path)}
                className={({ isActive }) =>
                  `Bear-Sidebar__item group flex items-center justify-between px-3 py-1.5 text-sm rounded-lg ml-2 border-l-2 transition-all duration-150
                  ${isActive
                    ? 'border-bear-500 bg-bear-50 text-bear-700 dark:bg-bear-900/30 dark:text-bear-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-600'
                  }`
                }
              >
                <span 
                  className={
                    item.badge === 'Hot' 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent font-semibold' 
                      : ''
                  }
                >
                  {item.label}
                </span>
                {item.badge && item.badge !== 'Hot' && (
                  <span 
                    className={`text-xs font-bold ${
                      item.badge === 'New'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'
                        : item.badge === '300+'
                        ? 'px-1.5 py-0.5 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px]'
                        : 'px-1.5 py-0.5 rounded bg-bear-100 text-bear-600 dark:bg-bear-900/30 dark:text-bear-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose, topOffset = 104 }) => {
  const isMobile = useIsMobile();

  const handleItemClick = useCallback(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [isMobile, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          Bear-Sidebar fixed left-0 w-64 bg-white dark:bg-gray-900
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
        <div className="Bear-Sidebar__version p-4 pb-2 flex-shrink-0">
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

        <div className="Bear-Sidebar__content flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <nav className="Bear-Sidebar__nav">
            {NAVIGATION.map((group, index) => (
              <CollapsibleNavGroup 
                key={group.title} 
                group={group} 
                onItemClick={handleItemClick}
                defaultOpen={index < 3}
              />
            ))}
          </nav>
        </div>
      </aside>

      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
