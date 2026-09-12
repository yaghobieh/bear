import { Flex, ToolCall } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { TOOL_CALL_CODE, TOOL_CALL_PROPS } from './ToolCallPage.const';

const ToolCallPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ToolCall" description={t.toolCallDesc} componentName="ToolCall">
      <ComponentPreview title={t.basic} description={t.toolCallDesc} code={TOOL_CALL_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <ToolCall name="searchDocs" kind="search" status="success" output="Found Chart and the component catalog." />
          <ToolCall name="editFile" kind="edit" status="running" />
        </Flex>
      </ComponentPreview>
      <PropsTable title={t.props} rows={TOOL_CALL_PROPS} />
    </DocPage>
  );
};

export default ToolCallPage;
