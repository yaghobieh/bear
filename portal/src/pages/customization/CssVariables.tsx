import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const CssVariables: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        CSS Variables
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        BearProvider injects CSS custom properties on :root. Override them in your stylesheet or use them in custom components.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Color Variables
        </Typography>
        <CodeBlock
          code={`/* Primary, secondary, success, warning, danger, info, neutral */
--bear-primary-50 through --bear-primary-950
--bear-secondary-*
--bear-success-*
--bear-warning-*
--bear-danger-*
--bear-info-*
--bear-neutral-*

/* Background & text */
--bear-bg-primary
--bear-bg-secondary
--bear-bg-tertiary
--bear-text-primary
--bear-text-secondary
--bear-text-muted
--bear-text-inverted

/* Borders */
--bear-border-default
--bear-border-subtle
--bear-border-strong`}
          language="css"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Typography & Layout
        </Typography>
        <CodeBlock
          code={`--bear-font-sans
--bear-font-mono
--bear-spacing-0, --bear-spacing-1, --bear-spacing-2, ...
--bear-radius-none, --bear-radius-sm, --bear-radius-md, --bear-radius-lg, ...
--bear-shadow-none, --bear-shadow-sm, --bear-shadow-md, --bear-shadow-lg, ...`}
          language="css"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Override Example
        </Typography>
        <CodeBlock
          code={`:root {
  --bear-primary-500: #ec4899;
  --bear-font-sans: 'Inter, sans-serif';
}

.dark {
  --bear-bg-primary: #09090b;
  --bear-text-primary: #fafafa;
}`}
          language="css"
        />
      </section>

      <section>
        <Typography variant="h4" className="mb-4">
          Custom Variants
        </Typography>
        <Typography variant="body2" className="mb-4">
          Custom button variants get --bear-{`{name}-bg`}, --bear-{`{name}-bg-hover`}, --bear-{`{name}-text`}, etc.
        </Typography>
      </section>
    </div>
  );
};

export default CssVariables;
