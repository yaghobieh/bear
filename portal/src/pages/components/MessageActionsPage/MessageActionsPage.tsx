import { useState } from 'react';
import { Alert, Flex, MessageActions, Typography } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { MESSAGE_ACTIONS_CODE, MESSAGE_ACTIONS_PROPS, MESSAGE_ACTIONS_REPLY } from './MessageActionsPage.const';

const MessageActionsPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [action, setAction] = useState('idle');

  return (
    <DocPage title="MessageActions" description={t.messageActionsDesc} componentName="MessageActions">
      <ComponentPreview title={t.basic} description={t.messageActionsLiveDesc} code={MESSAGE_ACTIONS_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <Typography>{MESSAGE_ACTIONS_REPLY}</Typography>
          <MessageActions
            onCopy={() => {
              void navigator.clipboard.writeText(MESSAGE_ACTIONS_REPLY);
              setAction('copy');
            }}
            onRetry={() => setAction('retry')}
            onGood={() => setAction('good')}
            onBad={() => setAction('bad')}
          />
          {action !== 'idle' && (
            <Alert severity="info">
              {t.messageActionsLast} {action}
            </Alert>
          )}
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={MESSAGE_ACTIONS_PROPS} />
    </DocPage>
  );
};

export default MessageActionsPage;
