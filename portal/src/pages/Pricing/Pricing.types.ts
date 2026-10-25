export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  points: string[];
  featured?: boolean;
}
