import { useState } from 'react';
import { Dock, type DockItem } from '@forgedevstack/bear';

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);

const ITEMS: DockItem[] = [
  { id: '1', icon: <HomeIcon />, label: 'Home', active: true, onClick: () => {} },
  { id: '2', icon: <SearchIcon />, label: 'Search', onClick: () => {} },
  { id: '3', icon: <MailIcon />, label: 'Messages', badge: 3, onClick: () => {} },
  { id: '4', icon: <HeartIcon />, label: 'Favorites', onClick: () => {} },
  { id: '5', icon: <SettingsIcon />, label: 'Settings', onClick: () => {} },
];

export default function DockPage() {
  const [magnification, setMagnification] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dock</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        macOS-style dock bar with icon magnification. Supports badges, positions, and hover effects.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
          <div className="flex gap-4 mb-4 flex-wrap">
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input type="checkbox" checked={magnification} onChange={(e) => setMagnification(e.target.checked)} /> Magnification
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} /> Labels
            </label>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            The dock is fixed at the bottom of the viewport. Hover over the icons to see the magnification effect.
          </p>
          <Dock items={ITEMS} magnification={magnification} showLabels={showLabels} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Dock } from '@forgedevstack/bear';

const items = [
  { id: '1', icon: <HomeIcon />, label: 'Home', active: true },
  { id: '2', icon: <SearchIcon />, label: 'Search', badge: 5 },
  { id: '3', icon: <SettingsIcon />, label: 'Settings' },
];

<Dock items={items} magnification position="bottom" />`}
          </pre>
        </section>
      </div>
    </div>
  );
}
