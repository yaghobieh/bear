import { FC, useState, useMemo } from 'react';
import { CodeBlock } from '@/components/CodeBlock';

// Sample icons for the portal (subset of actual Bear icons)
const ICON_CATEGORIES = {
  Action: [
    'AddIcon', 'AddCircleIcon', 'RemoveIcon', 'DeleteIcon', 'SearchIcon', 
    'SettingsIcon', 'EditIcon', 'SaveIcon', 'DownloadIcon', 'UploadIcon',
    'CopyIcon', 'UndoIcon', 'RedoIcon', 'RefreshIcon', 'PrintIcon',
    'FavoriteIcon', 'StarIcon', 'BookmarkIcon', 'ShareIcon', 'LinkIcon',
  ],
  Navigation: [
    'HomeIcon', 'ArrowUpIcon', 'ArrowDownIcon', 'ArrowLeftIcon', 'ArrowRightIcon',
    'ChevronUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon',
    'MenuIcon', 'CloseIcon', 'ExpandIcon', 'CollapseIcon',
  ],
  Communication: [
    'MailIcon', 'PhoneIcon', 'ChatIcon', 'NotificationIcon', 'BellIcon',
    'SendIcon', 'InboxIcon',
  ],
  Status: [
    'CheckIcon', 'CheckCircleIcon', 'ErrorIcon', 'WarningIcon', 'InfoIcon',
    'HelpIcon', 'LoadingIcon',
  ],
  Media: [
    'PlayIcon', 'PauseIcon', 'StopIcon', 'VolumeUpIcon', 'VolumeDownIcon',
    'ImageIcon', 'VideoIcon', 'MusicIcon', 'CameraIcon',
  ],
  Content: [
    'FileIcon', 'FolderIcon', 'DocumentIcon', 'CalendarIcon', 'ClockIcon',
    'TagIcon', 'FilterIcon', 'SortIcon', 'GridIcon', 'ListIcon',
  ],
};

// Simple SVG icon renderer
const IconPreview: FC<{ name: string }> = ({ name }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`<${name} />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Generate a simple placeholder icon based on name
  const icon = useMemo(() => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rotation = (hash % 4) * 90;
    
    return (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="text-gray-600 dark:text-gray-400"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {name.includes('Circle') ? (
          <circle cx="12" cy="12" r="10" />
        ) : name.includes('Arrow') || name.includes('Chevron') ? (
          <polyline points="6 9 12 15 18 9" />
        ) : name.includes('Check') ? (
          <polyline points="20 6 9 17 4 12" />
        ) : name.includes('Add') || name.includes('Plus') ? (
          <>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </>
        ) : name.includes('Star') ? (
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        ) : (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </>
        )}
      </svg>
    );
  }, [name]);

  return (
    <button
      onClick={handleCopy}
      className={`
        p-4 rounded-lg border transition-all
        hover:border-bear-500 hover:shadow-md
        ${copied 
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
        }
      `}
      title={copied ? 'Copied!' : `Click to copy <${name} />`}
    >
      <div className="flex flex-col items-center gap-2">
        {icon}
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-full">
          {name.replace('Icon', '')}
        </span>
      </div>
    </button>
  );
};

const Icons: FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const searchLower = search.toLowerCase();
    const result: Record<string, string[]> = {};

    Object.entries(ICON_CATEGORIES).forEach(([category, icons]) => {
      const filtered = icons.filter(icon => 
        icon.toLowerCase().includes(searchLower)
      );
      if (filtered.length > 0 && (!activeCategory || activeCategory === category)) {
        result[category] = filtered;
      }
    });

    return result;
  }, [search, activeCategory]);

  const totalIcons = Object.values(ICON_CATEGORIES).flat().length;

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Icons
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Bear UI includes 300+ SVG icons organized by category. Click any icon to copy its import.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Usage
        </h2>
        <CodeBlock
          code={`import { BearIcons, SearchIcon, HomeIcon } from '@forgedevstack/bear';

// Use individual icons
<SearchIcon size="md" color="#ec4899" />
<HomeIcon size="lg" />

// Or use the BearIcons namespace
<BearIcons.Search size="md" />
<BearIcons.Action.AddCircle size="lg" />`}
          language="tsx"
        />
      </section>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bear-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors
              ${!activeCategory 
                ? 'bg-bear-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            All ({totalIcons})
          </button>
          {Object.keys(ICON_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors
                ${activeCategory === category 
                  ? 'bg-bear-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(filteredCategories).map(([category, icons]) => (
        <section key={category} className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {category}
            <span className="text-sm font-normal text-gray-500">({icons.length})</span>
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {icons.map((icon) => (
              <IconPreview key={icon} name={icon} />
            ))}
          </div>
        </section>
      ))}

      {Object.keys(filteredCategories).length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No icons found matching "{search}"
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Icon Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">size</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>xs | sm | md | lg | xl | number</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">md</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon size (predefined or pixels)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">color</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>string</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">currentColor</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon color (any valid CSS color)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-bear-600">className</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <code>string</code>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Icons;

