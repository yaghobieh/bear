import React, { useState } from 'react';
import { Typography, CardCompound as Card, Terminal, Button } from '@forgedevstack/bear';
import type { TerminalLine } from '@forgedevstack/bear';

const initialLines: TerminalLine[] = [
  { id: '1', type: 'system', content: 'Welcome to Bear Terminal v1.0.9' },
  { id: '2', type: 'info', content: 'Type "help" for available commands' },
];

const TerminalPage: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [theme, setTheme] = useState<'dark' | 'light' | 'matrix'>('dark');

  const handleCommand = (command: string) => {
    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: command,
      timestamp: new Date(),
    };

    let output: TerminalLine;
    
    switch (command.toLowerCase()) {
      case 'help':
        output = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: 'Available commands: help, clear, echo <text>, date, whoami',
        };
        break;
      case 'clear':
        setLines([]);
        return;
      case 'date':
        output = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: new Date().toString(),
        };
        break;
      case 'whoami':
        output = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: 'bear@forge',
        };
        break;
      default:
        if (command.startsWith('echo ')) {
          output = {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: command.slice(5),
          };
        } else {
          output = {
            id: (Date.now() + 1).toString(),
            type: 'error',
            content: `Command not found: ${command}`,
          };
        }
    }

    setLines(prev => [...prev, inputLine, output]);
  };

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">Terminal</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Console/terminal emulator with command history, themes, and line types.
        </Typography>
      </div>

      {/* Theme Selector */}
      <Card>
        <Card.Header title={<Typography variant="h5">Themes</Typography>} />
        <Card.Body>
          <div className="flex gap-2 mb-4">
            <Button 
              variant={theme === 'dark' ? 'primary' : 'ghost'}
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
            <Button 
              variant={theme === 'light' ? 'primary' : 'ghost'}
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
            <Button 
              variant={theme === 'matrix' ? 'primary' : 'ghost'}
              onClick={() => setTheme('matrix')}
            >
              Matrix
            </Button>
          </div>
          <Terminal
            lines={lines}
            onCommand={handleCommand}
            theme={theme}
            user="bear"
            host="forge"
            title="Bear Terminal"
            height={300}
          />
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { Terminal } from '@forgedevstack/bear';
import type { TerminalLine } from '@forgedevstack/bear';

const [lines, setLines] = useState<TerminalLine[]>([]);

<Terminal
  lines={lines}
  onCommand={(cmd) => {
    setLines([...lines, 
      { id: '1', type: 'input', content: cmd },
      { id: '2', type: 'output', content: 'Response...' }
    ]);
  }}
  user="user"
  host="localhost"
  theme="dark"
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Line Types */}
      <Card>
        <Card.Header title={<Typography variant="h5">Line Types</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`type TerminalLineType = 
  | 'input'    // User command
  | 'output'   // Normal output
  | 'error'    // Error (red)
  | 'success'  // Success (green)
  | 'warning'  // Warning (yellow)
  | 'info'     // Info (blue)
  | 'system';  // System message (purple)`}
          </pre>
        </Card.Body>
      </Card>

      {/* Props */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">lines</td>
                  <td className="py-3 px-4 font-mono text-xs">TerminalLine[]</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Terminal lines to display</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onCommand</td>
                  <td className="py-3 px-4 font-mono text-xs">(cmd: string) =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Callback when command is submitted</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">theme</td>
                  <td className="py-3 px-4 font-mono text-xs">'dark' | 'light' | 'matrix'</td>
                  <td className="py-3 px-4 font-mono text-xs">'dark'</td>
                  <td className="py-3 px-4">Color theme</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">user</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">"user"</td>
                  <td className="py-3 px-4">Username in prompt</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">host</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">"localhost"</td>
                  <td className="py-3 px-4">Hostname in prompt</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">readOnly</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">Disable input</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TerminalPage;
