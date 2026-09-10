import { ThemeSwitcher } from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { THEME_SWITCHER_CODE, THEME_SWITCHER_PROPS } from './ThemeSwitcherPage.const';

const ThemeSwitcherPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="ThemeSwitcher" badge="New" description={t.themeSwitcherDesc} componentName="ThemeSwitcher">
      <ComponentPreview title={t.themeSwitcherDesc} description={t.themeSwitcherDesc} code={THEME_SWITCHER_CODE}>
        <ThemeSwitcher />
      </ComponentPreview>
      <PropsTable title={t.props} rows={THEME_SWITCHER_PROPS} />
    </DocPage>
  );
};

export default ThemeSwitcherPage;
