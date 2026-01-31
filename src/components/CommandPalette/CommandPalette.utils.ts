import { CommandItem, CommandGroup } from './CommandPalette.types';

/**
 * Default filter function
 */
export const defaultFilterFn = (command: CommandItem, query: string): boolean => {
  const lower = query.toLowerCase();
  const searchTerms = [
    command.label.toLowerCase(),
    command.description?.toLowerCase() || '',
    ...(command.keywords?.map((k) => k.toLowerCase()) || []),
  ];
  
  return searchTerms.some((term) => term.includes(lower));
};

/**
 * Group commands by category
 */
export const groupCommandsByCategory = (commands: CommandItem[]): CommandGroup[] => {
  const groups: Record<string, CommandItem[]> = {};
  const uncategorized: CommandItem[] = [];
  
  commands.forEach((command) => {
    if (command.category) {
      if (!groups[command.category]) {
        groups[command.category] = [];
      }
      groups[command.category].push(command);
    } else {
      uncategorized.push(command);
    }
  });
  
  const result: CommandGroup[] = Object.entries(groups).map(([name, cmds]) => ({
    name,
    commands: cmds,
  }));
  
  // Add uncategorized at the end if any
  if (uncategorized.length > 0) {
    result.push({ name: 'Other', commands: uncategorized });
  }
  
  return result;
};

/**
 * Parse keyboard shortcut for display
 */
export const formatShortcut = (shortcut: string): string[] => {
  return shortcut.split('+').map((key) => {
    switch (key.toLowerCase()) {
      case 'ctrl':
      case 'control':
        return '⌃';
      case 'cmd':
      case 'command':
      case 'meta':
        return '⌘';
      case 'alt':
      case 'option':
        return '⌥';
      case 'shift':
        return '⇧';
      case 'enter':
      case 'return':
        return '↵';
      case 'backspace':
        return '⌫';
      case 'delete':
        return '⌦';
      case 'escape':
      case 'esc':
        return 'esc';
      case 'tab':
        return '⇥';
      case 'space':
        return '␣';
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'left':
        return '←';
      case 'right':
        return '→';
      default:
        return key.toUpperCase();
    }
  });
};

/**
 * Get flat list of commands from groups
 */
export const flattenGroups = (groups: CommandGroup[]): CommandItem[] => {
  return groups.flatMap((g) => g.commands);
};
