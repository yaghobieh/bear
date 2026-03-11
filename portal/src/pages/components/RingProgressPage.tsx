import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { RingProgress, Typography } from '@forgedevstack/bear';

const RingProgressPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RingProgress</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={100} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Circular/ring progress indicator using SVG. Display one or more progress sections with different colors. Supports labels, round caps, and custom thickness.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { RingProgress } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Single Section"
        description="Simple progress ring with label."
        code={`<RingProgress sections={[{ value: 72, color: '#ec4899' }]} label={<Typography variant="h6" align="center">72%</Typography>} />`}
      >
        <div className="flex justify-center">
          <RingProgress sections={[{ value: 72, color: '#ec4899' }]} label={<Typography variant="h6" align="center">72%</Typography>} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multiple Sections"
        description="Multiple colored sections in one ring."
        code={`<RingProgress sections={[
  { value: 40, color: '#ec4899' },
  { value: 25, color: '#8b5cf6' },
  { value: 15, color: '#06b6d4' },
]} />`}
      >
        <div className="flex justify-center gap-8">
          <RingProgress sections={[{ value: 40, color: '#ec4899' }, { value: 25, color: '#8b5cf6' }, { value: 15, color: '#06b6d4' }]} />
          <RingProgress sections={[{ value: 100, color: '#22c55e' }]} label={<Typography variant="caption" align="center" color="success">Done</Typography>} roundCaps />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Size & Thickness"
        description="Adjust dimensions for different use cases."
        code={`<RingProgress size={80} thickness={6} sections={[{ value: 60, color: '#f59e0b' }]} />`}
      >
        <div className="flex justify-center gap-8 items-center">
          <RingProgress size={60} thickness={4} sections={[{ value: 45, color: '#f59e0b' }]} />
          <RingProgress size={120} thickness={14} sections={[{ value: 85, color: '#3b82f6' }]} roundCaps label={<Typography variant="body2" align="center">85%</Typography>} />
          <RingProgress size={160} thickness={18} sections={[{ value: 33, color: '#ef4444' }, { value: 33, color: '#f59e0b' }, { value: 34, color: '#22c55e' }]} roundCaps />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default RingProgressPage;
