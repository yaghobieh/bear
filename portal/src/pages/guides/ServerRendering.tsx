import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
} from '@forgedevstack/bear';

const ServerRendering: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Server Rendering
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
      Use Bear with SSR frameworks (Next.js, Remix, etc.). Wrap your app with BearProvider on the server.
    </Typography>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">BearProvider on Server</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Wrap your app with BearProvider so theme and mode are available during SSR.
        </Typography>
        <CodeBlock
          code={`import { BearProvider } from '@forgedevstack/bear';

export default function App({ children }) {
  return (
    <BearProvider mode="auto">
      {children}
    </BearProvider>
  );
}`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Hydration</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Bear components are hydration-safe. Ensure client and server render the same initial output.
        </Typography>
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Avoid useLayoutEffect Issues</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          useLayoutEffect runs only on the client. For SSR, use useEffect or conditionally call useLayoutEffect.
        </Typography>
        <CodeBlock
          code={`// Bear uses useEffect where SSR matters.
// If you use useLayoutEffect in custom code, guard it:
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Dynamic Imports</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Use dynamic imports with ssr: false for client-only components (e.g. charts, editors).
        </Typography>
      </CardBody>
    </Card>
  </div>
);

export default ServerRendering;
