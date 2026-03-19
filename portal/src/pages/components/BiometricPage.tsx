import { FC, useState, useCallback } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Biometric, useBiometric, Button, BearIcons } from '@forgedevstack/bear';
import type { BiometricStatus, BiometricType } from '@forgedevstack/bear';

const BiometricPage: FC = () => {
  const [controlledStatus, setControlledStatus] = useState<BiometricStatus>('idle');
  const hook = useBiometric({
    onSuccess: () => setControlledStatus('success'),
    onError: () => setControlledStatus('error'),
  });

  const handleControlledScan = useCallback(() => {
    setControlledStatus('scanning');
    hook.scan();
  }, [hook]);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Biometric</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Biometric authentication component with fingerprint, face, and iris recognition visuals. Animated scan states, theme-aware, and includes a <code className="bear-px-1 bear-py-0.5 bear-rounded bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-sm">useBiometric</code> hook for scan lifecycle management.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Biometric, useBiometric } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Fingerprint (default)"
        description="Click the scanner to start authentication. Animated ripple on scan, green on success, red on error."
        code={`<Biometric
  type="fingerprint"
  size="lg"
  label="Touch to verify"
  onScan={() => console.log('Scanning...')}
  onSuccess={() => console.log('Verified!')}
  onError={() => console.log('Failed')}
/>`}
      >
        <div className="flex justify-center py-4">
          <Biometric
            type="fingerprint"
            size="lg"
            label="Touch to verify"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Face Recognition"
        description="Face scan visual with camera-frame overlay."
        code={`<Biometric type="face" size="lg" label="Look at the camera" />`}
      >
        <div className="flex justify-center py-4">
          <Biometric type="face" size="lg" label="Look at the camera" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Iris Scan"
        description="Iris recognition visual with eye illustration."
        code={`<Biometric type="iris" size="lg" label="Hold steady" />`}
      >
        <div className="flex justify-center py-4">
          <Biometric type="iris" size="lg" label="Hold steady" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="All sizes"
        description="sm, md, lg, xl sizes."
        code={`<Biometric size="sm" />
<Biometric size="md" />
<Biometric size="lg" />
<Biometric size="xl" />`}
      >
        <div className="flex items-end justify-center gap-8 py-4">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Biometric key={s} size={s} label={s} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="All types side by side"
        description="fingerprint, face, iris."
        code={`<Biometric type="fingerprint" label="Fingerprint" />
<Biometric type="face" label="Face" />
<Biometric type="iris" label="Iris" />`}
      >
        <div className="flex items-end justify-center gap-10 py-4">
          {(['fingerprint', 'face', 'iris'] as BiometricType[]).map((t) => (
            <Biometric key={t} type={t} size="lg" label={t.charAt(0).toUpperCase() + t.slice(1)} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Controlled status"
        description="Drive the status externally with the status prop."
        code={`const [status, setStatus] = useState<BiometricStatus>('idle');

<Biometric
  type="fingerprint"
  size="lg"
  status={status}
  onScan={() => setStatus('scanning')}
/>
<Button onClick={() => setStatus('idle')}>Reset</Button>
<Button onClick={() => setStatus('scanning')}>Scanning</Button>
<Button onClick={() => setStatus('success')}>Success</Button>
<Button onClick={() => setStatus('error')}>Error</Button>`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Biometric
            type="fingerprint"
            size="lg"
            status={controlledStatus}
            onScan={handleControlledScan}
          />
          <div className="flex gap-2 flex-wrap justify-center">
            {(['idle', 'scanning', 'success', 'error'] as BiometricStatus[]).map((s) => (
              <Button key={s} size="sm" variant={controlledStatus === s ? 'primary' : 'outline'} onClick={() => setControlledStatus(s)}>
                {s}
              </Button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled state prevents interaction."
        code={`<Biometric disabled label="Unavailable" />`}
      >
        <div className="flex justify-center py-4">
          <Biometric disabled label="Unavailable" size="lg" />
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">useBiometric hook</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Manages scan lifecycle (idle → scanning → success/error → idle). Useful when building custom biometric UIs.
        </p>
        <CodeBlock
          code={`import { useBiometric } from '@forgedevstack/bear';

const { status, scan, reset } = useBiometric({
  scanDuration: 2000,
  successDuration: 1500,
  onSuccess: () => console.log('Authenticated!'),
  onError: () => console.log('Failed'),
});

// status: 'idle' | 'scanning' | 'success' | 'error'
// scan(): trigger scan
// reset(): return to idle`}
          language="tsx"
        />
      </section>

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
              <tr><td className="px-4 py-3 font-mono text-bear-600">type</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>fingerprint | face | iris</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">fingerprint</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Biometric visual type</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>sm | md | lg | xl</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Component size</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">status</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>idle | scanning | success | error</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled status (uses internal state when unset)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label shown below scanner (idle state)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">scanningLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Scanning...</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label during scan</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">successLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Verified</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label on success</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">errorLabel</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Try again</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label on error</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onScan</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when scan starts</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onSuccess</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called on successful authentication</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onError</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>() =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called on failed authentication</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">animated</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable ripple/pulse animations</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable interaction</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BiometricPage;
