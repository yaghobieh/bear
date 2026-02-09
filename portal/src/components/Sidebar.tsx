import { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAVIGATION, VERSIONS, BEAR_VERSION, NavGroup, NavItem } from '@/constants/navigation.const';
import { useIsMobile, BearIcons } from '@forgedevstack/bear';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  topOffset?: number;
}

/** Nested nav item with children support */
interface NestedNavItemProps {
  item: NavItem;
  onItemClick?: () => void;
  searchQuery?: string;
}

const NestedNavItem: FC<NestedNavItemProps> = ({ 
  item, 
  onItemClick, 
  searchQuery = ''
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const storageKey = `bear-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Check if this item or any child is active
  const isActive = location.pathname === item.path;
  const hasActiveChild = hasChildren && item.children?.some(child => location.pathname === child.path);
  
  const [isExpanded, setIsExpanded] = useState(() => {
    if (hasActiveChild) return true;
    const stored = localStorage.getItem(storageKey);
    return stored === 'true';
  });

  // Filter children by search
  const filteredChildren = useMemo(() => {
    if (!hasChildren) return [];
    if (!searchQuery) return item.children!;
    const query = searchQuery.toLowerCase();
    return item.children!.filter(child => 
      child.label.toLowerCase().includes(query)
    );
  }, [item.children, searchQuery, hasChildren]);

  // Auto-expand when searching
  useEffect(() => {
    if (searchQuery && filteredChildren.length > 0) {
      setIsExpanded(true);
    }
  }, [searchQuery, filteredChildren.length]);

  // Save state
  useEffect(() => {
    if (hasChildren && !searchQuery) {
      localStorage.setItem(storageKey, String(isExpanded));
    }
  }, [isExpanded, storageKey, hasChildren, searchQuery]);

  // Hide if no match in search
  if (searchQuery) {
    const matchesSelf = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const hasMatchingChild = filteredChildren.length > 0;
    if (!matchesSelf && !hasMatchingChild) return null;
  }

  // Item with children
  if (hasChildren) {
    return (
      <div className="Bear-NavItem">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded mx-1 transition-colors
            ${hasActiveChild || isActive
              ? 'text-pink-700 dark:text-pink-400 font-medium bg-pink-50 dark:bg-pink-900/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
        >
          <span className="flex items-center gap-2">
            {item.label}
            {item.badge && (
              <span className={`text-[10px] font-medium
                ${item.badge === 'New' || item.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
                {item.badge}
              </span>
            )}
          </span>
          <BearIcons.ChevronRightIcon 
            size={12} 
            className={`text-gray-400 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </button>
        
        <div className={`overflow-hidden transition-all duration-150 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <ul className="ml-3 border-l border-gray-200 dark:border-gray-700 my-1">
            {filteredChildren.map((child) => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  onClick={onItemClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between pl-3 pr-2 py-1 text-[12px] transition-colors
                    ${isActive
                      ? 'text-pink-600 dark:text-pink-400 font-medium border-l-2 border-pink-500 -ml-[1px] bg-pink-50/50 dark:bg-pink-900/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                    }`
                  }
                >
                  <span>{child.label}</span>
                  {child.badge && (
                    <span className={`text-[9px] font-medium
                      ${child.badge === 'New' || child.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
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

  // Simple item (no children)
  return (
    <NavLink
      to={item.path}
      onClick={onItemClick}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-1.5 text-[13px] rounded mx-1 transition-colors
        ${isActive
          ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 font-medium'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50'
        }`
      }
    >
      <span>{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] font-medium
          ${item.badge === 'New' || item.badge === 'Hot' ? 'text-pink-500' : 'text-gray-400'}`}>
          {item.badge}
        </span>
      )}
    </NavLink>
  );
};

/** Collapsible group header */
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
  searchQuery = '' 
}) => {
  const location = useLocation();
  const storageKey = `bear-sidebar-${group.title.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Check if any item in this group is active
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

  // Filter items
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

  return (
    <div className="Bear-Sidebar__group mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors
          ${hasActiveItem 
            ? 'text-pink-600 dark:text-pink-400' 
            : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
      >
        <span>{group.title}</span>
        <BearIcons.ChevronRightIcon 
          size={12} 
          className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-150 ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'}`}>
        <ul className="space-y-0.5">
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
    </div>
  );
};

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose, topOffset = 104 }) => {
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
          lg:translate-x-0 lg:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        }}
      >
        {/* Header */}
        <div className="p-3 space-y-2 border-b border-gray-100 dark:border-gray-800">
          {/* Search */}
          <div className="relative">
            <BearIcons.SearchIcon 
              size={14} 
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-sm rounded border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                placeholder:text-gray-400
                focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <BearIcons.XIcon size={12} className="text-gray-400" />
              </button>
            )}
          </div>
          
          {/* Version */}
          <select
            value={BEAR_VERSION}
            className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 
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
          
          {/* No results */}
          {searchQuery && NAVIGATION.every(g => 
            g.items.every(item => {
              const matchesSelf = !item.label.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesChild = !item.children?.some(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()));
              return matchesSelf && matchesChild;
            })
          ) && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No results found</p>
            </div>
          )}
        </div>
      </aside>

      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
