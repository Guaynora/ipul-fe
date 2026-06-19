export type FundSource = 'TITHE' | 'NON_TITHE';

export interface Expense {
  id: string;
  description: string;
  amount: string;
  date: string;
  category: string;
  fundSource: FundSource;
  createdBy: string;
}

export interface CreateExpenseInput {
  description: string;
  amount: string;
  date: string;
  category: string;
  fundSource: FundSource;
}
