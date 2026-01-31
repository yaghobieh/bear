import { FC } from 'react';
import { Typography, Card } from '@forgedevstack/bear';

/** Flow chart SVG for Bear UI development flow */
const FLOW_CHART_SVG = (
  <svg viewBox="0 0 600 200" className="w-full max-w-2xl h-auto">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
      </marker>
    </defs>
    {/* Foundation */}
    <rect x="0" y="70" width="100" height="60" rx="8" fill="#ec4899" className="opacity-90" />
    <text x="50" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Foundation</text>

    {/* Forms */}
    <rect x="150" y="70" width="100" height="60" rx="8" fill="#ec4899" className="opacity-90" />
    <text x="200" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Forms</text>

    {/* Data */}
    <rect x="300" y="70" width="100" height="60" rx="8" fill="#ec4899" className="opacity-90" />
    <text x="350" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Data</text>

    {/* Templates */}
    <rect x="450" y="70" width="100" height="60" rx="8" fill="#6b7280" className="opacity-80" />
    <text x="500" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Templates</text>

    {/* Advanced */}
    <rect x="250" y="150" width="100" height="60" rx="8" fill="#6b7280" className="opacity-80" />
    <text x="300" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Advanced</text>

    {/* Arrows */}
    <line x1="100" y1="100" x2="150" y2="100" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="250" y1="100" x2="300" y2="100" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="400" y1="100" x2="450" y2="100" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="500" y1="130" x2="300" y2="150" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4" />

    {/* Labels */}
    <text x="125" y="95" textAnchor="middle" fill="#6b7280" fontSize="10">Done</text>
    <text x="275" y="95" textAnchor="middle" fill="#6b7280" fontSize="10">Done</text>
    <text x="425" y="95" textAnchor="middle" fill="#6b7280" fontSize="10">Done</text>
    <text x="400" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">Next</text>
  </svg>
);

const PHASES = [
  { id: '1', title: 'Foundation', status: 'Done', items: ['Core components', 'Theme system', 'Dark mode'] },
  { id: '2', title: 'Forms & Inputs', status: 'Done', items: ['DatePicker', 'TimePicker', 'RichEditor', 'SignPad'] },
  { id: '3', title: 'Data & Charts', status: 'Done', items: ['Charts', 'DataTable', 'Sparkline', 'Gauge'] },
  { id: '4', title: 'Templates', status: 'Planned', items: ['Dashboard layouts', 'Form templates', 'Auth flows'] },
  { id: '5', title: 'Advanced', status: 'Planned', items: ['MCP integration', 'CMS templates', 'Themes marketplace'] },
];

const RoadmapPage: FC = () => (
  <div className="fade-in">
    <div className="flex items-center gap-3 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Roadmap</h1>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
      Bear UI development roadmap. Phases show completed work and planned features.
    </p>

    <div className="space-y-6 max-w-3xl">
      {PHASES.map((phase, idx) => (
        <Card key={phase.id} variant="outlined" padding="lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 font-semibold">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Typography variant="h6" weight="semibold">
                  {phase.title}
                </Typography>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    phase.status === 'Done'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
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

    <section className="mt-12">
      <Typography variant="h5" weight="semibold" className="mb-4">
        Flow Chart
      </Typography>
      <Card variant="outlined" padding="lg" className="overflow-x-auto">
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center justify-center">
            {FLOW_CHART_SVG}
          </div>
        </div>
        <div className="flex gap-4 min-w-max py-4 justify-center">
          {PHASES.map((p, i) => (
            <div key={p.id} className="flex items-center">
              <div className="w-24 text-center">
                <div
                  className={`mx-auto w-16 h-16 rounded-lg flex items-center justify-center text-sm font-medium ${
                    p.status === 'Done'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {p.title.slice(0, 2)}
                </div>
                <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">{p.title}</p>
              </div>
              {i < PHASES.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" aria-hidden />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          Flow: Foundation → Forms & Inputs → Data & Charts → Templates → Advanced (pink = Done, gray = Planned)
        </p>
      </Card>
    </section>
  </div>
);

export default RoadmapPage;
