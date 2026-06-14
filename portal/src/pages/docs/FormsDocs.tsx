import { FC, useState } from 'react';
import { Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  FORGE_FORM_INSTALL,
  FORGE_FORM_QUICK_START,
  ACTION_STATE_EXAMPLE,
  FORMIK_INSTALL,
  FORMIK_EXAMPLE,
  RHF_INSTALL,
  RHF_EXAMPLE,
} from '@/constants/docs';

type FormFramework = 'forge-form' | 'action-state' | 'formik' | 'react-hook-form';

const FRAMEWORK_CUBES: { id: FormFramework; titleKey: string; descKey: string }[] = [
  { id: 'forge-form', titleKey: 'formsForgeForm', descKey: 'formsForgeFormDesc' },
  { id: 'action-state', titleKey: 'formsActionState', descKey: 'formsActionStateDesc' },
  { id: 'formik', titleKey: 'formsFormik', descKey: 'formsFormikDesc' },
  { id: 'react-hook-form', titleKey: 'formsRhf', descKey: 'formsRhfDesc' },
];

const CODE_BY_FRAMEWORK: Record<FormFramework, { install?: string; installKey?: string; code: string; noteKey?: string }> = {
  'forge-form': { install: FORGE_FORM_INSTALL, installKey: 'formsInstall', code: FORGE_FORM_QUICK_START },
  'action-state': { code: ACTION_STATE_EXAMPLE, noteKey: 'formsActionStateNote' },
  formik: { install: FORMIK_INSTALL, installKey: 'formsInstallFormik', code: FORMIK_EXAMPLE },
  'react-hook-form': { install: RHF_INSTALL, installKey: 'formsInstallRhf', code: RHF_EXAMPLE },
};

const FormsDocsPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [selected, setSelected] = useState<FormFramework>('forge-form');
  const active = CODE_BY_FRAMEWORK[selected];

  return (
    <DocPage title={t.formsTitle} description={t.formsDesc}>
      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.formsPickFramework}</Typography>
        <div className="grid gap-4 sm:grid-cols-2">
          {FRAMEWORK_CUBES.map((cube) => (
            <button
              key={cube.id}
              type="button"
              onClick={() => setSelected(cube.id)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                selected === cube.id
                  ? 'border-pink-400 dark:border-pink-600 bg-pink-50/50 dark:bg-pink-950/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700'
              }`}
            >
              <Typography variant="body2" className="font-semibold mb-1">{t[cube.titleKey]}</Typography>
              <Typography variant="body2" color="muted">{t[cube.descKey]}</Typography>
            </button>
          ))}
        </div>
      </section>

      {active.install && active.installKey && (
        <section className="doc-section mb-10">
          <Typography variant="h4" className="doc-section__title mb-3">{t[active.installKey]}</Typography>
          <CodeBlock code={active.install} language="bash" showLineNumbers={false} />
        </section>
      )}

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">{t.formsQuickStart}</Typography>
        {active.noteKey && (
          <Typography variant="body2" color="muted" className="mb-4">{t[active.noteKey]}</Typography>
        )}
        <CodeBlock code={active.code} language="tsx" />
      </section>
    </DocPage>
  );
};

export default FormsDocsPage;
