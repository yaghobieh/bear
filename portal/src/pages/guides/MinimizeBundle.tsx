import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
} from '@forgedevstack/bear';

const MinimizeBundle: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Minimize Bundle Size
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
      Keep your Bear bundle lean with tree-shaking, lazy loading, and code splitting.
    </Typography>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Tree-Shaking</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Import only what you need. Bundlers remove unused exports.
        </Typography>
        <CodeBlock
          code={`// Good — only Button is bundled
import { Button } from '@forgedevstack/bear';

// Avoid — pulls in entire library
import * as Bear from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Lazy Loading with React.lazy</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Defer loading heavy components until they are needed.
        </Typography>
        <CodeBlock
          code={`const RichEditor = lazy(() => import('@forgedevstack/bear').then(m => ({ default: m.RichEditor })));

<Suspense fallback={<Spinner />}>
  <RichEditor />
</Suspense>`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Code Splitting</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Split routes or features into separate chunks. Vite and webpack support dynamic imports.
        </Typography>
        <CodeBlock
          code={`const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SettingsPage = lazy(() => import('./pages/Settings'));`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">PurgeCSS for Tailwind</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Tailwind's built-in purge removes unused utility classes in production. Ensure content paths include your component files.
        </Typography>
      </CardBody>
    </Card>
  </div>
);

export default MinimizeBundle;
