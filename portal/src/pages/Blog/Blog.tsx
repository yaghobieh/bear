import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Flex, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CHANGELOG_ENTRIES } from '@/constants/changelog.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { BLOG_POST_COUNT, BLOG_PUBLISHED_AT, BLOG_TIPS, BLOG_WHATS_NEW_VERSION, PATH_CHANGELOG, PATH_WHATS_NEW } from './Blog.const';
import { BlogByline, changelogInstant } from './BlogByline';
import { BlogSEO } from './BlogSEO';

const BlogPage: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const tips = BLOG_TIPS[language];
  const [lead, ...rest] = tips;
  const posts = CHANGELOG_ENTRIES.slice(0, BLOG_POST_COUNT);
  const seoPosts = useMemo(
    () => tips.map((tip) => ({
      path: `/blog/${tip.id}`,
      title: tip.title,
      description: tip.body,
      publishedAt: BLOG_PUBLISHED_AT[tip.id],
    })),
    [tips],
  );

  return (
    <DocPage title={text.blogTitle} description={text.blogDesc}>
      <BlogSEO
        title={text.blogTitle}
        description={text.blogDesc}
        publishedAt={seoPosts[0]?.publishedAt ?? BLOG_PUBLISHED_AT['theme-behind']}
        language={language}
        posts={seoPosts}
      />
      <Flex direction="column" gap={8}>
        {lead && (
          <Link to={`/blog/${lead.id}`} className="block rounded-2xl border border-pink-200 bg-pink-50 p-8 dark:border-pink-900 dark:bg-pink-950/30">
            <Typography variant="overline" className="text-pink-600 dark:text-pink-400">{text.blogDidYouKnow}</Typography>
            <Typography variant="h2" className="my-3">{lead.title}</Typography>
            <BlogByline publishedAt={BLOG_PUBLISHED_AT[lead.id]} />
            <Typography variant="body1">{lead.body}</Typography>
          </Link>
        )}
        <section>
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((tip) => (
              <Link key={tip.id} to={`/blog/${tip.id}`}>
                <Card>
                  <CardBody>
                    <Typography variant="h5" className="mb-2">{tip.title}</Typography>
                    <BlogByline publishedAt={BLOG_PUBLISHED_AT[tip.id]} />
                    <Typography variant="body2">{tip.body}</Typography>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <Typography variant="h4" className="mb-4">{text.blogReleases}</Typography>
          <Flex direction="column" gap={3}>
            {posts.map((post) => {
              const summary = post.sections[0]?.items[0] ?? '';
              const path = post.version === BLOG_WHATS_NEW_VERSION ? PATH_WHATS_NEW : PATH_CHANGELOG;
              return (
                <Link key={post.version} to={path} className="rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
                  <Typography variant="h6">Bear {post.version}</Typography>
                  <BlogByline publishedAt={changelogInstant(post.date)} />
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">{summary}</Typography>
                </Link>
              );
            })}
          </Flex>
        </section>
      </Flex>
    </DocPage>
  );
};

export default BlogPage;
