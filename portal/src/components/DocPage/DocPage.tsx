import { FC } from 'react';
import { CopyImport } from '@/components/CopyImport';
import { ComponentSandboxLink } from '@/components/ComponentSandboxLink';
import type { DocPageProps } from './DocPage.types';

export const DocPage: FC<DocPageProps> = (props) => {
  const { title, description, badge, icon, componentName, children } = props;

  return (
    <article className="doc-page fade-in w-full max-w-full min-w-0">
      <header className="doc-page__header">
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-3">
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            {icon}
            <h1 className="doc-page__title break-words">{title}</h1>
            {badge && <span className="doc-page__badge shrink-0">{badge}</span>}
          </div>
          <div className="flex items-center shrink-0">
            <ComponentSandboxLink />
          </div>
        </div>
        <p className="doc-page__description">{description}</p>
        {componentName && (
          <div className="doc-page__import mt-6 max-w-full overflow-x-auto">
            <CopyImport componentName={componentName} />
          </div>
        )}
      </header>
      <div className="doc-page__body w-full max-w-full min-w-0">{children}</div>
    </article>
  );
};
