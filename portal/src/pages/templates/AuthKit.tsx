import { FC, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Input,
  PageHeader,
  PasswordInput,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Typography,
} from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { CodeBlock } from '@/components/CodeBlock';

const AuthKitPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const [tab, setTab] = useState('signin');

  return (
    <div className="fade-in">
      <PageHeader title={t.templateAuthTitle} description={t.templateAuthDesc} />
      <div className="mb-8"><CodeBlock language="tsx" showLineNumbers={false} code={`import { Tabs, Input, PasswordInput, Button, Card } from '@forgedevstack/bear';`} /></div>
      <Card variant="outlined" padding="lg" className="max-w-md mx-auto">
        <Typography variant="h5" className="mb-4">{t.templateAuthTitle}</Typography>
        <Tabs value={tab} defaultTab="signin" onChange={setTab}>
          <TabList>
            <Tab id="signin">{t.templateSignIn}</Tab>
            <Tab id="signup">{t.templateSignUp}</Tab>
          </TabList>
          <TabPanel tabId="signin">
            <Flex direction="column" gap={3} className="pt-4">
              <Input label={t.templateFieldEmail} type="email" />
              <PasswordInput label={t.templateFieldPassword} />
              <Button fullWidth>{t.templateSignIn}</Button>
            </Flex>
          </TabPanel>
          <TabPanel tabId="signup">
            <Flex direction="column" gap={3} className="pt-4">
              <Input label={t.templateFieldName} />
              <Input label={t.templateFieldEmail} type="email" />
              <PasswordInput label={t.templateFieldPassword} />
              <Button fullWidth>{t.templateSignUp}</Button>
            </Flex>
          </TabPanel>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthKitPage;
