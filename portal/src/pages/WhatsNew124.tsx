import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, CardCompound as Card, Badge, BearIcons } from '@forgedevstack/bear';
import { BEAR_VERSION } from '@/constants/navigation.const';

const RELEASE_ITEMS = [
  {
    title: 'ModalsProvider',
    path: '/components/modals-provider',
    icon: BearIcons.LayersIcon,
    description: 'useModals() open, confirm, close, and closeAll — no local isOpen state. Stack-safe z-index and focus restore.',
  },
  {
    title: 'Modal and Drawer stacking',
    path: '/components/modal',
    icon: BearIcons.MaximizeIcon,
    description: 'Dialogs sit above backdrop blur. Nested Backdrop is absolute; the panel is isolated so filter no longer covers the content.',
  },
  {
    title: 'SignPad drawing',
    path: '/components/sign-pad',
    icon: BearIcons.EditIcon,
    description: 'Mouse and touch write on the canvas again. Overlay chrome cannot steal pointers; resize and theme no longer wipe the signature.',
  },
  {
    title: 'Toast and Snackbar surfaces',
    path: '/components/toast',
    icon: BearIcons.SnackbarIcon,
    description: 'Shipped surface CSS in light and dark. Snackbar uses tertiary background and readable description text.',
  },
];

const FIXES = [
  'Modal and Drawer: nested Backdrop at z-index 0, panel at z-index 1 inside an isolated stacking context (FORGE-84, FORGE-85)',
  'Toast: BEM severity modifiers instead of unshipped color utilities (FORGE-86)',
  'Snackbar: --bear-bg-tertiary surface and secondary description color in dark mode (FORGE-86)',
  'SignPad: pointer events on the wrapper; overlay chrome is pointer-events none (FORGE-87)',
];

const WhatsNew124Page: FC = () => (
  <div className="fade-in space-y-10 max-w-4xl">
    <div>
      <Badge variant="primary" className="mb-4">v{BEAR_VERSION}</Badge>
      <Typography variant="h1" className="mb-3">What&apos;s new in Bear {BEAR_VERSION}</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
        Imperative modals, overlay stacking that survives backdrop blur, SignPad capture, and Toast/Snackbar contrast in dark and light.
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
