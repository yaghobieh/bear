import { ModalsProvider } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  MODALS_PROVIDER_BADGE,
  MODALS_PROVIDER_CONFIRM_CODE,
  MODALS_PROVIDER_CONFIRM_OPTION_ROWS,
  MODALS_PROVIDER_IMPORT_NAME,
  MODALS_PROVIDER_METHOD_ROWS,
  MODALS_PROVIDER_OPEN_CODE,
  MODALS_PROVIDER_OPEN_OPTION_ROWS,
  MODALS_PROVIDER_PROPS,
  MODALS_PROVIDER_STACK_CODE,
  MODALS_PROVIDER_TITLE,
} from './ModalsProvider.const';
import { ConfirmModalDemo } from './ConfirmModalDemo';
import { OpenModalDemo } from './OpenModalDemo';
import { StackModalDemo } from './StackModalDemo';

const ModalsProviderPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage
      title={MODALS_PROVIDER_TITLE}
      badge={MODALS_PROVIDER_BADGE}
      description={t.modalsProviderDesc}
      componentName={MODALS_PROVIDER_IMPORT_NAME}
    >
      <ComponentPreview
        title={t.modalsProviderBasic}
        description={t.modalsProviderOpenDesc}
        code={MODALS_PROVIDER_OPEN_CODE}
      >
        <ModalsProvider>
          <OpenModalDemo />
        </ModalsProvider>
      </ComponentPreview>

      <ComponentPreview
        title={t.modalsProviderConfirm}
        description={t.modalsProviderConfirmDesc}
        code={MODALS_PROVIDER_CONFIRM_CODE}
      >
        <ModalsProvider>
          <ConfirmModalDemo />
        </ModalsProvider>
      </ComponentPreview>

      <ComponentPreview
        title={t.modalsProviderStack}
        description={t.modalsProviderStackDesc}
        code={MODALS_PROVIDER_STACK_CODE}
      >
        <ModalsProvider>
          <StackModalDemo />
        </ModalsProvider>
      </ComponentPreview>

      <PropsTable title={t.props} rows={MODALS_PROVIDER_PROPS} />
      <PropsTable title={t.modalsProviderMethods} rows={MODALS_PROVIDER_METHOD_ROWS} showDefault={false} />
      <PropsTable title={t.modalsProviderOpenOptions} rows={MODALS_PROVIDER_OPEN_OPTION_ROWS} />
      <PropsTable title={t.modalsProviderConfirmOptions} rows={MODALS_PROVIDER_CONFIRM_OPTION_ROWS} />
    </DocPage>
  );
};

export default ModalsProviderPage;
