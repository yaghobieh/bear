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
import * as BearCategoryIcons from './icons/bear';
import * as FileIcons from './icons/file';
import * as SocialIcons from './icons/social';
import * as DeviceIcons from './icons/device';
import * as CommerceIcons from './icons/commerce';

// Export commonly used icons directly for convenience
export const CheckIcon = StatusIcons.CheckIcon;
export const CloseIcon = NavigationIcons.CloseIcon;
export const EditIcon = ActionIcons.EditIcon;
export const ChevronDownIcon = NavigationIcons.ChevronDownIcon;
export const ChevronRightIcon = NavigationIcons.ChevronRightIcon;
export const ChevronLeftIcon = NavigationIcons.ChevronLeftIcon;
export const ChevronUpIcon = NavigationIcons.ChevronUpIcon;
export const ChevronsUpIcon = NavigationIcons.ChevronsUpIcon;
export const ChevronsDownIcon = NavigationIcons.ChevronsDownIcon;
export const ChevronsLeftIcon = NavigationIcons.ChevronsLeftIcon;
export const ChevronsRightIcon = NavigationIcons.ChevronsRightIcon;
export const MenuIcon = NavigationIcons.MenuIcon;
export const SearchIcon = ActionIcons.SearchIcon;
export const SettingsIcon = ActionIcons.SettingsIcon;
export const PlusIcon = MiscIcons.PlusIcon;
export const MinusIcon = MiscIcons.MinusIcon;
export const XIcon = MiscIcons.XIcon;
export const BearPawIcon = MiscIcons.BearPawIcon;
export const HomeIcon = NavigationIcons.HomeIcon;
export const InfoIcon = StatusIcons.InfoIcon;
export const UserIcon = MiscIcons.UserIcon;
export const UsersIcon = MiscIcons.UsersIcon;
export const UserPlusIcon = MiscIcons.UserPlusIcon;
export const UserMinusIcon = MiscIcons.UserMinusIcon;
export const UserCheckIcon = MiscIcons.UserCheckIcon;
export const UserXIcon = MiscIcons.UserXIcon;
export const HoneycombIcon = BearCategoryIcons.HoneycombIcon;
export const ClawIcon = BearCategoryIcons.ClawIcon;
export const ForestIcon = BearCategoryIcons.ForestIcon;
export const DenIcon = BearCategoryIcons.DenIcon;
export const SalmonIcon = BearCategoryIcons.SalmonIcon;
export const CampfireIcon = BearCategoryIcons.CampfireIcon;
export const PineTreeIcon = BearCategoryIcons.PineTreeIcon;
export const MountainIcon = BearCategoryIcons.MountainIcon;

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
  ...BearCategoryIcons,
  ...FileIcons,
  ...SocialIcons,
  ...DeviceIcons,
  ...CommerceIcons,

  Action: ActionIcons,
  Navigation: NavigationIcons,
  Content: ContentIcons,
  Communication: CommunicationIcons,
  Status: StatusIcons,
  Media: MediaIcons,
  Editor: EditorIcons,
  Misc: MiscIcons,
  Bear: BearCategoryIcons,
  File: FileIcons,
  Social: SocialIcons,
  Device: DeviceIcons,
  Commerce: CommerceIcons,
};

// Default export for convenience
export default BearIcons;
