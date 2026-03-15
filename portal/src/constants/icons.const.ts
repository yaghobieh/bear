import { BearIcons } from '@forgedevstack/bear';

const ICON_CATEGORIES = {
  Action: BearIcons.Action ?? {},
  Navigation: BearIcons.Navigation ?? {},
  Communication: BearIcons.Communication ?? {},
  Status: BearIcons.Status ?? {},
  Media: BearIcons.Media ?? {},
  Content: BearIcons.Content ?? {},
  Editor: BearIcons.Editor ?? {},
  Misc: BearIcons.Misc ?? {},
  Bear: BearIcons.Bear ?? {},
};

export const ICON_COUNT = Object.values(ICON_CATEGORIES).reduce(
  (sum, cat) => sum + Object.keys(cat).length,
  0
);
