import type { PropRow } from '@/components/PropsTable';

export const ARTIFACT_CARD_PROPS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Artifact name' },
  { name: 'kind', type: "'code' | 'doc' | 'preview'", default: 'code', description: 'Artifact type' },
  { name: 'onOpen', type: '() => void', description: 'Open action' },
  { name: 'children', type: 'ReactNode', description: 'Preview body' },
];

export const ARTIFACT_CARD_SNIPPET = '<PromptComposer onSubmit={send} />';

export const ARTIFACT_CARD_CODE = `import { ArtifactCard, Typography } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <ArtifactCard title="composer.tsx" kind="code">
      <Typography variant="code">{'<PromptComposer onSubmit={send} />'}</Typography>
    </ArtifactCard>
  );
}
`;

export const ARTIFACT_CARD_DOC_CODE = `import { ArtifactCard, Typography } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <ArtifactCard title="Release notes" kind="doc">
      <Typography>Chart grow animation and the component catalog.</Typography>
    </ArtifactCard>
  );
}
`;
