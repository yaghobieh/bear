import { defineStories } from '@forgedevstack/kiln';
import { useState } from 'react';
import { SignPad } from './SignPad';

const BasicDemo = () => {
  const [signature, setSignature] = useState<string | null>(null);
  return (
    <div className="bear-space-y-4">
      <SignPad
        onChange={setSignature}
        placeholder="Sign here"
      />
      {signature && (
        <div className="bear-text-sm bear-text-gray-500 dark:bear-text-gray-400">
          Signature captured ({signature.length} bytes)
        </div>
      )}
    </div>
  );
};

const CustomSizeDemo = () => {
  const [signature, setSignature] = useState<string | null>(null);
  return (
    <SignPad
      width={600}
      height={150}
      onChange={setSignature}
      placeholder="Sign on the line"
    />
  );
};

const CustomStyleDemo = () => {
  const [signature, setSignature] = useState<string | null>(null);
  return (
    <SignPad
      strokeColor="#ec4899"
      strokeWidth={3}
      backgroundColor="#fdf2f8"
      onChange={setSignature}
      placeholder="Sign with style"
    />
  );
};

const WithSaveDemo = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

  return (
    <div className="bear-space-y-4">
      <SignPad
        onChange={setSignature}
        showSave
        clearText="Reset"
        saveText="Confirm Signature"
      />
      {signature && savedSignature && (
        <div className="bear-p-4 bear-bg-gray-100 dark:bear-bg-zinc-800 bear-rounded-lg">
          <p className="bear-text-sm bear-text-gray-600 dark:bear-text-gray-400 bear-mb-2">Saved signature:</p>
          <img src={savedSignature} alt="Saved signature" className="bear-max-h-20" />
        </div>
      )}
    </div>
  );
};

const DisabledDemo = () => (
  <SignPad
    disabled
    placeholder="Signing disabled"
  />
);

export default defineStories({
  title: 'Form/SignPad',
  description: 'Digital signature capture component for forms and documents.',
  stories: [
    {
      name: 'Basic',
      component: BasicDemo,
      description: 'Basic signature pad with clear button.',
      code: `const [signature, setSignature] = useState<string | null>(null);

<SignPad
  onChange={setSignature}
  placeholder="Sign here"
/>`,
    },
    {
      name: 'Custom Size',
      component: CustomSizeDemo,
      description: 'Signature pad with custom dimensions.',
      code: `<SignPad
  width={600}
  height={150}
  placeholder="Sign on the line"
/>`,
    },
    {
      name: 'Custom Style',
      component: CustomStyleDemo,
      description: 'Signature pad with custom colors.',
      code: `<SignPad
  strokeColor="#ec4899"
  strokeWidth={3}
  backgroundColor="#fdf2f8"
  placeholder="Sign with style"
/>`,
    },
    {
      name: 'With Save Button',
      component: WithSaveDemo,
      description: 'Signature pad with save confirmation.',
      code: `<SignPad
  showSave
  clearText="Reset"
  saveText="Confirm Signature"
/>`,
    },
    {
      name: 'Disabled',
      component: DisabledDemo,
      description: 'Disabled signature pad.',
      code: `<SignPad disabled placeholder="Signing disabled" />`,
    },
  ],
});

