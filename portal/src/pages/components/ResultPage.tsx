import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyImport } from '@/components/CopyImport';
import { LinesOfCode } from '@/components/LinesOfCode';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Result, Button } from '@forgedevstack/bear';

const ResultPage: FC = () => {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Result</h1>
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">New</span>
        <LinesOfCode lines={130} />
        <CopyImport componentName="Result" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Full-page feedback for operation results — success, error, 404, 403, 500, and more. Display a status icon, title, subtitle, and extra action buttons.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Result } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Live props"
        description="Change status, title, and subtitle below to see the Result update in real time."
        code={`<Result status="success" title="Done" subtitle="Operation completed." />`}
        editableProps={{
          status: {
            type: 'select',
            default: 'success',
            options: [
              { value: 'success', label: 'Success' },
              { value: 'error', label: 'Error' },
              { value: 'info', label: 'Info' },
              { value: 'warning', label: 'Warning' },
              { value: '404', label: '404' },
              { value: '403', label: '403' },
              { value: '500', label: '500' },
            ],
          },
          title: { type: 'string', default: 'Operation Complete', placeholder: 'Title' },
          subtitle: { type: 'string', default: 'Your changes have been saved.', placeholder: 'Subtitle' },
        }}
        render={(props) => (
          <Result
            status={props.status as 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'}
            title={String(props.title ?? '')}
            subtitle={String(props.subtitle ?? '')}
          />
        )}
      />

      <ComponentPreview
        title="Success"
        description="Operation completed successfully."
        code={`<Result status="success" title="Payment Successful" subtitle="Your order has been placed." extra={<Button>Back Home</Button>} />`}
      >
        <Result status="success" title="Payment Successful" subtitle="Your order has been placed." extra={<Button onClick={() => {}}>Back Home</Button>} />
      </ComponentPreview>

      <ComponentPreview
        title="Error"
        description="Something went wrong."
        code={`<Result status="error" title="Submission Failed" subtitle="Please check your input and try again." />`}
      >
        <Result status="error" title="Submission Failed" subtitle="Please check your input and try again." extra={<Button variant="outline" onClick={() => {}}>Retry</Button>} />
      </ComponentPreview>

      <ComponentPreview
        title="404"
        description="Page not found."
        code={`<Result status="404" title="Page Not Found" subtitle="The page you're looking for doesn't exist." />`}
      >
        <Result status="404" title="Page Not Found" subtitle="The page you're looking for doesn't exist." extra={<Button onClick={() => {}}>Go Home</Button>} />
      </ComponentPreview>

      <ComponentPreview
        title="Info & Warning"
        description="Informational and warning states."
        code={`<Result status="info" title="Update Available" subtitle="A new version is ready to install." />`}
      >
        <div className="flex flex-col gap-8">
          <Result status="info" title="Update Available" subtitle="A new version is ready to install." />
          <Result status="warning" title="Caution" subtitle="This action may have side effects." />
        </div>
      </ComponentPreview>
    </div>
  );
};

export default ResultPage;
