import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { BLOG_POSTS } from './Blog.const';

const Blog: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="font-lato">
      <Typography variant="h2" className="mb-3">{t.blogTitle}</Typography>
      <Typography variant="body1" className="mb-10 text-gray-600 dark:text-gray-400">{t.blogDesc}</Typography>
      <Flex direction="column" gap={4}>
        {BLOG_POSTS.map((post) => (
          <Card key={post.path} className="p-6">
            <Typography variant="caption" className="mb-1 block text-gray-500">{post.date}</Typography>
            <Typography variant="h5" className="mb-2">{post.title}</Typography>
            <Link to={post.path} className="text-sm font-semibold text-pink-600 dark:text-pink-400">
              {t.blogRead}
            </Link>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Blog;
