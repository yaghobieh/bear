import { FC, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  FormControl,
  Input,
  PageHeader,
  Select,
  Stepper,
} from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable } from '@/components/PropsTable';
import { FORM_KIT_STEPPER_PROPS } from './FormKit.const';

const FormKitPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('admin');

  return (
    <div className="fade-in">
      <PageHeader title={t.templateFormTitle} description={t.templateFormDesc} />
      <div className="mb-8">
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`import { FormControl, Input, Select, Stepper, Button } from '@forgedevstack/bear';`}
        />
      </div>
      <Card variant="outlined" padding="lg" className="max-w-2xl space-y-6 mb-10">
        <Stepper
          activeStep={step}
          clickable
          onStepClick={setStep}
          steps={[
            { label: t.templateStepProfile },
            { label: t.templateStepAccess },
            { label: t.templateStepReview },
          ]}
        />
        <FormControl label={t.templateFieldName} required>
          <Input placeholder={t.templateFieldName} />
        </FormControl>
        <FormControl label={t.templateFieldRole} helperText={t.templateFieldRoleHelp}>
          <Select
            native
            value={role}
            onChange={setRole}
            options={[
              { value: 'admin', label: t.templateRoleAdmin },
              { value: 'editor', label: t.templateRoleEditor },
            ]}
          />
        </FormControl>
        <Flex gap={2}>
          <Button variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            {t.templateBack}
          </Button>
          <Button onClick={() => setStep((s) => Math.min(2, s + 1))}>
            {step === 2 ? t.templateSubmit : t.templateNext}
          </Button>
        </Flex>
      </Card>
      <PropsTable title="Stepper props" rows={FORM_KIT_STEPPER_PROPS} />
    </div>
  );
};

export default FormKitPage;
