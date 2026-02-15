import { useState } from 'react';
import { Watermark, Typography, Card, CardBody, Button } from '@forgedevstack/bear';

export default function WatermarkPage() {
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.15);
  const [rotate, setRotate] = useState(-22);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Typography variant="h2" className="mb-2">Watermark</Typography>
        <Typography variant="body1" className="text-[var(--bear-text-secondary)] mb-4">
          Overlay watermark text or image on content. Supports rotation, opacity, multi-line text, dark mode, and tamper prevention via MutationObserver.
        </Typography>
      </div>

      {/* Interactive Demo */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Interactive Demo</Typography>
          <div className="flex gap-4 mb-4 flex-wrap items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--bear-text-secondary)]">Text</label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="px-3 py-1.5 rounded-lg border text-sm bg-[var(--bear-bg-primary)] text-[var(--bear-text-primary)] border-[var(--bear-border-primary)] w-40"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--bear-text-secondary)]">
                Opacity: {opacity}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-28"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--bear-text-secondary)]">
                Rotate: {rotate}°
              </label>
              <input
                type="range"
                min="-45"
                max="45"
                value={rotate}
                onChange={(e) => setRotate(Number(e.target.value))}
                className="w-28"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--bear-text-secondary)]">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="32"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-28"
              />
            </div>
          </div>

          <Watermark text={text} opacity={opacity} rotate={rotate} fontSize={fontSize}>
            <div className="h-64 rounded-xl border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] p-6">
              <Typography variant="h6" className="mb-2">Protected Document</Typography>
              <Typography variant="body2" className="text-[var(--bear-text-secondary)] leading-relaxed">
                This content is protected with a watermark overlay. The watermark text repeats across the entire container
                and includes tamper prevention via MutationObserver. Adjust the controls above to customize the appearance.
                The watermark automatically adapts to dark mode.
              </Typography>
            </div>
          </Watermark>
        </CardBody>
      </Card>

      {/* Multi-line */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Multi-line Watermark</Typography>
          <Watermark text={['Bear UI', 'Draft v1.0.9']} opacity={0.12} fontSize={14}>
            <div className="h-48 rounded-xl border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] p-6">
              <Typography variant="body2" className="text-[var(--bear-text-secondary)]">
                Multi-line watermark with version info. Pass an array of strings to the <code className="px-1 py-0.5 rounded bg-[var(--bear-bg-primary)] text-[var(--bear-primary-500)] text-xs font-mono">text</code> prop.
              </Typography>
            </div>
          </Watermark>
        </CardBody>
      </Card>

      {/* Color Variants */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Color Variants</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-2">
                Default (auto dark/light)
              </Typography>
              <Watermark text="AUTO" opacity={0.15}>
                <div className="h-32 rounded-lg border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] p-4">
                  <Typography variant="body2" className="text-[var(--bear-text-secondary)]">
                    Color adapts automatically
                  </Typography>
                </div>
              </Watermark>
            </div>
            <div>
              <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-2">
                Custom color
              </Typography>
              <Watermark text="CUSTOM" opacity={0.2} color="var(--bear-primary-500)">
                <div className="h-32 rounded-lg border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] p-4">
                  <Typography variant="body2" className="text-[var(--bear-text-secondary)]">
                    Uses primary theme color
                  </Typography>
                </div>
              </Watermark>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Visibility Toggle */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Visibility Toggle</Typography>
          <VisibilityDemo />
        </CardBody>
      </Card>

      {/* Usage */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Usage</Typography>
          <pre className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Watermark } from '@forgedevstack/bear';

// Basic
<Watermark text="CONFIDENTIAL" opacity={0.15} rotate={-22}>
  <div>Protected content here</div>
</Watermark>

// Multi-line
<Watermark text={['Bear UI', 'Draft']} fontSize={14}>
  <div>Multi-line watermark</div>
</Watermark>

// Custom color (theme-aware)
<Watermark text="REVIEW" color="var(--bear-primary-500)">
  <div>Uses your theme's primary color</div>
</Watermark>

// Visibility toggle
<Watermark text="SECRET" visible={showWatermark}>
  <div>Toggle watermark on/off</div>
</Watermark>`}
          </pre>
        </CardBody>
      </Card>

      {/* Props */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-2">Props</Typography>
          <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
            All props supported by the Watermark component.
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--bear-border-primary)]">
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Prop</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Type</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Default</th>
                  <th className="text-left py-2 px-3 font-medium text-[var(--bear-text-primary)]">Description</th>
                </tr>
              </thead>
              <tbody className="text-[var(--bear-text-secondary)]">
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">text</td><td className="py-2 px-3 font-mono text-xs">string | string[]</td><td className="py-2 px-3 font-mono text-xs">-</td><td className="py-2 px-3">Watermark text (array for multi-line)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">image</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">-</td><td className="py-2 px-3">Watermark image URL (alternative to text)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">fontSize</td><td className="py-2 px-3 font-mono text-xs">number</td><td className="py-2 px-3 font-mono text-xs">16</td><td className="py-2 px-3">Font size in pixels</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">color</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">auto (dark/light)</td><td className="py-2 px-3">Font color (supports CSS variables)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">rotate</td><td className="py-2 px-3 font-mono text-xs">number</td><td className="py-2 px-3 font-mono text-xs">-22</td><td className="py-2 px-3">Rotation angle in degrees</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">opacity</td><td className="py-2 px-3 font-mono text-xs">number</td><td className="py-2 px-3 font-mono text-xs">0.15</td><td className="py-2 px-3">Opacity (0-1)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">gap</td><td className="py-2 px-3 font-mono text-xs">[number, number]</td><td className="py-2 px-3 font-mono text-xs">[100, 100]</td><td className="py-2 px-3">Gap between watermarks [h, v]</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">offset</td><td className="py-2 px-3 font-mono text-xs">[number, number]</td><td className="py-2 px-3 font-mono text-xs">[0, 0]</td><td className="py-2 px-3">Offset from top-left [x, y]</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">zIndex</td><td className="py-2 px-3 font-mono text-xs">number</td><td className="py-2 px-3 font-mono text-xs">10</td><td className="py-2 px-3">Z-index of watermark layer</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">fontFamily</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">var(--bear-font-family)</td><td className="py-2 px-3">Font family (reads from ThemeProvider)</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">fontWeight</td><td className="py-2 px-3 font-mono text-xs">number | string</td><td className="py-2 px-3 font-mono text-xs">"normal"</td><td className="py-2 px-3">Font weight</td></tr>
                <tr className="border-b border-[var(--bear-border-primary)]"><td className="py-2 px-3 font-mono text-xs">visible</td><td className="py-2 px-3 font-mono text-xs">boolean</td><td className="py-2 px-3 font-mono text-xs">true</td><td className="py-2 px-3">Toggle watermark visibility</td></tr>
                <tr><td className="py-2 px-3 font-mono text-xs">testId</td><td className="py-2 px-3 font-mono text-xs">string</td><td className="py-2 px-3 font-mono text-xs">-</td><td className="py-2 px-3">Test ID for testing</td></tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/** Inline visibility toggle demo */
function VisibilityDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div className="mb-3">
        <Button size="sm" variant={visible ? 'primary' : 'ghost'} onClick={() => setVisible(!visible)}>
          {visible ? 'Hide Watermark' : 'Show Watermark'}
        </Button>
      </div>
      <Watermark text="VISIBLE?" opacity={0.15} visible={visible}>
        <div className="h-32 rounded-lg border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] p-4">
          <Typography variant="body2" className="text-[var(--bear-text-secondary)]">
            {visible ? 'Watermark is visible — click the button to hide it.' : 'Watermark is hidden — click to show it.'}
          </Typography>
        </div>
      </Watermark>
    </div>
  );
}
