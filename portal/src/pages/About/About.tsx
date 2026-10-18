import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Flex, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { PRODUCT_MENU } from '@/components/Topbar/Topbar.const';
import { SEO_AUTHOR_NAME } from '@/constants/seo.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { ABOUT_LINKS, ABOUT_PRINCIPLES, ABOUT_STATS } from './About.const';
import { AboutLinkItem } from './helpers/AboutLinkItem';

const AboutPage: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];

  return (
    <DocPage title={text.aboutTitle} description={text.aboutDesc}>
      <Flex direction="column" gap={8}>
        <Typography variant="body1">{text.aboutStory}</Typography>

        <Flex wrap="wrap" gap={3}>
          {ABOUT_STATS.map((stat) => (
            <Card key={stat.id} className="min-w-36 flex-1">
              <CardBody>
                <Typography variant="h3">{stat.value}</Typography>
                <Typography variant="caption" className="text-gray-500">{text[stat.labelKey]}</Typography>
              </CardBody>
            </Card>
          ))}
        </Flex>

        <section>
          <Typography variant="h4" className="mb-4">{text.aboutOrganizeTitle}</Typography>
          <Flex wrap="wrap" gap={4}>
            {PRODUCT_MENU.map((group) => (
              <Card key={group.id} className="w-full md:w-[calc(33.333%-0.75rem)]">
                <CardBody>
                  <Typography variant="h5" className="mb-3">{text[group.titleKey]}</Typography>
                  <Flex direction="column" gap={3}>
                    {group.items.map((item) => (
                      <Link key={item.id} to={item.path} className="rounded-lg transition-colors duration-200 hover:text-pink-600 dark:hover:text-pink-400">
                        <Typography variant="body1" className="font-semibold">{text[item.nameKey]}</Typography>
                        <Typography variant="caption" className="text-gray-500">{text[item.descKey]}</Typography>
                      </Link>
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </section>

        <section>
          <Typography variant="h4" className="mb-4">{text.aboutPrinciplesTitle}</Typography>
          <Flex wrap="wrap" gap={4}>
            {ABOUT_PRINCIPLES.map((item) => (
              <Card key={item.id} className="w-full md:w-[calc(50%-0.5rem)]">
                <CardBody>
                  <Link to={item.path}>
                    <Typography variant="h5" className="mb-2">{text[item.titleKey]}</Typography>
                    <Typography variant="body2">{text[item.bodyKey]}</Typography>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </section>

        <Card>
          <CardBody>
            <Typography variant="h4" className="mb-2">{text.aboutAuthorTitle}</Typography>
            <Typography variant="h5" className="mb-2">{SEO_AUTHOR_NAME}</Typography>
            <Typography variant="body2" className="mb-4">{text.aboutAuthorBody}</Typography>
            <Typography variant="h5" className="mb-3">{text.aboutLinksTitle}</Typography>
            <Flex wrap="wrap" gap={4}>
              {ABOUT_LINKS.map((item) => (
                <AboutLinkItem key={item.id} item={item} label={text[item.labelKey]} />
              ))}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </DocPage>
  );
};

export default AboutPage;
