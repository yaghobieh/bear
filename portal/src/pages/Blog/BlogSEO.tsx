import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SEO_AUTHOR_NAME,
  SEO_AUTHOR_URL,
  SEO_SITE_NAME,
  SEO_SITE_URL,
} from '@/constants/seo.const';
import { setCanonical, setJsonLd, setMeta, JSON_LD_SCRIPT_ID } from '@/components/SEO.utils';

export interface BlogSeoPost {
  path: string;
  title: string;
  description: string;
  publishedAt: string;
}

interface BlogSEOProps {
  title: string;
  description: string;
  publishedAt: string;
  language: string;
  posts?: BlogSeoPost[];
}

const AUTHOR_ID = `${SEO_SITE_URL}/#author`;
const IMAGE = `${SEO_SITE_URL}/bear-icon.svg`;

const ARTICLE_KEYS: Array<['name' | 'property', string]> = [
  ['property', 'article:published_time'],
  ['property', 'article:modified_time'],
  ['property', 'article:author'],
  ['property', 'article:section'],
  ['property', 'og:image'],
  ['name', 'twitter:image'],
];

const author = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: SEO_AUTHOR_NAME,
  url: SEO_AUTHOR_URL,
};

const publisher = {
  '@type': 'Organization',
  name: SEO_SITE_NAME,
  url: SEO_SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: IMAGE,
  },
};

const posting = (post: BlogSeoPost, language: string) => ({
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  inLanguage: language,
  image: [IMAGE],
  author,
  publisher,
  mainEntityOfPage: `${SEO_SITE_URL}${post.path}`,
  url: `${SEO_SITE_URL}${post.path}`,
});

export const BlogSEO: FC<BlogSEOProps> = (props) => {
  const { title, description, publishedAt, language, posts = [] } = props;
  const { pathname } = useLocation();
  const isArticle = pathname.startsWith('/blog/');

  useEffect(() => {
    const canonical = `${SEO_SITE_URL}${pathname}`;
    const fullTitle = `${title} — ${SEO_SITE_NAME}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'author', SEO_AUTHOR_NAME);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setCanonical(canonical);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:site_name', SEO_SITE_NAME);
    setMeta('property', 'og:image', IMAGE);
    setMeta('property', 'og:locale', language === 'es' ? 'es_ES' : 'en_US');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', IMAGE);
    setMeta('name', 'twitter:creator', '@yaghobieh');

    if (isArticle) {
      setMeta('property', 'og:type', 'article');
      setMeta('property', 'article:published_time', publishedAt);
      setMeta('property', 'article:modified_time', publishedAt);
      setMeta('property', 'article:author', SEO_AUTHOR_URL);
      setMeta('property', 'article:section', 'Blog');
      const article = posting(
        { path: pathname, title, description, publishedAt },
        language,
      );
      setJsonLd(JSON_LD_SCRIPT_ID, {
        '@context': 'https://schema.org',
        '@graph': [
          article,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SEO_SITE_URL}/blog` },
              { '@type': 'ListItem', position: 2, name: title, item: canonical },
            ],
          },
        ],
      });
    } else {
      setMeta('property', 'og:type', 'website');
      setJsonLd(JSON_LD_SCRIPT_ID, {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SEO_SITE_NAME} Blog`,
        description,
        url: canonical,
        inLanguage: language,
        author,
        publisher,
        blogPost: posts.map((post) => posting(post, language)),
      });
    }

    return () => {
      ARTICLE_KEYS.forEach(([attr, key]) => {
        document.querySelector(`meta[${attr}="${key}"]`)?.remove();
      });
    };
  }, [description, isArticle, language, pathname, posts, publishedAt, title]);

  return null;
};
