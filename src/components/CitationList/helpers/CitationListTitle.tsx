import { Link } from '../../Link';
import { Typography } from '../../Typography';
import type { CitationListTitleProps } from '../CitationList.types';

export const CitationListTitle = (props: CitationListTitleProps) => {
  const { citation } = props;
  if (!citation.href) {
    return <Typography variant="subtitle2">{citation.title}</Typography>;
  }
  return <Link href={citation.href}>{citation.title}</Link>;
};
