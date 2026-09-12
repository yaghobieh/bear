import type { PropRow } from '@/components/PropsTable';
import type { CitationItem } from '@forgedevstack/bear';

export const CITATION_LIST_ITEMS: CitationItem[] = [
  { id: '1', title: 'Bear Chat API', href: '/components/chat', excerpt: 'Composer, streaming, and live region' },
  { id: '2', title: 'Chart', href: '/components/chart', excerpt: 'Bar, line, pie, radar, and funnel' },
  { id: '3', title: 'Internal note', excerpt: 'No link — title only' },
];

export const CITATION_LIST_PROPS: PropRow[] = [
  { name: 'citations', type: 'CitationItem[]', description: 'Sources with title, href, and excerpt' },
];

export const CITATION_LIST_CODE = `import { CitationList } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <CitationList
      citations={[
        { id: '1', title: 'Bear Chat API', href: '/components/chat', excerpt: 'Composer, streaming, and live region' },
        { id: '2', title: 'Internal note', excerpt: 'No link — title only' },
      ]}
    />
  );
}
`;
