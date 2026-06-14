import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from './SEO';
import { getPageSEO } from './RouteSEO.utils';

export const RouteSEO: FC = () => {
  const { pathname } = useLocation();
  const { title, description } = getPageSEO(pathname);
  return <SEO title={title} description={description} />;
};
