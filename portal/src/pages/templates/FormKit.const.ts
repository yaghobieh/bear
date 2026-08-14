import type { PropRow } from '@/components/PropsTable';

export const FORM_KIT_STEPPER_PROPS: PropRow[] = [
  { name: 'steps', type: 'Step[]', description: 'Step definitions (label, description, status, …)' },
  { name: 'activeStep', type: 'number', description: 'Zero-based index of the current step' },
  { name: 'onStepClick', type: '(index: number) => void', description: 'Fired when a step is clicked (if clickable)' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Indicator and label size' },
  { name: 'showNumbers', type: 'boolean', default: 'true', description: 'Show step numbers in indicators' },
  { name: 'clickable', type: 'boolean', default: 'false', description: 'Allow navigating by clicking steps' },
  { name: 'showConnectors', type: 'boolean', default: 'true', description: 'Draw connectors between steps' },
  { name: 'testId', type: 'string', description: 'data-testid for tests' },
  { name: 'className', type: 'string', description: 'Additional classes on the root' },
];
