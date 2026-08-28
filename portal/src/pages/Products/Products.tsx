import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { NPX_BEAR_COMMAND } from '@/constants/marketing.const';
import {
  PRODUCT_CARD_KEYS,
  PRODUCT_DESC_KEY,
  PRODUCT_HREF,
  PRODUCT_INSTALL,
  PRODUCT_NAME_KEY,
} from './Products.const';

const Products: FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="font-lato">
      <Typography variant="h2" className="mb-3">{t.productsTitle}</Typography>
      <Typography variant="body1" className="mb-4 text-gray-600 dark:text-gray-400">{t.productsDesc}</Typography>
      <Typography variant="caption" className="mb-2 block">{t.cliNpxHint}</Typography>
      <CodeBlock code={NPX_BEAR_COMMAND} language="bash" showLineNumbers={false} />
      <Flex wrap="wrap" gap={4} className="mt-10">
        {PRODUCT_CARD_KEYS.map((key) => {
          const install = PRODUCT_INSTALL[key];
          return (
            <Card key={key} className="w-full md:w-[calc(50%-0.5rem)] p-6">
              <Badge variant="primary" className="mb-3">{t[PRODUCT_NAME_KEY[key]]}</Badge>
              <Typography variant="h5" className="mb-2">{t[PRODUCT_NAME_KEY[key]]}</Typography>
              <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
                {t[PRODUCT_DESC_KEY[key]]}
              </Typography>
              {install && (
                <div className="mb-4">
                  <CodeBlock code={install} language="bash" showLineNumbers={false} />
                </div>
              )}
              <Link
                to={PRODUCT_HREF[key]}
                className="inline-flex text-sm font-semibold text-pink-600 dark:text-pink-400"
              >
                {t.productCta}
              </Link>
            </Card>
          );
        })}
      </Flex>
    </div>
  );
};

export default Products;
