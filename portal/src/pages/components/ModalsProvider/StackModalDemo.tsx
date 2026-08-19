import { Button, Flex, Typography, useModals } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { MODALS_PROVIDER_BODY_VARIANT, MODALS_PROVIDER_DANGER_VARIANT, MODALS_PROVIDER_DEMO_GAP } from './ModalsProvider.const';

export const StackModalDemo = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const { open, confirm } = useModals();

  return (
    <Flex justify="center">
      <Button
        onClick={() =>
          open({
            title: t.modalsProviderStackTitle,
            children: (
              <Flex direction="column" gap={MODALS_PROVIDER_DEMO_GAP}>
                <Typography variant={MODALS_PROVIDER_BODY_VARIANT}>{t.modalsProviderStackBody}</Typography>
                <Button
                  variant={MODALS_PROVIDER_DANGER_VARIANT}
                  onClick={() =>
                    confirm({
                      title: t.modalsProviderConfirmTitle,
                      description: t.modalsProviderConfirmBody,
                    })
                  }
                >
                  {t.modalsProviderOpenNested}
                </Button>
              </Flex>
            ),
          })
        }
      >
        {t.modalsProviderOpen}
      </Button>
    </Flex>
  );
};
