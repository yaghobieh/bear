import { FC } from 'react';
import { Timeline } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { TIMELINE_DEMO_ITEMS, TIMELINE_PROPS } from './Timeline.const';

const TimelinePage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="Timeline" description={t.timelineDesc} componentName="Timeline">
      <ComponentPreview
        title={t.interactiveDots}
        description="Hover bullets to see full date and extra context."
        code={`<Timeline items={[
  { time: '10:00 AM', date: 'June 14, 2026', title: 'Started', detail: 'Kickoff...' },
  { time: '2:00 PM', title: 'Review', active: true },
]} />`}
      >
        <div className="w-full max-w-md">
          <Timeline items={TIMELINE_DEMO_ITEMS} />
        </div>
      </ComponentPreview>

      <PropsTable title={t.props} rows={TIMELINE_PROPS} />
    </DocPage>
  );
};

export default TimelinePage;
