import { useState } from 'react';
import { Spotlight, type SpotlightAction } from '@forgedevstack/bear';

const DEMO_ACTIONS: SpotlightAction[] = [
  { id: '1', label: 'Home', description: 'Go to homepage', group: 'Navigation', onTrigger: () => alert('Navigate: Home') },
  { id: '2', label: 'Settings', description: 'Open settings page', group: 'Navigation', onTrigger: () => alert('Navigate: Settings') },
  { id: '3', label: 'Profile', description: 'View your profile', group: 'Navigation', onTrigger: () => alert('Navigate: Profile') },
  { id: '4', label: 'Toggle Dark Mode', description: 'Switch theme', group: 'Actions', onTrigger: () => alert('Toggle theme') },
  { id: '5', label: 'Search Users', description: 'Find users by name', group: 'Actions', keywords: ['find', 'people'], onTrigger: () => alert('Search users') },
  { id: '6', label: 'Create New Post', description: 'Write a new post', group: 'Actions', onTrigger: () => alert('New post') },
  { id: '7', label: 'Documentation', description: 'View Bear UI docs', group: 'Help', onTrigger: () => alert('Open docs') },
  { id: '8', label: 'Keyboard Shortcuts', description: 'View all shortcuts', group: 'Help', onTrigger: () => alert('Show shortcuts') },
];

export default function SpotlightPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Spotlight</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        macOS-style search overlay. Trigger with keyboard shortcut (Cmd+K) or programmatically. Supports actions, grouping, and search highlighting.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs font-mono">Cmd+K</kbd> or click the button below:
            </p>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
            >
              Open Spotlight
            </button>
          </div>

          <Spotlight
            actions={DEMO_ACTIONS}
            open={open}
            onOpenChange={setOpen}
            placeholder="What are you looking for?"
            highlightMatches
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Keyboard shortcut (Cmd/Ctrl + K)</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Search highlighting</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Grouped actions</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Arrow key navigation</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Dark/Light mode</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Theme integration via CSS variables</li>
            <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Keyword search</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Spotlight } from '@forgedevstack/bear';

const actions = [
  { id: '1', label: 'Home', group: 'Nav', onTrigger: () => navigate('/') },
  { id: '2', label: 'Settings', group: 'Nav', onTrigger: () => navigate('/settings') },
  { id: '3', label: 'Toggle Theme', group: 'Actions', onTrigger: () => toggleTheme() },
];

<Spotlight
  actions={actions}
  placeholder="Search anything..."
  highlightMatches
/>`}
          </pre>
        </section>
      </div>
    </div>
  );
}
