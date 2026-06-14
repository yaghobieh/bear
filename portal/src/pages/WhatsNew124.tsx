import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, CardCompound as Card, Badge, BearIcons } from '@forgedevstack/bear';
import { BEAR_VERSION } from '@/constants/navigation.const';

const RELEASE_ITEMS = [
  {
    title: 'ToggleButton & ToggleButtonGroup',
    path: '/components/toggle-button',
    icon: BearIcons.ToggleButtonIcon,
    description: 'Exclusive or multi-select toggles with theme-aware selected states.',
  },
  {
    title: 'FormControl',
    path: '/components/form-control',
    icon: BearIcons.FormControlIcon,
    description: 'Label, error, helper, disabled, and required propagation via context.',
  },
  {
    title: 'Snackbar',
    path: '/components/snackbar',
    icon: BearIcons.SnackbarIcon,
    description: 'Anchored messages with createPortal and custom container support.',
  },
  {
    title: 'CssBaseline',
    path: '/theming',
    icon: BearIcons.PaletteIcon,
    description: 'Global box-sizing and body reset from theme CSS variables.',
  },
  {
    title: 'Skeleton variants',
    path: '/components/skeleton',
    icon: BearIcons.SparklesIcon,
    description: 'TableSkeleton, FormSkeleton, and CardSkeleton loading placeholders.',
  },
  {
    title: 'Bear IDs',
    path: '/typescript',
    icon: BearIcons.SettingsIcon,
    description: 'useBearId generates Bear_component_123456 — stable, prefixed DOM ids.',
  },
];

const ENHANCEMENTS = [
  'BearProvider: defaultProps, direction (RTL), density, controlled mode',
  'Input multiline: rows, minRows, maxRows, readOnly, inputRef',
  'Button: disableRipple, href, component polymorphism',
  'Modal & Drawer: MUI-parity props (disableEscapeKeyDown, anchor, variant)',
  'Gauge refactor: useGauge hook + GaugeArcSvg helper',
];

const WhatsNew124Page: FC = () => (
  <div className="fade-in space-y-10 max-w-4xl">
    <div>
      <Badge variant="primary" className="mb-4">v{BEAR_VERSION}</Badge>
      <Typography variant="h1" className="mb-3">What&apos;s new in Bear {BEAR_VERSION}</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        MUI-parity release — new form primitives, provider enhancements, and a standardized ID system.
      </Typography>
    </div>

    <section>
      <Typography variant="h2" className="mb-6">New components</Typography>
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
      <Typography variant="h2" className="mb-4">Enhancements</Typography>
      <Card className="p-6">
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {ENHANCEMENTS.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <BearIcons.CheckIcon size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>

    <section>
      <Typography variant="h2" className="mb-4">Code review workflow</Typography>
      <Card className="p-6">
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-3">
          Use <code className="text-pink-500">/bear-code-review</code> in Cursor to audit components against Bear standards —
          hooks placement, SVG helpers, PropsTable docs, and ID format.
        </Typography>
        <Link to="/components/form-control" className="text-pink-500 hover:underline text-sm font-medium">
          See FormControl as reference →
        </Link>
      </Card>
    </section>
  </div>
);

export default WhatsNew124Page;
