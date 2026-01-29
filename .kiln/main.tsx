
import React from 'react';
import ReactDOM from 'react-dom/client';
import { KilnProvider, KilnLayout } from '@forgedevstack/kiln';
import '../src/styles/main.css';
import { BearProvider } from '../src/context/BearProvider';

// Import stories dynamically
const storyModules = import.meta.glob(['../src/**/*.kiln.tsx', '../src/**/*.story.tsx', '../src/**/*.stories.tsx'], { eager: true });

// Normalize stories: convert object format { Default: {}, Variants: {} } to array format [{ name: 'Default' }, ...]
function normalizeStories(stories: any): any[] {
  if (!stories) return [];
  if (Array.isArray(stories)) return stories;
  // Object format - convert to array
  return Object.entries(stories).map(([key, value]: [string, any]) => ({
    name: key,
    ...value,
  }));
}

// Parse story modules
const storyGroups = Object.entries(storyModules).map(([path, mod]: [string, any]) => {
  const defaultExport = mod.default;
  if (defaultExport?.title) {
    return {
      ...defaultExport,
      stories: normalizeStories(defaultExport.stories),
      path,
    };
  }
  return null;
}).filter(Boolean);

const config = {"title":"Bear UI Components","description":"Strong, reliable React UI components - ForgeStack Bear Library","theme":"dark","primaryColor":"#ec4899","stories":["src/**/*.kiln.tsx","src/**/*.story.tsx","src/**/*.stories.tsx"],"port":6006,"showCodeDefault":true,"testing":false,"cssImport":"../src/styles/main.css","wrapper":{"from":"../src/context/BearProvider","name":"BearProvider","props":{"defaultMode":"dark"}},"vite":{"resolve":{"alias":{"@utils":"./src/utils","@hooks":"./src/hooks","@context":"./src/context","@components":"./src/components"}}}};

function App() {
  return (
    <BearProvider defaultMode={"dark"}>
    <KilnProvider config={config} storyGroups={storyGroups}>
      <KilnLayout />
    </KilnProvider>
    </BearProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
