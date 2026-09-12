import { Link } from 'react-router-dom';
import { Flex, Typography } from '@forgedevstack/bear';
import type { CatalogCardProps } from './CatalogCard.types';

export const CatalogCard = (props: CatalogCardProps) => {
  const { entry, preview } = props;

  return (
    <Link to={entry.path} className="Bear-CatalogCard">
      <div className="Bear-CatalogCard__preview">{preview}</div>
      <Flex align="center" justify="between" gap={2} className="Bear-CatalogCard__meta">
        <Typography variant="body2" className="Bear-CatalogCard__name">
          {entry.label}
        </Typography>
        {entry.badge && (
          <span className="Bear-CatalogCard__badge">{entry.badge}</span>
        )}
      </Flex>
    </Link>
  );
};
