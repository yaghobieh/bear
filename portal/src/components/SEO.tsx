import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SEO_AUTHOR_NAME,
  SEO_DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_SITE_NAME,
  SEO_SITE_URL,
} from '@/constants/seo.const';
import type { SEOProps } from './SEO.types';
import { JSON_LD_SCRIPT_ID, setMeta, setCanonical, setJsonLd } from './SEO.utils';

export const SEO = (props: SEOProps) => {
  const { title, description } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SEO_SITE_NAME}` : `${SEO_SITE_NAME} — by ${SEO_AUTHOR_NAME}`;
    const desc = description || SEO_DEFAULT_DESCRIPTION;
    const canonical = `${SEO_SITE_URL}${pathname}`;

    document.title = fullTitle;

    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', SEO_KEYWORDS);
    setMeta('name', 'author', SEO_AUTHOR_NAME);
    setMeta('name', 'creator', SEO_AUTHOR_NAME);

    setCanonical(canonical);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SEO_SITE_NAME);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:creator', '@yaghobieh');

    setJsonLd(JSON_LD_SCRIPT_ID, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      description: desc,
      url: canonical,
      author: {
        '@type': 'Person',
        name: SEO_AUTHOR_NAME,
        url: 'https://github.com/yaghobieh',
      },
      isPartOf: {
        '@type': 'WebSite',
        name: SEO_SITE_NAME,
        url: SEO_SITE_URL,
        author: {
          '@type': 'Person',
          name: SEO_AUTHOR_NAME,
        },
      },
    });
  }, [title, description, pathname]);

  return null;
};
