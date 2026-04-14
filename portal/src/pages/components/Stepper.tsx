import { FC, useState } from 'react';
import { Stepper, StepperControls } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const BASIC_STEPS = [
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Review' },
  { label: 'Complete' },
];

const DESCRIBED_STEPS = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Preferences', description: 'Choose your settings' },
  { label: 'Confirm', description: 'Review and submit' },
];

const MANY_STEPS = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' },
  { label: 'Confirm' },
  { label: 'Done' },
];

const StepperPage: FC = () => {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(2);
  const [step3, setStep3] = useState(1);
  const [step4, setStep4] = useState(0);
  const [step5, setStep5] = useState(1);
  const [step6, setStep6] = useState(0);
  const [step7, setStep7] = useState(2);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stepper</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Guide users through multi-step processes with clear progress indication. Supports horizontal, vertical, windowed overflow with dropdown menus, and responsive breakpoint-aware step limiting.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Stepper, StepperControls } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      {/* Basic */}
      <ComponentPreview
        title="Basic"
        description="Horizontal stepper with numbered steps. Click any step to navigate."
        code={`<Stepper
  activeStep={1}
  clickable
  onStepClick={setStep}
  steps={[
    { label: 'Account' },
    { label: 'Details' },
    { label: 'Review' },
    { label: 'Complete' },
  ]}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step1}
            onStepClick={setStep1}
            clickable
            steps={BASIC_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* With descriptions */}
      <ComponentPreview
        title="With Descriptions"
        description="Steps with labels and descriptions. Uses Typography props for customization."
        code={`<Stepper
  activeStep={2}
  clickable
  onStepClick={setStep}
  steps={[
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Set up your profile' },
    { label: 'Preferences', description: 'Choose your settings' },
    { label: 'Confirm', description: 'Review and submit' },
  ]}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step2}
            onStepClick={setStep2}
            clickable
            steps={DESCRIBED_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* Alternative label */}
      <ComponentPreview
        title="Alternative Label"
        description="Labels positioned below the step indicators for a cleaner look."
        code={`<Stepper
  activeStep={1}
  alternativeLabel
  clickable
  onStepClick={setStep}
  steps={steps}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step3}
            onStepClick={setStep3}
            clickable
            alternativeLabel
            steps={BASIC_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* Vertical */}
      <ComponentPreview
        title="Vertical"
        description="Vertical orientation with step content."
        code={`<Stepper
  orientation="vertical"
  activeStep={step}
  clickable
  onStepClick={setStep}
  steps={[
    { label: 'Account', description: 'Create your account', content: <div>Step content here</div> },
    ...
  ]}
/>`}
      >
        <div className="w-full">
          <Stepper
            orientation="vertical"
            activeStep={step4}
            onStepClick={setStep4}
            clickable
            steps={[
              { label: 'Account', description: 'Create your account', content: <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded text-sm">Fill in your email and password.</div> },
              { label: 'Profile', description: 'Set up your profile', content: <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded text-sm">Add your name and avatar.</div> },
              { label: 'Confirm', description: 'Review and submit', content: <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded text-sm">Review all details before submitting.</div> },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* Windowed overflow - mobile friendly */}
      <ComponentPreview
        title="Windowed Overflow (3 dots)"
        description="Use maxVisibleSteps to show a sliding window of steps with dropdown overflow menus. Set a number or a breakpoint map."
        code={`<Stepper
  activeStep={step}
  clickable
  onStepClick={setStep}
  maxVisibleSteps={3}
  steps={sevenSteps}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step5}
            onStepClick={setStep5}
            clickable
            maxVisibleSteps={3}
            steps={MANY_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* Breakpoint-aware overflow */}
      <ComponentPreview
        title="Breakpoint-Aware"
        description="Different visible step counts per breakpoint. Mobile shows 3 steps, tablet 4, desktop shows all."
        code={`<Stepper
  activeStep={step}
  clickable
  onStepClick={setStep}
  maxVisibleSteps={{ mobile: 3, tablet: 4, desktop: 7 }}
  steps={sevenSteps}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step5}
            onStepClick={setStep5}
            clickable
            maxVisibleSteps={{ mobile: 3, tablet: 4, desktop: 7 }}
            steps={MANY_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* Sizes */}
      <ComponentPreview
        title="Sizes"
        description="Three sizes: sm, md (default), and lg."
        code={`<Stepper size="sm" ... />
<Stepper size="md" ... />
<Stepper size="lg" ... />`}
      >
        <div className="w-full space-y-6">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <div key={s}>
              <p className="text-xs text-gray-500 mb-2">{s}</p>
              <Stepper activeStep={1} size={s} steps={BASIC_STEPS} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Dashed connectors */}
      <ComponentPreview
        title="Dashed Connectors"
        description="Use connectorStyle='dashed' for dashed lines between steps."
        code={`<Stepper connectorStyle="dashed" ... />`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step6}
            onStepClick={setStep6}
            clickable
            connectorStyle="dashed"
            steps={BASIC_STEPS}
          />
        </div>
      </ComponentPreview>

      {/* StepperControls */}
      <ComponentPreview
        title="With StepperControls"
        description="Composable controls component with Previous/Next/Complete buttons and step indicator."
        code={`<Stepper activeStep={step} steps={steps} />
<StepperControls
  activeStep={step}
  totalSteps={steps.length}
  onPrev={() => setStep(s => s - 1)}
  onNext={() => setStep(s => s + 1)}
  onComplete={() => alert('Done!')}
/>`}
      >
        <div className="w-full">
          <Stepper activeStep={step7} steps={BASIC_STEPS} />
          <StepperControls
            activeStep={step7}
            totalSteps={BASIC_STEPS.length}
            onPrev={() => setStep7((s) => Math.max(0, s - 1))}
            onNext={() => setStep7((s) => Math.min(BASIC_STEPS.length - 1, s + 1))}
            onComplete={() => setStep7(0)}
          />
        </div>
      </ComponentPreview>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stepper Props</h2>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">steps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Step[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of step configurations</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeStep</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current active step (0-indexed)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'horizontal' | 'vertical'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'horizontal'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Layout direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'sm' | 'md' | 'lg'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'md'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Indicator and text size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">clickable</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow clicking any step to navigate</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showNumbers</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show step numbers in indicators</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showConnectors</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show connector lines between steps</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">connectorStyle</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'solid' | 'dashed'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'solid'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Connector line style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">alternativeLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Place labels below the indicator</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxVisibleSteps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>{'number | { mobile, tablet, desktop }'}</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Sliding window size — overflow steps appear in dropdown menus</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">completedIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">checkmark</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon for completed steps</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">errorIcon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">X mark</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon for error steps</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">labelTypographyProps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;TypographyProps&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Typography props for all step labels</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">descriptionTypographyProps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;TypographyProps&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Typography props for all step descriptions</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onStepClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(step: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when a step is clicked</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step Object</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Step label (required)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">description</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Optional description below the label</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">icon</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom icon replacing the step number</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">status</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>'pending' | 'active' | 'completed' | 'error'</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Override automatic status calculation</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Prevent clicking this step</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">content</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>ReactNode</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Step content (shown when active, vertical only)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">labelTypographyProps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;TypographyProps&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Per-step label Typography overrides</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">descriptionTypographyProps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;TypographyProps&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Per-step description Typography overrides</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">StepperControls Props</h2>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeStep</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current step index</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">totalSteps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Total number of steps</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onPrev / onNext</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Navigate handlers</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">prevLabel / nextLabel / completeLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'Previous' / 'Next' / 'Complete'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Customizable button text</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">indicatorFormat</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(current, total) =&gt; string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'Step X of Y'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom indicator text formatter</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showIndicator</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show "Step X of Y" text</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StepperPage;
