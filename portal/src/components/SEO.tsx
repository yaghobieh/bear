import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
}

const BASE_TITLE = 'Bear UI';
const SITE_URL = 'https://bearui.com';
const DEFAULT_DESCRIPTION =
  'Bear UI — 100+ beautiful, accessible React components with TypeScript, Tailwind CSS, 550+ icons, responsive hooks, and a powerful theming system.';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const JSON_LD_ID = 'bear-seo-jsonld';

export const SEO = ({ title, description }: SEOProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const canonical = `${SITE_URL}${pathname}`;

    document.title = fullTitle;

    setMeta('name', 'description', desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      description: desc,
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: 'Bear UI', url: SITE_URL },
    });
  }, [title, description, pathname]);

  return null;
};
