import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

// Simple Button implementation for the portal (not importing from Bear to avoid build issues)
const Button: FC<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'primary', size = 'md', loading, disabled, children, onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-bear-500 hover:bg-bear-600 text-white focus:ring-bear-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500',
    outline: 'border-2 border-bear-500 text-bear-500 hover:bg-bear-50 dark:hover:bg-bear-900/20 focus:ring-bear-500',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

const ButtonPage: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Button
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Buttons allow users to take actions with a single click or tap.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Import
        </h2>
        <CodeBlock
          code={`import { Button } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Variants"
        description="Button comes in several variants for different use cases."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Buttons are available in three sizes."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading State"
        description="Show a loading spinner to indicate an action is in progress."
        code={`<Button loading>Loading...</Button>

// With click handler
const [loading, setLoading] = useState(false);

<Button 
  loading={loading} 
  onClick={() => {
    setLoading(true);
    // ... async operation
  }}
>
  Submit
</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button loading>Loading...</Button>
          <Button onClick={handleLoadingClick} loading={loading}>
            {loading ? 'Saving...' : 'Click to save'}
          </Button>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Disabled buttons prevent user interaction."
        code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Props
        </h2>
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
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">variant</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>primary | secondary | outline | ghost | danger</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">primary</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual style of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">size</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>sm | md | lg</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Size of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">loading</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show loading spinner</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">disabled</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">fullWidth</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>boolean</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Make button full width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;

