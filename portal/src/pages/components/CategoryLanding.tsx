import { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Typography } from '@forgedevstack/bear';
import { NAVIGATION } from '@/constants/navigation.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';

const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const getCategorySlugMap = () => {
  const componentsGroup = NAVIGATION.find((g) => g.title === 'Components');
  const map = new Map<string, { label: string; items: { path: string; label: string }[] }>();
  componentsGroup?.items.forEach((item) => {
    if (!item.children?.length) return;
    map.set(slugify(item.label), {
      label: item.label,
      items: item.children.map((child) => ({ path: child.path, label: child.label })),
    });
  });
  return map;
};

const CategoryLandingPage: FC = () => {
  const { categorySlug = '' } = useParams();
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const categories = useMemo(() => getCategorySlugMap(), []);
  const category = categories.get(categorySlug);

  if (!category) {
    return (
      <div className="fade-in">
        <Typography variant="h4" className="mb-2">
          {t.categoryNotFoundTitle}
        </Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4">
          {t.categoryNotFoundBody}
        </Typography>
        <Link to="/components" className="text-pink-600 dark:text-pink-400 font-medium">
          {t.backToComponents}
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <Typography variant="h3" className="mb-2">
        {category.label}
      </Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        {t.categoryLandingIntro.replace('{category}', category.label)}
      </Typography>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <Link key={item.path} to={item.path} className="no-underline">
            <Card variant="outlined" padding="md" className="h-full hover:border-pink-400 transition-colors">
              <Typography variant="h6" weight="semibold">
                {item.label}
              </Typography>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {item.path}
              </Typography>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryLandingPage;
