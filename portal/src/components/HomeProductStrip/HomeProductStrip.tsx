import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import {
  PRODUCT_DESC_KEY,
  PRODUCT_HREF,
  PRODUCT_NAME_KEY,
} from '@/pages/Products/Products.const';
import { HOME_PRODUCT_KEYS } from './HomeProductStrip.const';
import type { HomeProductStripProps } from './HomeProductStrip.types';

export const HomeProductStrip: FC<HomeProductStripProps> = (props) => {
  const { className } = props;
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <section className={`font-lato ${className ?? ''}`}>
      <Typography variant="h4" className="mb-2 text-center">{t.homeProductsTitle}</Typography>
      <Typography variant="body2" className="mb-8 text-center text-gray-500 dark:text-gray-400">
        {t.homeProductsDesc}
      </Typography>
      <Flex wrap="wrap" gap={4} justify="center">
        {HOME_PRODUCT_KEYS.map((key) => (
          <Link key={key} to={PRODUCT_HREF[key]} className="w-full md:w-[calc(33.333%-0.75rem)]">
            <Card className="h-full p-5 hover:border-pink-400 dark:hover:border-pink-500 transition-colors">
              <Typography variant="h6" className="mb-2">{t[PRODUCT_NAME_KEY[key]]}</Typography>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                {t[PRODUCT_DESC_KEY[key]]}
              </Typography>
            </Card>
          </Link>
        ))}
      </Flex>
    </section>
  );
};
