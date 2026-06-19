export type DiscountStatus = 'DRAFT' | 'ACTIVE' | 'RETIRED';

export interface TitheDiscount {
  id: string;
  version: number;
  status: DiscountStatus;
  effectiveFrom: string;
  rules: string;
  createdBy: string;
  createdAt: string;
  activatedAt?: string;
}

export interface CreateTitheDiscountInput {
  effectiveFrom: string;
  rules: string;
}
