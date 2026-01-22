/**
 * Bear Icon Library
 * 
 * Comprehensive SVG icon library with 300+ icons organized by category
 * All icons are optimized React components with consistent styling
 */

export { Icon } from './Icon';
export type { IconProps } from './Icon.types';

// Import all icon categories
import * as ActionIcons from './icons/action';
import * as NavigationIcons from './icons/navigation';
import * as ContentIcons from './icons/content';
import * as CommunicationIcons from './icons/communication';
import * as StatusIcons from './icons/status';
import * as MediaIcons from './icons/media';
import * as EditorIcons from './icons/editor';
import * as MiscIcons from './icons/misc';

// Export commonly used icons directly for convenience
export const CheckIcon = StatusIcons.CheckIcon;
export const CloseIcon = NavigationIcons.CloseIcon;
export const ChevronDownIcon = NavigationIcons.ChevronDownIcon;
export const ChevronRightIcon = NavigationIcons.ChevronRightIcon;
export const ChevronLeftIcon = NavigationIcons.ChevronLeftIcon;
export const ChevronUpIcon = NavigationIcons.ChevronUpIcon;
export const MenuIcon = NavigationIcons.MenuIcon;
export const SearchIcon = ActionIcons.SearchIcon;
export const SettingsIcon = ActionIcons.SettingsIcon;
export const PlusIcon = MiscIcons.PlusIcon;
export const MinusIcon = MiscIcons.MinusIcon;
export const XIcon = MiscIcons.XIcon;
export const BearPawIcon = MiscIcons.BearPawIcon;

/**
 * BearIcons - All icons organized by category
 * 
 * @example
 * ```tsx
 * import { BearIcons } from '@forgedevstack/bear';
 * 
 * // Use icons directly
 * <BearIcons.Add size="md" color="blue" />
 * <BearIcons.Search size="lg" />
 * 
 * // Access by category
 * <BearIcons.Action.AddCircle />
 * <BearIcons.Navigation.ChevronRight />
 * ```
 */
export const BearIcons = {
  // Flat access to common icons (shortcuts)
  ...ActionIcons,
  ...NavigationIcons,
  ...ContentIcons,
  ...CommunicationIcons,
  ...StatusIcons,
  ...MediaIcons,
  ...EditorIcons,
  ...MiscIcons,
  
  // Category-based access
  Action: ActionIcons,
  Navigation: NavigationIcons,
  Content: ContentIcons,
  Communication: CommunicationIcons,
  Status: StatusIcons,
  Media: MediaIcons,
  Editor: EditorIcons,
  Misc: MiscIcons,
};

// Default export for convenience
export default BearIcons;
