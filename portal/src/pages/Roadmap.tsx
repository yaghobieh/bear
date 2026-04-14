import { FC } from 'react';
import { Typography, Card } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PHASES = [
  {
    id: '1', title: 'Foundation', status: 'Done',
    items: ['Core components (Button, Input, Card, Typography)', 'Theme system + dark mode', 'BearProvider + BearIcons'],
  },
  {
    id: '2', title: 'Forms & Inputs', status: 'Done',
    items: ['DatePicker, TimePicker, RichEditor, SignPad', 'OTPInput, PhoneInput, CreditInput, CurrencyInput', 'PasswordInput, FormField, InputGroup, TagsInput, MentionsInput'],
  },
  {
    id: '3', title: 'Data & Charts', status: 'Done',
    items: ['Chart, Sparkline, Gauge, Heatmap, TimelineChart, TagCloud', 'DataTable, VirtualList, InfiniteScroll, Kanban', 'TreeView, FileTree, Descriptions, NumberFormatter'],
  },
  {
    id: '4', title: 'Media & Advanced', status: 'Done',
    items: ['MediaPlayer (center overlay, sticky, AirPlay)', 'ImageAnnotation, ImageGallery, Cropper', 'AnimatedCounter, GlowCard, DiffSquares', 'Carousel integration (ForgeStack Rail)'],
  },
  {
    id: '5', title: 'Developer Experience', status: 'Done',
    items: ['PropsPlayground — live interactive prop editing', 'Terminal, JsonViewer, DiffViewer, CodeEditor', 'LinesOfCode, ComponentPreview with LivePropsBlock'],
  },
  {
    id: '6', title: 'Portal & Docs', status: 'In Progress',
    items: ['Full i18n (English + Spanish)', 'Search history + grouped results', 'Category landing pages', 'Sitemap + SEO optimization'],
  },
  {
    id: '7', title: 'Templates & Ecosystem', status: 'Planned',
    items: ['Dashboard layouts and form templates', 'Auth flows and e-commerce kits', '@forgedevstack/player — dedicated media player', 'Themes marketplace'],
  },
  {
    id: '8', title: 'Platform', status: 'Planned',
    items: ['MCP integration for AI-assisted dev', 'CMS templates with Bear UI', 'Visual theme builder', 'Figma plugin export'],
  },
];

const STATUS_CLASSES: Record<string, string> = {
  Done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'In Progress': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Planned: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const RoadmapPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.roadmapTitle}</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
      {t.roadmapDesc}
    </p>

    <div className="space-y-6 max-w-3xl">
      {PHASES.map((phase, idx) => (
        <Card key={phase.id} variant="outlined" padding="lg">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              phase.status === 'Done'
                ? 'bg-green-500 text-white'
                : phase.status === 'In Progress'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Typography variant="h6" weight="semibold">
                  {phase.title}
                </Typography>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${STATUS_CLASSES[phase.status]}`}>
                  {phase.status}
                </span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
  );
};

export default RoadmapPage;
