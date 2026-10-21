import { FC } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, Typography } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { DocPage } from '@/components/DocPage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { BLOG_PUBLISHED_AT, BLOG_TIPS } from './Blog.const';
import { BlogByline } from './BlogByline';
import { BlogSEO } from './BlogSEO';

const BlogArticlePage: FC = () => {
  const { articleId } = useParams();
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const article = BLOG_TIPS[language].find((tip) => tip.id === articleId);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <DocPage title={article.title} description={article.body}>
      <BlogSEO
        title={article.title}
        description={article.body}
        publishedAt={BLOG_PUBLISHED_AT[article.id]}
        language={language}
      />
      <Card>
        <CardBody>
          <Typography variant="overline" className="text-pink-600 dark:text-pink-400">{text.blogDidYouKnow}</Typography>
          <BlogByline publishedAt={BLOG_PUBLISHED_AT[article.id]} />
          <Typography variant="body1" className="my-4">{article.body}</Typography>
          {article.code && <CodeBlock code={article.code} language="tsx" showLineNumbers={false} />}
          {article.sections?.map((section) => (
            <section key={section.heading} className="mt-8">
              <Typography variant="h4" className="mb-2">{section.heading}</Typography>
              <Typography variant="body1" className="mb-4">{section.body}</Typography>
              {section.code && <CodeBlock code={section.code} language="tsx" showLineNumbers={false} />}
            </section>
          ))}
          <Link to={article.path} className="mt-4 inline-block text-sm font-semibold text-pink-600 dark:text-pink-400">
            {text.blogRead}
          </Link>
        </CardBody>
      </Card>
      <Link to="/blog" className="mt-6 inline-block">
        <Button variant="ghost">{text.blogTitle}</Button>
      </Link>
    </DocPage>
  );
};

export default BlogArticlePage;
