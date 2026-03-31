import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Card, Badge, useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from '@forgedevstack/bear';

const UseMediaQueryPage: FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isSm = useMediaQuery('sm');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  const isXl = useMediaQuery('xl');
  const isDark = useMediaQuery('dark');
  const isLandscape = useMediaQuery('landscape');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">useMediaQuery</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Track CSS media queries reactively. Use predefined breakpoint keys (<code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">sm</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">md</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">lg</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">xl</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">2xl</code>) or any raw media query string.
        Bear also ships convenience hooks: <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useIsMobile</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useIsTablet</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useIsDesktop</code>.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Breakpoint shortcuts"
        description="Pass a Tailwind breakpoint key instead of a full media query string."
        code={`const isSm = useMediaQuery('sm');   // >= 640px
const isMd = useMediaQuery('md');   // >= 768px
const isLg = useMediaQuery('lg');   // >= 1024px
const isXl = useMediaQuery('xl');   // >= 1280px
const is2xl = useMediaQuery('2xl'); // >= 1536px`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant={isSm ? 'success' : 'secondary'}>sm {isSm ? '✓' : '✗'}</Badge>
          <Badge variant={isMd ? 'success' : 'secondary'}>md {isMd ? '✓' : '✗'}</Badge>
          <Badge variant={isLg ? 'success' : 'secondary'}>lg {isLg ? '✓' : '✗'}</Badge>
          <Badge variant={isXl ? 'success' : 'secondary'}>xl {isXl ? '✓' : '✗'}</Badge>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Convenience helpers"
        description="One-liner hooks for the most common breakpoints."
        code={`const isMobile  = useIsMobile();   // < 768px
const isTablet  = useIsTablet();   // 768–1023px
const isDesktop = useIsDesktop();  // >= 1024px`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant={isMobile ? 'primary' : 'secondary'}>Mobile {isMobile ? '✓' : '—'}</Badge>
          <Badge variant={isTablet ? 'primary' : 'secondary'}>Tablet {isTablet ? '✓' : '—'}</Badge>
          <Badge variant={isDesktop ? 'primary' : 'secondary'}>Desktop {isDesktop ? '✓' : '—'}</Badge>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom media queries"
        description="Pass any valid CSS media query string."
        code={`const isDark = useMediaQuery('dark');         // prefers-color-scheme
const isLandscape = useMediaQuery('landscape'); // orientation
const isRetina = useMediaQuery('(min-resolution: 2dppx)');
const isWide = useMediaQuery('(min-width: 1600px)');`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant={isDark ? 'primary' : 'secondary'}>Dark mode {isDark ? '✓' : '—'}</Badge>
          <Badge variant={isLandscape ? 'primary' : 'secondary'}>Landscape {isLandscape ? '✓' : '—'}</Badge>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comparison with MUI</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          If you are coming from Material UI, Bear's <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useMediaQuery</code> works the same way but with shorter syntax thanks to predefined breakpoint keys.
        </p>
        <CodeBlock
          code={`// MUI approach
const theme = useTheme();
const isXl = useMediaQuery(theme.breakpoints.up('xl'));
const isLg = useMediaQuery(theme.breakpoints.up('lg'));
const isMd = useMediaQuery(theme.breakpoints.up('md'));

// Bear approach — same result, no theme import needed
const isXl = useMediaQuery('xl');
const isLg = useMediaQuery('lg');
const isMd = useMediaQuery('md');

// Or use convenience hooks
const isMobile = useIsMobile();   // < 768px
const isDesktop = useIsDesktop(); // >= 1024px`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">useResponsive</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Resolve a value per breakpoint — like responsive props in Chakra or Mantine. Returns the value matching the current viewport width.
        </p>
        <CodeBlock
          code={`import { useResponsive, useResponsiveProps } from '@forgedevstack/bear';

// Single responsive value
const columns = useResponsive({ base: 1, sm: 2, md: 3, lg: 4 });
// Returns 1 on mobile, 2 on sm, 3 on md, 4 on lg+

// Multiple responsive values at once
const { columns, gap, size } = useResponsiveProps({
  columns: { base: 1, md: 2, lg: 4 },
  gap: { base: 2, md: 4 },
  size: 'md', // non-responsive — returned as-is
});`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Override breakpoints via BearProvider</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Pass <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">theme.breakpoints</code> to the provider to override any built-in breakpoint or add custom ones. All hooks (<code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useMediaQuery</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useResponsive</code>, <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">useIsMobile</code>, etc.) and all components that rely on them will automatically use the overridden values.
        </p>
        <CodeBlock
          code={`import { BearProvider, useMediaQuery } from '@forgedevstack/bear';

<BearProvider
  theme={{
    breakpoints: {
      xl: '2500px',   // override: was 1280px
      xxl: '3000px',  // add a custom key
    },
  }}
>
  <App />
</BearProvider>

// Inside any component:
const isXl  = useMediaQuery('xl');   // now matches >= 2500px
const isXxl = useMediaQuery('xxl');  // matches >= 3000px

// useResponsive also respects the override:
const cols = useResponsive({ base: 1, md: 2, xl: 4 });
// xl now triggers at 2500px instead of 1280px`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Predefined breakpoints</h2>
        <Card className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-3 font-medium">Key</th>
                <th className="text-left p-3 font-medium">Media query</th>
                <th className="text-left p-3 font-medium">Current</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">sm</td><td className="p-3">(min-width: 640px)</td><td className="p-3">{isSm ? '✓ matches' : '—'}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">md</td><td className="p-3">(min-width: 768px)</td><td className="p-3">{isMd ? '✓ matches' : '—'}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">lg</td><td className="p-3">(min-width: 1024px)</td><td className="p-3">{isLg ? '✓ matches' : '—'}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">xl</td><td className="p-3">(min-width: 1280px)</td><td className="p-3">{isXl ? '✓ matches' : '—'}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">2xl</td><td className="p-3">(min-width: 1536px)</td><td className="p-3">—</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">dark</td><td className="p-3">(prefers-color-scheme: dark)</td><td className="p-3">{isDark ? '✓ matches' : '—'}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">light</td><td className="p-3">(prefers-color-scheme: light)</td><td className="p-3">—</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">reducedMotion</td><td className="p-3">(prefers-reduced-motion: reduce)</td><td className="p-3">—</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="p-3 font-mono text-pink-500">portrait</td><td className="p-3">(orientation: portrait)</td><td className="p-3">—</td></tr>
              <tr><td className="p-3 font-mono text-pink-500">landscape</td><td className="p-3">(orientation: landscape)</td><td className="p-3">{isLandscape ? '✓ matches' : '—'}</td></tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API</h2>
        <Card className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-3 font-medium">Hook</th>
                <th className="text-left p-3 font-medium">Params</th>
                <th className="text-left p-3 font-medium">Returns</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">useMediaQuery</td>
                <td className="p-3 font-mono">(query, options?)</td>
                <td className="p-3">boolean</td>
                <td className="p-3">Track any media query or breakpoint key</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">useIsMobile</td>
                <td className="p-3 font-mono">()</td>
                <td className="p-3">boolean</td>
                <td className="p-3">True when viewport &lt; 768px</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">useIsTablet</td>
                <td className="p-3 font-mono">()</td>
                <td className="p-3">boolean</td>
                <td className="p-3">True when viewport is 768–1023px</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">useIsDesktop</td>
                <td className="p-3 font-mono">()</td>
                <td className="p-3">boolean</td>
                <td className="p-3">True when viewport &gt;= 1024px</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-3 font-mono text-pink-500">useResponsive</td>
                <td className="p-3 font-mono">(prop)</td>
                <td className="p-3">T</td>
                <td className="p-3">Resolve a responsive prop to its current value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-500">useResponsiveProps</td>
                <td className="p-3 font-mono">(props)</td>
                <td className="p-3">Record</td>
                <td className="p-3">Resolve multiple responsive props at once</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
};

export default UseMediaQueryPage;
