import { Link } from 'react-router-dom';
import { Typography, CardCompound as Card, Badge, BearIcons } from '@forgedevstack/bear';
import { CHANGELOG_ENTRIES } from '@/constants/changelog.const';

const LATEST = CHANGELOG_ENTRIES[0];

const RELEASE_ITEMS = [
  {
    title: 'Drawer close effects',
    path: '/components/drawer',
    icon: BearIcons.LayersIcon,
    description: 'openEffect, closeEffect, or effect={{ open, close }} — fade, scale, slide-down, or none, independent of the open motion.',
  },
  {
    title: 'Install with or without icons',
    path: '/installation',
    icon: BearIcons.PackageIcon,
    description: 'npm install @forgedevstack/bear includes icons. Skip them with --omit=optional, or install @forgedevstack/bear-icons alone.',
  },
  {
    title: 'Chart types and pie views',
    path: '/components/chart',
    icon: BearIcons.PieChartIcon,
    description: 'type radar, funnel, stacked. pieView "half" | "rose", explodeIndex, and line stepped.',
  },
  {
    title: 'Gauge, Sparkline, Heatmap, Timeline, Ring',
    path: '/components/gauge',
    icon: BearIcons.BarChartIcon,
    description: 'Gauge linear | ring, Sparkline bars and showLastPoint, Heatmap circle cells, TimelineChart points, RingProgress half.',
  },
];

const CHART_ITEMS = [
  { path: '/components/chart', title: 'Chart', detail: 'type="radar" | "funnel" | "stacked". pieView="half" | "rose". explodeIndex. line stepped.' },
  { path: '/components/gauge', title: 'Gauge', detail: 'variant="linear" | "ring".' },
  { path: '/components/sparkline', title: 'Sparkline', detail: 'variant="bars". showLastPoint.' },
  { path: '/components/heatmap', title: 'Heatmap', detail: 'cellShape="circle".' },
  { path: '/components/timeline-chart', title: 'TimelineChart', detail: 'variant="points".' },
  { path: '/components/ring-progress', title: 'RingProgress', detail: 'variant="half".' },
];

const FIXES = [
  'Right-side Drawer stays on the right and slides out to the right; close control on the inner edge (FORGE-126)',
  'Icons live in @forgedevstack/bear-icons and still import from Bear (FORGE-127)',
];

const WhatsNew124Page = () => (
  <div className="fade-in space-y-10 max-w-4xl">
    <div>
      <Badge variant="primary" className="mb-4">v{LATEST.version}</Badge>
      <Typography variant="h1" className="mb-3">What&apos;s new in Bear {LATEST.version}</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        Drawer close effects, install Bear with or without icons, and new views on Chart, Gauge, Sparkline, Heatmap, TimelineChart, and RingProgress.
      </Typography>
    </div>

    <section>
      <Typography variant="h2" className="mb-6">New</Typography>
      <div className="grid gap-4 sm:grid-cols-2">
        {RELEASE_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className="block group">
              <Card className="p-5 h-full border border-gray-200 dark:border-gray-700/60 hover:border-pink-400 dark:hover:border-pink-500 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-500 shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-1 group-hover:text-pink-500 transition-colors">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                      {item.description}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>

    <section>
      <Typography variant="h2" className="mb-4">Charts and meters</Typography>
      <Card className="p-6">
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          {CHART_ITEMS.map((item) => (
            <li key={item.title}>
              <Link to={item.path} className="font-medium text-gray-900 dark:text-gray-100 hover:text-pink-500">
                {item.title}
              </Link>
              <span className="text-gray-400 dark:text-gray-500"> · </span>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>

    <section>
      <Typography variant="h2" className="mb-4">Fixes</Typography>
      <Card className="p-6">
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {FIXES.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <BearIcons.CheckIcon size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  </div>
);

export default WhatsNew124Page;
