import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BearIcons, Typography } from '@forgedevstack/bear';
import type { PortalCopyKey } from '../Topbar.types';
import { PRODUCT_MENU } from '../Topbar.const';

interface ProductMenuProps {
  copy: Record<PortalCopyKey, string>;
  onNavigate: () => void;
}

const PRODUCT_ICONS = {
  package: BearIcons.PackageIcon,
  sparkles: BearIcons.SparklesIcon,
  layers: BearIcons.LayersIcon,
  code: BearIcons.CodeIcon,
  wrench: BearIcons.WrenchIcon,
  globe: BearIcons.GlobeIcon,
  inbox: BearIcons.InboxIcon,
  palette: BearIcons.PaletteIcon,
  calendar: BearIcons.CalendarIcon,
} as const;

export const ProductMenu: FC<ProductMenuProps> = (props) => {
  const { copy, onNavigate } = props;

  return (
    <div
      className="Bear-Topbar__products"
      role="menu"
      aria-label={copy.navProduct}
    >
      <div className="Bear-Topbar__product-groups">
        {PRODUCT_MENU.map((group) => (
          <div key={group.id} className="Bear-Topbar__product-group">
            <Typography variant="caption" className="Bear-Topbar__product-label">
              {copy[group.titleKey]}
            </Typography>
            <ul className="Bear-Topbar__product-list">
              {group.items.map((item) => {
                const Icon = PRODUCT_ICONS[item.icon];
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      role="menuitem"
                      onClick={onNavigate}
                      className="Bear-Topbar__product-row"
                    >
                      <span className="Bear-Topbar__product-icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span>
                        <span className="Bear-Topbar__product-name">{copy[item.nameKey]}</span>
                        <span className="Bear-Topbar__product-desc">{copy[item.descKey]}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/libraries" onClick={onNavigate} className="Bear-Topbar__product-catalog">
        {copy.productCatalog}
      </Link>
    </div>
  );
};
