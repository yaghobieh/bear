import { FC } from 'react';
import { Link } from 'react-router-dom';
import type { AboutLink } from '../About.types';

interface AboutLinkItemProps {
  item: AboutLink;
  label: string;
}

export const AboutLinkItem: FC<AboutLinkItemProps> = (props) => {
  const { item, label } = props;
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-pink-600 dark:text-pink-400">
        {label}
      </a>
    );
  }
  return (
    <Link to={item.href} className="text-sm font-semibold text-pink-600 dark:text-pink-400">
      {label}
    </Link>
  );
};
