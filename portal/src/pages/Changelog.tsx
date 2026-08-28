import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CHANGELOG_ENTRIES } from '@/constants/changelog.const';
import { useNpmPackageVersion } from '@/hooks/useNpmPackageVersion';

const ChangelogPage: FC = () => {
  const { version } = useNpmPackageVersion();

  return (
    <article className="doc-page fade-in">
      <header className="doc-page__header">
        <h1 className="doc-page__title">Changelog</h1>
        <p className="doc-page__description">
          Latest updates and release notes for Bear UI. npm latest is v{version}.
        </p>
      </header>

      <div className="changelog-feed">
        {CHANGELOG_ENTRIES.map((entry) => (
          <section key={entry.version} id={`v${entry.version}`} className="changelog-entry">
            <div className="changelog-entry__meta">
              <h2 className="changelog-entry__version">
                <Link to={`/changelog#v${entry.version}`}>v{entry.version}</Link>
              </h2>
              <time className="changelog-entry__date">{entry.date}</time>
            </div>

            {entry.sections.map((section) => (
              <div key={section.title} className="changelog-entry__section">
                <h3 className="changelog-entry__section-title">{section.title}</h3>
                <ul className="changelog-entry__list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>

      <p className="doc-muted mt-12 text-sm">
        Full history on{' '}
        <a href="https://github.com/yaghobieh/bear/releases" className="text-pink-600 dark:text-pink-400">
          GitHub Releases
        </a>
        .
      </p>
    </article>
  );
};

export default ChangelogPage;
