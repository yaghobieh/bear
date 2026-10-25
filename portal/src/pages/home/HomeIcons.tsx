import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Flex, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { HOME_ICONS, HOME_ICONS_COPY, HOME_ICON_SIZE } from './HomeIcons.const';

export const HomeIcons: FC = () => {
  const { language } = usePortalLanguage();
  const copy = HOME_ICONS_COPY[language];

  return (
    <section className="home-products">
      <Badge variant="primary">{copy.badge}</Badge>
      <Typography variant="h2" className="home-products__title">{copy.title}</Typography>
      <Typography variant="body1" color="secondary" className="home-products__lead">{copy.body}</Typography>
      <Flex gap={3} wrap="wrap">
        {HOME_ICONS.map(({ name, Icon }) => (
          <Link key={name} to="/icons" className="home-products__card" aria-label={name}>
            <Icon size={HOME_ICON_SIZE} />
            <Typography variant="caption">{name}</Typography>
          </Link>
        ))}
      </Flex>
    </section>
  );
};
