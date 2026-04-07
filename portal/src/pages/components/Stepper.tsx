import { FC, useState } from 'react';
import { Stepper } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const StepperPage: FC = () => {
  const [step, setStep] = useState(1);
  const steps = ['Account', 'Details', 'Review', 'Complete'];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stepper</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Guide users through multi-step processes with clear progress indication.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Stepper } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="Horizontal stepper with numbered steps."
        code={`<Stepper activeStep={1} steps={[
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Review' },
  { label: 'Complete' }
]} />`}
      >
        <div className="w-full space-y-6">
          <Stepper
            activeStep={step}
            onStepClick={setStep}
            clickable
            steps={steps.map((label) => ({ label }))}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Windowed Overflow (mobile friendly)"
        description="Use maxVisibleSteps to keep a sliding window and show left/right overflow menus."
        code={`<Stepper
  activeStep={step}
  clickable
  onStepClick={setStep}
  maxVisibleSteps={{ mobile: 3, tablet: 4, desktop: 5 }}
  steps={[
    { label: 'Account' },
    { label: 'Details' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Review' },
    { label: 'Done' },
  ]}
/>`}
      >
        <div className="w-full">
          <Stepper
            activeStep={step}
            onStepClick={setStep}
            clickable
            maxVisibleSteps={{ mobile: 3, tablet: 4, desktop: 5 }}
            steps={['Account', 'Details', 'Shipping', 'Payment', 'Review', 'Done'].map((label) => ({ label }))}
          />
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">activeStep</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">0</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Current active step (0-indexed)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">steps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>StepProps[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">[]</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of step configurations</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">orientation</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>horizontal | vertical</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">horizontal</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Layout direction</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxVisibleSteps</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | {'{ mobile, tablet, desktop }'}</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Window size for horizontal overflow with ⋯ dropdowns.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onStepClick</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(step: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback for clickable and overflow-menu step selection.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StepperPage;

