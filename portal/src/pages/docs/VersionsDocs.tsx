import { FC } from 'react';
import { BEAR_VERSION, VERSIONS } from '@/constants/navigation.const';
import { useDocsVersion } from '@/context/DocsVersionContext';

const VersionsDocsPage: FC = () => {
  const { version, notes } = useDocsVersion();

  return (
    <article className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Versions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        The current docs describe Bear {BEAR_VERSION}. Use the version menu in the sidebar to pin another release on every page. The component examples stay on the latest API. The notes below follow the menu.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selected: v{version}</h2>
        {notes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No release notes are stored for v{version}.</p>
        ) : (
          notes.map((entry) => (
            <div key={entry.version} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                v{entry.version}
                <span className="ml-2 text-sm font-normal text-gray-500">{entry.date}</span>
              </h3>
              {entry.sections.map((section) => (
                <div key={section.title} className="mb-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{section.title}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Published versions</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {VERSIONS.map((item) => (
            <li key={item.value} className="text-gray-700 dark:text-gray-300">
              {item.label}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default VersionsDocsPage;
