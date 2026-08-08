import { FC, useState } from 'react';
import { Banner, Button } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const BannerPage: FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Banner</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Full-width announcement strip for version notices, incidents, and promos. Supports severity,
        sticky placement, dismiss, and optional actions.
      </p>
      <div className="mb-8">
        <CodeBlock
          language="tsx"
          showLineNumbers={false}
          code={`import { Banner, Button } from '@forgedevstack/bear';`}
        />
      </div>
      <ComponentPreview
        title="Severity"
        description="Info, success, warning, and error tones with dual-mode tokens."
        code={`<Banner severity="info" title="Bear 1.2.8">
  New Banner and AppShell components are in progress.
</Banner>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Banner severity="info" title="Info">
            Release notes and non-urgent updates.
          </Banner>
          <Banner severity="success" title="Success">
            Deploy completed successfully.
          </Banner>
          <Banner severity="warning" title="Warning">
            Maintenance window starts at 22:00 UTC.
          </Banner>
          <Banner severity="error" title="Error">
            Payment provider is degraded.
          </Banner>
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="Dismissible + action"
        description="Controlled open state with action button and dismiss."
        code={`<Banner
  severity="info"
  dismissible
  open={open}
  onDismiss={() => setOpen(false)}
  action={<Button size="sm">Learn more</Button>}
>
  Bear v1.2.8 sprint is underway.
</Banner>`}
      >
        <div className="flex flex-col gap-3 w-full">
          {open ? (
            <Banner
              severity="info"
              title="Announcement"
              dismissible
              open={open}
              onDismiss={() => setOpen(false)}
              action={
                <Button size="sm" variant="outline">
                  Learn more
                </Button>
              }
            >
              Bear v1.2.8 sprint is underway on release/1.2.8.
            </Banner>
          ) : (
            <Button size="sm" onClick={() => setOpen(true)}>
              Show banner
            </Button>
          )}
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="Sticky"
        description="Sticks to the top of the scroll container."
        code={`<Banner severity="warning" position="sticky" title="Sticky banner">
  Remains visible while scrolling.
</Banner>`}
      >
        <Banner severity="warning" position="sticky" title="Sticky banner">
          Remains visible while scrolling.
        </Banner>
      </ComponentPreview>
    </div>
  );
};

export default BannerPage;
