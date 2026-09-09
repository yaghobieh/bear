import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import {
  PRICING_CTA_KEY,
  PRICING_HREF,
  PRICING_ITEM_KEYS,
  PRICING_NAME_KEY,
  PRICING_PERIOD_KEY,
  PRICING_PRICE_KEY,
  PRICING_TIER_KEYS,
} from './Pricing.const';
import { isExternalHref } from '@/constants/marketing.utils';

const Pricing: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="font-lato">
      <Typography variant="h2" className="mb-3">{t.pricingTitle}</Typography>
      <Typography variant="body1" className="mb-10 text-gray-600 dark:text-gray-400">{t.pricingDesc}</Typography>
      <Flex wrap="wrap" gap={4}>
        {PRICING_TIER_KEYS.map((key) => {
          const href = PRICING_HREF[key];
          const cta = t[PRICING_CTA_KEY[key]];
          return (
            <Card key={key} className="w-full md:w-[calc(33.333%-0.75rem)] p-6">
              <Badge variant="primary" className="mb-3">{t[PRICING_NAME_KEY[key]]}</Badge>
              <Typography variant="h4" className="mb-1">{t[PRICING_PRICE_KEY[key]]}</Typography>
              <Typography variant="caption" className="mb-6 block text-gray-500">{t[PRICING_PERIOD_KEY[key]]}</Typography>
              <ul className="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {PRICING_ITEM_KEYS[key].map((itemKey) => (
                  <li key={itemKey}>{t[itemKey]}</li>
                ))}
              </ul>
              {isExternalHref(href) ? (
                <a href={href} className="inline-flex text-sm font-semibold text-pink-600 dark:text-pink-400">{cta}</a>
              ) : (
                <Link to={href} className="inline-flex text-sm font-semibold text-pink-600 dark:text-pink-400">{cta}</Link>
              )}
            </Card>
          );
        })}
      </Flex>
    </div>
  );
};

export default Pricing;
