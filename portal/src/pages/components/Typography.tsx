import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Typography, Alert } from '@forgedevstack/bear';

const TypographyPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Typography</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Typography component for consistent text styling. Create custom variants like "b250" with your own sizes!
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Typography } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Built-in Variants"
        description="Standard text styles for hierarchy."
        code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="body1">Body text 1</Typography>
<Typography variant="body2">Body text 2</Typography>
<Typography variant="caption">Caption text</Typography>
<Typography variant="overline">OVERLINE</Typography>`}
      >
        <div className="space-y-3">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="body1">Body text 1</Typography>
          <Typography variant="body2">Body text 2</Typography>
          <Typography variant="caption">Caption text</Typography>
          <Typography variant="overline">OVERLINE</Typography>
        </div>
      </ComponentPreview>

      {/* Custom Typography - NEW! */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🎨 Custom Typography Variants
        </h2>
        <Alert severity="success" className="mb-4">
          <strong>New in v1.0.10!</strong> Create your own typography variants like "b250", "display1", etc.
        </Alert>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Define custom typography once in BearProvider, use them anywhere:
        </p>
        
        <CodeBlock 
          code={`<BearProvider
  customTypography={{
    // Custom 25px bold text
    b250: { 
      fontSize: '25px', 
      fontWeight: 'bold', 
      lineHeight: '1.2' 
    },
    // Large display text
    display1: { 
      fontSize: '4rem', 
      fontWeight: 800, 
      letterSpacing: '-0.025em',
      component: 'h1'
    },
    // Small label
    label: { 
      fontSize: '12px', 
      fontWeight: 'medium', 
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    // Hero title
    hero: {
      fontSize: '72px',
      fontWeight: 'extrabold',
      lineHeight: '1.1',
      letterSpacing: '-0.02em'
    },
  }}
>
  {/* Now use your custom variants! */}
  <Typography variant="b250">Custom 25px bold text</Typography>
  <Typography variant="display1">Large Display</Typography>
  <Typography variant="label">Label Text</Typography>
  <Typography variant="hero">Hero Title</Typography>
</BearProvider>`}
          language="tsx"
        />

        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Custom Typography Options:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Property</th>
                  <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="py-2 font-medium text-gray-900 dark:text-white">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="py-2 pr-4 font-mono text-bear-600">fontSize</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string</td><td className="py-2 text-gray-600 dark:text-gray-400">"25px", "1.5rem", "2em"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">fontWeight</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string | number</td><td className="py-2 text-gray-600 dark:text-gray-400">"bold", 700, "semibold"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">lineHeight</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string</td><td className="py-2 text-gray-600 dark:text-gray-400">"1.2", "1.5", "32px"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">letterSpacing</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string</td><td className="py-2 text-gray-600 dark:text-gray-400">"0.05em", "1px"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">textTransform</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string</td><td className="py-2 text-gray-600 dark:text-gray-400">"uppercase", "lowercase"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">fontFamily</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">string</td><td className="py-2 text-gray-600 dark:text-gray-400">"'Playfair Display', serif"</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-bear-600">component</td><td className="py-2 pr-4 text-gray-600 dark:text-gray-400">ElementType</td><td className="py-2 text-gray-600 dark:text-gray-400">"h1", "span", "div"</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add at Runtime */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ⚡ Add Typography at Runtime
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Add custom typography variants dynamically:
        </p>
        
        <CodeBlock 
          code={`import { useBear } from '@forgedevstack/bear';

function MyComponent() {
  const { addTypography, hasTypography, getTypography } = useBear();

  // Add a new typography variant at runtime
  useEffect(() => {
    addTypography('promo', { 
      fontSize: '28px', 
      fontWeight: 'bold',
      letterSpacing: '-0.02em'
    });
  }, []);

  // Check if variant exists
  if (hasTypography('promo')) {
    console.log('promo typography is available!');
  }

  // Get typography config
  const config = getTypography('b250');
  console.log(config?.fontSize); // '25px'

  return <Typography variant="promo">Promotional Text!</Typography>;
}`}
          language="tsx"
        />
      </section>

      <ComponentPreview
        title="Colors"
        description="Text with semantic colors or custom hex."
        code={`<Typography color="primary">Primary text</Typography>
<Typography color="secondary">Secondary text</Typography>
<Typography color="success">Success text</Typography>
<Typography color="danger">Error text</Typography>
<Typography color="#ec4899">Custom hex color</Typography>`}
      >
        <div className="flex flex-wrap gap-4">
          <Typography color="primary">Primary text</Typography>
          <Typography color="secondary">Secondary text</Typography>
          <Typography color="success">Success text</Typography>
          <Typography color="danger">Error text</Typography>
          <Typography color="#ec4899">Custom hex color</Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Font Weight"
        description="Control text weight."
        code={`<Typography weight="light">Light (300)</Typography>
<Typography weight="normal">Normal (400)</Typography>
<Typography weight="medium">Medium (500)</Typography>
<Typography weight="semibold">Semibold (600)</Typography>
<Typography weight="bold">Bold (700)</Typography>`}
      >
        <div className="space-y-2">
          <Typography weight="light">Light (300)</Typography>
          <Typography weight="normal">Normal (400)</Typography>
          <Typography weight="medium">Medium (500)</Typography>
          <Typography weight="semibold">Semibold (600)</Typography>
          <Typography weight="bold">Bold (700)</Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Element"
        description="Render as a different HTML element."
        code={`<Typography variant="h1" component="div">H1 styled div</Typography>
<Typography variant="body1" component="span">Body styled span</Typography>`}
      >
        <div className="space-y-2">
          <Typography variant="h1" component="div">H1 styled div</Typography>
          <Typography variant="body1" component="span">Body styled span</Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Truncation"
        description="Handle overflow text."
        code={`<Typography truncate>
  This is a very long text that will be truncated...
</Typography>

<Typography truncate maxLines={2}>
  This text will be limited to 2 lines and then
  show an ellipsis if it overflows.
</Typography>`}
      >
        <div className="space-y-4 max-w-xs">
          <Typography truncate>
            This is a very long text that will be truncated when it exceeds the container width and shows ellipsis
          </Typography>
          <Typography truncate maxLines={2}>
            This text will be limited to 2 lines and then show an ellipsis if it overflows. 
            This is additional content that will be hidden after the second line ends.
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Text Decorations"
        description="Italic, underline, and strikethrough."
        code={`<Typography italic>Italic text</Typography>
<Typography underline>Underlined text</Typography>
<Typography strikethrough>Strikethrough text</Typography>`}
      >
        <div className="space-y-2">
          <Typography italic>Italic text</Typography>
          <Typography underline>Underlined text</Typography>
          <Typography strikethrough>Strikethrough text</Typography>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>h1-h6 | body1 | body2 | caption | overline | custom</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">body1</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text style (built-in or custom)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>primary | secondary | success | danger | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">component</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ElementType</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">HTML element to render</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">weight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>thin | light | normal | medium | semibold | bold | extrabold</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Font weight</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">align</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>left | center | right | justify</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">left</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text alignment</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">truncate</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Truncate with ellipsis</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxLines</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Limit lines shown</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">italic</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Italic style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">underline</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Underline style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">strikethrough</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Strikethrough style</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TypographyPage;
