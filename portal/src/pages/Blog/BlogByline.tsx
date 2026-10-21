import { FC } from 'react';
import { SEO_AUTHOR_NAME } from '@/constants/seo.const';

interface BlogBylineProps {
  publishedAt: string;
}

export const formatBlogWhen = (publishedAt: string): { formatted: string; zone: string } => {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatted = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: zone,
    timeZoneName: 'short',
  }).format(new Date(publishedAt));
  return { formatted, zone };
};

export const changelogInstant = (label: string): string => {
  const date = new Date(`${label} 12:00:00 UTC`);
  if (Number.isNaN(date.getTime())) return new Date(0).toISOString();
  return date.toISOString();
};

export const BlogByline: FC<BlogBylineProps> = (props) => {
  const { publishedAt } = props;
  const { formatted, zone } = formatBlogWhen(publishedAt);

  return (
    <p className="blog-byline">
      <span className="blog-byline__author">{SEO_AUTHOR_NAME}</span>
      <time dateTime={publishedAt}>{formatted}</time>
      <span className="blog-byline__zone">{zone}</span>
    </p>
  );
};
