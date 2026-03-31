import { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAVIGATION, VERSIONS, BEAR_VERSION, NavGroup, NavItem } from '@/constants/navigation.const';
import { ICON_COUNT } from '@/constants/icons.const';
import { useIsMobile, BearIcons } from '@forgedevstack/bear';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  topOffset?: number;
  hiddenDesktop?: boolean;
}

const GROUP_ICON_MAP: Record<string, FC<Omit<import('@forgedevstack/bear').IconProps, 'children'>>> = {
  RocketIcon: BearIcons.RocketIcon,
  LayersIcon: BearIcons.LayersIcon,
  ZapIcon: BearIcons.ZapIcon,
  BarChartIcon: BearIcons.BarChartIcon,
  CodeIcon: BearIcons.CodeIcon,
  PaletteIcon: BearIcons.PaletteIcon,
  BookOpenIcon: BearIcons.BookOpenIcon,
  AnchorIcon: BearIcons.AnchorIcon,
  ShoppingBagIcon: BearIcons.ShoppingBagIcon,
};

interface NestedNavItemProps {
  item: NavItem;
  onItemClick?: () => void;
  searchQuery?: string;
}

const NestedNavItem: FC<NestedNavItemProps> = ({
  item,
  onItemClick,
  searchQuery = '',
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const storageKey = `bear-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

  const isActive = location.pathname === item.path;
  const hasActiveChild = hasChildren && item.children?.some(child => location.pathname === child.path);

  const [isExpanded, setIsExpanded] = useState(() => {
    if (hasActiveChild) return true;
    const stored = localStorage.getItem(storageKey);
    return stored === 'true';
  });

  const filteredChildren = useMemo(() => {
    if (!hasChildren) return [];
    if (!searchQuery) return item.children!;
    const query = searchQuery.toLowerCase();
    return item.children!.filter(child =>
      child.label.toLowerCase().includes(query)
    );
  }, [item.children, searchQuery, hasChildren]);

  useEffect(() => {
    if (searchQuery && filteredChildren.length > 0) {
      setIsExpanded(true);
    }
  }, [searchQuery, filteredChildren.length]);

  useEffect(() => {
    if (hasChildren && !searchQuery) {
      localStorage.setItem(storageKey, String(isExpanded));
    }
  }, [isExpanded, storageKey, hasChildren, searchQuery]);

  if (searchQuery) {
    const matchesSelf = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const hasMatchingChild = filteredChildren.length > 0;
    if (!matchesSelf && !hasMatchingChild) return null;
  }

  if (hasChildren) {
    return (
      <div className="Bear-NavItem">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md mx-1 transition-colors
            ${hasActiveChild || isActive
              ? 'text-pink-700 dark:text-pink-400 font-medium bg-pink-50 dark:bg-pink-900/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50/50 dark:hover:bg-pink-950/20'
            }`}
        >
          <span className="flex items-center gap-2">
            {item.label}
            {item.badge && (
              <span className={`text-[10px] font-semibold ${item.badge === 'New' || item.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
                {item.badge === 'icons' ? ICON_COUNT : item.badge}
              </span>
            )}
          </span>
          <BearIcons.ChevronRightIcon
            size={12}
            className={`text-gray-400 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </button>

        <div className={`overflow-hidden transition-all duration-150 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <ul className="ml-3 border-l border-pink-200 dark:border-pink-800/40 my-1">
            {filteredChildren.map((child) => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  onClick={onItemClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between pl-3 pr-2 py-1 text-[12px] transition-colors rounded-r-md
                    ${isActive
                      ? 'text-pink-600 dark:text-pink-400 font-medium border-l-2 border-pink-500 -ml-[1px] bg-pink-50/50 dark:bg-pink-900/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-pink-50/40 dark:hover:bg-pink-950/15'
                    }`
                  }
                >
                  <span>{child.label}</span>
                  {child.badge && (
                    <span className={`text-[9px] font-semibold ${child.badge === 'New' || child.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
                      {child.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onItemClick}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md mx-1 transition-colors
        ${isActive
          ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 font-medium'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-pink-50/50 dark:hover:bg-pink-950/20'
        }`
      }
    >
      <span>{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] font-semibold ${item.badge === 'New' || item.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
          {item.badge === 'icons' ? ICON_COUNT : item.badge}
        </span>
      )}
    </NavLink>
  );
};

interface CollapsibleGroupProps {
  group: NavGroup;
  onItemClick?: () => void;
  defaultOpen?: boolean;
  searchQuery?: string;
}

const CollapsibleGroup: FC<CollapsibleGroupProps> = ({
  group,
  onItemClick,
  defaultOpen = false,
  searchQuery = '',
}) => {
  const location = useLocation();
  const storageKey = `bear-sidebar-${group.title.toLowerCase().replace(/\s+/g, '-')}`;

  const hasActiveItem = group.items.some(item => {
    if (location.pathname === item.path) return true;
    if (item.children?.some(child => location.pathname === child.path)) return true;
    return false;
  });

  const [isExpanded, setIsExpanded] = useState(() => {
    if (hasActiveItem) return true;
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? stored === 'true' : defaultOpen;
  });

  const filteredItems = useMemo(() => {
    if (!searchQuery) return group.items;
    const query = searchQuery.toLowerCase();
    return group.items.filter(item => {
      if (item.label.toLowerCase().includes(query)) return true;
      if (item.children?.some(child => child.label.toLowerCase().includes(query))) return true;
      return false;
    });
  }, [group.items, searchQuery]);

  useEffect(() => {
    if (searchQuery && filteredItems.length > 0) {
      setIsExpanded(true);
    }
  }, [searchQuery, filteredItems.length]);

  useEffect(() => {
    if (!searchQuery) {
      localStorage.setItem(storageKey, String(isExpanded));
    }
  }, [isExpanded, storageKey, searchQuery]);

  if (searchQuery && filteredItems.length === 0) return null;

  const GroupIcon = group.icon ? GROUP_ICON_MAP[group.icon] : null;

  return (
    <div className="Bear-Sidebar__group mb-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors
          ${hasActiveItem
            ? 'text-pink-600 dark:text-pink-400'
            : 'text-gray-500 dark:text-gray-500 hover:text-pink-600 dark:hover:text-pink-400'
          }`}
      >
        {/* Bear icon for the group */}
        {GroupIcon && (
          <GroupIcon
            size={14}
            className={hasActiveItem ? 'text-pink-500 dark:text-pink-400' : 'text-gray-400 dark:text-gray-600'}
          />
        )}
        <span className="flex-1 text-left">{group.title}</span>
        <span className="text-[9px] font-medium text-gray-400 dark:text-gray-600 tabular-nums mr-1">
          {group.items.length}
        </span>
        <BearIcons.ChevronRightIcon
          size={12}
          className={`transition-transform duration-150 opacity-50 ${isExpanded ? 'rotate-90' : ''}`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-150 ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'}`}>
        <ul className="space-y-0.5 pb-1">
          {filteredItems.map((item) => (
            <li key={item.path + item.label}>
              <NestedNavItem
                item={item}
                onItemClick={onItemClick}
                searchQuery={searchQuery}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Group divider */}
      <div className="mx-3 border-b border-gray-100 dark:border-gray-800/60" />
    </div>
  );
};

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose, topOffset = 104, hiddenDesktop = false }) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

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
          ${hiddenDesktop ? 'lg:-translate-x-full' : 'lg:translate-x-0'} lg:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        }}
      >
        {/* Header */}
        <div className="p-3 space-y-2 border-b border-gray-100 dark:border-gray-800">
          {/* Sidebar search */}
          <div className="relative">
            <BearIcons.SearchIcon
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Filter nav..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400
                focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <BearIcons.CloseIcon size={12} />
              </button>
            )}
          </div>
          <select
            value={BEAR_VERSION}
            className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400
              focus:outline-none focus:ring-1 focus:ring-pink-500"
          >
            {VERSIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <nav>
            {NAVIGATION.map((group) => (
              <CollapsibleGroup
                key={group.title}
                group={group}
                onItemClick={handleItemClick}
                defaultOpen={group.title === 'Getting Started' || group.title === 'Components'}
                searchQuery={searchQuery}
              />
            ))}
          </nav>
        </div>
      </aside>

      {!hiddenDesktop && <div className="hidden lg:block w-64 flex-shrink-0" />}
    </>
  );
};

export default Sidebar;
