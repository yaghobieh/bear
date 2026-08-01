import { FC } from 'react';
import { Button, PageHeader } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const PageHeaderPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PageHeader</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Compact page title block with optional description and actions for app shells and templates.
      </p>
      <div className="mb-8"><CodeBlock language="tsx" showLineNumbers={false} code={`import { PageHeader, Button } from '@forgedevstack/bear';`} /></div>
      <ComponentPreview
        title="Basic"
        description="Title, description, and actions."
        code={`<PageHeader
  title="Projects"
  description="Manage workspace projects"
  actions={<Button size="sm">New project</Button>}
/>`}
      >
        <PageHeader
          title="Projects"
          description="Manage workspace projects"
          actions={<Button size="sm">New project</Button>}
        />
      </ComponentPreview>
    </div>
  );
};

export default PageHeaderPage;
