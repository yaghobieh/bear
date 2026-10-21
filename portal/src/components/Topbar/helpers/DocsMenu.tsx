import { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BearIcons } from '@forgedevstack/bear';
import { NAVIGATION, type NavItem } from '@/constants/navigation.const';

interface DocsMenuProps {
  label: string;
  onNavigate: () => void;
}

const PAGE_SIZE = 24;

const DOCS_BASE = [
  { path: '/components', label: 'Core', detail: 'Components in the main package', icon: BearIcons.PackageIcon },
  { path: '/theming', label: 'Styling', detail: 'Theme, color, and tokens', icon: BearIcons.PaletteIcon },
  { path: '/installation', label: 'Installing', detail: 'npm install and the stylesheet', icon: BearIcons.DownloadIcon },
  { path: '/docs/mcp', label: 'MCP', detail: 'Cursor, VS Code, JetBrains', icon: BearIcons.SparklesIcon },
] as const;

const FEATURED = new Set<string>(DOCS_BASE.map((item) => item.path));

const flatten = (items: NavItem[]): { path: string; label: string }[] => {
  const pages: { path: string; label: string }[] = [];
  items.forEach((item) => {
    if (item.children && item.children.length > 0) {
      pages.push(...flatten(item.children));
      return;
    }
    if (item.external || FEATURED.has(item.path) || item.path === '/') return;
    pages.push({ path: item.path, label: item.label });
  });
  return pages;
};

const OTHER_DOCS = flatten(NAVIGATION.flatMap((group) => group.items)).filter(
  (page, index, all) => all.findIndex((item) => item.path === page.path) === index,
);

export const DocsMenu: FC<DocsMenuProps> = (props) => {
  const { label, onNavigate } = props;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return OTHER_DOCS;
    return OTHER_DOCS.filter((item) => item.label.toLowerCase().includes(needle) || item.path.toLowerCase().includes(needle));
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="Bear-Topbar__products" role="menu" aria-label={label}>
      <div className="Bear-Topbar__docs-layout">
      <div className="Bear-Topbar__docs-base">
        {DOCS_BASE.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} role="menuitem" onClick={onNavigate} className="Bear-Topbar__docs-base-link">
              <span className="Bear-Topbar__product-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span>
                <span className="Bear-Topbar__product-name">{item.label}</span>
                <span className="Bear-Topbar__product-desc">{item.detail}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="Bear-Topbar__docs-rest">
      <label className="Bear-Topbar__docs-search">
        <BearIcons.SearchIcon size={14} />
        <input
          value={query}
          placeholder="Search docs"
          aria-label="Search docs"
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
        />
      </label>

      <ul className="Bear-Topbar__docs-list">
        {visible.map((item) => (
          <li key={item.path}>
            <Link to={item.path} role="menuitem" onClick={onNavigate} className="Bear-Topbar__docs-link">
              {item.label}
            </Link>
          </li>
        ))}
        {visible.length === 0 ? <li className="Bear-Topbar__docs-empty">No matching pages.</li> : null}
      </ul>

      <div className="Bear-Topbar__docs-pager">
        <button type="button" disabled={safePage === 0} onClick={() => setPage((current) => Math.max(0, current - 1))} aria-label="Previous docs page">
          <BearIcons.ChevronLeftIcon size={14} />
        </button>
        <span>{safePage + 1} / {pageCount}</span>
        <button type="button" disabled={safePage >= pageCount - 1} onClick={() => setPage((current) => current + 1)} aria-label="Next docs page">
          <BearIcons.ChevronRightIcon size={14} />
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};
