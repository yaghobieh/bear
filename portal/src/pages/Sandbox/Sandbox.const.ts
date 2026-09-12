export const SANDBOX_COPY_RESET_MS = 1600;
export const SANDBOX_QUERY_PATH = 'path';

export const SANDBOX_STARTER_APP = `import {
  Alert,
  AppBar,
  Badge,
  BearProvider,
  Button,
  Chart,
  ChatError,
  Flex,
  FormSkeleton,
  MessageActions,
  PromptSuggestions,
  StatCard,
  Typography,
} from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const chartData = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

export default function App() {
  return (
    <BearProvider>
      <AppBar title="Bear sandbox" />
      <Flex direction="column" gap={4} className="bear-p-6">
        <Typography variant="h4">Bear starter</Typography>
        <Flex gap={2} wrap="wrap">
          <Button>Primary</Button>
          <Badge variant="primary">New</Badge>
        </Flex>
        <PromptSuggestions
          suggestions={[
            { id: 'plan', label: 'Draft a plan' },
            { id: 'cite', label: 'Cite sources' },
          ]}
        />
        <MessageActions onCopy={() => undefined} onRetry={() => undefined} />
        <ChatError>The model timed out.</ChatError>
        <FormSkeleton fields={2} />
        <Chart type="bar" data={chartData} height={180} showLabels />
        <Flex gap={3} wrap="wrap">
          <StatCard title="Users" value="1.2k" />
          <StatCard title="Revenue" value="$48k" color="#8b5cf6" />
        </Flex>
        <Alert severity="success">This sandbox covers the Bear kit end to end.</Alert>
      </Flex>
    </BearProvider>
  );
}
`;

export const SANDBOX_PACKAGE_JSON = `{
  "name": "bear-sandbox",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "@forgedevstack/bear": "latest"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
`;
