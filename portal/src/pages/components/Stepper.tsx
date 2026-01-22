import { FC, useState } from 'react';
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
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  i < step ? 'bg-bear-500 text-white' : 
                  i === step ? 'border-2 border-bear-500 text-bear-500' : 
                  'bg-gray-200 text-gray-500 dark:bg-gray-700'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${i < step ? 'bg-bear-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">Step {step + 1}: {steps[step]}</p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => setStep(s => Math.max(0, s - 1))} 
                disabled={step === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={step === steps.length - 1}
                className="px-4 py-2 bg-bear-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical"
        description="Vertical orientation for more detailed steps."
        code={`<Stepper orientation="vertical" steps={[...]} />`}
      >
        <div className="flex flex-col gap-4">
          {['Create Account', 'Verify Email', 'Complete Profile'].map((label, i) => (
            <div key={label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i === 0 ? 'bg-bear-500 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                }`}>
                  {i + 1}
                </div>
                {i < 2 && <div className={`w-0.5 h-12 ${i === 0 ? 'bg-bear-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500">Step description goes here</p>
              </div>
            </div>
          ))}
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">variant</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>default | outlined | dots</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">default</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onStepChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(step: number) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when step changes</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StepperPage;

