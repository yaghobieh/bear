export const PRICING_TIER_KEYS = ['community', 'pro', 'team'] as const;

export type PricingTierKey = (typeof PRICING_TIER_KEYS)[number];

export const PRICING_NAME_KEY = {
  community: 'pricingCommunityName',
  pro: 'pricingProName',
  team: 'pricingTeamName',
} as const;

export const PRICING_PRICE_KEY = {
  community: 'pricingCommunityPrice',
  pro: 'pricingProPrice',
  team: 'pricingTeamPrice',
} as const;

export const PRICING_PERIOD_KEY = {
  community: 'pricingCommunityPeriod',
  pro: 'pricingProPeriod',
  team: 'pricingTeamPeriod',
} as const;

export const PRICING_CTA_KEY = {
  community: 'pricingCommunityCta',
  pro: 'pricingProCta',
  team: 'pricingTeamCta',
} as const;

export const PRICING_ITEM_KEYS = {
  community: ['pricingCommunityItem1', 'pricingCommunityItem2', 'pricingCommunityItem3', 'pricingCommunityItem4'],
  pro: ['pricingProItem1', 'pricingProItem2', 'pricingProItem3', 'pricingProItem4'],
  team: ['pricingTeamItem1', 'pricingTeamItem2', 'pricingTeamItem3', 'pricingTeamItem4'],
} as const;

export const PRICING_HREF = {
  community: '/installation',
  pro: '/docs',
  team: 'mailto:yaghobieh@gmail.com',
} as const;
