export type ConfirmDemoResult = 'confirmed' | 'cancelled' | null;

export type ConfirmDemoSettledResult = Exclude<ConfirmDemoResult, null>;
