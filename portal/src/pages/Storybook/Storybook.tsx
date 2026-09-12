import { useEffect } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { resolveStorybookHref } from '@/constants/navigation.const';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

const StorybookPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const href = resolveStorybookHref();

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <Flex direction="column" gap={2} className="fade-in">
      <Typography variant="h3">{t.storybookTitle}</Typography>
      <Typography color="muted">{t.storybookDesc}</Typography>
      <a href={href}>{href}</a>
    </Flex>
  );
};

export default StorybookPage;
