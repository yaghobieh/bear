import type { PropRow } from '@/components/PropsTable';

export const TOOL_CALL_PROPS: PropRow[] = [
  { name: 'name', type: 'string', description: 'Tool name' },
  { name: 'kind', type: "'search' | 'plan' | 'edit' | 'generic'", default: 'generic', description: 'Tool family' },
  { name: 'status', type: "'pending' | 'running' | 'success' | 'error'", default: 'pending', description: 'Run state' },
  { name: 'input', type: 'ReactNode', description: 'Request payload' },
  { name: 'output', type: 'ReactNode', description: 'Result payload' },
];

export const TOOL_CALL_CODE = `import { Flex, ToolCall } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {
  return (
    <Flex direction="column" gap={3}>
      <ToolCall
        name="searchDocs"
        kind="search"
        status="success"
        output="Found Chart and the component catalog."
      />
      <ToolCall name="editFile" kind="edit" status="running" />
    </Flex>
  );
}
`;
