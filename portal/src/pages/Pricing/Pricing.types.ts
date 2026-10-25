export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  points: string[];
  featured?: boolean;
  path?: string;
}

export interface PricingNote {
  title: string;
  price: string;
  body: string;
  path: string;
}
