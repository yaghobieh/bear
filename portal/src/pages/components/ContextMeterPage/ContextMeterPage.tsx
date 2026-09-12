import { ContextMeter, Flex } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  CONTEXT_METER_CODE,
  CONTEXT_METER_HIGH_CODE,
  CONTEXT_METER_MAX,
  CONTEXT_METER_PROPS,
  CONTEXT_METER_USED,
} from './ContextMeterPage.const';

const ContextMeterPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ContextMeter" description={t.contextMeterDesc} componentName="ContextMeter">
      <ComponentPreview title={t.basic} description={t.contextMeterDesc} code={CONTEXT_METER_CODE}>
        <ContextMeter used={CONTEXT_METER_USED} max={CONTEXT_METER_MAX} />
      </ComponentPreview>
      <ComponentPreview title={t.anotherExample} description={t.contextMeterDesc} code={CONTEXT_METER_HIGH_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <ContextMeter used={18} max={CONTEXT_METER_MAX} />
          <ContextMeter used={96} max={CONTEXT_METER_MAX} />
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={CONTEXT_METER_PROPS} />
    </DocPage>
  );
};

export default ContextMeterPage;
