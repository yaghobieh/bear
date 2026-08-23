import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, CardCompound as Card, Badge, BearIcons } from '@forgedevstack/bear';
import { BEAR_VERSION } from '@/constants/navigation.const';

const RELEASE_ITEMS = [
  {
    title: 'Open and close effects',
    path: '/components/select',
    icon: BearIcons.LayersIcon,
    description: 'Select, Dropdown, DatePicker, DateRangePicker, TimePicker, and Calendar take openEffect, closeEffect, or effect={{ open, close }}.',
  },
  {
    title: 'DatePicker overlay',
    path: '/components/date-picker',
    icon: BearIcons.MaximizeIcon,
    description: 'The calendar stays on the trigger while the page scrolls and plays the close motion you pick.',
  },
  {
    title: 'TimePicker portal',
    path: '/components/time-picker',
    icon: BearIcons.EditIcon,
    description: 'The time dropdown portals above cards and drawers with the same open and close effects.',
  },
  {
    title: 'Select and Dropdown',
    path: '/components/dropdown',
    icon: BearIcons.SnackbarIcon,
    description: 'Menus no longer flash from the top-left. Pick slide-down, fade, scale, or none for open and close.',
  },
];

const FIXES = [
  'DatePicker: calendar stays on the input while the page or drawer scrolls (FORGE-117)',
  'TimePicker: dropdown portals above cards and drawers (FORGE-118)',
  'Select / Dropdown: no first-layout flash at the top-left (FORGE-120)',
  'GradientText: clip after backgroundImage so the letters show, not a solid fill (FORGE-115)',
];

const WhatsNew124Page: FC = () => (
  <div className="fade-in space-y-10 max-w-4xl">
    <div>
      <Badge variant="primary" className="mb-4">v{BEAR_VERSION}</Badge>
      <Typography variant="h1" className="mb-3">What&apos;s new in Bear {BEAR_VERSION}</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        Dropdown overlays now accept independent open and close effects. Pick slide-down, fade, scale, or none.
      </Typography>
    </div>

    <section>
      <Typography variant="h2" className="mb-6">This release</Typography>
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
