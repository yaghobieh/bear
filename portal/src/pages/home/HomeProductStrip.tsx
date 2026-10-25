import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { HOME_PRODUCTS } from './home.const';

export const HomeProductStrip: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];

  return (
    <section className="home-products">
      <Typography variant="h2" className="home-products__title">
        {text.homeProductsTitle}
      </Typography>
      <Typography variant="body1" color="secondary" className="home-products__lead">
        {text.homeProductsLead}
      </Typography>
      <div className="home-products__grid">
        {HOME_PRODUCTS.map((product) => {
          const body = (
            <>
              <Typography variant="h6" component="h3">{text[product.nameKey]}</Typography>
              <Typography variant="body2" color="secondary">{text[product.descKey]}</Typography>
            </>
          );
          if (product.external) {
            return (
              <a key={product.path} href={product.path} className="home-products__card" target="_blank" rel="noreferrer">
                {body}
              </a>
            );
          }
          return (
            <Link key={product.path} to={product.path} className="home-products__card">
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
