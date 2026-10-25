import { FormEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Input, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { useBearProLicense } from '@/hooks/useBearProLicense';
import { PRICING_COPY, PRICING_FAQ, PRICING_FACTS, PRICING_GROUPS, PRICING_KEY_ID, PRICING_PLANS } from './Pricing.const';
import type { PricingPlan } from './Pricing.types';

const PlanCta = ({ plan }: { plan: PricingPlan }) => {
  if (plan.external) {
    return (
      <a className="pricing-plan__cta" href={plan.href} target="_blank" rel="noreferrer">
        {plan.cta}
      </a>
    );
  }
  if (plan.href.startsWith('#')) {
    return <a className="pricing-plan__cta" href={plan.href}>{plan.cta}</a>;
  }
  return <Link className="pricing-plan__cta" to={plan.href}>{plan.cta}</Link>;
};

const PricingMark = ({ value, included, missing }: { value: string; included: string; missing: string }) => {
  if (value === 'yes') {
    return <span className="pricing-mark pricing-mark--yes" aria-label={included}>✓</span>;
  }
  if (value === 'no') {
    return <span className="pricing-mark" aria-label={missing}>—</span>;
  }
  return <span>{value}</span>;
};

const PricingPage = () => {
  const { language } = usePortalLanguage();
  const copy = PRICING_COPY[language];
  const plans = PRICING_PLANS[language];
  const groups = PRICING_GROUPS[language];
  const facts = PRICING_FACTS[language];
  const faqs = PRICING_FAQ[language];
  const { active, activate, clear } = useBearProLicense();
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const saved = activate(draft);
    setMessage(saved ? copy.saved : copy.invalid);
  };

  return (
    <DocPage title={copy.title} description={copy.description}>
      <div className="pricing">
        <section className="pricing-plans" aria-label={copy.plansLabel}>
          {plans.map((plan) => (
            <article key={plan.id} className={plan.featured ? 'pricing-plan pricing-plan--featured' : 'pricing-plan'}>
              <Typography variant="h5">{plan.name}</Typography>
              <Typography variant="body2" color="secondary">{plan.summary}</Typography>
              <p className="pricing-plan__price">{plan.price}</p>
              <Typography variant="caption">{plan.interval}</Typography>
              <PlanCta plan={plan} />
              <ul className="pricing-plan__points">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <Typography variant="h3" className="pricing-section__title">{copy.compareTitle}</Typography>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th scope="col">{copy.plansLabel}</th>
                  {copy.planNames.map((name) => (
                    <th key={name} scope="col">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <Fragment key={group.title}>
                    <tr className="pricing-table__group">
                      <th scope="colgroup" colSpan={3}>{group.title}</th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.feature}>
                        <th scope="row">{row.feature}</th>
                        {row.cells.map((cell, index) => (
                          <td key={`${row.feature}-${copy.planNames[index]}`}>
                            <PricingMark value={cell} included={copy.included} missing={copy.missing} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <Typography variant="h3" className="pricing-section__title">{copy.factsTitle}</Typography>
          <div className="pricing-facts">
            {facts.map((fact) => (
              <article key={fact.title}>
                <Typography variant="h5">{fact.title}</Typography>
                <Typography variant="body2" color="secondary">{fact.body}</Typography>
              </article>
            ))}
          </div>
        </section>

        <section>
          <Typography variant="h3" className="pricing-section__title">{copy.faqTitle}</Typography>
          <div className="pricing-faq">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <Typography variant="body2" color="secondary">{item.answer}</Typography>
              </details>
            ))}
          </div>
        </section>

        <section id={PRICING_KEY_ID}>
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
              {active ? <Typography variant="body2">{copy.saved}</Typography> : null}
            </Flex>
          </form>
        </section>
      </div>
    </DocPage>
  );
};

export default PricingPage;
