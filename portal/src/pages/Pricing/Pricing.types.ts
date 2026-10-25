export interface PricingPlan {
  id: string;
  name: string;
  summary: string;
  price: string;
  interval: string;
  points: string[];
  cta: string;
  href?: string;
  external?: boolean;
  featured?: boolean;
}

export interface PricingRow {
  feature: string;
  cells: string[];
}

export interface PricingGroup {
  title: string;
  rows: PricingRow[];
}

export interface PricingFact {
  title: string;
  body: string;
}

export interface PricingFaq {
  question: string;
  answer: string;
}
