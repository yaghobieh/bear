import React, { useState } from 'react';
import { Typography, CardCompound as Card, Button, Confetti, useConfetti } from '@forgedevstack/bear';

const ConfettiPage: React.FC = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const { fire, stop, isActive } = useConfetti();

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h2" className="mb-2">Confetti 🎉</Typography>
        <Typography variant="body1" color="secondary">
          A celebration confetti effect component for moments of delight.
        </Typography>
      </div>

      {/* Basic Example */}
      <Card>
        <Card.Header title={<Typography variant="h5">Basic Usage</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Click the button to trigger the confetti effect!
          </Typography>
          <Button onClick={() => setShowBasic(true)} variant="primary">
            🎉 Celebrate!
          </Button>
          <Confetti active={showBasic} onComplete={() => setShowBasic(false)} />
        </Card.Body>
      </Card>

      {/* Hook Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Using useConfetti Hook</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Use the <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">useConfetti</code> hook for programmatic control.
          </Typography>
          <div className="flex gap-2">
            <Button onClick={fire} variant="primary" disabled={isActive}>
              Fire!
            </Button>
            <Button onClick={stop} variant="secondary" disabled={!isActive}>
              Stop
            </Button>
          </div>
          <Confetti active={isActive} onComplete={stop} />
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto mt-4">
{`const { fire, stop, isActive } = useConfetti();

<Button onClick={fire}>Fire!</Button>
<Confetti active={isActive} onComplete={stop} />`}
          </pre>
        </Card.Body>
      </Card>

      {/* Custom Colors */}
      <Card>
        <Card.Header title={<Typography variant="h5">Custom Colors</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Customize the confetti colors to match your brand.
          </Typography>
          <Button onClick={() => setShowCustom(true)} variant="primary">
            Golden Celebration
          </Button>
          <Confetti 
            active={showCustom}
            onComplete={() => setShowCustom(false)}
            colors={['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500']}
          />
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto mt-4">
{`<Confetti 
  colors={['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500']}
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Configuration */}
      <Card>
        <Card.Header title={<Typography variant="h5">Configuration Options</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`<Confetti 
  active={true}
  count={150}           // Number of pieces
  duration={5000}       // Duration in ms
  originX={0.5}         // Origin X (0-1)
  originY={0.5}         // Origin Y (0-1)
  spread={90}           // Spread angle in degrees
  velocity={40}         // Initial velocity
  gravity={0.5}         // Gravity effect
  colors={['#ec4899', '#8b5cf6', '#3b82f6']}
  autoHide={true}       // Auto hide after duration
  onComplete={() => {}} // Callback when done
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Props */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-2 px-4">Prop</th>
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-left py-2 px-4">Default</th>
                  <th className="text-left py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">active</td>
                  <td className="py-2 px-4 font-mono text-xs">boolean</td>
                  <td className="py-2 px-4 font-mono text-xs">false</td>
                  <td className="py-2 px-4">Whether confetti is active</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">count</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4 font-mono text-xs">100</td>
                  <td className="py-2 px-4">Number of confetti pieces</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">duration</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4 font-mono text-xs">3000</td>
                  <td className="py-2 px-4">Duration in ms</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">colors</td>
                  <td className="py-2 px-4 font-mono text-xs">string[]</td>
                  <td className="py-2 px-4 font-mono text-xs">Bear colors</td>
                  <td className="py-2 px-4">Custom confetti colors</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">originX</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4 font-mono text-xs">0.5</td>
                  <td className="py-2 px-4">Origin X position (0-1)</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">originY</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4 font-mono text-xs">0.5</td>
                  <td className="py-2 px-4">Origin Y position (0-1)</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">spread</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4 font-mono text-xs">60</td>
                  <td className="py-2 px-4">Spread angle in degrees</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-2 px-4 font-mono text-xs">onComplete</td>
                  <td className="py-2 px-4 font-mono text-xs">() =&gt; void</td>
                  <td className="py-2 px-4 font-mono text-xs">-</td>
                  <td className="py-2 px-4">Callback when animation completes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ConfettiPage;
