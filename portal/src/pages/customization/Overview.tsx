import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const Overview: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Customization Overview
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Bear UI provides a flexible theming system built on BearProvider, CSS variables, and a theme object. Customize colors, typography, spacing, and more to match your brand.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          BearProvider
        </Typography>
        <Typography variant="body2" className="mb-4">
          Wrap your app with BearProvider to enable theming. It provides theme context and injects CSS variables into the document root.
        </Typography>
        <CodeBlock
          code={`import { BearProvider } from '@forgedevstack/bear';

function App() {
  return (
    <BearProvider defaultMode="dark" theme={{ colors: { primary: '#ec4899' } }}>
      <YourApp />
    </BearProvider>
  );
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Key Concepts
        </Typography>
        <Typography variant="body2" className="mb-4">
          The customization system consists of:
        </Typography>
        <Card className="mb-4">
          <CardBody>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>defaultMode</strong> — Initial light/dark mode</li>
              <li><strong>theme</strong> — Override colors, typography, spacing, shadows, borders</li>
              <li><strong>CSS variables</strong> — BearProvider sets --bear-* variables on :root</li>
              <li><strong>persistPreference</strong> — Save theme mode to localStorage</li>
            </ul>
          </CardBody>
        </Card>
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Quick Example
        </Typography>
        <CodeBlock
          code={`<BearProvider
  defaultMode="dark"
  theme={{
    colors: { primary: '#ec4899' },
    typography: { fontFamily: { sans: 'Inter, sans-serif' } },
  }}
  persistPreference={true}
  storageKey="my-app-theme"
>
  <App />
</BearProvider>`}
          language="tsx"
        />
      </section>

      <section>
        <Typography variant="h4" className="mb-4">
          Learn More
        </Typography>
        <Typography variant="body2" className="mb-4">
          Explore the customization pages for detailed guides on Palette, Typography, Spacing, Breakpoints, z-index, Dark Mode, CSS Variables, and Custom Components.
        </Typography>
      </section>
    </div>
  );
};

export default Overview;
