import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chip, Flex, Input, Typography } from '@forgedevstack/bear';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { CATALOG_ALL, CATALOG_HASH_DELAY_MS, CATALOG_SEARCH_ID } from './ComponentsOverview.const';
import {
  buildCatalogEntries,
  filterCatalogEntries,
  formatCatalogCount,
  uniqueCategories,
} from './ComponentsOverview.utils';
import { CatalogCard, CATALOG_PREVIEWS, renderCatalogFallback } from './helpers';

const CATALOG_ENTRIES = buildCatalogEntries();
const CATALOG_CATEGORIES = uniqueCategories(CATALOG_ENTRIES);

const ComponentsOverview = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(CATALOG_ALL);
  const visible = filterCatalogEntries(CATALOG_ENTRIES, query, category);

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const target = decodeURIComponent(location.hash.slice(1));
    const el = document.getElementById(`cat-${target}`);
    if (!el) {
      return;
    }
    window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), CATALOG_HASH_DELAY_MS);
  }, [location.hash]);

  return (
    <div className="fade-in Bear-Catalog" ref={containerRef}>
      <Typography variant="h3" className="Bear-Catalog__title">
        {t.componentsOverviewTitle}
      </Typography>
      <Typography variant="body1" color="muted" className="Bear-Catalog__lead">
        {t.componentsOverviewDesc}
      </Typography>
      <Typography variant="caption" color="muted" className="Bear-Catalog__note">
        {t.componentsOverviewNote}
      </Typography>

      <Flex direction="column" gap={3} className="Bear-Catalog__toolbar">
        <div className="Bear-Catalog__search">
          <Input
            id={CATALOG_SEARCH_ID}
            size="md"
            fullWidth
            clearable
            placeholder={t.catalogSearchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery('')}
          />
        </div>
        <Flex wrap="wrap" gap={2} className="Bear-Catalog__filters">
          <Chip
            size="sm"
            color="primary"
            variant={category === CATALOG_ALL ? 'filled' : 'outlined'}
            onClick={() => setCategory(CATALOG_ALL)}
          >
            {t.catalogAll}
          </Chip>
          {CATALOG_CATEGORIES.map((name) => (
            <Chip
              key={name}
              size="sm"
              color="primary"
              variant={category === name ? 'filled' : 'outlined'}
              onClick={() => setCategory(name)}
            >
              {name}
            </Chip>
          ))}
        </Flex>
        <Typography variant="caption" color="muted">
          {formatCatalogCount(t.catalogCount, visible.length)}
        </Typography>
      </Flex>

      {visible.length === 0 ? (
        <Typography variant="body2" color="muted">
          {t.catalogEmpty}
        </Typography>
      ) : (
        <div className="Bear-Catalog__grid">
          {visible.map((entry) => (
            <CatalogCard
              key={entry.path}
              entry={entry}
              preview={CATALOG_PREVIEWS[entry.path] ?? renderCatalogFallback(entry.label)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentsOverview;
