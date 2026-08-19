import { useState } from 'react';
import { Button, Flex, Typography, useModals } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { CONFIRM_DEMO_CANCELLED, CONFIRM_DEMO_CONFIRMED, CONFIRM_RESULT_TEXT_KEY, MODALS_PROVIDER_BODY_VARIANT, MODALS_PROVIDER_DANGER_VARIANT, MODALS_PROVIDER_DEMO_GAP } from './ModalsProvider.const';
import type { ConfirmDemoResult } from './ModalsProvider.types';

export const ConfirmModalDemo = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const { confirm } = useModals();
  const [result, setResult] = useState<ConfirmDemoResult>(null);
  const resultLabel = result ? t[CONFIRM_RESULT_TEXT_KEY[result]] : null;

  return (
    <Flex justify="center" align="center" gap={MODALS_PROVIDER_DEMO_GAP}>
      <Button
        variant={MODALS_PROVIDER_DANGER_VARIANT}
        onClick={() => {
          confirm({
            title: t.modalsProviderConfirmTitle,
            description: t.modalsProviderConfirmBody,
          }).then((accepted) => {
            setResult(accepted ? CONFIRM_DEMO_CONFIRMED : CONFIRM_DEMO_CANCELLED);
          });
        }}
      >
        {t.modalsProviderConfirm}
      </Button>
      {resultLabel ? <Typography variant={MODALS_PROVIDER_BODY_VARIANT}>{resultLabel}</Typography> : null}
    </Flex>
  );
};
