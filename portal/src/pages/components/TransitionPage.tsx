import { useState } from 'react';
import { Transition, Motion, Typography, Card, CardBody, Button } from '@forgedevstack/bear';
import type { TransitionName } from '@forgedevstack/bear';

const TRANSITIONS: TransitionName[] = [
  'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'scale', 'scale-y', 'scale-x', 'rotate', 'flip', 'collapse',
];

export default function TransitionPage() {
  const [show, setShow] = useState(true);
  const [selectedTransition, setSelectedTransition] = useState<TransitionName>('fade');

  return (
    <div className="space-y-8 p-6">
      <div>
        <Typography variant="h2" className="mb-2">Transition & Motion</Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
          Declarative animation components for enter/leave transitions and interactive motion effects.
        </Typography>
      </div>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Transition</Typography>
          <div className="flex flex-wrap gap-2 mb-4">
            {TRANSITIONS.map((t) => (
              <Button key={t} size="sm" variant={selectedTransition === t ? 'primary' : 'ghost'} onClick={() => setSelectedTransition(t)}>
                {t}
              </Button>
            ))}
          </div>
          <Button onClick={() => setShow(!show)} className="mb-4">
            {show ? 'Hide' : 'Show'}
          </Button>
          <div className="h-32 flex items-center justify-center border rounded-lg dark:border-gray-700">
            <Transition show={show} name={selectedTransition} duration={400}>
              <div className="p-6 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-center">
                <Typography variant="h5">Hello!</Typography>
                <Typography variant="body2">Transition: {selectedTransition}</Typography>
              </div>
            </Transition>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Motion (Hover & Tap)</Typography>
          <div className="flex gap-4 flex-wrap">
            <Motion
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0)' }}
              whileHover={{ transform: 'scale(1.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              whileTap={{ transform: 'scale(0.95)' }}
              transition={{ duration: 400 }}
            >
              <div className="p-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg cursor-pointer text-center">
                <Typography variant="h6">Hover me</Typography>
                <Typography variant="body2">Scale on hover, shrink on tap</Typography>
              </div>
            </Motion>

            <Motion
              initial={{ opacity: 0, transform: 'translateX(-20px)' }}
              animate={{ opacity: 1, transform: 'translateX(0)' }}
              whileHover={{ transform: 'translateY(-4px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              transition={{ duration: 300 }}
            >
              <div className="p-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg cursor-pointer text-center">
                <Typography variant="h6">Float up</Typography>
                <Typography variant="body2">Lifts on hover</Typography>
              </div>
            </Motion>

            <Motion
              initial={{ opacity: 0, transform: 'scale(0.8)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              whileHover={{ transform: 'rotate(3deg) scale(1.02)' }}
              transition={{ duration: 500 }}
            >
              <div className="p-6 bg-green-100 dark:bg-green-900/30 rounded-lg cursor-pointer text-center">
                <Typography variant="h6">Tilt</Typography>
                <Typography variant="body2">Rotates slightly on hover</Typography>
              </div>
            </Motion>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">useAnimate Hook</Typography>
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4">
            For programmatic animations, use the <code className="text-pink-500">useAnimate</code> hook with 25+ built-in presets:
          </Typography>
          <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { useAnimate } from '@forgedevstack/bear';

const { ref, play } = useAnimate({ duration: 500 });

// Trigger with preset name
<div ref={ref} onClick={() => play('bounceIn')}>
  Animate me!
</div>

// Available presets:
// fadeIn, fadeOut, slideInLeft, slideInRight,
// slideInUp, slideInDown, scaleIn, scaleOut,
// bounceIn, pulse, shake, rubberBand,
// tada, wobble, jello, flipX, flipY...`}
          </pre>
        </CardBody>
      </Card>
    </div>
  );
}
