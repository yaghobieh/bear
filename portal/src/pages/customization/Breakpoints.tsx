import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const Breakpoints: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Breakpoints
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400">
      Bear uses Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
    </Typography>
    <Card variant="outlined">
      <CardBody>
        <CodeBlock
          code={`sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px`}
          language="text"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>
  </div>
);

export default Breakpoints;
