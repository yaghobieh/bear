import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const CustomComponents: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Custom Components
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Build themed components using Bear's CSS variables and the cn() utility. Your components will automatically adapt to light/dark mode and theme overrides.
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          cn() Utility
        </Typography>
        <CodeBlock
          code={`import { cn } from '@forgedevstack/bear';

const classes = cn(
  'base-class',
  condition && 'conditional-class',
  className
);`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Using CSS Variables
        </Typography>
        <CodeBlock
          code={`function ThemedCard({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        'bg-[var(--bear-bg-secondary)]',
        'text-[var(--bear-text-primary)]',
        'border border-[var(--bear-border-default)]',
        className
      )}
      {...props}
    />
  );
}`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Bear Utility Classes
        </Typography>
        <CodeBlock
          code={`<div className={cn(
  'bear-p-4 bear-rounded-lg',
  'bg-[var(--bear-primary-500)] text-white',
  'hover:bg-[var(--bear-primary-600)]'
)}>
  Themed content
</div>`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Full Example
        </Typography>
        <CodeBlock
          code={`import { cn } from '@forgedevstack/bear';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'danger';
  className?: string;
  children: React.ReactNode;
}

function Badge({ variant = 'primary', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded text-sm font-medium',
        variant === 'primary' && 'bg-[var(--bear-primary-500)] text-white',
        variant === 'success' && 'bg-[var(--bear-success-500)] text-white',
        variant === 'danger' && 'bg-[var(--bear-danger-500)] text-white',
        className
      )}
    >
      {children}
    </span>
  );
}`}
          language="tsx"
        />
      </section>
    </div>
  );
};

export default CustomComponents;
