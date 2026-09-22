import { Link } from 'react-router-dom';
import { Typography, CardCompound as Card, Badge, BearIcons } from '@forgedevstack/bear';
import { CHANGELOG_ENTRIES } from '@/constants/changelog.const';

const LATEST = CHANGELOG_ENTRIES[0];

const RELEASE_ITEMS = [
  {
    title: 'ToggleGroup & ToggleGroupItem',
    path: '/components/toggle-group',
    icon: BearIcons.ToggleButtonIcon,
    description: 'WAI-ARIA roving focus segmented buttons supporting single and multiple selection modes, subtle/outline/filled variants, horizontal/vertical orientations, and Bear Button integration.',
  },
  {
    title: 'Standardized Focus Traps (useFocusTrap)',
    path: '/hooks',
    icon: BearIcons.ShieldIcon,
    description: 'Robust accessibility focus trapping with automated cycle loops, initial focus targeting, escape listener, and reliable focus restoration on unmount across all overlay dialogs.',
  },
  {
    title: 'Overlay Effects Parity',
    path: '/components/modal',
    icon: BearIcons.LayersIcon,
    description: 'Full openEffect & closeEffect parity (fade, scale, slide-down, fold, none) supported across Modal, Drawer, Popover, Menu, Tooltip, and HoverCard.',
  },
  {
    title: 'Density Parity (Compact / Normal / Comfortable)',
    path: '/components/select',
    icon: BearIcons.TuneIcon,
    description: 'Consistent density tokens integrated across Select, ChipGroup, and AppBar, adapting layouts gracefully to high-density dashboards.',
  },
  {
    title: 'New EmptyState Presets',
    path: '/components/empty-state',
    icon: BearIcons.InboxIcon,
    description: 'Added "no-data", "404", "offline", and "filter-empty" presets with smart fallback titles, descriptions, and preset icons.',
  },
  {
    title: 'Architectural Refactoring & Modularity',
    path: '/components',
    icon: BearIcons.PackageIcon,
    description: 'Enforced 1 component per TSX file (MenuItem, MenuDivider, CommandItem, ToastItem, ToastContainer) and centralized magic strings & numbers in @constants.',
  },
];

const FIXES = [
  'FORGE-134 (#85): Overlay openEffect & closeEffect parity across Modal, Menu, Popover, Tooltip, and HoverCard',
  'FORGE-135 (#84): Standardized focus trap and focus restore across Modal, Drawer, AlertDialog, CommandPalette, and BottomSheet',
  'FORGE-133 (#82): Density parity (compact, normal, comfortable) supported across Select, ChipGroup, and AppBar',
  'FORGE-155 (#86): Resolved useBearId hook consistency and removed legacy references',
  'FORGE-138 (#83): Complete PropsTable coverage and live examples for all new components',
  'Code Quality: Separated components into 1 component per TSX file and extracted SVGs and constants',
];

const WhatsNew124Page = () => (
  <div className="fade-in space-y-10 max-w-4xl">
    <div>
      <Badge variant="primary" className="mb-4">v{LATEST.version}</Badge>
      <Typography variant="h1" className="mb-3">What&apos;s new in Bear {LATEST.version}</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        Introducing the new ToggleGroup component, full overlay motion parity, standardized focus traps, density parity, and enhanced component modularity.
      </Typography>
    </div>

    <section>
      <Typography variant="h2" className="mb-6">New Components & Features</Typography>
      <div className="grid gap-4 sm:grid-cols-2">
        {RELEASE_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path + item.title} to={item.path} className="block group">
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
      <Typography variant="h2" className="mb-4">Fixes & Architecture</Typography>
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
