import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const Palette: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Palette
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Bear uses a semantic color system with primary, secondary, success, warning, error (danger), and info. Each color has a full scale from 50 to 950.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Semantic Colors
        </Typography>
        <Typography variant="body2" className="mb-4">
          primary, secondary, success, warning, danger (error), info, neutral
        </Typography>
        <CodeBlock
          code={`<BearProvider
  theme={{
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#0ea5e9',
    },
  }}
>
  <App />
</BearProvider>`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Color Scale
        </Typography>
        <Typography variant="body2" className="mb-4">
          Each color exposes shades 50–950 via CSS variables. Pass a hex string and Bear auto-generates the scale.
        </Typography>
        <CodeBlock
          code={`/* Primary scale */
--bear-primary-50
--bear-primary-100
--bear-primary-500  /* main */
--bear-primary-600
--bear-primary-950

/* Gray/neutral */
--bear-neutral-100
--bear-neutral-500
--bear-neutral-900`}
          language="css"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Full Scale Override
        </Typography>
        <CodeBlock
          code={`theme={{
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      500: '#ec4899',
      900: '#831843',
      950: '#500724',
    },
  },
}}`}
          language="tsx"
        />
      </section>

      <section>
        <Typography variant="h4" className="mb-4">
          Background & Text
        </Typography>
        <Typography variant="body2" className="mb-4">
          BearProvider also sets --bear-bg-primary, --bear-text-primary, --bear-border-default, etc.
        </Typography>
      </section>
    </div>
  );
};

export default Palette;
