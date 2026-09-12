import { useState } from 'react';
import { Alert, ApprovalCard, Flex } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { APPROVAL_CARD_CODE, APPROVAL_CARD_PROPS } from './ApprovalCardPage.const';

const ApprovalCardPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [status, setStatus] = useState('pending');

  return (
    <DocPage title="ApprovalCard" description={t.approvalCardDesc} componentName="ApprovalCard">
      <ComponentPreview title={t.basic} description={t.approvalCardDesc} code={APPROVAL_CARD_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <ApprovalCard
            title={t.approvalCardTitle}
            onApprove={() => setStatus('approved')}
            onReject={() => setStatus('rejected')}
          >
            {t.approvalCardBody}
          </ApprovalCard>
          <Alert severity="info">
            {t.approvalCardStatus} {status}
          </Alert>
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={APPROVAL_CARD_PROPS} />
    </DocPage>
  );
};

export default ApprovalCardPage;
