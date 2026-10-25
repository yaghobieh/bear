import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, Flex, Input, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { useBearProLicense } from '@/hooks/useBearProLicense';
import { PRICING_BLOCKS, PRICING_CATALOG, PRICING_COPY, PRICING_PLANS } from './Pricing.const';

const PricingPage = () => {
  const { language } = usePortalLanguage();
  const copy = PRICING_COPY[language];
  const plans = PRICING_PLANS[language];
  const catalog = PRICING_CATALOG[language];
  const { active, activate, clear } = useBearProLicense();
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const saved = activate(draft);
    setMessage(saved ? copy.saved : copy.invalid);
  };

  return (
    <DocPage title={copy.title} description={copy.description} badge="$9">
      <Flex direction="column" gap={6}>
        <Flex gap={4} wrap="wrap">
          {plans.map((plan) => (
            <Card key={plan.id} className="min-w-[220px] flex-1">
              <CardBody>
                <Flex direction="column" gap={2}>
                  <Flex gap={2} align="center">
                    <Typography variant="h5">{plan.name}</Typography>
                    {plan.featured ? <Badge variant="primary">{plan.interval}</Badge> : null}
                  </Flex>
                  <Typography variant="h3">{plan.price}</Typography>
                  <Typography variant="caption">{plan.interval}</Typography>
                  {plan.points.map((point) => (
                    <Typography key={point} variant="body2">{point}</Typography>
                  ))}
                  {plan.path ? <Link to={plan.path}>{plan.name}</Link> : null}
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Flex>
        <section>
          <Typography variant="h4" className="mb-2">{copy.benefitsTitle}</Typography>
          <Typography variant="body1">{copy.benefitsLead}</Typography>
        </section>
        <section>
          <Typography variant="h4" className="mb-2">{copy.blocksTitle}</Typography>
          <Typography variant="body1" className="mb-3">{PRICING_BLOCKS[language]}</Typography>
          <Link to="/products/blocks">{plans.find((plan) => plan.id === 'blocks')?.name}</Link>
        </section>
        <section>
          <Typography variant="h4" className="mb-3">{copy.catalogTitle}</Typography>
          <Flex direction="column" gap={3}>
            {catalog.map((note) => (
              <Card key={note.path}>
                <CardBody>
                  <Flex gap={2} align="center" className="mb-1">
                    <Link to={note.path}><Typography variant="h6">{note.title}</Typography></Link>
                    <Badge variant="primary">{note.price}</Badge>
                  </Flex>
                  <Typography variant="body2">{note.body}</Typography>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </section>
        <section>
          <Typography variant="body1" className="mb-3">{copy.email}</Typography>
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap={3} className="max-w-md">
              <Input
                label={copy.keyLabel}
                placeholder={copy.keyPlaceholder}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <Flex gap={2}>
                <Button type="submit">{copy.save}</Button>
                <Button type="button" variant="outline" onClick={() => { clear(); setMessage(''); }}>{copy.clear}</Button>
              </Flex>
              {message ? <Typography variant="body2">{message}</Typography> : null}
              {active ? <Badge variant="primary">{copy.saved}</Badge> : null}
            </Flex>
          </form>
        </section>
      </Flex>
    </DocPage>
  );
};

export default PricingPage;
