import { FC } from 'react';
import { CopyImport } from '@/components/CopyImport';
import type { DocPageProps } from './DocPage.types';

export const DocPage: FC<DocPageProps> = (props) => {
  const { title, description, badge, icon, componentName, children } = props;

  return (
    <article className="doc-page fade-in">
      <header className="doc-page__header">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h1 className="doc-page__title">{title}</h1>
          {badge && <span className="doc-page__badge">{badge}</span>}
        </div>
        <p className="doc-page__description">{description}</p>
        {componentName && (
          <div className="doc-page__import mt-6">
            <CopyImport componentName={componentName} />
          </div>
        )}
      </header>
      <div className="doc-page__body">{children}</div>
    </article>
  );
};
