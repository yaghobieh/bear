import { FC } from 'react';
import { CodeEditor, DiffSquares, DiffViewer, JsonViewer, Terminal } from '@forgedevstack/bear-x-code';
import { Flex, Typography } from '@forgedevstack/bear';

const SOURCE = `import { Button } from '@forgedevstack/bear';

export const Demo = () => <Button>Click me</Button>;
`;

const NEXT_SOURCE = `import { Button } from '@forgedevstack/bear';

export const Demo = () => <Button variant="outline">Click me</Button>;
`;

export const CodeGallery: FC = () => (
    <Flex direction="column" gap={4}>
      <div>
        <Typography variant="h5" className="mb-2">CodeEditor</Typography>
        <CodeEditor value={SOURCE} language="tsx" theme="dark" showLineNumbers height={140} readOnly />
      </div>
      <div>
        <Typography variant="h5" className="mb-2">Terminal</Typography>
        <Terminal
          title="bear"
          lines={[
            { id: '1', type: 'input', content: 'npm install @forgedevstack/bear' },
            { id: '2', type: 'success', content: 'added @forgedevstack/bear' },
          ]}
        />
      </div>
      <div>
        <Typography variant="h5" className="mb-2">DiffViewer</Typography>
        <DiffViewer oldValue={SOURCE} newValue={NEXT_SOURCE} language="tsx" showLineNumbers />
      </div>
      <div>
        <Typography variant="h5" className="mb-2">DiffSquares</Typography>
        <DiffSquares additionsText="+12" deletionsText="-4" cubeCount={8} />
      </div>
      <div>
        <Typography variant="h5" className="mb-2">JsonViewer</Typography>
        <JsonViewer data={{ package: '@forgedevstack/bear-x-code', charts: false, icons: false }} defaultExpandDepth={2} />
      </div>
    </Flex>
);
