import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const ZIndex: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      z-index
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400">
      Bear uses consistent z-index values for overlays, modals, and tooltips.
    </Typography>
    <Card variant="outlined">
      <CardBody>
        <CodeBlock
          code={`Tooltip: 1000
Dropdown: 1050
Modal: 1100
Drawer: 1150`}
          language="text"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>
  </div>
);

export default ZIndex;
