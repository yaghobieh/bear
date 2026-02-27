import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const TypographyCustomization: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Typography Customization
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Customize typography via variants, font family, weight, and line height. Bear maps Typography variants to theme values.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Built-in Variants
        </Typography>
        <Typography variant="body2" className="mb-4">
          h1–h6, body1, body2, subtitle1, subtitle2, caption, overline, code
        </Typography>
        <CodeBlock
          code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption</Typography>
<Typography variant="overline">Overline</Typography>`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Font Family via Theme
        </Typography>
        <CodeBlock
          code={`<BearProvider
  theme={{
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, sans-serif',
        mono: 'JetBrains Mono, monospace',
      },
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
          CSS Variables
        </Typography>
        <CodeBlock
          code={`:root {
  --bear-font-sans: 'Inter, system-ui, sans-serif';
  --bear-font-mono: 'JetBrains Mono, monospace';
}

/* Custom variant via CSS */
.my-heading {
  font-family: var(--bear-font-sans);
  font-weight: 700;
  line-height: 1.25;
}`}
          language="css"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Custom Typography Variants
        </Typography>
        <CodeBlock
          code={`<BearProvider
  customTypography={{
    display1: { fontSize: '4rem', fontWeight: 800 },
    label: { fontSize: '12px', fontWeight: 'medium', textTransform: 'uppercase' },
  }}
>
  <Typography variant="display1">Display</Typography>
  <Typography variant="label">Label</Typography>
</BearProvider>`}
          language="tsx"
        />
      </section>
    </div>
  );
};

export default TypographyCustomization;
