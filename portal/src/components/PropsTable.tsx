import { FC } from 'react';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  title: string;
  rows: PropRow[];
  showDefault?: boolean;
}

export const PropsTable: FC<PropsTableProps> = (props) => {
  const { title, rows, showDefault = true } = props;
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <section className="doc-section mb-12">
      <h2 className="doc-section__title">{title}</h2>
      <div className="doc-table-wrap overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="doc-table w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
              <th className="doc-table__th">{t.propColProp}</th>
              <th className="doc-table__th">{t.propColType}</th>
              {showDefault && <th className="doc-table__th">{t.propColDefault}</th>}
              <th className="doc-table__th">{t.propColDescription}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {rows.map((r) => (
              <tr key={r.name} className="bg-white dark:bg-zinc-950">
                <td className="doc-table__td font-mono text-pink-600 dark:text-pink-400">{r.name}</td>
                <td className="doc-table__td"><code className="doc-code-inline">{r.type}</code></td>
                {showDefault && <td className="doc-table__td text-zinc-500">{r.default ?? '—'}</td>}
                <td className="doc-table__td text-zinc-600 dark:text-zinc-400">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
