import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';
import { GUIDE_ARTICLES } from '@/constants/guideArticles.const';

const GuideArticlePage: FC = () => {
  const { pathname } = useLocation();
  const article = GUIDE_ARTICLES[pathname];
  if (!article) return <Navigate to="/" replace />;

  return (
    <article className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">{article.description}</p>
      {article.sections.map((section) => (
        <section key={section.title} className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{paragraph}</p>
          ))}
          {section.code ? (
            <CodeBlock code={section.code} language={section.language ?? 'tsx'} showLineNumbers={false} />
          ) : null}
        </section>
      ))}
    </article>
  );
};

export default GuideArticlePage;
