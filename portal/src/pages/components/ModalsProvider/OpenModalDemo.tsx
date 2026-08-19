import { Button, Flex, Typography, useModals } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { MODALS_PROVIDER_BODY_VARIANT, MODALS_PROVIDER_PRIMARY_VARIANT } from './ModalsProvider.const';

export const OpenModalDemo = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const { open, close } = useModals();

  return (
    <Flex justify="center">
      <Button
        onClick={() =>
          open({
            title: t.modalsProviderOpenTitle,
            children: <Typography variant={MODALS_PROVIDER_BODY_VARIANT}>{t.modalsProviderOpenBody}</Typography>,
            footer: (
              <Button variant={MODALS_PROVIDER_PRIMARY_VARIANT} onClick={() => close()}>
                {t.modalsProviderClose}
              </Button>
            ),
          })
        }
      >
        {t.modalsProviderOpen}
      </Button>
    </Flex>
  );
};
