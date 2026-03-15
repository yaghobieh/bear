import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BearIcons } from '@forgedevstack/bear';
import { getPrevNext } from '@/utils/docNav';

export const DocPageNav: FC = () => {
  const location = useLocation();
  const { prev, next } = getPrevNext(location.pathname);

  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4"
      aria-label="Page navigation"
    >
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors max-w-[45%] min-w-0"
        >
          <BearIcons.ChevronLeftIcon size={16} className="flex-shrink-0 text-pink-500 dark:text-pink-400" />
          <span className="truncate">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors max-w-[45%] min-w-0 ml-auto text-right"
        >
          <span className="truncate">{next.label}</span>
          <BearIcons.ChevronRightIcon size={16} className="flex-shrink-0 text-pink-500 dark:text-pink-400" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};

export default DocPageNav;
