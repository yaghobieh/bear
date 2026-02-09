import React, { useState } from 'react';
import { Typography, CardCompound as Card, Button, Tour, useTour } from '@forgedevstack/bear';
import type { TourStep } from '@forgedevstack/bear';

const tourSteps: TourStep[] = [
  {
    target: '#tour-btn-1',
    title: 'Welcome to Bear UI!',
    description: 'This is the first step of the tour. Let\'s explore the features together.',
    placement: 'bottom',
  },
  {
    target: '#tour-btn-2',
    title: 'Navigation',
    description: 'Use these buttons to navigate through your application.',
    placement: 'right',
  },
  {
    target: '#tour-btn-3',
    title: 'All Done!',
    description: 'You\'ve completed the tour. Enjoy using Bear UI!',
    placement: 'left',
  },
];

const TourPage: React.FC = () => {
  const [showTour, setShowTour] = useState(false);
  const { start, stop, isActive, currentStep, totalSteps } = useTour(tourSteps);

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h2" className="mb-2">Tour</Typography>
        <Typography variant="body1" color="secondary">
          A feature tour/onboarding walkthrough component for guiding users through your application.
        </Typography>
      </div>

      {/* Basic Example */}
      <Card>
        <Card.Header title={<Typography variant="h5">Basic Usage</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Click the button below to start a tour demonstration.
          </Typography>
          <div className="flex gap-4 flex-wrap">
            <Button id="tour-btn-1" variant="primary" onClick={() => setShowTour(true)}>
              Start Tour
            </Button>
            <Button id="tour-btn-2" variant="secondary">
              Navigate
            </Button>
            <Button id="tour-btn-3" variant="outline">
              Finish
            </Button>
          </div>
          <Tour 
            steps={tourSteps}
            open={showTour}
            onClose={() => setShowTour(false)}
            onFinish={() => setShowTour(false)}
          />
        </Card.Body>
      </Card>

      {/* Hook Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Using useTour Hook</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Use the <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">useTour</code> hook for programmatic control.
          </Typography>
          <div className="flex gap-2 items-center mb-4">
            <Button onClick={start} variant="primary" disabled={isActive}>
              Start
            </Button>
            <Button onClick={stop} variant="secondary" disabled={!isActive}>
              Stop
            </Button>
            {isActive && (
              <Typography variant="caption" color="secondary">
                Step {currentStep + 1} of {totalSteps}
              </Typography>
            )}
          </div>
          <Tour 
            steps={tourSteps}
            open={isActive}
            current={currentStep}
            onClose={stop}
            onFinish={stop}
          />
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`const { start, stop, next, prev, isActive, currentStep } = useTour(steps);

<Button onClick={start}>Start Tour</Button>
<Tour 
  steps={steps}
  open={isActive}
  current={currentStep}
  onClose={stop}
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Steps Configuration */}
      <Card>
        <Card.Header title={<Typography variant="h5">Step Configuration</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`const steps: TourStep[] = [
  {
    target: '#welcome-button',       // CSS selector or ref
    title: 'Welcome!',               // Step title
    description: 'Click here...',    // Step description
    placement: 'bottom',             // Tooltip placement
    spotlightPadding: 8,             // Padding around target
    nextText: 'Continue',            // Custom next button text
    prevText: 'Go Back',             // Custom prev button text
    onBeforeStep: async () => {},    // Before step callback
    onAfterStep: async () => {},     // After step callback
  },
];`}
          </pre>
        </Card.Body>
      </Card>

      {/* Placements */}
      <Card>
        <Card.Header title={<Typography variant="h5">Tooltip Placements</Typography>} />
        <Card.Body>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">top-start</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">top</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">top-end</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">left-start</div>
            <div className="p-2 bg-[var(--bear-primary-500)] text-white rounded font-medium">Target</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">right-start</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">left</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">right</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">left-end</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">right-end</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">bottom-start</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">bottom</div>
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded">bottom-end</div>
          </div>
        </Card.Body>
      </Card>

      {/* Props */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">steps</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">TourStep[]</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Array of tour steps</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">open</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">Whether tour is open</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">current</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">0</td>
                  <td className="py-3 px-4">Current step index</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showIndicators</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show step indicators</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showCloseButton</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show close button</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showSkipButton</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show skip button</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">maskOpacity</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">0.5</td>
                  <td className="py-3 px-4">Overlay opacity</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onClose</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Called when tour closes</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onFinish</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Called when tour finishes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TourPage;
