/**
 * CMSPage - Renders a page from Ember CMS
 * 
 * Usage:
 * <CMSPage slug="introduction" />
 * <CMSPage slug="getting-started" language="es" />
 */

import { FC } from 'react';
import { usePage } from '@/services';

interface CMSPageProps {
  slug: string;
  language?: string;
  className?: string;
}

export const CMSPage: FC<CMSPageProps> = ({ slug, language = 'en', className }) => {
  const { page, content, isLoading, error } = usePage(slug, language);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-bear-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !page || !content) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>Page not found: {slug}</p>
      </div>
    );
  }

  return (
    <div className={`cms-page fade-in ${className || ''}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {content.title}
        </h1>
        {content.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {content.description}
          </p>
        )}
      </div>

      {/* Render HTML content from CMS */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
};

export default CMSPage;

