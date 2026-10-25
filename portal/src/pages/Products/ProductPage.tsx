import { FC } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Badge, Card, CardBody, Flex, Typography } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { DocPage } from '@/components/DocPage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PRODUCT_DETAILS, PRODUCT_NAME_KEY, PRODUCT_PAGES, PRODUCT_SUMMARY_KEY, isProductId } from './ProductPage.const';
import { ProductPreview } from './helpers/ProductPreview';

const ProductPage: FC = () => {
  const { productId = '' } = useParams();
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const docs = DOCS_TEXT[language];

  if (!isProductId(productId)) {
    return <Navigate to="/libraries" replace />;
  }

  const product = PRODUCT_PAGES[productId];
  const detail = PRODUCT_DETAILS[language][productId];

  return (
    <DocPage title={text[PRODUCT_NAME_KEY[productId]]} description={docs[PRODUCT_SUMMARY_KEY[productId]]} badge={product.packageName}>
      <Flex direction="column" gap={6}>
        <section>
          <Typography variant="h4" className="mb-3">{text.productInstall}</Typography>
          <CodeBlock code={product.install} language={product.install.includes('import') ? 'tsx' : 'bash'} showLineNumbers={false} />
          <a
            className="mt-3 inline-flex items-center rounded-lg border border-pink-500 px-3 py-1.5 text-sm font-medium text-pink-600 dark:text-pink-400"
            href={product.id === 'flutter' ? 'https://pub.dev/packages/bear_flutter' : `https://bundlephobia.com/package/${product.packageName}`}
            target="_blank"
            rel="noreferrer"
          >
            {text.productBundleSize}
          </a>
        </section>
        <section>
          <Flex gap={2} align="center" className="mb-3">
            <Typography variant="h4">{text.productWhy}</Typography>
            <Badge variant="primary">{detail.price}</Badge>
          </Flex>
          <Typography variant="body1">{detail.why}</Typography>
          <Typography variant="h5" className="mb-2 mt-4">{text.productBenefits}</Typography>
          {detail.benefits.map((benefit) => (
            <Typography key={benefit} variant="body2">{benefit}</Typography>
          ))}
        </section>
        <section>
          <Typography variant="h4" className="mb-3">{text.productPreview}</Typography>
          <Card>
            <CardBody>
              <ProductPreview productId={productId} />
            </CardBody>
          </Card>
        </section>
        <section>
          <Typography variant="h4" className="mb-3">{text.productDocs}</Typography>
          <Flex wrap="wrap" gap={2}>
            {product.docLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Badge variant="primary">{link.label}</Badge>
              </Link>
            ))}
          </Flex>
        </section>
      </Flex>
    </DocPage>
  );
};

export default ProductPage;
