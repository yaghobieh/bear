import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
} from '@forgedevstack/bear';

const ResponsiveUi: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Responsive UI
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
      Build responsive interfaces with Bear using breakpoints, the Grid component, and the useIsMobile hook.
    </Typography>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Breakpoints</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Bear uses Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
        </Typography>
        <CodeBlock
          code={`<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Grid Responsive Columns</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Use responsive props for cols: <code>{`cols={{ base: 1, md: 2, lg: 3 }}`}</code>
        </Typography>
        <CodeBlock
          code={`import { Grid } from '@forgedevstack/bear';

<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">useIsMobile Hook</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Conditionally render or adjust layout based on viewport.
        </Typography>
        <CodeBlock
          code={`import { useIsMobile } from '@forgedevstack/bear';

const MyComponent = () => {
  const isMobile = useIsMobile(); // true when width < 640px
  return isMobile ? <MobileNav /> : <DesktopNav />;
};`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Mobile-First Approach</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Start with mobile styles, then add breakpoint prefixes. Base classes apply to all; md: and lg: override for larger screens.
        </Typography>
      </CardBody>
    </Card>

    <Card variant="outlined">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Responsive Typography</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Use Tailwind text size utilities: <code>text-base md:text-lg lg:text-xl</code> for fluid typography.
        </Typography>
      </CardBody>
    </Card>
  </div>
);

export default ResponsiveUi;
