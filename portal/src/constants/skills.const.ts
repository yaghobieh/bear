export interface BearSkillEntry {
  name: string;
  slug: string;
  description: string;
  invoke: string;
}

export interface AiModelPromptFormat {
  id: string;
  label: string;
  format: (prompt: string, skillInvoke?: string) => string;
}

export const BEAR_SKILLS: BearSkillEntry[] = [
  {
    name: 'bear-ui-standards',
    slug: 'bear-ui-standards',
    description: 'Types, constants, BEM, translations, file layout, and Bear ID format.',
    invoke: 'Follow bear-ui-standards when refactoring Select',
  },
  {
    name: 'bear-component-workflow',
    slug: 'bear-component-workflow',
    description: '4-file pattern, barrel exports, portal pages, navigation, and changelog.',
    invoke: 'Use bear-component-workflow to add ToggleButton',
  },
  {
    name: 'bear-code-review',
    slug: 'bear-code-review',
    description: 'Structured review — hooks, SVG helpers, props pattern, portal PropsTable.',
    invoke: 'Run /bear-code-review on FormControl',
  },
  {
    name: 'bear-code-quality',
    slug: 'bear-code-quality',
    description: 'Types in type files, constants in const files, no magic numbers.',
    invoke: 'Check bear-code-quality before merging',
  },
  {
    name: 'bear-js-fundamentals',
    slug: 'bear-js-fundamentals',
    description: 'Event loop, Promises, and when to avoid unnecessary hooks.',
    invoke: 'Follow bear-js-fundamentals for Gauge hooks',
  },
  {
    name: 'bear-release-workflow',
    slug: 'bear-release-workflow',
    description: 'Version bumps, CHANGELOG, build verification, and publish steps.',
    invoke: 'Prepare 1.2.4 per bear-release-workflow',
  },
];

export const SKILLS_INSTALL_CMD = 'Skills live in bear/.cursor/skills/ — open the Bear repo in Cursor to use them.';

export const SKILLS_EXAMPLE_PROMPTS = [
  'Add a login form with email and password using FormControl.',
  'Create a settings page with BearProvider RTL and density.',
  'Run /bear-code-review on Gauge and fix file layout.',
  'Add a data table page with sort, filter, and pagination.',
  'Prepare Bear 1.2.4 release per bear-release-workflow.',
];

export const AI_MODEL_PROMPT_FORMATS: AiModelPromptFormat[] = [
  {
    id: 'cursor',
    label: 'Cursor',
    format: (prompt) => prompt,
  },
  {
    id: 'claude',
    label: 'Claude',
    format: (prompt) => `You are helping on a Bear UI (React) project. Follow bear-ui-standards and use @forgedevstack/bear components.\n\nTask: ${prompt}`,
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    format: (prompt) => `Context: Bear UI React component library (@forgedevstack/bear). Use TypeScript, BEM classes, types in *.types.ts, constants in *.const.ts.\n\nRequest: ${prompt}`,
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    format: (prompt) => `// Bear UI task\n// ${prompt}`,
  },
  {
    id: 'windsurf',
    label: 'Windsurf',
    format: (prompt, skillInvoke) => skillInvoke ? `${skillInvoke}\n\n${prompt}` : prompt,
  },
];

export const formatSkillInvoke = (skill: BearSkillEntry, modelId: string): string => {
  const model = AI_MODEL_PROMPT_FORMATS.find((m) => m.id === modelId);
  if (!model) {
    return skill.invoke;
  }
  return model.format(skill.invoke, skill.invoke);
};

export const formatExamplePrompt = (prompt: string, modelId: string): string => {
  const model = AI_MODEL_PROMPT_FORMATS.find((m) => m.id === modelId);
  if (!model) {
    return prompt;
  }
  return model.format(prompt);
};
